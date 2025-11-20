import React, { useState, useEffect, useMemo } from 'react';
import { 
  Moon, Sun, Globe, MapPin, Mail, Linkedin, 
  Github, GraduationCap, Briefcase, FileText, 
  Award, ExternalLink, BookOpen, ChevronRight,
  Download, Play, Youtube, Copy, BarChart2,
  Quote, Search, Filter, Star, Trophy, Video,
  School, ChevronDown, Layers, User, Users,
  Sparkles, Medal, Calendar, Mic2, CheckCircle2,
  Map
} from 'lucide-react';

// ==========================================
// --- 自定义图标组件 (Custom Icons) ---
// ==========================================

const ResearchGateIcon = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.586 0c-8.14 0-13.613 5.283-13.613 11.81V24H0v-6.933h3.26V11.81C3.26 5.284 8.733 0 16.873 0h2.713v3.787h-2.713c-4.393 0-7.16 2.6-7.16 6.427V24h6.18v-7.667h3.627l3.033 7.667H24l-3.26-8.2c2.487-1.133 3.96-3.64 3.96-6.393C24.7 4.3 22.673 0 19.586 0zM16.287 9.567h-4.127v-1.94h4.127c1.44 0 2.34.747 2.34 1.94 0 1.193-.9 1.94-2.34 1.94z"/>
  </svg>
);

const OrcidIcon = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.306v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>
  </svg>
);

// ==========================================
// --- 数据层 (Data Layer) ---
// ==========================================

