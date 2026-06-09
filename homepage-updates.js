(() => {
  const EXTRA_NEWS = [
    {
      key: 'tmc-uav-marl-2026',
      date: '2026-06',
      label: 'TMC',
      html: 'Paper titled <strong>AoI-Aware Joint Sampling-Buffering-Routing Optimization for Autonomous UAV Swarms via a MARL Approach</strong> was accepted by <strong>IEEE Transactions on Mobile Computing (TMC)</strong>.',
      href: 'https://ieeexplore.ieee.org/abstract/document/11547874/'
    },
    {
      key: 'isit-heavy-tail-2026',
      date: '2026',
      label: 'ISIT 2026',
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
      summary: 'Studies AoI-aware joint sampling, buffering, and routing optimization for autonomous UAV swarms using a multi-agent reinforcement learning approach.',
      href: 'https://ieeexplore.ieee.org/abstract/document/11547874/'
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
      summary: 'Develops an age-optimal sampling-and-preemption framework for general, especially heavy-tailed, service-time distributions.',
      href: 'https://arxiv.org/abs/2601.16624'
    }
  ];

  const COUNTS = {
    total: 31,
    venues: {
      'IEEE ISIT': 2,
      'IEEE TMC': 1
    }
  };

  const VISITOR_MAP_STATS_URL = 'https://info.flagcounter.com/Ad32';
  const VISITOR_MAP_IMAGE_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/';
  const EXTRA_KEYWORDS = Array.from(new Set(EXTRA_PUBLICATIONS.flatMap(pub => pub.keywords)));
  const CUSTOM_VENUES = new Set(['IEEE TMC']);
  const CUSTOM_KEYWORDS = new Set(['UAV Swarms', 'MARL', 'Routing', 'Preemption', 'Heavy-Tailed Delay', 'Impulse Control']);
  const state = { venue: 'All', keyword: 'All' };
  let lastPublicationSignature = '';

  function addStyles() {
    if (document.getElementById('homepage-dynamic-updates-style')) return;
    const style = document.createElement('style');
    style.id = 'homepage-dynamic-updates-style';
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
      .homepage-visitor-action { display: inline-flex; align-items: center; gap: .45rem; border: 1px solid rgb(226 232 240); border-radius: 9999px; padding: .55rem .9rem; color: rgb(71 85 105); font-size: .75rem; font-weight: 800; text-decoration: none; transition: all .2s ease; }
      .homepage-visitor-action:hover { color: rgb(37 99 235); border-color: rgb(191 219 254); }
      .homepage-visitor-body { padding: 1.25rem; background: rgba(248,250,252,.76); }
      .homepage-visitor-frame { display: block; border: 1px solid rgb(241 245 249); border-radius: 1rem; padding: 1rem; background: white; transition: all .2s ease; }
      .homepage-visitor-frame:hover { border-color: rgb(191 219 254); box-shadow: 0 10px 28px rgba(15,23,42,.08); }
      .homepage-visitor-frame img { display: block; max-width: 100%; height: auto; margin: 0 auto; border-radius: .75rem; }
      .homepage-visitor-note { margin: 1rem 0 0 0; text-align: center; color: rgb(100 116 139); font-size: .75rem; line-height: 1.5; }
      @media (max-width: 640px) {
        .homepage-visitor-head { padding: 1.25rem; align-items: flex-start; flex-direction: column; }
        .homepage-visitor-title h2 { font-size: 1.25rem; }
      }
      .homepage-filter-active { background: rgb(168 85 247) !important; border-color: rgb(168 85 247) !important; color: white !important; }
      body.homepage-dynamic-dark .homepage-inline-card { background: rgba(15,23,42,.62); border-color: rgb(51 65 85); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-inline-title { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-inline-title a:hover { color: rgb(52 211 153); }
      body.homepage-dynamic-dark .homepage-inline-authors { color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-inline-summary { color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-inline-pill { background: rgba(6,78,59,.45); color: rgb(110 231 183); border-color: rgb(6 95 70); }
      body.homepage-dynamic-dark .homepage-inline-keywords span { background: rgba(30,41,59,.8); color: rgb(203 213 225); border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-map { background: rgba(15,23,42,.5); border-color: rgb(51 65 85); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-visitor-head { border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-icon { background: rgba(30,64,175,.28); color: rgb(96 165 250); }
      body.homepage-dynamic-dark .homepage-visitor-title h2 { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-visitor-title p,
      body.homepage-dynamic-dark .homepage-visitor-note { color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-visitor-action { background: rgba(15,23,42,.6); border-color: rgb(51 65 85); color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-visitor-action:hover { color: white; border-color: rgb(59 130 246); }
      body.homepage-dynamic-dark .homepage-visitor-body { background: rgba(15,23,42,.24); }
      body.homepage-dynamic-dark .homepage-visitor-frame { background: rgba(2,6,23,.36); border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-frame:hover { border-color: rgb(59 130 246); box-shadow: none; }
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
      if (!newsList.querySelector(`[data-homepage-update="${item.key}"]`) && !newsList.textContent.includes(item.html.replace(/<[^>]+>/g, '').slice(0, 40))) {
        newsList.prepend(createNewsItem(item));
      }
    });
    return true;
  }

  function findPublicationsSection() {
    return document.querySelector('#publications');
  }

  function getVenueRow(section) {
    const allPapersButton = [...section.querySelectorAll('button')].find(btn => /^All Papers/.test(btn.textContent.trim()));
    return allPapersButton?.parentElement || null;
  }

  function getKeywordRow(section) {
    const keywordAllButton = [...section.querySelectorAll('button')].find(btn => btn.textContent.trim() === 'All');
    return keywordAllButton?.parentElement || null;
  }

  function parseVenueText(text) {
    return text.replace(/\s*\(\d+\)\s*$/, '').trim();
  }

  function makeFilterButton(label, sampleButton, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.className = sampleButton?.className || 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-white border-gray-200 text-gray-600 hover:bg-gray-50';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick();
      setTimeout(applyUpdates, 0);
    });
    return button;
  }

  function patchFilterButtons(section) {
    const buttons = [...section.querySelectorAll('button')];
    const allPapersButton = buttons.find(btn => /^All Papers/.test(btn.textContent.trim()));
    if (allPapersButton) allPapersButton.textContent = `All Papers (${COUNTS.total})`;

    const isitButton = buttons.find(btn => parseVenueText(btn.textContent.trim()) === 'IEEE ISIT');
    if (isitButton) isitButton.textContent = `IEEE ISIT (${COUNTS.venues['IEEE ISIT']})`;

    const venueRow = getVenueRow(section);
    if (venueRow && ![...venueRow.querySelectorAll('button')].some(btn => parseVenueText(btn.textContent.trim()) === 'IEEE TMC')) {
      const sample = [...venueRow.querySelectorAll('button')].find(btn => parseVenueText(btn.textContent.trim()) !== 'All Papers');
      const tmcButton = makeFilterButton(`IEEE TMC (${COUNTS.venues['IEEE TMC']})`, sample, () => { state.venue = 'IEEE TMC'; });
      tmcButton.dataset.homepageVenueButton = 'IEEE TMC';
      venueRow.appendChild(tmcButton);
    }

    const keywordRow = getKeywordRow(section);
    if (keywordRow) {
      const existing = new Set([...keywordRow.querySelectorAll('button')].map(btn => btn.textContent.trim()));
      const sample = [...keywordRow.querySelectorAll('button')].find(btn => btn.textContent.trim() !== 'All');
      EXTRA_KEYWORDS.forEach(keyword => {
        if (!existing.has(keyword)) {
          const keywordButton = makeFilterButton(keyword, sample, () => { state.keyword = keyword; });
          keywordButton.dataset.homepageKeywordButton = keyword;
          keywordRow.appendChild(keywordButton);
        }
      });
    }

    section.querySelectorAll('[data-homepage-venue-button], [data-homepage-keyword-button]').forEach(btn => {
      const isVenue = btn.dataset.homepageVenueButton && state.venue === btn.dataset.homepageVenueButton;
      const isKeyword = btn.dataset.homepageKeywordButton && state.keyword === btn.dataset.homepageKeywordButton;
      btn.classList.toggle('homepage-filter-active', !!(isVenue || isKeyword));
    });
  }

  function inferControlsFromDom(section) {
    const searchInput = section.querySelector('input[placeholder="Search titles or venues..."]');
    const query = (searchInput?.value || '').trim().toLowerCase();
    const sortButton = [...section.querySelectorAll('button')].find(btn => /Newest First|Oldest First/.test(btn.textContent));
    const newestFirst = !sortButton || sortButton.textContent.includes('Newest First');
    return { query, newestFirst };
  }

  function publicationMatches(pub, controls) {
    if (state.venue !== 'All' && pub.shortVenue !== state.venue) return false;
    if (state.keyword !== 'All' && !pub.keywords.includes(state.keyword)) return false;
    if (controls.query) {
      const haystack = `${pub.title} ${pub.venue} ${pub.shortVenue}`.toLowerCase();
      if (!haystack.includes(controls.query)) return false;
    }
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
      <div class="homepage-inline-keywords">${pub.keywords.map(k => `<span>${k}</span>`).join('')}</div>
    `;
    return card;
  }

  function getOtherPublicationGrid(section) {
    const grids = [...section.querySelectorAll('.grid.gap-6')];
    return grids[grids.length - 1] || null;
  }

  function setOriginalVisibility(section, hide) {
    const featuredBlock = section.querySelector('.space-y-4.animate-fade-in');
    if (featuredBlock) featuredBlock.style.display = hide ? 'none' : '';

    const grid = getOtherPublicationGrid(section);
    if (grid) {
      [...grid.children].forEach(child => {
        if (!child.dataset.homepagePublication) child.style.display = hide ? 'none' : '';
      });
    }

    [...section.querySelectorAll('div')].forEach(div => {
      if (div.textContent.trim() === 'No papers found matching your criteria.') {
        div.style.display = hide ? 'none' : '';
      }
    });
  }

  function patchPublications() {
    const section = findPublicationsSection();
    if (!section) return false;

    section.querySelectorAll('[data-homepage-dynamic-publications]').forEach(node => node.remove());

    patchFilterButtons(section);
    const controls = inferControlsFromDom(section);
    const matches = EXTRA_PUBLICATIONS
      .filter(pub => publicationMatches(pub, controls))
      .sort((a, b) => controls.newestFirst ? b.year - a.year : a.year - b.year);

    const customOnly = CUSTOM_VENUES.has(state.venue) || CUSTOM_KEYWORDS.has(state.keyword);
    setOriginalVisibility(section, customOnly && matches.length > 0);

    const grid = getOtherPublicationGrid(section);
    const expectedOrder = matches.map(pub => pub.key).join('|');
    const existingOrder = [...section.querySelectorAll('[data-homepage-publication]')]
      .map(node => node.dataset.homepagePublication)
      .join('|');
    const signature = `${state.venue}|${state.keyword}|${controls.query}|${controls.newestFirst}|${expectedOrder}`;
    const needsRender = existingOrder !== expectedOrder || lastPublicationSignature !== signature;

    if (needsRender) {
      section.querySelectorAll('[data-homepage-publication]').forEach(node => node.remove());
      if (grid && matches.length > 0) {
        const cards = matches.map(createPublicationCard);
        if (controls.newestFirst) {
          cards.reverse().forEach(card => grid.prepend(card));
        } else {
          cards.forEach(card => grid.appendChild(card));
        }
      }
      lastPublicationSignature = signature;
    }
    return true;
  }

  function patchVisitorCounter() {
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
          <img src="${VISITOR_MAP_IMAGE_URL}" alt="Global visitor map" loading="lazy" />
        </a>
        <p class="homepage-visitor-note">Visitor countries are estimated by FlagCounter for aggregate statistics; individual identities are not shown here.</p>
      </div>
    `;
    footer.parentElement.insertBefore(section, footer);
    return true;
  }

  function patchAnalyticsPlaceholder() {
    if (window.AIMIN_GA_MEASUREMENT_ID && !document.getElementById('aimin-ga4-script')) {
      const ga = document.createElement('script');
      ga.id = 'aimin-ga4-script';
      ga.async = true;
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${window.AIMIN_GA_MEASUREMENT_ID}`;
      document.head.appendChild(ga);
      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', window.AIMIN_GA_MEASUREMENT_ID, { anonymize_ip: true });
    }
  }

  function installControlTracking() {
    if (document.documentElement.dataset.homepageControlTrackingInstalled) return;
    document.documentElement.dataset.homepageControlTrackingInstalled = 'true';
    document.addEventListener('click', event => {
      const section = findPublicationsSection();
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest('#publications button');
      if (!section || !button) return;
      const text = button.textContent.trim();
      const venue = parseVenueText(text);

      if (/^All Papers/.test(text)) state.venue = 'All';
      else if (text === 'All') state.keyword = 'All';
      else if (button.dataset.homepageVenueButton) state.venue = button.dataset.homepageVenueButton;
      else if (button.dataset.homepageKeywordButton) state.keyword = button.dataset.homepageKeywordButton;
      else if (/^IEEE |^ACM |^Allerton/.test(venue)) state.venue = venue;
      else if (EXTRA_KEYWORDS.includes(text)) state.keyword = text;

      setTimeout(applyUpdates, 80);
    }, true);

    document.addEventListener('input', event => {
      if (event.target instanceof Element && event.target.matches('#publications input')) setTimeout(applyUpdates, 80);
    }, true);
  }

  function applyUpdates() {
    addStyles();
    syncDarkModeFlag();
    installControlTracking();
    const ok = [patchNews(), patchPublications(), patchVisitorCounter()].every(Boolean);
    patchAnalyticsPlaceholder();
    return ok;
  }

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (applyUpdates() || attempts > 40) clearInterval(timer);
  }, 250);

  const observer = new MutationObserver(() => applyUpdates());
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
})();
