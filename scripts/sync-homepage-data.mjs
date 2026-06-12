import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'public', 'homepage-sync-data.js');
const dataPath = path.join(root, 'src', 'data', 'homepageData.js');

const args = new Set(process.argv.slice(2));
const syncVisitors = !args.has('--scholar-only');
const syncScholar = !args.has('--visitors-only');

if (args.has('--scholar-only') && args.has('--visitors-only')) {
  throw new Error('Use either --scholar-only or --visitors-only, not both.');
}

const VISITOR_STATS_ENDPOINT = (process.env.VITE_VISITOR_STATS_ENDPOINT || process.env.VISITOR_STATS_ENDPOINT || '').replace(/\/+$/, '');
const SCHOLAR_USER_ID = process.env.SCHOLAR_USER_ID || 'nyl1-EMAAAAJ';
const SCHOLAR_PROFILE_URL =
  process.env.SCHOLAR_PROFILE_URL ||
  `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en&cstart=0&pagesize=100&sortby=pubdate`;

const FALLBACK_DATA = {
  generatedAt: null,
  visitorSnapshot: {
    pageviews: 39,
    countries: 4,
    ranking: [
      { code: 'US', name: 'United States', matchName: 'United States', count: 4, delay: 0 },
      { code: 'TR', name: 'Türkiye', matchName: 'Turkey', count: 2, delay: 0.4 },
      { code: 'SG', name: 'Singapore', matchName: 'Singapore', count: 1, delay: 0.8 },
      { code: 'CN', name: 'China', matchName: 'China', count: 1, delay: 1.2 }
    ],
    regions: {}
  },
  scholar: {
    profileUrl: SCHOLAR_PROFILE_URL,
    citedBy: null,
    totalArticles: null,
    latest: []
  },
  extraNews: [],
  extraPublications: []
};

const VENUE_PATTERNS = [
  [/transactions on mobile computing|mobile computing/i, 'IEEE TMC', 'TMC'],
  [/internet of things journal|iotj|jiot/i, 'IEEE IoTJ', 'IoTJ'],
  [/international symposium on information theory|isit/i, 'IEEE ISIT', 'ISIT'],
  [/vehicular technology conference|vtc/i, 'IEEE VTC', 'VTC'],
  [/transactions on information theory/i, 'IEEE TIT', 'TIT'],
  [/transactions on communications/i, 'IEEE TCOM', 'TCOM'],
  [/transactions on wireless communications/i, 'IEEE TWC', 'TWC'],
  [/wireless communications/i, 'IEEE WCM', 'WCM'],
  [/open journal of the communications society/i, 'IEEE OJ-COMS', 'OJ-COMS'],
  [/network/i, 'IEEE Network', 'Network'],
  [/allerton/i, 'Allerton', 'Allerton'],
  [/mobihoc/i, 'ACM Mobihoc', 'Mobihoc'],
  [/wcnc/i, 'IEEE WCNC', 'WCNC'],
  [/infocom/i, 'IEEE INFOCOM', 'INFOCOM'],
  [/globecom/i, 'IEEE Globecom', 'Globecom'],
  [/icct/i, 'IEEE ICCT', 'ICCT'],
  [/arxiv/i, 'arXiv', 'arXiv']
];

const HOMEPAGE_ALLOWED_VENUE_PATTERNS = [
  /IEEE TMC/i,
  /IEEE IoTJ/i,
  /IEEE ISIT/i,
  /IEEE VTC/i,
  /IEEE TIT/i
];

function readPreviousData() {
  if (!fs.existsSync(outputPath)) return FALLBACK_DATA;
  const source = fs.readFileSync(outputPath, 'utf8');
  const match = source.match(/window\.HOMEPAGE_SYNC_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
  if (!match) return FALLBACK_DATA;
  try {
    return { ...FALLBACK_DATA, ...JSON.parse(match[1]) };
  } catch {
    return FALLBACK_DATA;
  }
}

function decodeHtml(value = '') {
  return value
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8230;/g, '...')
    .replace(/�/g, '')
    .trim();
}

function stripTags(value = '') {
  return decodeHtml(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' '));
}

function normalizeTitle(value = '') {
  return stripTags(value)
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, ' ')
    .trim();
}