const PUBLICATIONS = [
  // --- First Author ---
  {
    id: "f1",
    year: 2025,
    title: "Unified Upper Bounds on the ML decoding Error Probability of Spinal Codes over Fading Channels",
    authors: "Aimin Li, Xiaomeng Chen, Shaohua Wu, Gary C.F. Lee, Sumei Sun",
    venue: "IEEE Transactions on Wireless Communications",
    venue_short: "IEEE TWC",
    type: "Journal",
    if: "8.9",
    jcr: "Q1",
    tag: "First Author",
    links: { 
      pdf: "#", 
      code: "https://github.com/aiminli-hi/spinal-codes",
      slides: "#"
    }
  },
  {
    id: "f2",
    year: 2025,
    title: "Error Floor of Spinal Codes under ML Decoding",
    authors: "Aimin Li, Shaohua Wu, Sumei Sun",
    venue: "IEEE Transactions on Vehicular Technology",
    venue_short: "IEEE TVT",
    type: "Journal",
    if: "6.1",
    jcr: "Q1",
    tag: "First Author",
    links: { pdf: "#", slides: "#" }
  },
  {
    id: "f3",
    year: 2025,
    title: "From Freshness to Effectiveness: Goal-Oriented Sampling for Remote Decision Making",
    authors: "Aimin Li, Shaohua Wu, Gary C.F. Lee, Sumei Sun",
    venue: "IEEE Transactions on Information Theory (Submitted)",
    venue_short: "IEEE TIT",
    type: "Journal",
    tag: "First Author",
    links: { pdf: "#" }
  },
  {
    id: "f4",
    year: 2024,
    title: "Goal-Oriented Tensor: Beyond Age of Information Towards Semantics-Empowered Goal-Oriented Communications",
    authors: "Aimin Li, Shaohua Wu, Sumei Sun, Jie Cao",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "7.2",
    jcr: "Q1",
    tag: "First Author",
    links: { pdf: "#" }
  },
  {
    id: "f5",
    year: 2024,
    title: "Toward Goal-Orientated Semantic Communications: New Metrics, Framework, and Open Challenges",
    authors: "Aimin Li, Shaohua Wu, Siqi Meng, Rongxing Lu, Sumei Sun, Qinyu Zhang",
    venue: "IEEE Wireless Communications",
    venue_short: "IEEE WCM",
    type: "Journal",
    if: "10.9",
    jcr: "Q1",
    tag: "Featured",
    image: "https://placehold.co/600x350/1e293b/64748b?text=Semantic+Comm+Framework",
    links: { pdf: "#" }
  },
  {
    id: "f6",
    year: 2024,
    title: "Tight Upper Bounds on the BLER of Spinal codes over the AWGN Channel",
    authors: "Aimin Li, Shaohua Wu, Xiaomeng Chen, Sumei Sun",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "7.2",
    jcr: "Q1",
    tag: "First Author",
    links: { pdf: "#" }
  },
  {
    id: "f7",
    year: 2024,
    title: "Sampling to Achieve the Goal: An Age-aware Remote Markov Decision Process",
    authors: "Aimin Li, Shaohua Wu, Gary C.F. Lee, Xiaomeng Chen, Sumei Sun",
    venue: "IEEE Information Theory Workshop (ITW)",
    venue_short: "IEEE ITW",
    type: "Conference",
    tag: "First Author",
    links: { pdf: "#", slides: "#", code: "#" }
  },
  {
    id: "f8",
    year: 2024,
    title: "Goal-oriented Tensor: Beyond AoI Towards Semantics-Empowered Goal-Oriented Communications",
    authors: "Aimin Li, Shaohua Wu, Sumei Sun",
    venue: "IEEE Wireless Communications and Networking Conference (WCNC)",
    venue_short: "IEEE WCNC",
    type: "Conference",
    tag: "First Author",
    links: { pdf: "#", slides: "#" }
  },
  {
    id: "f9",
    year: 2022,
    title: "Age of information with Hybrid-ARQ: A unified explicit result",
    authors: "Aimin Li, Shaohua Wu, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "7.2",
    jcr: "Q1",
    tag: "First Author",
    links: { pdf: "#" }
  },
  {
    id: "f10",
    year: 2022,
    title: "Analyzing Age Performance of Hybrid-ARQ: A Unified Explicit Result",
    authors: "Aimin Li, Shaohua Wu, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Global Communications Conference (Globecom)",
    venue_short: "IEEE Globecom",
    type: "Conference",
    tag: "First Author",
    links: { pdf: "#" }
  },
  {
    id: "f11",
    year: 2021,
    title: "Spinal Codes Over Fading Channel: Error Probability Analysis and Encoding Structure Improvement",
    authors: "Aimin Li, Shaohua Wu, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Wireless Communications",
    venue_short: "IEEE TWC",
    type: "Journal",
    if: "8.9",
    jcr: "Q1",
    tag: "First Author",
    links: { pdf: "#" }
  },
  {
    id: "f12",
    year: 2020,
    title: "Spinal Codes over BSC: Error Probability Analysis and the Puncturing Design",
    authors: "Aimin Li, Shaohua Wu, Ying Wang, Jian Jiao, Qinyu Zhang",
    venue: "IEEE VTC-Spring",
    venue_short: "IEEE VTC",
    type: "Conference",
    tag: "First Author",
    links: { pdf: "#" }
  },
   
  // --- Collaborative ---
  {
    id: "c1",
    year: 2023,
    title: "Towards Goal-Oriented Semantic Communications: AoII Analysis of Coded Status Update System Under FBL Regime",
    authors: "Siqi Meng, Shaohua Wu, Aimin Li, Qinyu Zhang",
    venue: "IEEE Journal on Selected Areas of Information Theory",
    venue_short: "IEEE JSAIT",
    type: "Journal",
    tag: "Co-Author",
    links: { pdf: "#" }
  },
  {
    id: "c2",
    year: 2023,
    title: "Tight Upper Bounds on the Error Probability of Spinal Codes over Fading Channels",
    authors: "Xiaomeng Chen, Aimin Li (Co-first), Shaohua Wu",
    venue: "IEEE International Symposium on Information Theory (ISIT)",
    venue_short: "IEEE ISIT",
    type: "Conference",
    tag: "Co-First Author",
    links: { pdf: "#" }
  },
  {
    id: "c3",
    year: 2022,
    title: "Minimizing age-of-information in HARQ-CC aided NOMA systems",
    authors: "Shaohua Wu, Zhihong Deng, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Wireless Communications",
    venue_short: "IEEE TWC",
    type: "Journal",
    if: "8.9",
    jcr: "Q1",
    tag: "Co-Author",
    links: { pdf: "#" }
  },
  {
    id: "c4",
    year: 2022,
    title: "Analysis and optimization of the HARQ-based spinal coded timely status update system",
    authors: "Siqi Meng, Shaohua Wu, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "7.2",
    jcr: "Q1",
    tag: "Co-Author",
    links: { pdf: "#" }
  },
  {
    id: "c5",
    year: 2022,
    title: "Effectiveness-Oriented SAGSIN: Unveiling a Unified Metric and a Comprehensive Framework",
    authors: "Siqi Meng, Shaohua Wu, Hanyu Wu, Aimin Li, Qinyu Zhang",
    venue: "IEEE Network Magazine",
    venue_short: "IEEE Network",
    type: "Journal",
    if: "6.8",
    jcr: "Q1",
    tag: "Co-Author",
    links: { pdf: "#" }
  },
  {
    id: "c6",
    year: 2022,
    title: "Partial Self-Concatenation Structure and Performance Analysis of Spinal Codes Over Rayleigh Fading Channel",
    authors: "Siqi Meng, Shaohua Wu, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Vehicular Technology",
    venue_short: "IEEE TVT",
    type: "Journal",
    if: "6.1",
    jcr: "Q1",
    tag: "Co-Author",
    links: { pdf: "#" }
  }
];

