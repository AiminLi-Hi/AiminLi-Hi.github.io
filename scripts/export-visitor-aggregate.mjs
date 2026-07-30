import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'public', 'homepage-sync-data.js'), 'utf8');
const liveStatsEndpoint = (
  process.env.VISITOR_STATS_ENDPOINT
  || 'https://aimin-homepage-visitors-api.pages.dev'
).replace(/\/+$/, '');
const allowRollback = process.env.ALLOW_VISITOR_ROLLBACK === '1';
const match = source.match(/window\.HOMEPAGE_SYNC_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
if (!match) throw new Error('Unable to parse public/homepage-sync-data.js');

const payload = JSON.parse(match[1]);
const snapshot = payload.visitorSnapshot;
if (!snapshot || !Array.isArray(snapshot.ranking)) {
  throw new Error('The synchronized visitor snapshot is missing.');
}

const countries = Object.fromEntries(
  snapshot.ranking
    .map(country => [String(country.code || '').toUpperCase(), Number(country.count) || 0])
    .filter(([code, count]) => /^[A-Z]{2}$/.test(code) && count > 0)
);
const regions = Object.fromEntries(
  Object.entries(snapshot.regions || {})
    .map(([country, entries]) => [
      country,
      Object.fromEntries(
        (entries || [])
          .map(region => [
            String(region.code || '').toUpperCase(),
            {
              count: Number(region.count) || 0,
              name: String(region.name || region.code || '').trim(),
            },
          ])
          .filter(([code, region]) => code && region.count > 0)
      ),
    ])
    .filter(([, entries]) => Object.keys(entries).length)
);

const aggregate = {
  pageviews: Number(snapshot.pageviews) || Object.values(countries).reduce((sum, count) => sum + count, 0),
  countries,
  regions,
  ...(snapshot.weekly ? { weekly: snapshot.weekly } : {}),
  updatedAt: snapshot.updatedAt || payload.generatedAt || new Date().toISOString(),
};
const countryTotal = Object.values(countries).reduce((sum, count) => sum + count, 0);
if (aggregate.pageviews !== countryTotal) {
  throw new Error(
    `Visitor snapshot is inconsistent: pageviews=${aggregate.pageviews}, country total=${countryTotal}`
  );
}

const response = await fetch(`${liveStatsEndpoint}/stats?t=${Date.now()}`, {
  headers: {
    accept: 'application/json',
    'user-agent': 'Aimin homepage visitor recovery guard',
  },
});
if (!response.ok) {
  throw new Error(`Unable to verify live visitor statistics: ${response.status} ${response.statusText}`);
}
const livePayload = await response.json();
const liveSnapshot = livePayload.visitorSnapshot || livePayload;
const livePageviews = Number(liveSnapshot.pageviews) || 0;

if (aggregate.pageviews < livePageviews && !allowRollback) {
  throw new Error(
    `Refusing visitor rollback: static snapshot has ${aggregate.pageviews}, live API has ${livePageviews}. `
    + 'Set ALLOW_VISITOR_ROLLBACK=1 only for an explicitly approved destructive recovery.'
  );
}

process.stderr.write(
  `Visitor aggregate verified: static=${aggregate.pageviews}, live=${livePageviews}, rollback=${allowRollback}.\n`
);
process.stdout.write(JSON.stringify(aggregate));
