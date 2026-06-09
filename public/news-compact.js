(() => {
  if (document.getElementById('homepage-news-compact-style')) return;

  const style = document.createElement('style');
  style.id = 'homepage-news-compact-style';
  style.textContent = `
    #news { padding: 1rem !important; }
    #news h3 { margin-bottom: .5rem !important; }
    #news .space-y-2,
    #news .divide-y { display: block !important; }
    #news .space-y-2 > div,
    #news .divide-y > div {
      display: grid !important;
      grid-template-columns: 4.35rem 3.9rem minmax(0, 1fr);
      gap: .15rem .5rem !important;
      align-items: start !important;
      padding: .28rem 0 !important;
      font-size: 12px !important;
      line-height: 1.35 !important;
    }
    #news .space-y-2 > div + div,
    #news .divide-y > div + div { border-top: 1px solid rgba(148, 163, 184, .18); }
    #news .space-y-2 > div > span:first-child,
    #news .divide-y > div > span:first-child {
      font-size: 10px !important;
      line-height: 1.35 !important;
      padding-top: .1rem !important;
    }
    #news .space-y-2 > div > div,
    #news .divide-y > div > div { display: contents !important; }
    #news .space-y-2 > div > div > span:first-child,
    #news .divide-y > div > div > span:first-child {
      width: 100% !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      white-space: nowrap !important;
      border-radius: 9999px !important;
      padding: .1rem .4rem !important;
      font-size: 9px !important;
      line-height: 1.15 !important;
    }
    #news .space-y-2 > div a,
    #news .divide-y > div a {
      min-width: 0 !important;
      line-height: 1.35 !important;
      display: inline-flex !important;
      align-items: flex-start !important;
      overflow: visible !important;
    }
    #news .space-y-2 > div a > span,
    #news .space-y-2 > div > div > span:last-child,
    #news .divide-y > div a > span,
    #news .divide-y > div > div > span:last-child {
      display: block !important;
      min-width: 0 !important;
      overflow: visible !important;
      text-overflow: clip !important;
      white-space: normal !important;
      word-break: break-word !important;
    }
    body.homepage-dynamic-dark #news {
      background: rgba(30,41,59,.5) !important;
      border-color: rgb(51 65 85) !important;
      box-shadow: none !important;
    }
    body.homepage-dynamic-dark #news h3 {
      color: rgb(192 132 252) !important;
    }
    body.homepage-dynamic-dark #news .space-y-2 > div + div,
    body.homepage-dynamic-dark #news .divide-y > div + div {
      border-top-color: rgba(51,65,85,.72) !important;
    }
    body.homepage-dynamic-dark #news .space-y-2 > div > span:first-child,
    body.homepage-dynamic-dark #news .divide-y > div > span:first-child {
      color: rgb(148 163 184) !important;
      opacity: 1 !important;
    }
    body.homepage-dynamic-dark #news .space-y-2 > div > div > span:first-child,
    body.homepage-dynamic-dark #news .divide-y > div > div > span:first-child {
      background: rgba(88,28,135,.45) !important;
      color: rgb(216 180 254) !important;
      border: 1px solid rgba(168,85,247,.35) !important;
    }
    body.homepage-dynamic-dark #news .space-y-2 > div a,
    body.homepage-dynamic-dark #news .space-y-2 > div a > span,
    body.homepage-dynamic-dark #news .divide-y > div a,
    body.homepage-dynamic-dark #news .divide-y > div a > span {
      color: rgb(203 213 225) !important;
    }
    body.homepage-dynamic-dark #news .space-y-2 > div a:hover,
    body.homepage-dynamic-dark #news .space-y-2 > div a:hover > span,
    body.homepage-dynamic-dark #news .divide-y > div a:hover,
    body.homepage-dynamic-dark #news .divide-y > div a:hover > span {
      color: rgb(192 132 252) !important;
    }

    @media (max-width: 640px) {
      #news .space-y-2 > div,
      #news .divide-y > div {
        grid-template-columns: 4.15rem 3.55rem minmax(0, 1fr);
      }
      #news .space-y-2 > div a > span,
      #news .space-y-2 > div > div > span:last-child,
      #news .divide-y > div a > span,
      #news .divide-y > div > div > span:last-child {
        display: block !important;
        -webkit-line-clamp: unset;
        white-space: normal !important;
      }
    }
  `;
  document.head.appendChild(style);
})();
