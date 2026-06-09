(() => {
  const VISITOR_MAP_STATS_URL = 'https://info.flagcounter.com/Ad32';
  const VISITOR_MAP_IMAGE_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/?v=20260609c';
  const VISITOR_RANKING_IMAGE_URL = 'https://s01.flagcounter.com/count2/Ad32/bg_FFFFFF/txt_334155/border_CBD5E1/columns_2/maxflags_12/viewers_0/labels_1/pageviews_1/flags_1/percent_0/?v=20260609a';
  const VISITOR_SNAPSHOT = {
    pageviews: 39,
    countries: 4,
    ranking: [
      { code: 'US', name: 'United States', count: 4, x: 23.5, y: 42.5, rx: 14, ry: 8, delay: 0 },
      { code: 'TR', name: 'Türkiye', count: 2, x: 55.6, y: 41.2, rx: 6.5, ry: 4.2, delay: 0.4 },
      { code: 'SG', name: 'Singapore', count: 1, x: 72.8, y: 64.5, rx: 4.5, ry: 3.4, delay: 0.8 },
      { code: 'CN', name: 'China', count: 1, x: 73.2, y: 44.8, rx: 11, ry: 7.5, delay: 1.2 }
    ]
  };
  const TOTAL_PUBLICATIONS = 33;
  let darkModeObserver = null;

  const EXTRA_NEWS = [
    {
      key: 'tmc-uav-marl-2026',
      date: '2026-06',
      label: 'TMC',
      title: 'AoI-Aware Joint Sampling-Buffering-Routing Optimization for Autonomous UAV Swarms via a MARL Approach',
      html: 'Paper titled <strong>AoI-Aware Joint Sampling-Buffering-Routing Optimization for Autonomous UAV Swarms via a MARL Approach</strong> appeared in <strong>IEEE Transactions on Mobile Computing (TMC)</strong>.',
      href: 'https://ieeexplore.ieee.org/abstract/document/11547874/'
    },
    {
      key: 'iotj-entropy-2026',
      date: '2026-05',
      label: 'IoTJ',
      title: 'Entropy-Driven Sampling for Remote Estimation in Internet of Things Systems',
      html: 'Paper titled <strong>Entropy-Driven Sampling for Remote Estimation in Internet of Things Systems</strong> appeared in <strong>IEEE Internet of Things Journal (IoTJ)</strong>.',
      href: 'https://doi.org/10.1109/JIOT.2026.3663721'
    },
    {
      key: 'vtc-weibull-2026',
      date: '2026-03',
      label: 'VTC',
      title: 'Capacity Analysis of Weibull Fading Channels for Satellite-Ground Integrated Communications',
      html: 'Paper titled <strong>Capacity Analysis of Weibull Fading Channels for Satellite-Ground Integrated Communications</strong> was accepted by <strong>IEEE VTC2026-Spring</strong>.',
      href: 'https://events.vtsociety.org/vtc2026-spring/conference-sessions/workshops-currently-available/w2-2nd-international-workshop-on-intelligent-aerial-and-spaceborne-systems-for-6g-6g-saga-communication-sensing-and-autonomy-for-mobility/'
    },
    {
      key: 'isit-heavy-tail-2026',
      date: '2026-01',
      label: 'ISIT',
      title: 'Taming the Heavy Tail: Age-Optimal Preemption',
      html: 'Paper titled <strong>Taming the Heavy Tail: Age-Optimal Preemption</strong> was accepted by <strong>IEEE International Symposium on Information Theory (ISIT 2026)</strong>.',
      href: 'https://arxiv.org/abs/2601.16624'
    }
  ];

  const EXTRA_PUBLICATIONS = [
    {
      key: 'tmc-uav-marl-2026',
      year: 2026,
      tag: 'Co-Author',
      title: 'AoI-Aware Joint Sampling-Buffering-Routing Optimization for Autonomous UAV Swarms via a MARL Approach',
      authors: 'Hanyu Wu, Shaohua Wu, Aimin Li, Siqi Meng, Qinyu Zhang',
      venue: 'IEEE Transactions on Mobile Computing',
      shortVenue: 'IEEE TMC',
      type: 'Journal',
      keywords: ['Age of Information', 'UAV Swarms', 'MARL', 'Routing'],
      summary: 'Develops an AoI-aware joint sampling, buffering, and routing optimization framework for autonomous UAV swarms using multi-agent reinforcement learning.',
      href: 'https://ieeexplore.ieee.org/abstract/document/11547874/'
    },
    {
      key: 'iotj-entropy-2026',
      year: 2026,
      tag: 'Co-Author',
      title: 'Entropy-Driven Sampling for Remote Estimation in Internet of Things Systems',
      authors: 'Xiaomeng Chen, Aimin Li, Yajing Deng, Shaohua Wu',
      venue: 'IEEE Internet of Things Journal',
      shortVenue: 'IEEE IoTJ',
      type: 'Journal',
      keywords: ['Remote Estimation', 'Internet of Things', 'Entropy', 'Uncertainty of Information'],
      summary: 'Uses uncertainty of information to guide sampling for remote estimation over randomly delayed IoT systems.',
      href: 'https://doi.org/10.1109/JIOT.2026.3663721'
    },
    {
      key: 'isit-heavy-tail-2026',
      year: 2026,
      tag: 'First Author',
      title: 'Taming the Heavy Tail: Age-Optimal Preemption',
      authors: 'Aimin Li, Yiğit İnce, Elif Uysal',
      venue: 'IEEE International Symposium on Information Theory',
      shortVenue: 'IEEE ISIT',
      type: 'Conference',
      keywords: ['Age of Information', 'Preemption', 'Heavy-Tailed Delay', 'Impulse Control'],
      summary: 'Studies age-optimal sampling and preemption under general, especially heavy-tailed, service-time distributions.',
      href: 'https://arxiv.org/abs/2601.16624'
    },
    {
      key: 'vtc-weibull-2026',
      year: 2026,
      tag: 'Co-Author',
      title: 'Capacity Analysis of Weibull Fading Channels for Satellite-Ground Integrated Communications',
      authors: 'Aiwei Lei, Di Zhang, Aimin Li, Evgeny Khorov',
      venue: 'IEEE Vehicular Technology Conference',
      shortVenue: 'IEEE VTC-Spring',
      type: 'Conference',
      keywords: ['Satellite Communications', 'Weibull Fading', 'SAGIN', 'Capacity Analysis'],
      summary: 'Analyzes channel capacity under Weibull fading for satellite-ground integrated communication systems.',
      href: 'https://events.vtsociety.org/vtc2026-spring/conference-sessions/workshops-currently-available/w2-2nd-international-workshop-on-intelligent-aerial-and-spaceborne-systems-for-6g-6g-saga-communication-sensing-and-autonomy-for-mobility/'
    }
  ];

  function addStyles() {
    if (document.getElementById('homepage-visitor-map-style')) return;
    const style = document.createElement('style');
    style.id = 'homepage-visitor-map-style';
    style.textContent = `
      .homepage-inline-card { border: 1px solid rgb(229 231 235); background: rgba(255,255,255,.92); border-radius: 1rem; padding: 1.25rem; box-shadow: 0 8px 24px rgba(15,23,42,.04); cursor: pointer; transition: all .2s ease; }
      .homepage-inline-card:hover { transform: translateY(-1px); box-shadow: 0 12px 30px rgba(15,23,42,.08); }
      .homepage-inline-meta { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-bottom: .75rem; font-size: .7rem; font-weight: 800; letter-spacing: .04em; }
      .homepage-inline-pill { display: inline-flex; align-items: center; border-radius: 9999px; padding: .2rem .55rem; background: rgb(236 253 245); color: rgb(4 120 87); border: 1px solid rgb(209 250 229); }
      .homepage-inline-year { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; color: rgb(100 116 139); }
      .homepage-inline-title { margin: 0 0 .45rem 0; color: rgb(17 24 39); font-size: 1.05rem; line-height: 1.35; font-weight: 800; }
      .homepage-inline-title a { color: inherit; text-decoration: none; }
      .homepage-inline-title a:hover { color: rgb(5 150 105); text-decoration: underline; text-underline-offset: 3px; }
      .homepage-inline-authors { color: rgb(75 85 99); font-size: .85rem; font-style: italic; margin-bottom: .65rem; }
      .homepage-inline-summary { color: rgb(100 116 139); font-size: .85rem; line-height: 1.55; margin-bottom: .75rem; }
      .homepage-inline-keywords { display: flex; flex-wrap: wrap; gap: .35rem; }
      .homepage-inline-keywords span { font-size: .68rem; border: 1px solid rgb(226 232 240); color: rgb(71 85 105); border-radius: 9999px; padding: .15rem .5rem; background: rgb(248 250 252); }
      .homepage-publication-card { background: white; border: 1px solid rgb(243 244 246); border-radius: 1rem; overflow: hidden; cursor: pointer; transition: all .3s ease; position: relative; }
      .homepage-publication-card:hover { border-color: rgb(233 213 255); box-shadow: 0 10px 24px rgba(15,23,42,.08); }
      .homepage-publication-card:hover .homepage-publication-title { color: rgb(147 51 234); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px; }
      .homepage-publication-hover { position: absolute; top: .75rem; right: .75rem; color: rgb(148 163 184); opacity: 0; transition: opacity .2s ease; pointer-events: none; }
      .homepage-publication-card:hover .homepage-publication-hover { opacity: 1; }
      .homepage-publication-content { padding: 1.25rem; display: flex; flex-direction: column; gap: .75rem; }
      .homepage-publication-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
      .homepage-publication-title { margin: 0; color: rgb(17 24 39); font-size: 1.125rem; line-height: 1.35; font-weight: 800; transition: color .2s ease; }
      .homepage-publication-toggle { flex: none; color: rgb(148 163 184); border-radius: 9999px; padding: .15rem .25rem; font-size: 1.15rem; line-height: 1; }
      .homepage-publication-authors { color: rgb(71 85 105); font-size: .875rem; line-height: 1.55; }
      .homepage-publication-authors strong { color: rgb(17 24 39); text-decoration: underline; text-decoration-color: rgba(168,85,247,.35); }
      .homepage-publication-meta { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem .75rem; }
      .homepage-publication-venue { border: 1px solid rgb(229 231 235); background: rgb(243 244 246); color: rgb(55 65 81); border-radius: .375rem; padding: .25rem .5rem; font-size: .75rem; font-weight: 800; }
      .homepage-publication-fullvenue { color: rgb(100 116 139); font-size: .75rem; font-style: italic; font-weight: 500; }
      .homepage-publication-year { color: rgb(100 116 139); background: rgba(0,0,0,.1); border-radius: .25rem; padding: .125rem .375rem; font: 600 .625rem ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
      .homepage-publication-summary { color: rgb(100 116 139); font-size: .875rem; line-height: 1.55; font-style: italic; border-left: 2px solid rgb(233 213 255); padding-left: .75rem; }
      .homepage-publication-keywords { display: flex; flex-wrap: wrap; gap: .5rem; }
      .homepage-publication-keywords span { border: 1px solid rgb(243 244 246); background: rgb(249 250 251); color: rgb(156 163 175); border-radius: .25rem; padding: .125rem .375rem; font-size: .625rem; }
      .homepage-publication-actions { display: flex; gap: .75rem; padding-top: .5rem; }
      .homepage-publication-link { display: inline-flex; align-items: center; gap: .375rem; border: 1px solid rgb(219 234 254); background: rgb(239 246 255); color: rgb(37 99 235); border-radius: .5rem; padding: .375rem .75rem; font-size: .75rem; font-weight: 700; text-decoration: none; transition: all .2s ease; }
      .homepage-publication-link:hover { background: rgb(219 234 254); }
      .homepage-dynamic-venue-button { border: 1px solid rgb(229 231 235) !important; background: white !important; color: rgb(75 85 99) !important; border-radius: .5rem !important; padding: .375rem .75rem !important; font-size: .75rem !important; font-weight: 800 !important; transition: all .2s ease !important; }
      .homepage-dynamic-venue-button:hover { background: rgb(249 250 251) !important; }
      .homepage-visitor-map { margin-bottom: 4rem; border: 1px solid rgb(229 231 235); border-radius: 1.5rem; overflow: hidden; background: white; box-shadow: 0 18px 45px rgba(59,130,246,.06); }
      .homepage-visitor-head { padding: 1.5rem 1.75rem; border-bottom: 1px solid rgb(243 244 246); display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
      .homepage-visitor-title { display: flex; align-items: center; gap: 1rem; }
      .homepage-visitor-icon { width: 3rem; height: 3rem; border-radius: .75rem; display: grid; place-items: center; background: rgb(239 246 255); color: rgb(37 99 235); font-size: 1.35rem; }
      .homepage-visitor-title h2 { margin: 0; color: rgb(17 24 39); font-size: 1.5rem; line-height: 1.2; font-weight: 800; }
      .homepage-visitor-title p { margin: .25rem 0 0 0; color: rgb(100 116 139); font-size: .9rem; }
      .homepage-visitor-action { display: inline-flex; align-items: center; border: 1px solid rgb(226 232 240); border-radius: 9999px; padding: .55rem .9rem; color: rgb(71 85 105); font-size: .75rem; font-weight: 800; text-decoration: none; transition: all .2s ease; }
      .homepage-visitor-action:hover { color: rgb(37 99 235); border-color: rgb(191 219 254); }
      .homepage-visitor-body { padding: 1.25rem; background: rgba(248,250,252,.76); }
      .homepage-visitor-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(17rem, .65fr); gap: 1rem; align-items: stretch; }
      .homepage-visitor-panel { display: flex; flex-direction: column; gap: .75rem; min-width: 0; }
      .homepage-visitor-panel-title { margin: 0; color: rgb(51 65 85); font-size: .72rem; line-height: 1.2; text-transform: uppercase; letter-spacing: .06em; font-weight: 900; }
      .homepage-visitor-frame { position: relative; display: flex; align-items: center; justify-content: center; border: 1px solid rgb(241 245 249); border-radius: 1rem; padding: 1rem; background: white; transition: all .2s ease; min-height: 8.5rem; text-decoration: none; }
      .homepage-visitor-map-frame { min-height: 15rem; padding: 0; overflow: hidden; }
      .homepage-visitor-frame:hover { border-color: rgb(191 219 254); box-shadow: 0 10px 28px rgba(15,23,42,.08); }
      .homepage-visitor-ranking { display: flex; align-items: center; justify-content: center; min-height: 100%; }
      .homepage-world-map { position: relative; width: 100%; aspect-ratio: 2.18 / 1; min-height: 15rem; overflow: hidden; border-radius: 1rem; isolation: isolate; background: radial-gradient(circle at 18% 22%, rgba(34,211,238,.26), transparent 28%), radial-gradient(circle at 78% 32%, rgba(16,185,129,.22), transparent 24%), linear-gradient(135deg, rgb(9 21 43), rgb(13 31 55) 52%, rgb(8 41 49)); box-shadow: inset 0 0 0 1px rgba(148,163,184,.18), inset 0 -50px 90px rgba(2,6,23,.28); }
      .homepage-world-map::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: .34; background-image: linear-gradient(rgba(125,211,252,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.12) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(circle at center, black 42%, transparent 82%); }
      .homepage-world-map::after { content: ""; position: absolute; inset: -30% -55%; z-index: 5; pointer-events: none; background: linear-gradient(100deg, transparent 40%, rgba(125,211,252,.18) 48%, rgba(16,185,129,.18) 51%, transparent 60%); transform: translateX(-35%); animation: homepage-map-scan 7s ease-in-out infinite; }
      .homepage-world-map svg { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; }
      .homepage-map-ocean-grid { opacity: .22; color: rgb(125 211 252); }
      .homepage-map-graticule { fill: none; stroke: rgba(125,211,252,.18); stroke-width: .8; stroke-dasharray: 2 9; }
      .homepage-map-country { fill: rgba(148,163,184,.24); stroke: rgba(191,219,254,.18); stroke-width: .45; vector-effect: non-scaling-stroke; transition: fill .2s ease; }
      .homepage-map-country-active { fill: rgba(34,211,238,.48); stroke: rgba(125,211,252,.86); stroke-width: .95; vector-effect: non-scaling-stroke; filter: drop-shadow(0 0 7px rgba(34,211,238,.75)); animation: homepage-map-country-glow 3.5s ease-in-out infinite; animation-delay: calc(var(--delay) * 1s); }
      .homepage-map-borders { fill: none; stroke: rgba(240,249,255,.2); stroke-width: .55; vector-effect: non-scaling-stroke; }
      .homepage-map-route { fill: none; stroke: rgba(45,212,191,.38); stroke-width: 1.2; stroke-dasharray: 5 8; vector-effect: non-scaling-stroke; animation: homepage-map-dash 7s linear infinite; }
      .homepage-map-region { position: absolute; z-index: 3; left: calc(var(--x) * 1%); top: calc(var(--y) * 1%); width: calc(var(--rx) * 1%); height: calc(var(--ry) * 1%); transform: translate(-50%, -50%); border-radius: 9999px; background: radial-gradient(circle, rgba(34,211,238,.72) 0%, rgba(16,185,129,.48) 34%, transparent 72%); mix-blend-mode: screen; filter: blur(2px); opacity: .76; animation: homepage-map-region-pulse 3.2s ease-in-out infinite; animation-delay: calc(var(--delay) * 1s); }
      .homepage-map-marker { position: absolute; z-index: 4; left: calc(var(--x) * 1%); top: calc(var(--y) * 1%); transform: translate(-50%, -50%); display: flex; align-items: center; gap: .4rem; color: rgb(224 242 254); font-size: .65rem; font-weight: 900; letter-spacing: .04em; animation: homepage-map-marker-float 4.5s ease-in-out infinite; animation-delay: calc(var(--delay) * 1s); }
      .homepage-map-marker::before { content: ""; width: .68rem; height: .68rem; border-radius: 9999px; background: rgb(34 211 238); box-shadow: 0 0 0 .25rem rgba(34,211,238,.22), 0 0 0 .52rem rgba(16,185,129,.12), 0 0 22px rgba(34,211,238,.88); }
      .homepage-map-marker::after { content: ""; position: absolute; left: .34rem; top: 50%; width: 1.9rem; height: 1.9rem; border: 1px solid rgba(45,212,191,.55); border-radius: 9999px; transform: translate(-50%, -50%); animation: homepage-map-ripple 2.8s ease-out infinite; animation-delay: calc(var(--delay) * 1s); }
      .homepage-map-marker span { display: inline-flex; align-items: baseline; gap: .28rem; border: 1px solid rgba(125,211,252,.36); background: rgba(15,23,42,.68); color: rgb(224 242 254); border-radius: 9999px; padding: .22rem .5rem; box-shadow: 0 10px 28px rgba(2,6,23,.22); backdrop-filter: blur(10px); }
      .homepage-map-marker strong { font-size: .66rem; color: rgb(125 211 252); }
      .homepage-map-marker em { font-style: normal; color: rgb(187 247 208); }
      .homepage-map-label { position: absolute; z-index: 4; left: 1rem; top: 1rem; display: grid; gap: .18rem; color: rgb(186 230 253); font-size: .65rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
      .homepage-map-label span { color: rgba(203,213,225,.76); font: 600 .62rem ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; letter-spacing: .04em; text-transform: none; }
      .homepage-map-summary { position: absolute; z-index: 4; left: 1rem; bottom: 1rem; display: flex; flex-wrap: wrap; gap: .5rem; }
      .homepage-world-map .homepage-map-summary span { border-color: rgba(125,211,252,.32); background: rgba(15,23,42,.64); color: rgb(224 242 254); box-shadow: 0 8px 24px rgba(2,6,23,.2); backdrop-filter: blur(10px); }
      .homepage-visitor-snapshot { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-top: .1rem; }
      .homepage-visitor-snapshot span { border: 1px solid rgb(226 232 240); background: rgb(248 250 252); color: rgb(51 65 85); border-radius: 9999px; padding: .25rem .55rem; font-size: .72rem; font-weight: 800; }
      .homepage-visitor-country-list { display: grid; gap: .5rem; width: 100%; }
      .homepage-visitor-country-list div { display: grid; grid-template-columns: 2.6rem minmax(0, 1fr) auto; align-items: center; gap: .55rem; border: 1px solid rgb(226 232 240); border-radius: .75rem; padding: .5rem .65rem; background: rgb(248 250 252); }
      .homepage-visitor-country-code { color: rgb(37 99 235); font-size: .75rem; font-weight: 900; letter-spacing: .04em; }
      .homepage-visitor-country-name { color: rgb(51 65 85); font-size: .78rem; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .homepage-visitor-country-count { color: rgb(15 23 42); font-size: .8rem; font-weight: 900; }
      .homepage-visitor-tracker { position: absolute !important; left: -9999px !important; top: auto !important; width: 1px !important; height: 1px !important; opacity: 0 !important; pointer-events: none !important; }
      .homepage-visitor-note { margin: 1rem 0 0 0; text-align: center; color: rgb(100 116 139); font-size: .75rem; line-height: 1.5; }
      @keyframes homepage-map-scan { 0%, 18% { transform: translateX(-35%); opacity: 0; } 42%, 70% { opacity: .95; } 100% { transform: translateX(45%); opacity: 0; } }
      @keyframes homepage-map-dash { to { stroke-dashoffset: -120; } }
      @keyframes homepage-map-country-glow { 0%, 100% { opacity: .78; } 50% { opacity: 1; } }
      @keyframes homepage-map-region-pulse { 0%, 100% { opacity: .5; transform: translate(-50%, -50%) scale(.9); } 50% { opacity: .95; transform: translate(-50%, -50%) scale(1.12); } }
      @keyframes homepage-map-marker-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -3px; } }
      @keyframes homepage-map-ripple { 0% { opacity: .75; scale: .6; } 100% { opacity: 0; scale: 1.9; } }
      @media (prefers-reduced-motion: reduce) {
        .homepage-world-map::after,
        .homepage-map-route,
        .homepage-map-country-active,
        .homepage-map-region,
        .homepage-map-marker,
        .homepage-map-marker::after { animation: none; }
      }
      body.homepage-dynamic-dark .homepage-inline-card,
      body.homepage-dynamic-dark .homepage-visitor-map { background: rgba(15,23,42,.5); border-color: rgb(51 65 85); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-inline-title,
      body.homepage-dynamic-dark .homepage-visitor-title h2 { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-inline-authors,
      body.homepage-dynamic-dark .homepage-inline-summary,
      body.homepage-dynamic-dark .homepage-visitor-title p,
      body.homepage-dynamic-dark .homepage-visitor-note { color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-inline-keywords span { background: rgba(30,41,59,.8); color: rgb(203 213 225); border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-publication-card { background: rgba(30,41,59,.4); border-color: rgba(51,65,85,.5); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-publication-card:hover { border-color: rgba(168,85,247,.35); }
      body.homepage-dynamic-dark .homepage-publication-title { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-publication-card:hover .homepage-publication-title { color: rgb(192 132 252); }
      body.homepage-dynamic-dark .homepage-publication-authors,
      body.homepage-dynamic-dark .homepage-publication-fullvenue,
      body.homepage-dynamic-dark .homepage-publication-summary { color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-publication-authors strong { color: rgb(226 232 240); }
      body.homepage-dynamic-dark .homepage-publication-venue { background: rgba(51,65,85,.5); border-color: rgb(71 85 105); color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-publication-year { background: rgba(255,255,255,.1); color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-publication-summary { border-color: rgb(71 85 105); }
      body.homepage-dynamic-dark .homepage-publication-keywords span { border-color: rgb(51 65 85); color: rgb(100 116 139); background: transparent; }
      body.homepage-dynamic-dark .homepage-dynamic-venue-button { background: rgb(30 41 59) !important; border-color: rgb(51 65 85) !important; color: rgb(148 163 184) !important; }
      body.homepage-dynamic-dark .homepage-dynamic-venue-button:hover { background: rgb(51 65 85) !important; color: rgb(203 213 225) !important; }
      body.homepage-dynamic-dark .homepage-visitor-head { border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-icon { background: rgba(30,64,175,.28); color: rgb(96 165 250); }
      body.homepage-dynamic-dark .homepage-visitor-action { background: rgba(15,23,42,.6); border-color: rgb(51 65 85); color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-visitor-body { background: rgba(15,23,42,.24); }
      body.homepage-dynamic-dark .homepage-visitor-frame { background: rgba(2,6,23,.36); border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-panel-title { color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-visitor-country-count { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-world-map { background: radial-gradient(circle at 18% 22%, rgba(34,211,238,.22), transparent 28%), radial-gradient(circle at 78% 32%, rgba(16,185,129,.18), transparent 24%), linear-gradient(135deg, rgb(2 6 23), rgb(15 23 42) 52%, rgb(6 35 43)); }
      body.homepage-dynamic-dark .homepage-map-country { fill: rgba(59,130,246,.2); stroke: rgba(147,197,253,.16); }
      body.homepage-dynamic-dark .homepage-map-country-active { fill: rgba(34,211,238,.42); stroke: rgba(125,211,252,.7); }
      body.homepage-dynamic-dark .homepage-map-route { stroke: rgba(45,212,191,.34); }
      body.homepage-dynamic-dark .homepage-map-marker span { background: rgba(2,6,23,.72); border-color: rgba(125,211,252,.28); }
      body.homepage-dynamic-dark .homepage-visitor-snapshot span,
      body.homepage-dynamic-dark .homepage-visitor-country-list div { background: rgba(30,41,59,.55); border-color: rgb(51 65 85); color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-visitor-country-code { color: rgb(96 165 250); }
      body.homepage-dynamic-dark .homepage-visitor-country-name { color: rgb(203 213 225); }
      @media (max-width: 640px) {
        .homepage-visitor-head { padding: 1.25rem; align-items: flex-start; flex-direction: column; }
        .homepage-visitor-title h2 { font-size: 1.25rem; }
        .homepage-visitor-grid { grid-template-columns: 1fr; }
        .homepage-world-map { min-height: 12rem; }
        .homepage-map-marker span { display: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function syncDarkModeFlag() {
    const root = document.querySelector('#root > div');
    document.body.classList.toggle('homepage-dynamic-dark', !!root && root.className.includes('bg-[#0b1121]'));
  }

  function installDarkModeObserver() {
    if (darkModeObserver || document.body.dataset.homepageDarkObserver === 'true') return;
    const root = document.querySelector('#root > div');
    if (!root || typeof MutationObserver === 'undefined') return;
    syncDarkModeFlag();
    darkModeObserver = new MutationObserver(syncDarkModeFlag);
    darkModeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
    document.body.dataset.homepageDarkObserver = 'true';
  }

  function createNewsItem(item) {
    const row = document.createElement('div');
    row.dataset.homepageUpdate = item.key;
    row.className = 'flex gap-3 text-sm items-start';
    row.innerHTML = `
      <span class="font-mono font-semibold opacity-50 whitespace-nowrap shrink-0">${item.date}</span>
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-1">
        <span class="text-xs font-bold px-2 py-0.5 rounded w-fit shrink-0 bg-purple-100 text-purple-700">${item.label}</span>
        <a href="${item.href}" target="_blank" rel="noreferrer" class="hover:underline decoration-1 underline-offset-2 flex items-start gap-1 group">
          <span>${item.html}</span>
          <span style="font-size:10px;opacity:.55;margin-top:1px">↗</span>
        </a>
      </div>
    `;
    return row;
  }

  function patchNews() {
    const newsList = document.querySelector('#news .space-y-2, #news .divide-y');
    if (!newsList) return false;
    [...EXTRA_NEWS].reverse().forEach(item => {
      if (!newsList.textContent.includes(item.title)) newsList.prepend(createNewsItem(item));
    });
    return true;
  }

  function createPublicationCard(pub) {
    const card = document.createElement('article');
    const highlightedAuthors = pub.authors
      .split(',')
      .map(author => {
        const trimmed = author.trim();
        return trimmed === 'Aimin Li' ? `<strong>${trimmed}</strong>` : trimmed;
      })
      .join(', ');

    card.className = 'homepage-publication-card';
    card.dataset.homepagePublication = pub.key;
    card.addEventListener('click', () => window.open(pub.href, '_blank', 'noopener,noreferrer'));
    card.innerHTML = `
      <div class="homepage-publication-hover">↗</div>
      <div class="homepage-publication-content">
        <div class="homepage-publication-head">
          <h3 class="homepage-publication-title">${pub.title}</h3>
          <div class="homepage-publication-toggle" aria-hidden="true">⌄</div>
        </div>
        <div class="homepage-publication-authors">${highlightedAuthors}</div>
        <div class="homepage-publication-meta">
          <span class="homepage-publication-venue">${pub.shortVenue}</span>
          <span class="homepage-publication-fullvenue">${pub.venue}</span>
          <span class="homepage-publication-year">${pub.year}</span>
        </div>
        <div class="homepage-publication-summary">"${pub.summary}"</div>
        <div class="homepage-publication-keywords">${pub.keywords.slice(0, 3).map(keyword => `<span>#${keyword}</span>`).join('')}</div>
        <div class="homepage-publication-actions" onclick="event.stopPropagation()">
          <a class="homepage-publication-link" href="${pub.href}" target="_blank" rel="noreferrer">Link ↗</a>
        </div>
      </div>
    `;
    return card;
  }

  function patchFilterCounts(section) {
    const buttons = [...section.querySelectorAll('button')];
    const allButton = buttons.find(button => /^All Papers/.test(button.textContent.trim()));
    if (allButton) allButton.textContent = `All Papers (${TOTAL_PUBLICATIONS})`;

    const venueCounts = {
      'IEEE ISIT': 2,
      'IEEE VTC-Spring': 2,
      'IEEE TMC': 1,
      'IEEE IoTJ': 1
    };
    const venueRow = allButton?.parentElement;
    const dynamicVenueClass = 'homepage-dynamic-venue-button';
    Object.entries(venueCounts).forEach(([venue, count]) => {
      const existing = [...section.querySelectorAll('button')].find(button => button.textContent.trim().replace(/\s*\(\d+\)\s*$/, '') === venue);
      if (existing) {
        existing.textContent = `${venue} (${count})`;
        if (venue === 'IEEE TMC' || venue === 'IEEE IoTJ') {
          existing.className = dynamicVenueClass;
          existing.dataset.homepageVenueButton = venue;
        }
      } else if (venueRow) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${venue} (${count})`;
        button.className = dynamicVenueClass;
        button.dataset.homepageVenueButton = venue;
        venueRow.appendChild(button);
      }
    });
  }

  function patchPublications() {
    const section = document.querySelector('#publications');
    if (!section) return false;
    patchFilterCounts(section);

    const grid = [...section.querySelectorAll('.grid.gap-6')].pop();
    if (!grid) return false;

    const missing = EXTRA_PUBLICATIONS.filter(pub => !section.textContent.includes(pub.title));
    missing.reverse().forEach(pub => grid.prepend(createPublicationCard(pub)));
    return true;
  }

  function createVisitorCountryRows() {
    return VISITOR_SNAPSHOT.ranking.map(country => `
      <div>
        <span class="homepage-visitor-country-code">${country.code}</span>
        <span class="homepage-visitor-country-name">${country.name}</span>
        <span class="homepage-visitor-country-count">${country.count}</span>
      </div>
    `).join('');
  }

  function createVisitorSnapshotPills() {
    return `
      <span>${VISITOR_SNAPSHOT.pageviews} pageviews</span>
      <span>${VISITOR_SNAPSHOT.countries} countries</span>
    `;
  }

  function getVisitorWorldMapData() {
    return window.HOMEPAGE_VISITOR_WORLD_MAP || null;
  }

  function escapeMapAttr(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function getVisitorActiveCountries() {
    const mapData = getVisitorWorldMapData();
    if (!mapData?.activeCountries?.length) {
      return VISITOR_SNAPSHOT.ranking.map(country => ({
        ...country,
        x: 720 * country.x / 100,
        y: 330 * country.y / 100,
        d: ''
      }));
    }
    return mapData.activeCountries;
  }

  function createVisitorCountryPaths(mapData) {
    if (!mapData?.countries?.length) return '';
    return mapData.countries.map(country => `
      <path class="homepage-map-country" d="${country.d}" data-country-id="${escapeMapAttr(country.id)}">
        <title>${escapeMapAttr(country.name)}</title>
      </path>
    `).join('');
  }

  function createVisitorActiveCountryPaths() {
    return getVisitorActiveCountries()
      .filter(country => country.d)
      .map(country => `
        <path class="homepage-map-country-active" d="${country.d}" style="--delay: ${country.delay || 0}">
          <title>${escapeMapAttr(country.name)}: ${country.count} visits</title>
        </path>
      `).join('');
  }

  function createVisitorRoutePaths() {
    const active = getVisitorActiveCountries();
    const byCode = new Map(active.map(country => [country.code, country]));
    const source = byCode.get('TR') || active[0];
    if (!source) return '';
    return active
      .filter(country => country.code !== source.code)
      .map(country => {
        const midX = (source.x + country.x) / 2;
        const lift = Math.max(22, Math.abs(source.x - country.x) * 0.11);
        const midY = Math.min(source.y, country.y) - lift;
        return `<path class="homepage-map-route" d="M${source.x},${source.y} Q${midX.toFixed(1)},${midY.toFixed(1)} ${country.x},${country.y}" />`;
      })
      .join('');
  }

  function createVisitorRegions() {
    const mapData = getVisitorWorldMapData();
    const viewBox = mapData?.viewBox || { width: 720, height: 330 };
    return getVisitorActiveCountries().map(country => `
      <div class="homepage-map-region" style="--x: ${(country.x / viewBox.width * 100).toFixed(2)}; --y: ${(country.y / viewBox.height * 100).toFixed(2)}; --rx: ${country.code === 'US' ? 13 : country.code === 'CN' ? 10 : 5}; --ry: ${country.code === 'US' ? 8 : country.code === 'CN' ? 7 : 4}; --delay: ${country.delay || 0}"></div>
    `).join('');
  }

  function createVisitorMarkers() {
    const mapData = getVisitorWorldMapData();
    const viewBox = mapData?.viewBox || { width: 720, height: 330 };
    return getVisitorActiveCountries().map(country => `
      <div class="homepage-map-marker" style="--x: ${(country.x / viewBox.width * 100).toFixed(2)}; --y: ${(country.y / viewBox.height * 100).toFixed(2)}; --delay: ${country.delay || 0}">
        <span><strong>${country.code}</strong><em>${country.count}</em></span>
      </div>
    `).join('');
  }

  function createVisitorWorldMap() {
    const mapData = getVisitorWorldMapData();
    const viewBox = mapData?.viewBox || { width: 720, height: 330 };
    return `
      <div class="homepage-world-map">
        <svg viewBox="0 0 ${viewBox.width} ${viewBox.height}" role="img" aria-label="World map visitor snapshot" focusable="false">
          <defs>
            <pattern id="homepage-map-grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M42 0H0V42" fill="none" stroke="currentColor" stroke-width="1" />
            </pattern>
          </defs>
          <rect class="homepage-map-ocean-grid" width="${viewBox.width}" height="${viewBox.height}" fill="url(#homepage-map-grid)" />
          <path class="homepage-map-graticule" d="M0 ${viewBox.height * .25}H${viewBox.width}M0 ${viewBox.height * .5}H${viewBox.width}M0 ${viewBox.height * .75}H${viewBox.width}M${viewBox.width / 6} 0V${viewBox.height}M${viewBox.width / 3} 0V${viewBox.height}M${viewBox.width / 2} 0V${viewBox.height}M${viewBox.width * 2 / 3} 0V${viewBox.height}M${viewBox.width * 5 / 6} 0V${viewBox.height}" />
          <g class="homepage-map-countries">${createVisitorCountryPaths(mapData)}</g>
          ${mapData?.borders ? `<path class="homepage-map-borders" d="${mapData.borders}" />` : ''}
          <g class="homepage-map-active-countries">${createVisitorActiveCountryPaths()}</g>
          <g class="homepage-map-routes">${createVisitorRoutePaths()}</g>
        </svg>
        ${createVisitorRegions()}
        ${createVisitorMarkers()}
        <div class="homepage-map-label">Active visitor regions<span>aggregate country-level signal</span></div>
        <div class="homepage-map-summary homepage-visitor-snapshot">${createVisitorSnapshotPills()}</div>
      </div>
    `;
  }

  function insertVisitorMap() {
    const footer = document.querySelector('footer');
    if (!footer || document.querySelector('[data-homepage-visitor-map]')) return !!footer;
    const section = document.createElement('section');
    section.dataset.homepageVisitorMap = 'true';
    section.className = 'homepage-visitor-map';
    section.innerHTML = `
      <div class="homepage-visitor-head">
        <div class="homepage-visitor-title">
          <div class="homepage-visitor-icon" aria-hidden="true">◎</div>
          <div>
            <h2>Global Visitors</h2>
            <p>Approximate visitor locations by country.</p>
          </div>
        </div>
        <a class="homepage-visitor-action" href="${VISITOR_MAP_STATS_URL}" target="_blank" rel="noreferrer">View Stats</a>
      </div>
      <div class="homepage-visitor-body">
        <div class="homepage-visitor-grid">
          <div class="homepage-visitor-panel">
            <h3 class="homepage-visitor-panel-title">Visitor Map</h3>
            <a class="homepage-visitor-frame homepage-visitor-map-frame" href="${VISITOR_MAP_STATS_URL}" target="_blank" rel="noreferrer" aria-label="Open global visitor statistics">
              ${createVisitorWorldMap()}
              <img class="homepage-visitor-tracker" src="${VISITOR_MAP_IMAGE_URL}" alt="" loading="eager" decoding="async" width="1" height="1" referrerpolicy="no-referrer" aria-hidden="true" />
            </a>
          </div>
          <div class="homepage-visitor-panel">
            <h3 class="homepage-visitor-panel-title">Top Visitor Countries</h3>
            <a class="homepage-visitor-frame homepage-visitor-ranking" href="${VISITOR_MAP_STATS_URL}" target="_blank" rel="noreferrer" aria-label="Open visitor country ranking">
              <div class="homepage-visitor-country-list">${createVisitorCountryRows()}</div>
              <img class="homepage-visitor-tracker" src="${VISITOR_RANKING_IMAGE_URL}" alt="" loading="eager" decoding="async" width="1" height="1" referrerpolicy="no-referrer" aria-hidden="true" />
            </a>
          </div>
        </div>
        <p class="homepage-visitor-note">Visitor countries are estimated by FlagCounter for aggregate statistics; individual identities are not shown here. View Stats opens the live counter page.</p>
      </div>
    `;
    footer.parentElement.insertBefore(section, footer);
    return true;
  }

  function apply() {
    addStyles();
    syncDarkModeFlag();
    installDarkModeObserver();
    const newsReady = patchNews();
    const publicationsReady = patchPublications();
    const visitorReady = insertVisitorMap();
    return newsReady && publicationsReady && visitorReady;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (apply() || attempts > 40) clearInterval(timer);
  }, 250);
})();
