// Legacy Durable Object worker. The live homepage uses workers/pages-api.
// Keep this as a fallback only; ordinary maintenance should not deploy it.
const DEFAULT_ALLOWED_ORIGINS = [
  'https://aiminli-hi.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const STORAGE_KEY = 'visitor-stats-v1';
const UNIQUE_VISITOR_PREFIX = 'visitor-unique-v1:';
const COUNTRY_REGION_OVERRIDES = {
  HK: { country: 'CN', regionCode: 'HK', regionName: 'Hong Kong' },
  TW: { country: 'CN', regionCode: 'TW', regionName: 'Taiwan' },
};

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
}

function corsHeaders(env, request) {
  const origins = allowedOrigins(env);
  const requestOrigin = request.headers.get('Origin');
  const allowOrigin = origins.includes('*') || origins.includes(requestOrigin)
    ? requestOrigin || origins[0]
    : origins[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
  };
}

function json(data, env, request, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(env, request),
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function normalizeCountryCode(value) {
  const code = String(value || '').trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : 'XX';
}

function normalizeRegionCode(value) {
  const code = String(value || '')
    .trim()
    .toUpperCase()
    .replace(/^[A-Z]{2}-/, '')
    .replace(/[^A-Z0-9]/g, '');
  return /^[A-Z0-9]{1,8}$/.test(code) ? code : '';
}

function normalizeRegionName(value, fallback = '') {
  const name = String(value || '').replace(/\s+/g, ' ').trim();
  if (name.length > 80) return fallback;
  return name || fallback;
}

function regionNameFor(country, regionCode, value) {
  if (country === 'CN' && regionCode === 'HK') return 'Hong Kong';
  if (country === 'CN' && regionCode === 'TW') return 'Taiwan';
  return normalizeRegionName(value, regionCode);
}

function normalizeClientIp(value) {
  const first = String(value || '').split(',')[0].trim();
  const withoutIpv6Brackets = first.replace(/^\[([^\]]+)\](?::\d+)?$/, '$1');
  const withoutIpv4Port = withoutIpv6Brackets.replace(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/, '$1');
  if (!withoutIpv4Port || withoutIpv4Port.length > 80) return '';
  return /^[0-9A-Fa-f:.]+$/.test(withoutIpv4Port) ? withoutIpv4Port : '';
}

function clientIp(request) {
  const directHeaders = ['CF-Connecting-IP', 'True-Client-IP', 'X-Real-IP'];
  for (const header of directHeaders) {
    const ip = normalizeClientIp(request.headers.get(header));
    if (ip) return ip;
  }
  return normalizeClientIp(request.headers.get('X-Forwarded-For'));
}

