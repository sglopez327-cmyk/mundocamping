/**
 * Mapa interactivo + grid de destinos
 * Desktop: tooltip flotante junto al pin
 * Móvil (<768px): panel inferior a pantalla completa de ancho
 */
(function () {
  'use strict';

  var destinos = window.MC_DESTINOS || [];
  var mapEl = document.getElementById('destinos-map');
  var gridEl = document.getElementById('destinos-grid');
  var tooltipEl = document.getElementById('destinos-tooltip');
  var backdropEl = document.getElementById('destinos-sheet-backdrop');
  if (!mapEl || !gridEl || !tooltipEl || !destinos.length) return;

  var activeId = null;
  var hideTimer = null;
  var MOBILE_MQ = '(max-width: 767px)';

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

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
        if (isMobile()) return;
        showTooltip(d, btn);
      });
      btn.addEventListener('focus', function () {
        if (isMobile()) return;
        showTooltip(d, btn);
      });
      btn.addEventListener('mouseleave', function () {
        if (isMobile()) return;
        scheduleHide();
      });
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        selectDestino(d.id, !isMobile());
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

  function fillTooltipContent(d, mobile) {
    var linkHtml = d.page
      ? '<a href="' +
        escapeHtml(d.page) +
        '" class="destinos-tooltip__cta inline-flex items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-bold text-[#deff9a]">Ver guía completa →</a>'
      : '';

    if (mobile) {
      tooltipEl.innerHTML =
        '<div class="destinos-tooltip__sheet">' +
        '<div class="destinos-tooltip__handle" aria-hidden="true"></div>' +
        '<button type="button" class="destinos-tooltip__close" aria-label="Cerrar">' +
        '<span aria-hidden="true">×</span></button>' +
        '<div class="destinos-tooltip__media"><img src="' +
        escapeHtml(d.image) +
        '" alt="' +
        escapeHtml(d.name) +
        '" width="640" height="360" decoding="async" /></div>' +
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
        (d.tip ? '<p class="destinos-tooltip__tip">' + escapeHtml(d.tip) + '</p>' : '') +
        (linkHtml ? '<div class="destinos-tooltip__actions">' + linkHtml + '</div>' : '') +
        '</div></div>';
    } else {
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
    }
  }

  function showTooltip(d, pinBtn) {
    clearTimeout(hideTimer);
    activeId = d.id;

    var mobile = isMobile();
    fillTooltipContent(d, mobile);

    tooltipEl.classList.toggle('is-mobile-sheet', mobile);
    tooltipEl.classList.toggle('is-desktop-float', !mobile);

    if (mobile) {
      tooltipEl.style.left = '';
      tooltipEl.style.top = '';
      tooltipEl.style.transform = '';
      tooltipEl.classList.remove('is-below', 'is-above', 'is-measuring');
      tooltipEl.setAttribute('aria-modal', 'true');
      tooltipEl.setAttribute('role', 'dialog');
      tooltipEl.setAttribute('aria-label', d.name);
      document.body.classList.add('destinos-sheet-open');

      if (backdropEl) {
        backdropEl.classList.remove('hidden');
        backdropEl.setAttribute('aria-hidden', 'false');
      }

      var closeBtn = tooltipEl.querySelector('.destinos-tooltip__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          hideTooltip(true);
        });
      }
    } else {
      tooltipEl.setAttribute('aria-modal', 'false');
      if (backdropEl) {
        backdropEl.classList.add('hidden');
        backdropEl.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.remove('destinos-sheet-open');
      if (pinBtn) positionTooltip(pinBtn);
    }

    tooltipEl.classList.add('is-visible');
    tooltipEl.setAttribute('aria-hidden', 'false');

    if (!mobile && pinBtn) {
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
    }

    mapEl.querySelectorAll('.destinos-map__pin').forEach(function (p) {
      p.classList.toggle('is-active', p.dataset.id === d.id);
    });
  }

  /**
   * Coloca el tooltip dentro del mapa (solo desktop):
   * - arriba del pin si hay espacio
   * - debajo si el pin está cerca del borde superior
   * - left clamped para no salir por los lados
   */
  function positionTooltip(pinBtn) {
    if (isMobile() || !pinBtn) return;

    var pad = 10;
    var gap = 12;
    var mapW = mapEl.clientWidth;
    var mapH = mapEl.clientHeight;
    var mapRect = mapEl.getBoundingClientRect();
    var pinRect = pinBtn.getBoundingClientRect();

    // El tooltip ya no vive dentro del mapa: coordenadas relativas al mapa + offset del shell
    var shell = mapEl.closest('.destinos-map-shell') || mapEl;
    var shellRect = shell.getBoundingClientRect();

    tooltipEl.classList.add('is-measuring');
    tooltipEl.classList.add('is-visible');
    tooltipEl.style.left = '0px';
    tooltipEl.style.top = '0px';
    tooltipEl.style.transform = 'none';

    var tipW = tooltipEl.offsetWidth || Math.min(304, mapW - pad * 2);
    var tipH = tooltipEl.offsetHeight || 220;

    var pinCenterX = pinRect.left - shellRect.left + pinRect.width / 2;
    var pinTop = pinRect.top - shellRect.top;
    var pinBottom = pinRect.bottom - shellRect.top;
    var shellH = shellRect.height;

    var spaceAbove = pinTop - pad;
    var spaceBelow = shellH - pinBottom - pad;
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

    left = Math.max(pad, Math.min(left, shellRect.width - tipW - pad));
    top = Math.max(pad, Math.min(top, shellH - tipH - pad));

    // Posicionar respecto al shell (position absolute sobre el shell)
    ensureDesktopAnchor(shell);

    tooltipEl.style.left = Math.round(left) + 'px';
    tooltipEl.style.top = Math.round(top) + 'px';
    tooltipEl.classList.toggle('is-below', placeBelow);
    tooltipEl.classList.toggle('is-above', !placeBelow);
    tooltipEl.classList.remove('is-measuring');
  }

  function ensureDesktopAnchor(shell) {
    if (tooltipEl.parentElement === shell) return;
    if (!isMobile()) {
      shell.style.position = shell.style.position || 'relative';
      shell.appendChild(tooltipEl);
    }
  }

  function ensureMobileAnchor() {
    var host = document.getElementById('destinos-mobile-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'destinos-mobile-host';
      document.body.appendChild(host);
    }
    if (backdropEl && backdropEl.parentElement !== host) host.appendChild(backdropEl);
    if (tooltipEl.parentElement !== host) host.appendChild(tooltipEl);
  }

  function hideTooltip(immediate) {
    clearTimeout(hideTimer);
    var doHide = function () {
      tooltipEl.classList.remove('is-visible', 'is-mobile-sheet', 'is-desktop-float', 'is-below', 'is-above');
      tooltipEl.setAttribute('aria-hidden', 'true');
      tooltipEl.setAttribute('aria-modal', 'false');
      tooltipEl.style.left = '';
      tooltipEl.style.top = '';
      document.body.classList.remove('destinos-sheet-open');
      if (backdropEl) {
        backdropEl.classList.add('hidden');
        backdropEl.setAttribute('aria-hidden', 'true');
      }
      if (!document.querySelector('.destino-card.is-active')) {
        mapEl.querySelectorAll('.destinos-map__pin.is-active').forEach(function (p) {
          p.classList.remove('is-active');
        });
      }
    };
    if (immediate) doHide();
    else hideTimer = setTimeout(doHide, 160);
  }

  function scheduleHide() {
    if (isMobile()) return;
    hideTooltip(false);
  }

  function selectDestino(id, scroll) {
    var d = findDestino(id);
    if (!d) return;
    activeId = id;

    gridEl.querySelectorAll('.destino-card').forEach(function (card) {
      card.classList.toggle('is-active', card.dataset.id === id);
    });

    var pin = mapEl.querySelector('.destinos-map__pin[data-id="' + id + '"]');
    if (isMobile()) {
      ensureMobileAnchor();
      showTooltip(d, pin);
    } else {
      var shell = mapEl.closest('.destinos-map-shell') || mapEl;
      ensureDesktopAnchor(shell);
      if (pin) showTooltip(d, pin);
    }

    if (scroll) {
      var card = gridEl.querySelector('.destino-card[data-id="' + id + '"]');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  tooltipEl.addEventListener('mouseenter', function () {
    if (isMobile()) return;
    clearTimeout(hideTimer);
  });
  tooltipEl.addEventListener('mouseleave', scheduleHide);

  if (backdropEl) {
    backdropEl.addEventListener('click', function () {
      hideTooltip(true);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && tooltipEl.classList.contains('is-visible')) {
      hideTooltip(true);
    }
  });

  window.addEventListener('resize', function () {
    if (!tooltipEl.classList.contains('is-visible') || !activeId) return;
    var d = findDestino(activeId);
    var pin = mapEl.querySelector('.destinos-map__pin[data-id="' + activeId + '"]');
    if (!d) return;
    if (isMobile()) {
      ensureMobileAnchor();
      showTooltip(d, pin);
    } else {
      document.body.classList.remove('destinos-sheet-open');
      if (backdropEl) backdropEl.classList.add('hidden');
      var shell = mapEl.closest('.destinos-map-shell') || mapEl;
      ensureDesktopAnchor(shell);
      if (pin) showTooltip(d, pin);
    }
  });

  renderPins();
  renderGrid();

  // Ancla inicial según viewport
  if (isMobile()) ensureMobileAnchor();
  else ensureDesktopAnchor(mapEl.closest('.destinos-map-shell') || mapEl);
})();
