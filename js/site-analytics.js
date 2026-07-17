/**
 * Google Analytics 4 + meta de verificación Search Console
 * (solo si están configurados en site-config.js)
 */
(function () {
  'use strict';

  var config = window.MundoCampingConfig || {};
  var measurementId = (config.ga4MeasurementId || '').trim();
  var verification = (config.googleSiteVerification || '').trim();

  if (verification && !document.querySelector('meta[name="google-site-verification"]')) {
    var meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = verification;
    document.head.appendChild(meta);
  }

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
