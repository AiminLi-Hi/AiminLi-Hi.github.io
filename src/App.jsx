import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  Moon, Sun, MapPin, Mail, Linkedin, 
  Github, GraduationCap, Briefcase, FileText, 
  ExternalLink, BookOpen, ChevronRight,
  Download, Play, Youtube, Copy,
  Quote, Search, Star, Trophy, Video,
  School, ChevronDown, ChevronUp, User, Users,
  Sparkles, Medal, Calendar, Mic2, CheckCircle2,
  Map as MapIcon, ArrowUp, Presentation, Send, Tag, Plus,
  MessageCircle, Plane, Landmark, Network, GitCommit,
  Maximize2, Menu, X, FileImage
} from 'lucide-react';
import { BASE_PUBLICATIONS, PROFILE_DATA } from './data/homepageData';
import { getAuthorList, getCitationFormats } from './utils/citations';

// ==========================================
// --- 自定义图标组件 (Custom Icons) ---
// ==========================================

const ResearchGateIcon = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M19.586 0c-8.14 0-13.613 5.283-13.613 11.81V24H0v-6.933h3.26V11.81C3.26 5.284 8.733 0 16.873 0h2.713v3.787h-2.713c-4.393 0-7.16 2.6-7.16 6.427V24h6.18v-7.667h3.627l3.033 7.667H24l-3.26-8.2c2.487-1.133 3.96-3.64 3.96-6.393C24.7 4.3 22.673 0 19.586 0zM16.287 9.567h-4.127v-1.94h4.127c1.44 0 2.34.747 2.34 1.94 0 1.193-.9 1.94-2.34 1.94z"/>
  </svg>
);

const OrcidIcon = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.306v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>
  </svg>
);

const GoogleScholarIcon = ({ size = 24, className }) => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
   </svg>
);

const ArxivIcon = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M16.22 5.25L13.35 12.9L18.55 20.81C19.32 19.82 19.78 18.65 19.9 17.46C20.02 16.27 19.77 15.11 19.23 14.08C18.69 13.05 17.88 12.18 16.88 11.59C15.88 11.01 14.73 10.71 13.57 10.75H12V5.25H16.22ZM5.44 20.81L10.65 12.9L7.77 5.25H12V10.75C10.84 10.71 9.69 11.01 8.69 11.59C7.69 12.18 6.88 13.05 6.34 14.08C5.8 15.11 5.55 16.27 5.67 17.46C5.79 18.65 6.25 19.82 7.02 20.81H5.44Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.61 3.5C3.67 4.84 3.05 6.4 2.78 8.04C2.51 9.68 2.61 11.36 3.08 12.96C3.55 14.56 4.38 16.03 5.52 17.25C6.66 18.47 8.06 19.4 9.63 19.96L12 23.5L14.37 19.96C15.94 19.4 17.34 18.47 18.48 17.25C19.62 16.03 20.45 14.56 20.92 12.96C21.39 11.36 21.49 9.68 21.22 8.04C20.95 6.4 20.33 4.84 19.39 3.5H4.61Z" fillOpacity="0.2"/>
  </svg>
);

// ==========================================
// --- 逻辑层 & 组件 (Logic & Components) ---
// ==========================================

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const useSEO = (title, description, lang = 'en', darkMode = false) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
    upsertMeta("meta[name='description']", { name: 'description', content: description });
    upsertMeta("meta[name='theme-color']", { name: 'theme-color', content: darkMode ? '#081524' : '#f8fafc' });
    upsertMeta("meta[property='og:title']", { property: 'og:title', content: title });
    upsertMeta("meta[property='og:description']", { property: 'og:description', content: description });
    upsertMeta("meta[name='twitter:title']", { name: 'twitter:title', content: title });
    upsertMeta("meta[name='twitter:description']", { name: 'twitter:description', content: description });
  }, [title, description, lang, darkMode]);
};

const DEFAULT_PRODUCTION_VISITOR_ENDPOINT = 'https://aimin-homepage-visitors-api.pages.dev';
const isProductionHomepage = () => (
  typeof window !== 'undefined' && window.location.hostname === 'aiminli-hi.github.io'
);
const REALTIME_VISITOR_ENDPOINT = (
  import.meta.env.VITE_VISITOR_STATS_ENDPOINT
  || (isProductionHomepage() ? DEFAULT_PRODUCTION_VISITOR_ENDPOINT : '')
).replace(/\/+$/, '');
const VISITOR_REFRESH_MS = 60_000;
const VISITOR_BEACON_TIMEOUT_MS = 3_000;
const VISITOR_COUNTRY_PREVIEW_LIMIT = 5;
const MENTORING_GROUP_PREVIEW_LIMIT = 1;
const PAGE_FADE_OUT_MS = 220;
const PAGE_FADE_IN_MS = 520;
let visitorHitRecordedForPage = false;
const PAGE_KEYS = ['about', 'news', 'timeline', 'publications', 'awards', 'service', 'teaching', 'mentoring', 'talks'];
const PUBLICATION_HASH_PREFIX = 'pub-';
const getCurrentHashValue = () => (
  typeof window === 'undefined'
    ? ''
    : decodeURIComponent(window.location.hash.replace(/^#/, '').trim())
);
const isPublicationHashValue = (hash = '') => hash.startsWith(PUBLICATION_HASH_PREFIX);
const resolvePageFromHash = () => {
  if (typeof window === 'undefined') return 'about';
  const hash = getCurrentHashValue();
  if (hash === 'submitted') return 'publications';
  if (isPublicationHashValue(hash)) return 'publications';
  return PAGE_KEYS.includes(hash) ? hash : 'about';
};
const HOMEPAGE_ALLOWED_SYNC_PATTERNS = [
  /\bTMC\b|transactions on mobile computing/i,
  /\bIoTJ\b|\bJIOT\b|internet of things journal/i,
  /\bISIT\b|international symposium on information theory/i,
  /\bIROS\b|intelligent robots and systems/i,
  /\bVTC\b|vehicular technology conference/i,
  /\bTIT\b|transactions on information theory/i,
];
const DEFAULT_VISITOR_SNAPSHOT = {
  pageviews: 39,
  countries: 4,
  ranking: [
    { code: 'US', name: 'United States', matchName: 'United States', count: 4, delay: 0, x: 23.5, y: 42.5 },
    { code: 'TR', name: 'Türkiye', matchName: 'Turkey', count: 2, delay: 0.4, x: 55.6, y: 41.2 },
    { code: 'SG', name: 'Singapore', matchName: 'Singapore', count: 1, delay: 0.8, x: 72.8, y: 64.5 },
    { code: 'CN', name: 'China', matchName: 'China', count: 1, delay: 1.2, x: 73.2, y: 44.8 },
  ],
  regions: {},
};
const VISITOR_COUNTRY_REGION_OVERRIDES = {
  HK: { country: 'CN', regionCode: 'HK', regionName: 'Hong Kong', countryName: 'China', matchName: 'China' },
  TW: { country: 'CN', regionCode: 'TW', regionName: 'Taiwan', countryName: 'China', matchName: 'China' },
  MO: { country: 'CN', regionCode: 'MO', regionName: 'Macao', countryName: 'China', matchName: 'China' },
};
const EMPTY_VISITOR_SNAPSHOT = {
  pageviews: 0,
  countries: 0,
  ranking: [],
  regions: {},
  updatedAt: null,
};

const UI_COPY = {
  en: {
    publicationDesc: 'Selected research works and academic contributions.',
    searchPlaceholder: 'Search titles, authors, or venues...',
    newestFirst: 'Newest First',
    oldestFirst: 'Oldest First',
    toggleSort: 'Toggle date sort',
    allPapers: 'All Papers',
    moreVenues: 'More Venues',
    venueFilter: 'Venue',
    selectedPublications: 'Selected Publications',
    viewMorePublications: 'View More Publications',
    remaining: 'remaining',
    noPapers: 'No papers found matching your criteria.',
    papersInYear: 'papers',
    acceptanceRate: 'acceptance',
    acceptedWorldwide: 'accepted worldwide',
    firstAuthorBadge: 'First author',
    coFirstAuthorBadge: 'Co-first author',
    soleAuthorBadge: 'Sole author',
    studentOutcomeBadge: 'Student mentorship',
    featuredBadge: 'Selected',
    journalShort: 'J',
    conferenceShort: 'C',
    thesisShort: 'Thesis',
    selected: 'Selected',
    openArticle: 'Open article',
    expandAbstract: 'Expand abstract',
    collapseAbstract: 'Collapse abstract',
    abstract: 'Abstract',
    noAbstract: 'No abstract available.',
    moreNews: 'More News',
    fewerNews: 'Fewer News',
    homeNavTitle: 'Explore my profile',
    homeNavDesc: 'Jump directly to focused pages.',
    homeNavCards: {
      about: 'Home page and latest news',
      news: 'Latest research and career updates',
      publications: 'Papers, projects, code, and citations',
      talks: 'Invited and conference presentations',
      timeline: 'Research path and academic heritage',
      mentoring: 'Student mentoring and collaborations',
      awards: 'Honors and recognitions',
      service: 'Reviewing, chairing, and service',
      teaching: 'Teaching assistant experience',
      cv: 'Download my curriculum vitae',
    },
    awardsDesc: 'Recognition for research excellence and academic achievements.',
    selectedHonors: 'Selected Honors',
    otherAwards: 'Other Awards & Recognition',
    viewMoreAwards: 'View More Awards',
    experience: 'Experience',
    education: 'Education',
    contactDesc: 'I welcome discussions on research collaborations, student mentoring, and opportunities related to information theory and communications.',
    locationLabel: 'Location',
    emailLabel: 'Email',
    globalVisitors: 'Global Visitors',
    globalVisitorsDesc: 'Country-level unique visitor statistics.',
    loadingVisitors: 'Updating visitor stats...',
    viewStats: 'View Stats',
    hideStats: 'Hide Stats',
    visitorMap: 'Visitor Map',
    expandVisitorMap: 'Enlarge map',
    closeVisitorMap: 'Close map',
    visitorMapModalTitle: 'Global Visitor Map',
    topVisitorCountries: 'Top Visitor Countries',
    showRemainingCountries: 'Show remaining',
    showTopVisitorCountriesOnly: 'Show top 5 only',
    activeVisitorRegions: 'Active visitor regions',
    countrySignal: 'aggregate country-level signal',
    visitorIntensity: 'Visitor density',
    visitorMapSummary: 'World map highlighting countries with recorded visitors.',
    loadingVisitorMap: 'Loading visitor map...',
    pageviews: 'unique visitors',
    countries: 'countries',
    visitorUpdated: 'Updated (Istanbul)',
    statsTotalViews: 'Unique visitors',
    statsCountries: 'Visitor countries',
    statsTopCountry: 'Top country',
    statsLastUpdate: 'Last update',
    statsCountryShare: 'Country share',
    regionalDetails: 'Regional details',
    regionalDetailsHint: 'Available after new visits with state or province data.',
    regionalNoData: 'Regional data will appear after new visits from this country.',
    regionalCountrySelect: 'Country',
    regionalShare: 'Regional share',
    serviceReviewerTitle: 'Invited Reviewer',
    serviceJournals: 'Journals & Letters',
    serviceConferences: 'Conferences',
    serviceChairTitle: 'Session Chair',
    serviceTpcTitle: 'TPC Member',
    serviceVolunteerTitle: 'Volunteer & Service',
    citationTitle: 'Cite this publication',
    ieeeCitation: 'IEEE reference',
    bibtexCitation: 'BibTeX',
    copyCitation: 'Copy',
    copiedCitation: 'Copied',
    closeCitation: 'Close citation dialog',
    poster: 'Poster',
  },
  zh: {
    publicationDesc: '精选论文与学术成果。',
    searchPlaceholder: '搜索题目、作者或期刊会议...',
    newestFirst: '最新优先',
    oldestFirst: '最早优先',
    toggleSort: '切换时间排序',
    allPapers: '全部论文',
    moreVenues: '更多期刊会议',
    venueFilter: '期刊/会议',
    selectedPublications: '精选论文',
    viewMorePublications: '查看更多论文',
    remaining: '篇未显示',
    noPapers: '没有找到符合条件的论文。',
    papersInYear: '篇论文',
    acceptanceRate: '录用率',
    acceptedWorldwide: '全球录用',
    firstAuthorBadge: '一作',
    coFirstAuthorBadge: '共同一作',
    soleAuthorBadge: '独著',
    studentOutcomeBadge: '学生指导成果',
    featuredBadge: '精选',
    journalShort: '刊',
    conferenceShort: '会',
    thesisShort: '学位论文',
    selected: '精选',
    openArticle: '打开论文链接',
    expandAbstract: '展开摘要',
    collapseAbstract: '收起摘要',
    abstract: '摘要',
    noAbstract: '暂无摘要。',
    moreNews: '更多动态',
    fewerNews: '收起动态',
    homeNavTitle: '快速浏览主页',
    homeNavDesc: '直接进入不同内容页。',
    homeNavCards: {
      about: '主页简介与最新动态',
      news: '最新科研与职业动态',
      publications: '论文、项目、代码与引用',
      talks: '邀请报告与会议报告',
      timeline: '科研经历与学术谱系',
      mentoring: '学生指导与科研合作',
      awards: '代表性荣誉与奖励',
      service: '审稿、分会主席与学术服务',
      teaching: '课程助教与教学经历',
      cv: '下载我的简历',
    },
    awardsDesc: '科研表现与学术成长中的代表性荣誉。',
    selectedHonors: '代表性荣誉',
    otherAwards: '其他奖项与认可',
    viewMoreAwards: '查看更多奖项',
    experience: '经历',
    education: '教育',
    contactDesc: '欢迎就科研合作、学生指导，以及信息理论与通信相关机会进行交流。',
    locationLabel: '所在地',
    emailLabel: '邮箱',
    globalVisitors: '全球访客',
    globalVisitorsDesc: '按国家聚合的独立访客统计。',
    loadingVisitors: '正在更新访客统计...',
    viewStats: '查看统计',
    hideStats: '收起统计',
    visitorMap: '访客地图',
    expandVisitorMap: '放大地图',
    closeVisitorMap: '关闭地图',
    visitorMapModalTitle: '全球访客地图',
    topVisitorCountries: '访问国家排名',
    showRemainingCountries: '展开其余',
    showTopVisitorCountriesOnly: '只显示前五名',
    activeVisitorRegions: '已点亮访问区域',
    countrySignal: '国家级聚合访问统计',
    visitorIntensity: '访问热度',
    visitorMapSummary: '点亮已有访客国家和地区的世界地图。',
    loadingVisitorMap: '正在加载访客地图...',
    pageviews: '位独立访客',
    countries: '个国家',
    visitorUpdated: '更新于（伊斯坦布尔）',
    statsTotalViews: '独立访客',
    statsCountries: '访问国家',
    statsTopCountry: '最高国家',
    statsLastUpdate: '最近更新',
    statsCountryShare: '国家占比',
    regionalDetails: '地区细分',
    regionalDetailsHint: '新访问产生州/省级数据后自动显示。',
    regionalNoData: '该国家的新访问产生后，会显示州/省级聚合数据。',
    regionalCountrySelect: '国家',
    regionalShare: '地区占比',
    serviceReviewerTitle: '受邀审稿',
    serviceJournals: '期刊与快报',
    serviceConferences: '会议',
    serviceChairTitle: '分会主席',
    serviceTpcTitle: 'TPC 委员',
    serviceVolunteerTitle: '志愿服务',
    citationTitle: '引用此论文',
    ieeeCitation: 'IEEE 格式',
    bibtexCitation: 'BibTeX',
    copyCitation: '复制',
    copiedCitation: '已复制',
    closeCitation: '关闭引用对话框',
    poster: '海报',
  },
};

const getRuntimeSyncData = () => (
  typeof window !== 'undefined' && window.HOMEPAGE_SYNC_DATA
    ? window.HOMEPAGE_SYNC_DATA
    : {}
);

const getRuntimeMapData = () => (
  typeof window !== 'undefined' && window.HOMEPAGE_VISITOR_WORLD_MAP
    ? window.HOMEPAGE_VISITOR_WORLD_MAP
    : null
);

let visitorMapDataPromise = null;
const loadVisitorMapData = () => {
  const existing = getRuntimeMapData();
  if (existing) return Promise.resolve(existing);
  if (visitorMapDataPromise) return visitorMapDataPromise;

  visitorMapDataPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = '/visitor-map-data.js?v=20260715-lazy';
    script.async = true;
    script.dataset.visitorMapLoader = 'true';
    script.onload = () => {
      const mapData = getRuntimeMapData();
      if (mapData) resolve(mapData);
      else reject(new Error('Visitor map data did not initialize.'));
    };
    script.onerror = () => reject(new Error('Visitor map data could not be loaded.'));
    document.head.appendChild(script);
  }).catch((error) => {
    visitorMapDataPromise = null;
    throw error;
  });

  return visitorMapDataPromise;
};

