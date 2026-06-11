import React, { useState, useEffect, useMemo } from 'react';
import { 
  Moon, Sun, MapPin, Mail, Linkedin, 
  Github, GraduationCap, Briefcase, FileText, 
  Award, ExternalLink, BookOpen, ChevronRight,
  Download, Play, Youtube, Copy,
  Quote, Search, Filter, Star, Trophy, Video,
  School, ChevronDown, ChevronUp, Layers, User, Users,
  Sparkles, Medal, Calendar, Mic2, CheckCircle2,
  Map as MapIcon, ArrowUp, Presentation, Send, Tag, Plus, ArrowUpDown,
  MessageCircle, Plane, Landmark, Network, GitCommit, Languages,
  Menu, X // Added Menu and X icons for mobile navigation
} from 'lucide-react';
import { BASE_PUBLICATIONS, PROFILE_DATA } from './data/homepageData';

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

const useSEO = (title, description, lang = 'en') => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [title, description, lang]);
};

const generateBibtex = (pub) => {
  const year = pub.year;
  const firstAuthorSurname = pub.authors.split(',')[0]?.trim().split(' ').pop() || 'Author';
  const firstTitleWord = pub.title.split(' ')[0] || 'Title';
  const id = (firstAuthorSurname + year + firstTitleWord).toLowerCase();
  return `@${pub.type === 'Journal' ? 'article' : 'inproceedings'}{${id},
  title={${pub.title}},
  author={${pub.authors}},
  journal={${pub.venue}},
  year={${year}}
}`;
};

const VISITOR_STATS_URL = 'https://info.flagcounter.com/Ad32';
const VISITOR_TRACKER_URL = 'https://s01.flagcounter.com/count2/Ad32/bg_FFFFFF/txt_334155/border_CBD5E1/columns_2/maxflags_12/viewers_0/labels_1/pageviews_1/flags_1/percent_0/?v=20260611a';
const REALTIME_VISITOR_ENDPOINT = (import.meta.env.VITE_VISITOR_STATS_ENDPOINT || '').replace(/\/+$/, '');
const VISITOR_REFRESH_MS = 60_000;
const HOMEPAGE_ALLOWED_SYNC_PATTERNS = [
  /\bTMC\b|transactions on mobile computing/i,
  /\bIoTJ\b|\bJIOT\b|internet of things journal/i,
  /\bISIT\b|international symposium on information theory/i,
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
    selectedPublications: 'Selected Publications',
    viewMorePublications: 'View More Publications',
    remaining: 'remaining',
    noPapers: 'No papers found matching your criteria.',
    selected: 'Selected',
    openArticle: 'Open article',
    expandAbstract: 'Expand abstract',
    collapseAbstract: 'Collapse abstract',
    abstract: 'Abstract',
    noAbstract: 'No abstract available.',
    moreNews: 'More News',
    fewerNews: 'Fewer News',
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
    globalVisitorsDesc: 'Approximate visitor locations by country.',
    viewStats: 'View Stats',
    visitorMap: 'Visitor Map',
    topVisitorCountries: 'Top Visitor Countries',
    activeVisitorRegions: 'Active visitor regions',
    countrySignal: 'aggregate country-level signal',
    pageviews: 'pageviews',
    countries: 'countries',
    visitorNote: 'Visitor countries are estimated by FlagCounter for aggregate statistics; individual identities are not shown here.',
    visitorLive: 'Live',
    visitorSnapshot: 'Snapshot',
    visitorUpdated: 'Updated',
    visitorNoteLive: 'Visitor countries are counted in aggregate by country; individual identities are not stored or shown here.',
  },
  zh: {
    publicationDesc: '精选论文与学术成果。',
    searchPlaceholder: '搜索题目、作者或期刊会议...',
    newestFirst: '最新优先',
    oldestFirst: '最早优先',
    toggleSort: '切换时间排序',
    allPapers: '全部论文',
    moreVenues: '更多期刊会议',
    selectedPublications: '精选论文',
    viewMorePublications: '查看更多论文',
    remaining: '篇未显示',
    noPapers: '没有找到符合条件的论文。',
    selected: '精选',
    openArticle: '打开论文链接',
    expandAbstract: '展开摘要',
    collapseAbstract: '收起摘要',
    abstract: '摘要',
    noAbstract: '暂无摘要。',
    moreNews: '更多动态',
    fewerNews: '收起动态',
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
    globalVisitorsDesc: '按国家统计的近似访问来源。',
    viewStats: '查看统计',
    visitorMap: '访客地图',
    topVisitorCountries: '访问国家排名',
    activeVisitorRegions: '已点亮访问区域',
    countrySignal: '国家级聚合访问统计',
    pageviews: '次访问',
    countries: '个国家',
    visitorNote: '访客国家由 FlagCounter 按聚合统计估算；此处不展示个人身份信息。',
    visitorLive: '实时',
    visitorSnapshot: '快照',
    visitorUpdated: '更新于',
    visitorNoteLive: '访客国家按国家级聚合统计；此处不存储或展示个人身份信息。',
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

const normalizeVisitorPayload = (payload = {}) => {
  const visitorSnapshot = payload.visitorSnapshot || payload;
  const ranking = Array.isArray(visitorSnapshot.ranking)
    ? visitorSnapshot.ranking
      .filter(country => country?.code && Number.isFinite(Number(country.count)))
      .map((country, index) => ({
        code: String(country.code).toUpperCase(),
        name: country.name || country.code,
        matchName: country.matchName || country.name || country.code,
        count: Number(country.count),
        delay: country.delay ?? Number((index * 0.4).toFixed(1)),
      }))
    : [];

  if (!ranking.length) return null;

  return {
    pageviews: Number(visitorSnapshot.pageviews) || ranking.reduce((sum, country) => sum + country.count, 0),
    countries: Number(visitorSnapshot.countries) || ranking.length,
    ranking,
    updatedAt: payload.generatedAt || payload.updatedAt || visitorSnapshot.updatedAt || null,
  };
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

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const normalizeTitle = (value = '') => stripHtml(value)
  .toLowerCase()
  .replace(/[^\p{Letter}\p{Number}]+/gu, ' ')
  .trim();

const slugify = (value = '') => normalizeTitle(value).replace(/\s+/g, '-').slice(0, 80) || 'item';

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
    type: item.type || (/conference|symposium|workshop|vtc|isit/i.test(item.venue || venueShort) ? 'Conference' : 'Journal'),
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
  return {
    ...DEFAULT_VISITOR_SNAPSHOT,
    ...snapshot,
    ranking: Array.isArray(snapshot.ranking) && snapshot.ranking.length
      ? snapshot.ranking
      : DEFAULT_VISITOR_SNAPSHOT.ranking,
  };
};

const COUNTRY_NAME_ALIASES = new Map([
  ['united states', 'united states of america'],
  ['usa', 'united states of america'],
  ['turkiye', 'turkey'],
  ['czechia', 'czech republic'],
  ['russia', 'russian federation'],
  ['south korea', 'korea south'],
  ['north korea', 'korea north'],
  ['vietnam', 'viet nam'],
  ['laos', 'lao pdr'],
  ['syria', 'syrian arab republic'],
  ['iran', 'iran islamic republic of'],
  ['moldova', 'moldova republic of'],
  ['bolivia', 'bolivia plurinational state of'],
  ['venezuela', 'venezuela bolivarian republic of'],
  ['tanzania', 'united republic of tanzania'],
]);

const normalizeCountryName = (value = '') => String(value)
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

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
    const geometry = activeByCode.get(country.code) || mapCountryByName.get(aliased) || mapCountryByName.get(normalized);
    return {
      ...country,
      delay: country.delay ?? Number((index * 0.4).toFixed(1)),
      x: geometry?.x || (country.x ? (country.x > 100 ? country.x : viewBox.width * country.x / 100) : viewBox.width / 2),
      y: geometry?.y || (country.y ? (country.y > 100 ? country.y : viewBox.height * country.y / 100) : viewBox.height / 2),
      d: geometry?.d || '',
    };
  });
};

