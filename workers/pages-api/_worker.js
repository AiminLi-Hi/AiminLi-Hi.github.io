const DEFAULT_ALLOWED_ORIGINS = [
  'https://aiminli-hi.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const STORAGE_KEY = 'visitor-stats-v1';
const HIT_EVENT_PREFIX = 'visitor-hit-v2:';
const MANUAL_HIT_PREFIX = `${HIT_EVENT_PREFIX}manual:`;
const OWNER_VISITOR_CONFIG_KEY = 'visitor-config-v1:owner-visitor-ids';
const MAX_OWNER_VISITOR_IDS = 20;
const ISTANBUL_TIME_ZONE = 'Europe/Istanbul';
const ISTANBUL_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: ISTANBUL_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
const INITIAL_STATS = {
  pageviews: 43,
  countries: {
    CN: 20,
    US: 12,
    TR: 7,
    SG: 3,
    RS: 1,
  },
  regions: {
    TR: {
      '06': { count: 1, name: 'Ankara' },
      '38': { count: 5, name: 'Kayseri' },
      '34': { count: 1, name: 'Istanbul' },
    },
  },
  updatedAt: '2026-06-11T08:34:03.969Z',
};
const COUNTRY_REGION_OVERRIDES = {
  HK: { country: 'CN', regionCode: 'HK', regionName: 'Hong Kong' },
  TW: { country: 'CN', regionCode: 'TW', regionName: 'Taiwan' },
  MO: { country: 'CN', regionCode: 'MO', regionName: 'Macao' },
};

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
}

