/**
 * Mapa interactivo de campings en España
 * Pines con top/left en % sobre imagen fija.
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

  function resolveMarker(marker) {
    var catalogItem = catalogById[marker.id];
    return {
      id: marker.id,
      name: marker.name || (catalogItem && catalogItem.name) || 'Camping',
      location: marker.location || (catalogItem && catalogItem.country + ' · ' + catalogItem.region) || '',
      description: marker.description || (catalogItem && catalogItem.why) || '',
      image: marker.image || (catalogItem && catalogItem.image) || '',
      page: marker.page || (catalogItem && catalogItem.page) || '',
    };
  }

  function renderPins() {
    if (!pinsLayer) return;

    pinsLayer.innerHTML = markers
      .map(function (marker, index) {
        var item = resolveMarker(marker);
        return (
          '<button type="button" class="mc-map__pin" data-id="' +
          esc(marker.id) +
          '" style="--pin-x:' +
          marker.left +
          '%;--pin-y:' +
          marker.top +
          '%;" aria-label="' +
          esc(item.name + ', ' + item.location) +
          '" aria-expanded="false">' +
          '<span class="mc-map__pin-ring" aria-hidden="true"></span>' +
          '<span class="mc-map__pin-core" aria-hidden="true"></span>' +
          '<span class="mc-map__pin-label">' +
          esc(item.name.replace(/^Camping\s+/i, '')) +
          '</span>' +
          '</button>'
        );
      })
      .join('');
  }

  function cardHtml(item, linkClass, bodyClass) {
    var bodyCls = bodyClass || 'mc-map-popover__body';
    var metaCls = bodyClass ? 'mc-map-sheet__meta' : 'mc-map-popover__meta';
    var titleCls = bodyClass ? 'mc-map-sheet__title' : 'mc-map-popover__title';
    var descCls = bodyClass ? 'mc-map-sheet__why' : 'mc-map-popover__desc';
    var mediaPrefix = bodyClass ? 'mc-map-sheet' : 'mc-map-popover';

    return (
      (item.image
        ? '<div class="' +
          mediaPrefix +
          '__media"><img src="' +
          esc(item.image) +
          '" alt="" width="480" height="270" loading="lazy" decoding="async" /></div>'
        : '') +
      '<div class="' +
      bodyCls +
      '">' +
      '<p class="' +
      metaCls +
      '">' +
      esc(item.location) +
      '</p>' +
      '<h3 class="' +
      titleCls +
      '">' +
      esc(item.name) +
      '</h3>' +
      '<p class="' +
      descCls +
      '">' +
      esc(item.description) +
      '</p>' +
      (item.page
        ? '<a href="' +
          esc(item.page) +
          '" class="' +
          linkClass +
          '">Ver guía del destino →</a>'
        : '') +
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

  function findMarker(id) {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].id === id) return markers[i];
    }
    return null;
  }

  function positionPopover(pin) {
    if (!popover || isMobile()) return;

    var mapRect = mapRoot.getBoundingClientRect();
    var pinRect = pin.getBoundingClientRect();
    var pinCenterX = pinRect.left + pinRect.width / 2 - mapRect.left;
    var pinCenterY = pinRect.top + pinRect.height / 2 - mapRect.top;

    var popoverHeight = popover.offsetHeight || 280;
    var placeBelow = pinCenterY < popoverHeight + 24;

    popover.style.left = pinCenterX + 'px';
    popover.style.top = pinCenterY + 'px';
    popover.classList.toggle('is-below', placeBelow);
  }

  function openPin(pin) {
    var marker = findMarker(pin.getAttribute('data-id'));
    if (!marker) return;

    var item = resolveMarker(marker);

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
          cardHtml(item, 'mc-map-sheet__cta', 'mc-map-sheet__body') +
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
