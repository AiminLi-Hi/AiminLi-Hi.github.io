(() => {
  const VISITOR_MAP_STATS_URL = 'https://info.flagcounter.com/Ad32';
  const VISITOR_MAP_IMAGE_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/?v=20260609c';
  const TOTAL_PUBLICATIONS = 33;

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
      label: 'VTC 2026',
      title: 'Capacity Analysis of Weibull Fading Channels for Satellite-Ground Integrated Communications',
      html: 'Paper titled <strong>Capacity Analysis of Weibull Fading Channels for Satellite-Ground Integrated Communications</strong> was accepted by <strong>IEEE VTC2026-Spring</strong>.',
      href: 'https://events.vtsociety.org/vtc2026-spring/conference-sessions/workshops-currently-available/w2-2nd-international-workshop-on-intelligent-aerial-and-spaceborne-systems-for-6g-6g-saga-communication-sensing-and-autonomy-for-mobility/'
    },
    {
      key: 'isit-heavy-tail-2026',
      date: '2026-01',
      label: 'ISIT 2026',
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
      .homepage-visitor-map { margin-bottom: 4rem; border: 1px solid rgb(229 231 235); border-radius: 1.5rem; overflow: hidden; background: white; box-shadow: 0 18px 45px rgba(59,130,246,.06); }
      .homepage-visitor-head { padding: 1.5rem 1.75rem; border-bottom: 1px solid rgb(243 244 246); display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
      .homepage-visitor-title { display: flex; align-items: center; gap: 1rem; }
      .homepage-visitor-icon { width: 3rem; height: 3rem; border-radius: .75rem; display: grid; place-items: center; background: rgb(239 246 255); color: rgb(37 99 235); font-size: 1.35rem; }
      .homepage-visitor-title h2 { margin: 0; color: rgb(17 24 39); font-size: 1.5rem; line-height: 1.2; font-weight: 800; }
      .homepage-visitor-title p { margin: .25rem 0 0 0; color: rgb(100 116 139); font-size: .9rem; }
      .homepage-visitor-action { display: inline-flex; align-items: center; border: 1px solid rgb(226 232 240); border-radius: 9999px; padding: .55rem .9rem; color: rgb(71 85 105); font-size: .75rem; font-weight: 800; text-decoration: none; transition: all .2s ease; }
      .homepage-visitor-action:hover { color: rgb(37 99 235); border-color: rgb(191 219 254); }
      .homepage-visitor-body { padding: 1.25rem; background: rgba(248,250,252,.76); }
      .homepage-visitor-frame { display: block; border: 1px solid rgb(241 245 249); border-radius: 1rem; padding: 1rem; background: white; transition: all .2s ease; }
      .homepage-visitor-frame:hover { border-color: rgb(191 219 254); box-shadow: 0 10px 28px rgba(15,23,42,.08); }
      .homepage-visitor-frame img { display: block; max-width: 100%; height: auto; margin: 0 auto; border-radius: .75rem; }
      .homepage-visitor-note { margin: 1rem 0 0 0; text-align: center; color: rgb(100 116 139); font-size: .75rem; line-height: 1.5; }
      body.homepage-dynamic-dark .homepage-inline-card,
      body.homepage-dynamic-dark .homepage-visitor-map { background: rgba(15,23,42,.5); border-color: rgb(51 65 85); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-inline-title,
      body.homepage-dynamic-dark .homepage-visitor-title h2 { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-inline-authors,
      body.homepage-dynamic-dark .homepage-inline-summary,
      body.homepage-dynamic-dark .homepage-visitor-title p,
      body.homepage-dynamic-dark .homepage-visitor-note { color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-inline-keywords span { background: rgba(30,41,59,.8); color: rgb(203 213 225); border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-head { border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-icon { background: rgba(30,64,175,.28); color: rgb(96 165 250); }
      body.homepage-dynamic-dark .homepage-visitor-action { background: rgba(15,23,42,.6); border-color: rgb(51 65 85); color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-visitor-body { background: rgba(15,23,42,.24); }
      body.homepage-dynamic-dark .homepage-visitor-frame { background: rgba(2,6,23,.36); border-color: rgb(51 65 85); }
      @media (max-width: 640px) {
        .homepage-visitor-head { padding: 1.25rem; align-items: flex-start; flex-direction: column; }
        .homepage-visitor-title h2 { font-size: 1.25rem; }
      }
    `;
    document.head.appendChild(style);
  }

  function syncDarkModeFlag() {
    const root = document.querySelector('#root > div');
    document.body.classList.toggle('homepage-dynamic-dark', !!root && root.className.includes('bg-[#0b1121]'));
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
    const newsList = document.querySelector('#news .space-y-2');
    if (!newsList) return false;
    [...EXTRA_NEWS].reverse().forEach(item => {
      if (!newsList.textContent.includes(item.title)) newsList.prepend(createNewsItem(item));
    });
    return true;
  }

  function createPublicationCard(pub) {
    const card = document.createElement('article');
    card.className = 'homepage-inline-card';
    card.dataset.homepagePublication = pub.key;
    card.addEventListener('click', () => window.open(pub.href, '_blank', 'noopener,noreferrer'));
    card.innerHTML = `
      <div class="homepage-inline-meta">
        <span class="homepage-inline-year">${pub.year}</span>
        <span class="homepage-inline-pill">${pub.shortVenue}</span>
        <span class="homepage-inline-pill">${pub.type}</span>
        <span class="homepage-inline-pill">${pub.tag}</span>
      </div>
      <h3 class="homepage-inline-title"><a href="${pub.href}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()">${pub.title}</a></h3>
      <div class="homepage-inline-authors">${pub.authors}</div>
      <div class="homepage-inline-summary">${pub.summary}</div>
      <div class="homepage-inline-keywords">${pub.keywords.map(keyword => `<span>${keyword}</span>`).join('')}</div>
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
    Object.entries(venueCounts).forEach(([venue, count]) => {
      const existing = [...section.querySelectorAll('button')].find(button => button.textContent.trim().replace(/\s*\(\d+\)\s*$/, '') === venue);
      if (existing) {
        existing.textContent = `${venue} (${count})`;
      } else if (venueRow) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `${venue} (${count})`;
        button.className = allButton?.className || 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-white border-gray-200 text-gray-600 hover:bg-gray-50';
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
        <a class="homepage-visitor-frame" href="${VISITOR_MAP_STATS_URL}" target="_blank" rel="noreferrer" aria-label="Open global visitor statistics">
          <img src="${VISITOR_MAP_IMAGE_URL}" alt="Global visitor map" loading="eager" decoding="async" width="600" height="291" referrerpolicy="no-referrer" />
        </a>
        <p class="homepage-visitor-note">Visitor countries are estimated by FlagCounter for aggregate statistics; individual identities are not shown here.</p>
      </div>
    `;
    footer.parentElement.insertBefore(section, footer);
    return true;
  }

  function apply() {
    addStyles();
    syncDarkModeFlag();
    return patchNews() && patchPublications() && insertVisitorMap();
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
