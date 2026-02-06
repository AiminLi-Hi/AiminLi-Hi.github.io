import React, { useState, useEffect, useMemo } from 'react';
import { 
  Moon, Sun, Globe, MapPin, Mail, Linkedin, 
  Github, GraduationCap, Briefcase, FileText, 
  Award, ExternalLink, BookOpen, ChevronRight,
  Download, Play, Youtube, Copy, BarChart2,
  Quote, Search, Filter, Star, Trophy, Video,
  School, ChevronDown, ChevronUp, Layers, User, Users,
  Sparkles, Medal, Calendar, Mic2, CheckCircle2,
  Map, ArrowUp, Presentation, Send, Tag, Plus, ArrowUpDown,
  MessageCircle, Plane, Landmark, Network, GitCommit, Languages,
  Menu, X // Added Menu and X icons for mobile navigation
} from 'lucide-react';

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
// --- 数据配置区 (DATA Configuration) ---
// ==========================================

// Helper to generate search URL for demo purposes
const getIEEEUrl = (title) => `https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${encodeURIComponent(title)}`;

const PUBLICATIONS = [
  // --- Journal Articles (16 papers) ---
  {
    id: "j5",
    year: 2024,
    title: "Toward Goal-Oriented Semantic Communications: New Metrics, Framework, and Open Challenges",
    authors: "Aimin Li, Shaohua Wu, Siqi Meng, Rongxing Lu, Sumei Sun, Qinyu Zhang",
    venue: "IEEE Wireless Communications",
    venue_short: "IEEE WCM",
    type: "Journal",
    if: "11.5",
    jcr: "Q1",
    tag: "Featured",
    featured: true,
    summary: "Establishes a novel framework for goal-oriented semantic communications.",
    keywords: ["Semantic Comm", "6G", "Framework"],
    abstract: "Semantic communication is envisioned as a key enabler for 6G networks...",
    image: "/images/WCM.gif",
    links: { pdf: "/papers/paper1WCM.pdf" },
    url: getIEEEUrl("Toward Goal-Oriented Semantic Communications: New Metrics, Framework, and Open Challenges")
  },
  {
    id: "j1",
    year: 2025,
    title: "Unified Upper Bounds on the ML decoding Error Probability of Spinal Codes over Fading Channels",
    authors: "Aimin Li, Xiaomeng Chen, Shaohua Wu, Gary C.F. Lee, Sumei Sun",
    venue: "IEEE Transactions on Wireless Communications",
    venue_short: "IEEE TWC",
    type: "Journal",
    if: "10.7",
    jcr: "Q1",
    tag: "First Author",
    featured: true,
    image: "/images/TWCSpinal.png",
    keywords: ["Channel Coding", "Spinal Codes", "Fading Channels"],
    summary: "Derives the first unified tight upper bound for spinal codes in fading channels.",
    links: { pdf: "/papers/paper25TWC.pdf" },
    url: getIEEEUrl("Unified Upper Bounds on the ML decoding Error Probability of Spinal Codes over Fading Channels")
  },
  {
    id: "j16",
    year: 2025,
    title: "From Freshness to Effectiveness: Goal-oriented Sampling for Remote Decision Making",
    authors: "Aimin Li, Shaohua Wu, Gary Lee, Sumei Sun",
    venue: "IEEE Transactions on Information Theory",
    venue_short: "IEEE TIT",
    type: "Journal",
    tag: "First Author",
    featured: true,
    keywords: ["Age of Information", "Value of Information", "Markov Decision Process", "Remote Decision Making", "Goal-Oriented Communications", "Effective Communications"],
    summary: "Proposes an age-aware remote MDP framework and a two-stage QUICK BLP algorithm to jointly optimize sampling and decision-making under random delay and sampling constraints.",
    links: { pdf: "/papers/paper26TIT.pdf" },
    url: getIEEEUrl("From Freshness to Effectiveness: Goal-oriented Sampling for Remote Decision Making")
  },
  {
    id: "j15",
    year: 2025,
    title: "MARHLO: Hybrid task Offloading in Maritime MEC via Multi-Agent Reinforcement Learning",
    authors: "Jiahong Ning, Aimin Li, Gary C.F. Lee, Tingting Yang, Sumei Sun",
    venue: "IEEE Open Journal of the Communications Society",
    venue_short: "IEEE OJ-COMS",
    type: "Journal",
    image: "/images/MARHO.png",
    tag: "Co-Author",
    if: "6.1",
    keywords: ["MEC", "MARL", "Maritime Comm"],
    summary: "A multi-agent RL approach for efficient task offloading in maritime edge computing environments.",
    links: { pdf: "/papers/paper28OJCOM.pdf" },
    url: getIEEEUrl("MARHLO: Hybrid task Offloading in Maritime MEC via Multi-Agent Reinforcement Learning")
  },
  {
    id: "j2",
    year: 2025,
    title: "Error Floor of ML-Decoded Spinal Codes in the Finite Blocklength Regime",
    authors: "Aimin Li, Shaohua Wu, Xiaomeng Chen, Sumei Sun",
    venue: "IEEE Transactions on Vehicular Technology",
    venue_short: "IEEE TVT",
    type: "Journal",
    if: "7.1",
    jcr: "Q1",
    tag: "First Author",
    keywords: ["Spinal Codes", "Finite Blocklength"],
    summary: "Analyzes the error floor phenomenon of spinal codes and provides design guidelines to mitigate it.",
    image: "/images/Spinalcodes.gif",
    links: { pdf: "/papers/paper8TVT.pdf" },
    url: getIEEEUrl("Error Floor of ML-Decoded Spinal Codes in the Finite Blocklength Regime")
  },
  {
    id: "j3",
    year: 2025,
    title: "Information Freshness and Timeliness Analysis in The Finite Blocklength Regime for Mission-Critical Applications",
    authors: "Mingxiao Sun, Lulu Song, Di Zhang, Shaobo Jia, Aimin Li, Al-Dulaimi, Shahid Mumtaz",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "8.9",
    image: "/images/TCOM3.png",
    jcr: "Q1",
    tag: "Co-Author",
    keywords: ["AoI", "Finite Blocklength", "URLLC"],
    summary: "Joint analysis of information freshness (AoI) and timeliness (Latency) for mission-critical IoT.",
    links: { pdf: "/papers/paper23TCOM.pdf" },
    url: getIEEEUrl("Information Freshness and Timeliness Analysis in The Finite Blocklength Regime for Mission-Critical Applications")
  },
  {
    id: "j4",
    year: 2024,
    title: "Tight Upper Bounds on the BLER of Spinal codes over the AWGN Channel",
    authors: "Aimin Li, Shaohua Wu, Xiaomeng Chen, Sumei Sun",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "8.9",
    jcr: "Q1",
    tag: "First Author",
    keywords: ["Channel Coding", "AWGN"],
    summary: "Provides tight analytical bounds for Spinal codes in AWGN, facilitating low-complexity code design.",
    image: "/images/AWGNspinal.gif",
    links: { pdf: "/papers/paper7TCOM.pdf" },
    url: getIEEEUrl("Tight Upper Bounds on the BLER of Spinal codes over the AWGN Channel")
  },
  {
    id: "j6",
    year: 2024,
    title: "Goal-Oriented Tensor: Beyond Age of Information Toward Semantics-Empowered Goal-Oriented Communications",
    authors: "Aimin Li, Shaohua Wu, Sumei Sun, Jie Cao",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "8.9",
    jcr: "Q1",
    tag: "First Author",
    featured: true,
    keywords: ["Semantic Comm", "AoI", "Tensor"],
    image: "/images/TCOMGOT.gif",
    summary: "Introduces 'Goal-Oriented Tensor' to capture the multidimensional value of information.",
    links: { pdf: "/papers/paper11TCOM.pdf" },
    url: getIEEEUrl("Goal-Oriented Tensor: Beyond Age of Information Towards Semantics-Empowered Goal-Oriented Communications")
  },
  {
    id: "j7",
    year: 2024,
    title: "Effectiveness-Oriented SAGSIN: Unveiling a Unified Metric and a Comprehensive Framework",
    authors: "Siqi Meng, Shaohua Wu, Hanyu Wu, Aimin Li, Qinyu Zhang",
    venue: "IEEE Network",
    venue_short: "IEEE Network",
    type: "Journal",
    if: "6.3",
    jcr: "Q1",
    image: "/images/Network1.png",
    keywords: ["SAGIN", "Network Optimization"],
    summary: "A unified metric for Space-Air-Ground Integrated Networks focusing on communication effectiveness.",
    links: { pdf: "/papers/paper12NET.pdf" },
    url: getIEEEUrl("Effectiveness-Oriented SAGSIN: Unveiling a Unified Metric and a Comprehensive Framework")
  },
  {
    id: "j8",
    year: 2023,
    title: "Toward Goal-Oriented Semantic Communications: AoII Analysis of Coded Status Update System Under FBL Regime",
    authors: "Siqi Meng, Shaohua Wu, Aimin Li, Qinyu Zhang",
    venue: "IEEE Journal on Selected Areas of Information Theory",
    venue_short: "IEEE JSAIT",
    type: "Journal",
    image: "/images/JSAIT1.gif",
    keywords: ["AoII", "Semantic Comm", "Finite Blocklength"],
    summary: "Analysis of Age of Incorrect Information (AoII) in coded systems.",
    links: { pdf: "/papers/paper9JSAIT.pdf" },
    url: getIEEEUrl("Towards Goal-Oriented Semantic Communications: AoII Analysis of Coded Status Update System Under FBL Regime")
  },
  {
    id: "j9",
    year: 2022,
    title: "Age of Information with Hybrid-ARQ: A Unified Explicit Result",
    authors: "Aimin Li, Shaohua Wu, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "8.9",
    image: "/images/TCOMAoI.gif",
    jcr: "Q1",
    tag: "First Author",
    keywords: ["AoI", "HARQ", "Reliability"],
    summary: "Derives a closed-form expression for AoI in HARQ systems, unifying various retransmission protocols.",
    links: { pdf: "/papers/paper2TCOM.pdf" },
    url: getIEEEUrl("Age of Information with Hybrid-ARQ: A Unified Explicit Result")
  },
  {
    id: "j10",
    year: 2022,
    title: "Minimizing Age-of-Information in HARQ-CC Aided NOMA Systems",
    authors: "Shaohua Wu, Zhihong Deng, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Wireless Communications",
    venue_short: "IEEE TWC",
    type: "Journal",
    if: "8.9",
    image: "/images/TWCdeng1.gif",
    jcr: "Q1",
    keywords: ["AoI", "NOMA", "HARQ"],
    summary: "Optimizes AoI in NOMA systems with HARQ-CC.",
    links: { pdf: "/papers/paper3TWC.pdf" },
    url: getIEEEUrl("Minimizing Age-of-Information in HARQ-CC Aided NOMA Systems")
  },
  {
    id: "j11",
    year: 2022,
    title: "Analysis and Optimization of HARQ Based Spinal Coded Timely Status Update System",
    authors: "Siqi Meng, Shaohua Wu, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Communications",
    venue_short: "IEEE TCOM",
    type: "Journal",
    if: "8.9",
    jcr: "Q1",
    keywords: ["AoI", "Spinal Codes", "HARQ"],
    summary: "Joint optimization of HARQ and Spinal codes for timely status updates.",
    image: "/images/TCOMspinal3.gif",
    links: { pdf: "/papers/paper16TCOM.pdf" },
    url: getIEEEUrl("Analysis and Optimization of HARQ Based Spinal Coded Timely Status Update System")
  },
  {
    id: "j12",
    year: 2022,
    title: "A Weighted Graph-based Handover Strategy for Aeronautical Traffic in LEO SatCom Networks",
    authors: "Xiyu Lv, Shaohua Wu, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Networking Letters",
    venue_short: "IEEE LNET",
    type: "Journal",
    image: "/images/NETL1.gif",
    keywords: ["LEO", "Handover", "Graph Theory"],
    summary: "Proposes a weighted graph-based handover strategy for LEO satellite networks.",
    links: { pdf: "/papers/paper10NETL.pdf" },
    url: getIEEEUrl("A Weighted Graph-based Handover Strategy for Aeronautical Traffic in LEO SatCom Networks")
  },
  {
    id: "j13",
    year: 2022,
    title: "Partial Self-Concatenation Structure and Performance Analysis of Spinal Codes over Rayleigh Fading Channel",
    authors: "Siqi Meng, Shaohua Wu, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Vehicular Technology",
    venue_short: "IEEE TVT",
    type: "Journal",
    if: "7.1",
    jcr: "Q1",
    keywords: ["Spinal Codes", "Fading Channels"],
    summary: "Enhances Spinal codes with partial self-concatenation for Rayleigh fading channels.",
    links: { pdf: "/papers/paper4TVT.pdf" },
    url: getIEEEUrl("Partial Self-Concatenation Structure and Performance Analysis of Spinal Codes over Rayleigh Fading Channel")
  },
  {
    id: "j14",
    year: 2021,
    title: "Spinal Codes Over Fading Channel: Error Probability Analysis and Encoding Structure Improvement",
    authors: "Aimin Li, Shaohua Wu, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Transactions on Wireless Communications",
    venue_short: "IEEE TWC",
    type: "Journal",
    if: "10.7",
    jcr: "Q1",
    tag: "First Author",
    keywords: ["Spinal Codes", "Fading Channels"],
    summary: "First rigorous error probability analysis of Spinal codes over fading channels.",
    links: { pdf: "/papers/paper6TWC.pdf" },
    url: getIEEEUrl("Spinal Codes Over Fading Channel: Error Probability Analysis and Encoding Structure Improvement")
  },

  // --- Conference Proceedings (13 papers) ---
  {
    id: "c1",
    year: 2025,
    title: "Optimal Sampling and Scheduling for Remote Fusion Estimation of Correlated Wiener Processes",
    authors: "Aimin Li, Elif Uysal",
    venue: "61st Allerton Conference on Communication, Control, and Computing",
    venue_short: "Allerton",
    type: "Conference",
    tag: "First Author",
    featured: true,
    keywords: ["Remote Estimation", "Scheduling"],
    summary: "Optimizing sampling, scheduling, and estimation for correlated processes in remote fusion estimation systems, and proving a separation principle.",
    image: "/images/Allerton1.png",
    links: { pdf: "/papers/paper24Allerton.pdf" },
    url: "https://arxiv.org/pdf/2510.22288"
  },
  {
    id: "c2",
    year: 2025,
    title: "Fresh Data Delivery: Joint Sampling and Routing for Minimizing the Age of Information",
    authors: "Adem Utku Atasayar, Aimin Li, Cagri Ari, Elif Uysal",
    venue: "ACM International Symposium on Theory, Algorithmic Foundations, and Protocol Design for Mobile Networks and Mobile Computing",
    venue_short: "ACM Mobihoc",
    type: "Conference",
    image: "/images/Mobihoc1.png",
    featured: true,
    keywords: ["AoI", "Routing", "Sampling"],
    summary: "Joint sampling and routing design for AoI minimization in networks with random delay, establishing a remarkably simple threshold-based optimal policy.",
    links: { pdf: "/papers/paper22Mobihoc.pdf" },
    url: "https://dl.acm.org/action/doSearch?AllField=Fresh+Data+Delivery%3A+Joint+Sampling+and+Routing+for+Minimizing+the+Age+of+Information" // ACM link fallback
  },
  {
    id: "c3",
    year: 2024,
    title: "Sampling to Achieve the Goal: An Age-aware Remote Markov Decision Process",
    authors: "Aimin Li, Shaohua Wu, Gary C.F. Lee, Xiaomeng Chen, Sumei Sun",
    venue: "IEEE Information Theory Workshop",
    venue_short: "IEEE ITW",
    type: "Conference",
    tag: "First Author",
    image: "/images/ITW1.gif",
    featured: true,
    keywords: ["AoI", "Remote Estimation", "MDP"],
    summary: "Proposes an age-aware sampling policy for remote MDPs, proving optimality.",
    links: { pdf: "/papers/paper18ITW.pdf" },
    url: getIEEEUrl("Sampling to Achieve the Goal: An Age-aware Remote Markov Decision Process")
  },
  {
    id: "c4",
    year: 2024,
    title: "Goal-oriented tensor: Beyond AoI towards semantics-empowered goal-oriented communications",
    authors: "Aimin Li, Shaohua Wu, Sumei Sun",
    venue: "IEEE Wireless Communications and Networking Conference",
    venue_short: "IEEE WCNC",
    type: "Conference",
    tag: "First Author",
    image: "/images/TWCSpinal.png",
    keywords: ["Semantic Comm"],
    image: "/images/TCOMGOT.gif",
    summary: "Conference version of the goal-oriented tensor work.",
    links: { pdf: "/papers/paper27WCNC.pdf" },
    url: getIEEEUrl("Goal-oriented tensor: Beyond AoI towards semantics-empowered goal-oriented communications")
  },
  {
    id: "c5",
    year: 2024,
    title: "Optimal Sampling for Uncertainty-of-Information Minimization in a Remote Monitoring System",
    authors: "Xiaomeng Chen, Aimin Li, Shaohua Wu",
    venue: "IEEE Information Theory Workshop",
    venue_short: "IEEE ITW",
    image: "/images/itw2.gif",
    type: "Conference",
    keywords: ["UoI", "Remote Monitoring"],
    summary: "Focuses on minimizing Uncertainty of Information (UoI) rather than just AoI under random delay.",
    links: { pdf: "/papers/paper19ITW.pdf" },
    url: getIEEEUrl("Optimal Sampling for Uncertainty-of-Information Minimization in a Remote Monitoring System")
  },
  {
    id: "c6",
    year: 2024,
    title: "Joint Transmission and Control in a Goal-oriented NOMA Network",
    authors: "Kunpeng Liu, Shaohua Wu, Aimin Li, Qinyu Zhang",
    venue: "IEEE International Communications Conference",
    venue_short: "IEEE ICC",
    type: "Conference",
    image: "/images/ICC1.gif",
    keywords: ["NOMA", "Control", "Goal-Oriented"],
    summary: "Investigates joint transmission and control in NOMA-assisted networks.",
    links: { pdf: "/papers/paper26ICC.pdf" },
    url: getIEEEUrl("Joint Transmission and Control in a Goal-oriented NOMA Network")
  },
  {
    id: "c7",
    year: 2024,
    title: "Packet Management of AoI in The Finite Block-length Regime",
    authors: "Mingxiao Sun, Di Zhang, Shaobo Jia, Aimin Li",
    venue: "IEEE International Conference on Communication Technology",
    venue_short: "IEEE ICCT",
    type: "Conference",
    keywords: ["AoI", "FBL", "Packet Management"],
    summary: "Studies packet management strategies for AoI under finite blocklength constraints.",
    links: { pdf: "/papers/paper20ICCT.pdf" },
    url: getIEEEUrl("Packet Management of AoI in The Finite Block-length Regime")
  },
  {
    id: "c8",
    year: 2023,
    title: "Tight Upper Bounds on the Error Probability of Spinal Codes over Fading Channels",
    authors: "Xiaomeng Chen, Aimin Li, Shaohua Wu",
    venue: "IEEE International Symposium on Information Theory",
    venue_short: "IEEE ISIT",
    type: "Conference",
    image: "/images/Spinalcodes.gif",
    keywords: ["Spinal Codes", "Fading Channels", "Information Theory"],
    summary: "Presents first tight bounds for Spinal codes in the finite block length (FBL) regime over fading channels.",
    links: { pdf: "/papers/paper21ISIT.pdf" },
    url: getIEEEUrl("Tight Upper Bounds on the Error Probability of Spinal Codes over Fading Channels")
  },
  {
    id: "c9",
    year: 2023,
    title: "Deep Reinforcement Learning-Assisted Age-optimal Transmission Policy for HARQ-aided NOMA Networks",
    authors: "Kunpeng Liu, Aimin Li, Shaohua Wu",
    venue: "IEEE INFOCOM Workshops",
    venue_short: "IEEE INFOCOM",
    type: "Conference",
    image: "/images/INFOCOMWS1.gif",
    keywords: ["DRL", "AoI", "NOMA"],
    summary: "Uses DRL to optimize transmission policies for AoI in HARQ-NOMA systems.",
    links: { pdf: "/papers/paper13INFOCOMWS.pdf" },
    url: getIEEEUrl("Deep Reinforcement Learning-Assisted Age-optimal Transmission Policy for HARQ-aided NOMA Networks")
  },
  {
    id: "c10",
    year: 2022,
    title: "Analyzing Age Performance of Hybrid-ARQ: A Unified Explicit Result",
    authors: "Aimin Li, Shaohua Wu, Yajing Deng, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE Global Communications Conference",
    venue_short: "IEEE Globecom",
    type: "Conference",
    tag: "First Author",
    image: "/images/TCOMAoI.gif",
    keywords: ["AoI", "HARQ"],
    summary: "Conference version of the unified explicit AoI result for HARQ.",
    links: { pdf: "/papers/paper14Globecom.pdf" },
    url: getIEEEUrl("Analyzing Age Performance of Hybrid-ARQ: A Unified Explicit Result")
  },
  {
    id: "c11",
    year: 2022,
    title: "Analysis of GEO Satellite Relay Coded Systems",
    authors: "Jiaming Zhang, Shaohua Wu, Aimin Li, Jian Jiao, Qinyu Zhang",
    venue: "IEEE Vehicular Technology Conference",
    venue_short: "IEEE VTC-Fall",
    type: "Conference",
    keywords: ["Satellite", "Relay"],
    summary: "Performance analysis of coded systems in GEO satellite relay networks.",
    links: { pdf: "/papers/paper15VTC.pdf" },
    url: getIEEEUrl("Analysis of GEO Satellite Relay Coded Systems")
  },
  {
    id: "c12",
    year: 2021,
    title: "Analysis and Optimization of Spinal Codes over the BSC: from the AoI Perspective",
    authors: "Siqi Meng, Shaohua Wu, Aimin Li, Jian Jiao, Ning Zhang, Qinyu Zhang",
    venue: "IEEE ICC Workshops",
    venue_short: "IEEE ICC",
    type: "Conference",
    keywords: ["Spinal Codes", "AoI", "BSC"],
    summary: "Optimizes Spinal codes over Binary Symmetric Channels for AoI.",
    links: { pdf: "/papers/paper17ICCWS.pdf" },
    url: getIEEEUrl("Analysis and Optimization of Spinal Codes over the BSC: from the AoI Perspective")
  },
  {
    id: "c13",
    year: 2020,
    title: "Spinal Codes over BSC: Error Probability Analysis and the Puncturing Design",
    authors: "Aimin Li, Shaohua Wu, Ying Wang, Jian Jiao, Qinyu Zhang",
    venue: "IEEE Vehicular Technology Conference",
    venue_short: "IEEE VTC-Spring",
    type: "Conference",
    tag: "First Author",
    keywords: ["Spinal Codes", "Puncturing"],
    summary: "Early work on the error probability analysis and puncturing design for Spinal codes.",
    links: { pdf: "/papers/paper5VTC.pdf" },
    url: getIEEEUrl("Spinal Codes over BSC: Error Probability Analysis and the Puncturing Design")
  }
];

