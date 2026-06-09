(() => {
  const MAP_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/?v=20260609c';
  const RANKING_URL = 'https://s01.flagcounter.com/count2/Ad32/bg_FFFFFF/txt_334155/border_CBD5E1/columns_2/maxflags_12/viewers_0/labels_1/pageviews_1/flags_1/percent_0/?v=20260609a';

  function fixVisitorMapImage() {
    const image = document.querySelector('[data-homepage-visitor-map] .homepage-visitor-frame:not(.homepage-visitor-ranking) img, [data-homepage-visitor-map] img');
    const ranking = document.querySelector('[data-homepage-visitor-map] .homepage-visitor-ranking img');
    if (!image && !ranking) return false;

    if (image) {
      image.loading = 'eager';
      image.decoding = 'async';
      image.width = 600;
      image.height = 291;
      image.referrerPolicy = 'no-referrer';
      if (image.src !== MAP_URL) image.src = MAP_URL;
    }
    if (ranking) {
      ranking.loading = 'eager';
      ranking.decoding = 'async';
      ranking.referrerPolicy = 'no-referrer';
      if (ranking.src !== RANKING_URL) ranking.src = RANKING_URL;
    }
    return true;
  }

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (fixVisitorMapImage() || attempts > 40) clearInterval(timer);
  }, 250);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixVisitorMapImage, { once: true });
  } else {
    fixVisitorMapImage();
  }
})();
