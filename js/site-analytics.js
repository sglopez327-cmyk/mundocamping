/**
 * Google Analytics 4 — solo se carga si GA4_MEASUREMENT_ID está configurado en site-config.js
 */
(function () {
  'use strict';

  var config = window.MundoCampingConfig || {};
  var measurementId = (config.ga4MeasurementId || '').trim();

  if (!measurementId || measurementId.indexOf('G-') !== 0) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { anonymize_ip: true });

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(script);
})();
