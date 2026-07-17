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
          '</div></article>'
        );
      })
      .join('');

    gridEl.querySelectorAll('.destino-card').forEach(function (card) {
      card.addEventListener('click', function () {
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
    var rect = mapEl.getBoundingClientRect();
    var pinRect = pinBtn.getBoundingClientRect();
    var left = pinRect.left - rect.left + pinRect.width / 2;
    var top = pinRect.top - rect.top;

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

    tooltipEl.style.left = left + 'px';
    tooltipEl.style.top = top + 'px';
    tooltipEl.classList.add('is-visible');
    tooltipEl.setAttribute('aria-hidden', 'false');

    mapEl.querySelectorAll('.destinos-map__pin').forEach(function (p) {
      p.classList.toggle('is-active', p.dataset.id === d.id);
    });
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
