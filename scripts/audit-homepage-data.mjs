import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE_PUBLICATIONS, PROFILE_DATA } from '../src/data/homepageData.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const checks = [];
const fail = (message) => failures.push(message);
const pass = (message) => checks.push(message);

const duplicateValues = (values) => {
  const seen = new Set();
  return values.filter((value) => {
    const key = String(value || '').trim().toLowerCase();
    if (!key || seen.has(key)) return Boolean(key);
    seen.add(key);
    return false;
  });
};

for (const field of ['id', 'title']) {
  const duplicates = duplicateValues(BASE_PUBLICATIONS.map((publication) => publication[field]));
  if (duplicates.length) fail(`Duplicate publication ${field}: ${duplicates.join(', ')}`);
  else pass(`Publication ${field}s are unique.`);
}

for (const publication of BASE_PUBLICATIONS) {
  for (const field of ['id', 'year', 'title', 'authors', 'venue', 'venue_short', 'type']) {
    if (!publication[field]) fail(`${publication.id || publication.title || 'Unknown publication'} is missing ${field}.`);
  }
  for (const href of Object.values(publication.links || {})) {
    if (!String(href).startsWith('/')) continue;
    const filePath = path.join(root, 'public', String(href).replace(/^\/+/, ''));
    if (!fs.existsSync(filePath)) fail(`${publication.id}: local asset does not exist: ${href}`);
  }
}
pass(`${BASE_PUBLICATIONS.length} publications include the required metadata and local assets.`);

const en = PROFILE_DATA.en;
const zh = PROFILE_DATA.zh;
const parityChecks = [
  ['navigation entries', Object.keys(en.nav).length, Object.keys(zh.nav).length],
  ['news entries', en.news.length, zh.news.length],
  ['timeline entries', en.timeline.length, zh.timeline.length],
  ['honors', en.awards.length, zh.awards.length],
  ['review venues', en.service.reviewer.length, zh.service.reviewer.length],
  ['teaching entries', en.teaching.length, zh.teaching.length],
  ['talks', en.talks.length, zh.talks.length],
  ['mentoring groups', en.mentoring.groups.length, zh.mentoring.groups.length],
  [
    'mentoring people',
    en.mentoring.groups.flatMap((group) => group.students).length,
    zh.mentoring.groups.flatMap((group) => group.students).length,
  ],
];
for (const [label, enCount, zhCount] of parityChecks) {
  if (enCount !== zhCount) fail(`${label} differ between English (${enCount}) and Chinese (${zhCount}).`);
  else pass(`${label}: bilingual parity (${enCount}).`);
}

if (Object.keys(en.nav).join('|') !== Object.keys(zh.nav).join('|')) {
  fail('English and Chinese navigation keys differ.');
}

const publicationAnchors = new Set(BASE_PUBLICATIONS.map((publication) => `#pub-${publication.id}`));
for (const [language, profile] of Object.entries(PROFILE_DATA)) {
  for (const item of profile.news) {
    if (String(item.link || '').startsWith('#pub-') && !publicationAnchors.has(item.link)) {
      fail(`${language} news links to a missing publication: ${item.link}`);
    }
    const tags = [...String(item.content || '').matchAll(/<\/?([a-z0-9]+)(?:\s+[^>]*)?>/gi)];
    for (const [, tag] of tags) {
      if (!['strong', 'span'].includes(tag.toLowerCase())) fail(`${language} news contains unsupported HTML tag <${tag}>.`);
    }
  }
  if (profile.mentoring.groups?.length && profile.mentoring.students?.length) {
    fail(`${language} mentoring duplicates grouped students in a flat students array.`);
  }
}
pass('Internal publication news links and news markup are valid.');

const greaterChinaFiles = [
  'src/App.jsx',
  'scripts/sync-homepage-data.mjs',
  'workers/pages-api/_worker.js',
  'workers/visitor-stats-worker.js',
];
for (const relativePath of greaterChinaFiles) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  for (const code of ['HK', 'TW', 'MO']) {
    if (!new RegExp(`\\b${code}\\s*:`).test(source)) fail(`${relativePath} is missing the ${code} -> CN visitor override.`);
  }
}
pass('Hong Kong, Taiwan, and Macao are normalized under China in every visitor pipeline.');

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (/visitor-map-data\.js/.test(indexHtml)) fail('The large visitor map bundle is still loaded synchronously in index.html.');
else pass('Visitor map data is lazy-loaded instead of blocking every page.');

if (failures.length) {
  console.error('Homepage audit failed:\n');
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`Homepage audit passed (${checks.length} checks):`);
checks.forEach((message) => console.log(`- ${message}`));
