(() => {
  const VISITOR_MAP_STATS_URL = 'https://info.flagcounter.com/Ad32';
  const VISITOR_MAP_IMAGE_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/?v=20260609c';
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
    const newsList = document.querySelector('#news .space-y-2');
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
    installDarkModeObserver();
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
