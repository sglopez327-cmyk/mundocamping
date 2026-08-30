/**
 * Rejilla del directorio de campings
 */
(function () {
  'use strict';

  var catalog = window.CAMPINGS_CATALOG || [];
  var grid = document.getElementById('destinos-grid');
  if (!grid || !catalog.length) return;

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  grid.innerHTML = catalog
    .map(function (item) {
      return (
        '<article class="destino-card">' +
        '<a href="' +
        esc(item.page) +
        '" class="destino-card__link">' +
        '<div class="destino-card__media"><img src="' +
        esc(item.image) +
        '" alt="' +
        esc(item.name) +
        '" width="480" height="300" loading="lazy" decoding="async" /></div>' +
        '<div class="destino-card__body">' +
        '<p class="destino-card__meta">' +
        esc(item.country + ' · ' + item.region) +
        '</p>' +
        '<h3 class="destino-card__title">' +
        esc(item.name) +
        '</h3>' +
        '<p class="destino-card__why">' +
        esc(item.why) +
        '</p>' +
        '<p class="destino-card__tip">' +
        esc(item.tip) +
        '</p>' +
        '<span class="destino-card__cta text-[#deff9a]">Ver ficha →</span>' +
        '</div></a></article>'
      );
    })
    .join('');
})();
