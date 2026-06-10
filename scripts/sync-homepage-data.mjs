import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'public', 'homepage-sync-data.js');
const dataPath = path.join(root, 'src', 'data', 'homepageData.js');

const FLAG_COUNTER_ID = process.env.FLAG_COUNTER_ID || 'Ad32';
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
    ]
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

function displayCountryName(name) {
  if (name === 'Turkey') return 'Türkiye';
  return name;
}

async function fetchVisitorSnapshot(previous) {
  const url = `https://s01.flagcounter.com/countries/${FLAG_COUNTER_ID}/`;
  const html = await fetchText(url);
  const rowPattern = /<tr><td width=20>[\s\S]*?<\/tr>/g;
  const ranking = [];
  for (const [row] of html.matchAll(rowPattern)) {
    const codeMatch = row.match(/class="flag-([a-z]{2})-png"/i);
    const countryMatch = row.match(/\/factbook\/[a-z]{2}\/[^>]*>[\s\S]*?<u>([\s\S]*?)<\/u>/i);
    const countMatch = row.match(/<td width=1%><font face=arial size=2>([\d,]+)<\/font><\/td>/i);
    if (!codeMatch || !countryMatch || !countMatch) continue;
    const matchName = stripTags(countryMatch[1]);
    ranking.push({
      code: codeMatch[1].toUpperCase(),
      name: displayCountryName(matchName),
      matchName,
      count: Number(countMatch[1].replace(/,/g, '')),
      delay: Number((ranking.length * 0.4).toFixed(1))
    });
  }

  if (!ranking.length) throw new Error('No FlagCounter countries were parsed.');
  const previousSnapshot = previous.visitorSnapshot || FALLBACK_DATA.visitorSnapshot;
  return {
    pageviews: previousSnapshot.pageviews || ranking.reduce((sum, country) => sum + country.count, 0),
    countries: ranking.length,
    ranking
  };
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

async function main() {
  const previous = readPreviousData();
  const next = {
    ...previous,
    generatedAt: new Date().toISOString()
  };

  try {
    next.visitorSnapshot = await fetchVisitorSnapshot(previous);
    console.log(`FlagCounter: parsed ${next.visitorSnapshot.ranking.length} countries.`);
  } catch (error) {
    next.visitorSnapshot = previous.visitorSnapshot || FALLBACK_DATA.visitorSnapshot;
    console.warn(`FlagCounter sync skipped: ${error.message}`);
  }

  try {
    const scholar = await fetchScholarData(previous);
    next.scholar = {
      profileUrl: scholar.profileUrl,
      citedBy: scholar.citedBy,
      totalArticles: scholar.totalArticles,
      latest: scholar.latest
    };
    next.extraPublications = mergeByKey(
      (previous.extraPublications || []).filter(item => isHomepageCandidate(item)),
      scholar.extraPublications
    );
    next.extraNews = mergeByKey(
      (previous.extraNews || []).filter(item => isHomepageCandidate(item)),
      scholar.extraNews
    );
    console.log(`Google Scholar: parsed ${scholar.latest.length} latest rows, ${scholar.extraPublications.length} new homepage candidates.`);
  } catch (error) {
    next.scholar = previous.scholar || FALLBACK_DATA.scholar;
    next.extraPublications = previous.extraPublications || [];
    next.extraNews = previous.extraNews || [];
    console.warn(`Google Scholar sync skipped: ${error.message}`);
  }

  const banner = '/* Generated by scripts/sync-homepage-data.mjs. Do not edit by hand. */';
  fs.writeFileSync(outputPath, `${banner}\nwindow.HOMEPAGE_SYNC_DATA = ${JSON.stringify(next, null, 2)};\n`);
  console.log(`Wrote ${path.relative(root, outputPath)}.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