const visitorRegionNameFor = (country, regionCode, value) => {
  if (country === 'CN' && regionCode === 'HK') return 'Hong Kong';
  if (country === 'CN' && regionCode === 'TW') return 'Taiwan';
  if (country === 'CN' && regionCode === 'MO') return 'Macao';
  return value || regionCode;
};

const addVisitorRegion = (regions, country, regionCode, regionName, count) => {
  if (!country || !regionCode || count <= 0) return;
  regions[country] = regions[country] || {};
  const previous = regions[country][regionCode] || { count: 0, name: visitorRegionNameFor(country, regionCode, regionName) };
  regions[country][regionCode] = {
    count: (Number(previous.count) || 0) + count,
    name: visitorRegionNameFor(country, regionCode, regionName || previous.name),
  };
};

const visitorRegionRows = (regionMap) => (
  Array.isArray(regionMap)
    ? regionMap
    : Object.entries(regionMap || {}).map(([code, region]) => ({
      code,
      name: region?.name || code,
      count: Number(region?.count ?? region) || 0,
    }))
);

const mergeVisitorRegions = (baseRegions = {}, extraRegions = {}) => {
  const merged = {};
  for (const [country, regionMap] of Object.entries(baseRegions || {})) {
    for (const region of visitorRegionRows(regionMap)) {
      addVisitorRegion(merged, country, String(region.code || '').toUpperCase(), region.name, Number(region.count) || 0);
    }
  }
  for (const [country, regionMap] of Object.entries(extraRegions || {})) {
    for (const region of visitorRegionRows(regionMap)) {
      addVisitorRegion(merged, country, String(region.code || '').toUpperCase(), region.name, Number(region.count) || 0);
    }
  }

  return Object.fromEntries(
    Object.entries(merged)
      .map(([country, regionMap]) => [
        country,
        Object.entries(regionMap)
          .map(([code, region]) => ({
            code,
            name: visitorRegionNameFor(country, code, region.name),
            count: Number(region.count) || 0,
          }))
          .filter(region => region.count > 0)
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
      ])
      .filter(([, regionRanking]) => regionRanking.length)
  );
};

const normalizeVisitorRanking = (rawRanking = []) => {
  const countries = new Map();
  const overrideRegions = {};
  const skipRegionCountries = new Set();

  for (const country of rawRanking) {
    const rawCode = String(country.code || '').trim().toUpperCase();
    const count = Number(country.count) || 0;
    if (!rawCode || count <= 0) continue;

    const override = VISITOR_COUNTRY_REGION_OVERRIDES[rawCode];
    const code = override?.country || rawCode;
    const previous = countries.get(code) || {
      ...country,
      code,
      name: override?.countryName || country.name || code,
      matchName: override?.matchName || country.matchName || country.name || code,
      count: 0,
    };
    previous.count += count;
    countries.set(code, previous);

    if (override) {
      skipRegionCountries.add(rawCode);
      addVisitorRegion(overrideRegions, override.country, override.regionCode, override.regionName, count);
    }
  }

  const ranking = Array.from(countries.values())
    .sort((a, b) => b.count - a.count || a.code.localeCompare(b.code))
    .map((country, index) => ({
      ...country,
      delay: Number((index * 0.4).toFixed(1)),
    }));

  return { ranking, overrideRegions, skipRegionCountries };
};

const normalizeVisitorPayload = (payload = {}) => {
  const visitorSnapshot = payload.visitorSnapshot || payload;
  const rawRanking = Array.isArray(visitorSnapshot.ranking)
    ? visitorSnapshot.ranking
      .filter(country => country?.code && Number.isFinite(Number(country.count)))
      .map((country, index) => ({
        ...country,
        code: String(country.code).trim().toUpperCase(),
        name: country.name || country.code,
        matchName: country.matchName || country.name || country.code,
        count: Number(country.count),
        delay: country.delay ?? Number((index * 0.4).toFixed(1)),
      }))
    : [];
  const { ranking, overrideRegions, skipRegionCountries } = normalizeVisitorRanking(rawRanking);

  if (!ranking.length) return null;

  return {
    pageviews: Number(visitorSnapshot.pageviews) || ranking.reduce((sum, country) => sum + country.count, 0),
    countries: ranking.length,
    ranking,
    regions: mergeVisitorRegions(normalizeVisitorRegions(visitorSnapshot.regions, skipRegionCountries), overrideRegions),
    updatedAt: payload.generatedAt || payload.updatedAt || visitorSnapshot.updatedAt || null,
  };
};

const normalizeVisitorRegions = (regions = {}, skipRegionCountries = new Set()) => {
  if (!regions || typeof regions !== 'object') return {};
  const normalized = {};
  for (const [countryCode, regionRanking] of Object.entries(regions)) {
    const rawCode = String(countryCode).trim().toUpperCase();
    const rows = Array.isArray(regionRanking)
      ? regionRanking.filter(region => region?.code && Number.isFinite(Number(region.count)))
      : [];
    const override = VISITOR_COUNTRY_REGION_OVERRIDES[rawCode];
    if (override) {
      if (skipRegionCountries.has(rawCode)) continue;
      const total = rows.reduce((sum, region) => sum + (Number(region.count) || 0), 0);
      addVisitorRegion(normalized, override.country, override.regionCode, override.regionName, total);
      continue;
    }

    for (const region of rows) {
      const code = String(region.code).trim().toUpperCase();
      addVisitorRegion(normalized, rawCode, code, region.name || code, Number(region.count) || 0);
    }
  }

  return mergeVisitorRegions(normalized);
};

const fetchRealtimeVisitorSnapshot = async (action, signal) => {
  if (!REALTIME_VISITOR_ENDPOINT) return null;
  const url = new URL(`${REALTIME_VISITOR_ENDPOINT}/${action}`);
  url.searchParams.set('t', String(Date.now()));
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store',
    signal,
  });
  if (!response.ok) throw new Error(`Visitor API returned ${response.status}`);
  return normalizeVisitorPayload(await response.json());
};

const shouldApplyVisitorSnapshot = (nextSnapshot, currentSnapshot) => {
  if (!nextSnapshot) return false;
  const nextViews = Number(nextSnapshot.pageviews) || 0;
  const currentViews = Number(currentSnapshot?.pageviews) || 0;
  const nextTime = Date.parse(nextSnapshot.updatedAt || '') || 0;
  const currentTime = Date.parse(currentSnapshot?.updatedAt || '') || 0;

  if (nextTime && currentTime && nextTime < currentTime) return false;
  return nextViews >= currentViews || nextTime >= currentTime;
};

const recordVisitorImageBeacon = () => {
  if (!REALTIME_VISITOR_ENDPOINT || typeof Image === 'undefined') {
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    let settled = false;
    let timeoutId;
    const beacon = new Image(1, 1);
    beacon.referrerPolicy = 'origin';
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      beacon.onload = null;
      beacon.onerror = null;
      resolve(ok);
    };

    timeoutId = window.setTimeout(() => finish(false), VISITOR_BEACON_TIMEOUT_MS);
    const url = new URL(`${REALTIME_VISITOR_ENDPOINT}/hit.gif`);
    url.searchParams.set('t', String(Date.now()));
    beacon.onload = () => finish(true);
    beacon.onerror = () => finish(false);
    beacon.src = url.toString();
  });
};