function hexDigest(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function uniqueVisitorId(env, request) {
  const ip = clientIp(request);
  if (!ip) return '';
  const salt = String(env.VISITOR_HASH_SALT || env.IP_HASH_SALT || 'aimin-homepage-visitors-v1');
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return hexDigest(digest);
}

function addCountryCount(countries, country, count) {
  if (country === 'XX' || count <= 0) return;
  countries[country] = (countries[country] || 0) + count;
}

function addRegionCount(regions, country, regionCode, regionName, count) {
  if (country === 'XX' || !regionCode || count <= 0) return;
  regions[country] = {
    ...(regions[country] || {}),
  };
  const previous = regions[country][regionCode] || { count: 0, name: regionNameFor(country, regionCode, regionName) };
  regions[country][regionCode] = {
    count: (Number(previous.count) || 0) + count,
    name: regionNameFor(country, regionCode, regionName || previous.name),
  };
}

function countryName(code) {
  if (code === 'XX') return 'Unknown';
  try {
    const name = new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
    return name === 'Turkey' ? 'Türkiye' : name || code;
  } catch {
    return code;
  }
}

function emptyStats() {
  return {
    pageviews: 0,
    countries: {},
    regions: {},
    updatedAt: null,
  };
}

function normalizeStats(value = {}) {
  const countries = {};
  const regionCountsFromCountries = {};
  const skipRegionCountries = new Set();

  if (value.countries && typeof value.countries === 'object') {
    for (const [countryValue, countValue] of Object.entries(value.countries)) {
      const rawCountry = normalizeCountryCode(countryValue);
      const count = Number(countValue) || 0;
      if (rawCountry === 'XX' || count <= 0) continue;

      const override = COUNTRY_REGION_OVERRIDES[rawCountry];
      if (override) {
        addCountryCount(countries, override.country, count);
        addRegionCount(regionCountsFromCountries, override.country, override.regionCode, override.regionName, count);
        skipRegionCountries.add(rawCountry);
      } else {
        addCountryCount(countries, rawCountry, count);
      }
    }
  }

  const regions = normalizeRegions(value.regions, skipRegionCountries);
  for (const [country, regionMap] of Object.entries(regionCountsFromCountries)) {
    for (const [regionCode, region] of Object.entries(regionMap)) {
      addRegionCount(regions, country, regionCode, region.name, Number(region.count) || 0);
    }
  }

  return {
    pageviews: Math.max(0, Number(value.pageviews) || 0),
    countries,
    regions,
    updatedAt: value.updatedAt || null,
  };
}

function normalizeRegions(value, skipRegionCountries = new Set()) {
  if (!value || typeof value !== 'object') return {};

  const regions = {};
  for (const [countryValue, entries] of Object.entries(value)) {
    const rawCountry = normalizeCountryCode(countryValue);
    if (rawCountry === 'XX') continue;
    const sourceEntries = Array.isArray(entries)
      ? entries.map(region => [region?.code, region])
      : Object.entries(entries || {});

    const override = COUNTRY_REGION_OVERRIDES[rawCountry];
    if (override) {
      if (skipRegionCountries.has(rawCountry)) continue;
      const total = sourceEntries.reduce((sum, [, regionData]) => (
        sum + (Number(regionData?.count ?? regionData) || 0)
      ), 0);
      addRegionCount(regions, override.country, override.regionCode, override.regionName, total);
      continue;
    }

    const country = rawCountry;
    for (const [regionValue, regionData] of sourceEntries) {
      const code = normalizeRegionCode(regionData?.code || regionValue);
      const count = Number(regionData?.count ?? regionData) || 0;
      if (!code || count <= 0) continue;
      addRegionCount(regions, country, code, regionData?.name || regionData?.region || code, count);
    }
  }

  return regions;
}

function publicRegions(regions = {}) {
  return Object.fromEntries(
    Object.entries(regions)
      .map(([country, regionMap]) => [
        country,
        Object.entries(regionMap || {})
          .map(([code, region]) => ({
            code,
            name: regionNameFor(country, code, region?.name),
            count: Number(region?.count) || 0,
          }))
          .filter(region => region.count > 0)
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
          .slice(0, 20),
      ])
      .filter(([, ranking]) => ranking.length)
  );
}

function publicSnapshot(stats) {
  const normalizedStats = normalizeStats(stats);
  const ranking = Object.entries(normalizedStats.countries || {})
    .map(([code, count], index) => ({
      code,
      name: countryName(code),
      matchName: countryName(code),
      count,
      delay: Number((index * 0.4).toFixed(1)),
    }))
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code))
    .map((country, index) => ({
      ...country,
      delay: Number((index * 0.4).toFixed(1)),
    }));

  return {
    generatedAt: normalizedStats.updatedAt,
    visitorSnapshot: {
      pageviews: normalizedStats.pageviews || 0,
      uniqueVisitors: normalizedStats.pageviews || 0,
      countries: ranking.length,
      ranking,
      regions: publicRegions(normalizedStats.regions),
      updatedAt: normalizedStats.updatedAt,
    },
  };
}

