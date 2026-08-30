/**
 * Listado de fichas de campings en España (debajo del mapa)
 */
(function () {
  'use strict';

  var campings = window.CAMPINGS_MAP_SPAIN || [];
  var host = document.getElementById('campings-spain-fichas');
  if (!host || !campings.length) return;

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  host.innerHTML =
    '<header class="destinos-grid-header">' +
    '<h2 id="spain-fichas-title">11 campings en el mapa de España</h2>' +
    '<p>Fichas con consejos prácticos, qué hacer cerca y enlace directo desde el mapa.</p>' +
    '</header>' +
    '<div class="destinos-grid destinos-grid--compact" aria-labelledby="spain-fichas-title">' +
    campings
      .map(function (c) {
        var href = c.page || 'campings.html';
        return (
          '<article class="destino-card">' +
          '<a href="' +
          esc(href) +
          '" class="destino-card__link">' +
          '<div class="destino-card__media"><img src="' +
          esc(c.image) +
          '" alt="' +
          esc(c.nombre) +
          '" width="480" height="300" loading="lazy" decoding="async" /></div>' +
          '<div class="destino-card__body">' +
          '<p class="destino-card__meta">' +
          esc(c.ubicacion) +
          '</p>' +
          '<h3 class="destino-card__title">' +
          esc(c.nombre) +
          '</h3>' +
          '<p class="destino-card__why">' +
          esc(c.descripcion) +
          '</p>' +
          '<span class="destino-card__cta text-[#deff9a]">Ver guía →</span>' +
          '</div></a></article>'
        );
      })
      .join('') +
    '</div>';
})();