const SUBMITTED = [];

const DATA = {
  en: {
    meta_title: "Aimin Li | Postdoc Researcher | METU",
    meta_desc: "Academic profile of Aimin Li, Postdoctoral Researcher at METU, Türkiye.",
    name: "Aimin Li (黎爱民)",
    role: "Postdoctoral Researcher",
    org: "Middle East Technical University (METU)",
    org_full: "Middle East Technical University (METU)",
    bio: "Postdoctoral researcher at METU, collaborating with IEEE Fellow [Prof. Elif Uysal](https://users.metu.edu.tr/ueelif/) on the ERC Advanced Grant project **GO-SPACE**. My research interests lie at the intersection of **Information Theory**, **Semantic Communications**, **Age of Information (AoI)**, **Channel Coding**, and **Network Optimization**. I received my Ph.D. from Harbin Institute of Technology, Shenzhen, under the supervision of [Prof. Shaohua Wu](https://faculty.hitsz.edu.cn/wushaohua), and conducted visiting research at A*STAR I²R in Singapore under the guidance of IEEE Fellow [Prof. Sumei Sun](https://www.a-star.edu.sg/i2r/about-i2r/i2r-management/sun-sumei).",
    location: "Ankara, Türkiye",
    social: {
      scholar: "https://scholar.google.com/citations?user=nyl1-EMAAAAJ&hl=en",
      github: "https://github.com/aiminli-hi",
      linkedin: "https://linkedin.com", 
      researchgate: "https://www.researchgate.net/profile/Aimin-Li-15?ev=hdr_xprf", 
      email: "mailto:hitliaimin@163.com"
    },
    nav: { about: "About", news: "News", timeline: "Timeline", awards: "Honors", publications: "Publications", service: "Academic Service", teaching: "Teaching", contact: "Contact" },
    news: [
      { date: "2026-02-06", label: "TIT", content: "Paper titled <strong>From Freshness to Effectiveness: Goal-oriented Sampling for Remote Decision Making</strong> was accepted by <strong>IEEE Transactions on Information Theory (TIT)</strong>.", link: "/papers/paper26TIT.pdf" },
      { date: "2025-11", label: "Award", content: "Won the <strong>Best Dissertation Nomination Award</strong> at Harbin Institute of Technology (the only recipient from the EE Department).", link: "#awards" },
      { date: "2025-11", label: "Allerton 2025", content: "Paper titled <strong>Optimal Sampling and Scheduling for Remote Fusion Estimation of Correlated Wiener Processes</strong> was accepted. Welcome discussions and collaborations.", link: "https://arxiv.org/pdf/2510.22288" },
      { date: "2025-11", label: "Mobihoc 2025", content: "Paper titled <strong>Fresh Data Delivery: Joint Sampling and Routing for Minimizing the Age of Information</strong> was accepted (<strong>39 papers accepted worldwide in 2025</strong>). Welcome discussions and collaborations.", link: "https://dl.acm.org/doi/10.1145/3704413.3764413" },
      { date: "2024-12", label: "Competition", content: "Won the 3rd Prize in IEEE Globecom 4MT Thesis Competition.", link: "#awards" },
      { date: "2024-12", label: "Scholarship", content: "Won the National Scholarship for PhD students.", link: "#awards" }
    ],
    timeline: [
      { year: "2025 - Present", location: "Ankara, Türkiye", role: "Postdoctoral Researcher", org: "Middle East Technical University (METU)", 
        desc: "Project: ERC Advanced Grant GO-SPACE. Advisor: IEEE Fellow [Prof. Elif Uysal](https://users.metu.edu.tr/ueelif/).\nI am thrilled to join this family and embark on this new journey.", 
        lineage: [
          { name: "Claude Shannon", title: "Information Theory Founder", highlight: false },
          { name: "Robert Gallager", title: "MIT Professor Emeritus", highlight: false },
          { name: "Elif Uysal", title: "METU Professor (Advisor)", highlight: true },
        ],
        type: "work" },
      { year: "2023.10 - 2024.10", location: "Singapore", role: "Visiting Researcher", org: "Institute for Infocomm Research (I2R), A*STAR", 
        desc: "Research on Goal-oriented Semantic Communications. \nAdvisor: IEEE Fellow [Prof. Sumei Sun](https://www.a-star.edu.sg/i2r/about-i2r/i2r-management/sun-sumei).\nI learned a lot in Singapore and left with precious memories. Deeply grateful for this experience.", 
        type: "work" },
      { year: "2020.09 - 2025", location: "Shenzhen, China", role: "Ph.D. in Info. & Comm. Eng.", org: "Harbin Institute of Technology, Shenzhen", 
        desc: "Advisor: [Prof. Shaohua Wu](https://faculty.hitsz.edu.cn/wushaohua).\nFive years at my alma mater HIT: a journey of rigorous training, maturing, and growing into an independent researcher.", 
        type: "edu" },
      { year: "2017.07 - 2017.08", location: "California, USA", role: "Visiting Student", org: "University of California, Riverside (UCR)", desc: "International exchange program.", type: "edu" },
      { 
        year: "2016.09 - 2020.06", 
        location: "Shenzhen, China", 
        role: "B.Eng. in Comm. Eng.", 
        org: "Harbin Institute of Technology, Shenzhen", 
        desc: "Qualified for postgraduate recommendation to Tsinghua University. Awarded Best Undergraduate Thesis of HIT and Provincial Merit Student of Heilongjiang Province.", 
        type: "edu" 
      }
    ],
    awards: [
      { year: "2025", title: "Best Dissertation Award Nomination", desc: "Only 1 in EE Dept.", level: "University", featured: true },
      { year: "2020 and 2024", title: "National Scholarship of China (Twice)", desc: "Top 0.2% nationwide", level: "National", featured: true },
      { year: "2025", title: "Provincial Outstanding Graduate Award", desc: "Top 0.4% in Heilongjiang Province", level: "Provincial", featured: true },
      { year: "2020", title: "Best Undergraduate Thesis Award", desc: "Only 2 recipients in EE Dept", level: "University", featured: true },
      { year: "2025", title: "Award for HIT Outstanding Graduate Students", desc: "Top 10% in Harbin Institute of Technology", level: "University" },
      { year: "2024", title: "IEEE Globecom 4MT Thesis Competition (3rd Prize)", desc: "Ranked 5th out of 15 finalists worldwide. Awarded by IEEE ComSoc President.", level: "Global", featured: true },
      { year: "2024", title: "IEEE Globecom Travel Grant", desc: "Top 15 Ph.D. Students Worldwide", level: "Global" },
      { year: "2024", title: "Candidate for NSFC Youth Project", desc: "One of <600 PhD Students in China", level: "National" },
      { year: "2023", title: "HIT 'Dianzi' Research Student Program (Independent PI Project)", desc: "Only 1 Ph.D. Student in EE Dept.", level: "University", featured: true },
      { year: "2020", title: "Special Merit Doctoral Scholarship", desc: "Awarded by HIT University President (awarded to only 8 PhD students university-wide)", level: "University", featured: true },
      { year: "2017 and 2019", title: "HIT Outstanding Student Award (Twice)", desc: "Rate top 10% in Harbin Institute of Technlogy", level: "University" },
      { year: "2019", title: "Outstanding Participant, Tsinghua University Summer Camp", desc: "Qualified postgraduate recommendation to Tsinghua University", level: "University", featured: true },
      { year: "2018", title: "Gongjin Scholarship for Overall Excellence", desc: "Only 3 recipients in EE Dept.", level: "University" },
      { year: "2018", title: "Provincial Merit Student", desc: "Rate top 1% in Heilongjiang Province.", level: "Provincial", featured: true },
      { year: "2016 and 2017", title: "First Prize of Chinese College Student Math Competition (Twice)", desc: "National Level Math Competition.", level: "National" },
      { year: "2017", title: "First Class Scholarship for Comprehensive Excellence", desc: "Top 5% in Harbin Institute of Technology.", level: "National" },
    ],
    service: {
      reviewer: [ 
        "IEEE Transactions on Information Theory (TIT)", 
        "IEEE Journal on Selected Areas in Communications (JSAC)", 
        "IEEE Transactions on Mobile Computing (TMC)", 
        "IEEE Transactions on Communications (TCOM)", 
        "IEEE Transactions on Wireless Communications (TWC)",
        "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)",
        "IEEE Transactions on Vehicular Technology (TVT)",
        "IEEE Transactions on Cognitive Communications and Networking (TCCN)",
        "IEEE Communications Letters (CL)",
        "IEEE Wireless Communications Letters (WCL)",
        "Elsevier Computer Networks",
        "IEEE International Symposium on Information Theory (ISIT)",
        "IEEE Conference on Computer Communications (Infocom)",
        "IEEE International Conference on Communications (ICC)",
        "IEEE Global Communications Conference (Globecom)",
        "IEEE Wireless Communications and Networking Conference (WCNC)",
        "IEEE Vehicular Technology Conference (VTC)",
        "IEEE International Wireless Communications and Mobile Computing Conference (IWCMC)"
      ],
      chair: [ "Session Chair, IEEE ITW 2024 (AoI Session)", "Session Chair, IEEE Globecom 2024 (Distributed Learning Session)" ],
      volunteer: [ "IEEE VTC-Spring 2024 Singapore", "IEEE 6G Summit 2024 Singapore", "IEEE 6G Summit 2023 Singapore" ]
    },
    teaching: [
      { role: "Teaching Assistant", course: "Communication Theory", org: "Harbin Institute of Technology, Shenzhen", period: "Fall 2020", desc: "Undergraduate Course" },
      { role: "Teaching Assistant", course: "Foundations of Information Theory", org: "Harbin Institute of Technology, Shenzhen", period: "Fall 2022", desc: "Graduate Course" }
    ]
  },
  zh: {
    meta_title: "黎爱民 | 博士后研究员 | 土耳其中东技术大学 (METU)",
    meta_desc: "黎爱民的个人学术主页。",
    name: "黎爱民",
    role: "博士后研究员",
    org: "土耳其中东技术大学 (METU)",
    org_full: "土耳其中东技术大学 (METU)",
    bio: "我是一名目前在土耳其中东技术大学从事博士后研究的中国学者，研究方向聚焦于**信息理论**、**语义通信**、**信息时效 (AoI)**、**信道编码**与**网络优化**等前沿领域。目前，我正与 IEEE Fellow [Elif Uysal 教授](https://users.metu.edu.tr/ueelif/) 紧密合作，参与欧盟 ERC Advanced Grant 项目 **GO-SPACE**。我本科与博士期间就读与哈尔滨工业大学（深圳），师从[吴绍华 教授](https://faculty.hitsz.edu.cn/wushaohua)。我亦曾赴新加坡科技研究局（A*STAR I²R）开展访问研究，期间在新加坡工程院院士、IEEE Fellow [Sumei Sun 教授](https://www.a-star.edu.sg/i2r/about-i2r/i2r-management/sun-sumei) 指导下深入探索6G通信前沿。",
    location: "土耳其安卡拉",
    social: {
      scholar: "https://scholar.google.com/citations?user=nyl1-EMAAAAJ&hl=zh-CN",
      github: "https://github.com/aiminli-hi",
      linkedin: "https://linkedin.com",
      email: "mailto:hitliaimin@163.com"
    },
    nav: { about: "关于我", news: "最新动态", timeline: "个人履历", awards: "荣誉奖项", publications: "发表论文", service: "学术服务", teaching: "教学经历", contact: "联系方式" },
    news: [
      { date: "2026-02-06", label: "TIT", content: "论文 <strong>From Freshness to Effectiveness: Goal-oriented Sampling for Remote Decision Making</strong> 被 <strong>IEEE Transactions on Information Theory (TIT)</strong> 接收。", link: "/papers/paper26TIT.pdf" },
      { date: "2025-11", label: "荣誉", content: "获得哈尔滨工业大学最佳学位论文提名奖。", link: "#awards" },
      { date: "2025-11", label: "Allerton 2025", content: "论文 <strong>Optimal Sampling and Scheduling for Remote Fusion Estimation of Correlated Wiener Processes</strong> 被 Allerton Conference 2025 录用。欢迎交流与合作。", link: "https://arxiv.org/pdf/2510.22288" },
      { date: "2025-11", label: "Mobihoc 2025", content: "论文 <strong>Fresh Data Delivery: Joint Sampling and Routing for Minimizing the Age of Information</strong> 被 ACM Mobihoc 2025 录用（<strong>全球2025录用39篇</strong>）。欢迎交流与合作。", link: "https://dl.acm.org/doi/10.1145/3704413.3764413" },
      { date: "2024-12", label: "竞赛", content: "获得IEEE Globecom四分钟博士学位论文竞赛三等奖。", link: "#awards" },
      { date: "2024-12", label: "奖学金", content: "获得博士研究生国家奖学金。", link: "#awards" }      
    ],
    timeline: [
      { year: "2025 - 至今", location: "土耳其，安卡拉", role: "博士后研究员", org: "土耳其中东技术大学 (METU)", 
        desc: "参与 ERC Advanced Grant 项目 GO-SPACE。合作导师：IEEE Fellow [Prof. Elif Uysal](https://users.metu.edu.tr/ueelif/)。\n我很开心加入这个大家庭，开始这一段旅程。", 
        lineage: [
          { name: "Claude Shannon", title: "信息论之父", highlight: false },
          { name: "Robert Gallager", title: "MIT 荣休教授", highlight: false },
          { name: "Elif Uysal", title: "METU 教授 (合作导师)", highlight: true },
        ],
        type: "work" },
      { year: "2023.10 - 2024.10", location: "新加坡", role: "访问研究员", org: "新加坡资讯通信研究院 (I2R), A*STAR", 
        desc: "研究方向：目标导向的语义通信。\n导师：IEEE Fellow [Sumei Sun 教授](https://www.a-star.edu.sg/i2r/about-i2r/i2r-management/sun-sumei)。\n在新加坡我学到了很多，留下了美好珍贵的回忆。非常感激这段经历。", 
        type: "work" },
      { year: "2020.09 - 2025", location: "中国，深圳", role: "工学博士 (信息与通信工程)", org: "哈尔滨工业大学（深圳）", 
        desc: "本博连读（直博）。导师：[吴绍华 教授](https://faculty.hitsz.edu.cn/wushaohua)。\n在母校工大的这五年，是历练、成熟与成长的宝贵时光。", 
        type: "edu" },
      { year: "2017", location: "美国，加州", role: "访问学生", org: "加州大学河滨分校 (UCR)", desc: "国际交换生项目。", type: "edu" },
      { year: "2016.09 - 2020.06", location: "中国，深圳", role: "工学学士 (通信工程)", org: "哈尔滨工业大学（深圳）", desc: "获清华大学研究生推荐免试录用资格。获哈尔滨工业大学校优秀毕业论文、黑龙江省三好学生。", type: "edu" }
    ],
    awards: [
      { year: "2025", title: "哈工大最佳博士学位论文提名", desc: "电子系唯一入选者", level: "University", featured: true },
      { year: "2020 and 2024", title: "博士研究生国家奖学金（2次）", desc: "中国教育部颁发最高学生荣誉，全国前 0.2%", level: "National", featured: true },
      { year: "2025", title: "黑龙江省普通高校优秀博士毕业生", desc: "黑龙江省前0.4%", level: "Provincial",  featured: true },
      { year: "2020", title: "哈工大特等博士研究生奖学金", desc: "校长特别颁发（全校博士生仅 8 人）", level: "University", featured: true },
      { year: "2020", title: "哈工大校优秀本科毕业论文", desc: "电子系仅 2 名", level: "University",  featured: true },
      { year: "2025", title: "哈工大优秀博士毕业生", desc: "哈尔滨工业大学博士生前10%", level: "University" },
      { year: "2024", title: "IEEE Globecom 4MT 论文竞赛 (三等奖)", desc: "全球决赛第 5 名。由 IEEE ComSoc 主席颁奖", level: "International", featured: true },
      { year: "2024", title: "IEEE Globecom 旅行奖", desc: "全球共 15 名博士生。", level: "International" },
      { year: "2024", title: "国家自然科学基金青年学生项目候选人", desc: "电子系唯一入选，首批全国少于 600 名博士生进入候选", level: "National" },
      { year: "2023", title: "哈工大“点子”基金项目负责人 (PI)", desc: "获得独立科研经费资助", level: "University", featured: true },
      { year: "2017 and 2019", title: "哈工大年度优秀学生（2次）", desc: "校前10%", level: "University" },
      { year: "2019", title: "清华大学电子系推免夏令营优秀营员", desc: "获清华大学研究生推荐免试录用资格。", level: "University", featured: true },
      { year: "2018", title: "黑龙江省三好学生", desc: "黑龙江省前1%", level: "University", featured: true },
      { year: "2019", title: "共进奖学金", desc: "电子系仅3名", level: "University" },
      { year: "2018", title: "黑龙江省三好学生", desc: "省前1%", level: "Provincial" },   
      { year: "2016 and 2017", title: "全国大学生数学竞赛一等奖（2次）", desc: "国家级数学竞赛。", level: "National" },
    ],
    service: {
      reviewer:[ 
        "IEEE Transactions on Information Theory (TIT)", 
        "IEEE Journal on Selected Areas in Communications (JSAC)", 
        "IEEE Transactions on Mobile Computing (TMC)", 
        "IEEE Transactions on Communications (TCOM)", 
        "IEEE Transactions on Wireless Communications (TWC)",
        "IEEE Transactions on Neural Networks and Learning Systems (TNNLS)",
        "IEEE Transactions on Vehicular Technology (TVT)",
        "IEEE Transactions on Cognitive Communications and Networking (TCCN)",
        "IEEE Communications Letters (CL)",
        "IEEE Wireless Communications Letters (WCL)",
        "Elsevier Computer Networks",
        "IEEE International Symposium on Information Theory (ISIT)",
        "IEEE Conference on Computer Communications (Infocom)",
        "IEEE International Conference on Communications (ICC)",
        "IEEE Global Communications Conference (Globecom)",
        "IEEE Wireless Communications and Networking Conference (WCNC)",
        "IEEE Vehicular Technology Conference (VTC)",
        "IEEE International Wireless Communications and Mobile Computing Conference (IWCMC)"
      ],
      chair: [ "分会主席, IEEE ITW 2024信息年龄分会", "分会主席, IEEE Globecom 2024分布式学习分会" ],
      volunteer: [ "IEEE VTC-Spring 2024", "IEEE 6G Summit 2024 Singapore", "IEEE 6G Summit 2023 Singapore" ]
    },
    teaching: [
      { role: "助教", course: "通信原理 (本科)", org: "哈尔滨工业大学（深圳）", period: "2020 秋", desc: "合作教师：吴绍华教授" },
      { role: "助教", course: "信息论基础 (研究生)", org: "哈尔滨工业大学（深圳）", period: "2022 秋", desc: "合作教师：吴绍华教授" }
    ]
  }
};