function addRegionToStats(stats, country, regionCode, regionName) {
  if (!regionCode || country === 'XX') return stats.regions || {};
  const regions = {
    ...(stats.regions || {}),
    [country]: {
      ...((stats.regions || {})[country] || {}),
    },
  };
  const previous = regions[country][regionCode] || { count: 0, name: regionName || regionCode };
  regions[country][regionCode] = {
    count: (Number(previous.count) || 0) + 1,
    name: regionNameFor(country, regionCode, regionName || previous.name),
  };
  return regions;
}

function normalizeHit(countryValue, regionCodeValue, regionNameValue) {
  const rawCountry = normalizeCountryCode(countryValue);
  const regionCode = normalizeRegionCode(regionCodeValue);
  const override = COUNTRY_REGION_OVERRIDES[rawCountry];
  if (override) {
    return {
      country: override.country,
      regionCode: override.regionCode,
      regionName: override.regionName,
    };
  }

  return {
    country: rawCountry,
    regionCode,
    regionName: regionNameFor(rawCountry, regionCode, regionNameValue),
  };
}

export class VisitorCounter {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
  }

  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(this.env, request) });
    }

    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return json({ ok: true }, this.env, request);
    }

    if (url.pathname === '/stats') {
      const stats = normalizeStats(await this.ctx.storage.get(STORAGE_KEY) || emptyStats());
      return json(publicSnapshot(stats), this.env, request);
    }

    if (url.pathname === '/hit') {
      if (request.method !== 'GET' && request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, this.env, request, 405);
      }

      const stats = normalizeStats(await this.ctx.storage.get(STORAGE_KEY) || emptyStats());
      const hit = normalizeHit(
        request.headers.get('x-visitor-country'),
        request.headers.get('x-visitor-region-code'),
        request.headers.get('x-visitor-region-name')
      );
      const visitorId = String(request.headers.get('x-visitor-id') || '').trim();
      const visitorKey = /^[a-f0-9]{64}$/.test(visitorId) ? `${UNIQUE_VISITOR_PREFIX}${visitorId}` : '';

      if (visitorKey && await this.ctx.storage.get(visitorKey)) {
        return json(publicSnapshot(stats), this.env, request);
      }

      const nextStats = {
        pageviews: (stats.pageviews || 0) + 1,
        countries: {
          ...(stats.countries || {}),
          [hit.country]: ((stats.countries || {})[hit.country] || 0) + 1,
        },
        regions: addRegionToStats(stats, hit.country, hit.regionCode, hit.regionName),
        updatedAt: new Date().toISOString(),
      };

      if (visitorKey) {
        await this.ctx.storage.put(visitorKey, {
          firstSeenAt: nextStats.updatedAt,
          country: hit.country,
          regionCode: hit.regionCode,
          regionName: hit.regionName,
        });
      }

      await this.ctx.storage.put(STORAGE_KEY, nextStats);
      return json(publicSnapshot(nextStats), this.env, request);
    }

    return json({ error: 'Not found' }, this.env, request, 404);
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env, request) });
    }

    if (!env.VISITOR_COUNTER) {
      return json({ error: 'VISITOR_COUNTER binding is not configured' }, env, request, 500);
    }

    const headers = new Headers(request.headers);
    const hit = normalizeHit(
      request.cf?.country || request.headers.get('CF-IPCountry'),
      request.cf?.regionCode || request.headers.get('CF-Region-Code'),
      request.cf?.region || request.headers.get('CF-Region')
    );
    headers.set(
      'x-visitor-country',
      hit.country
    );
    headers.set(
      'x-visitor-region-code',
      hit.regionCode
    );
    headers.set(
      'x-visitor-region-name',
      hit.regionName
    );
    const visitorId = await uniqueVisitorId(env, request);
    if (visitorId) {
      headers.set('x-visitor-id', visitorId);
    }

    const forwardedRequest = new Request(request, { headers });
    const id = env.VISITOR_COUNTER.idFromName('global');
    const object = env.VISITOR_COUNTER.get(id);
    return object.fetch(forwardedRequest);
  },
};
