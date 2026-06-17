/**
 * Mundo Camping — ArticleToc
 * Componente estándar de Tabla de Contenidos para guías editoriales.
 *
 * Uso:
 *   <nav id="article-toc" class="article-toc" aria-labelledby="toc-title"></nav>
 *   <script src="./js/article-toc.js"></script>
 *   <script>ArticleToc.render({ containerId: 'article-toc', items: TOC_ITEMS });</script>
 *
 * Estilos: components/toc.css (vía styles-guias.css)
 * CTAs: clase global .cta-button-highlight (mundo-camping.css)
 */
(function (global) {
  'use strict';

  var ICON_STROKE = '1.75';

  var ICONS = {
    intro:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      ICON_STROKE +
      '" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>',
    table:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      ICON_STROKE +
      '" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    tools:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      ICON_STROKE +
      '" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    faq:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      ICON_STROKE +
      '" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
    conclusion:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      ICON_STROKE +
      '" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
    pros:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      ICON_STROKE +
      '" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/></svg>',
    winner:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      ICON_STROKE +
      '" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  };

  var CTA_ARROW =
    '<svg class="article-toc__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
    ICON_STROKE +
    '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizeSpecLabel(label) {
    var map = {
      'Impermeab.': 'Impermeabilidad',
      'Portab.': 'Portabilidad',
    };
    return map[label] || label;
  }

  function normalizeSpecValue(value) {
    var v = String(value || '').trim();
    if (!v) return v;

    var footnote = '';
    if (v.indexOf('*') !== -1) {
      footnote = '*';
      v = v.replace(/\*/g, '').trim();
    }

    v = v.replace(/[–—−]/g, ' - ').replace(/\s+/g, ' ');

    var approx = v.charAt(0) === '~';
    if (approx) v = v.slice(1).trim();

    var tempRange = v.match(/^(\d+(?:[,\.]\d+)?)\s*-\s*(\d+(?:[,\.]\d+)?)\s*°?\s*C$/i);
    if (tempRange) {
      var tLo = parseFloat(tempRange[1].replace(',', '.'));
      var tHi = parseFloat(tempRange[2].replace(',', '.'));
      if (!isNaN(tLo) && !isNaN(tHi) && tLo > tHi) {
        var swap = tLo;
        tLo = tHi;
        tHi = swap;
      }
      var loStr = String(tLo).replace('.', ',');
      var hiStr = String(tHi).replace('.', ',');
      return (approx ? '~' : '') + loStr + ' - ' + hiStr + ' °C' + footnote;
    }

    var tempSingle = v.match(/^(\d+(?:[,\.]\d+)?)\s*°?\s*C$/i);
    if (tempSingle) {
      return (approx ? '~' : '') + tempSingle[1] + ' °C' + footnote;
    }

    var mmRange = v.match(/^(\d+)\s*-\s*(\d+)\s*mm$/i);
    if (mmRange) {
      return mmRange[1] + ' - ' + mmRange[2] + ' mm' + footnote;
    }

    var mmSingle = v.match(/^(\d+)\s*mm$/i);
    if (mmSingle) {
      return mmSingle[1] + ' mm' + footnote;
    }

    var hourRange = v.match(/^(\d+(?:[,\.]\d+)?)\s*-\s*(\d+(?:[,\.]\d+)?)\s*h$/i);
    if (hourRange) {
      return (approx ? '~' : '') + hourRange[1] + ' - ' + hourRange[2] + ' h' + footnote;
    }

    v = v.replace(/(\d)\s*-\s*(\d)\s+P\b/i, '$1 - $2 P');
    v = v.replace(/(\d+)\s*lm\b/i, '$1 lm');
    v = v.replace(/^IPX\s?(\d+)$/i, 'IPX$1');
    v = v.replace(/(\d),(\d+)\s*kg/i, '$1,$2 kg');

    return (approx ? '~' : '') + v + footnote;
  }

  function normalizeSpecs(specs) {
    if (!specs || !specs.length) return specs;
    return specs.map(function (spec) {
      return {
        label: normalizeSpecLabel(spec.label),
        value: normalizeSpecValue(spec.value),
      };
    });
  }

  function renderSpecs(specs) {
    var normalized = normalizeSpecs(specs);
    if (!normalized || !normalized.length) return '';
    return (
      '<span class="article-toc__specs">' +
      normalized
        .map(function (spec) {
          return (
            '<span class="article-toc__spec">' +
            '<span class="article-toc__spec-label">' +
            escapeHtml(spec.label) +
            '</span>' +
            '<span class="article-toc__spec-value">' +
            escapeHtml(spec.value) +
            '</span>' +
            '</span>'
          );
        })
        .join('') +
      '</span>'
    );
  }

  function renderMedia(item) {
    if (item.type === 'product' && item.image) {
      var thumbClass = 'article-toc__thumb';
      if (item.variant === 'winner' || item.variant === 'featured') {
        thumbClass += ' article-toc__thumb--winner';
      }
      return (
        '<span class="' +
        thumbClass +
        '">' +
        '<img src="' +
        escapeHtml(item.image) +
        '" alt="" loading="lazy" decoding="async" width="48" height="48" />' +
        '</span>'
      );
    }

    var iconKey = item.icon || 'intro';
    var iconClass = 'article-toc__icon';
    if (item.variant === 'winner') iconClass += ' article-toc__icon--winner';
    var svg = ICONS[iconKey] || item.icon || ICONS.intro;
    return '<span class="' + iconClass + '">' + svg + '</span>';
  }

  function cardClasses(item) {
    var classes = ['article-toc__card'];
    if (item.type === 'product') classes.push('article-toc__card--product');
    if (item.type === 'section') classes.push('article-toc__card--section');
    if (item.variant === 'winner') classes.push('article-toc__card--winner');
    if (item.variant === 'featured') classes.push('article-toc__card--featured');
    if (item.specs && item.specs.length) classes.push('article-toc__card--has-specs');
    return classes.join(' ');
  }

  function defaultCta(item, config) {
    if (item.cta) return item.cta;
    if (item.type === 'product') {
      return (config && config.productCta) || 'Ver análisis completo';
    }
    return 'Ir';
  }

  function renderBadge(item) {
    if (!item.badge) return '';
    return '<span class="article-toc__badge">' + escapeHtml(item.badge) + '</span>';
  }

  function renderItem(item, config) {
    var cta = defaultCta(item, config);
    var numbered = !config || config.numbered !== false;
    var rankHtml = numbered ? '<span class="article-toc__card-rank" aria-hidden="true"></span>' : '';
    return (
      '<li>' +
      '<a class="' +
      cardClasses(item) +
      '" href="' +
      escapeHtml(item.href) +
      '">' +
      rankHtml +
      '<span class="article-toc__card-media" aria-hidden="true">' +
      renderMedia(item) +
      '</span>' +
      '<span class="article-toc__card-body">' +
      '<span class="article-toc__card-title">' +
      escapeHtml(item.title) +
      '</span>' +
      renderBadge(item) +
      renderSpecs(item.specs) +
      '</span>' +
      '<span class="article-toc__card-action">' +
      '<span class="article-toc__cta cta-button-highlight">' +
      escapeHtml(cta) +
      CTA_ARROW +
      '</span>' +
      '</span>' +
      '</a>' +
      '</li>'
    );
  }

  function render(config) {
    var containerId = (config && config.containerId) || 'article-toc';
    var nav = document.getElementById(containerId);
    if (!nav || !config || !config.items || !config.items.length) return;

    var title = config.title || 'Tabla de contenidos';
    var titleId = config.titleId || 'toc-title';

    nav.classList.add('article-toc', 'article-toc--cards', 'article-toc--premium');
    if (config.numbered === false) {
      nav.classList.add('article-toc--no-rank');
    }
    nav.setAttribute('aria-labelledby', titleId);

    nav.innerHTML =
      '<h2 id="' +
      escapeHtml(titleId) +
      '" class="article-toc__title">' +
      escapeHtml(title) +
      '</h2>' +
      '<ol class="article-toc__list">' +
      config.items
        .map(function (item) {
          return renderItem(item, config);
        })
        .join('') +
      '</ol>';
  }

  global.ArticleToc = {
    render: render,
    icons: ICONS,
    normalizeSpecValue: normalizeSpecValue,
    normalizeSpecLabel: normalizeSpecLabel,
  };
})(typeof window !== 'undefined' ? window : this);
