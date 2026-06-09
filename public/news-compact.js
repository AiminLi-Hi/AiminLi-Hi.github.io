(() => {
  if (document.getElementById('homepage-news-compact-style')) return;

  const style = document.createElement('style');
  style.id = 'homepage-news-compact-style';
  style.textContent = `
    #news { padding: 1rem !important; }
    #news h3 { margin-bottom: .5rem !important; }
    #news .space-y-2 { display: block !important; }
    #news .space-y-2 > div {
      display: grid !important;
      grid-template-columns: 4.85rem max-content minmax(0, 1fr);
      gap: .15rem .5rem !important;
      align-items: start !important;
      padding: .28rem 0 !important;
      font-size: 13px !important;
      line-height: 1.35 !important;
    }
    #news .space-y-2 > div + div { border-top: 1px solid rgba(148, 163, 184, .18); }
    #news .space-y-2 > div > span:first-child {
      font-size: 11px !important;
      line-height: 1.35 !important;
      padding-top: .1rem !important;
    }
    #news .space-y-2 > div > div { display: contents !important; }
    #news .space-y-2 > div > div > span:first-child {
      width: fit-content !important;
      white-space: nowrap !important;
      border-radius: 9999px !important;
      padding: .1rem .4rem !important;
      font-size: 10px !important;
      line-height: 1.15 !important;
    }
    #news .space-y-2 > div a {
      min-width: 0 !important;
      line-height: 1.35 !important;
      display: inline-flex !important;
      align-items: flex-start !important;
      overflow: hidden !important;
    }
    #news .space-y-2 > div a > span {
      display: block !important;
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    @media (max-width: 640px) {
      #news .space-y-2 > div {
        grid-template-columns: 4.65rem minmax(0, 1fr);
      }
      #news .space-y-2 > div a,
      #news .space-y-2 > div > div > span:last-child {
        grid-column: 2 !important;
      }
      #news .space-y-2 > div a > span {
        display: -webkit-box !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal !important;
      }
    }
  `;
  document.head.appendChild(style);
})();