const recordVisitorHit = () => {
  if (
    !REALTIME_VISITOR_ENDPOINT
    || visitorHitRecordedForPage
    || typeof window === 'undefined'
    || typeof document === 'undefined'
  ) {
    return Promise.resolve(null);
  }

  visitorHitRecordedForPage = true;

  return new Promise((resolve) => {
    const callback = `__aiminVisitorHit_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    let settled = false;
    let timeoutId;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      script.onload = null;
      script.onerror = null;
      script.remove();
      try {
        delete window[callback];
      } catch {
        window[callback] = undefined;
      }
    };

    const finish = (snapshot) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(snapshot);
    };

    window[callback] = (payload) => {
      finish(normalizeVisitorPayload(payload));
    };

    script.async = true;
    script.referrerPolicy = 'origin';
    script.onerror = () => {
      recordVisitorImageBeacon().finally(() => finish(null));
    };

    timeoutId = window.setTimeout(() => finish(null), VISITOR_BEACON_TIMEOUT_MS);
    const url = new URL(`${REALTIME_VISITOR_ENDPOINT}/hit.js`);
    url.searchParams.set('callback', callback);
    url.searchParams.set('t', String(Date.now()));
    script.src = url.toString();
    document.head.appendChild(script);
  });
};

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const sanitizeNewsHtml = (value = '') => {
  if (typeof document === 'undefined') return escapeHtml(stripHtml(value));
  const template = document.createElement('template');
  template.innerHTML = String(value);

  const sanitizeNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return escapeHtml(node.textContent || '');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const children = Array.from(node.childNodes).map(sanitizeNode).join('');
    if (node.tagName === 'STRONG') return `<strong>${children}</strong>`;
    if (node.tagName === 'SPAN' && node.classList.contains('news-mobihoc-count')) {
      return `<span class="news-mobihoc-count">${children}</span>`;
    }
    return children;
  };

  return Array.from(template.content.childNodes).map(sanitizeNode).join('');
};

const SafeNewsContent = ({ content, title }) => {
  const sanitized = useMemo(() => sanitizeNewsHtml(content), [content]);
  return <span title={title} className="block min-w-0 whitespace-normal break-words" dangerouslySetInnerHTML={{ __html: sanitized }} />;
};

const normalizeTitle = (value = '') => stripHtml(value)
  .toLowerCase()
  .replace(/[^\p{Letter}\p{Number}]+/gu, ' ')
  .trim();

const normalizePersonName = (value = '') => stripHtml(value)
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/[^a-z]+/g, ' ')
  .trim();

const getPublicationTitle = (pub = {}, lang = 'en') => (
  lang === 'zh' && pub.title_zh ? pub.title_zh : pub.title
);

const getMentoringStudentNames = (mentoring = {}) => {
  const groups = Array.isArray(mentoring.groups) ? mentoring.groups : [];
  const students = groups.length
    ? groups.flatMap(group => group.students || [])
    : (Array.isArray(mentoring.students) ? mentoring.students : []);
  return students
    .map(student => student.name)
    .filter(Boolean);
};

const createStudentMatcher = (studentNames = []) => {
  const matchers = studentNames
    .map((name) => {
      const normalized = normalizePersonName(name);
      const tokens = normalized.split(' ').filter(Boolean);
      return {
        normalized,
        firstInitial: tokens[0]?.[0] || '',
        familyName: tokens[tokens.length - 1] || '',
      };
    })
    .filter(item => item.normalized && item.familyName);

  return (author = '') => {
    const normalizedAuthor = normalizePersonName(author);
    if (!normalizedAuthor) return false;
    const authorTokens = normalizedAuthor.split(' ').filter(Boolean);
    const authorInitial = authorTokens[0]?.[0] || '';
    const authorFamily = authorTokens[authorTokens.length - 1] || '';
    return matchers.some(student => (
      normalizedAuthor === student.normalized
      || normalizedAuthor.includes(student.normalized)
      || (student.firstInitial && student.familyName && authorInitial === student.firstInitial && authorFamily === student.familyName)
    ));
  };
};

const isCoFirstAuthorPublication = (pub = {}) => (
  /co[-\s]?first/i.test(pub.tag || '')
);

const isSoleAuthorPublication = (pub = {}) => (
  /sole author/i.test(pub.tag || '')
  || (
    getAuthorList(pub.authors).length === 1
    && /aimin li/i.test(getAuthorList(pub.authors)[0] || '')
  )
);

const isFirstAuthorPublication = (pub = {}) => (
  !isCoFirstAuthorPublication(pub)
  && !isSoleAuthorPublication(pub)
  && (
    /(^|[-\s])first author/i.test(pub.tag || '')
    || /^aimin li\b/i.test(getAuthorList(pub.authors)[0] || '')
  )
);

const awardYearValue = (award = {}) => (
  Math.max(...(String(award.year).match(/\d{4}/g) || ['0']).map(Number))
);

const getServiceVenueMeta = (venue = '') => {
  const isConference = /Conference|Symposium|Workshop|VTC|ISIT|Infocom|IWCMC|APWCS/i.test(venue);
  const isJournal = !isConference
    && /Transactions|Journal|Letters|Computer Networks|Computer Communications|^Engineering$/i.test(venue);
  return {
    full: venue,
    type: isJournal ? 'journal' : 'conference',
  };
};

const slugify = (value = '') => normalizeTitle(value).replace(/\s+/g, '-').slice(0, 80) || 'item';
const getPublicationAnchorId = (pub = {}) => `${PUBLICATION_HASH_PREFIX}${pub.id || slugify(pub.title)}`;

const normalizeNewsDate = (date = '') => {
  const match = String(date).match(/\d{4}-\d{2}/);
  return match ? match[0] : String(new Date().getUTCFullYear());
};

const isAllowedSyncedHomepageItem = (item = {}) => {
  const haystack = [
    item.label,
    item.newsLabel,
    item.shortVenue,
    item.venue_short,
    item.venue,
    item.title,
  ].filter(Boolean).join(' ');
  if (/arxiv/i.test(haystack)) return false;
  return HOMEPAGE_ALLOWED_SYNC_PATTERNS.some(pattern => pattern.test(haystack));
};

const toSyncedPublication = (item) => {
  const venueShort = item.venue_short || item.shortVenue || item.newsLabel || item.label || 'Scholar';
  return {
    id: item.id || item.key || `sync-${slugify(item.title)}`,
    year: Number(item.year) || new Date().getUTCFullYear(),
    title: item.title,
    authors: item.authors || 'Aimin Li',
    venue: item.venue || venueShort,
    venue_short: venueShort,
    type: item.type || (/conference|symposium|workshop|vtc|isit|iros/i.test(item.venue || venueShort) ? 'Conference' : 'Journal'),
    tag: item.tag && item.tag !== 'Google Scholar' ? item.tag : 'Scholar Sync',
    featured: Boolean(item.featured),
    keywords: Array.isArray(item.keywords) && item.keywords.length ? item.keywords : ['Google Scholar'],
    summary: item.summary || `Latest Google Scholar record: ${item.venue || venueShort}.`,
    url: item.url || item.href,
    links: item.links,
  };
};

const buildPublications = (basePublications, syncData) => {
  const seen = new Set(basePublications.map(pub => normalizeTitle(pub.title)));
  const additions = (syncData.extraPublications || [])
    .filter(isAllowedSyncedHomepageItem)
    .map(toSyncedPublication)
    .filter(pub => {
      const key = normalizeTitle(pub.title);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  return [...basePublications, ...additions];
};

const buildNewsItems = (baseNews, syncData) => {
  const seen = new Set();
  return [
    ...baseNews.map((item, index) => ({ ...item, date: normalizeNewsDate(item.date), order: index })),
    ...(syncData.extraNews || [])
      .filter(isAllowedSyncedHomepageItem)
      .map((item, index) => ({
        date: normalizeNewsDate(item.date),
        label: item.label || item.newsLabel || 'Scholar',
        title: item.title,
        content: item.content || item.html || item.title,
        link: item.link || item.href,
        order: baseNews.length + index,
      })),
  ]
    .filter(item => {
      const key = normalizeTitle(item.title || item.content);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);
};

const getVisitorSnapshot = (syncData) => {
  const snapshot = syncData.visitorSnapshot || DEFAULT_VISITOR_SNAPSHOT;
  const normalized = normalizeVisitorPayload({ visitorSnapshot: snapshot });
  return normalized
    ? { ...DEFAULT_VISITOR_SNAPSHOT, ...normalized }
    : DEFAULT_VISITOR_SNAPSHOT;
};

const VISITOR_COUNTRY_FALLBACK_POINTS = new Map([
  ['US', { x: 203.9, y: 84.1 }],
  ['CA', { x: 178.2, y: 57.8 }],
  ['TR', { x: 412.2, y: 93.3 }],
  ['CN', { x: 515.1, y: 98.5 }],
  ['SG', { x: 526.4, y: 163.5 }],
  ['JP', { x: 565.8, y: 96.2 }],
  ['KR', { x: 548.8, y: 95.3 }],
  ['RS', { x: 390.1, y: 83.8 }],
  ['GB', { x: 350.8, y: 66.3 }],
  ['DE', { x: 375.1, y: 72.1 }],
  ['FR', { x: 360.4, y: 79.8 }],
  ['IN', { x: 477.1, y: 129.4 }],
  ['AU', { x: 575.9, y: 224.1 }],
]);

const COUNTRY_NAME_ALIASES = new Map([
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
  ['tanzania', 'united republic of tanzania'],
]);

const GREATER_CHINA_MAP_NAMES = ['taiwan', 'hong kong', 'macao', 'macau'];

const normalizeCountryName = (value = '') => String(value)
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const mergeVisitorMapPaths = (...paths) => (
  [...new Set(paths.filter(Boolean))].join('')
);

const visitorGeometryForCountry = (country, geometry, mapCountryByName) => {
  if (country.code !== 'CN') return geometry;
  if (geometry?.mergedMapRegions?.length) return geometry;
  const greaterChinaPaths = GREATER_CHINA_MAP_NAMES
    .map(name => mapCountryByName.get(name)?.d)
    .filter(Boolean);
  if (!greaterChinaPaths.length) return geometry;
  return {
    ...geometry,
    d: mergeVisitorMapPaths(geometry?.d, ...greaterChinaPaths),
    mergedMapRegions: GREATER_CHINA_MAP_NAMES.filter(name => mapCountryByName.has(name)),
  };
};

const getActiveVisitorCountries = (snapshot, mapData) => {
  const activeByCode = new Map((mapData?.activeCountries || []).map(country => [country.code, country]));
  const mapCountryByName = new Map((mapData?.countries || []).map(country => [
    normalizeCountryName(country.name),
    country,
  ]));
  const viewBox = mapData?.viewBox || { width: 720, height: 330 };
  return snapshot.ranking.map((country, index) => {
    const normalized = normalizeCountryName(country.matchName || country.name);
    const aliased = COUNTRY_NAME_ALIASES.get(normalized) || normalized;
    const baseGeometry = activeByCode.get(country.code) || mapCountryByName.get(aliased) || mapCountryByName.get(normalized);
    const geometry = visitorGeometryForCountry(country, baseGeometry, mapCountryByName);
    const fallbackPoint = VISITOR_COUNTRY_FALLBACK_POINTS.get(country.code);
    return {
      ...country,
      delay: country.delay ?? Number((index * 0.4).toFixed(1)),
      x: geometry?.x || fallbackPoint?.x || (country.x ? (country.x > 100 ? country.x : viewBox.width * country.x / 100) : viewBox.width / 2),
      y: geometry?.y || fallbackPoint?.y || (country.y ? (country.y > 100 ? country.y : viewBox.height * country.y / 100) : viewBox.height / 2),
      d: geometry?.d || '',
      mergedMapRegions: geometry?.mergedMapRegions || [],
    };
  });
};

const formatVisitorUpdatedAt = (value, lang) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en', {
    timeZone: 'Europe/Istanbul',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const buildVisitorRoutes = (activeCountries) => {
  const source = activeCountries.find(country => country.code === 'TR') || activeCountries[0];
  if (!source) return [];
  return activeCountries
    .filter(country => country.code !== source.code)
    .map(country => {
      const midX = (source.x + country.x) / 2;
      const lift = Math.max(22, Math.abs(source.x - country.x) * 0.11);
      const midY = Math.min(source.y, country.y) - lift;
      return {
        key: `${source.code}-${country.code}`,
        d: `M${source.x},${source.y} Q${midX.toFixed(1)},${midY.toFixed(1)} ${country.x},${country.y}`,
      };
    });
};

const mixVisitorRgb = (start, end, amount) => start.map((value, index) => (
  Math.round(value + (end[index] - value) * amount)
));

const visitorHeatDomainFor = (maxCount = 1) => {
  const value = Math.max(1, Number(maxCount) || 1);
  const domains = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
  return domains.find(domain => value <= domain) || Math.ceil(value / 100000) * 100000;
};

const formatVisitorHeatValue = (value) => {
  const count = Number(value) || 0;
  if (count >= 1000000) return `${Number((count / 1000000).toFixed(count >= 10000000 ? 0 : 1))}M+`;
  if (count >= 1000) return `${Number((count / 1000).toFixed(count >= 10000 ? 0 : 1))}k+`;
  return `${Math.round(count)}+`;
};

const visitorMapVisualsFor = (count = 0, heatDomain = 10) => {
  const safeDomain = Math.max(10, Number(heatDomain) || 10);
  const score = Math.max(0, Math.min(1, Math.log1p(Number(count) || 0) / Math.log1p(safeDomain)));
  const fill = mixVisitorRgb([34, 211, 238], [251, 191, 36], score);
  const stroke = mixVisitorRgb([125, 249, 255], [253, 224, 71], score);
  const glow = mixVisitorRgb([34, 211, 238], [251, 191, 36], score);
  return {
    score,
    fill: `rgba(${fill.join(', ')}, ${Number((0.22 + score * 0.5).toFixed(3))})`,
    stroke: `rgba(${stroke.join(', ')}, ${Number((0.58 + score * 0.34).toFixed(3))})`,
    glow: `drop-shadow(0 0 ${Number((4 + score * 10).toFixed(1))}px rgba(${glow.join(', ')}, ${Number((0.22 + score * 0.42).toFixed(3))}))`,
    strokeWidth: Number((0.75 + score * 0.55).toFixed(2)),
  };
};

const HighlightText = ({ text, darkMode }) => {
  if (!text) return null;
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))|(\*\*.*?\*\*)/g).filter(Boolean);
  const renderPlainText = (value) => String(value);
  
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className={darkMode ? "text-white" : "text-gray-900"}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const [label, url] = part.slice(1, -1).split('](');
          return (
            <a 
              key={i} 
              href={url} 
              target="_blank" 
              rel="noreferrer" 
              className={`font-bold underline decoration-2 underline-offset-2 transition-colors mx-1 ${darkMode ? 'text-blue-400 decoration-blue-400/50 hover:text-blue-300' : 'text-blue-600 decoration-blue-600/30 hover:text-blue-700'}`}
            >
              {label}
            </a>
          );
        }
        return renderPlainText(part, i);
      })}
    </span>
  );
};

const BioText = ({ text, darkMode }) => {
  const bioText = String(text || '')
    .split(/\n{2,}/)
    .map(part => part.trim())
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`text-[15px] leading-7 md:text-base md:leading-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
      <p>
        <HighlightText text={bioText} darkMode={darkMode} />
      </p>
    </div>
  );
};

const HONOR_VALUE_PATTERN = [
  'Sole[^;。；,，]*',
  'Only[^;。；,，]*',
  'only[^;。；,，]*',
  'Top[^;。；,，]*',
  'One of two recipients',
  'One of fewer than\\s+\\d+[^;。；,，]*',
  'Worldwide',
  'worldwide',
  '最高学生荣誉',
  '唯一[^.;。；,，]*',
  '仅\\s*\\d+[^.;。；,，]*',
  '前\\s*\\d+(?:\\.\\d+)?%[^.;。；,，]*',
  '全球[^.;。；,，]*',
].join('|');
const HONOR_VALUE_SPLIT_RE = new RegExp(`(${HONOR_VALUE_PATTERN})`, 'giu');
const HONOR_VALUE_TEST_RE = new RegExp(`^(?:${HONOR_VALUE_PATTERN})$`, 'iu');

const HonorText = ({ text, darkMode }) => {
  if (!text) return null;
  return String(text)
    .split(HONOR_VALUE_SPLIT_RE)
    .filter(Boolean)
    .map((part, index) => (
      HONOR_VALUE_TEST_RE.test(part)
        ? (
          <strong
            key={`${part}-${index}`}
            className={`rounded px-1 font-black ${darkMode ? 'bg-amber-400/10 text-amber-200' : 'bg-amber-50 text-amber-800'}`}
          >
            {part}
          </strong>
        )
        : part
    ));
};

const ActionButton = ({ icon, label, href, onClick, id, type = "default", darkMode }) => {
  if (!href && !onClick) return null;
  const styles = {
    pdf: darkMode ? "bg-red-900/20 text-red-400 border-red-800/50 hover:bg-red-900/40" : "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    code: darkMode ? "bg-[#102033] text-cyan-100 border-cyan-400/20 hover:bg-[#12314a]" : "bg-gray-900 text-white border-gray-900 hover:bg-black",
    bibtex: darkMode ? "bg-blue-900/20 text-blue-400 border-blue-800/50 hover:bg-blue-900/40" : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
    arxiv: darkMode ? "bg-red-900/10 text-red-400 border-red-800/30 hover:bg-red-900/30" : "bg-red-50 text-red-800 border-red-100 hover:bg-red-100",
    project: darkMode ? "bg-cyan-900/20 text-cyan-300 border-cyan-800/50 hover:bg-cyan-900/40" : "bg-cyan-50 text-cyan-800 border-cyan-100 hover:bg-cyan-100",
    poster: darkMode ? "bg-fuchsia-900/15 text-fuchsia-200 border-fuchsia-700/35 hover:bg-fuchsia-900/30" : "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-100 hover:bg-fuchsia-100",
    default: darkMode ? "bg-[#0e2032] text-slate-300 border-cyan-400/10 hover:bg-[#12314a]" : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50"
  };
  
  const colorClass = styles[type] || styles.default;
  const Component = href ? 'a' : 'button';
  
  return (
    <Component 
      id={id}
      type={href ? undefined : 'button'}
      href={href} 
      onClick={(e) => { e.stopPropagation(); onClick?.(e); }}
      target={href ? "_blank" : undefined} 
      rel={href ? "noreferrer" : undefined} 
      className={`inline-flex h-8 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 text-[11px] font-extrabold leading-none shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow cursor-pointer ${colorClass}`}
    >
      {React.createElement(icon, { size: 13, strokeWidth: 2.3 })}{label}
    </Component>
  );
};

const SocialButton = ({ icon, href, label, colorType, darkMode }) => {
  const colors = {
    email: darkMode ? "bg-[#EA4335] text-white border-[#EA4335] hover:bg-[#d33426]" : "bg-[#EA4335] text-white border-[#EA4335] hover:bg-[#d33426] shadow-sm",
    scholar: darkMode ? "bg-[#4285F4] text-white border-[#4285F4] hover:bg-[#3367d6]" : "bg-[#4285F4] text-white border-[#4285F4] hover:bg-[#3367d6] shadow-sm",
    orcid: darkMode ? "bg-[#A6CE39] text-slate-950 border-[#A6CE39] hover:bg-[#93b82f]" : "bg-[#A6CE39] text-slate-950 border-[#A6CE39] hover:bg-[#93b82f] shadow-sm",
    github: darkMode ? "bg-[#101a25] text-white border-cyan-400/15 hover:bg-[#15263a]" : "bg-[#24292e] text-white border-[#24292e] hover:bg-[#000] shadow-sm",
    linkedin: darkMode ? "bg-[#0077b5] text-white border-[#0077b5] hover:bg-[#006097]" : "bg-[#0077b5] text-white border-[#0077b5] hover:bg-[#006097] shadow-sm",
  };
  const activeColor = colors[colorType] || (darkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-700 border-gray-200");
  return (
    <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'} className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-xl border flex items-center justify-center ${activeColor}`} title={label} aria-label={label}>
      {React.createElement(icon, { size: 22 })}
    </a>
  );
};

const LanguageToggle = ({ lang, darkMode, onToggle, fullWidth = false }) => {
  const nextLangLabel = lang === 'en' ? '切换为中文' : 'Switch to English';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`language-switcher ${fullWidth ? 'language-switcher--full' : ''} ${darkMode ? 'language-switcher--dark' : ''}`}
      title={nextLangLabel}
      aria-label={nextLangLabel}
    >
      <span className="language-switcher__label">{lang === 'en' ? 'Language' : '语言'}</span>
      <span className={`language-switcher__option ${lang === 'en' ? 'language-switcher__option--active' : ''}`}>EN</span>
      <span className={`language-switcher__option ${lang === 'zh' ? 'language-switcher__option--active' : ''}`}>中文</span>
    </button>
  );
};

const CitationModal = ({ formats, onClose, darkMode, ui }) => {
  const closeButtonRef = useRef(null);
  const [copiedFormat, setCopiedFormat] = useState('');

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const copyCitation = async (format, content) => {
    await navigator.clipboard.writeText(content);
    setCopiedFormat(format);
    window.setTimeout(() => setCopiedFormat(''), 1600);
  };

  const citationBlocks = [
    { key: 'ieee', title: ui.ieeeCitation, content: formats.ieee, mono: false },
    { key: 'bibtex', title: ui.bibtexCitation, content: formats.bibtex, mono: true },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061523]/70 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-dialog-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={`max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-xl p-5 shadow-2xl sm:p-6 ${darkMode ? 'bg-[#0b1b2b] border border-cyan-400/15' : 'bg-white'}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 id="citation-dialog-title" className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ui.citationTitle}</h2>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label={ui.closeCitation} title={ui.closeCitation} className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          {citationBlocks.map(block => (
            <section key={block.key} aria-labelledby={`citation-${block.key}-title`}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 id={`citation-${block.key}-title`} className={`text-xs font-black uppercase tracking-[0.12em] ${darkMode ? 'text-cyan-200' : 'text-cyan-800'}`}>{block.title}</h3>
                <button
                  type="button"
                  onClick={() => copyCitation(block.key, block.content)}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-bold transition-colors ${darkMode ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15' : 'border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                >
                  <Copy size={14} /> {copiedFormat === block.key ? ui.copiedCitation : ui.copyCitation}
                </button>
              </div>
              <div className={`overflow-x-auto whitespace-pre-wrap break-words rounded-lg border p-4 text-sm leading-relaxed ${block.mono ? 'font-mono' : 'font-serif'} ${darkMode ? 'border-cyan-400/10 bg-[#071827] text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>{block.content}</div>
            </section>
          ))}
        </div>
        <span className="sr-only" aria-live="polite">{copiedFormat ? ui.copiedCitation : ''}</span>
      </div>
    </div>
  );
};

const JcrBadge = ({ zone, ifVal, darkMode }) => {
  if (!zone && !ifVal) return null;
  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wide ${darkMode ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
      {zone && <span className="bg-emerald-500 text-white px-1 rounded-[3px]">{zone}</span>}
      {ifVal && <span>IF: {ifVal}</span>}
    </div>
  );
};

// ==========================================
// --- Academic Lineage Component ---
// ==========================================

