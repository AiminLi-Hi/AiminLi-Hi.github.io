(() => {
  const UPDATES = {
    news: [
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
    ],
    publications: [
      {
        key: 'tmc-uav-marl-2026',
        year: '2026',
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
        year: '2026',
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
    ]
  };

  const VISITOR_COUNTER_URL = 'https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Faiminli-hi.github.io&count_bg=%237C3AED&title_bg=%23555555&icon=github.svg&icon_color=%23E7E7E7&title=Visitors&edge_flat=false';

  function addStyles() {
    if (document.getElementById('homepage-dynamic-updates-style')) return;
    const style = document.createElement('style');
    style.id = 'homepage-dynamic-updates-style';
    style.textContent = `
      .homepage-dynamic-section { margin-top: 1.5rem; }
      .homepage-dynamic-title { font-size: .75rem; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; margin-bottom: 1rem; color: rgb(5 150 105); display: flex; align-items: center; gap: .5rem; }
      .homepage-dynamic-card { border: 1px solid rgb(229 231 235); background: rgba(255,255,255,.92); border-radius: 1rem; padding: 1.25rem; box-shadow: 0 8px 24px rgba(15,23,42,.04); margin-bottom: 1rem; }
      .homepage-dynamic-card:hover { transform: translateY(-1px); transition: all .2s ease; box-shadow: 0 12px 30px rgba(15,23,42,.08); }
      .homepage-dynamic-meta { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; margin-bottom: .75rem; font-size: .7rem; font-weight: 800; letter-spacing: .04em; }
      .homepage-dynamic-pill { display: inline-flex; align-items: center; border-radius: 9999px; padding: .2rem .55rem; background: rgb(236 253 245); color: rgb(4 120 87); border: 1px solid rgb(209 250 229); }
      .homepage-dynamic-year { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; color: rgb(100 116 139); }
      .homepage-dynamic-card h3 { margin: 0 0 .45rem 0; color: rgb(17 24 39); font-size: 1.05rem; line-height: 1.35; font-weight: 800; }
      .homepage-dynamic-card h3 a { color: inherit; text-decoration: none; }
      .homepage-dynamic-card h3 a:hover { color: rgb(5 150 105); text-decoration: underline; text-underline-offset: 3px; }
      .homepage-dynamic-authors { color: rgb(75 85 99); font-size: .85rem; font-style: italic; margin-bottom: .65rem; }
      .homepage-dynamic-summary { color: rgb(100 116 139); font-size: .85rem; line-height: 1.55; margin-bottom: .75rem; }
      .homepage-dynamic-keywords { display: flex; flex-wrap: wrap; gap: .35rem; }
      .homepage-dynamic-keywords span { font-size: .68rem; border: 1px solid rgb(226 232 240); color: rgb(71 85 105); border-radius: 9999px; padding: .15rem .5rem; background: rgb(248 250 252); }
      .homepage-visitor-counter { margin-top: .6rem; display: flex; justify-content: center; gap: .5rem; flex-wrap: wrap; align-items: center; }
      .homepage-visitor-note { font-size: .68rem; opacity: .65; }
      body.homepage-dynamic-dark .homepage-dynamic-title { color: rgb(52 211 153); }
      body.homepage-dynamic-dark .homepage-dynamic-card { background: rgba(15,23,42,.62); border-color: rgb(51 65 85); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-dynamic-card h3 { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-dynamic-card h3 a:hover { color: rgb(52 211 153); }
      body.homepage-dynamic-dark .homepage-dynamic-authors { color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-dynamic-summary { color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-dynamic-pill { background: rgba(6,78,59,.45); color: rgb(110 231 183); border-color: rgb(6 95 70); }
      body.homepage-dynamic-dark .homepage-dynamic-keywords span { background: rgba(30,41,59,.8); color: rgb(203 213 225); border-color: rgb(51 65 85); }
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
    [...UPDATES.news].reverse().forEach(item => {
      if (!newsList.querySelector(`[data-homepage-update="${item.key}"]`)) {
        newsList.prepend(createNewsItem(item));
      }
    });
    return true;
  }

  function createPublicationCard(pub) {
    const card = document.createElement('article');
    card.className = 'homepage-dynamic-card';
    card.dataset.homepagePublication = pub.key;
    card.innerHTML = `
      <div class="homepage-dynamic-meta">
        <span class="homepage-dynamic-year">${pub.year}</span>
        <span class="homepage-dynamic-pill">${pub.shortVenue}</span>
        <span class="homepage-dynamic-pill">${pub.type}</span>
        <span class="homepage-dynamic-pill">${pub.tag}</span>
      </div>
      <h3><a href="${pub.href}" target="_blank" rel="noreferrer">${pub.title}</a></h3>
      <div class="homepage-dynamic-authors">${pub.authors}</div>
      <div class="homepage-dynamic-summary">${pub.summary}</div>
      <div class="homepage-dynamic-keywords">${pub.keywords.map(k => `<span>${k}</span>`).join('')}</div>
    `;
    return card;
  }

  function patchPublications() {
    const section = document.querySelector('#publications');
    if (!section) return false;
    let dynamic = section.querySelector('[data-homepage-dynamic-publications]');
    if (!dynamic) {
      dynamic = document.createElement('div');
      dynamic.className = 'homepage-dynamic-section';
      dynamic.dataset.homepageDynamicPublications = 'true';
      dynamic.innerHTML = `<div class="homepage-dynamic-title">★ Latest Google Scholar Updates</div><div class="homepage-dynamic-list"></div>`;
      const insertionPoint = section.querySelector('.space-y-4.animate-fade-in') || section.children[1] || null;
      section.insertBefore(dynamic, insertionPoint);
    }
    const list = dynamic.querySelector('.homepage-dynamic-list');
    UPDATES.publications.forEach(pub => {
      if (!list.querySelector(`[data-homepage-publication="${pub.key}"]`)) {
        list.appendChild(createPublicationCard(pub));
      }
    });

    const allPapersButton = [...section.querySelectorAll('button')].find(btn => /All Papers \(\d+\)/.test(btn.textContent));
    if (allPapersButton && !allPapersButton.dataset.homepageCountPatched) {
      allPapersButton.textContent = allPapersButton.textContent.replace(/All Papers \((\d+)\)/, (_, n) => `All Papers (${Number(n) + UPDATES.publications.length})`);
      allPapersButton.dataset.homepageCountPatched = 'true';
    }
    return true;
  }

  function patchVisitorCounter() {
    const footer = document.querySelector('footer');
    if (!footer || footer.querySelector('[data-homepage-visitor-counter]')) return !!footer;
    const counter = document.createElement('div');
    counter.dataset.homepageVisitorCounter = 'true';
    counter.className = 'homepage-visitor-counter';
    counter.innerHTML = `
      <a href="https://hits.seeyoufarm.com" target="_blank" rel="noreferrer" title="Public visitor counter">
        <img src="${VISITOR_COUNTER_URL}" alt="visitor counter" loading="lazy" />
      </a>
      <span class="homepage-visitor-note">Public total-visit counter; detailed analytics can be connected with GA4 or Cloudflare Web Analytics.</span>
    `;
    footer.appendChild(counter);
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

  function applyUpdates() {
    addStyles();
    syncDarkModeFlag();
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