const DATA = {
  en: {
    meta_title: "Aimin Li | Ph.D. Candidate | HITSZ & I2R",
    meta_desc: "Academic profile of Aimin Li, Ph.D. candidate at HITSZ and Visiting Researcher at I2R, A*STAR. Researching Semantic Communications and Age of Information.",
    name: "Aimin Li (黎爱民)",
    role: "Ph.D. Candidate & Visiting Researcher",
    org: "HITSZ & I2R, A*STAR",
    org_full: "Harbin Institute of Technology, Shenzhen & I2R, A*STAR",
    bio: "I am a Ph.D. candidate at Harbin Institute of Technology, Shenzhen (HITSZ), advised by Prof. Shaohua Wu. Currently, I am also a Visiting Researcher at Institute for Infocomm Research (I2R), A*STAR, Singapore, working with Prof. Sumei Sun. My research focuses on **Semantic Communications**, **Age of Information (AoI)**, and **Goal-oriented Communications**.",
    location: "Shenzhen, China / Singapore",
    email: "liaiminmail@gmail.com",
    social: {
      scholar: "https://scholar.google.com/citations?user=nyl1-EMAAAAJ&hl=en",
      github: "https://github.com/aiminli-hi",
      linkedin: "https://linkedin.com", 
      researchgate: "https://www.researchgate.net/", 
      orcid: "https://orcid.org/", 
      email: "mailto:liaiminmail@gmail.com"
    },
    nav: {
      about: "About",
      news: "News",
      timeline: "Timeline",
      awards: "Honors",
      publications: "Publications",
      service: "Academic Service" 
    },
    news: [
      { date: "2024-11", content: "Won the **3rd Prize** in IEEE Globecom 4MT Thesis Competition." },
      { date: "2024-05", content: "Paper on Semantic Comm accepted by **IEEE Wireless Communications**." },
      { date: "2024-01", content: "Selected as Candidate for NSFC Youth Project (Only 1 in EE Dept)." }
    ],
    timeline: [
      {
        year: "2023.10 - 2024.10",
        role: "Visiting Researcher",
        org: "Institute for Infocomm Research (I2R), A*STAR, Singapore",
        desc: "Supervisor: [Prof. Sumei Sun](https://www.a-star.edu.sg/i2r/about-i2r/i2r-management/sun-sumei). Research on Goal-oriented Semantic Communications.",
        type: "work"
      },
      {
        year: "2020.09 - Present",
        role: "Ph.D. Candidate",
        org: "Harbin Institute of Technology, Shenzhen (HITSZ)",
        desc: "Major: Information and Communication Engineering. Advisor: Prof. Shaohua Wu. Direct Ph.D. Program. National Scholarship Recipient.",
        type: "edu"
      },
      {
        year: "2017",
        role: "Visiting Student",
        org: "University of California, Riverside (UCR), USA",
        desc: "International exchange program.",
        type: "edu"
      },
      {
        year: "2016.09 - 2020.06",
        role: "B.Eng. in Communication Engineering",
        org: "Harbin Institute of Technology, Shenzhen (HITSZ)",
        desc: "GPA Top 1% (Highest Honor). Best Thesis Award.",
        type: "edu"
      }
    ],
    awards: [
      { year: "2024", title: "IEEE Globecom 4MT Thesis Competition (3rd Prize)", desc: "Rank 5 of 15 Final Round Competitors Worldwide", level: "Global" },
      { year: "2024", title: "IEEE Globecom Travel Grant", desc: "Top 15 Ph.D. Students Worldwide", level: "Global" },
      { year: "2024", title: "National Scholarship of China", desc: "Highest Honor, Top 0.2% Ph.D. students nationwide", level: "National" },
      { year: "2024", title: "Candidate for NSFC Youth Project", desc: "One of <600 PhD Students in China", level: "National" },
      { year: "2023", title: "Chinese Government Scholarship (CSC)", desc: "National-level scholarship", level: "National" },
      { year: "2023", title: "HITSZ ''Idea'' Research Student Program", desc: "Only 1 Ph.D. Student in EE Department", level: "University" },
      { year: "2020", title: "Special Merit Doctoral Scholarship", desc: "Awarded by University President (Only 1 in HITSZ)", level: "University" },
      { year: "2020", title: "National Scholarship of China", desc: "Top 0.2% nationwide", level: "National" },
      { year: "2020", title: "Best Thesis Award of HIT", desc: "Top 2 Students in EE Dept", level: "University" },
      { year: "2017", title: "First Prize of Chinese College Student Math Competition", desc: "National Level", level: "National" }
    ],
    service: {
      reviewer: [
        "IEEE Transactions on Information Theory (TIT)",
        "IEEE Journal on Selected Areas in Communications (JSAC)",
        "IEEE Transactions on Wireless Communications (TWC)",
        "IEEE Transactions on Communications (TCOM)",
        "IEEE Transactions on Vehicular Technology (TVT)",
        "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)",
        "IEEE International Symposium on Information Theory (ISIT)",
        "IEEE Communications Letters (CL)"
      ],
      chair: [
        "Session Chair, IEEE Globecom 2023",
        "Session Chair, IEEE VTC-Spring 2022"
      ],
      volunteer: [
        "IEEE VTC-Spring 2024 Singapore", 
        "IEEE 6G Summit Singapore 2023", 
        "IEEE 6G Summit Singapore 2024"
      ]
    },
    publications: PUBLICATIONS
  },
  zh: {
    meta_title: "黎爱民 | 博士研究生 | 哈工大(深圳) & 新加坡I2R",
    meta_desc: "黎爱民的个人学术主页。哈尔滨工业大学（深圳）博士研究生，新加坡资讯通信研究院访问研究员。研究方向：语义通信，信息年龄，目标导向通信。",
    name: "黎爱民",
    role: "博士研究生 & 访问研究员",
    org: "哈尔滨工业大学（深圳）& 新加坡 I2R, A*STAR",
    org_full: "哈尔滨工业大学（深圳） & 新加坡资讯通信研究院",
    bio: "我是哈尔滨工业大学（深圳）的博士研究生，师从吴绍华教授。目前我也是新加坡 A*STAR I2R 的访问研究员，合作导师是 Sumei Sun 教授。我的研究兴趣主要包括 **语义通信**、**信息年龄 (AoI)** 以及 **目标导向通信**。",
    location: "中国深圳 / 新加坡",
    email: "liaiminmail@gmail.com",
    social: {
      scholar: "https://scholar.google.com/citations?user=nyl1-EMAAAAJ&hl=zh-CN",
      github: "https://github.com/aiminli-hi",
      linkedin: "https://linkedin.com",
      researchgate: "https://www.researchgate.net/",
      orcid: "https://orcid.org/",
      email: "mailto:liaiminmail@gmail.com"
    },
    nav: {
      about: "关于我",
      news: "最新动态",
      timeline: "个人履历",
      awards: "荣誉奖项",
      publications: "发表论文",
      service: "学术服务" 
    },
    news: [
      { date: "2024-11", content: "获得 IEEE Globecom 4MT 论文竞赛 **三等奖**。" },
      { date: "2024-05", content: "一篇关于语义通信的论文被 **IEEE Wireless Communications** 录用。" },
      { date: "2024-01", content: "入选国家自然科学基金青年学生基础研究项目（电子系仅1人）。" }
    ],
    timeline: [
      {
        year: "2023.10 - 2024.10",
        role: "访问研究员 (Visiting Researcher)",
        org: "新加坡资讯通信研究院 (I2R), A*STAR",
        // UPDATED: Added Markdown-style link for Chinese
        desc: "导师：[Sumei Sun 教授](https://www.a-star.edu.sg/i2r/about-i2r/i2r-management/sun-sumei)。研究方向：目标导向的语义通信。",
        type: "work"
      },
      {
        year: "2020.09 - 至今",
        role: "博士研究生",
        org: "哈尔滨工业大学（深圳）",
        desc: "专业：信息与通信工程。导师：吴绍华教授。本博连读（直博）。获得**博士研究生国家奖学金**。",
        type: "edu"
      },
      {
        year: "2017",
        role: "访问学生",
        org: "加州大学河滨分校 (UCR), 美国",
        desc: "国际交换生项目。",
        type: "edu"
      },
      {
        year: "2016.09 - 2020.06",
        role: "工学学士 (通信工程)",
        org: "哈尔滨工业大学（深圳）",
        desc: "GPA 前 1% (最高荣誉)。获得**本科生国家奖学金**、**校优秀毕业论文**。",
        type: "edu"
      }
    ],
    awards: [
      { year: "2024", title: "IEEE Globecom 4MT 论文竞赛 (三等奖)", desc: "全球决赛第 5 名", level: "International" },
      { year: "2024", title: "IEEE Globecom 旅行奖 (Travel Grant)", desc: "全球前 15 名博士生", level: "International" },
      { year: "2024", title: "博士研究生国家奖学金", desc: "教育部颁发，全国前 0.2%", level: "National" },
      { year: "2024", title: "国家自然科学基金青年学生项目候选人", desc: "全国各学科博士生少于 600 人", level: "National" },
      { year: "2023", title: "国家留学基金委 (CSC) 奖学金", desc: "国家级公派留学奖学金", level: "National" },
      { year: "2023", title: "哈工大（深圳）“艾迪”研究型人才计划", desc: "电子系唯一入选博士生", level: "University" },
      { year: "2020", title: "特等博士奖学金", desc: "校长颁发（全校仅 1 人）", level: "University" },
      { year: "2020", title: "本科生国家奖学金", desc: "全国前 0.2%", level: "National" },
      { year: "2020", title: "哈尔滨工业大学优秀毕业论文", desc: "电子系前 2 名", level: "University" },
      { year: "2017", title: "全国大学生数学竞赛一等奖", desc: "国家级", level: "National" }
    ],
    service: {
      reviewer: [
        "IEEE Transactions on Information Theory (TIT)",
        "IEEE Journal on Selected Areas in Communications (JSAC)",
        "IEEE Transactions on Wireless Communications (TWC)",
        "IEEE Transactions on Communications (TCOM)",
        "IEEE Transactions on Vehicular Technology (TVT)",
        "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)",
        "IEEE International Symposium on Information Theory (ISIT)",
        "IEEE Communications Letters (CL)"
      ],
      chair: [
        "分会主席, IEEE Globecom 2023",
        "分会主席, IEEE VTC-Spring 2022"
      ],
      volunteer: [
        "IEEE VTC-Spring 2024 Singapore", 
        "IEEE 6G Summit Singapore 2023", 
        "IEEE 6G Summit Singapore 2024"
      ]
    },
    publications: PUBLICATIONS
  }
};

