(() => {
  function addStyles() {
    if (document.getElementById('homepage-publication-format-style')) return;
    const style = document.createElement('style');
    style.id = 'homepage-publication-format-style';
    style.textContent = `
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
      .homepage-publication-year { color: rgb(100 116 139); background: rgba(0,0,0,.1); border-radius: .25rem; padding: .125rem .375rem; font: 600 .625rem ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
      .homepage-publication-summary { color: rgb(100 116 139); font-size: .875rem; line-height: 1.55; font-style: italic; border-left: 2px solid rgb(233 213 255); padding-left: .75rem; }
      .homepage-publication-keywords { display: flex; flex-wrap: wrap; gap: .5rem; }
      .homepage-publication-keywords span { border: 1px solid rgb(243 244 246); background: rgb(249 250 251); color: rgb(156 163 175); border-radius: .25rem; padding: .125rem .375rem; font-size: .625rem; }
      .homepage-publication-actions { display: flex; gap: .75rem; padding-top: .5rem; }
      .homepage-publication-link { display: inline-flex; align-items: center; gap: .375rem; border: 1px solid rgb(219 234 254); background: rgb(239 246 255); color: rgb(37 99 235); border-radius: .5rem; padding: .375rem .75rem; font-size: .75rem; font-weight: 700; text-decoration: none; transition: all .2s ease; }
      .homepage-publication-link:hover { background: rgb(219 234 254); }
      body.homepage-dynamic-dark .homepage-publication-card { background: rgba(30,41,59,.4); border-color: rgba(51,65,85,.5); box-shadow: none; }
      body.homepage-dynamic-dark .homepage-publication-card:hover { border-color: rgba(168,85,247,.35); }
      body.homepage-dynamic-dark .homepage-publication-title { color: rgb(241 245 249); }
      body.homepage-dynamic-dark .homepage-publication-card:hover .homepage-publication-title { color: rgb(192 132 252); }
      body.homepage-dynamic-dark .homepage-publication-authors,
      body.homepage-dynamic-dark .homepage-publication-summary { color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-publication-authors strong { color: rgb(226 232 240); }
      body.homepage-dynamic-dark .homepage-publication-venue { background: rgba(51,65,85,.5); border-color: rgb(71 85 105); color: rgb(203 213 225); }
      body.homepage-dynamic-dark .homepage-publication-year { background: rgba(255,255,255,.1); color: rgb(148 163 184); }
      body.homepage-dynamic-dark .homepage-publication-summary { border-color: rgb(71 85 105); }
      body.homepage-dynamic-dark .homepage-publication-keywords span { border-color: rgb(51 65 85); color: rgb(100 116 139); background: transparent; }
    `;
    document.head.appendChild(style);
  }

  function transformCard(card) {
    if (!card.classList.contains('homepage-inline-card') || card.dataset.homepageFormatFixed) return;
    const meta = [...card.querySelectorAll('.homepage-inline-meta span')].map(node => node.textContent.trim());
    const titleLink = card.querySelector('.homepage-inline-title a');
    const authors = card.querySelector('.homepage-inline-authors')?.textContent.trim() || '';
    const summary = card.querySelector('.homepage-inline-summary')?.textContent.trim() || '';
    const keywords = [...card.querySelectorAll('.homepage-inline-keywords span')].map(node => node.textContent.trim());
    const href = titleLink?.href || '#';
    const title = titleLink?.textContent.trim() || '';
    const year = meta[0] || '';
    const shortVenue = meta[1] || '';
    const highlightedAuthors = authors.split(',').map(author => {
      const trimmed = author.trim();
      return trimmed === 'Aimin Li' ? `<strong>${trimmed}</strong>` : trimmed;
    }).join(', ');

    card.className = 'homepage-publication-card';
    card.dataset.homepageFormatFixed = 'true';
    card.innerHTML = `
      <div class="homepage-publication-hover">↗</div>
      <div class="homepage-publication-content">
        <div class="homepage-publication-head">
          <h3 class="homepage-publication-title">${title}</h3>
          <div class="homepage-publication-toggle" aria-hidden="true">⌄</div>
        </div>
        <div class="homepage-publication-authors">${highlightedAuthors}</div>
        <div class="homepage-publication-meta">
          <span class="homepage-publication-venue">${shortVenue}</span>
          <span class="homepage-publication-year">${year}</span>
        </div>
        <div class="homepage-publication-summary">"${summary}"</div>
        <div class="homepage-publication-keywords">${keywords.slice(0, 3).map(keyword => `<span>#${keyword}</span>`).join('')}</div>
        <div class="homepage-publication-actions" onclick="event.stopPropagation()">
          <a class="homepage-publication-link" href="${href}" target="_blank" rel="noreferrer">Link ↗</a>
        </div>
      </div>
    `;
  }

  function apply() {
    addStyles();
    document.querySelectorAll('[data-homepage-publication]').forEach(transformCard);
    return document.querySelectorAll('[data-homepage-publication]').length > 0;
  }

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (apply() || attempts > 40) clearInterval(timer);
  }, 250);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();
