const DEFAULT_ALLOWED_ORIGINS = [
  'https://aiminli-hi.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const STORAGE_KEY = 'visitor-stats-v1';
const HIT_EVENT_PREFIX = 'visitor-hit-v2:';
const INITIAL_STATS = {
  pageviews: 43,
  countries: {
    CN: 19,
    US: 12,
    TR: 8,
    SG: 3,
    RS: 1,
  },
  regions: {},
  updatedAt: '2026-06-11T08:34:03.969Z',
};
const COUNTRY_REGION_OVERRIDES = {
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
  if (country === 'CN' && regionCode === 'TW') return 'Taiwan';
  return normalizeRegionName(value, regionCode);
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

function seedStats(env) {
  if (!env.INITIAL_VISITOR_STATS) return normalizeStats(INITIAL_STATS);

  try {
    const parsed = JSON.parse(env.INITIAL_VISITOR_STATS);
    return normalizeStats(parsed);
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

  return {
    generatedAt: stats.updatedAt,
    visitorSnapshot: {
      pageviews: stats.pageviews || 0,
      countries: ranking.length,
      ranking,
      regions: publicRegions(stats.regions),
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
    updatedAt: normalizedHit.updatedAt || new Date().toISOString(),
  };
}

async function readStats(env) {
  if (!env.VISITOR_KV) return seedStats(env);

  const stored = await env.VISITOR_KV.get(STORAGE_KEY, 'json');
  const stats = stored ? normalizeStats(stored) : seedStats(env);
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
        updatedAt: eventUpdatedAt,
      });
      const nextStats = addHitToStats(stats, hit);
      stats.pageviews = nextStats.pageviews;
      stats.countries = nextStats.countries;
      stats.regions = nextStats.regions;

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
    const key = `${HIT_EVENT_PREFIX}${Date.now()}:${event.country}:${crypto.randomUUID()}`;
    await env.VISITOR_KV.put(key, '', {
      metadata: {
        country: event.country,
        regionCode: event.regionCode,
        regionName: event.regionName,
        updatedAt,
      },
    });
  }

  return event;
}

function normalizeHit(value = {}) {
  const rawCountry = normalizeCountryCode(value.country);
  const regionCode = normalizeRegionCode(value.regionCode);
  const override = COUNTRY_REGION_OVERRIDES[rawCountry];
  if (override) {
    return {
      country: override.country,
      regionCode: override.regionCode,
      regionName: override.regionName,
      updatedAt: value.updatedAt || new Date().toISOString(),
    };
  }

  return {
    country: rawCountry,
    regionCode,
    regionName: regionNameFor(rawCountry, regionCode, value.regionName),
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
      return json({ ok: true, storage: env.VISITOR_KV ? 'kv-events' : 'seed' }, env, request);
    }

    if (url.pathname === '/stats') {
      return json(publicSnapshot(await readStats(env)), env, request);
    }

    if (url.pathname === '/hit' || url.pathname === '/hit.gif' || url.pathname === '/hit.js') {
      if (request.method !== 'GET' && request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, env, request, 405);
      }

      if (url.pathname === '/hit.gif') {
        await recordHit(env, request);
        return image('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" />', env, request);
      }

      const stats = await readStats(env);
      const hit = await recordHit(env, request);
      const snapshot = publicSnapshot(addHitToStats(stats, hit));

      if (url.pathname === '/hit.js') {
        const callback = callbackName(url.searchParams.get('callback'));
        return script(`${callback}(${JSON.stringify(snapshot)});`, env, request);
      }

      return json(snapshot, env, request);
    }

    return json({ error: 'Not found' }, env, request, 404);
  },
};
