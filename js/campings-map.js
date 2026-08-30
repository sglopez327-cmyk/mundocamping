/**
 * Mapa Leaflet — campings en España (OpenStreetMap)
 */
(function () {
  'use strict';

  function initCampingsMap() {
    if (!window.L) return;

    var container = document.getElementById('campings-map');
    var campings = window.CAMPINGS_MAP_SPAIN || [];
    if (!container || !campings.length) return;

    function esc(value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    var map = L.map(container, {
      center: [40.4168, -3.7038],
      zoom: 6,
      minZoom: 5,
      maxZoom: 12,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    var pinIcon = L.divIcon({
      className: 'mc-leaflet-pin-wrap',
      html:
        '<span class="mc-leaflet-pin" aria-hidden="true">' +
        '<span class="mc-leaflet-pin__ring"></span>' +
        '<span class="mc-leaflet-pin__core"></span>' +
        '</span>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34],
    });

    function popupHtml(camping) {
      var html =
        '<article class="mc-leaflet-popup">' +
        (camping.image
          ? '<div class="mc-leaflet-popup__media"><img src="' +
            esc(camping.image) +
            '" alt="" width="280" height="158" loading="lazy" decoding="async" /></div>'
          : '') +
        '<div class="mc-leaflet-popup__body">' +
        '<p class="mc-leaflet-popup__meta">' +
        esc(camping.ubicacion) +
        '</p>' +
        '<h3 class="mc-leaflet-popup__title">' +
        esc(camping.nombre) +
        '</h3>' +
        '<p class="mc-leaflet-popup__desc">' +
        esc(camping.descripcion) +
        '</p>';

      if (camping.page) {
        html +=
          '<a class="mc-leaflet-popup__cta" href="' +
          esc(camping.page) +
          '">Ver guía del destino →</a>';
      }

      html += '</div></article>';
      return html;
    }

    campings.forEach(function (camping) {
      if (!camping.coords || camping.coords.length < 2) return;

      var marker = L.marker(camping.coords, {
        icon: pinIcon,
        alt: camping.nombre,
        title: camping.nombre,
      });

      marker.bindPopup(popupHtml(camping), {
        className: 'mc-leaflet-popup-shell',
        maxWidth: 300,
        minWidth: 240,
        autoPan: true,
        keepInView: true,
        closeButton: true,
      });

      marker.addTo(map);
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        map.invalidateSize();
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCampingsMap);
  } else {
    initCampingsMap();
  }
})();