const formatVisitorUpdatedAt = (value, lang) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en', {
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

const HighlightText = ({ text, darkMode }) => {
  if (!text) return null;
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))|(\*\*.*?\*\*)/g).filter(Boolean);
  
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
        return part;
      })}
    </span>
  );
};

const ActionButton = ({ icon, label, href, onClick, type = "default", darkMode }) => {
  if (!href && !onClick) return null;
  const styles = {
    pdf: darkMode ? "bg-red-900/20 text-red-400 border-red-800/50 hover:bg-red-900/40" : "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    code: darkMode ? "bg-gray-800 text-white border-gray-700 hover:bg-black" : "bg-gray-900 text-white border-gray-900 hover:bg-black",
    bibtex: darkMode ? "bg-blue-900/20 text-blue-400 border-blue-800/50 hover:bg-blue-900/40" : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
    arxiv: darkMode ? "bg-red-900/10 text-red-400 border-red-800/30 hover:bg-red-900/30" : "bg-red-50 text-red-800 border-red-100 hover:bg-red-100",
    default: darkMode ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700" : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50"
  };
  
  const colorClass = styles[type] || styles.default;
  const Component = href ? 'a' : 'button';
  
  return (
    <Component 
      href={href} 
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }} 
      target={href ? "_blank" : undefined} 
      rel={href ? "noreferrer" : undefined} 
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border cursor-pointer ${colorClass}`}
    >
      {React.createElement(icon, { size: 14 })}{label}
    </Component>
  );
};

const SocialButton = ({ icon, href, label, colorType, darkMode }) => {
  const colors = {
    email: darkMode ? "bg-[#EA4335] text-white border-[#EA4335] hover:bg-[#d33426]" : "bg-[#EA4335] text-white border-[#EA4335] hover:bg-[#d33426] shadow-sm",
    scholar: darkMode ? "bg-[#4285F4] text-white border-[#4285F4] hover:bg-[#3367d6]" : "bg-[#4285F4] text-white border-[#4285F4] hover:bg-[#3367d6] shadow-sm",
    orcid: darkMode ? "bg-[#A6CE39] text-slate-950 border-[#A6CE39] hover:bg-[#93b82f]" : "bg-[#A6CE39] text-slate-950 border-[#A6CE39] hover:bg-[#93b82f] shadow-sm",
    github: darkMode ? "bg-[#181717] text-white border-[#30363d] hover:bg-[#30363d]" : "bg-[#24292e] text-white border-[#24292e] hover:bg-[#000] shadow-sm",
    linkedin: darkMode ? "bg-[#0077b5] text-white border-[#0077b5] hover:bg-[#006097]" : "bg-[#0077b5] text-white border-[#0077b5] hover:bg-[#006097] shadow-sm",
  };
  const activeColor = colors[colorType] || (darkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-700 border-gray-200");
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-xl border flex items-center justify-center ${activeColor}`} title={label} aria-label={label}>
      {React.createElement(icon, { size: 22 })}
    </a>
  );
};

