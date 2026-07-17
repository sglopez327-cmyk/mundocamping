/**
 * Configuración global Mundo Camping.
 *
 * GA4 (obligatorio para medir visitas):
 * 1. Entra en https://analytics.google.com y crea una propiedad GA4.
 * 2. Copia el ID de medición (formato G-XXXXXXXXXX).
 * 3. Pégalo abajo en ga4MeasurementId (entre comillas).
 * 4. Publica este archivo en el servidor.
 *
 * Search Console (obligatorio para indexación):
 * 1. https://search.google.com/search-console → añadir https://www.mundocamping.net
 * 2. Verificar propiedad (HTML o DNS).
 * 3. Enviar sitemap: https://www.mundocamping.net/sitemap.xml
 * 4. Solicitar indexación de la home y de las 4 guías nuevas.
 */
(function (global) {
  'use strict';

  global.MundoCampingConfig = {
    siteUrl: 'https://www.mundocamping.net',
    // Sustituye '' por tu ID real, ej. 'G-ABC123XYZ'
    ga4MeasurementId: '',
  };
})(typeof window !== 'undefined' ? window : this);