function isAllowedHitRequest(env, request) {
  const origins = allowedOrigins(env);
  const requestOrigin = request.headers.get('Origin');
  if (requestOrigin) return origins.includes('*') || origins.includes(requestOrigin);

  const referer = request.headers.get('Referer');
  if (!referer) return false;
  try {
    const refererOrigin = new URL(referer).origin;
    return origins.includes('*') || origins.includes(refererOrigin);
  } catch {
    return false;
  }
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

function image(data, env, request, status = 200) {
  return new Response(data, {
    status,
    headers: {
      ...corsHeaders(env, request),
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  });
}

function script(data, env, request, status = 200) {
  return new Response(data, {
    status,
    headers: {
      ...corsHeaders(env, request),
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
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
  if (country === 'CN' && regionCode === 'MO') return 'Macao';
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

function normalizeVisitorId(value) {
  const visitorId = String(value || '').trim().toLowerCase();
  return /^[a-f0-9]{64}$/.test(visitorId) ? visitorId : '';
}

function pageEntryId(request) {
  const value = new URL(request.url).searchParams.get('entry');
  const entryId = String(value || '').trim();
  return /^[A-Za-z0-9_-]{16,80}$/.test(entryId) ? entryId : '';
}

function configuredOwnerVisitorIds(env) {
  return String(env.VISITOR_OWNER_HASHES || env.OWNER_VISITOR_HASHES || '')
    .split(',')
    .map(normalizeVisitorId)
    .filter(Boolean);
}

async function readOwnerVisitorIds(env) {
  const visitorIds = new Set(configuredOwnerVisitorIds(env));
  if (!env.VISITOR_KV) return visitorIds;

  const stored = await env.VISITOR_KV.get(OWNER_VISITOR_CONFIG_KEY, 'json');
  const storedIds = Array.isArray(stored)
    ? stored
    : Array.isArray(stored?.visitorIds)
      ? stored.visitorIds
      : [];
  for (const value of storedIds) {
    const visitorId = normalizeVisitorId(value);
    if (visitorId) visitorIds.add(visitorId);
  }
  return visitorIds;
}

async function registerOwnerVisitor(env, request) {
  if (!env.VISITOR_KV) throw new Error('VISITOR_KV binding is not configured');
  const visitorId = await uniqueVisitorId(env, request);
  if (!visitorId) throw new Error('Unable to identify the current network');

  const visitorIds = await readOwnerVisitorIds(env);
  visitorIds.add(visitorId);
  const storedVisitorIds = [...visitorIds].slice(-MAX_OWNER_VISITOR_IDS);
  const updatedAt = new Date().toISOString();
  await env.VISITOR_KV.put(OWNER_VISITOR_CONFIG_KEY, JSON.stringify({
    visitorIds: storedVisitorIds,
    updatedAt,
  }));

  return {
    registered: true,
    ownerNetworks: storedVisitorIds.length,
    updatedAt,
  };
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

function isoDate(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-');
}

function istanbulDateParts(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const parts = Object.fromEntries(
    ISTANBUL_DATE_FORMATTER
      .formatToParts(date)
      .filter(part => part.type !== 'literal')
      .map(part => [part.type, Number(part.value)])
  );
  if (!parts.year || !parts.month || !parts.day) return null;
  return parts;
}

function istanbulWeekRange(value = new Date()) {
  const parts = istanbulDateParts(value) || istanbulDateParts(new Date());
  const start = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
  const weekday = start.getUTCDay() || 7;
  start.setUTCDate(start.getUTCDate() - weekday + 1);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return {
    weekStart: isoDate(start),
    weekEnd: isoDate(end),
  };
}

function emptyWeeklyStats(value = new Date()) {
  return {
    ...istanbulWeekRange(value),
    pageviews: 0,
    countries: {},
    updatedAt: null,
  };
}

function normalizeWeeklyStats(value = {}, now = new Date()) {
  const current = emptyWeeklyStats(now);
  if (value?.weekStart !== current.weekStart) return current;

  const countries = {};
  for (const [countryValue, countValue] of Object.entries(value.countries || {})) {
    const rawCountry = normalizeCountryCode(countryValue);
    const count = Number(countValue) || 0;
    if (rawCountry === 'XX' || count <= 0) continue;
    addCountryCount(countries, COUNTRY_REGION_OVERRIDES[rawCountry]?.country || rawCountry, count);
  }

  return {
    ...current,
    pageviews: Math.max(0, Number(value.pageviews) || Object.values(countries).reduce((sum, count) => sum + count, 0)),
    countries,
    updatedAt: value.updatedAt || null,
  };
}

function addHitToWeeklyStats(weekly, hit) {
  const current = normalizeWeeklyStats(weekly);
  if (
    hit.country === 'XX'
    || hit.source === 'manual-adjustment'
    || istanbulWeekRange(hit.updatedAt).weekStart !== current.weekStart
  ) {
    return current;
  }

  return {
    ...current,
    pageviews: current.pageviews + 1,
    countries: {
      ...current.countries,
      [hit.country]: (current.countries[hit.country] || 0) + 1,
    },
    updatedAt: hit.updatedAt || current.updatedAt,
  };
}

function seedStats(env) {
  if (!env.INITIAL_VISITOR_STATS) return normalizeStats(INITIAL_STATS);

  try {
    const parsed = JSON.parse(env.INITIAL_VISITOR_STATS);
    return normalizeStats(parsed);
  } catch {
    return normalizeStats(INITIAL_STATS);
  }
}

function eventBaseStats(env) {
  if (!env.VISITOR_EVENT_BASE_STATS) return normalizeStats(INITIAL_STATS);

  try {
    return normalizeStats(JSON.parse(env.VISITOR_EVENT_BASE_STATS));
  } catch {
    return normalizeStats(INITIAL_STATS);
  }
}

function normalizeStats(value) {
  const countries = {};
  const regionCountsFromCountries = {};
  const skipRegionCountries = new Set();

  if (value?.countries && typeof value.countries === 'object') {
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

  const regions = normalizeRegions(value?.regions, skipRegionCountries);
  for (const [country, regionMap] of Object.entries(regionCountsFromCountries)) {
    for (const [regionCode, region] of Object.entries(regionMap)) {
      addRegionCount(regions, country, regionCode, region.name, Number(region.count) || 0);
    }
  }

  return {
    pageviews: Math.max(0, Number(value?.pageviews) || 0),
    countries,
    regions,
    weekly: normalizeWeeklyStats(value?.weekly),
    updatedAt: value?.updatedAt || null,
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
    const normalizedEntries = {};
    for (const [regionValue, regionData] of sourceEntries) {
      const code = normalizeRegionCode(regionData?.code || regionValue);
      const count = Number(regionData?.count ?? regionData) || 0;
      if (!code || count <= 0) continue;
      normalizedEntries[code] = {
        count,
        name: regionNameFor(country, code, regionData?.name || regionData?.region || code),
      };
    }

    if (Object.keys(normalizedEntries).length) {
      regions[country] = normalizedEntries;
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
  const ranking = Object.entries(stats.countries || {})
    .map(([code, count]) => ({
      code,
      name: countryName(code),
      matchName: countryName(code),
      count,
      delay: 0,
    }))
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code))
    .map((country, index) => ({
      ...country,
      delay: Number((index * 0.4).toFixed(1)),
    }));
  const weekly = normalizeWeeklyStats(stats.weekly);
  const weeklyRanking = Object.entries(weekly.countries || {})
    .map(([code, count]) => ({
      code,
      name: countryName(code),
      matchName: countryName(code),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));

  return {
    generatedAt: stats.updatedAt,
    visitorSnapshot: {
      pageviews: stats.pageviews || 0,
      visits: stats.pageviews || 0,
      countries: ranking.length,
      ranking,
      regions: publicRegions(stats.regions),
      weekly: {
        weekStart: weekly.weekStart,
        weekEnd: weekly.weekEnd,
        newVisitors: weekly.pageviews,
        countries: weeklyRanking.length,
        ranking: weeklyRanking,
        updatedAt: weekly.updatedAt,
      },
      updatedAt: stats.updatedAt,
    },
  };
}

function addRegionToStats(stats, hit) {
  if (!hit.regionCode || hit.country === 'XX') return stats.regions || {};

  const regions = {
    ...(stats.regions || {}),
    [hit.country]: {
      ...((stats.regions || {})[hit.country] || {}),
    },
  };
  const previous = regions[hit.country][hit.regionCode] || { count: 0, name: hit.regionName || hit.regionCode };
  regions[hit.country][hit.regionCode] = {
    count: (Number(previous.count) || 0) + 1,
    name: regionNameFor(hit.country, hit.regionCode, hit.regionName || previous.name),
  };
  return regions;
}

function addHitToStats(stats, hit) {
  const normalizedHit = normalizeHit(hit);
  return {
    pageviews: (stats.pageviews || 0) + 1,
    countries: {
      ...(stats.countries || {}),
      [normalizedHit.country]: ((stats.countries || {})[normalizedHit.country] || 0) + 1,
    },
    regions: addRegionToStats(stats, normalizedHit),
    weekly: addHitToWeeklyStats(stats.weekly, normalizedHit),
    updatedAt: normalizedHit.updatedAt || new Date().toISOString(),
  };
}

async function readStats(env) {
  if (!env.VISITOR_KV) return seedStats(env);
  const stored = await env.VISITOR_KV.get(STORAGE_KEY, 'json');
  return stored ? normalizeStats(stored) : seedStats(env);
}

async function writeStats(env, stats) {
  const normalized = normalizeStats(stats);
  if (env.VISITOR_KV) {
    await env.VISITOR_KV.put(STORAGE_KEY, JSON.stringify(normalized));
  }
  return normalized;
}

async function rebuildStatsFromEvents(env) {
  if (!env.VISITOR_KV) return seedStats(env);
  const stats = eventBaseStats(env);
  let cursor;

  do {
    const page = await env.VISITOR_KV.list({
      prefix: HIT_EVENT_PREFIX,
      cursor,
      limit: 1000,
    });

    for (const key of page.keys || []) {
      const [, timestamp = '', countryFromName = ''] = key.name.split(':');
      const eventUpdatedAt = key.metadata?.updatedAt
        || (Number.isFinite(Number(timestamp)) ? new Date(Number(timestamp)).toISOString() : null);
      const hit = normalizeHit({
        country: key.metadata?.country || countryFromName,
        regionCode: key.metadata?.regionCode,
        regionName: key.metadata?.regionName || key.metadata?.region,
        source: key.metadata?.source,
        updatedAt: eventUpdatedAt,
      });
      const nextStats = addHitToStats(stats, hit);
      stats.pageviews = nextStats.pageviews;
      stats.countries = nextStats.countries;
      stats.regions = nextStats.regions;
      stats.weekly = nextStats.weekly;

      if (eventUpdatedAt && (!stats.updatedAt || eventUpdatedAt > stats.updatedAt)) {
        stats.updatedAt = eventUpdatedAt;
      }
    }

    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return stats;
}

async function recordHit(env, request) {
  const hit = currentHit(request);
  const updatedAt = new Date().toISOString();
  const event = { ...hit, updatedAt };

  if (env.VISITOR_KV) {
    const visitorId = await uniqueVisitorId(env, request);
    const ownerVisitorIds = visitorId ? await readOwnerVisitorIds(env) : new Set();
    const isOwner = Boolean(visitorId && ownerVisitorIds.has(visitorId));
    const entryId = pageEntryId(request);
    const key = isOwner
      ? `${HIT_EVENT_PREFIX}${visitorId}`
      : entryId
        ? `${HIT_EVENT_PREFIX}entry:${entryId}`
        : `${HIT_EVENT_PREFIX}${Date.now()}:${event.country}:${crypto.randomUUID()}`;

    if (isOwner || entryId) {
      const existingHit = await env.VISITOR_KV.get(key);
      if (existingHit) {
        return {
          ...event,
          counted: false,
          owner: isOwner,
          stats: await readStats(env),
        };
      }
    }

    const recordedEvent = {
      ...event,
      source: isOwner ? 'owner-first-visit' : 'page-entry',
    };
    const nextStats = addHitToStats(await readStats(env), recordedEvent);
    await Promise.all([
      env.VISITOR_KV.put(key, '1', {
        metadata: {
          country: recordedEvent.country,
          regionCode: recordedEvent.regionCode,
          regionName: recordedEvent.regionName,
          source: recordedEvent.source,
          updatedAt,
        },
      }),
      writeStats(env, nextStats),
    ]);
    return {
      ...recordedEvent,
      counted: true,
      owner: isOwner,
      stats: nextStats,
    };
  }

  return { ...event, counted: true };
}

function normalizeHit(value = {}) {
  const rawCountry = normalizeCountryCode(value.country);
  const regionCode = normalizeRegionCode(value.regionCode);
  const source = String(value.source || '').trim().slice(0, 64);
  const override = COUNTRY_REGION_OVERRIDES[rawCountry];
  if (override) {
    return {
      country: override.country,
      regionCode: override.regionCode,
      regionName: override.regionName,
      source,
      updatedAt: value.updatedAt || new Date().toISOString(),
    };
  }

  return {
    country: rawCountry,
    regionCode,
    regionName: regionNameFor(rawCountry, regionCode, value.regionName),
    source,
    updatedAt: value.updatedAt || new Date().toISOString(),
  };
}

function currentHit(request) {
  return normalizeHit({
    country: request.cf?.country || request.headers.get('CF-IPCountry'),
    regionCode: request.cf?.regionCode || request.headers.get('CF-Region-Code'),
    regionName: request.cf?.region || request.headers.get('CF-Region'),
  });
}

function adminToken(request) {
  const auth = request.headers.get('Authorization') || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7).trim();
  return request.headers.get('X-Visitor-Admin-Token') || '';
}

function hasAdminAccess(request, env) {
  const expected = String(env.VISITOR_ADMIN_TOKEN || '').trim();
  return Boolean(expected && adminToken(request) === expected);
}

async function requestJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function normalizeManualAdjustments(payload) {
  const entries = Array.isArray(payload?.adjustments) ? payload.adjustments : [];
  return entries
    .map(entry => {
      const hit = normalizeHit({
        country: entry?.country,
        regionCode: entry?.regionCode,
        regionName: entry?.regionName,
      });
      const count = Math.floor(Number(entry?.count) || 0);
      return { ...hit, count };
    })
    .filter(entry => entry.country !== 'XX' && entry.count > 0)
    .slice(0, 50);
}

async function applyManualAdjustments(env, adjustments) {
  if (!env.VISITOR_KV) throw new Error('VISITOR_KV binding is not configured');
  const updatedAt = new Date().toISOString();
  let written = 0;
  let stats = await readStats(env);

  for (const adjustment of adjustments) {
    const count = Math.min(adjustment.count, 200);
    for (let index = 0; index < count; index += 1) {
      const key = `${MANUAL_HIT_PREFIX}${Date.now()}:${adjustment.country}:${crypto.randomUUID()}`;
      const event = {
        ...adjustment,
        updatedAt,
        source: 'manual-adjustment',
      };
      await env.VISITOR_KV.put(key, '1', {
        metadata: {
          country: event.country,
          regionCode: event.regionCode,
          regionName: event.regionName,
          updatedAt,
          source: event.source,
        },
      });
      stats = addHitToStats(stats, event);
      written += 1;
    }
  }

  await writeStats(env, stats);
  return { written, updatedAt };
}

function callbackName(value) {
  const name = String(value || '').trim();
  return /^[A-Za-z_$][\w$]*$/.test(name) ? name : '__aiminVisitorHit';
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env, request) });
    }

    const url = new URL(request.url);

    if (url.pathname === '/') {
      return json({
        ok: true,
        service: 'Aimin Li homepage visitor API',
        homepage: 'https://aiminli-hi.github.io/',
        endpoints: {
          health: '/health',
          stats: '/stats',
        },
      }, env, request);
    }

    if (url.pathname === '/health') {
      return json({
        ok: true,
        storage: env.VISITOR_KV ? 'kv-aggregate-with-event-audit' : 'seed',
        counting: env.VISITOR_KV ? 'owner-once-others-every-entry' : 'unavailable',
        privacy: env.VISITOR_KV ? 'anonymous-events-no-raw-ip' : 'seed-only',
      }, env, request);
    }

    if (url.pathname === '/stats') {
      return json(publicSnapshot(await readStats(env)), env, request);
    }

    if (url.pathname === '/admin/adjust') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, env, request, 405);
      }
      if (!hasAdminAccess(request, env)) {
        return json({ error: 'Not found' }, env, request, 404);
      }

      const payload = await requestJson(request);
      const adjustments = normalizeManualAdjustments(payload);
      if (!adjustments.length) {
        return json({ error: 'No valid adjustments' }, env, request, 400);
      }

      const result = await applyManualAdjustments(env, adjustments);
      return json({
        ok: true,
        ...result,
        ...publicSnapshot(await readStats(env)),
      }, env, request);
    }

    if (url.pathname === '/admin/owner/register') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, env, request, 405);
      }
      if (!hasAdminAccess(request, env)) {
        return json({ error: 'Not found' }, env, request, 404);
      }

      try {
        return json({
          ok: true,
          ...(await registerOwnerVisitor(env, request)),
        }, env, request);
      } catch (error) {
        return json({ error: error.message || 'Unable to register owner network' }, env, request, 400);
      }
    }

    if (url.pathname === '/admin/rebuild') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, env, request, 405);
      }
      if (!hasAdminAccess(request, env)) {
        return json({ error: 'Not found' }, env, request, 404);
      }

      try {
        const currentStats = await readStats(env);
        const rebuiltStats = await rebuildStatsFromEvents(env);
        if (rebuiltStats.pageviews < currentStats.pageviews) {
          throw new Error(
            `Refusing to reduce visitor pageviews from ${currentStats.pageviews} to ${rebuiltStats.pageviews}`
          );
        }
        const stats = await writeStats(env, rebuiltStats);
        return json({
          ok: true,
          rebuilt: true,
          ...publicSnapshot(stats),
        }, env, request);
      } catch (error) {
        return json({ error: error.message || 'Unable to rebuild visitor statistics' }, env, request, 503);
      }
    }

    if (url.pathname === '/hit' || url.pathname === '/hit.gif' || url.pathname === '/hit.js') {
      if (request.method !== 'GET' && request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, env, request, 405);
      }

      const shouldRecordHit = isAllowedHitRequest(env, request);

      if (url.pathname === '/hit.gif') {
        if (shouldRecordHit) await recordHit(env, request);
        return image('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" />', env, request);
      }

      const hit = shouldRecordHit
        ? await recordHit(env, request)
        : { ...currentHit(request), counted: false };
      const stats = hit.stats || await readStats(env);
      const snapshot = publicSnapshot(
        hit.counted && !hit.stats ? addHitToStats(stats, hit) : stats
      );

      if (url.pathname === '/hit.js') {
        const callback = callbackName(url.searchParams.get('callback'));
        return script(`${callback}(${JSON.stringify(snapshot)});`, env, request);
      }

      return json(snapshot, env, request);
    }

    return json({ error: 'Not found' }, env, request, 404);
  },
};