const BibtexModal = ({ content, onClose, darkMode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
    <div className={`w-full max-w-2xl p-6 rounded-xl shadow-2xl transform transition-all scale-100 ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>BibTeX</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"><ChevronRight className="rotate-45" /></button>
      </div>
      <pre className={`p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed mb-4 whitespace-pre-wrap ${darkMode ? 'bg-slate-950 text-green-400' : 'bg-gray-50 text-gray-700 border'}`}>{content}</pre>
      <div className="flex justify-end gap-3">
        <button onClick={() => { navigator.clipboard.writeText(content); onClose(); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2"><Copy size={16} /> Copy & Close</button>
      </div>
    </div>
  </div>
);

const JcrBadge = ({ zone, ifVal, darkMode }) => (
  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wide ${darkMode ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
    <span className="bg-emerald-500 text-white px-1 rounded-[3px]">{zone}</span><span>IF: {ifVal}</span>
  </div>
);

// ==========================================
// --- Academic Lineage Component ---
// ==========================================

const AcademicLineage = ({ lineage, darkMode }) => {
  return (
    <div className={`mt-5 pt-5 border-t border-dashed ${darkMode ? 'border-slate-700' : 'border-indigo-100'}`}>
      <h4 className={`text-xs font-extrabold uppercase tracking-widest mb-4 flex items-center gap-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
        <Network size={14} /> Academic Heritage（学术谱系）
      </h4>
      
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative pl-2 md:pl-0">
        {lineage.map((person, idx) => {
          const isLast = idx === lineage.length - 1;
          const isAdvisor = person.highlight && !isLast;
          
          // Define colors based on roles
          let ringColor = darkMode ? 'border-slate-600' : 'border-gray-200';
          let bgColor = darkMode ? 'bg-slate-800' : 'bg-white';
          let textColor = darkMode ? 'text-slate-400' : 'text-gray-500';
          let shadowClass = '';

          if (isAdvisor) {
            ringColor = darkMode ? 'border-indigo-500' : 'border-indigo-400';
            bgColor = darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50';
            textColor = darkMode ? 'text-indigo-300' : 'text-indigo-700';
            shadowClass = 'shadow-[0_0_10px_rgba(99,102,241,0.3)]';
          } else if (isLast) {
            ringColor = darkMode ? 'border-purple-500' : 'border-purple-400';
            bgColor = darkMode ? 'bg-purple-900/30' : 'bg-purple-50';
            textColor = darkMode ? 'text-purple-300' : 'text-purple-700';
            shadowClass = 'shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse';
          }

          return (
            <React.Fragment key={idx}>
              {/* Node */}
              <div className={`relative flex flex-col items-center group z-10 ${isLast ? 'flex-1 md:flex-none' : ''}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 ${ringColor} ${bgColor} ${shadowClass}`}>
                  <span className={`text-xs font-bold text-center leading-tight px-1 ${textColor}`}>
                    {person.name.split(' ').slice(-1)[0]}
                  </span>
                </div>
                
                <div className={`mt-2.5 text-center transition-colors duration-300 ${isAdvisor || isLast ? (darkMode ? 'text-white' : 'text-gray-900') : (darkMode ? 'text-slate-500' : 'text-gray-400')}`}>
                  <div className="text-xs font-bold whitespace-nowrap">{person.name}</div>
                  <div className={`text-[9px] opacity-80 max-w-[100px] mx-auto leading-tight mt-0.5 font-medium`}>
                    {person.title}
                  </div>
                </div>
              </div>

              {/* Connector (Arrow) */}
              {!isLast && lineage[idx+1].title !== "You" && lineage[idx+1].title !== "我" && (
                <>
                  {/* Desktop Arrow */}
                  <div className="hidden md:flex flex-1 items-center justify-center px-2">
                    <div className={`h-[3px] w-full relative rounded-full ${darkMode ? 'bg-slate-700' : 'bg-indigo-200'}`}>
                       <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 ${darkMode ? 'text-slate-500' : 'text-indigo-400'}`}>
                          <ChevronRight size={20} strokeWidth={4} />
                       </div>
                    </div>
                  </div>
                  
                  {/* Mobile Vertical Line - Enhanced */}
                  <div className={`md:hidden h-8 w-[3px] ml-[1.7rem] my-1 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-indigo-200'}`}></div>
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const GlobalVisitors = ({ syncData, darkMode, ui, lang }) => {
  const staticSnapshot = useMemo(() => getVisitorSnapshot(syncData), [syncData]);
  const [snapshot, setSnapshot] = useState(staticSnapshot);
  const [visitorMode, setVisitorMode] = useState(REALTIME_VISITOR_ENDPOINT ? 'connecting' : 'snapshot');
  const [visitorUpdatedAt, setVisitorUpdatedAt] = useState(staticSnapshot.updatedAt || syncData.generatedAt || null);
  const mapData = getRuntimeMapData();
  const viewBox = mapData?.viewBox || { width: 720, height: 330 };
  const activeCountries = getActiveVisitorCountries(snapshot, mapData);
  const routes = buildVisitorRoutes(activeCountries);
  const formattedUpdatedAt = formatVisitorUpdatedAt(visitorUpdatedAt, lang);
  const isLive = visitorMode === 'live';

  useEffect(() => {
    if (!REALTIME_VISITOR_ENDPOINT) {
      return undefined;
    }

    let cancelled = false;
    const controller = new AbortController();

    const loadSnapshot = async (action) => {
      try {
        const realtimeSnapshot = await fetchRealtimeVisitorSnapshot(action, controller.signal);
        if (!cancelled && realtimeSnapshot) {
          setSnapshot(realtimeSnapshot);
          setVisitorUpdatedAt(realtimeSnapshot.updatedAt || new Date().toISOString());
          setVisitorMode('live');
        }
      } catch {
        if (!cancelled) {
          setVisitorMode('snapshot');
        }
      }
    };

    loadSnapshot('hit');
    const intervalId = window.setInterval(() => loadSnapshot('stats'), VISITOR_REFRESH_MS);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [staticSnapshot, syncData.generatedAt]);

  return (
    <section className={`rounded-3xl border overflow-hidden shadow-xl shadow-slate-900/5 ${darkMode ? 'bg-slate-900/60 border-slate-700/70' : 'bg-white border-slate-200/80'}`} aria-labelledby="global-visitors-title">
      <div className={`px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b ${darkMode ? 'border-slate-700/70' : 'border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${darkMode ? 'bg-cyan-400/10 text-cyan-300' : 'bg-blue-50 text-blue-600'}`} aria-hidden="true">
            <MapIcon size={22} />
          </div>
          <div>
            <h2 id="global-visitors-title" className={`text-2xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-950'}`}>{ui.globalVisitors}</h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{ui.globalVisitorsDesc}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`visitor-sync-badge ${darkMode ? 'visitor-sync-badge--dark' : ''} ${isLive ? 'visitor-sync-badge--live' : ''}`}>
                <span aria-hidden="true" />
                {isLive ? ui.visitorLive : ui.visitorSnapshot}
              </span>
              {formattedUpdatedAt && (
                <span className={`text-[0.72rem] font-semibold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {ui.visitorUpdated} {formattedUpdatedAt}
                </span>
              )}
            </div>
          </div>
        </div>
        <a href={VISITOR_STATS_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-bold transition-colors ${darkMode ? 'border-slate-600 text-slate-200 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
          {ui.viewStats} <ExternalLink size={13} className="ml-1.5" />
        </a>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(16rem,0.95fr)] gap-6">
          <div>
            <h3 className={`text-xs font-extrabold uppercase tracking-widest mb-3 ${darkMode ? 'text-cyan-300' : 'text-slate-700'}`}>{ui.visitorMap}</h3>
            <a href={VISITOR_STATS_URL} target="_blank" rel="noreferrer" className={`visitor-map-frame ${darkMode ? 'visitor-map-frame--dark' : ''}`} aria-label="Open global visitor statistics">
              <div className="visitor-world-map">
                <svg className="visitor-real-map" viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} role="img" aria-label="World map visitor snapshot" focusable="false">
                  <defs>
                    <pattern id="visitor-map-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                      <path d="M42 0H0V42" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect className="visitor-map-ocean-grid" width={viewBox.width} height={viewBox.height} fill="url(#visitor-map-grid)" />
                  <path className="visitor-map-graticule" d={`M0 ${viewBox.height * .25}H${viewBox.width}M0 ${viewBox.height * .5}H${viewBox.width}M0 ${viewBox.height * .75}H${viewBox.width}M${viewBox.width / 6} 0V${viewBox.height}M${viewBox.width / 3} 0V${viewBox.height}M${viewBox.width / 2} 0V${viewBox.height}M${viewBox.width * 2 / 3} 0V${viewBox.height}M${viewBox.width * 5 / 6} 0V${viewBox.height}`} />
                  <g>
                    {(mapData?.countries || []).map((country, index) => (
                      <path key={`${country.id || 'country'}-${country.name}-${index}`} className="visitor-map-country" d={country.d}>
                        <title>{country.name}</title>
                      </path>
                    ))}
                  </g>
                  {mapData?.borders && <path className="visitor-map-borders" d={mapData.borders} />}
                  <g>
                    {activeCountries.filter(country => country.d).map(country => (
                      <path key={country.code} className="visitor-map-country-active" d={country.d} style={{ animationDelay: `${country.delay || 0}s` }}>
                        <title>{country.name}: {country.count} visits</title>
                      </path>
                    ))}
                  </g>
                  <g>
                    {routes.map(route => <path key={route.key} className="visitor-map-route" d={route.d} />)}
                  </g>
                </svg>

                {activeCountries.map(country => {
                  const left = `${(country.x / viewBox.width * 100).toFixed(2)}%`;
                  const top = `${(country.y / viewBox.height * 100).toFixed(2)}%`;
                  return (
                    <React.Fragment key={country.code}>
                      <span className="visitor-map-region" style={{ left, top, animationDelay: `${country.delay || 0}s` }} aria-hidden="true" />
                      <span className="visitor-map-marker" style={{ left, top, animationDelay: `${country.delay || 0}s` }}>
                        <strong>{country.code}</strong><em>{country.count}</em>
                      </span>
                    </React.Fragment>
                  );
                })}

                <div className="visitor-map-label">
                  {ui.activeVisitorRegions}
                  <span>{ui.countrySignal}</span>
                </div>
                <div className="visitor-map-summary">
                  <span>{snapshot.pageviews} {ui.pageviews}</span>
                  <span>{snapshot.countries} {ui.countries}</span>
                </div>
                <img className="visitor-map-tracker" src={VISITOR_TRACKER_URL} alt="" width="1" height="1" loading="eager" decoding="async" referrerPolicy="no-referrer" aria-hidden="true" />
              </div>
            </a>
          </div>

          <div>
            <h3 className={`text-xs font-extrabold uppercase tracking-widest mb-3 ${darkMode ? 'text-cyan-300' : 'text-slate-700'}`}>{ui.topVisitorCountries}</h3>
            <a href={VISITOR_STATS_URL} target="_blank" rel="noreferrer" className={`block rounded-2xl border p-4 h-[19rem] transition-colors ${darkMode ? 'bg-slate-950/50 border-slate-700 hover:border-cyan-400/40' : 'bg-slate-50/80 border-slate-100 hover:border-blue-200'}`} aria-label="Open visitor country ranking">
              <div className="space-y-2">
                {snapshot.ranking.map(country => (
                  <div key={country.code} className={`grid grid-cols-[2.7rem_minmax(0,1fr)_2rem] items-center gap-3 rounded-xl border px-3 py-2 text-sm ${darkMode ? 'bg-slate-900/80 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'}`}>
                    <span className={darkMode ? 'font-extrabold text-cyan-300' : 'font-extrabold text-blue-600'}>{country.code}</span>
                    <span className="min-w-0 truncate font-semibold">{country.name}</span>
                    <span className={`text-right font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{country.count}</span>
                  </div>
                ))}
              </div>
            </a>
          </div>
        </div>
        <p className={`mt-5 text-center text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          {isLive ? ui.visitorNoteLive : ui.visitorNote}
        </p>
      </div>
    </section>
  );
};

// ==========================================
// --- Main App Component ---
// ==========================================

export default function AcademicProfile() {
  const [darkMode, setDarkMode] = useState(() => (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ));
  const [lang, setLang] = useState('en');
  const [activeBibtex, setActiveBibtex] = useState(null);
  const [activeSection, setActiveSection] = useState('about');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // -- Filter & Search States --
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("All");
  const [selectedVenue, setSelectedVenue] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedPaperId, setExpandedPaperId] = useState(null);
  const [visiblePubs, setVisiblePubs] = useState(5);
  const [visibleAwards, setVisibleAwards] = useState(6); // Controls visibility of "Other Awards"
  const [showAllNews, setShowAllNews] = useState(false);

  const syncData = useMemo(() => getRuntimeSyncData(), []);
  const publications = useMemo(() => buildPublications(BASE_PUBLICATIONS, syncData), [syncData]);
  const content = PROFILE_DATA[lang];
  const ui = UI_COPY[lang];
  useSEO(content.meta_title, content.meta_desc, lang);
  const newsItems = useMemo(() => buildNewsItems(content.news, syncData), [content.news, syncData]);
  const visibleNewsItems = showAllNews ? newsItems : newsItems.slice(0, 6);

  const venueStats = useMemo(() => {
    const counts = {};
    publications.forEach(pub => {
      const v = pub.venue_short || 'Other';
      counts[v] = (counts[v] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([venue, count]) => ({ venue, count }));
  }, [publications]);

  const pinnedVenueNames = new Set(['IEEE TMC', 'IEEE IoTJ', 'IEEE ISIT', 'IEEE VTC-Spring']);
  const primaryVenueNames = new Set([
    ...venueStats.slice(0, 6).map(item => item.venue),
    ...venueStats.filter(item => pinnedVenueNames.has(item.venue)).map(item => item.venue),
  ]);
  const primaryVenueStats = venueStats.filter(item => primaryVenueNames.has(item.venue));
  const secondaryVenueStats = venueStats.filter(item => !primaryVenueNames.has(item.venue));

  const allKeywords = useMemo(() => {
    const keys = new Set();
    publications.forEach(p => p.keywords?.forEach(k => keys.add(k)));
    return ["All", ...Array.from(keys).sort()];
  }, [publications]);

  const { featuredPubs, otherPubs } = useMemo(() => {
    let filtered = [...publications];
    filtered.sort((a, b) => {
      if (sortOrder === "newest") return b.year - a.year;
      return a.year - b.year;
    });
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => [
        p.title,
        p.authors,
        p.venue,
        p.venue_short,
      ].filter(Boolean).some(value => value.toLowerCase().includes(q)));
    }
    if (selectedKeyword !== "All") {
      filtered = filtered.filter(p => p.keywords?.includes(selectedKeyword));
    }
    if (selectedVenue !== "All") {
      filtered = filtered.filter(p => p.venue_short === selectedVenue);
    }
    const featured = filtered.filter(p => p.featured);
    const others = filtered.filter(p => !p.featured);
    return { featuredPubs: featured, otherPubs: others };
  }, [publications, searchQuery, selectedKeyword, selectedVenue, sortOrder]);

  const { featuredAwards, otherAwards } = useMemo(() => {
    return {
      featuredAwards: content.awards.filter(a => a.featured),
      otherAwards: content.awards.filter(a => !a.featured)
    };
  }, [content.awards]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      const sections = Object.keys(content.nav);
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) current = section;
        }
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content.nav]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const resetPublicationView = () => {
    setVisiblePubs(5);
    setExpandedPaperId(null);
  };
  const updateSearchQuery = (value) => {
    setSearchQuery(value);
    resetPublicationView();
  };
  const updateSelectedVenue = (value) => {
    setSelectedVenue(value);
    resetPublicationView();
  };
  const updateSelectedKeyword = (value) => {
    setSelectedKeyword(value);
    resetPublicationView();
  };
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
    resetPublicationView();
  };

  const PublicationCard = ({ pub, isFeatured }) => {
    const isExpanded = expandedPaperId === pub.id;
    const primaryHref = pub.url || pub.links?.pdf || pub.links?.arxiv || null;

    const toggleExpand = () => {
      setExpandedPaperId(isExpanded ? null : pub.id);
    };

    return (
      <article
        className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden
          ${isFeatured 
            ? (darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500/30 shadow-lg shadow-amber-900/10' : 'bg-gradient-to-br from-white to-amber-50/30 border-amber-200 shadow-lg shadow-amber-100') 
            : (darkMode ? 'bg-slate-800/40 border-slate-700/50 hover:border-purple-500/30' : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-md')
          }`}
      >
        {/* Hover Indicator Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
           <ExternalLink size={16} className={darkMode ? 'text-slate-400' : 'text-slate-400'} />
        </div>

        {isFeatured && (
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-sm">
            <Star size={10} fill="currentColor" /> {ui.selected}
          </div>
        )}
        <div className="p-5 flex flex-col md:flex-row gap-5">
          {pub.image && (
            <div className="shrink-0 w-full md:w-48 h-32 rounded-xl overflow-hidden border dark:border-slate-700 shadow-sm hidden md:block relative">
              <img src={pub.image} alt={`${pub.title} visual summary`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          )}
          <div className="flex-1 min-w-0">
             <div className="flex justify-between items-start gap-4">
                <h3 className={`text-lg font-bold leading-snug mb-2 group-hover:underline decoration-2 underline-offset-2 ${darkMode ? 'text-slate-100 group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>
                  {primaryHref ? (
                    <a href={primaryHref} target="_blank" rel="noreferrer" title={ui.openArticle}>
                      {pub.title}
                    </a>
                  ) : pub.title}
                </h3>
                
                {/* Expansion Arrow - Clickable Area */}
                <button
                  type="button"
                  className={`shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 z-20 ${isExpanded ? 'rotate-180' : ''}`}
                  onClick={toggleExpand}
                  title={isExpanded ? ui.collapseAbstract : ui.expandAbstract}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? ui.collapseAbstract : ui.expandAbstract}
                >
                  <ChevronDown size={20} className="opacity-50 hover:opacity-100" />
                </button>
             </div>
             <div className={`text-sm mb-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {pub.authors.split(',').map((author, i, arr) => (
                  <span key={i}>
                    {author.includes(lang === 'en' ? 'Aimin Li' : '李爱民') 
                      ? <strong className={darkMode ? 'text-slate-200 underline decoration-purple-500/50' : 'text-gray-900 underline decoration-purple-500/30'}>{author.trim()}</strong> 
                      : author.trim()}
                    {i < arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
             </div>
             <div className="flex flex-wrap items-center gap-y-2 gap-x-3 mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md border ${darkMode ? 'bg-slate-700/50 border-slate-600 text-slate-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                      {pub.venue_short}
                    </span>
                    <span className={`text-xs font-medium italic ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                       {pub.venue}
                    </span>
                </div>
                {pub.jcr && <JcrBadge zone={pub.jcr} ifVal={pub.if} darkMode={darkMode} />}
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-opacity-10 ${darkMode ? 'bg-white text-slate-400' : 'bg-black text-gray-500'}`}>{pub.year}</span>
             </div>
             {pub.summary && (
                <div className={`text-sm italic mb-3 pl-3 border-l-2 ${darkMode ? 'text-slate-400 border-slate-600' : 'text-slate-500 border-purple-200'}`}>
                  "{pub.summary}"
                </div>
             )}
             {pub.keywords && (
               <div className="flex gap-2 mb-3">
                 {pub.keywords.slice(0,3).map((k,i) => (
                   <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded border ${darkMode ? 'border-slate-700 text-slate-500' : 'border-gray-100 text-gray-400 bg-gray-50'}`}>#{k}</span>
                 ))}
               </div>
             )}
             <div className="flex gap-3 mt-auto pt-2">
               {pub.links?.pdf && <ActionButton icon={FileText} label="PDF" href={pub.links.pdf} type="pdf" darkMode={darkMode} />}
               {pub.url && <ActionButton icon={ExternalLink} label="Link" href={pub.url} type="external" darkMode={darkMode} />}
               {pub.links?.code && <ActionButton icon={Github} label="Code" href={pub.links.code} type="code" darkMode={darkMode} />}
               <ActionButton icon={Quote} label="Cite" onClick={() => setActiveBibtex(generateBibtex(pub))} type="bibtex" darkMode={darkMode} />
             </div>
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 border-t dark:border-slate-700' : 'max-h-0 opacity-0'}`}>
          <div className={`p-5 text-sm leading-relaxed ${darkMode ? 'bg-slate-900/50 text-slate-300' : 'bg-gray-50 text-slate-700'}`}>
            <h4 className="font-bold mb-2 text-xs uppercase tracking-wider opacity-70">{ui.abstract}</h4>
            <p>{pub.abstract || ui.noAbstract}</p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-purple-500/30 ${darkMode ? 'bg-[#0b1121] text-slate-300' : 'bg-gray-50 text-slate-600'}`}>
      
      {/* --- Navigation --- */}
      <div className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className={`text-xl font-extrabold tracking-tight flex items-center gap-2 cursor-pointer ${darkMode ? 'text-white' : 'text-gray-900'}`} onClick={scrollToTop}>
            <Sparkles size={18} className="text-purple-500" />{content.name}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {Object.entries(content.nav).map(([key, label]) => (
                <a key={key} href={`#${key}`} className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${activeSection === key ? (darkMode ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-700') : (darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50')}`}>{label}</a>
              ))}
            </div>
            <button 
              onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')} 
              className={`hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full transition-all font-bold text-sm border shadow-sm hover:shadow ${darkMode ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-200'}`}
              title={lang === 'en' ? "切换为中文" : "Switch to English"}
            >
              <Languages size={16} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
              <span>{lang === 'en' ? 'EN / 中' : '中 / EN'}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-gray-100 text-slate-600'}`}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`lg:hidden p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-slate-600'}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden absolute top-16 left-0 w-full border-b shadow-lg px-4 py-4 flex flex-col gap-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            {Object.entries(content.nav).map(([key, label]) => (
              <a 
                key={key} 
                href={`#${key}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === key ? (darkMode ? 'bg-white/10 text-white' : 'bg-purple-50 text-purple-700') : (darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50')}`}
              >
                {label}
              </a>
            ))}
            <button 
              onClick={() => { setLang(l => l === 'en' ? 'zh' : 'en'); setIsMobileMenuOpen(false); }} 
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all mt-2 border ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
            >
              <Languages size={16} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
              <span>{lang === 'en' ? '切换为中文' : 'Switch to English'}</span>
            </button>
          </div>
        )}
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* --- Hero Section --- */}
        <section id="about" className="grid md:grid-cols-12 gap-12 items-start scroll-mt-32 animate-fade-in-up">
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center text-center md:text-left md:items-start space-y-6">
            <div className="relative group w-48 h-48 mx-auto md:mx-0">
              <div className={`absolute -inset-1 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 ${darkMode ? 'bg-gradient-to-tr from-purple-500 via-pink-500 to-emerald-500' : 'bg-gradient-to-tr from-purple-400 to-emerald-300'}`}></div>
              <div className={`relative w-full h-full rounded-full overflow-hidden border-[3px] shadow-2xl ${darkMode ? 'border-slate-800' : 'border-white'}`}>
                <img src={`/images/profile.jpg`} alt="Profile" className="w-full h-full object-cover bg-slate-100" />
              </div>
            </div>
            <div className="w-full flex flex-wrap justify-center md:justify-start gap-3">
               <SocialButton icon={Mail} href={content.social.email} label="Email" colorType="email" darkMode={darkMode} />
               <SocialButton icon={GoogleScholarIcon} href={content.social.scholar} label="Google Scholar" colorType="scholar" darkMode={darkMode} />
               <SocialButton icon={OrcidIcon} href={content.social.orcid} label="ORCID" colorType="orcid" darkMode={darkMode} />
               <SocialButton icon={Github} href={content.social.github} label="GitHub" colorType="github" darkMode={darkMode} />
               <SocialButton icon={Linkedin} href={content.social.linkedin} label="LinkedIn" colorType="linkedin" darkMode={darkMode} />
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-9 space-y-8">
              <div>
                <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-white to-slate-400' : 'from-gray-900 to-slate-600'}`}>{content.name}</h1>
                <div className={`text-xl md:text-2xl font-medium mb-6 flex flex-wrap items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{content.role} <span className="opacity-30 font-light">|</span> <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{content.org}</span></div>
                <div className={`prose prose-lg max-w-none leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}><p><HighlightText text={content.bio} darkMode={darkMode} /></p></div>
              </div>
              
              <div id="news" className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                 <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                   <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span></span>
                   {content.nav.news}
                 </h3>
                 <div className={`divide-y ${darkMode ? 'divide-slate-700/60' : 'divide-gray-100'}`}>
                   {visibleNewsItems.map((item, idx) => (
                     <div key={`${item.date}-${item.label}-${idx}`} className="grid grid-cols-[4.35rem_4.2rem_minmax(0,1fr)] gap-x-2 gap-y-0.5 py-1.5 text-[11px] leading-snug items-start">
                        <span className="font-mono text-[10px] leading-5 font-semibold opacity-50 whitespace-nowrap shrink-0">{item.date}</span>
                        <div className="contents">
                             <span className={`inline-flex items-center justify-center w-full text-center text-[9px] leading-4 font-bold px-1.5 py-0.5 rounded-full shrink-0 whitespace-nowrap ${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>{item.label}</span>
                             {item.link ? (
                               <a href={item.link} target={item.link.startsWith('#') ? "_self" : "_blank"} rel="noreferrer" title={stripHtml(item.content)} className={`min-w-0 hover:underline decoration-1 underline-offset-2 inline-flex items-start gap-1 group ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}>
                                  <span className="block min-w-0 whitespace-normal break-words" dangerouslySetInnerHTML={{__html: item.content}} />
                                  {!item.link.startsWith('#') && <ExternalLink size={9} className="mt-0.5 opacity-50 group-hover:opacity-100 shrink-0" />}
                               </a>
                             ) : (
                               <span className="block min-w-0 whitespace-normal break-words" title={stripHtml(item.content)} dangerouslySetInnerHTML={{__html: item.content}} />
                             )}
                        </div>
                     </div>
                   ))}
                 </div>
                 {newsItems.length > 6 && (
                   <div className="pt-2 flex justify-end">
                     <button onClick={() => setShowAllNews(value => !value)} className={`inline-flex items-center gap-1.5 text-[10px] font-bold rounded-full px-2.5 py-1 transition-colors ${darkMode ? 'text-purple-300 hover:bg-purple-500/10' : 'text-purple-700 hover:bg-purple-50'}`}>
                       {showAllNews ? ui.fewerNews : ui.moreNews} <ChevronDown size={12} className={showAllNews ? 'rotate-180' : ''} />
                     </button>
                   </div>
                 )}
              </div>
          </div>
        </section>

        {/* --- Timeline Section (Optimized) --- */}
        <section id="timeline" className="scroll-mt-32">
           <div className="flex items-center gap-3 mb-8">
            <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}><Plane size={20} /></div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.timeline}</h2>
          </div>
          
          <div className="relative px-2">
             {/* Vertical Gradient Line */}
             <div className={`absolute left-8 md:left-1/2 top-2 bottom-2 w-[2px] transform md:-translate-x-1/2 bg-gradient-to-b ${darkMode ? 'from-indigo-500 via-purple-500 to-slate-800' : 'from-indigo-400 via-purple-400 to-gray-200'}`}></div>

             <div className="space-y-6">
                {content.timeline.map((item, idx) => {
                   const isWork = item.type === 'work';
                   
                   return (
                     <div key={idx} className={`relative flex flex-col md:flex-row group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Center Node */}
                        <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 mt-6 transition-all duration-300 
                           ${idx === 0 
                             ? (darkMode ? 'bg-indigo-500 border-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.6)] scale-125' : 'bg-indigo-500 border-indigo-200 shadow-md scale-125') 
                             : (darkMode ? 'bg-slate-900 border-slate-500 group-hover:border-indigo-400 group-hover:scale-110' : 'bg-white border-gray-400 group-hover:border-indigo-500 group-hover:scale-110')
                           }`}>
                        </div>

                        {/* Content Side */}
                        <div className={`md:w-1/2 pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                           <div className={`p-5 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group/card hover:-translate-y-0.5
                             ${isWork 
                                ? (darkMode ? 'border-l-purple-500 bg-slate-800/50' : 'border-l-purple-600 bg-white') 
                                : (darkMode ? 'border-l-emerald-500 bg-slate-800/50' : 'border-l-emerald-600 bg-white')}
                             ${darkMode ? 'border-slate-700/50' : 'border-gray-100'}
                           `}>
                              {/* Watermark Icon */}
                              <div className={`absolute -right-4 -bottom-4 opacity-5 transform -rotate-12 group-hover/card:scale-110 transition-transform duration-500 ${darkMode ? 'text-white' : 'text-black'}`}>
                                  {isWork ? <Briefcase size={80} /> : <GraduationCap size={80} />}
                              </div>

                              <div className="flex flex-col gap-1.5 relative z-10">
                                 <div className="flex justify-between items-start">
                                    <span className={`font-mono text-xs font-bold tracking-tight ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.year}</span>
                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded 
                                      ${isWork 
                                        ? (darkMode ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-50 text-purple-700') 
                                        : (darkMode ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700')}
                                    `}>
                                      {isWork ? ui.experience : ui.education}
                                    </span>
                                 </div>
                                 
                                 <div>
                                   <h3 className={`text-base font-bold leading-tight ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>{item.role}</h3>
                                   <div className={`text-xs font-medium mt-0.5 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>{item.org}</div>
                                 </div>

                                 {item.desc && (
                                   <div className={`text-xs mt-1 pt-2 border-t border-dashed leading-relaxed ${darkMode ? 'border-slate-700 text-slate-400' : 'border-gray-100 text-slate-600'}`}>
                                     <HighlightText text={item.desc} darkMode={darkMode} />
                                   </div>
                                 )}

                                 {/* Academic Lineage Visualization */}
                                 {item.lineage && (
                                   <AcademicLineage lineage={item.lineage} darkMode={darkMode} />
                                 )}
                              </div>
                           </div>
                        </div>

                        {/* Context Side (Location Badge - aligned with card) */}
                        <div className={`hidden md:flex md:w-1/2 flex-col justify-center ${idx % 2 === 0 ? 'items-start pl-10' : 'items-end pr-10'}`}>
                           <div className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all 
                              ${darkMode 
                                ? 'bg-slate-800/50 border-slate-700 text-slate-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30' 
                                : 'bg-white border-gray-200 text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-200'}
                           `}>
                              <MapPin size={12} /> {item.location}
                           </div>
                        </div>
                        
                        {/* Mobile Location Badge (Absolute) */}
                        <div className="md:hidden absolute left-16 -top-2.5 z-20">
                           <div className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-600 text-indigo-300' : 'bg-white border-indigo-100 text-indigo-600'}`}>
                              <MapPin size={10} /> {item.location}
                           </div>
                        </div>

                     </div>
                   )
                })}
             </div>
          </div>
        </section>

        {/* --- Awards Section (Updated) --- */}
        <section id="awards" className="scroll-mt-32">
           <div className="flex items-center gap-4 mb-10">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600'}`}><Trophy size={24} /></div>
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.awards}</h2>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.awardsDesc}</p>
              </div>
           </div>

           {/* Featured Awards Grid */}
           <div className="mb-12">
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>
                 <Star size={14} /> {ui.selectedHonors}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                 {featuredAwards.map((award, idx) => (
                    <div key={idx} className={`relative p-6 rounded-2xl border overflow-hidden group transition-all duration-300 hover:-translate-y-1
                       ${darkMode 
                          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500/30 hover:border-amber-400/50' 
                          : 'bg-gradient-to-br from-amber-50/50 to-white border-amber-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100'}
                    `}>
                       {/* Decorative Background Icon */}
                       <Trophy className={`absolute -right-4 -bottom-4 opacity-5 transform rotate-12 group-hover:scale-110 transition-transform duration-500 ${darkMode ? 'text-amber-100' : 'text-amber-900'}`} size={120} />
                       
                       <div className="relative z-10">
                          <div className="flex justify-between items-start mb-3">
                             <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${darkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'}`}>
                                {award.year}
                             </span>
                             <span className={`text-[10px] uppercase font-bold tracking-wide px-2 py-1 rounded-full border ${darkMode ? 'border-amber-500/30 text-amber-400' : 'border-amber-200 text-amber-700 bg-white'}`}>
                                {award.level}
                             </span>
                          </div>
                          <h3 className={`text-lg font-bold mb-2 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                             {award.title}
                          </h3>
                          <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                             {award.desc}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Other Awards Compact List */}
           <div>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-60 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                 {ui.otherAwards}
              </h3>
              <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-3`}>
                 {otherAwards.slice(0, visibleAwards).map((award, idx) => (
                    <div key={idx} className={`relative flex flex-col p-5 rounded-xl border transition-all duration-300 overflow-hidden group hover:-translate-y-1
                       ${darkMode 
                          ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-amber-900/10' 
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-amber-100/50'}
                    `}>
                       {/* Watermark Icon */}
                       <div className={`absolute -right-3 -bottom-3 opacity-[0.03] transform rotate-12 group-hover:scale-110 transition-transform duration-500 ${darkMode ? 'text-white' : 'text-black'}`}>
                          <Award size={64} />
                       </div>

                       <div className="flex justify-between items-center mb-2 relative z-10">
                          <span className={`text-[10px] font-mono opacity-50 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{award.year}</span>
                          <span className={`text-[9px] uppercase font-bold tracking-wider ${darkMode ? 'text-slate-600' : 'text-gray-400'}`}>{award.level}</span>
                       </div>
                       <h4 className={`text-sm font-medium leading-snug mb-1 relative z-10 ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                          {award.title}
                       </h4>
                       {award.desc && <p className={`text-xs opacity-60 line-clamp-2 relative z-10 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{award.desc}</p>}
                    </div>
                 ))}
              </div>
              
              {/* View More Button for Awards */}
              {otherAwards.length > visibleAwards && (
                <div className="flex justify-center pt-6">
                  <button 
                    onClick={() => setVisibleAwards(prev => prev + 6)}
                    className={`group flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs transition-all ${darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {ui.viewMoreAwards} <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              )}
           </div>
        </section>

        {/* --- PUBLICATIONS SECTION --- */}
        <section id="publications" className="scroll-mt-32 space-y-8">
          <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}><BookOpen size={24} /></div>
                  <div>
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.publications}</h2>
	                    <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.publicationDesc}</p>
                  </div>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} size={16} />
	                  <input type="text" placeholder={ui.searchPlaceholder} value={searchQuery} onChange={(e) => updateSearchQuery(e.target.value)} className={`pl-9 pr-4 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-700' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-300'}`} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
	                  <button onClick={toggleSortOrder} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`} title={ui.toggleSort}>
	                    <ArrowUpDown size={12} /> {sortOrder === 'newest' ? ui.newestFirst : ui.oldestFirst}
	                  </button>
	                  <div className={`w-px h-4 mx-2 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
	                  <button onClick={() => updateSelectedVenue("All")} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedVenue === "All" ? (darkMode ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-emerald-500 border-emerald-500 text-white') : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')}`}>{ui.allPapers} ({publications.length})</button>
	                  {primaryVenueStats.map((v, idx) => (
	                    <button key={idx} onClick={() => updateSelectedVenue(v.venue)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedVenue === v.venue ? (darkMode ? 'bg-purple-600 border-purple-500 text-white' : 'bg-purple-500 border-purple-500 text-white') : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')}`}>{v.venue} ({v.count})</button>
	                  ))}
                    {secondaryVenueStats.length > 0 && (
                      <select
                        value={secondaryVenueStats.some(v => v.venue === selectedVenue) ? selectedVenue : ''}
                        onChange={(event) => updateSelectedVenue(event.target.value || 'All')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border outline-none ${secondaryVenueStats.some(v => v.venue === selectedVenue) ? (darkMode ? 'bg-purple-600 border-purple-500 text-white' : 'bg-purple-500 border-purple-500 text-white') : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-200 text-gray-600')}`}
                        aria-label={ui.moreVenues}
                      >
                        <option value="">{ui.moreVenues}</option>
                        {secondaryVenueStats.map(v => (
                          <option key={v.venue} value={v.venue}>{v.venue} ({v.count})</option>
                        ))}
                      </select>
                    )}
              </div>

              <div className="flex flex-wrap gap-2 pb-4 border-b dark:border-slate-800 items-center">
                  <Filter size={14} className={`mr-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  {allKeywords.map((keyword) => (
	                    <button key={keyword} onClick={() => updateSelectedKeyword(keyword)} className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all border ${selectedKeyword === keyword ? (darkMode ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200') : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-emerald-200')}`}>{keyword}</button>
                  ))}
              </div>
          </div>

          {featuredPubs.length > 0 && (
            <div className="space-y-4 animate-fade-in">
               <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
	                 <Star size={16} /> {ui.selectedPublications}
               </h3>
               <div className="grid gap-6">
                  {featuredPubs.map(pub => <PublicationCard key={pub.id} pub={pub} isFeatured={true} />)}
               </div>
            </div>
          )}

          <div className="space-y-4">
             <div className="grid gap-6">
                {otherPubs.slice(0, visiblePubs).map(pub => <PublicationCard key={pub.id} pub={pub} isFeatured={false} />)}
             </div>
             {otherPubs.length > visiblePubs && (
                <div className="flex justify-center pt-8">
                  <button onClick={() => setVisiblePubs(prev => prev + 5)} className={`group flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105 ${darkMode ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-600 shadow-sm hover:shadow-md'}`}>
	                    {ui.viewMorePublications} ({otherPubs.length - visiblePubs} {ui.remaining}) <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
             )}
	             {otherPubs.length === 0 && featuredPubs.length === 0 && <div className="text-center py-12 opacity-50">{ui.noPapers}</div>}
          </div>
        </section>

        {/* --- SUBMITTED / PREPRINTS --- */}
        {content.submitted && content.submitted.length > 0 && (
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
        <section id="service" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}><Star size={24} /></div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.service}</h2>
          </div>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
               <div className={`rounded-3xl p-8 border h-full ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 shadow-lg shadow-purple-500/5'}`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}><Briefcase size={16} /> Invited Reviewer（审稿人）</h4>
                <ul className="space-y-4">{content.service.reviewer.map((item, i) => (<li key={i} className={`flex items-start gap-3 text-sm group ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}><div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${darkMode ? 'bg-slate-600 group-hover:bg-purple-400' : 'bg-gray-300 group-hover:bg-purple-500'}`}></div><span className="leading-relaxed">{item}</span></li>))}</ul>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
               <div className={`rounded-3xl p-8 border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 shadow-lg shadow-emerald-500/5'}`}>
                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}><Mic2 size={16} /> Session Chair（分会主席）</h4>
                  <ul className="space-y-4">{content.service.chair.map((item, i) => (<li key={i} className={`flex items-center gap-3 text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}><CheckCircle2 size={16} className={darkMode ? 'text-emerald-500' : 'text-emerald-600'} />{item}</li>))}</ul>
               </div>
               <div className={`rounded-3xl p-8 border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 shadow-lg shadow-blue-500/5'}`}>
                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}><User size={16} /> Volunteer & Service（志愿服务）</h4>
                  <ul className="space-y-3">{content.service.volunteer.map((item, i) => (<li key={i} className={`flex items-center gap-3 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}><div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>{item}</li>))}</ul>
               </div>
            </div>
          </div>
        </section>

        {/* --- Teaching Section --- */}
        <section id="teaching" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-8">
             <div className={`p-3 rounded-xl ${darkMode ? 'bg-pink-900/20 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
               <Presentation size={24} />
             </div>
             <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.teaching}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
             {content.teaching.map((item, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${darkMode ? 'bg-slate-800/30 border-slate-700 hover:border-pink-500/30' : 'bg-white border-gray-100 hover:shadow-lg hover:border-pink-200'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                         <School size={20} />
                      </div>
                      <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-600'}`}>{item.period}</span>
                   </div>
                   <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>{item.course}</h3>
                   <div className={`flex items-center gap-2 text-sm font-medium mb-3 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                      <User size={14} /> {item.role}
                   </div>
                   <p className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{item.org}</p>
                   {item.desc && <p className={`text-xs italic opacity-70 border-t pt-2 mt-2 ${darkMode ? 'border-slate-700 text-slate-500' : 'border-gray-100 text-gray-500'}`}>{item.desc}</p>}
                </div>
             ))}
          </div>
        </section>

        {/* --- Student Mentoring Section --- */}
        <section id="mentoring" className="scroll-mt-32">
          <div className={`relative overflow-hidden rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-slate-200 shadow-xl shadow-slate-900/5'}`}>
            <div className={`absolute inset-x-0 top-0 h-1 ${darkMode ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400' : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500'}`} />
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-cyan-400/10 text-cyan-300' : 'bg-cyan-50 text-cyan-700'}`}>
                  <Users size={24} />
                </div>
                <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{content.mentoring.title}</h2>
              </div>

              <div className={`grid md:grid-cols-[12rem_minmax(0,1fr)] gap-3 md:gap-6 pb-6 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                <div className={`font-extrabold leading-snug ${darkMode ? 'text-cyan-300' : 'text-slate-800'}`}>
                  {content.mentoring.leadershipLabel}
                </div>
                <p className={`text-sm md:text-[15px] leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {content.mentoring.leadership}
                </p>
              </div>

              <div className="pt-6">
                <h3 className={`text-base font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{content.mentoring.collaborationTitle}</h3>
                <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'border-slate-700 bg-slate-950/30' : 'border-slate-200 bg-slate-50/50'}`}>
                  <div className={`hidden md:grid grid-cols-[16rem_minmax(0,1fr)] gap-4 px-5 py-3 text-sm font-extrabold border-b ${darkMode ? 'border-slate-700 bg-slate-800/80 text-cyan-200' : 'border-slate-200 bg-slate-100 text-slate-800'}`}>
                    <div>{content.mentoring.columns.student}</div>
                    <div>{content.mentoring.columns.outcome}</div>
                  </div>
                  <div className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-200'}`}>
                    {content.mentoring.students.map((student) => (
                      <div key={student.name} className={`grid md:grid-cols-[16rem_minmax(0,1fr)] gap-1 md:gap-4 px-5 py-3.5 text-sm ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-white'} transition-colors`}>
                        <div className={`font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{student.name}</div>
                        <div className={`leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          <span className={`md:hidden block text-[10px] uppercase tracking-widest font-bold mb-1 ${darkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>{content.mentoring.columns.outcome}</span>
                          {student.outcome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="scroll-mt-32 mb-16">
           <div className={`rounded-3xl overflow-hidden relative border shadow-2xl ${darkMode ? 'border-slate-700' : 'border-gray-100'}`}>
              <div className={`absolute inset-0 opacity-10 ${darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}></div>
              <div className={`relative p-8 md:p-12 ${darkMode ? 'bg-slate-800/50' : 'bg-white/80 backdrop-blur-sm'}`}>
                  <div className="text-center max-w-3xl mx-auto">
                      <div className={`inline-flex p-3 rounded-2xl mb-6 ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
                         <MessageCircle size={32} />
                      </div>
                      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.contact}</h2>
                      <p className={`text-lg mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {ui.contactDesc}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-10">
                         <div className={`p-4 rounded-xl border flex items-center gap-4 ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-gray-200'}`}>
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}><MapPin size={20} /></div>
                            <div>
                               <div className={`text-xs font-bold uppercase opacity-50 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.locationLabel}</div>
                               <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>{content.location}</div>
                            </div>
                         </div>
                         <a href={content.social.email} className={`p-4 rounded-xl border flex items-center gap-4 transition-colors ${darkMode ? 'bg-slate-900/50 border-slate-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}><Mail size={20} /></div>
                            <div>
                               <div className={`text-xs font-bold uppercase opacity-50 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{ui.emailLabel}</div>
                               <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>hitliaimin AT 163.com</div>
                            </div>
                         </a>
                      </div>

                      <div className="flex flex-wrap justify-center gap-4">
                         <SocialButton icon={GoogleScholarIcon} href={content.social.scholar} label="Google Scholar" colorType="scholar" darkMode={darkMode} />
                         <SocialButton icon={OrcidIcon} href={content.social.orcid} label="ORCID" colorType="orcid" darkMode={darkMode} />
                         <SocialButton icon={Github} href={content.social.github} label="GitHub" colorType="github" darkMode={darkMode} />
                         <SocialButton icon={Linkedin} href={content.social.linkedin} label="LinkedIn" colorType="linkedin" darkMode={darkMode} />
                      </div>
                  </div>
              </div>
           </div>
        </section>

        {/* Motto Banner */}
        <div className={`mt-12 py-8 px-6 text-center relative overflow-hidden group`}>
          <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105" 
               style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  filter: darkMode ? 'brightness(0.5) grayscale(0.4)' : 'brightness(1.1) grayscale(0.2)'
               }}
          ></div>
          <div className={`absolute inset-0 z-0 ${darkMode ? 'bg-slate-900/60' : 'bg-white/60'}`}></div>
          <div className="relative z-10">
            <Quote size={18} className={`mx-auto mb-3 opacity-60 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
            <h2 className={`text-xl md:text-2xl font-serif italic tracking-wide leading-relaxed drop-shadow-sm ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              复杂之中见秩序，纷乱之处寻真相
            </h2>
            <p className={`mt-2 text-[10px] font-sans uppercase tracking-[0.3em] opacity-70 font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Order in complexity, truth in chaos
            </p>
          </div>
        </div>

        <GlobalVisitors syncData={syncData} darkMode={darkMode} ui={ui} lang={lang} />

        {/* Footer */}
        <footer className={`pt-12 pb-8 border-t text-center text-sm ${darkMode ? 'border-slate-800 text-slate-600' : 'border-gray-100 text-gray-400'}`}>
          <p>&copy; {new Date().getFullYear()} {content.name}. All rights reserved.</p>
        </footer>

      </main>
      
      {activeBibtex && <BibtexModal content={activeBibtex} onClose={() => setActiveBibtex(null)} darkMode={darkMode} />}
      
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 transform ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-white text-purple-600 hover:bg-purple-50 border border-purple-100'}`}>
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