const AcademicLineage = ({ lineage, darkMode, lang = 'en' }) => {
  const labels = lang === 'zh'
    ? {
        title: 'Academic Heritage（学术谱系）',
        ancestor: '历史源流',
        advisor: '现任导师',
        current: '当前节点',
        bridge: '学术传承',
      }
    : {
        title: 'Academic Heritage（学术谱系）',
        ancestor: 'Foundational lineage',
        advisor: 'Advisor',
        current: 'Current node',
        bridge: 'Lineage',
      };

  const getNodeStyle = (person) => {
    const role = person.role || (person.highlight ? 'advisor' : 'ancestor');
    if (role === 'current') {
      return {
        role,
        label: labels.current,
        card: darkMode
          ? 'border-cyan-400/35 bg-cyan-400/[0.04]'
          : 'border-cyan-200 bg-cyan-50/35',
        step: darkMode ? 'border-cyan-400/45 bg-[#071827] text-cyan-200' : 'border-cyan-300 bg-white text-cyan-700',
        name: darkMode ? 'text-slate-100' : 'text-slate-950',
        meta: darkMode ? 'text-slate-400' : 'text-slate-600',
        pill: darkMode ? 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200' : 'border-cyan-200 bg-white text-cyan-700',
      };
    }
    if (role === 'advisor' || person.highlight) {
      return {
        role: 'advisor',
        label: labels.advisor,
        card: darkMode
          ? 'border-cyan-400/30 bg-cyan-400/[0.035]'
          : 'border-indigo-200 bg-indigo-50/45',
        step: darkMode ? 'border-cyan-400/35 bg-[#071827] text-cyan-200' : 'border-indigo-300 bg-white text-indigo-700',
        name: darkMode ? 'text-slate-100' : 'text-slate-950',
        meta: darkMode ? 'text-slate-400' : 'text-slate-600',
        pill: darkMode ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100' : 'border-indigo-200 bg-white text-indigo-800',
      };
    }
    return {
      role: 'ancestor',
      label: labels.ancestor,
      card: darkMode
        ? 'border-cyan-400/10 bg-[#0b1b2b]/52'
        : 'border-slate-200 bg-slate-50/65',
      step: darkMode ? 'border-cyan-400/15 bg-[#071827] text-slate-500' : 'border-slate-200 bg-white text-slate-500',
      name: darkMode ? 'text-slate-300' : 'text-slate-700',
      meta: darkMode ? 'text-slate-500' : 'text-slate-500',
      pill: darkMode ? 'border-cyan-400/10 bg-[#071827]/65 text-slate-400' : 'border-slate-200 bg-white text-slate-500',
    };
  };

  return (
    <div className={`w-full min-w-0 rounded-2xl border p-3 ${darkMode ? 'border-cyan-400/15 bg-[#0b1b2b]/60 shadow-[0_0_0_1px_rgba(34,211,238,0.03)]' : 'border-slate-200 bg-white'}`}>
      <h4 className={`mb-2.5 flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest ${darkMode ? 'text-cyan-200' : 'text-indigo-700'}`}>
        <Network size={14} /> {labels.title}
      </h4>

      <ol className={`lineage-chain ${darkMode ? 'lineage-chain--dark' : ''}`}>
        {lineage.map((person, idx) => {
          const node = getNodeStyle(person);

          return (
            <li key={person.name} className={`lineage-chain-item lineage-chain-item--${idx}`}>
              <div className="lineage-chain-marker">
                <span className={`relative z-10 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-black tabular-nums ${node.step}`}>
                  {idx + 1}
                </span>
              </div>

              <div className={`lineage-chain-card flex min-w-0 flex-col gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors ${node.card}`}>
                <div className="flex min-w-0 flex-wrap items-start gap-1">
                  <span className={`inline-flex max-w-full items-center rounded-md border px-1.5 py-0.5 text-[8px] font-black uppercase leading-tight tracking-[0.08em] break-words ${node.pill}`}>
                    {node.label}
                  </span>
                  {person.era && (
                    <span className={`max-w-full rounded-md px-1.5 py-0.5 text-[8px] font-black leading-tight tabular-nums break-words ${darkMode ? 'bg-white/5 text-slate-500' : 'bg-white text-slate-500 shadow-sm'}`}>
                    {person.era}
                  </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className={`break-words text-xs font-extrabold leading-tight ${node.name}`}>
                    {person.name}
                  </div>
                  <div className={`mt-0.5 text-[9px] font-semibold leading-snug ${node.meta}`}>
                    {person.title}
                  </div>
                </div>
              </div>
              {idx < lineage.length - 1 && (
                <ChevronRight className={`lineage-chain-arrow ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} size={16} strokeWidth={3} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const GlobalVisitors = ({ syncData, darkMode, ui, lang }) => {
  const staticSnapshot = useMemo(() => getVisitorSnapshot(syncData), [syncData]);
  const [snapshot, setSnapshot] = useState(() => (
    REALTIME_VISITOR_ENDPOINT ? EMPTY_VISITOR_SNAPSHOT : staticSnapshot
  ));
  const [visitorUpdatedAt, setVisitorUpdatedAt] = useState(() => (
    REALTIME_VISITOR_ENDPOINT ? null : staticSnapshot.updatedAt || syncData.generatedAt || null
  ));
  const [isVisitorSnapshotLoading, setIsVisitorSnapshotLoading] = useState(Boolean(REALTIME_VISITOR_ENDPOINT));
  const [showAllVisitorCountries, setShowAllVisitorCountries] = useState(false);
  const [showVisitorMapModal, setShowVisitorMapModal] = useState(false);
  const [selectedVisitorCountryCode, setSelectedVisitorCountryCode] = useState('');
  const [mapData, setMapData] = useState(() => getRuntimeMapData());
  const visitorSectionRef = useRef(null);
  const mapTriggerRef = useRef(null);
  const mapDialogRef = useRef(null);
  const mapCloseButtonRef = useRef(null);
  const snapshotRef = useRef(REALTIME_VISITOR_ENDPOINT ? EMPTY_VISITOR_SNAPSHOT : staticSnapshot);
  const viewBox = mapData?.viewBox || { width: 720, height: 330 };
  const activeCountries = getActiveVisitorCountries(snapshot, mapData);
  const routes = buildVisitorRoutes(activeCountries);
  const maxVisitorCountryCount = Math.max(1, ...activeCountries.map(country => Number(country.count) || 0));
  const visitorHeatDomain = visitorHeatDomainFor(maxVisitorCountryCount);
  const formattedUpdatedAt = formatVisitorUpdatedAt(visitorUpdatedAt, lang);
  const previewVisitorCountries = snapshot.ranking.slice(0, VISITOR_COUNTRY_PREVIEW_LIMIT);
  const remainingVisitorCountries = snapshot.ranking.slice(VISITOR_COUNTRY_PREVIEW_LIMIT);
  const displayedVisitorCountries = showAllVisitorCountries ? snapshot.ranking : previewVisitorCountries;
  const regionsByCountry = snapshot.regions || {};
  const firstCountryWithRegions = snapshot.ranking.find(country => regionsByCountry[country.code]?.length);
  const resolvedSelectedVisitorCountryCode = snapshot.ranking.some(country => country.code === selectedVisitorCountryCode)
    ? selectedVisitorCountryCode
    : firstCountryWithRegions?.code || snapshot.ranking[0]?.code || '';
  const selectedVisitorCountry = snapshot.ranking.find(country => country.code === resolvedSelectedVisitorCountryCode)
    || firstCountryWithRegions
    || snapshot.ranking[0]
    || null;
  const selectedRegionRanking = selectedVisitorCountry ? (regionsByCountry[selectedVisitorCountry.code] || []) : [];
  const selectedRegionTotal = selectedRegionRanking.reduce((sum, region) => sum + region.count, 0);

  const openVisitorMapModal = () => setShowVisitorMapModal(true);
  const closeVisitorMapModal = () => {
    setShowVisitorMapModal(false);
    window.requestAnimationFrame(() => mapTriggerRef.current?.focus());
  };
  const handleVisitorMapKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openVisitorMapModal();
    }
  };

  const renderRegionalDetails = () => (
    <aside className={`visitor-region-panel rounded-2xl border p-4 ${darkMode ? 'border-cyan-400/10 bg-[#0b1b2b]/75' : 'border-slate-200 bg-slate-50/80'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className={`text-sm font-extrabold uppercase tracking-widest ${darkMode ? 'text-cyan-200' : 'text-slate-800'}`}>{ui.regionalDetails}</h4>
          <p className={`mt-1 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{ui.regionalDetailsHint}</p>
        </div>
        {selectedVisitorCountry && (
          <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-extrabold ${darkMode ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200' : 'border-blue-200 bg-white text-blue-700'}`}>
            {selectedVisitorCountry.code}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className={`mb-2 text-[0.68rem] font-extrabold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{ui.regionalCountrySelect}</div>
        <div className="visitor-region-country-strip">
          {snapshot.ranking.map(country => {
            const hasRegions = Boolean(regionsByCountry[country.code]?.length);
            const isSelected = resolvedSelectedVisitorCountryCode === country.code;
            return (
              <button
                key={`regional-country-${country.code}`}
                type="button"
                onClick={() => setSelectedVisitorCountryCode(country.code)}
                className={`visitor-region-country-button ${isSelected ? 'visitor-region-country-button--active' : ''} ${darkMode ? 'visitor-region-country-button--dark' : ''}`}
                aria-pressed={isSelected}
                title={hasRegions ? country.name : ui.regionalNoData}
              >
                <span>{country.code}</span>
                <strong>{country.count}</strong>
                {hasRegions && <i aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className={`mb-2 flex items-center justify-between gap-3 text-[0.68rem] font-extrabold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <span>{selectedVisitorCountry?.name || ui.topVisitorCountries}</span>
          <span>{ui.regionalShare}</span>
        </div>
        {selectedRegionRanking.length ? (
          <div className="space-y-2">
            {selectedRegionRanking.slice(0, 10).map(region => {
              const percent = selectedRegionTotal ? Math.round((region.count / selectedRegionTotal) * 100) : 0;
              return (
                <div key={`${selectedVisitorCountry.code}-${region.code}`} className={`rounded-xl border px-3 py-2 ${darkMode ? 'border-cyan-400/10 bg-[#071827]/70' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-[2.6rem_minmax(0,1fr)_2.4rem] items-center gap-2 text-sm">
                    <span className={darkMode ? 'font-extrabold text-cyan-300' : 'font-extrabold text-blue-600'}>{region.code}</span>
                    <span className={`min-w-0 truncate font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{region.name}</span>
                    <span className={`text-right font-extrabold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{region.count}</span>
                  </div>
                  <div className={`mt-2 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} aria-label={`${region.name} ${percent}%`}>
                    <div className="visitor-stat-bar" style={{ width: `${Math.max(percent, 5)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`rounded-2xl border border-dashed px-4 py-8 text-center text-sm font-semibold leading-relaxed ${darkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
            {ui.regionalNoData}
          </div>
        )}
      </div>
    </aside>
  );

  const renderVisitorMap = ({ expanded = false } = {}) => (
    <div
      ref={expanded ? undefined : mapTriggerRef}
      className={`visitor-map-frame ${expanded ? 'visitor-map-frame--expanded' : 'visitor-map-frame--interactive'} ${darkMode ? 'visitor-map-frame--dark' : ''}`}
      role={expanded ? undefined : 'button'}
      tabIndex={expanded ? undefined : 0}
      aria-label={expanded ? ui.visitorMapModalTitle : ui.expandVisitorMap}
      onClick={expanded ? undefined : openVisitorMapModal}
      onKeyDown={expanded ? undefined : handleVisitorMapKeyDown}
    >
      <div className="visitor-world-map" aria-busy={!mapData}>
        <svg className="visitor-real-map" viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby={expanded ? 'visitor-map-summary-expanded' : 'visitor-map-summary'} focusable="false">
          <title id={expanded ? 'visitor-map-summary-expanded' : 'visitor-map-summary'}>{ui.visitorMapSummary}</title>
          <defs>
            <linearGradient id={expanded ? 'visitor-map-ocean-expanded' : 'visitor-map-ocean'} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#071a2d" />
              <stop offset="52%" stopColor="#08283b" />
              <stop offset="100%" stopColor="#06323a" />
            </linearGradient>
            <pattern id={expanded ? 'visitor-map-grid-expanded' : 'visitor-map-grid'} width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M42 0H0V42" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect className="visitor-map-ocean-base" width={viewBox.width} height={viewBox.height} fill={`url(#${expanded ? 'visitor-map-ocean-expanded' : 'visitor-map-ocean'})`} />
          <rect className="visitor-map-ocean-grid" width={viewBox.width} height={viewBox.height} fill={`url(#${expanded ? 'visitor-map-grid-expanded' : 'visitor-map-grid'})`} />
          <path className="visitor-map-graticule" d={`M0 ${viewBox.height * .25}H${viewBox.width}M0 ${viewBox.height * .5}H${viewBox.width}M0 ${viewBox.height * .75}H${viewBox.width}M${viewBox.width / 6} 0V${viewBox.height}M${viewBox.width / 3} 0V${viewBox.height}M${viewBox.width / 2} 0V${viewBox.height}M${viewBox.width * 2 / 3} 0V${viewBox.height}M${viewBox.width * 5 / 6} 0V${viewBox.height}`} />
          <g aria-hidden="true">
            {(mapData?.countries || []).map((country, index) => (
              <path key={`${country.id || 'country'}-${country.name}-${index}`} className="visitor-map-country" d={country.d} />
            ))}
          </g>
          {mapData?.borders && <path aria-hidden="true" className="visitor-map-borders" d={mapData.borders} />}
          <g aria-hidden="true">
            {activeCountries.filter(country => country.d).map(country => (
              (() => {
                const visuals = visitorMapVisualsFor(country.count, visitorHeatDomain);
                return (
                  <path
                    key={country.code}
                    className="visitor-map-country-active"
                    data-country-code={country.code}
                    data-merged-map-regions={(country.mergedMapRegions || []).join(' ')}
                    d={country.d}
                    style={{
                      fill: visuals.fill,
                      stroke: visuals.stroke,
                      strokeWidth: visuals.strokeWidth,
                      filter: visuals.glow,
                    }}
                  />
                );
              })()
            ))}
          </g>
          <g aria-hidden="true">
            {routes.map(route => <path key={route.key} className="visitor-map-route" d={route.d} />)}
          </g>
        </svg>

        {!mapData && (
          <div className="visitor-map-loading" role="status">
            <span className="visitor-map-loading__pulse" aria-hidden="true" />
            {ui.loadingVisitorMap}
          </div>
        )}

        <div className="visitor-map-label">
          {ui.activeVisitorRegions}
          <span>{ui.countrySignal}</span>
        </div>
        <div className="visitor-map-legend" aria-label={ui.visitorIntensity}>
          <span>{ui.visitorIntensity}</span>
          <div className="visitor-map-legend-ramp" />
          <div className="visitor-map-legend-scale">
            <small>1</small>
            <small>{formatVisitorHeatValue(visitorHeatDomain)}</small>
          </div>
        </div>
        {!expanded && (
          <span className="visitor-map-expand-badge" aria-hidden="true">
            <Maximize2 size={14} />
            {ui.expandVisitorMap}
          </span>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    const target = visitorSectionRef.current;
    if (!target || mapData) return undefined;

    let cancelled = false;
    const load = () => {
      loadVisitorMapData()
        .then((data) => {
          if (!cancelled) setMapData(data);
        })
        .catch(() => {});
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return () => { cancelled = true; };
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    }, { rootMargin: '700px 0px' });
    observer.observe(target);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [mapData]);

  useEffect(() => {
    if (!showVisitorMapModal) return undefined;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeVisitorMapModal();
      if (event.key !== 'Tab') return;
      const focusable = Array.from(mapDialogRef.current?.querySelectorAll(
        'button:not([disabled]), [href], select, [tabindex]:not([tabindex="-1"])'
      ) || []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    mapCloseButtonRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showVisitorMapModal]);

  useEffect(() => {
    if (!REALTIME_VISITOR_ENDPOINT) {
      return undefined;
    }

    let cancelled = false;
    const controller = new AbortController();
    const applyRealtimeSnapshot = (realtimeSnapshot) => {
      if (cancelled || !shouldApplyVisitorSnapshot(realtimeSnapshot, snapshotRef.current)) return;
      snapshotRef.current = realtimeSnapshot;
      setSnapshot(realtimeSnapshot);
      setVisitorUpdatedAt(realtimeSnapshot.updatedAt || new Date().toISOString());
    };

    const applyStaticFallback = () => {
      if (cancelled) return;
      snapshotRef.current = staticSnapshot;
      setSnapshot(staticSnapshot);
      setVisitorUpdatedAt(staticSnapshot.updatedAt || syncData.generatedAt || null);
    };

    const loadInitialSnapshot = async () => {
      try {
        const hitSnapshot = await recordVisitorHit();
        if (hitSnapshot) {
          applyRealtimeSnapshot(hitSnapshot);
          return;
        }

        const realtimeSnapshot = await fetchRealtimeVisitorSnapshot('stats', controller.signal);
        applyRealtimeSnapshot(realtimeSnapshot);
      } catch {
        applyStaticFallback();
      } finally {
        if (!cancelled) setIsVisitorSnapshotLoading(false);
      }
    };

    const loadSnapshot = async () => {
      try {
        const realtimeSnapshot = await fetchRealtimeVisitorSnapshot('stats', controller.signal);
        applyRealtimeSnapshot(realtimeSnapshot);
      } catch {
        // Keep the generated snapshot visible if the live request is blocked.
      }
    };

    loadInitialSnapshot();
    const intervalId = window.setInterval(loadSnapshot, VISITOR_REFRESH_MS);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [staticSnapshot, syncData.generatedAt]);

  return (
    <section ref={visitorSectionRef} className={`rounded-3xl border overflow-hidden shadow-xl shadow-slate-900/5 ${darkMode ? 'bg-[#0b1b2b]/70 border-cyan-400/15 shadow-cyan-950/10' : 'bg-white border-slate-200/80'}`} aria-labelledby="global-visitors-title">
      <div className={`px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b ${darkMode ? 'border-slate-700/70' : 'border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${darkMode ? 'bg-cyan-400/10 text-cyan-300' : 'bg-blue-50 text-blue-600'}`} aria-hidden="true">
            <MapIcon size={22} />
          </div>
          <div>
            <h2 id="global-visitors-title" className={`text-2xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-950'}`}>{ui.globalVisitors}</h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{ui.globalVisitorsDesc}</p>
            {!isVisitorSnapshotLoading && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-extrabold ${darkMode ? 'border-cyan-400/15 bg-cyan-400/10 text-cyan-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                  {snapshot.pageviews} {ui.pageviews}
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-extrabold ${darkMode ? 'border-cyan-400/15 bg-cyan-400/10 text-cyan-200' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                  {snapshot.countries} {ui.countries}
                </span>
              </div>
            )}
            {formattedUpdatedAt && !isVisitorSnapshotLoading && (
              <div className={`mt-2 text-[0.72rem] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {ui.visitorUpdated} {formattedUpdatedAt}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(16rem,0.95fr)] gap-6">
          <div>
            <h3 className={`text-xs font-extrabold uppercase tracking-widest mb-3 ${darkMode ? 'text-cyan-300' : 'text-slate-700'}`}>{ui.visitorMap}</h3>
            {renderVisitorMap()}
          </div>

          <div>
            <h3 className={`text-xs font-extrabold uppercase tracking-widest mb-3 ${darkMode ? 'text-cyan-300' : 'text-slate-700'}`}>{ui.topVisitorCountries}</h3>
            <div className={`rounded-2xl border p-4 min-h-[19rem] flex flex-col ${darkMode ? 'bg-[#071827]/60 border-cyan-400/10' : 'bg-slate-50/80 border-slate-100'}`} aria-label="Visitor country ranking">
              <div className={`space-y-2 ${showAllVisitorCountries && remainingVisitorCountries.length ? 'max-h-[13.5rem] overflow-y-auto pr-1' : ''}`}>
                {isVisitorSnapshotLoading
                  ? Array.from({ length: VISITOR_COUNTRY_PREVIEW_LIMIT }).map((_, index) => (
                    <div key={`visitor-loading-${index}`} className={`grid grid-cols-[2.7rem_minmax(0,1fr)_2rem] items-center gap-3 rounded-xl border px-3 py-2 text-sm ${darkMode ? 'bg-[#0b1b2b]/80 border-cyan-400/10' : 'bg-white border-slate-200'}`}>
                      <span className={`h-3 w-7 rounded-full animate-pulse ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                      <span className={`h-3 min-w-0 rounded-full animate-pulse ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                      <span className={`h-3 w-5 justify-self-end rounded-full animate-pulse ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                    </div>
                  ))
                  : displayedVisitorCountries.map(country => (
                    <div key={country.code} className={`grid grid-cols-[2.7rem_minmax(0,1fr)_2rem] items-center gap-3 rounded-xl border px-3 py-2 text-sm ${darkMode ? 'bg-[#0b1b2b]/80 border-cyan-400/10 text-slate-200' : 'bg-white border-slate-200 text-slate-700'}`}>
                      <span className={darkMode ? 'font-extrabold text-cyan-300' : 'font-extrabold text-blue-600'}>{country.code}</span>
                      <span className="min-w-0 truncate font-semibold">{country.name}</span>
                      <span className={`text-right font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{country.count}</span>
                    </div>
                  ))}
              </div>
              {!isVisitorSnapshotLoading && remainingVisitorCountries.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAllVisitorCountries(value => !value)}
                  className={`mt-3 inline-flex w-full items-center justify-center rounded-xl border px-3 py-2 text-xs font-extrabold transition-colors ${darkMode ? 'border-cyan-400/15 text-cyan-200 hover:bg-cyan-400/10' : 'border-slate-200 text-blue-700 hover:bg-white'}`}
                  aria-expanded={showAllVisitorCountries}
                >
                  {showAllVisitorCountries
                    ? ui.showTopVisitorCountriesOnly
                    : `${ui.showRemainingCountries} (${remainingVisitorCountries.length})`}
                  {showAllVisitorCountries ? <ChevronUp size={13} className="ml-1.5" /> : <ChevronDown size={13} className="ml-1.5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showVisitorMapModal && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#061523]/80 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="visitor-map-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeVisitorMapModal();
          }}
        >
          <div ref={mapDialogRef} className={`flex h-[min(86vh,780px)] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border shadow-2xl ${darkMode ? 'border-cyan-400/20 bg-[#071827] text-slate-100' : 'border-slate-200 bg-white text-slate-900'}`}>
            <div className={`flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-5 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="min-w-0">
                <h3 id="visitor-map-modal-title" className="truncate text-base font-extrabold sm:text-lg">{ui.visitorMapModalTitle}</h3>
                <p className={`mt-0.5 text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isVisitorSnapshotLoading
                    ? ui.loadingVisitors
                    : `${snapshot.pageviews} ${ui.pageviews} · ${snapshot.countries} ${ui.countries}`}
                </p>
              </div>
              <button
                ref={mapCloseButtonRef}
                type="button"
                onClick={closeVisitorMapModal}
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${darkMode ? 'border-cyan-400/15 text-slate-200 hover:bg-cyan-400/10' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                aria-label={ui.closeVisitorMap}
                title={ui.closeVisitorMap}
              >
                <X size={18} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
              <div className="grid min-h-full gap-4 xl:grid-cols-[minmax(0,1.85fr)_minmax(19rem,0.75fr)]">
                <div className="min-h-[22rem]">
                  {renderVisitorMap({ expanded: true })}
                </div>
                {renderRegionalDetails()}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ==========================================
// --- Main App Component ---
// ==========================================

export default function AcademicProfile() {
  const [darkMode, setDarkMode] = useState(() => (
    typeof window !== 'undefined'
      ? window.localStorage.getItem('aimin-homepage-theme') === 'dark'
        || (
          !window.localStorage.getItem('aimin-homepage-theme')
          && window.matchMedia?.('(prefers-color-scheme: dark)').matches
        )
      : false
  ));
  const [lang, setLang] = useState(() => (
    typeof window !== 'undefined' && window.localStorage.getItem('aimin-homepage-language') === 'zh'
      ? 'zh'
      : 'en'
  ));
  const [activeCitation, setActiveCitation] = useState(null);
  const citationReturnFocusIdRef = useRef('');
  const closeCitation = useCallback(() => {
    const returnFocusId = citationReturnFocusIdRef.current;
    setActiveCitation(null);
    window.setTimeout(() => document.getElementById(returnFocusId)?.focus(), 0);
  }, []);
  const [activeSection, setActiveSection] = useState(() => resolvePageFromHash());
  const [pageTransition, setPageTransition] = useState(() => ({
    displaySection: resolvePageFromHash(),
    phase: 'entered',
  }));
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMentoringGroups, setExpandedMentoringGroups] = useState({});
  const [pendingPublicationAnchor, setPendingPublicationAnchor] = useState(() => {
    const hash = getCurrentHashValue();
    return isPublicationHashValue(hash) ? hash : '';
  });

  // -- Filter & Search States --
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("All");
  const [visiblePubs, setVisiblePubs] = useState(12);
  const [showAllNews, setShowAllNews] = useState(false);

  const syncData = useMemo(() => getRuntimeSyncData(), []);
  const publications = useMemo(() => buildPublications(BASE_PUBLICATIONS, syncData), [syncData]);
  const content = PROFILE_DATA[lang];
  const ui = UI_COPY[lang];
  const displaySection = pageTransition.displaySection;
  const displayIsHomePage = displaySection === 'about' || displaySection === 'news';
  const displaySectionRef = useRef(displaySection);
  const newsItems = useMemo(() => buildNewsItems(content.news, syncData), [content.news, syncData]);
  const pageTitle = activeSection === 'about'
    ? content.meta_title
    : `${content.nav[activeSection] || content.name} | ${lang === 'zh' ? '黎爱民' : 'Aimin Li'}`;
  const pageDescription = activeSection === 'about'
    ? content.meta_desc
    : `${content.nav[activeSection] || content.name}. ${ui.homeNavCards[activeSection] || content.meta_desc}`;
  useSEO(pageTitle, pageDescription, lang, darkMode);
  const visibleNewsItems = showAllNews ? newsItems : newsItems.slice(0, 6);
  const matchesMentoredStudent = useMemo(
    () => createStudentMatcher(getMentoringStudentNames(content.mentoring)),
    [content.mentoring]
  );
  const isStudentOutcomePublication = (pub) => (
    pub.studentOutcome !== false
    && getAuthorList(pub.authors).some(author => matchesMentoredStudent(author))
  );
  const mentoringGroups = content.mentoring.groups?.length
    ? content.mentoring.groups
    : [{ title: content.mentoring.collaborationTitle, shortTitle: '', note: '', students: content.mentoring.students }];
  const visibleMentoringGroups = mentoringGroups
    .map((group, index) => {
      const groupKey = group.shortTitle || group.title || `group-${index}`;
      const isExpanded = Boolean(expandedMentoringGroups[groupKey]);
      const previewLimit = group.previewLimit || MENTORING_GROUP_PREVIEW_LIMIT;
      const visibleStudents = isExpanded ? group.students : group.students.slice(0, previewLimit);
      return {
        ...group,
        groupKey,
        isExpanded,
        totalCount: group.students.length,
        hiddenCount: Math.max(group.students.length - visibleStudents.length, 0),
        students: visibleStudents,
      };
    })
    .filter(group => group.students.length);
  const toggleMentoringGroup = (groupKey) => {
    setExpandedMentoringGroups((current) => ({
      ...current,
      [groupKey]: !current[groupKey],
    }));
  };

  const venueStats = useMemo(() => {
    const counts = {};
    publications.forEach(pub => {
      const v = pub.venue_short || 'Other';
      counts[v] = (counts[v] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([venue, count]) => ({ venue, count }));
  }, [publications]);

  const filteredPubs = useMemo(() => {
    let filtered = [...publications];
    const getSortMeta = (pub) => {
      const titleKey = normalizeTitle(pub.title);
      const newsIndex = newsItems.findIndex(item => normalizeTitle(`${item.content || ''} ${item.title || ''}`).includes(titleKey));
      const newsDate = newsIndex >= 0 ? newsItems[newsIndex].date : '';
      return {
        date: newsDate || `${pub.year || 0}-00`,
        newsIndex: newsIndex >= 0 ? newsIndex : Number.MAX_SAFE_INTEGER,
      };
    };
    const getContributionRank = (pub) => {
      if (pub.type === 'Thesis') return -1;
      if (isSoleAuthorPublication(pub) || isFirstAuthorPublication(pub) || isCoFirstAuthorPublication(pub)) return 0;
      if (pub.studentOutcome !== false && getAuthorList(pub.authors).some(author => matchesMentoredStudent(author))) return 1;
      return 2;
    };
    filtered.sort((a, b) => {
      const aMeta = getSortMeta(a);
      const bMeta = getSortMeta(b);
      const yearCompare = (Number(b.year) || 0) - (Number(a.year) || 0);
      if (yearCompare) return yearCompare;
      const contributionCompare = getContributionRank(a) - getContributionRank(b);
      if (contributionCompare) return contributionCompare;
      const dateCompare = bMeta.date.localeCompare(aMeta.date);
      if (dateCompare) return dateCompare;
      if (aMeta.newsIndex !== bMeta.newsIndex) return aMeta.newsIndex - bMeta.newsIndex;
      return 0;
    });
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => [
        p.title,
        p.title_zh,
        p.authors,
        p.venue,
        p.venue_short,
      ].filter(Boolean).some(value => value.toLowerCase().includes(q)));
    }
    if (selectedVenue !== "All") {
      filtered = filtered.filter(p => p.venue_short === selectedVenue);
    }
    return filtered;
  }, [matchesMentoredStudent, newsItems, publications, searchQuery, selectedVenue]);

  const groupedPublicationYears = useMemo(() => {
    const groups = new Map();
    const yearCounts = new Map();
    filteredPubs.forEach((pub) => {
      const year = String(pub.year || 'N/A');
      yearCounts.set(year, (yearCounts.get(year) || 0) + 1);
    });
    filteredPubs.slice(0, visiblePubs).forEach((pub) => {
      const year = String(pub.year || 'N/A');
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(pub);
    });
    return Array.from(groups.entries()).map(([year, pubs]) => ({
      year,
      pubs,
      totalCount: yearCounts.get(year) || pubs.length,
    }));
  }, [filteredPubs, visiblePubs]);

  const groupedAwardYears = useMemo(() => {
    const sortedAwards = [...content.awards].sort((a, b) => (
      awardYearValue(b) - awardYearValue(a)
      || String(a.title).localeCompare(String(b.title))
    ));
    const groups = new Map();
    sortedAwards.forEach((award) => {
      const year = String(awardYearValue(award) || award.year || 'N/A');
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(award);
    });
    return Array.from(groups.entries()).map(([year, awards]) => ({
      year,
      awards,
      totalCount: awards.length,
    }));
  }, [content.awards]);

  const serviceReviewGroups = useMemo(() => {
    const items = content.service.reviewer.map((venue, index) => ({
      ...getServiceVenueMeta(venue),
      index,
    }));
    const journals = items
      .filter(item => item.type === 'journal')
      .sort((a, b) => a.index - b.index);
    const conferences = items.filter(item => item.type === 'conference');
    return {
      journals,
      conferences,
      total: items.length,
    };
  }, [content.service.reviewer]);

  const teachingRows = useMemo(() => (
    [...content.teaching].sort((a, b) => (
      Number(String(b.period).match(/\d{4}/)?.[0] || 0) - Number(String(a.period).match(/\d{4}/)?.[0] || 0)
      || String(b.period).localeCompare(String(a.period))
    ))
  ), [content.teaching]);

  const talkRows = useMemo(() => (
    [...(content.talks || [])].sort((a, b) => (
      String(b.date || '').localeCompare(String(a.date || ''))
      || String(a.title || '').localeCompare(String(b.title || ''))
    ))
  ), [content.talks]);

  useEffect(() => {
    recordVisitorHit().catch(() => {});
  }, []);

  useEffect(() => {
    window.localStorage.setItem('aimin-homepage-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    window.localStorage.setItem('aimin-homepage-language', lang);
  }, [lang]);

  useEffect(() => {
    displaySectionRef.current = displaySection;
  }, [displaySection]);

  useEffect(() => {
    const currentDisplaySection = displaySectionRef.current;
    let settleTimer;
    let leaveTimer;
    let exitTimer;
    let enterTimer;

    if (activeSection === currentDisplaySection) {
      settleTimer = window.setTimeout(() => {
        setPageTransition((current) => (
          current.phase === 'entered' ? current : { ...current, phase: 'entered' }
        ));
      }, 0);
      return () => {
        window.clearTimeout(settleTimer);
      };
    }

    leaveTimer = window.setTimeout(() => {
      setPageTransition((current) => ({ ...current, phase: 'leaving' }));
      exitTimer = window.setTimeout(() => {
        displaySectionRef.current = activeSection;
        setPageTransition({ displaySection: activeSection, phase: 'entering' });
        enterTimer = window.setTimeout(() => {
          setPageTransition((current) => (
            current.displaySection === activeSection
              ? { ...current, phase: 'entered' }
              : current
          ));
        }, PAGE_FADE_IN_MS);
      }, PAGE_FADE_OUT_MS);
    }, 0);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(enterTimer);
    };
  }, [activeSection]);

  useEffect(() => {
    const syncPageFromHash = () => {
      const hash = getCurrentHashValue();
      if (isPublicationHashValue(hash)) {
        setSearchQuery("");
        setSelectedVenue("All");
        setVisiblePubs(publications.length);
        setPendingPublicationAnchor(hash);
      } else {
        setPendingPublicationAnchor('');
      }
      setActiveSection(resolvePageFromHash());
    };
    window.addEventListener('hashchange', syncPageFromHash);
    window.addEventListener('popstate', syncPageFromHash);
    syncPageFromHash();
    return () => {
      window.removeEventListener('hashchange', syncPageFromHash);
      window.removeEventListener('popstate', syncPageFromHash);
    };
  }, [publications.length]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (displaySection === 'publications' && pendingPublicationAnchor) {
        window.requestAnimationFrame(() => {
          document.getElementById(pendingPublicationAnchor)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        return;
      }
      if (displaySection === 'news') {
        document.getElementById('news')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [displaySection, pendingPublicationAnchor]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToPage = (key, event) => {
    event?.preventDefault();
    if (!PAGE_KEYS.includes(key)) return;
    const isSamePage = activeSection === key && displaySection === key;
    setActiveSection(key);
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      const nextHash = `#${key}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }
      if (isSamePage) {
        window.requestAnimationFrame(() => {
          if (key === 'news') document.getElementById('news')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }
  };
  const scrollToTop = () => {
    if (activeSection === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigateToPage('about');
  };
  const resetPublicationView = () => {
    setVisiblePubs(12);
  };
  const updateSearchQuery = (value) => {
    setSearchQuery(value);
    resetPublicationView();
  };
  const updateSelectedVenue = (value) => {
    setSelectedVenue(value);
    resetPublicationView();
  };

  const homeNavItems = [
    {
      key: 'about',
      targetKey: 'about',
      label: lang === 'en' ? 'Home' : '主页',
      icon: Sparkles,
      accent: darkMode ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200 shadow-cyan-950/20' : 'border-violet-200 bg-violet-50 text-violet-800 shadow-violet-100/70',
    },
    {
      key: 'news',
      icon: MessageCircle,
      accent: darkMode ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200 shadow-cyan-950/20' : 'border-cyan-200 bg-cyan-50 text-cyan-800 shadow-cyan-100/70',
    },
    {
      key: 'publications',
      icon: BookOpen,
      accent: darkMode ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200 shadow-emerald-950/25' : 'border-emerald-200 bg-emerald-50 text-emerald-800 shadow-emerald-100/70',
    },
    {
      key: 'timeline',
      icon: Plane,
      accent: darkMode ? 'border-blue-400/25 bg-blue-400/10 text-blue-200 shadow-blue-950/25' : 'border-blue-200 bg-blue-50 text-blue-800 shadow-blue-100/70',
    },
    {
      key: 'awards',
      icon: Trophy,
      accent: darkMode ? 'border-amber-400/25 bg-amber-400/10 text-amber-200 shadow-amber-950/25' : 'border-amber-200 bg-amber-50 text-amber-800 shadow-amber-100/70',
    },
    {
      key: 'service',
      icon: Star,
      accent: darkMode ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200 shadow-cyan-950/20' : 'border-purple-200 bg-purple-50 text-purple-800 shadow-purple-100/70',
    },
    {
      key: 'teaching',
      icon: Presentation,
      accent: darkMode ? 'border-pink-400/25 bg-pink-400/10 text-pink-200 shadow-pink-950/25' : 'border-pink-200 bg-pink-50 text-pink-800 shadow-pink-100/70',
    },
    {
      key: 'mentoring',
      icon: Users,
      accent: darkMode ? 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200 shadow-cyan-950/25' : 'border-cyan-200 bg-cyan-50 text-cyan-800 shadow-cyan-100/70',
    },
    {
      key: 'talks',
      icon: Mic2,
      accent: darkMode ? 'border-teal-400/25 bg-teal-400/10 text-teal-200 shadow-teal-950/25' : 'border-teal-200 bg-teal-50 text-teal-800 shadow-teal-100/70',
    },
    {
      key: 'cv',
      label: content.cvDownload,
      href: '/files/Aimin_Li_CV.pdf',
      download: 'Aimin_Li_CV.pdf',
      icon: Download,
      accent: darkMode ? 'border-sky-400/25 bg-sky-400/10 text-sky-200 shadow-sky-950/25' : 'border-sky-200 bg-sky-50 text-sky-800 shadow-sky-100/70',
    },
  ];
  const activeHomeNavIndex = Math.max(0, homeNavItems.findIndex((item) => (
    activeSection === item.key
  )));

  const profileSidebar = (
    <aside className={`profile-sidebar lg:col-span-3 flex-col items-center text-center lg:sticky lg:top-24 lg:flex lg:items-start lg:text-left space-y-5 ${displayIsHomePage ? 'flex' : 'hidden'}`}>
      <div className="profile-avatar relative group w-48 h-48 mx-auto lg:mx-0">
        <div className={`absolute -inset-1 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 ${darkMode ? 'bg-gradient-to-tr from-cyan-500 via-sky-500 to-emerald-400' : 'bg-gradient-to-tr from-purple-400 to-emerald-300'}`}></div>
        <div className={`relative w-full h-full rounded-full overflow-hidden border-[3px] shadow-2xl ${darkMode ? 'border-cyan-400/15' : 'border-white'}`}>
          <img src="/images/aimin-li-portrait-2026.jpg" alt={lang === 'zh' ? '黎爱民头像' : 'Portrait of Aimin Li'} width="192" height="192" decoding="async" className="w-full h-full object-cover bg-slate-100" />
        </div>
      </div>
      <div className="profile-socials w-full flex flex-wrap justify-center lg:justify-start gap-3">
         <SocialButton icon={Mail} href={content.social.email} label="Email" colorType="email" darkMode={darkMode} />
         <SocialButton icon={GoogleScholarIcon} href={content.social.scholar} label="Google Scholar" colorType="scholar" darkMode={darkMode} />
         <SocialButton icon={OrcidIcon} href={content.social.orcid} label="ORCID" colorType="orcid" darkMode={darkMode} />
         <SocialButton icon={Github} href={content.social.github} label="GitHub" colorType="github" darkMode={darkMode} />
         <SocialButton icon={Linkedin} href={content.social.linkedin} label="LinkedIn" colorType="linkedin" darkMode={darkMode} />
      </div>
      <nav
        className={`profile-page-nav relative hidden w-full max-w-[16rem] overflow-hidden rounded-2xl border p-2.5 text-left shadow-lg shadow-slate-900/5 lg:block ${darkMode ? 'profile-page-nav--dark border-cyan-400/15 bg-[#0b1b2b]/70 shadow-cyan-950/10' : 'border-slate-200 bg-white'}`}
        style={{ '--active-nav-index': activeHomeNavIndex }}
        aria-label={ui.homeNavTitle}
      >
        <div className={`absolute inset-y-2 left-1 w-px ${darkMode ? 'bg-cyan-400/15' : 'bg-slate-200'}`} />
        <span className="profile-page-nav__indicator" aria-hidden="true" />
        <div className="profile-page-nav__items flex flex-col gap-1">
          {homeNavItems.map((item) => {
            const Icon = item.icon;
            const targetKey = item.targetKey || item.key;
            const isActive = activeSection === item.key;
            const itemLabel = item.label || content.nav[item.key];
            const itemTitle = ui.homeNavCards[item.key];
            return (
              <a
                key={item.key}
                href={item.href || `#${targetKey}`}
                download={item.download}
                onClick={item.href ? undefined : (event) => navigateToPage(targetKey, event)}
                aria-current={isActive ? 'page' : undefined}
                title={itemTitle}
                className={`profile-page-nav__link group relative z-10 flex h-7 min-w-0 items-center gap-2 rounded-lg border px-2 text-[10px] font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${
                  isActive
                    ? (darkMode ? 'border-transparent bg-transparent text-white' : 'border-transparent bg-transparent text-slate-950')
                    : (darkMode ? 'border-cyan-400/10 bg-[#071827]/62 text-slate-300 hover:border-cyan-400/35 hover:bg-cyan-400/10' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-900')
                }`}
              >
                <span className={`profile-page-nav__icon inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${item.accent}`}>
                  <Icon size={10} strokeWidth={2.5} />
                </span>
                <span className="min-w-0 flex-1 truncate">{itemLabel}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </aside>
  );

  const PublicationRow = ({ pub }) => {
    const primaryHref = pub.url || pub.links?.pdf || pub.links?.arxiv || null;
    const displayTitle = getPublicationTitle(pub, lang);
    const isSoleAuthor = isSoleAuthorPublication(pub);
    const showSoleAuthorBadge = isSoleAuthor && pub.showSoleAuthorBadge !== false;
    const isCoFirstAuthor = isCoFirstAuthorPublication(pub);
    const isFirstAuthor = isFirstAuthorPublication(pub);
    const isAuthorLead = isSoleAuthor || isFirstAuthor || isCoFirstAuthor;
    const isStudentOutcome = !isAuthorLead && isStudentOutcomePublication(pub);
    const typeLabel = pub.type === 'Journal' ? ui.journalShort : pub.type === 'Thesis' ? ui.thesisShort : ui.conferenceShort;
    const inlineCoFirstLabel = lang === 'zh' ? '共同一作' : 'co-first';
    const highlightClass = isAuthorLead
      ? (darkMode ? 'border-l-amber-400 bg-amber-400/[0.04]' : 'border-l-amber-400 bg-amber-50/40')
      : isStudentOutcome
        ? (darkMode ? 'border-l-emerald-400 bg-emerald-400/[0.04]' : 'border-l-emerald-400 bg-emerald-50/40')
        : (darkMode ? 'border-l-cyan-400/10' : 'border-l-transparent');

    return (
      <article
        id={getPublicationAnchorId(pub)}
        className={`scroll-mt-28 border-b border-l-2 py-2 pl-3 pr-3 transition-colors target:ring-2 target:ring-cyan-400/35 last:border-b-0 ${highlightClass} ${darkMode ? 'border-b-cyan-400/10 hover:bg-cyan-400/[0.035]' : 'border-b-slate-200 hover:bg-slate-50/75'}`}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase ${darkMode ? 'border-cyan-400/10 bg-[#0e2032] text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
              {typeLabel}
            </span>
            <button
              type="button"
              onClick={() => updateSelectedVenue(pub.venue_short)}
              className={`rounded-md border px-2 py-0.5 text-[10px] font-black transition-colors ${darkMode ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:border-cyan-300/45' : 'border-cyan-200 bg-cyan-50 text-cyan-800 hover:border-cyan-300'}`}
              title={pub.venue}
            >
              {pub.venue_short}
            </button>
            {showSoleAuthorBadge && (
              <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black ${darkMode ? 'border-amber-400/25 bg-amber-400/10 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                {ui.soleAuthorBadge}
              </span>
            )}
            {isStudentOutcome && (
              <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black ${darkMode ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                {ui.studentOutcomeBadge}
              </span>
            )}
            {(pub.acceptanceRate || pub.acceptedWorldwide) && (
              <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black ${darkMode ? 'border-rose-300/30 bg-rose-400/10 text-rose-100' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
                {lang === 'zh' ? (
                  <>
                    {pub.acceptanceRate && <><strong>{pub.acceptanceRate}</strong> {ui.acceptanceRate}</>}
                    {pub.acceptanceRate && pub.acceptedWorldwide && <span> · </span>}
                    {pub.acceptedWorldwide && <>{ui.acceptedWorldwide} <strong>{pub.acceptedWorldwide}</strong> 篇</>}
                  </>
                ) : (
                  <>
                    {pub.acceptanceRate && <><strong>{pub.acceptanceRate}</strong> {ui.acceptanceRate}</>}
                    {pub.acceptanceRate && pub.acceptedWorldwide && <span> · </span>}
                    {pub.acceptedWorldwide && <><strong>{pub.acceptedWorldwide}</strong> {ui.acceptedWorldwide}</>}
                  </>
                )}
              </span>
            )}
            {pub.type === 'Journal' && pub.if && <JcrBadge zone={pub.jcr} ifVal={pub.if} darkMode={darkMode} />}
          </div>
        </div>

        <div className="mt-1 min-w-0">
          <h3 className={`text-[14px] font-extrabold leading-snug md:text-[15px] ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
            {primaryHref ? (
              <a href={primaryHref} target="_blank" rel="noreferrer" className={darkMode ? 'hover:text-cyan-300' : 'hover:text-cyan-700'} title={ui.openArticle}>
                {displayTitle}
              </a>
            ) : displayTitle}
          </h3>

          {(pub.venue || pub.venue_short) && (
            <div
              className={`mt-1 flex w-full max-w-full items-start gap-1.5 text-[10px] font-black leading-snug tracking-[0.08em] ${darkMode ? 'text-cyan-300/80' : 'text-cyan-700/80'}`}
              title={pub.venue_short}
            >
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${darkMode ? 'bg-cyan-300/70' : 'bg-cyan-600/70'}`} />
              <span className="min-w-0 whitespace-normal break-words">{pub.venue || pub.venue_short}</span>
            </div>
          )}

          <div className={`mt-1 text-[12px] font-medium leading-snug md:text-[13px] ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {getAuthorList(pub.authors).map((author, i, arr) => (
              <span key={`${pub.id}-author-${i}`}>
                {author.includes('Aimin Li') ? (
                  <>
                    <strong className={`font-black underline underline-offset-2 ${darkMode ? 'text-cyan-200 decoration-cyan-300/60' : 'text-cyan-800 decoration-cyan-500/45'}`}>{author}</strong>
                    {isCoFirstAuthor && (
                      <span className={`ml-1 inline-flex translate-y-[-1px] items-center rounded-full border px-1.5 py-0.5 text-[9px] font-black leading-none ${darkMode ? 'border-amber-400/30 bg-amber-400/10 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                        {inlineCoFirstLabel}
                      </span>
                    )}
                  </>
                ) : author}
                {i < arr.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>

          <div className="mt-2 flex max-w-full flex-wrap items-center gap-1.5">
            {pub.links?.pdf && <ActionButton icon={FileText} label="PDF" href={pub.links.pdf} type="pdf" darkMode={darkMode} />}
            {pub.links?.poster && <ActionButton icon={FileImage} label={ui.poster} href={pub.links.poster} type="poster" darkMode={darkMode} />}
            {pub.links?.project && <ActionButton icon={Presentation} label="Project" href={pub.links.project} type="project" darkMode={darkMode} />}
            {pub.url && <ActionButton icon={ExternalLink} label="Link" href={pub.url} type="external" darkMode={darkMode} />}
            {pub.links?.code && <ActionButton icon={Github} label="Code" href={pub.links.code} type="code" darkMode={darkMode} />}
            <ActionButton
              icon={Quote}
              label="Cite"
              id={`cite-${pub.id}`}
              onClick={() => {
                citationReturnFocusIdRef.current = `cite-${pub.id}`;
                setActiveCitation(getCitationFormats(pub));
              }}
              type="bibtex"
              darkMode={darkMode}
            />
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-cyan-400/25 ${darkMode ? 'theme-dark-ink text-slate-300' : 'bg-gray-50 text-slate-600'}`}>
      <a href="#main-content" className="skip-link">{lang === 'zh' ? '跳到主要内容' : 'Skip to main content'}</a>
      
      {/* --- Navigation --- */}
      <div className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${darkMode ? 'bg-[#0a1828]/90 border-cyan-400/10 shadow-[0_1px_0_rgba(34,211,238,0.05)]' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <a href="#about" className={`min-w-0 text-lg sm:text-xl font-extrabold tracking-tight flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} onClick={(event) => navigateToPage('about', event)}>
            <Sparkles size={18} className={`shrink-0 ${darkMode ? 'text-cyan-300' : 'text-purple-500'}`} />
            <span className="truncate">{content.name}</span>
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {Object.entries(content.nav).map(([key, label]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={(event) => navigateToPage(key, event)}
                  aria-current={activeSection === key ? 'page' : undefined}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${activeSection === key ? (darkMode ? 'bg-cyan-400/10 text-cyan-100 ring-1 ring-cyan-400/15' : 'bg-purple-100 text-purple-700') : (darkMode ? 'text-slate-400 hover:text-cyan-100 hover:bg-cyan-400/10' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50')}`}
                >
                  {label}
                </a>
              ))}
              <a
                href="/files/Aimin_Li_CV.pdf"
                download="Aimin_Li_CV.pdf"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-bold transition-all ${darkMode ? 'text-cyan-300 hover:text-white hover:bg-cyan-400/10' : 'text-cyan-700 hover:text-cyan-800 hover:bg-cyan-50'}`}
                title={lang === 'en' ? 'Download CV' : '下载简历'}
                aria-label={lang === 'en' ? 'Download CV' : '下载简历'}
              >
                <Download size={15} />
                <span>{content.cvDownload}</span>
              </a>
            </div>
            <LanguageToggle
              lang={lang}
              darkMode={darkMode}
              onToggle={() => setLang(l => l === 'en' ? 'zh' : 'en')}
            />
            <button type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? (lang === 'zh' ? '切换到浅色模式' : 'Switch to light mode') : (lang === 'zh' ? '切换到深色模式' : 'Switch to dark mode')} title={darkMode ? (lang === 'zh' ? '浅色模式' : 'Light mode') : (lang === 'zh' ? '深色模式' : 'Dark mode')} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-cyan-400/10 text-cyan-200' : 'hover:bg-gray-100 text-slate-600'}`}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            
            {/* Mobile Menu Button */}
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              aria-label={isMobileMenuOpen ? (lang === 'zh' ? '关闭导航菜单' : 'Close navigation menu') : (lang === 'zh' ? '打开导航菜单' : 'Open navigation menu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className={`lg:hidden p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-cyan-400/10 text-slate-300' : 'hover:bg-gray-100 text-slate-600'}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div id="mobile-navigation" className={`lg:hidden absolute top-16 left-0 w-full border-b shadow-lg px-4 py-4 flex flex-col gap-2 ${darkMode ? 'bg-[#0a1828] border-cyan-400/10' : 'bg-white border-gray-200'}`}>
            {Object.entries(content.nav).map(([key, label]) => (
              <a 
                key={key} 
                href={`#${key}`} 
                onClick={(event) => navigateToPage(key, event)}
                aria-current={activeSection === key ? 'page' : undefined}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === key ? (darkMode ? 'bg-cyan-400/10 text-cyan-100' : 'bg-purple-50 text-purple-700') : (darkMode ? 'text-slate-400 hover:text-cyan-100 hover:bg-cyan-400/10' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50')}`}
              >
                {label}
              </a>
            ))}
            <a
              href="/files/Aimin_Li_CV.pdf"
              download="Aimin_Li_CV.pdf"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${darkMode ? 'text-cyan-300 hover:text-white hover:bg-cyan-400/10' : 'text-cyan-700 hover:text-cyan-800 hover:bg-cyan-50'}`}
            >
              <Download size={16} />
              <span>{lang === 'en' ? 'Download CV' : '简历下载'}</span>
            </a>
            <div className="mt-2">
              <LanguageToggle
                lang={lang}
                darkMode={darkMode}
                fullWidth
                onToggle={() => {
                  setLang(l => l === 'en' ? 'zh' : 'en');
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      <main id="main-content" tabIndex="-1" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 space-y-12 lg:space-y-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {profileSidebar}
          <div className="lg:col-span-9 min-w-0">
            <div key={`${displaySection}-${lang}`} className={`page-transition-shell page-transition-shell--${pageTransition.phase} space-y-8`}>
            {displayIsHomePage && (
            <section id="about" className="scroll-mt-32 animate-fade-in-up">
              <div className="space-y-8">
              <div>
                <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-white to-slate-400' : 'from-gray-900 to-slate-600'}`}>{content.name}</h1>
                <div className={`text-xl md:text-2xl font-medium mb-6 flex flex-wrap items-center gap-2 ${darkMode ? 'text-cyan-300' : 'text-purple-600'}`}>{content.role} <span className="opacity-30 font-light">|</span> <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{content.org}</span></div>
                <BioText text={content.bio} darkMode={darkMode} />
              </div>
              
              <div id="news" className={`p-4 rounded-2xl border ${darkMode ? 'bg-[#0b1b2b]/70 border-cyan-400/15 shadow-[0_0_0_1px_rgba(34,211,238,0.03)]' : 'bg-white border-gray-100 shadow-sm'}`}>
                 <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${darkMode ? 'text-cyan-200' : 'text-purple-700'}`}>
                   <span className="relative flex h-2 w-2"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${darkMode ? 'bg-cyan-300' : 'bg-purple-400'}`}></span><span className={`relative inline-flex rounded-full h-2 w-2 ${darkMode ? 'bg-cyan-400' : 'bg-purple-500'}`}></span></span>
                   {content.nav.news}
                 </h3>
	                 <div id="news-list" className={`divide-y ${darkMode ? 'divide-cyan-400/10' : 'divide-gray-100'}`}>
                   {visibleNewsItems.map((item, idx) => (
	                     <div key={`${item.date}-${item.label}-${idx}`} className="grid grid-cols-[4.35rem_4.2rem_minmax(0,1fr)] gap-x-2 gap-y-0.5 py-1.5 text-[12px] leading-snug items-start">
                        <span className="font-mono text-[10px] leading-5 font-semibold opacity-50 whitespace-nowrap shrink-0">{item.date}</span>
                        <div className="contents">
                             <span className={`inline-flex items-center justify-center w-full text-center text-[9px] leading-4 font-bold px-1.5 py-0.5 rounded-full shrink-0 whitespace-nowrap ${darkMode ? 'bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/10' : 'bg-purple-100 text-purple-700'}`}>{item.label}</span>
                             {item.link ? (
                               <a href={item.link} target={item.link.startsWith('#') ? "_self" : "_blank"} rel="noreferrer" title={stripHtml(item.content)} className={`min-w-0 hover:underline decoration-1 underline-offset-2 inline-flex items-start gap-1 group ${darkMode ? 'hover:text-cyan-200' : 'hover:text-purple-600'}`}>
	                                  <SafeNewsContent content={item.content} />
                                  {!item.link.startsWith('#') && <ExternalLink size={9} className="mt-0.5 opacity-50 group-hover:opacity-100 shrink-0" />}
                               </a>
                             ) : (
	                               <SafeNewsContent content={item.content} title={stripHtml(item.content)} />
                             )}
                        </div>
                     </div>
                   ))}
                 </div>
                 {newsItems.length > 6 && (
                   <div className="pt-2 flex justify-end">
	                     <button type="button" onClick={() => setShowAllNews(value => !value)} aria-expanded={showAllNews} aria-controls="news-list" className={`inline-flex items-center gap-1.5 text-[10px] font-bold rounded-full px-2.5 py-1 transition-colors ${darkMode ? 'text-cyan-200 hover:bg-cyan-400/10' : 'text-purple-700 hover:bg-purple-50'}`}>
                       {showAllNews ? ui.fewerNews : ui.moreNews} <ChevronDown size={12} className={showAllNews ? 'rotate-180' : ''} />
                     </button>
                   </div>
                 )}
              </div>
          </div>
        </section>
        )}

        {/* --- Talks Section --- */}
        {displaySection === 'talks' && (
        <section id="talks" className="scroll-mt-32 animate-fade-in">
          <div className="mb-8 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-teal-400/10 text-teal-300' : 'bg-teal-50 text-teal-700'}`}>
              <Mic2 size={24} />
            </div>
            <div>
	              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.talks}</h1>
              <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.homeNavCards.talks}</p>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in">
            {talkRows.map((talk, idx) => (
              <section key={`${talk.date}-${talk.title}-${idx}`} className={`grid gap-2 border-t pt-3 md:grid-cols-[7rem_minmax(0,1fr)] ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                <div className="flex items-baseline justify-between gap-2 md:block">
                  <div className={`font-mono text-lg font-black leading-tight tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                    {talk.date}
                  </div>
                  {talk.type && (
                    <div className={`mt-1 inline-flex rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider md:mt-2 ${darkMode ? 'border-teal-400/25 bg-teal-400/10 text-teal-200' : 'border-teal-200 bg-teal-50 text-teal-800'}`}>
                      {talk.type}
                    </div>
                  )}
                </div>
                <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                  <article className={`border-l-2 py-2 pl-3 pr-3 transition-colors ${darkMode ? 'border-l-teal-400/70 bg-teal-400/[0.03] hover:bg-teal-400/[0.045]' : 'border-l-teal-400 bg-teal-50/35 hover:bg-slate-50/75'}`}>
                    <h3 className={`text-[15px] font-extrabold leading-snug md:text-base ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                      {talk.title}
                    </h3>
                    <div className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-semibold leading-snug md:text-[13px] ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <span className="inline-flex items-center gap-1.5">
                        <Presentation size={13} className={darkMode ? 'text-teal-300' : 'text-teal-700'} />
                        {talk.event}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} className={darkMode ? 'text-teal-300' : 'text-teal-700'} />
                        {talk.location}
                      </span>
                    </div>
                    {talk.note && (
                      <p className={`mt-1.5 text-[12px] font-medium leading-snug md:text-[13px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {talk.note}
                      </p>
                    )}
                  </article>
                </div>
              </section>
            ))}
          </div>
        </section>
        )}

        {/* --- Timeline Section (Optimized) --- */}
        {displaySection === 'timeline' && (
        <section id="timeline" className="scroll-mt-32 animate-fade-in">
           <div className="flex items-center gap-3 mb-8">
            <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}><Plane size={20} /></div>
	            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.timeline}</h1>
          </div>
          
          <div className="space-y-8">
            <div className="relative pl-7">
              <div className={`absolute left-[0.42rem] top-2 bottom-2 w-px ${darkMode ? 'bg-cyan-400/15' : 'bg-slate-200'}`}></div>
              <div className="space-y-5">
                {content.timeline.map((item, idx) => {
                   const isWork = item.type === 'work';
                   const advisor = item.lineage?.find(person => person.highlight) || item.lineage?.[item.lineage.length - 1];
                   
                   return (
                     <div key={idx} className="group relative">
                        <div className={`absolute -left-[1.63rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-110 ${
                          isWork
                            ? (darkMode ? 'border-cyan-200 bg-cyan-400 shadow-[0_0_0_4px_rgba(34,211,238,0.12)]' : 'border-purple-200 bg-purple-600 shadow-[0_0_0_4px_rgba(147,51,234,0.10)]')
                            : (darkMode ? 'border-emerald-300 bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]' : 'border-emerald-200 bg-emerald-600 shadow-[0_0_0_4px_rgba(5,150,105,0.10)]')
                        }`}></div>
                        <div className={`pb-5 ${idx === content.timeline.length - 1 ? '' : (darkMode ? 'border-b border-cyan-400/10' : 'border-b border-slate-200')}`}>
                          <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className={`font-mono text-[11px] font-black tabular-nums ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.year}</span>
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                              <MapPin size={11} /> {item.location}
                            </span>
                          </div>
                          <h3 className={`text-base font-extrabold leading-tight ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>{item.role}</h3>
                          <div className={`mt-0.5 text-sm font-semibold ${darkMode ? 'text-cyan-200' : 'text-indigo-700'}`}>{item.org}</div>
                          {advisor && (
                            <div className={`mt-1 text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {lang === 'zh' ? '合作导师' : 'Advisor'}: {advisor.name} · {advisor.title}
                            </div>
                          )}
                          {item.desc && (
                            <div className={`mt-2 text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              <HighlightText text={item.desc} darkMode={darkMode} />
                            </div>
                          )}
                          {item.reflection && (
                            <blockquote className={`mt-2 border-l-2 pl-3 font-serif text-sm font-medium italic leading-relaxed tracking-[0.005em] ${darkMode ? 'border-cyan-300/45 text-slate-100' : 'border-indigo-300 text-slate-800'}`}>
                              {item.reflection}
                            </blockquote>
                          )}
                          {item.lineage?.length > 0 && (
                            <div className="mt-4">
                              <AcademicLineage lineage={item.lineage} darkMode={darkMode} lang={lang} />
                            </div>
                          )}
                        </div>
                     </div>
                   )
                })}
              </div>
            </div>
          </div>
        </section>
        )}

        {/* --- PUBLICATIONS SECTION --- */}
        {displaySection === 'publications' && (
        <section id="publications" className="scroll-mt-32 space-y-8 animate-fade-in">
          <div>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}><BookOpen size={24} /></div>
                  <div>
	                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.publications}</h1>
	                    <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.publicationDesc}</p>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
                  <div className="relative min-w-0 flex-1 lg:w-80 lg:flex-none">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} size={16} />
	                  <input type="search" aria-label={ui.searchPlaceholder} placeholder={ui.searchPlaceholder} value={searchQuery} onChange={(e) => updateSearchQuery(e.target.value)} className={`h-11 w-full rounded-xl border pl-9 pr-4 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all ${darkMode ? 'bg-[#0e2032]/95 border-cyan-400/15 text-white placeholder-slate-500 focus:bg-[#12314a]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-300'}`} />
                  </div>
	                  <label className={`flex h-11 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-extrabold shadow-sm transition-colors ${darkMode ? 'border-cyan-400/15 bg-[#0e2032]/95 text-slate-300' : 'border-gray-200 bg-white text-slate-600'}`}>
                    <Tag size={14} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                    <span className="whitespace-nowrap">{ui.venueFilter}</span>
                    <select
                      value={selectedVenue}
                      onChange={(event) => updateSelectedVenue(event.target.value)}
                      className={`min-w-[9.5rem] max-w-[13rem] bg-transparent text-xs font-extrabold outline-none ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}
                    >
                      <option value="All">{ui.allPapers} ({publications.length})</option>
                      {venueStats.map(v => (
                        <option key={v.venue} value={v.venue}>{v.venue} ({v.count})</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
          </div>

          <div className="space-y-4 animate-fade-in">
            {groupedPublicationYears.map((group) => (
              <section key={group.year} className={`grid gap-2 border-t pt-3 md:grid-cols-[5rem_minmax(0,1fr)] ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-baseline justify-between gap-2 md:block">
                  <div className={`text-2xl font-black leading-none tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                    {group.year}
                  </div>
                  <div className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest md:mt-2 ${darkMode ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                    {group.totalCount} {ui.papersInYear}
                  </div>
                </div>
                <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  {group.pubs.map(pub => <PublicationRow key={pub.id} pub={pub} />)}
                </div>
              </section>
            ))}
          </div>

          {filteredPubs.length > visiblePubs && (
            <div className="flex justify-center pt-2">
	              <button type="button" onClick={() => setVisiblePubs(prev => prev + 12)} className={`group flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${darkMode ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700' : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-600 shadow-sm hover:shadow-md'}`}>
                {ui.viewMorePublications} ({filteredPubs.length - visiblePubs} {ui.remaining}) <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
          {filteredPubs.length === 0 && <div className="text-center py-12 opacity-50">{ui.noPapers}</div>}
        </section>
        )}

        {/* --- Awards Section (Compact) --- */}
        {displaySection === 'awards' && (
        <section id="awards" className="scroll-mt-32 animate-fade-in">
           <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600'}`}><Trophy size={20} /></div>
              <div>
	                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.awards}</h1>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.awardsDesc}</p>
              </div>
           </div>

           <div className="space-y-4">
             {groupedAwardYears.map((group) => (
               <section key={group.year} className={`grid gap-2 border-t pt-3 md:grid-cols-[5rem_minmax(0,1fr)] ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                 <div>
                   <div className={`text-2xl font-black leading-none tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                     {group.year}
                   </div>
                 </div>
                 <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                   {group.awards.map((award, idx) => (
                   <article
                     key={`${group.year}-${award.title}-${idx}`}
                       className={`grid gap-1.5 border-b border-l-2 py-2 pl-3 transition-colors last:border-b-0 ${darkMode ? 'border-b-cyan-400/10 border-l-cyan-400/10 hover:bg-cyan-400/[0.035]' : 'border-b-slate-200 border-l-transparent hover:bg-slate-50/75'}`}
                     >
                       <div className="flex flex-wrap items-center gap-1.5">
                         <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase ${darkMode ? 'border-cyan-400/10 bg-[#0e2032] text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                           {award.level}
                         </span>
                       </div>
                       <h3 className={`text-[14px] font-extrabold leading-snug md:text-[15px] ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                         {award.title}
                       </h3>
                       {award.desc && (
                         <p className={`text-[12px] font-medium leading-snug md:text-[13px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                           <HonorText text={award.desc} darkMode={darkMode} />
                         </p>
                       )}
                     </article>
                   ))}
                 </div>
               </section>
             ))}
           </div>
        </section>
        )}

        {/* --- SUBMITTED / PREPRINTS --- */}
        {displaySection === 'publications' && content.submitted && content.submitted.length > 0 && (
          <section id="submitted" className="scroll-mt-32">
             <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-sky-900/20 text-sky-400' : 'bg-sky-50 text-sky-600'}`}><Send size={24} /></div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Submitted & Preprints</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {content.submitted.map((item, idx) => (
                 <div key={idx} className={`p-5 rounded-2xl border flex flex-col h-full ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 hover:shadow-md'}`}>
                    <h3 className={`font-bold text-md mb-2 leading-snug ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>{item.title}</h3>
                    <div className={`text-xs mb-4 italic ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{item.authors}</div>
                    <p className={`text-xs mb-4 flex-1 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{item.summary}</p>
                    <div className="mt-auto flex items-center justify-between border-t pt-3 dark:border-slate-700">
                       <span className={`text-[10px] font-bold px-2 py-1 rounded border ${darkMode ? 'bg-slate-800 border-slate-600 text-sky-400' : 'bg-sky-50 border-sky-100 text-sky-700'}`}>{item.venue}</span>
                       {item.links?.arxiv && <ActionButton icon={ArxivIcon} label="ArXiv" href={item.links.arxiv} type="arxiv" darkMode={darkMode} />}
                    </div>
                 </div>
              ))}
            </div>
          </section>
        )}

        {/* --- Service & Contact --- */}
        {displaySection === 'service' && (
        <section id="service" className="scroll-mt-32 animate-fade-in">
          <div className="mb-8 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/10' : 'bg-purple-50 text-purple-600'}`}><Star size={24} /></div>
              <div>
	                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.service}</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.homeNavCards.service}</p>
              </div>
          </div>
          <div className="space-y-5">
            <section className={`grid gap-2 border-t pt-3 md:grid-cols-[7rem_minmax(0,1fr)] ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div>
                <div className={`text-sm font-black uppercase tracking-[0.16em] ${darkMode ? 'text-cyan-200' : 'text-purple-700'}`}>
                  {ui.serviceReviewerTitle}
                </div>
                <div className={`mt-1 text-[10px] font-black uppercase tracking-[0.16em] ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                  {serviceReviewGroups.total} {lang === 'en' ? 'venues' : '项'}
                </div>
              </div>
              <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                {[
                  { key: 'journals', label: ui.serviceJournals, items: serviceReviewGroups.journals },
                  { key: 'conferences', label: ui.serviceConferences, items: serviceReviewGroups.conferences },
                ].map(group => (
                  <div key={group.key} className={darkMode ? 'border-b border-cyan-400/10 last:border-b-0' : 'border-b border-slate-200 last:border-b-0'}>
                    <div className={`flex items-center justify-between gap-3 px-3 py-2 ${darkMode ? 'bg-[#071827]/48' : 'bg-slate-50/65'}`}>
                      <h3 className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Tag size={12} /> {group.label}
                      </h3>
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black ${darkMode ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200' : 'border-purple-200 bg-purple-50 text-purple-800'}`}>
                        {group.items.length}
                      </span>
                    </div>
                    {group.items.map(item => (
                      <article
                        key={item.full}
                        title={item.full}
                        className={`border-t border-l-2 py-2 pl-3 pr-3 transition-colors ${darkMode ? 'border-t-cyan-400/10 border-l-cyan-400/55 hover:bg-cyan-400/[0.035]' : 'border-t-slate-200 border-l-purple-400 hover:bg-slate-50/75'}`}
                      >
                        <div className={`flex items-start gap-2 text-[13px] font-semibold leading-snug md:text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                          <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${darkMode ? 'text-cyan-200' : 'text-purple-600'}`} />
                          <span>{item.full}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {[
              { key: 'chair', label: ui.serviceChairTitle, icon: Mic2, items: content.service.chair, color: 'emerald' },
              { key: 'tpc', label: ui.serviceTpcTitle, icon: Users, items: content.service.tpc || [], color: 'purple' },
              { key: 'volunteer', label: ui.serviceVolunteerTitle, icon: User, items: content.service.volunteer, color: 'blue' },
            ].map((group) => {
              const Icon = group.icon;
              const colorClass = {
                emerald: {
                  label: darkMode ? 'text-emerald-300' : 'text-emerald-700',
                  border: darkMode ? 'border-l-emerald-400/70' : 'border-l-emerald-400',
                  icon: darkMode ? 'text-emerald-300' : 'text-emerald-600',
                  dot: darkMode ? 'bg-emerald-300' : 'bg-emerald-600',
                },
                purple: {
                  label: darkMode ? 'text-cyan-200' : 'text-purple-700',
                  border: darkMode ? 'border-l-cyan-400/55' : 'border-l-purple-400',
                  icon: darkMode ? 'text-cyan-200' : 'text-purple-600',
                  dot: darkMode ? 'bg-cyan-300' : 'bg-purple-600',
                },
                blue: {
                  label: darkMode ? 'text-blue-300' : 'text-blue-700',
                  border: darkMode ? 'border-l-blue-400/70' : 'border-l-blue-400',
                  icon: darkMode ? 'text-blue-300' : 'text-blue-600',
                  dot: darkMode ? 'bg-blue-300' : 'bg-blue-600',
                },
              }[group.color];
              return (
                <section key={group.key} className={`grid gap-2 border-t pt-3 md:grid-cols-[7rem_minmax(0,1fr)] ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                  <div>
                    <div className={`flex items-center gap-1.5 text-sm font-black uppercase tracking-[0.16em] ${colorClass.label}`}>
                      <Icon size={14} /> {group.label}
                    </div>
                  </div>
                  <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                    {group.items.map((item, i) => (
                      <article
                        key={`${group.key}-${i}`}
                        className={`border-b border-l-2 py-2 pl-3 pr-3 transition-colors last:border-b-0 ${colorClass.border} ${darkMode ? 'border-b-cyan-400/10 hover:bg-cyan-400/[0.035]' : 'border-b-slate-200 hover:bg-slate-50/75'}`}
                      >
                        <div className={`flex items-start gap-2 text-[13px] font-semibold leading-snug md:text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                          {group.key === 'chair'
                            ? <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${colorClass.icon}`} />
                            : <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${colorClass.dot}`} />}
                          <span>{item}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
        )}

        {/* --- Teaching Section --- */}
        {displaySection === 'teaching' && (
        <section id="teaching" className="scroll-mt-32 animate-fade-in">
          <div className="mb-8 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-pink-900/20 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
              <Presentation size={24} />
            </div>
            <div>
	              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.teaching}</h1>
              <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.homeNavCards.teaching}</p>
            </div>
          </div>
          <div className="space-y-4 animate-fade-in">
            {teachingRows.map((item, idx) => (
              <section key={`${item.period}-${item.course}-${idx}`} className={`grid gap-2 border-t pt-3 md:grid-cols-[6.5rem_minmax(0,1fr)] ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                <div className="flex items-baseline justify-between gap-2 md:block">
                  <div className={`text-xl font-black leading-tight tabular-nums ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                    {item.period}
                  </div>
                </div>
                <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                  <article className={`border-l-2 py-2 pl-3 transition-colors ${darkMode ? 'border-l-cyan-400/55 border-b-cyan-400/10 bg-cyan-400/[0.03] hover:bg-cyan-400/[0.035]' : 'border-l-pink-400 border-b-slate-200 bg-pink-50/40 hover:bg-slate-50/75'}`}>
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase ${darkMode ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200' : 'border-pink-200 bg-pink-50 text-pink-800'}`}>
                        {item.role}
                      </span>
                      {item.desc && (
                        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black ${darkMode ? 'border-cyan-400/10 bg-[#0e2032] text-slate-300' : 'border-slate-200 bg-white text-slate-700'}`}>
                          {item.desc}
                        </span>
                      )}
                    </div>
                    <h3 className={`text-[15px] font-extrabold leading-snug ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                      {item.course}
                    </h3>
                    <div className={`mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium leading-snug md:text-[13px] ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <span className="inline-flex items-center gap-1.5">
                        <School size={13} className={darkMode ? 'text-cyan-200' : 'text-pink-700'} />
                        {item.org}
                      </span>
                    </div>
                  </article>
                </div>
              </section>
            ))}
          </div>
        </section>
        )}

        {/* --- Student Mentoring Section --- */}
        {displaySection === 'mentoring' && (
        <section id="mentoring" className="scroll-mt-32 animate-fade-in">
          <div className="mb-8 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-cyan-400/10 text-cyan-300' : 'bg-cyan-50 text-cyan-700'}`}>
              <Users size={24} />
            </div>
            <div>
	              <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{content.mentoring.title}</h1>
              <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.homeNavCards.mentoring}</p>
            </div>
          </div>

          <div className="space-y-5">
            <section className={`grid gap-2 border-t pt-3 md:grid-cols-[7rem_minmax(0,1fr)] ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div>
                <div className={`flex items-center gap-1.5 text-sm font-black uppercase tracking-[0.16em] ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>
                  <Network size={14} /> {content.mentoring.leadershipTitle}
                </div>
              </div>
              <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <article className={`border-l-2 py-2 pl-3 pr-3 transition-colors ${darkMode ? 'border-l-cyan-400/55 bg-cyan-400/[0.03] hover:bg-cyan-400/[0.035]' : 'border-l-cyan-400 bg-cyan-50/30 hover:bg-slate-50/75'}`}>
                  <p className={`text-[13px] font-medium leading-relaxed md:text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {content.mentoring.leadershipSummary}
                  </p>
                </article>
              </div>
            </section>

            {visibleMentoringGroups.map((group) => {
              const accent = group.shortTitle === 'METU'
                ? {
                    text: darkMode ? 'text-cyan-200' : 'text-cyan-800',
                    border: darkMode ? 'border-cyan-400/25' : 'border-cyan-200',
                    bg: darkMode ? 'bg-cyan-400/10' : 'bg-cyan-50',
                    side: darkMode ? 'border-cyan-400' : 'border-cyan-500',
                    dot: darkMode ? 'bg-cyan-300' : 'bg-cyan-600',
                  }
                : group.shortTitle === 'ZZU'
                  ? {
                      text: darkMode ? 'text-emerald-200' : 'text-emerald-800',
                      border: darkMode ? 'border-emerald-400/25' : 'border-emerald-200',
                      bg: darkMode ? 'bg-emerald-400/10' : 'bg-emerald-50',
                      side: darkMode ? 'border-emerald-400' : 'border-emerald-500',
                      dot: darkMode ? 'bg-emerald-300' : 'bg-emerald-600',
                    }
                  : {
                      text: darkMode ? 'text-cyan-200' : 'text-indigo-800',
                      border: darkMode ? 'border-cyan-400/20' : 'border-indigo-200',
                      bg: darkMode ? 'bg-cyan-400/10' : 'bg-indigo-50',
                      side: darkMode ? 'border-cyan-400/55' : 'border-indigo-500',
                      dot: darkMode ? 'bg-cyan-300' : 'bg-indigo-600',
                    };

              return (
                <section key={group.title} className={`grid gap-2 border-t pt-3 md:grid-cols-[7rem_minmax(0,1fr)] ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                  <div>
                    {group.shortTitle && (
                      <div className={`inline-flex rounded-lg border px-2.5 py-1 text-xl font-black leading-none tracking-tight ${accent.border} ${accent.bg} ${accent.text}`}>
                        {group.shortTitle}
                      </div>
                    )}
                    <div className={`mt-2 text-[10px] font-black uppercase tracking-[0.16em] ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      {group.totalCount} {lang === 'en' ? 'students' : '位学生'}
                    </div>
                  </div>

                  <div className={`overflow-hidden border-y md:border-y-0 md:border-l ${darkMode ? 'border-cyan-400/10' : 'border-slate-200'}`}>
                    <div className={`border-b px-3 py-2 ${darkMode ? 'border-cyan-400/10 bg-[#071827]/48' : 'border-slate-200 bg-slate-50/65'}`}>
                      <div className={`text-sm font-extrabold leading-tight ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>{group.title}</div>
                      {group.note && (
                        <div className={`mt-0.5 text-[11px] font-medium leading-snug ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                          {group.note}
                        </div>
                      )}
                    </div>

                    {group.students.map((student) => (
                      <article
                        key={`${group.title}-${student.name}`}
                        className={`grid gap-2 border-b border-l-2 py-2 pl-3 pr-3 transition-colors last:border-b-0 md:grid-cols-[7.5rem_minmax(0,1fr)] md:items-start ${accent.side} ${darkMode ? 'border-b-cyan-400/10 hover:bg-cyan-400/[0.035]' : 'border-b-slate-200 hover:bg-slate-50/75'}`}
                      >
                        <div className="flex flex-wrap items-center gap-1.5 md:block">
                          {student.period && (
                            <div className={`font-mono text-[11px] font-black tabular-nums ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              {student.period}
                            </div>
                          )}
                          {student.stage && (
                            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-black leading-none md:mt-1 ${accent.border} ${accent.bg} ${accent.text}`}>
                              {student.stage}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="mb-1 flex min-w-0 flex-wrap items-center gap-1.5">
                            <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                            <h4 className={`text-[14px] font-extrabold leading-snug md:text-[15px] ${darkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                              {student.name}
                            </h4>
                          </div>
                          {student.outcome && (
                            <div className={`text-[12px] font-medium leading-snug md:text-[13px] ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {student.outcome}
                            </div>
                          )}
                        </div>
                      </article>
                    ))}

                    {(group.isExpanded || group.hiddenCount > 0) && (
                      <div className={`border-t px-3 py-2 ${darkMode ? 'border-cyan-400/10 bg-[#071827]/60' : 'border-slate-100 bg-slate-50/70'}`}>
                        <button
                          type="button"
                          onClick={() => toggleMentoringGroup(group.groupKey)}
                          className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-extrabold transition-all ${accent.border} ${accent.bg} ${accent.text}`}
                          aria-expanded={group.isExpanded}
                          aria-label={`${group.title}: ${group.isExpanded ? content.mentoring.studentListClose : content.mentoring.studentListOpen}`}
                          title={group.isExpanded ? content.mentoring.studentListClose : content.mentoring.studentListOpen}
                        >
                          <span>
                            {group.isExpanded
                              ? (lang === 'en' ? 'Less' : '收起')
                              : (lang === 'en' ? `Show ${group.hiddenCount} more` : `展开 ${group.hiddenCount} 位`)}
                          </span>
                          {group.isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
        )}

            </div>
          </div>
        </div>

        <div className={`mx-auto mt-5 mb-2 max-w-4xl border-y py-2.5 text-center ${
          darkMode ? 'border-slate-700/70' : 'border-slate-200'
        }`}>
            <p className={`mx-auto max-w-3xl font-serif text-[15px] italic leading-snug md:text-lg ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>
              {lang === 'zh'
                ? '始终欢迎聪慧的伙伴与我联系，一起探索未知。'
                : 'Always welcome brilliant minds to connect and explore the unknown together.'}
            </p>
            <p className={`mx-auto mt-1 max-w-3xl text-[11px] font-semibold leading-snug md:text-xs ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {lang === 'zh'
                ? '如果你对合作感兴趣，欢迎给我发邮件：hitliaimin AT 163.com'
                : 'Drop me an email if you are interested in collaborations: hitliaimin AT 163.com'}
            </p>
            <div className={`mx-auto mt-1.5 h-px w-12 ${darkMode ? 'bg-cyan-300/55' : 'bg-cyan-500/55'}`} />
        </div>

        {displayIsHomePage && (
          <GlobalVisitors syncData={syncData} darkMode={darkMode} ui={ui} lang={lang} />
        )}

        {/* Motto Banner */}
        <div className="group relative overflow-hidden px-6 py-8 text-center">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=76"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className={`absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${darkMode ? 'brightness-50 grayscale-[0.4]' : 'brightness-110 grayscale-[0.2]'}`}
          />
          <div className={`absolute inset-0 z-0 ${darkMode ? 'bg-[#071827]/70' : 'bg-white/60'}`}></div>
          <div className="relative z-10">
            <Quote size={18} className={`mx-auto mb-3 opacity-60 ${darkMode ? 'text-cyan-200' : 'text-purple-600'}`} />
            <h2 className={`text-xl md:text-2xl font-serif italic tracking-wide leading-relaxed drop-shadow-sm ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              复杂中见序，纷乱中求真
            </h2>
            <p className={`mt-2 text-[10px] font-sans uppercase tracking-[0.3em] opacity-70 font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Order in complexity, truth in chaos
            </p>
            <a
              href="mailto:hitliaimin@163.com"
              title="Email: hitliaimin@163.com"
              aria-label="Send email to hitliaimin@163.com"
              className={`mt-4 inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.16em] transition-colors ${
                darkMode
                  ? 'border-cyan-300/25 bg-[#071827]/35 text-slate-200 hover:border-cyan-300/60 hover:text-cyan-100'
                  : 'border-slate-700/10 bg-white/45 text-slate-700 hover:border-purple-400/45 hover:text-purple-700'
              }`}
            >
              E-mail: hitliaimin AT 163.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className={`pt-12 pb-8 border-t text-center text-sm ${darkMode ? 'border-cyan-400/10 text-slate-500' : 'border-gray-100 text-gray-400'}`}>
          <p>&copy; {new Date().getFullYear()} {content.name}. All rights reserved.</p>
        </footer>

      </main>
      
      {activeCitation && (
        <CitationModal
          formats={activeCitation}
          onClose={closeCitation}
          darkMode={darkMode}
          ui={ui}
        />
      )}
      
      <button type="button" onClick={scrollToTop} tabIndex={showBackToTop ? 0 : -1} aria-hidden={!showBackToTop} aria-label={lang === 'zh' ? '返回顶部' : 'Back to top'} title={lang === 'zh' ? '返回顶部' : 'Back to top'} className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 transform ${showBackToTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'} ${darkMode ? 'bg-cyan-500/90 text-slate-950 shadow-cyan-950/30 hover:bg-cyan-300' : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-100'}`}>
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