// ==========================================
// --- 逻辑层 & 组件 (Logic & Components) ---
// ==========================================

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

const ActionButton = ({ icon: Icon, label, href, onClick, type = "default", darkMode }) => {
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
      <Icon size={14} />{label}
    </Component>
  );
};

const SocialButton = ({ icon: Icon, href, label, colorType, darkMode }) => {
  const colors = {
    email: darkMode ? "bg-[#EA4335] text-white border-[#EA4335] hover:bg-[#d33426]" : "bg-[#EA4335] text-white border-[#EA4335] hover:bg-[#d33426] shadow-sm",
    scholar: darkMode ? "bg-[#4285F4] text-white border-[#4285F4] hover:bg-[#3367d6]" : "bg-[#4285F4] text-white border-[#4285F4] hover:bg-[#3367d6] shadow-sm",
    github: darkMode ? "bg-[#181717] text-white border-[#30363d] hover:bg-[#30363d]" : "bg-[#24292e] text-white border-[#24292e] hover:bg-[#000] shadow-sm",
    linkedin: darkMode ? "bg-[#0077b5] text-white border-[#0077b5] hover:bg-[#006097]" : "bg-[#0077b5] text-white border-[#0077b5] hover:bg-[#006097] shadow-sm",
  };
  const activeColor = colors[colorType] || (darkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-700 border-gray-200");
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-xl border flex items-center justify-center ${activeColor}`} title={label}>
      <Icon size={22} />
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

// ==========================================
// --- Main App Component ---
// ==========================================

export default function AcademicProfile() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);
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

  const content = DATA[lang];
  useSEO(content.meta_title, content.meta_desc);

  const venueStats = useMemo(() => {
    const counts = {};
    PUBLICATIONS.forEach(pub => {
      const v = pub.venue_short || 'Other';
      counts[v] = (counts[v] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([venue, count]) => ({ venue, count }));
  }, []);

  const allKeywords = useMemo(() => {
    const keys = new Set();
    PUBLICATIONS.forEach(p => p.keywords?.forEach(k => keys.add(k)));
    return ["All", ...Array.from(keys).sort()];
  }, []);

  const { featuredPubs, otherPubs } = useMemo(() => {
    let filtered = [...PUBLICATIONS];
    filtered.sort((a, b) => {
      if (sortOrder === "newest") return b.year - a.year;
      return a.year - b.year;
    });
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.venue.toLowerCase().includes(q));
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
  }, [searchQuery, selectedKeyword, selectedVenue, sortOrder]);

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

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setDarkMode(true);
  }, []);

  if (!mounted) return null;

  const PublicationCard = ({ pub, isFeatured }) => {
    const isExpanded = expandedPaperId === pub.id;
    
    const handleCardClick = (e) => {
      // If the user clicks the card, open the article URL
      if (pub.url) {
        window.open(pub.url, '_blank', 'noopener,noreferrer');
      }
    };

    const toggleExpand = (e) => {
      // Stop propagation so it doesn't trigger the URL open
      e.stopPropagation();
      setExpandedPaperId(isExpanded ? null : pub.id);
    };

    return (
      <div 
        className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
          ${isFeatured 
            ? (darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500/30 shadow-lg shadow-amber-900/10' : 'bg-gradient-to-br from-white to-amber-50/30 border-amber-200 shadow-lg shadow-amber-100') 
            : (darkMode ? 'bg-slate-800/40 border-slate-700/50 hover:border-purple-500/30' : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-md')
          }`}
        onClick={handleCardClick}
        title="Click to view article"
      >
        {/* Hover Indicator Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
           <ExternalLink size={16} className={darkMode ? 'text-slate-400' : 'text-slate-400'} />
        </div>

        {isFeatured && (
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl z-10 flex items-center gap-1 shadow-sm">
            <Star size={10} fill="currentColor" /> Selected
          </div>
        )}
        <div className="p-5 flex flex-col md:flex-row gap-5">
          {pub.image && (
            <div className="shrink-0 w-full md:w-48 h-32 rounded-xl overflow-hidden border dark:border-slate-700 shadow-sm hidden md:block relative">
              <img src={pub.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          )}
          <div className="flex-1 min-w-0">
             <div className="flex justify-between items-start gap-4">
                <h3 className={`text-lg font-bold leading-snug mb-2 group-hover:underline decoration-2 underline-offset-2 ${darkMode ? 'text-slate-100 group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-600'} transition-colors`}>
                  {pub.title}
                </h3>
                
                {/* Expansion Arrow - Clickable Area */}
                <div 
                  className={`shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 z-20 ${isExpanded ? 'rotate-180' : ''}`}
                  onClick={toggleExpand}
                  title={isExpanded ? "Collapse Abstract" : "Expand Abstract"}
                >
                  <ChevronDown size={20} className="opacity-50 hover:opacity-100" />
                </div>
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
             <div className="flex gap-3 mt-auto pt-2" onClick={e => e.stopPropagation()}>
               <ActionButton icon={FileText} label="PDF" href={pub.links.pdf} type="pdf" darkMode={darkMode} />
               {pub.links.code && <ActionButton icon={Github} label="Code" href={pub.links.code} type="code" darkMode={darkMode} />}
               <ActionButton icon={Quote} label="Cite" onClick={() => setActiveBibtex(generateBibtex(pub))} type="bibtex" darkMode={darkMode} />
             </div>
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 border-t dark:border-slate-700' : 'max-h-0 opacity-0'}`} onClick={e => e.stopPropagation()}>
          <div className={`p-5 text-sm leading-relaxed ${darkMode ? 'bg-slate-900/50 text-slate-300' : 'bg-gray-50 text-slate-700'}`}>
            <h4 className="font-bold mb-2 text-xs uppercase tracking-wider opacity-70">Abstract</h4>
            <p>{pub.abstract || "No abstract available."}</p>
          </div>
        </div>
      </div>
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
            <div className="hidden md:flex items-center gap-1 mr-2">
              {Object.entries(content.nav).map(([key, label]) => (
                <a key={key} href={`#${key}`} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === key ? (darkMode ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-700') : (darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50')}`}>{label}</a>
              ))}
            </div>
            <button 
              onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')} 
              className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full transition-all font-bold text-sm border shadow-sm hover:shadow ${darkMode ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-200'}`}
              title={lang === 'en' ? "切换为中文" : "Switch to English"}
            >
              <Languages size={16} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
              <span>{lang === 'en' ? 'EN / 中' : '中 / EN'}</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-gray-100 text-slate-600'}`}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`md:hidden p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-slate-600'}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-16 left-0 w-full border-b shadow-lg px-4 py-4 flex flex-col gap-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
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
              
              <div id="news" className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                 <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                   <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span></span>
                   {content.nav.news}
                 </h3>
                 <div className="space-y-2">
                   {content.news.map((item, idx) => (
                     <div key={idx} className="flex gap-3 text-sm items-start">
                        <span className="font-mono font-semibold opacity-50 whitespace-nowrap shrink-0">{item.date}</span>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                             <span className={`text-xs font-bold px-2 py-0.5 rounded w-fit shrink-0 ${darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>{item.label}</span>
                             {item.link ? (
                               <a href={item.link} target={item.link.startsWith('#') ? "_self" : "_blank"} rel="noreferrer" className={`hover:underline decoration-1 underline-offset-2 flex items-start gap-1 group ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`}>
                                  <span dangerouslySetInnerHTML={{__html: item.content}} />
                                  {!item.link.startsWith('#') && <ExternalLink size={10} className="mt-1 opacity-50 group-hover:opacity-100" />}
                               </a>
                             ) : (
                               <span dangerouslySetInnerHTML={{__html: item.content}} />
                             )}
                        </div>
                     </div>
                   ))}
                 </div>
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
                                      {isWork ? 'Experience' : 'Education'}
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
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Recognition for research excellence and academic achievements.</p>
              </div>
           </div>

           {/* Featured Awards Grid */}
           <div className="mb-12">
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${darkMode ? 'text-amber-500' : 'text-amber-600'}`}>
                 <Star size={14} /> Selected Honors
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
                 Other Awards & Recognition
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
                    View More Awards <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
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
                    <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Selected research works and academic contributions.</p>
                  </div>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} size={16} />
                  <input type="text" placeholder="Search titles or venues..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`pl-9 pr-4 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:bg-slate-700' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-300'}`} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                  <button onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`} title="Toggle Date Sort">
                    <ArrowUpDown size={12} /> {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                  </button>
                  <div className={`w-px h-4 mx-2 ${darkMode ? 'bg-slate-700' : 'bg-gray-200'}`}></div>
                  <button onClick={() => setSelectedVenue("All")} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedVenue === "All" ? (darkMode ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-emerald-500 border-emerald-500 text-white') : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')}`}>All Papers ({PUBLICATIONS.length})</button>
                  {venueStats.map((v, idx) => (
                    <button key={idx} onClick={() => setSelectedVenue(v.venue)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedVenue === v.venue ? (darkMode ? 'bg-purple-600 border-purple-500 text-white' : 'bg-purple-500 border-purple-500 text-white') : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')}`}>{v.venue} ({v.count})</button>
                  ))}
              </div>

              <div className="flex flex-wrap gap-2 pb-4 border-b dark:border-slate-800 items-center">
                  <Filter size={14} className={`mr-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  {allKeywords.map((keyword) => (
                    <button key={keyword} onClick={() => setSelectedKeyword(keyword)} className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all border ${selectedKeyword === keyword ? (darkMode ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200') : (darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-emerald-200')}`}>{keyword}</button>
                  ))}
              </div>
          </div>

          {featuredPubs.length > 0 && (
            <div className="space-y-4 animate-fade-in">
               <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                 <Star size={16} /> Selected Publications
               </h3>
               <div className="grid gap-6">
                  {featuredPubs.map(pub => <PublicationCard key={pub.id} pub={pub} isFeatured={true} />)}
               </div>
            </div>
          )}

          <div className="space-y-4">
             {(featuredPubs.length > 0 && otherPubs.length > 0) && (
               <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mt-12 mb-4 ${darkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                  {visiblePubs < otherPubs.length ? `Recent Publications` : `All Other Publications`}
               </h3>
             )}
             <div className="grid gap-6">
                {otherPubs.slice(0, visiblePubs).map(pub => <PublicationCard key={pub.id} pub={pub} isFeatured={false} />)}
             </div>
             {otherPubs.length > visiblePubs && (
                <div className="flex justify-center pt-8">
                  <button onClick={() => setVisiblePubs(prev => prev + 5)} className={`group flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105 ${darkMode ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-300 hover:text-emerald-600 shadow-sm hover:shadow-md'}`}>
                    View More Publications ({otherPubs.length - visiblePubs} remaining) <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
             )}
             {otherPubs.length === 0 && featuredPubs.length === 0 && <div className="text-center py-12 opacity-50">No papers found matching your criteria.</div>}
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

        {/* --- Contact Section --- */}
        <section id="contact" className="scroll-mt-32 mb-16">
           <div className="rounded-3xl overflow-hidden relative border shadow-2xl ${darkMode ? 'border-slate-700' : 'border-gray-100'}">
              <div className={`absolute inset-0 opacity-10 ${darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}></div>
              <div className={`relative p-8 md:p-12 ${darkMode ? 'bg-slate-800/50' : 'bg-white/80 backdrop-blur-sm'}`}>
                  <div className="text-center max-w-3xl mx-auto">
                      <div className={`inline-flex p-3 rounded-2xl mb-6 ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
                         <MessageCircle size={32} />
                      </div>
                      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.nav.contact}</h2>
                      <p className={`text-lg mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {lang === 'en' 
                          ? "I'm always open to discussing new research collaborations, opportunities, or just having a chat about information theory and communications." 
                          : "欢迎随时联系我，讨论科研合作、潜在机会，或仅仅是交流未来通信相关的想法。"}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-10">
                         <div className={`p-4 rounded-xl border flex items-center gap-4 ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-gray-200'}`}>
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}><MapPin size={20} /></div>
                            <div>
                               <div className={`text-xs font-bold uppercase opacity-50 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Location</div>
                               <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>{content.location}</div>
                            </div>
                         </div>
                         <a href={content.social.email} className={`p-4 rounded-xl border flex items-center gap-4 transition-colors ${darkMode ? 'bg-slate-900/50 border-slate-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
                            <div className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}><Mail size={20} /></div>
                            <div>
                               <div className={`text-xs font-bold uppercase opacity-50 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Email</div>
                               <div className={`font-medium ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>hitliaimin AT 163.com</div>
                            </div>
                         </a>
                      </div>

                      <div className="flex flex-wrap justify-center gap-4">
                         <SocialButton icon={GoogleScholarIcon} href={content.social.scholar} label="Google Scholar" colorType="scholar" darkMode={darkMode} />
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
