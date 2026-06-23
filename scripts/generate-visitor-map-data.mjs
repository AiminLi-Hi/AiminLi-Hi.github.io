import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const overviewSourcePath = path.join(root, 'node_modules', 'world-atlas', 'countries-110m.json');
const detailSourcePath = path.join(root, 'node_modules', 'world-atlas', 'countries-50m.json');
const syncDataPath = path.join(root, 'public', 'homepage-sync-data.js');
const outputPath = path.join(root, 'public', 'visitor-map-data.js');

const overviewTopo = JSON.parse(fs.readFileSync(overviewSourcePath, 'utf8'));
const detailTopo = JSON.parse(fs.readFileSync(detailSourcePath, 'utf8'));
const overviewCountries = feature(overviewTopo, overviewTopo.objects.countries);
const detailCountries = feature(detailTopo, detailTopo.objects.countries);
const borders = mesh(overviewTopo, overviewTopo.objects.countries, (a, b) => a !== b);

const viewBox = { width: 720, height: 330 };
const projection = geoNaturalEarth1().fitExtent(
  [[18, 16], [viewBox.width - 18, viewBox.height - 14]],
  { type: 'Sphere' }
);
const pathGenerator = geoPath(projection);

const fallbackVisitorCountries = [
  { code: 'US', name: 'United States', matchName: 'United States', count: 4, delay: 0 },
  { code: 'TR', name: 'Türkiye', matchName: 'Turkey', count: 2, delay: 0.4 },
  { code: 'SG', name: 'Singapore', matchName: 'Singapore', count: 1, delay: 0.8 },
  { code: 'CN', name: 'China', matchName: 'China', count: 1, delay: 1.2 }
];

function readVisitorCountries() {
  if (!fs.existsSync(syncDataPath)) return fallbackVisitorCountries;
  const source = fs.readFileSync(syncDataPath, 'utf8');
  const match = source.match(/window\.HOMEPAGE_SYNC_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
  if (!match) return fallbackVisitorCountries;
  try {
    const data = JSON.parse(match[1]);
    return data.visitorSnapshot?.ranking?.length ? data.visitorSnapshot.ranking : fallbackVisitorCountries;
  } catch {
    return fallbackVisitorCountries;
  }
}

function normalizeName(value = '') {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const countryNameAliases = new Map([
  ['united states', 'united states of america'],
  ['usa', 'united states of america'],
  ['turkiye', 'turkey'],
  ['czechia', 'czech republic'],
  ['russia', 'russian federation'],
  ['republic of korea', 'south korea'],
  ['democratic people s republic of korea', 'north korea'],
  ['vietnam', 'viet nam'],
  ['laos', 'lao pdr'],
  ['syria', 'syrian arab republic'],
  ['iran', 'iran islamic republic of'],
  ['moldova', 'moldova republic of'],
  ['bolivia', 'bolivia plurinational state of'],
  ['venezuela', 'venezuela bolivarian republic of'],
  ['tanzania', 'united republic of tanzania']
]);

const GREATER_CHINA_DETAIL_NAMES = ['taiwan', 'hong kong', 'macao'];

const countryPaths = overviewCountries.features
  .map((country, index) => {
    const [x, y] = pathGenerator.centroid(country);
    return {
      id: country.id == null ? `unknown-${index}` : String(country.id).padStart(3, '0'),
      name: country.properties?.name || String(country.id),
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      d: pathGenerator(country)
    };
  })
  .filter(country => country.d);

const detailCountriesById = new Map(detailCountries.features.map(country => [
  String(country.id).padStart(3, '0'),
  country
]));
const detailCountriesByName = new Map(detailCountries.features.map(country => [
  normalizeName(country.properties?.name || ''),
  country
]));

function findCountryGeometry(country) {
  if (country.id && detailCountriesById.has(String(country.id).padStart(3, '0'))) {
    return detailCountriesById.get(String(country.id).padStart(3, '0'));
  }
  const normalized = normalizeName(country.matchName || country.name);
  return detailCountriesByName.get(countryNameAliases.get(normalized) || normalized);
}

function visitorGeometry(country) {
  const baseGeometry = findCountryGeometry(country);
  if (String(country.code || '').trim().toUpperCase() !== 'CN') return baseGeometry;

  const geometries = [
    baseGeometry,
    ...GREATER_CHINA_DETAIL_NAMES.map(name => detailCountriesByName.get(name))
  ].filter(Boolean);

  if (geometries.length <= 1) return baseGeometry;
  return {
    type: 'FeatureCollection',
    features: geometries
  };
}

const activeCountries = readVisitorCountries().map((country, index) => {
  const geometry = visitorGeometry(country);
  const [x, y] = geometry ? pathGenerator.centroid(geometry) : [viewBox.width / 2, viewBox.height / 2];
  const mergedMapRegions = String(country.code || '').trim().toUpperCase() === 'CN'
    ? GREATER_CHINA_DETAIL_NAMES
    : undefined;
  return {
    ...country,
    delay: country.delay ?? Number((index * 0.4).toFixed(1)),
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1)),
    d: geometry ? pathGenerator(geometry) : '',
    ...(mergedMapRegions ? { mergedMapRegions } : {})
  };
});

const payload = {
  viewBox,
  projection: 'Natural Earth',
  source: 'Natural Earth via topojson/world-atlas countries-110m background and countries-50m active regions',
  borders: pathGenerator(borders),
  countries: countryPaths,
  activeCountries
};

const banner = '/* Generated by scripts/generate-visitor-map-data.mjs. Do not edit by hand. */';
fs.writeFileSync(
  outputPath,
  `${banner}\nwindow.HOMEPAGE_VISITOR_WORLD_MAP = ${JSON.stringify(payload)};\n`
);

console.log(`Wrote ${path.relative(root, outputPath)} with ${countryPaths.length} country paths.`);
