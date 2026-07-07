/**
 * Configuración global Mundo Camping.
 * Sustituye GA4_MEASUREMENT_ID por tu ID de Google Analytics 4 (formato G-XXXXXXXXXX)
 * tras crear la propiedad en https://analytics.google.com
 */
(function (global) {
  'use strict';

  global.MundoCampingConfig = {
    siteUrl: 'https://www.mundocamping.net',
    ga4MeasurementId: '',
  };
})(typeof window !== 'undefined' ? window : this);
