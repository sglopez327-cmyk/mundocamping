/**
 * Mapa interactivo + grid de destinos
 */
(function () {
  'use strict';

  var destinos = window.MC_DESTINOS || [];
  var mapEl = document.getElementById('destinos-map');
  var gridEl = document.getElementById('destinos-grid');
  var tooltipEl = document.getElementById('destinos-tooltip');
  if (!mapEl || !gridEl || !destinos.length) return;

  var activeId = null;
  var hideTimer = null;

  function xy(d) {
    if (typeof window.mcDestinoXY === 'function') return window.mcDestinoXY(d.lat, d.lng);
    return { x: 50, y: 50 };
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPins() {
    destinos.forEach(function (d) {
      var pos = xy(d);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'destinos-map__pin';
      btn.style.left = pos.x + '%';
      btn.style.top = pos.y + '%';
      btn.dataset.id = d.id;
      btn.setAttribute('aria-label', d.name + ', ' + d.country);
      btn.addEventListener('mouseenter', function () {
        showTooltip(d, btn);
      });
      btn.addEventListener('focus', function () {
        showTooltip(d, btn);
      });
      btn.addEventListener('mouseleave', scheduleHide);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        selectDestino(d.id, true);
      });
      mapEl.appendChild(btn);
    });
  }

  function renderGrid() {
    gridEl.innerHTML = destinos
      .map(function (d) {
        return (
          '<article class="destino-card" data-id="' +
          escapeHtml(d.id) +
          '" tabindex="0" role="button" aria-label="' +
          escapeHtml(d.name) +
          '">' +
          '<div class="destino-card__media">' +
          '<img src="' +
          escapeHtml(d.image) +
          '" alt="' +
          escapeHtml(d.name + ', ' + d.country) +
          '" width="480" height="300" loading="lazy" decoding="async" />' +
          '</div>' +
          '<div class="destino-card__body">' +
          '<p class="destino-card__meta">' +
          escapeHtml(d.country + ' · ' + d.region) +
          '</p>' +
          '<h3 class="destino-card__title">' +
          escapeHtml(d.name) +
          '</h3>' +
          '<p class="destino-card__why">' +
          escapeHtml(d.why) +
          '</p>' +
          '<p class="destino-card__tip">' +
          escapeHtml(d.tip) +
          '</p>' +
          (d.page
            ? '<p class="destino-card__tip"><a href="' +
              escapeHtml(d.page) +
              '" class="text-[#deff9a] hover:underline">Guía completa →</a></p>'
            : '') +
          '</div></article>'
        );
      })
      .join('');

    gridEl.querySelectorAll('.destino-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target && e.target.closest && e.target.closest('a')) return;
        selectDestino(card.dataset.id, true);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectDestino(card.dataset.id, true);
        }
      });
    });
  }

  function findDestino(id) {
    for (var i = 0; i < destinos.length; i++) {
      if (destinos[i].id === id) return destinos[i];
    }
    return null;
  }

  function showTooltip(d, pinBtn) {
    clearTimeout(hideTimer);
    activeId = d.id;

    tooltipEl.innerHTML =
      '<div class="destinos-tooltip__card">' +
      '<div class="destinos-tooltip__media"><img src="' +
      escapeHtml(d.image) +
      '" alt="" width="320" height="180" decoding="async" /></div>' +
      '<div class="destinos-tooltip__body">' +
      '<p class="destinos-tooltip__meta">' +
      escapeHtml(d.country + ' · ' + d.region) +
      '</p>' +
      '<p class="destinos-tooltip__title">' +
      escapeHtml(d.name) +
      '</p>' +
      '<p class="destinos-tooltip__why">' +
      escapeHtml(d.why) +
      '</p>' +
      '</div></div>';

    positionTooltip(pinBtn);
    tooltipEl.classList.add('is-visible');
    tooltipEl.setAttribute('aria-hidden', 'false');

    var tipImg = tooltipEl.querySelector('img');
    if (tipImg && !tipImg.complete) {
      tipImg.addEventListener(
        'load',
        function () {
          if (activeId === d.id) positionTooltip(pinBtn);
        },
        { once: true }
      );
    }

    mapEl.querySelectorAll('.destinos-map__pin').forEach(function (p) {
      p.classList.toggle('is-active', p.dataset.id === d.id);
    });
  }

  /**
   * Coloca el tooltip dentro del mapa:
   * - arriba del pin si hay espacio
   * - debajo si el pin está cerca del borde superior (o no cabe arriba)
   * - left clamped para no salir por los lados
   */
  function positionTooltip(pinBtn) {
    var pad = 10;
    var gap = 12;
    var mapW = mapEl.clientWidth;
    var mapH = mapEl.clientHeight;
    var mapRect = mapEl.getBoundingClientRect();
    var pinRect = pinBtn.getBoundingClientRect();

    // Medir sin flash: visible para layout, invisible a la vista
    tooltipEl.classList.add('is-measuring');
    tooltipEl.classList.add('is-visible');
    tooltipEl.style.left = '0px';
    tooltipEl.style.top = '0px';
    tooltipEl.style.transform = 'none';

    var tipW = tooltipEl.offsetWidth || Math.min(304, mapW - pad * 2);
    var tipH = tooltipEl.offsetHeight || 220;

    var pinCenterX = pinRect.left - mapRect.left + pinRect.width / 2;
    var pinTop = pinRect.top - mapRect.top;
    var pinBottom = pinRect.bottom - mapRect.top;

    var spaceAbove = pinTop - pad;
    var spaceBelow = mapH - pinBottom - pad;
    var need = tipH + gap;

    var placeBelow;
    if (spaceAbove >= need) {
      placeBelow = false;
    } else if (spaceBelow >= need) {
      placeBelow = true;
    } else {
      placeBelow = spaceBelow > spaceAbove;
    }

    var top = placeBelow ? pinBottom + gap : pinTop - tipH - gap;
    var left = pinCenterX - tipW / 2;

    left = Math.max(pad, Math.min(left, mapW - tipW - pad));
    top = Math.max(pad, Math.min(top, mapH - tipH - pad));

    tooltipEl.style.left = Math.round(left) + 'px';
    tooltipEl.style.top = Math.round(top) + 'px';
    tooltipEl.classList.toggle('is-below', placeBelow);
    tooltipEl.classList.toggle('is-above', !placeBelow);
    tooltipEl.classList.remove('is-measuring');
  }

  function scheduleHide() {
    hideTimer = setTimeout(function () {
      tooltipEl.classList.remove('is-visible');
      tooltipEl.setAttribute('aria-hidden', 'true');
      if (!document.querySelector('.destino-card.is-active')) {
        mapEl.querySelectorAll('.destinos-map__pin.is-active').forEach(function (p) {
          p.classList.remove('is-active');
        });
      }
    }, 160);
  }

  function selectDestino(id, scroll) {
    var d = findDestino(id);
    if (!d) return;
    activeId = id;

    gridEl.querySelectorAll('.destino-card').forEach(function (card) {
      card.classList.toggle('is-active', card.dataset.id === id);
    });

    var pin = mapEl.querySelector('.destinos-map__pin[data-id="' + id + '"]');
    if (pin) showTooltip(d, pin);

    if (scroll) {
      var card = gridEl.querySelector('.destino-card[data-id="' + id + '"]');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  tooltipEl.addEventListener('mouseenter', function () {
    clearTimeout(hideTimer);
  });
  tooltipEl.addEventListener('mouseleave', scheduleHide);

  renderPins();
  renderGrid();
})();