// ==========================================
// --- 逻辑层 (Logic Layer) ---
// ==========================================

// Custom Hook for SEO
const useSEO = (title, description) => {
  useEffect(() => {
    document.title = title;
    
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [title, description]);
};

const generateBibtex = (pub) => {
  const year = pub.year;
  // Safe author splitting
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

// UPDATED: HighlightText now supports Markdown links [text](url)
const HighlightText = ({ text, darkMode }) => {
  if (!text) return null;
  const keywords = [
    "National Scholarship", "Best Thesis", "Highest Honor", "Top 1%", "Top 0.2%",
    "国家奖学金", "优秀毕业论文", "最高荣誉", "前 1%", "三等奖", "3rd Prize", "Best Paper"
  ];

  // Helper to process keywords within a text string
  const processKeywords = (str) => {
    const parts = str.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
    return parts.map((part, i) => 
      keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className={`font-extrabold px-1 rounded mx-0.5 inline-block transform hover:scale-105 transition-transform
          ${darkMode ? 'text-purple-300 bg-purple-900/40 border border-purple-700/50 shadow-[0_0_10px_rgba(192,132,252,0.2)]' : 'text-purple-600 bg-purple-50 border border-purple-200'}`}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // 1. Split by Markdown Link Regex: [text](url)
  // Capturing groups: group 1 is text, group 2 is url
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = text.split(linkRegex);
  
  // The split results will look like: [text_before, link_text, link_url, text_after, ...]
  const result = [];
  for (let i = 0; i < parts.length; i += 3) {
    // Process text before link (or the only text if no link)
    result.push(processKeywords(parts[i]));
    
    // If there is a link following
    if (i + 1 < parts.length) {
      const linkText = parts[i+1];
      const linkUrl = parts[i+2];
      result.push(
        <a 
          key={`link-${i}`} 
          href={linkUrl} 
          target="_blank" 
          rel="noreferrer"
          className={`font-bold underline decoration-2 underline-offset-2 transition-colors mx-1
            ${darkMode ? 'text-blue-400 decoration-blue-400/50 hover:text-blue-300' : 'text-blue-600 decoration-blue-600/30 hover:text-blue-700'}`}
        >
          {linkText}
        </a>
      );
    }
  }

  return <span>{result}</span>;
};

const ActionButton = ({ icon: Icon, label, href, onClick, type = "default", darkMode }) => {
  if (!href && !onClick) return null;
   
  const styles = {
    pdf:  darkMode ? "bg-red-900/20 text-red-400 border-red-800/50 hover:bg-red-900/40" : "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    code: darkMode ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/50 hover:bg-emerald-900/40" : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
    slides: darkMode ? "bg-purple-900/20 text-purple-400 border-purple-800/50 hover:bg-purple-900/40" : "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
    bibtex: darkMode ? "bg-blue-900/20 text-blue-400 border-blue-800/50 hover:bg-blue-900/40" : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
    default: darkMode ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white" : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50 hover:border-blue-300"
  };

  const colorClass = styles[type] || styles.default;
  const Component = href ? 'a' : 'button';
   
  return (
    <Component 
      href={href} 
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border cursor-pointer ${colorClass}`}
    >
      <Icon size={14} />
      {label}
    </Component>
  );
};

// UPDATED: SocialButton now static, no expansion, larger icon
const SocialButton = ({ icon: Icon, href, label, colorClass, darkMode }) => (
  <a 
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`group flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:shadow-md
      ${darkMode 
        ? `bg-slate-800/80 text-slate-400 border border-slate-700 ${colorClass.dark}` 
        : `bg-white text-slate-500 border border-gray-100 shadow-sm ${colorClass.light}`
      }`}
    title={label}
  >
    <Icon size={24} />
  </a>
);

// BibTeX Modal
const BibtexModal = ({ content, onClose, darkMode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
    <div className={`w-full max-w-2xl p-6 rounded-xl shadow-2xl transform transition-all scale-100 ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>BibTeX</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronRight className="rotate-45" />
        </button>
      </div>
      <pre className={`p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed mb-4 whitespace-pre-wrap ${darkMode ? 'bg-slate-950 text-green-400' : 'bg-gray-50 text-gray-700 border'}`}>
        {content}
      </pre>
      <div className="flex justify-end gap-3">
        <button 
          onClick={() => { navigator.clipboard.writeText(content); onClose(); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2"
        >
          <Copy size={16} /> Copy & Close
        </button>
      </div>
    </div>
  </div>
);

// JCR Badge Component
const JcrBadge = ({ zone, ifVal, darkMode }) => (
  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold tracking-wide
    ${darkMode ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}
  `}>
    <span className="bg-emerald-500 text-white px-1 rounded-[3px]">{zone}</span>
    <span>IF: {ifVal}</span>
  </div>
);

// ==========================================
// --- 主组件 (Main Component) ---
// ==========================================

export default function AcademicProfile() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [activeBibtex, setActiveBibtex] = useState(null);
  const [visiblePubs, setVisiblePubs] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [venueFilter, setVenueFilter] = useState("All");

  const content = DATA[lang];

  // Apply SEO
  useSEO(content.meta_title, content.meta_desc);

  // Enhanced Stats with Venue breakdown
  const pubStats = useMemo(() => {
    const journals = content.publications.filter(p => p.type === 'Journal').length;
    const conferences = content.publications.filter(p => p.type === 'Conference').length;
    const firstAuthor = content.publications.filter(p => p.tag?.includes('First') || p.tag?.includes('一作')).length;
    
    // Count per venue short name
    const venueCounts = {};
    content.publications.forEach(pub => {
      const v = pub.venue_short || 'Other';
      venueCounts[v] = (venueCounts[v] || 0) + 1;
    });

    // Sort venues by count
    const sortedVenues = Object.entries(venueCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([venue, count]) => ({ venue, count }));

    return { journals, conferences, firstAuthor, sortedVenues };
  }, [content]);

  const filteredPubs = useMemo(() => {
    return content.publications.filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pub.venue.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = venueFilter === "All" || pub.venue_short === venueFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, venueFilter, content]);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-purple-500/30 ${darkMode ? 'bg-[#0b1121] text-slate-300' : 'bg-gray-50 text-slate-600'}`}>
      
      {/* --- Navigation Bar --- */}
      <div className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Sparkles size={18} className="text-purple-500" />
            {content.name}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 mr-2">
              {Object.entries(content.nav).map(([key, label]) => (
                <a 
                  key={key} 
                  href={`#${key}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${darkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                      : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2"></div>
            <button onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-black'}`} aria-label="Switch Language">
              <Globe size={18} />
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-gray-100 text-slate-600'}`} aria-label="Toggle Dark Mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">

        {/* --- Hero Section --- */}
        <section id="about" className="grid md:grid-cols-12 gap-12 items-start scroll-mt-32 animate-fade-in-up">
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center text-center md:text-left md:items-start space-y-6">
            <div className="relative group w-48 h-48 mx-auto md:mx-0">
              <div className={`absolute -inset-1 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-slow ${darkMode ? 'bg-gradient-to-tr from-purple-500 via-pink-500 to-emerald-500' : 'bg-gradient-to-tr from-purple-400 to-emerald-300'}`}></div>
              <div className={`relative w-full h-full rounded-full overflow-hidden border-[3px] shadow-2xl ${darkMode ? 'border-slate-800' : 'border-white'}`}>
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${content.name}&backgroundColor=transparent`} 
                  alt="Profile" 
                  loading="lazy"
                  className="w-full h-full object-cover bg-slate-100"
                />
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <SocialButton 
                  icon={Mail} href={content.social.email} label="Email"
                  colorClass={{ light: "hover:bg-red-50 hover:text-red-600 hover:border-red-200", dark: "hover:bg-red-900/50 hover:text-red-400 hover:border-red-800" }} darkMode={darkMode}
                />
                <SocialButton 
                  icon={BookOpen} href={content.social.scholar} label="Scholar"
                  colorClass={{ light: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200", dark: "hover:bg-blue-900/50 hover:text-blue-400 hover:border-blue-800" }} darkMode={darkMode}
                />
                <SocialButton 
                  icon={Github} href={content.social.github} label="GitHub"
                  colorClass={{ light: "hover:bg-gray-800 hover:text-white hover:border-gray-900", dark: "hover:bg-white hover:text-black hover:border-white" }} darkMode={darkMode}
                />
                <SocialButton 
                  icon={Linkedin} href={content.social.linkedin} label="LinkedIn"
                  colorClass={{ light: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]", dark: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]" }} darkMode={darkMode}
                />
                {/* 新增 ResearchGate 按钮 */}
                <SocialButton 
                  icon={ResearchGateIcon} href={content.social.researchgate} label="ResearchGate"
                  colorClass={{ light: "hover:bg-[#00ccbb] hover:text-white hover:border-[#00ccbb]", dark: "hover:bg-[#00ccbb] hover:text-white hover:border-[#00ccbb]" }} darkMode={darkMode}
                />
                {/* 新增 ORCID 按钮 */}
                <SocialButton 
                  icon={OrcidIcon} href={content.social.orcid} label="ORCID"
                  colorClass={{ light: "hover:bg-[#a6ce39] hover:text-white hover:border-[#a6ce39]", dark: "hover:bg-[#a6ce39] hover:text-white hover:border-[#a6ce39]" }} darkMode={darkMode}
                />
              </div>

              {/* Stats removed here as requested */}
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9 space-y-10">
            <div>
              <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-white to-slate-400' : 'from-gray-900 to-slate-600'}`}>
                {content.name}
              </h1>
              <div className={`text-xl md:text-2xl font-medium mb-8 flex flex-wrap items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {content.role} <span className="opacity-30 font-light">|</span> <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{content.org}</span>
              </div>
              <div className={`prose prose-lg max-w-none leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                <p dangerouslySetInnerHTML={{__html: content.bio.replace(/\*\*(.*?)\*\*/g, `<strong class="${darkMode ? 'text-white' : 'text-gray-900'}">$1</strong>`)}}></p>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border relative overflow-hidden ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-purple-50/50 border-purple-100'}`}>
              <div className={`absolute top-0 left-0 w-1 h-full ${darkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                {content.nav.news}
              </h3>
              <div className="space-y-3">
                {content.news.map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-sm group">
                    <span className="font-mono font-semibold opacity-50 whitespace-nowrap group-hover:opacity-100 transition-opacity">{item.date}</span>
                    <span dangerouslySetInnerHTML={{__html: item.content}} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Timeline Section (Optimized Grid Layout) --- */}
        <section id="timeline" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              <Layers size={24} />
            </div>
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.timeline}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {content.timeline.map((item, idx) => (
              <div key={idx} className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col h-full
                ${darkMode 
                  ? 'bg-slate-800/30 border-slate-700 hover:bg-slate-800 hover:border-slate-600' 
                  : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200'
                }`}>
                
                {/* Header: Year Badge & Icon */}
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                     {item.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                   </div>
                   <span className={`text-xs font-mono font-bold px-2 py-1 rounded border ${darkMode ? 'border-slate-600 text-slate-300 bg-slate-800' : 'border-gray-200 text-gray-600 bg-gray-50'}`}>
                     {item.year}
                   </span>
                </div>

                {/* Content */}
                <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>
                  {item.role}
                </h3>
                <div className={`text-sm font-medium mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {item.org}
                </div>
                
                <p className={`text-sm leading-relaxed mt-auto ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                   <HighlightText text={item.desc} darkMode={darkMode} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Awards Section --- */}
        <section id="awards" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                <Trophy size={24} />
              </div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.awards}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.awards.map((award, index) => (
              <div key={index} className={`group relative p-5 rounded-2xl border transition-all duration-300
                ${darkMode 
                  ? 'bg-gradient-to-b from-slate-800/60 to-slate-800/30 border-slate-700 hover:border-amber-500/50 hover:shadow-[0_4px_20px_-4px_rgba(251,191,36,0.1)]' 
                  : 'bg-gradient-to-b from-white to-amber-50/30 border-gray-100 shadow-sm hover:border-amber-200 hover:shadow-md'
                }`}>
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                    <Award size={20} />
                  </div>
                  <span className={`text-xs font-mono font-bold opacity-50 px-2 py-1 rounded-md border ${darkMode ? 'border-slate-700 text-slate-400' : 'border-gray-200 text-gray-500'}`}>
                    {award.year}
                  </span>
                </div>
                <h3 className={`font-bold text-base leading-snug mb-2 transition-colors ${darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-gray-800 group-hover:text-amber-700'}`}>
                  {award.title}
                </h3>
                <p className={`text-xs mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {award.desc}
                </p>
                {award.level && (
                  <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                    ${darkMode ? 'border-slate-700 text-slate-500' : 'border-gray-200 text-gray-400'}`}>
                    {award.level}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- Publications Section --- */}
        <section id="publications" className="scroll-mt-32 space-y-8">
          <div className="flex flex-col gap-6 border-b pb-6 dark:border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                    <BookOpen size={24} />
                  </div>
                  <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.publications}</h2>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} size={16} />
                  <input 
                    type="text" 
                    placeholder="Search papers..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-9 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full transition-all
                      ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-700' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-300'}`} 
                  />
                </div>
              </div>
              
              {/* Stats and Venue Filter */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {/* Venue Filter Buttons */}
                  <button 
                    onClick={() => setVenueFilter("All")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                      ${venueFilter === "All" 
                        ? (darkMode ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-emerald-500 border-emerald-500 text-white')
                        : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')}`}
                  >
                    All Papers ({content.publications.length})
                  </button>
                  {pubStats.sortedVenues.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => setVenueFilter(v.venue)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                        ${venueFilter === v.venue
                          ? (darkMode ? 'bg-purple-600 border-purple-500 text-white' : 'bg-purple-500 border-purple-500 text-white')
                          : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')}`}
                    >
                      {v.venue} ({v.count})
                    </button>
                  ))}
                </div>
              </div>
          </div>

          <div className="space-y-6">
            {filteredPubs.slice(0, visiblePubs).map((pub) => (
              <div key={pub.id} className={`group flex flex-col md:flex-row gap-6 p-5 rounded-2xl border transition-all duration-300
                ${darkMode ? 'bg-slate-800/40 border-slate-800 hover:border-purple-500/30 hover:bg-slate-800/80' : 'bg-white border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200'}`}>
                
                {/* Thumbnail / Year Badge */}
                <div className="shrink-0">
                  {pub.image ? (
                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden border dark:border-slate-700 shadow-sm">
                        <img src={pub.image} alt={pub.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className={`w-full md:w-32 h-32 rounded-xl border flex flex-col items-center justify-center font-mono
                      ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-100 text-slate-500'}`}>
                      <span className="text-xs font-bold uppercase tracking-widest mb-1 text-center px-2">{pub.venue_short}</span>
                      <span className="text-2xl font-bold">{pub.year}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-lg font-bold leading-snug mb-2 break-words transition-colors ${darkMode ? 'text-gray-100 group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'}`}>
                      {pub.title}
                    </h3>
                    <div className={`text-sm mb-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {pub.authors.split(',').map((author, i, arr) => (
                          <span key={i}>
                            {author.includes(lang === 'en' ? 'Aimin Li' : '李爱民') ? <strong className={darkMode ? 'text-slate-200 underline decoration-purple-500/50 decoration-2' : 'text-gray-900 underline decoration-purple-500/30 decoration-2'}>{author.trim()}</strong> : author.trim()}
                            {i < arr.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md border ${darkMode ? 'bg-slate-700/50 border-slate-600 text-slate-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>{pub.venue}</span>
                      {pub.jcr && <JcrBadge zone={pub.jcr} ifVal={pub.if} darkMode={darkMode} />}
                      {pub.tag && (
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1
                          ${darkMode ? 'bg-purple-900/30 border-purple-800 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                          <Star size={10} /> {pub.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 mt-auto">
                    {/* UPDATED: Added conditional rendering for new link types */}
                    <ActionButton icon={FileText} label="PDF" href={pub.links.pdf} type="pdf" darkMode={darkMode} />
                    {pub.links.code && <ActionButton icon={Github} label="Code" href={pub.links.code} type="code" darkMode={darkMode} />}
                    {pub.links.slides && <ActionButton icon={Users} label="Slides" href={pub.links.slides} type="slides" darkMode={darkMode} />}
                    <ActionButton 
                      icon={Quote} 
                      label="Cite" 
                      onClick={() => setActiveBibtex(generateBibtex(pub))} 
                      type="bibtex" 
                      darkMode={darkMode} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPubs.length > visiblePubs && (
            <div className="flex justify-center pt-8">
              <button 
                onClick={() => setVisiblePubs(prev => prev + 5)}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105
                  ${darkMode ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20' : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-600 shadow-sm hover:shadow-md'}`}
              >
                View More <ChevronDown size={16} />
              </button>
            </div>
          )}
        </section>

        {/* --- Service Section (Updated Design) --- */}
        <section id="service" className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                <Star size={24} />
              </div>
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.service}</h2>
          </div>
           
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Reviewer */}
            <div className="lg:col-span-7">
               <div className={`rounded-3xl p-8 border h-full ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 shadow-lg shadow-purple-500/5'}`}>
                <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                  <Briefcase size={16} /> Invited Reviewer
                </h4>
                <ul className="space-y-4">
                  {content.service.reviewer.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm group ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${darkMode ? 'bg-slate-600 group-hover:bg-purple-400' : 'bg-gray-300 group-hover:bg-purple-500'}`}></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Chairs & Volunteers */}
            <div className="lg:col-span-5 space-y-8">
               {/* Chairs */}
               <div className={`rounded-3xl p-8 border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 shadow-lg shadow-emerald-500/5'}`}>
                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    <Mic2 size={16} /> Session Chair
                  </h4>
                  <ul className="space-y-4">
                    {content.service.chair.map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                          <CheckCircle2 size={16} className={darkMode ? 'text-emerald-500' : 'text-emerald-600'} />
                          {item}
                      </li>
                    ))}
                  </ul>
               </div>
               
               {/* Volunteer */}
               <div className={`rounded-3xl p-8 border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 shadow-lg shadow-blue-500/5'}`}>
                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    <User size={16} /> Volunteer & Service
                  </h4>
                  <ul className="space-y-3">
                    {content.service.volunteer.map((item, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
                          {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </section>

        {/* --- New Section: Contact & Map & Motto --- */}
        <section className="scroll-mt-32">
          <div className={`rounded-3xl overflow-hidden border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-gray-100 shadow-xl shadow-slate-200/50'}`}>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x dark:divide-slate-700">
                
                {/* Contact Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <MapPin className="text-red-500" /> Contact & Location
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 opacity-50 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>China Office</h4>
                      <p className={`text-lg leading-relaxed font-medium ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                        Harbin Institute of Technology (Shenzhen)<br/>
                        <span className="text-base font-normal opacity-80">518055, Shenzhen, China</span>
                      </p>
                    </div>
                     
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 opacity-50 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Singapore Office</h4>
                      <p className={`text-lg leading-relaxed font-medium ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                        I2R, A*STAR<br/>
                        <span className="text-base font-normal opacity-80">138532, Singapore</span>
                      </p>
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 opacity-50 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</h4>
                      <a href="mailto:liaiminmail@gmail.com" className={`text-lg font-medium hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        liaiminmail@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Visitor Map / Counter Section - UPDATED */}
                <div className={`relative h-80 md:h-auto min-h-[400px] flex flex-col items-center justify-center p-8 ${darkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                  {/* Simulated Map Decoration */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(${darkMode ? '#475569' : '#cbd5e1'} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  <div className="text-center relative z-10 w-full">
                    <div className={`inline-flex p-4 rounded-full mb-4 ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white shadow-md text-slate-500'}`}>
                       <Globe size={48} strokeWidth={1} />
                    </div>
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-6 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Global Visitors</h4>
                    
                    {/* ================================================================
                      访客地图集成指南 (Visitor Map Integration Guide):
                      1. 访问 https://info.flagcounter.com/ 或 https://clustrmaps.com/
                      2. 注册/获取你的代码 (Get your HTML code).
                      3. 将代码粘贴到下方对应的注释区域中 (Paste below).
                      ================================================================
                    */}
                    
                    <div className="flex flex-col items-center gap-6">
                      {/* Slot 1: FlagCounter (示例占位) - 替换 href 和 src */}
                      <div className="opacity-90 hover:opacity-100 transition-opacity">
                        <a href="https://info.flagcounter.com/YOUR_ID_HERE">
                          <img src="https://s11.flagcounter.com/count2/YOUR_ID_HERE/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/" alt="Flag Counter" className="rounded-lg shadow-sm" />
                        </a>
                      </div>

                      {/* Slot 2: ClustrMaps (示例占位) - 替换 script */}
                      {/* <div id="clustrmaps-widget" className="max-w-[200px] opacity-80 hover:opacity-100 transition-opacity">
                         <script type="text/javascript" id="clustrmaps" src="//cdn.clustrmaps.com/map_v2.js?d=YOUR_ID&cl=ffffff&w=a"></script>
                      </div> 
                      */}
                    </div>

                  </div>
                </div>
              </div>

              {/* Motto Banner (Adjusted for lower profile) */}
              <div className={`py-10 px-6 text-center border-t relative overflow-hidden
                ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-gray-50 border-gray-100'}`}>
                 <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none`} // Reduced opacity
                    style={{
                      background: `radial-gradient(circle, ${darkMode ? '#a855f7' : '#3b82f6'} 0%, transparent 70%)`
                    }}
                 ></div>
                 
                 <div className="relative z-10">
                   <Quote size={20} className={`mx-auto mb-4 opacity-30 ${darkMode ? 'text-purple-400' : 'text-slate-400'}`} /> {/* Smaller icon */}
                   <h2 className={`text-xl md:text-2xl font-serif italic tracking-wide leading-relaxed
                     ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}> {/* Smaller text size */}
                     复杂之中见秩序，纷乱之处寻真相
                   </h2>
                   <p className={`mt-3 text-xs font-sans uppercase tracking-[0.2em] opacity-30 ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}> {/* Smaller and fainter */}
                     Order in complexity, truth in chaos
                   </p>
                 </div>
              </div>

          </div>
        </section>

        {/* --- Footer --- */}
        <footer className={`pt-12 pb-8 border-t text-center text-sm ${darkMode ? 'border-slate-800 text-slate-600' : 'border-gray-100 text-gray-400'}`}>
          <p className="mb-2">&copy; {new Date().getFullYear()} {content.name}. All rights reserved.</p>
          <p className="text-xs opacity-50">Designed with React & Tailwind CSS for Academic Excellence.</p>
        </footer>
      </main>

      {activeBibtex && <BibtexModal content={activeBibtex} onClose={() => setActiveBibtex(null)} darkMode={darkMode} />}
    </div>
  );
}