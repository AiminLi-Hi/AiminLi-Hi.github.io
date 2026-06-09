(() => {
  const MAP_URL = 'https://s01.flagcounter.com/map/Ad32/size_m/txt_334155/border_CBD5E1/pageviews_1/viewers_0/flags_0/?v=20260609c';

  function fixVisitorMapImage() {
    const image = document.querySelector('[data-homepage-visitor-map] img');
    if (!image) return false;

    image.loading = 'eager';
    image.decoding = 'async';
    image.width = 600;
    image.height = 291;
    image.referrerPolicy = 'no-referrer';
    if (image.src !== MAP_URL) image.src = MAP_URL;
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