function slugify(value = '') {
  return normalizeTitle(value)
    .replace(/\s+/g, '-')
    .slice(0, 72)
    .replace(/^-|-$/g, '');
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; homepage-sync/1.0; +https://aiminli-hi.github.io/)'
    }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function fetchVisitorSnapshot(previous) {
  if (!VISITOR_STATS_ENDPOINT) {
    return previous.visitorSnapshot || FALLBACK_DATA.visitorSnapshot;
  }

  const response = await fetch(`${VISITOR_STATS_ENDPOINT}/stats?t=${Date.now()}`, {
    headers: {
      'accept': 'application/json',
      'user-agent': 'Mozilla/5.0 (compatible; homepage-sync/1.0; +https://aiminli-hi.github.io/)'
    }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const payload = await response.json();
  const snapshot = payload.visitorSnapshot || payload;
  const ranking = Array.isArray(snapshot.ranking)
    ? snapshot.ranking
      .filter(country => country?.code && Number.isFinite(Number(country.count)))
      .map((country, index) => ({
        code: String(country.code).toUpperCase(),
        name: country.name || country.code,
        matchName: country.matchName || country.name || country.code,
        count: Number(country.count),
        delay: Number((index * 0.4).toFixed(1))
      }))
    : [];

  if (!ranking.length) throw new Error('No visitor API countries were returned.');
  const previousSnapshot = previous.visitorSnapshot || FALLBACK_DATA.visitorSnapshot;
  const countryTotal = ranking.reduce((sum, country) => sum + country.count, 0);
  return {
    pageviews: Math.max(Number(snapshot.pageviews) || 0, countryTotal, Number(previousSnapshot.pageviews) || 0),
    countries: Number(snapshot.countries) || ranking.length,
    ranking,
    regions: cleanVisitorRegions(snapshot.regions),
    updatedAt: snapshot.updatedAt || payload.generatedAt || previousSnapshot.updatedAt || null
  };
}

function cleanVisitorRegions(regions = {}) {
  if (!regions || typeof regions !== 'object') return {};
  return Object.fromEntries(
    Object.entries(regions)
      .map(([countryCode, regionRanking]) => [
        String(countryCode).toUpperCase(),
        Array.isArray(regionRanking)
          ? regionRanking
            .filter(region => region?.code && Number.isFinite(Number(region.count)))
            .map(region => ({
              code: String(region.code).toUpperCase(),
              name: region.name || region.code,
              count: Number(region.count)
            }))
          : []
      ])
      .filter(([, regionRanking]) => regionRanking.length)
  );
}

function inferVenue(venueText) {
  for (const [pattern, shortVenue, newsLabel] of VENUE_PATTERNS) {
    if (pattern.test(venueText)) return { shortVenue, newsLabel };
  }
  return { shortVenue: 'Scholar', newsLabel: 'Scholar' };
}

function isHomepageCandidate(item, shortVenue = item.shortVenue || item.venue_short || item.newsLabel || '') {
  if (!item?.title) return false;
  if (/arxiv/i.test(`${shortVenue} ${item.venue || ''}`)) return false;
  return HOMEPAGE_ALLOWED_VENUE_PATTERNS.some(pattern => pattern.test(`${shortVenue} ${item.venue || ''} ${item.title}`));
}

function inferType(venueText) {
  return /conference|symposium|workshop|globecom|infocom|wcnc|vtc|isit|icct|allerton|mobihoc/i.test(venueText)
    ? 'Conference'
    : 'Journal';
}

function inferKeywords(title) {
  const lower = title.toLowerCase();
  const keywords = [];
  if (/age|aoi|fresh/.test(lower)) keywords.push('Age of Information');
  if (/semantic|goal/.test(lower)) keywords.push('Goal-Oriented Communications');
  if (/spinal|coding|bler|error/.test(lower)) keywords.push('Channel Coding');
  if (/sampling/.test(lower)) keywords.push('Sampling');
  if (/routing/.test(lower)) keywords.push('Routing');
  if (/uav|satellite|space|sagin/.test(lower)) keywords.push('SAGIN');
  return keywords.length ? keywords.slice(0, 4) : ['Google Scholar'];
}

function parseScholarRows(html) {
  const rows = [];
  for (const [, row] of html.matchAll(/<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g)) {
    const titleMatch = row.match(/<a(?=[^>]*class="gsc_a_at")([^>]*)>([\s\S]*?)<\/a>/i);
    const grayMatches = [...row.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)].map(match => stripTags(match[1]));
    const yearMatch = row.match(/<span class="gsc_a_h[^"]*"[^>]*>(\d{4})<\/span>/i);
    const citesMatch = row.match(/class="gsc_a_ac[^"]*"[^>]*>([\d,]*)<\/a>/i);
    if (!titleMatch) continue;
    const href = decodeHtml(titleMatch[1].match(/href="([^"]+)"/i)?.[1] || '');
    rows.push({
      title: stripTags(titleMatch[2]),
      href: href.startsWith('http') ? href : `https://scholar.google.com${href}`,
      authors: grayMatches[0] || '',
      venue: grayMatches[1] || '',
      year: yearMatch ? Number(yearMatch[1]) : null,
      citations: citesMatch?.[1] ? Number(citesMatch[1].replace(/,/g, '')) : 0
    });
  }
  return rows;
}

function readKnownTitles() {
  if (!fs.existsSync(dataPath)) return new Set();
  const source = fs.readFileSync(dataPath, 'utf8');
  const titles = new Set();
  for (const match of source.matchAll(/title:\s*(["'])([\s\S]*?)\1/g)) {
    titles.add(normalizeTitle(match[2]));
  }
  return titles;
}

async function fetchScholarData(previous) {
  const html = await fetchText(SCHOLAR_PROFILE_URL);
  if (/captcha|unusual traffic|sorry\/index/i.test(html)) {
    throw new Error('Google Scholar returned a CAPTCHA or anti-abuse page.');
  }

  const rows = parseScholarRows(html);
  if (!rows.length) throw new Error('No Google Scholar publication rows were parsed.');

  const metaDescription = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] || '';
  const citedBy = Number((decodeHtml(metaDescription).match(/Cited by ([\d,]+)/i)?.[1] || '').replace(/,/g, '')) || null;
  const totalArticles = Number((html.match(/id="gsc_a_nn">Articles\s+\d+[^0-9]+([\d,]+)/i)?.[1] || '').replace(/,/g, '')) || rows.length;
  const knownTitles = readKnownTitles();
  const currentYear = new Date().getUTCFullYear();
  const previousExtraTitles = new Set((previous.extraPublications || []).map(pub => normalizeTitle(pub.title)));

  const extraPublications = rows
    .filter(item => item.year && item.year >= currentYear - 1)
    .filter(item => !knownTitles.has(normalizeTitle(item.title)))
    .filter(item => !previousExtraTitles.has(normalizeTitle(item.title)))
    .map(item => {
      const { shortVenue, newsLabel } = inferVenue(item.venue);
      return {
        key: `scholar-${slugify(item.title)}`,
        year: item.year,
        tag: 'Google Scholar',
        title: item.title,
        authors: item.authors.replace(/\bA Li\b/g, 'Aimin Li'),
        venue: item.venue.replace(/\s*,\s*\d{4}$/, ''),
        shortVenue,
        type: inferType(item.venue),
        keywords: inferKeywords(item.title),
        summary: `Latest Google Scholar record: ${item.venue.replace(/\s*,\s*\d{4}$/, '')}.`,
        href: item.href,
        newsLabel
      };
    })
    .filter(item => isHomepageCandidate(item))
    .slice(0, 5);

  const month = new Date().toISOString().slice(0, 7);
  const extraNews = extraPublications.map(pub => ({
    key: `${pub.key}-news`,
    date: month,
    label: pub.newsLabel,
    title: pub.title,
    html: `Paper titled <strong>${pub.title}</strong> was added to <strong>Google Scholar</strong>${pub.venue ? ` (${pub.venue})` : ''}.`,
    href: pub.href
  }));

  return {
    profileUrl: SCHOLAR_PROFILE_URL,
    citedBy,
    totalArticles,
    latest: rows.slice(0, 12),
    extraPublications,
    extraNews
  };
}

function mergeByKey(base = [], incoming = []) {
  const output = [];
  const seen = new Set();
  for (const item of [...base, ...incoming]) {
    const key = item.key || normalizeTitle(item.title || JSON.stringify(item));
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(item);
  }
  return output;
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function cleanVisitorSnapshot(snapshot = {}) {
  return {
    pageviews: Number(snapshot.pageviews) || 0,
    countries: Number(snapshot.countries) || 0,
    ranking: (snapshot.ranking || []).map(country => ({
      code: country.code,
      name: country.name,
      matchName: country.matchName || country.name,
      count: Number(country.count) || 0
    })),
    regions: cleanVisitorRegions(snapshot.regions)
  };
}

function cleanScholarData(scholar = {}) {
  return {
    profileUrl: scholar.profileUrl || SCHOLAR_PROFILE_URL,
    citedBy: scholar.citedBy ?? null,
    totalArticles: scholar.totalArticles ?? null,
    latest: scholar.latest || []
  };
}

function stableEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function main() {
  const previous = readPreviousData();
  const next = cloneData(previous);
  const now = new Date().toISOString();
  let hasMeaningfulChange = false;

  if (syncVisitors) {
    try {
      const visitorSnapshot = await fetchVisitorSnapshot(previous);
      if (!stableEqual(cleanVisitorSnapshot(previous.visitorSnapshot), cleanVisitorSnapshot(visitorSnapshot))) {
        next.visitorSnapshot = { ...visitorSnapshot, updatedAt: visitorSnapshot.updatedAt || now };
        hasMeaningfulChange = true;
      }
      console.log(`Visitor API: parsed ${visitorSnapshot.ranking.length} countries.`);
    } catch (error) {
      next.visitorSnapshot = previous.visitorSnapshot || FALLBACK_DATA.visitorSnapshot;
      console.warn(`Visitor API sync skipped: ${error.message}`);
    }
  } else {
    next.visitorSnapshot = previous.visitorSnapshot || FALLBACK_DATA.visitorSnapshot;
    console.log('Visitor sync skipped by mode.');
  }

  if (syncScholar) {
    try {
      const scholar = await fetchScholarData(previous);
      const nextScholar = {
        profileUrl: scholar.profileUrl,
        citedBy: scholar.citedBy,
        totalArticles: scholar.totalArticles,
        latest: scholar.latest
      };
      const nextExtraPublications = mergeByKey(
        (previous.extraPublications || []).filter(item => isHomepageCandidate(item)),
        scholar.extraPublications
      );
      const nextExtraNews = mergeByKey(
        (previous.extraNews || []).filter(item => isHomepageCandidate(item)),
        scholar.extraNews
      );

      if (
        !stableEqual(cleanScholarData(previous.scholar), cleanScholarData(nextScholar)) ||
        !stableEqual(previous.extraPublications || [], nextExtraPublications) ||
        !stableEqual(previous.extraNews || [], nextExtraNews)
      ) {
        next.scholar = { ...nextScholar, updatedAt: now };
        next.extraPublications = nextExtraPublications;
        next.extraNews = nextExtraNews;
        hasMeaningfulChange = true;
      } else {
        next.scholar = previous.scholar || FALLBACK_DATA.scholar;
        next.extraPublications = previous.extraPublications || [];
        next.extraNews = previous.extraNews || [];
      }
      console.log(`Google Scholar: parsed ${scholar.latest.length} latest rows, ${scholar.extraPublications.length} new homepage candidates.`);
    } catch (error) {
      next.scholar = previous.scholar || FALLBACK_DATA.scholar;
      next.extraPublications = previous.extraPublications || [];
      next.extraNews = previous.extraNews || [];
      console.warn(`Google Scholar sync skipped: ${error.message}`);
    }
  } else {
    next.scholar = previous.scholar || FALLBACK_DATA.scholar;
    next.extraPublications = previous.extraPublications || [];
    next.extraNews = previous.extraNews || [];
    console.log('Google Scholar sync skipped by mode.');
  }

  if (hasMeaningfulChange || !previous.generatedAt) {
    next.generatedAt = now;
  }

  if (!hasMeaningfulChange && fs.existsSync(outputPath)) {
    console.log('No synchronized homepage data changes.');
    return;
  }

  const banner = '/* Generated by scripts/sync-homepage-data.mjs. Do not edit by hand. */';
  fs.writeFileSync(outputPath, `${banner}\nwindow.HOMEPAGE_SYNC_DATA = ${JSON.stringify(next, null, 2)};\n`);
  console.log(`Wrote ${path.relative(root, outputPath)}.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
