/**
 * Mapa de campings — componente independiente.
 * Pines con left/top en % sobre la imagen estática del mapa.
 */
(function () {
  'use strict';

  var config = window.CAMPINGS_MAP;
  if (!config || !config.markers || !config.markers.length) return;

  var wrap = document.getElementById('campings-map-wrap');
  var stage = document.getElementById('campings-map-stage');
  var pinsLayer = document.getElementById('campings-map-pins');
  var tooltip = document.getElementById('campings-map-tooltip');
  var grid = document.getElementById('destinos-grid');
  var catalog = window.CAMPINGS_CATALOG || [];

  if (!wrap || !stage || !pinsLayer || !tooltip) return;

  var markers = config.markers;
  var activeId = null;
  var hideTimer = null;
  var mobile = window.matchMedia('(max-width: 767px)');

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function byId(id) {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].id === id) return markers[i];
    }
    return null;
  }

  function buildPins() {
    pinsLayer.innerHTML = '';
    markers.forEach(function (m) {
      var pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'campings-map__pin';
      pin.style.left = m.left + '%';
      pin.style.top = m.top + '%';
      pin.dataset.id = m.id;
      pin.setAttribute('aria-label', m.name + ', ' + m.country);

      pin.addEventListener('mouseenter', onPinEnter);
      pin.addEventListener('mouseleave', onPinLeave);
      pin.addEventListener('focus', onPinEnter);
      pin.addEventListener('blur', onPinLeave);
      pin.addEventListener('click', onPinClick);

      pinsLayer.appendChild(pin);
    });
  }

  function onPinEnter(e) {
    if (mobile.matches) return;
    showTooltip(byId(e.currentTarget.dataset.id), e.currentTarget);
  }

  function onPinLeave() {
    if (mobile.matches) return;
    scheduleHide();
  }

  function onPinClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var m = byId(e.currentTarget.dataset.id);
    if (!m) return;
    if (mobile.matches) {
      if (activeId === m.id) hideTooltip();
      else showTooltip(m, e.currentTarget, true);
    } else {
      showTooltip(m, e.currentTarget);
    }
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideTooltip, 140);
  }

  function tooltipContent(m, isMobile) {
    var link = m.page
      ? '<a class="campings-map-tooltip__link" href="' + esc(m.page) + '">Ver ficha →</a>'
      : '';

    if (isMobile) {
      return (
        '<div class="campings-map-tooltip__panel">' +
        '<button type="button" class="campings-map-tooltip__close" aria-label="Cerrar">×</button>' +
        (m.image
          ? '<div class="campings-map-tooltip__photo"><img src="' +
            esc(m.image) +
            '" alt="" decoding="async" /></div>'
          : '') +
        '<div class="campings-map-tooltip__body">' +
        '<p class="campings-map-tooltip__meta">' +
        esc(m.country + (m.region ? ' · ' + m.region : '')) +
        '</p>' +
        '<h3 class="campings-map-tooltip__title">' +
        esc(m.name) +
        '</h3>' +
        '<p class="campings-map-tooltip__text">' +
        esc(m.text) +
        '</p>' +
        link +
        '</div></div>'
      );
    }

    return (
      '<div class="campings-map-tooltip__panel campings-map-tooltip__panel--float">' +
      '<p class="campings-map-tooltip__meta">' +
      esc(m.country) +
      '</p>' +
      '<h3 class="campings-map-tooltip__title">' +
      esc(m.name) +
      '</h3>' +
      '<p class="campings-map-tooltip__text">' +
      esc(m.text) +
      '</p>' +
      link +
      '</div>'
    );
  }

  function showTooltip(m, pin, forceMobile) {
    if (!m || !pin) return;
    clearTimeout(hideTimer);
    activeId = m.id;

    var isMobile = forceMobile || mobile.matches;
    tooltip.innerHTML = tooltipContent(m, isMobile);
    tooltip.hidden = false;
    tooltip.classList.remove('is-hidden');
    tooltip.classList.toggle('is-mobile', isMobile);
    tooltip.classList.toggle('is-desktop', !isMobile);

    pinsLayer.querySelectorAll('.campings-map__pin').forEach(function (el) {
      el.classList.toggle('is-active', el.dataset.id === m.id);
    });

    if (isMobile) {
      document.body.classList.add('campings-map-open');
      var closeBtn = tooltip.querySelector('.campings-map-tooltip__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function (ev) {
          ev.preventDefault();
          hideTooltip();
        });
      }
      return;
    }

    placeTooltipNearPin(pin);
  }

  function placeTooltipNearPin(pin) {
    tooltip.style.left = '0px';
    tooltip.style.top = '0px';
    tooltip.classList.add('is-measuring');

    var pad = 10;
    var gap = 12;
    var wrapBox = wrap.getBoundingClientRect();
    var pinBox = pin.getBoundingClientRect();
    var tipW = tooltip.offsetWidth;
    var tipH = tooltip.offsetHeight;
    var cx = pinBox.left - wrapBox.left + pinBox.width / 2;
    var pinTop = pinBox.top - wrapBox.top;
    var pinBottom = pinBox.bottom - wrapBox.top;
    var above = pinTop >= tipH + gap + pad;
    var top = above ? pinTop - tipH - gap : pinBottom + gap;
    var left = cx - tipW / 2;

    left = Math.max(pad, Math.min(left, wrapBox.width - tipW - pad));
    top = Math.max(pad, Math.min(top, wrapBox.height - tipH - pad));

    tooltip.style.left = Math.round(left) + 'px';
    tooltip.style.top = Math.round(top) + 'px';
    tooltip.classList.remove('is-measuring');
  }

  function hideTooltip() {
    clearTimeout(hideTimer);
    activeId = null;
    tooltip.hidden = true;
    tooltip.classList.add('is-hidden');
    tooltip.classList.remove('is-mobile', 'is-desktop', 'is-measuring');
    tooltip.style.left = '';
    tooltip.style.top = '';
    document.body.classList.remove('campings-map-open');
    pinsLayer.querySelectorAll('.campings-map__pin.is-active').forEach(function (el) {
      el.classList.remove('is-active');
    });
  }

  function buildGrid() {
    if (!grid || !catalog.length) return;

    grid.innerHTML = catalog
      .map(function (item) {
        return (
          '<article class="destino-card" data-id="' +
          esc(item.id) +
          '" tabindex="0" role="button">' +
          '<div class="destino-card__media"><img src="' +
          esc(item.image) +
          '" alt="' +
          esc(item.name) +
          '" loading="lazy" decoding="async" /></div>' +
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
          (item.page
            ? '<p class="destino-card__tip"><a href="' +
              esc(item.page) +
              '" class="text-[#deff9a] hover:underline">Guía completa →</a></p>'
            : '') +
          '</div></article>'
        );
      })
      .join('');

    grid.querySelectorAll('.destino-card').forEach(function (card) {
      card.addEventListener('click', function (ev) {
        if (ev.target.closest('a')) return;
        var pin = pinsLayer.querySelector('[data-id="' + card.dataset.id + '"]');
        var m = byId(card.dataset.id);
        if (pin && m) {
          pin.focus();
          showTooltip(m, pin, mobile.matches);
        }
      });
    });
  }

  tooltip.addEventListener('mouseenter', function () {
    if (!mobile.matches) clearTimeout(hideTimer);
  });
  tooltip.addEventListener('mouseleave', function () {
    if (!mobile.matches) scheduleHide();
  });

  stage.addEventListener('click', function (ev) {
    if (ev.target === stage || ev.target.classList.contains('campings-map__image')) hideTooltip();
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') hideTooltip();
  });

  window.addEventListener('resize', function () {
    if (activeId && !mobile.matches) {
      var pin = pinsLayer.querySelector('[data-id="' + activeId + '"]');
      if (pin) placeTooltipNearPin(pin);
    }
  });

  buildPins();
  buildGrid();
})();
