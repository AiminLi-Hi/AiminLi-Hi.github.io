const DEFAULT_ALLOWED_ORIGINS = [
  'https://aiminli-hi.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const STORAGE_KEY = 'visitor-stats-v1';
const INITIAL_STATS = {
  pageviews: 43,
  countries: {
    CN: 19,
    US: 12,
    TR: 8,
    SG: 3,
    RS: 1,
  },
  updatedAt: '2026-06-11T08:34:03.969Z',
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
  if (!env.INITIAL_VISITOR_STATS) return INITIAL_STATS;

  try {
    const parsed = JSON.parse(env.INITIAL_VISITOR_STATS);
    return normalizeStats(parsed);
  } catch {
    return INITIAL_STATS;
  }
}

function normalizeStats(value) {
  const countries = value?.countries && typeof value.countries === 'object'
    ? Object.fromEntries(
      Object.entries(value.countries)
        .map(([code, count]) => [normalizeCountryCode(code), Number(count) || 0])
        .filter(([, count]) => count > 0)
    )
    : {};

  return {
    pageviews: Math.max(0, Number(value?.pageviews) || 0),
    countries,
    updatedAt: value?.updatedAt || null,
  };
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
      updatedAt: stats.updatedAt,
    },
  };
}

async function readStats(env) {
  if (!env.VISITOR_KV) return seedStats(env);

  const stored = await env.VISITOR_KV.get(STORAGE_KEY, 'json');
  return stored ? normalizeStats(stored) : seedStats(env);
}

async function writeStats(env, stats) {
  if (!env.VISITOR_KV) return;
  await env.VISITOR_KV.put(STORAGE_KEY, JSON.stringify(stats));
}

function currentCountry(request) {
  return normalizeCountryCode(request.cf?.country || request.headers.get('CF-IPCountry'));
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env, request) });
    }

    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return json({ ok: true, storage: env.VISITOR_KV ? 'kv' : 'seed' }, env, request);
    }

    if (url.pathname === '/stats') {
      return json(publicSnapshot(await readStats(env)), env, request);
    }

    if (url.pathname === '/hit') {
      if (request.method !== 'GET' && request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, env, request, 405);
      }

      const stats = await readStats(env);
      const country = currentCountry(request);
      const nextStats = {
        pageviews: (stats.pageviews || 0) + 1,
        countries: {
          ...(stats.countries || {}),
          [country]: ((stats.countries || {})[country] || 0) + 1,
        },
        updatedAt: new Date().toISOString(),
      };

      await writeStats(env, nextStats);
      return json(publicSnapshot(nextStats), env, request);
    }

    return json({ error: 'Not found' }, env, request, 404);
  },
};
