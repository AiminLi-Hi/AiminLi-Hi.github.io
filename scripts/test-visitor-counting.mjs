import assert from 'node:assert/strict';
import visitorWorker from '../workers/pages-api/_worker.js';

class MemoryKv {
  constructor() {
    this.entries = new Map();
    this.listCalls = 0;
  }

  async get(key, type) {
    const entry = this.entries.get(key);
    if (!entry) return null;
    return type === 'json' ? JSON.parse(entry.value) : entry.value;
  }

  async put(key, value, options = {}) {
    this.entries.set(key, {
      value: String(value),
      metadata: options.metadata || null,
    });
  }

  async list({ prefix = '' }) {
    this.listCalls += 1;
    const keys = [...this.entries.entries()]
      .filter(([key]) => key.startsWith(prefix))
      .map(([name, entry]) => ({ name, metadata: entry.metadata }));
    return { keys, list_complete: true };
  }
}

const env = {
  ALLOWED_ORIGIN: 'https://aiminli-hi.github.io',
  INITIAL_VISITOR_STATS: JSON.stringify({
    pageviews: 0,
    countries: {},
    regions: {},
    updatedAt: null,
  }),
  VISITOR_ADMIN_TOKEN: 'test-admin-token',
  VISITOR_EVENT_BASE_STATS: JSON.stringify({
    pageviews: 0,
    countries: {},
    regions: {},
    updatedAt: null,
  }),
  VISITOR_HASH_SALT: 'test-only-salt',
  VISITOR_KV: new MemoryKv(),
};

const request = (pathname, ip, country, extra = {}) => new Request(
  `https://aimin-homepage-visitors-api.pages.dev${pathname}`,
  {
    method: extra.method || 'GET',
    headers: {
      Origin: 'https://aiminli-hi.github.io',
      'CF-Connecting-IP': ip,
      'CF-IPCountry': country,
      ...(extra.headers || {}),
    },
  }
);

const fetchJson = async (pathname, ip, country, extra) => {
  const response = await visitorWorker.fetch(request(pathname, ip, country, extra), env);
  assert.equal(response.ok, true, `${pathname} returned ${response.status}`);
  return response.json();
};

const ownerIp = '203.0.113.10';
const visitorIp = '198.51.100.25';

const registration = await fetchJson('/admin/owner/register', ownerIp, 'TR', {
  method: 'POST',
  headers: { Authorization: `Bearer ${env.VISITOR_ADMIN_TOKEN}` },
});
assert.equal(registration.registered, true);

const ownerFirst = await fetchJson('/hit', ownerIp, 'TR');
const ownerRepeat = await fetchJson('/hit', ownerIp, 'TR');
assert.equal(ownerFirst.visitorSnapshot.pageviews, 1);
assert.equal(ownerRepeat.visitorSnapshot.pageviews, 1);

const visitorFirst = await fetchJson('/hit?entry=page-entry-00000001', visitorIp, 'US');
const visitorFallback = await fetchJson('/hit?entry=page-entry-00000001', visitorIp, 'US');
const visitorRepeat = await fetchJson('/hit?entry=page-entry-00000002', visitorIp, 'US');
assert.equal(visitorFirst.visitorSnapshot.pageviews, 2);
assert.equal(visitorFallback.visitorSnapshot.pageviews, 2);
assert.equal(visitorRepeat.visitorSnapshot.pageviews, 3);

const snapshot = await fetchJson('/stats', visitorIp, 'US');
assert.equal(snapshot.visitorSnapshot.pageviews, 3);
assert.equal(snapshot.visitorSnapshot.visits, 3);
assert.equal(snapshot.visitorSnapshot.ranking.find(({ code }) => code === 'TR')?.count, 1);
assert.equal(snapshot.visitorSnapshot.ranking.find(({ code }) => code === 'US')?.count, 2);
assert.equal(snapshot.visitorSnapshot.weekly.newVisitors, 3);
assert.equal(env.VISITOR_KV.listCalls, 0);

const rebuilt = await fetchJson('/admin/rebuild', ownerIp, 'TR', {
  method: 'POST',
  headers: { Authorization: `Bearer ${env.VISITOR_ADMIN_TOKEN}` },
});
assert.equal(rebuilt.rebuilt, true);
assert.equal(rebuilt.visitorSnapshot.pageviews, 3);
assert.equal(env.VISITOR_KV.listCalls, 1);

await env.VISITOR_KV.put('visitor-stats-v1', JSON.stringify({
  pageviews: 10,
  countries: { TR: 1, US: 9 },
  regions: {},
  updatedAt: new Date().toISOString(),
}));
const rollbackResponse = await visitorWorker.fetch(request('/admin/rebuild', ownerIp, 'TR', {
  method: 'POST',
  headers: { Authorization: `Bearer ${env.VISITOR_ADMIN_TOKEN}` },
}), env);
assert.equal(rollbackResponse.status, 503);
assert.match((await rollbackResponse.json()).error, /Refusing to reduce visitor pageviews/);
const protectedSnapshot = await fetchJson('/stats', visitorIp, 'US');
assert.equal(protectedSnapshot.visitorSnapshot.pageviews, 10);

const serializedKv = JSON.stringify([...env.VISITOR_KV.entries]);
assert.equal(serializedKv.includes(ownerIp), false);
assert.equal(serializedKv.includes(visitorIp), false);

console.log('Visitor counting test passed: repeat counting, owner exclusion, and rollback protection.');
