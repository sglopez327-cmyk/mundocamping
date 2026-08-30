/**
 * Mapa interactivo de campings
 * Imagen fija + capa de pines con top/left en % (sin proyección geográfica).
 */
(function () {
  'use strict';

  var mapRoot = document.getElementById('campings-map');
  if (!mapRoot) return;

  var mapConfig = window.CAMPINGS_MAP || {};
  var catalog = window.CAMPINGS_CATALOG || [];
  var markers = mapConfig.markers || [];

  var catalogById = {};
  catalog.forEach(function (item) {
    catalogById[item.id] = item;
  });

  var pinsLayer = mapRoot.querySelector('.mc-map__pins');
  var popover = document.getElementById('campings-map-popover');
  var sheet = document.getElementById('campings-map-sheet');
  var backdrop = document.getElementById('campings-map-backdrop');
  var activePin = null;
  var mobileMq = window.matchMedia('(max-width: 767px)');

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isMobile() {
    return mobileMq.matches;
  }

  function getItem(marker) {
    return catalogById[marker.id] || null;
  }

  function renderPins() {
    if (!pinsLayer) return;

    pinsLayer.innerHTML = markers
      .map(function (marker) {
        var item = getItem(marker);
        if (!item) return '';

        var spainClass = marker.region === 'spain' ? ' mc-map__pin--spain' : '';
        return (
          '<button type="button" class="mc-map__pin' +
          spainClass +
          '" data-id="' +
          esc(marker.id) +
          '" style="--pin-x:' +
          marker.left +
          '%;--pin-y:' +
          marker.top +
          '%;" aria-label="' +
          esc(item.name + ', ' + item.country) +
          '" aria-expanded="false">' +
          '<span class="mc-map__pin-dot" aria-hidden="true"></span>' +
          '<span class="mc-map__pin-label">' +
          esc(item.name) +
          '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function cardHtml(item, linkClass) {
    return (
      (item.image
        ? '<div class="mc-map-popover__media"><img src="' +
          esc(item.image) +
          '" alt="" width="480" height="270" loading="lazy" decoding="async" /></div>'
        : '') +
      '<div class="mc-map-popover__body">' +
      '<p class="mc-map-popover__meta">' +
      esc(item.country + ' · ' + item.region) +
      '</p>' +
      '<h3 class="mc-map-popover__title">' +
      esc(item.name) +
      '</h3>' +
      '<p class="mc-map-popover__why">' +
      esc(item.why) +
      '</p>' +
      (item.tip ? '<p class="mc-map-popover__tip">' + esc(item.tip) + '</p>' : '') +
      '<a href="' +
      esc(item.page) +
      '" class="' +
      linkClass +
      '">Ver ficha completa →</a>' +
      '</div>'
    );
  }

  function closeAll() {
    if (activePin) {
      activePin.classList.remove('is-active');
      activePin.setAttribute('aria-expanded', 'false');
      activePin = null;
    }
    if (popover) {
      popover.classList.remove('is-open', 'is-below');
      popover.hidden = true;
    }
    if (backdrop) backdrop.classList.remove('is-open');
    if (sheet) {
      sheet.classList.remove('is-open');
      sheet.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function positionPopover(pin) {
    if (!popover || isMobile()) return;

    var mapRect = mapRoot.getBoundingClientRect();
    var pinRect = pin.getBoundingClientRect();
    var pinCenterX = pinRect.left + pinRect.width / 2 - mapRect.left;
    var pinCenterY = pinRect.top + pinRect.height / 2 - mapRect.top;

    var popoverHeight = popover.offsetHeight || 280;
    var spaceAbove = pinCenterY;
    var placeBelow = spaceAbove < popoverHeight + 24;

    popover.style.left = pinCenterX + 'px';
    popover.style.top = pinCenterY + 'px';
    popover.classList.toggle('is-below', placeBelow);
  }

  function openPin(pin) {
    var marker = markers.find(function (m) {
      return m.id === pin.getAttribute('data-id');
    });
    if (!marker) return;

    var item = getItem(marker);
    if (!item) return;

    if (activePin && activePin !== pin) {
      activePin.classList.remove('is-active');
      activePin.setAttribute('aria-expanded', 'false');
    }

    activePin = pin;
    pin.classList.add('is-active');
    pin.setAttribute('aria-expanded', 'true');

    if (isMobile()) {
      if (sheet) {
        sheet.innerHTML =
          '<button type="button" class="mc-map-sheet__close" aria-label="Cerrar">×</button>' +
          '<div class="mc-map-sheet__handle" aria-hidden="true"><span></span></div>' +
          '<div class="mc-map-sheet__scroll">' +
          (item.image
            ? '<div class="mc-map-sheet__media"><img src="' +
              esc(item.image) +
              '" alt="' +
              esc(item.name) +
              '" width="640" height="360" loading="lazy" /></div>'
            : '') +
          '<p class="mc-map-sheet__meta">' +
          esc(item.country + ' · ' + item.region) +
          '</p>' +
          '<h3 class="mc-map-sheet__title">' +
          esc(item.name) +
          '</h3>' +
          '<p class="mc-map-sheet__why">' +
          esc(item.why) +
          '</p>' +
          (item.tip ? '<p class="mc-map-sheet__tip">' + esc(item.tip) + '</p>' : '') +
          '<a href="' +
          esc(item.page) +
          '" class="mc-map-sheet__cta">Ver ficha completa</a>' +
          '</div>';

        sheet.querySelector('.mc-map-sheet__close').addEventListener('click', closeAll);
      }
      if (backdrop) {
        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
      }
      if (sheet) {
        sheet.classList.add('is-open');
        sheet.setAttribute('aria-hidden', 'false');
      }
      document.body.style.overflow = 'hidden';
      return;
    }

    if (popover) {
      popover.innerHTML = cardHtml(item, 'mc-map-popover__cta');
      popover.hidden = false;
      popover.classList.add('is-open');
      requestAnimationFrame(function () {
        positionPopover(pin);
      });
    }
  }

  function bindPinEvents() {
    if (!pinsLayer) return;

    pinsLayer.querySelectorAll('.mc-map__pin').forEach(function (pin) {
      pin.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (activePin === pin && !isMobile() && popover && popover.classList.contains('is-open')) {
          closeAll();
          return;
        }
        openPin(pin);
      });

      pin.addEventListener('mouseenter', function () {
        if (isMobile()) return;
        openPin(pin);
      });
    });
  }

  function bindEvents() {
    if (!pinsLayer) return;

    bindPinEvents();

    document.addEventListener('click', function (event) {
      if (
        !mapRoot.contains(event.target) &&
        !(popover && popover.contains(event.target)) &&
        !(sheet && sheet.contains(event.target))
      ) {
        closeAll();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeAll();
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeAll);
    }

    window.addEventListener('resize', function () {
      if (activePin && !isMobile() && popover && popover.classList.contains('is-open')) {
        positionPopover(activePin);
      }
      if (!isMobile()) {
        if (sheet) sheet.classList.remove('is-open');
        if (backdrop) backdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    mobileMq.addEventListener('change', closeAll);
  }

  renderPins();
  bindEvents();
})();
