(() => {
  const VISITOR_MAP_STATS_URL = 'https://info.flagcounter.com/Ad32';
  const VISITOR_MAP_IMAGE_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/';

  function addStyles() {
    if (document.getElementById('homepage-visitor-map-style')) return;
    const style = document.createElement('style');
    style.id = 'homepage-visitor-map-style';
    style.textContent = `
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
      body.homepage-dynamic-dark .homepage-visitor-map { background: rgba(15,23,42,.5); border-color: rgb(51 65 85); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-visitor-head { border-color: rgb(51 65 85); }
      body.homepage-dynamic-dark .homepage-visitor-icon { background: rgba(30,64,175,.28); color: rgb(96 165 250); }
      body.homepage-dynamic-dark .homepage-visitor-title h2 { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-visitor-title p,
      body.homepage-dynamic-dark .homepage-visitor-note { color: rgb(148 163 184); }
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
          <img src="${VISITOR_MAP_IMAGE_URL}" alt="Global visitor map" loading="lazy" />
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
    return insertVisitorMap();
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
