const DEFAULT_ALLOWED_ORIGINS = [
  'https://aiminli-hi.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const STORAGE_KEY = 'visitor-stats-v1';

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

function emptyStats() {
  return {
    pageviews: 0,
    countries: {},
    updatedAt: null,
  };
}

function publicSnapshot(stats) {
  const ranking = Object.entries(stats.countries || {})
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
    generatedAt: stats.updatedAt,
    visitorSnapshot: {
      pageviews: stats.pageviews || 0,
      countries: ranking.length,
      ranking,
      updatedAt: stats.updatedAt,
    },
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
      const stats = await this.ctx.storage.get(STORAGE_KEY) || emptyStats();
      return json(publicSnapshot(stats), this.env, request);
    }

    if (url.pathname === '/hit') {
      if (request.method !== 'GET' && request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, this.env, request, 405);
      }

      const stats = await this.ctx.storage.get(STORAGE_KEY) || emptyStats();
      const country = normalizeCountryCode(request.headers.get('x-visitor-country'));
      const nextStats = {
        pageviews: (stats.pageviews || 0) + 1,
        countries: {
          ...(stats.countries || {}),
          [country]: ((stats.countries || {})[country] || 0) + 1,
        },
        updatedAt: new Date().toISOString(),
      };

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
    headers.set(
      'x-visitor-country',
      normalizeCountryCode(request.cf?.country || request.headers.get('CF-IPCountry'))
    );

    const forwardedRequest = new Request(request, { headers });
    const id = env.VISITOR_COUNTER.idFromName('global');
    const object = env.VISITOR_COUNTER.get(id);
    return object.fetch(forwardedRequest);
  },
};
