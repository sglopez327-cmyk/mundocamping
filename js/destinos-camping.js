/**
 * Mapa interactivo de campings — reconstruido desde cero.
 * Pines con position:absolute + left/top en % sobre la imagen del mapa.
 */
(function () {
  'use strict';

  var markers = window.CAMPINGS_MAP_MARKERS || [];
  var catalog = window.CAMPINGS_CATALOG || [];
  var mapEl = document.getElementById('campings-map');
  var wrapEl = document.getElementById('campings-map-wrap');
  var tooltipEl = document.getElementById('campings-map-tooltip');
  var gridEl = document.getElementById('destinos-grid');

  if (!mapEl || !tooltipEl || !markers.length) return;

  var activeId = null;
  var hideTimer = null;
  var MOBILE = window.matchMedia('(max-width: 767px)');

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function findMarker(id) {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].id === id) return markers[i];
    }
    return null;
  }

  function renderMap() {
    markers.forEach(function (m) {
      var pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'campings-map__pin';
      pin.style.left = m.left + '%';
      pin.style.top = m.top + '%';
      pin.dataset.id = m.id;
      pin.setAttribute('aria-label', m.name + ', ' + m.country);

      pin.addEventListener('mouseenter', function () {
        if (MOBILE.matches) return;
        openTooltip(m, pin);
      });
      pin.addEventListener('mouseleave', function () {
        if (MOBILE.matches) return;
        scheduleClose();
      });
      pin.addEventListener('focus', function () {
        if (MOBILE.matches) return;
        openTooltip(m, pin);
      });
      pin.addEventListener('blur', function () {
        if (MOBILE.matches) return;
        scheduleClose();
      });
      pin.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (MOBILE.matches) {
          if (activeId === m.id) closeTooltip();
          else openTooltip(m, pin, true);
        } else {
          openTooltip(m, pin);
        }
      });

      mapEl.appendChild(pin);
    });
  }

  function tooltipHtml(m, mobile) {
    var link = m.page
      ? '<a href="' + esc(m.page) + '" class="campings-map-tooltip__link">Ver ficha →</a>'
      : '';
    if (mobile) {
      return (
        '<div class="campings-map-tooltip__inner">' +
        '<button type="button" class="campings-map-tooltip__close" aria-label="Cerrar">×</button>' +
        (m.image
          ? '<div class="campings-map-tooltip__img"><img src="' +
            esc(m.image) +
            '" alt="" width="640" height="360" decoding="async" /></div>'
          : '') +
        '<div class="campings-map-tooltip__body">' +
        '<p class="campings-map-tooltip__meta">' +
        esc(m.country + (m.region ? ' · ' + m.region : '')) +
        '</p>' +
        '<p class="campings-map-tooltip__title">' +
        esc(m.name) +
        '</p>' +
        '<p class="campings-map-tooltip__text">' +
        esc(m.description) +
        '</p>' +
        link +
        '</div></div>'
      );
    }
    return (
      '<div class="campings-map-tooltip__inner campings-map-tooltip__inner--float">' +
      '<p class="campings-map-tooltip__meta">' +
      esc(m.country) +
      '</p>' +
      '<p class="campings-map-tooltip__title">' +
      esc(m.name) +
      '</p>' +
      '<p class="campings-map-tooltip__text">' +
      esc(m.description) +
      '</p>' +
      link +
      '</div>'
    );
  }

  function scheduleClose() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      closeTooltip();
    }, 120);
  }

  function openTooltip(m, pin, mobileForce) {
    clearTimeout(hideTimer);
    activeId = m.id;
    var mobile = mobileForce || MOBILE.matches;

    tooltipEl.innerHTML = tooltipHtml(m, mobile);
    tooltipEl.classList.remove('is-hidden');
    tooltipEl.classList.toggle('is-mobile', mobile);
    tooltipEl.classList.toggle('is-desktop', !mobile);
    tooltipEl.setAttribute('aria-hidden', 'false');

    mapEl.querySelectorAll('.campings-map__pin').forEach(function (p) {
      p.classList.toggle('is-active', p.dataset.id === m.id);
    });

    if (mobile) {
      document.body.classList.add('campings-map-open');
      var closeBtn = tooltipEl.querySelector('.campings-map-tooltip__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          closeTooltip();
        });
      }
      return;
    }

    positionTooltip(pin);
  }

  function positionTooltip(pin) {
    if (MOBILE.matches || !wrapEl) return;

    tooltipEl.style.left = '0';
    tooltipEl.style.top = '0';
    tooltipEl.classList.add('is-measuring');

    var pad = 8;
    var gap = 10;
    var wrapRect = wrapEl.getBoundingClientRect();
    var pinRect = pin.getBoundingClientRect();
    var tipW = tooltipEl.offsetWidth;
    var tipH = tooltipEl.offsetHeight;

    var pinCx = pinRect.left - wrapRect.left + pinRect.width / 2;
    var pinTop = pinRect.top - wrapRect.top;
    var pinBottom = pinRect.bottom - wrapRect.top;

    var placeBelow = pinTop < tipH + gap + pad;
    var top = placeBelow ? pinBottom + gap : pinTop - tipH - gap;
    var left = pinCx - tipW / 2;

    left = Math.max(pad, Math.min(left, wrapRect.width - tipW - pad));
    top = Math.max(pad, Math.min(top, wrapRect.height - tipH - pad));

    tooltipEl.style.left = Math.round(left) + 'px';
    tooltipEl.style.top = Math.round(top) + 'px';
    tooltipEl.classList.remove('is-measuring');
  }

  function closeTooltip() {
    clearTimeout(hideTimer);
    activeId = null;
    tooltipEl.classList.add('is-hidden');
    tooltipEl.classList.remove('is-mobile', 'is-desktop', 'is-measuring');
    tooltipEl.setAttribute('aria-hidden', 'true');
    tooltipEl.style.left = '';
    tooltipEl.style.top = '';
    document.body.classList.remove('campings-map-open');
    mapEl.querySelectorAll('.campings-map__pin.is-active').forEach(function (p) {
      p.classList.remove('is-active');
    });
  }

  function renderGrid() {
    if (!gridEl || !catalog.length) return;

    gridEl.innerHTML = catalog
      .map(function (d) {
        return (
          '<article class="destino-card" data-id="' +
          esc(d.id) +
          '" tabindex="0" role="button">' +
          '<div class="destino-card__media"><img src="' +
          esc(d.image) +
          '" alt="' +
          esc(d.name) +
          '" width="480" height="300" loading="lazy" decoding="async" /></div>' +
          '<div class="destino-card__body">' +
          '<p class="destino-card__meta">' +
          esc(d.country + ' · ' + d.region) +
          '</p>' +
          '<h3 class="destino-card__title">' +
          esc(d.name) +
          '</h3>' +
          '<p class="destino-card__why">' +
          esc(d.why) +
          '</p>' +
          '<p class="destino-card__tip">' +
          esc(d.tip) +
          '</p>' +
          (d.page
            ? '<p class="destino-card__tip"><a href="' +
              esc(d.page) +
              '" class="text-[#deff9a] hover:underline">Guía completa →</a></p>'
            : '') +
          '</div></article>'
        );
      })
      .join('');

    gridEl.querySelectorAll('.destino-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var pin = mapEl.querySelector('.campings-map__pin[data-id="' + card.dataset.id + '"]');
        var m = findMarker(card.dataset.id);
        if (m && pin) {
          pin.focus();
          openTooltip(m, pin, MOBILE.matches);
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  tooltipEl.addEventListener('mouseenter', function () {
    if (MOBILE.matches) return;
    clearTimeout(hideTimer);
  });
  tooltipEl.addEventListener('mouseleave', function () {
    if (MOBILE.matches) return;
    scheduleClose();
  });

  mapEl.addEventListener('click', function (e) {
    if (e.target === mapEl || e.target.classList.contains('campings-map__image')) {
      closeTooltip();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeTooltip();
  });

  window.addEventListener('resize', function () {
    if (activeId && !MOBILE.matches) {
      var pin = mapEl.querySelector('.campings-map__pin[data-id="' + activeId + '"]');
      var m = findMarker(activeId);
      if (pin && m) positionTooltip(pin);
    }
  });

  renderMap();
  renderGrid();
})();
