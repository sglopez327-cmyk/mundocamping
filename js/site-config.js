/**
 * Configuración global Mundo Camping.
 *
 * ═══ OBLIGATORIO PARA MEDIR Y POSICIONAR ═══
 *
 * GA4:
 * 1. https://analytics.google.com → crear propiedad GA4
 * 2. Copia el ID (G-XXXXXXXXXX) → ga4MeasurementId abajo
 * 3. Publica este archivo
 *
 * Search Console:
 * 1. https://search.google.com/search-console → añade https://www.mundocamping.net
 * 2. Verificación HTML: pega el código en googleSiteVerification (solo el content=...)
 * 3. Envía sitemap: https://www.mundocamping.net/sitemap.xml
 * 4. Solicita indexación de home, /blog y /mejores-sitios-acampar
 */
(function (global) {
  'use strict';

  global.MundoCampingConfig = {
    siteUrl: 'https://www.mundocamping.net',
    // Ej. 'G-ABC123XYZ'
    ga4MeasurementId: '',
    // Ej. 'AbCdEf123456...' (valor del meta google-site-verification)
    googleSiteVerification: '',
  };
})(typeof window !== 'undefined' ? window : this);
