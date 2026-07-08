/**
 * Carga AdSense tras el render inicial (requestIdleCallback o load+timeout).
 */
(function () {
  'use strict';

  var ADSENSE_SRC =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3646085735328403';

  function loadAdSense() {
    if (window.__mundoCampingAdsenseLoaded) {
      return;
    }
    window.__mundoCampingAdsenseLoaded = true;

    var script = document.createElement('script');
    script.async = true;
    script.src = ADSENSE_SRC;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadAdSense, { timeout: 3500 });
  } else {
    window.addEventListener('load', function () {
      setTimeout(loadAdSense, 2000);
    });
  }
})();
