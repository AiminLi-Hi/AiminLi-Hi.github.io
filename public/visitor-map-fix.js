(() => {
  const MAP_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/?v=20260609c';
  const RANKING_URL = 'https://s01.flagcounter.com/count2/Ad32/bg_FFFFFF/txt_334155/border_CBD5E1/columns_2/maxflags_12/viewers_0/labels_1/pageviews_1/flags_1/percent_0/?v=20260609a';

  function syncTrackerImages() {
    const mapTracker = document.querySelector('[data-homepage-visitor-map] .homepage-visitor-map-frame .homepage-visitor-tracker');
    const rankingTracker = document.querySelector('[data-homepage-visitor-map] .homepage-visitor-ranking .homepage-visitor-tracker');
    if (!mapTracker && !rankingTracker) return false;

    if (mapTracker && mapTracker.src !== MAP_URL) {
      mapTracker.referrerPolicy = 'no-referrer';
      mapTracker.src = MAP_URL;
    }

    if (rankingTracker && rankingTracker.src !== RANKING_URL) {
      rankingTracker.referrerPolicy = 'no-referrer';
      rankingTracker.src = RANKING_URL;
    }

    document.querySelectorAll('[data-homepage-visitor-map] .homepage-visitor-image-blocked').forEach(element => {
      element.classList.remove('homepage-visitor-image-blocked');
    });

    return true;
  }

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (syncTrackerImages() || attempts > 40) clearInterval(timer);
  }, 250);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncTrackerImages, { once: true });
  } else {
    syncTrackerImages();
  }
})();
