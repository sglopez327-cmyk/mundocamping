/**
 * Mundo Camping — ArticleSidebarStandard
 * Sidebar derecho unificado para guías editoriales.
 *
 * Uso en cualquier guía:
 *   <aside class="article-sidebar" data-article-sidebar data-sidebar-id="esterillas">
 *     <div class="article-sidebar__sticky"></div>
 *   </aside>
 *   <script src="js/article-sidebar-standard.js"></script>
 *
 * Un solo cambio aquí actualiza el sidebar de todas las guías.
 */
(function (global) {
  'use strict';

  var TIP_ICON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12v2h8v-2a7 7 0 0 0-4-12z"/></svg>';

  var CATEGORIES = [
    { label: 'Guías Destacadas', href: 'index.html', highlight: true },
    { label: 'Tiendas de Campaña', href: 'tiendas.html' },
    { label: 'Sacos', href: 'sacos.html' },
    { label: 'Esterillas', href: 'esterillas.html' },
    { label: 'Baterías y Energía', href: 'baterias.html' },
    { label: 'Iluminación', href: 'iluminacion/' },
    { label: 'Herramientas', href: 'herramientas.html' },
    { label: 'Accesorios', href: 'accesorios.html' },
  ];

  var CONFIGS = {
    template: {
      specs: [
        ['Peso', '—'],
        ['Material', '—'],
        ['Clasificación', '—'],
      ],
      tip: 'Compara siempre el producto ganador con la tabla completa: el mejor equilibrio no siempre es el más caro ni el más ligero.',
      help: '¿Dudas con tu elección? Revisa la comparativa antes de comprar.',
      helpHref: '#tabla-comparativa',
    },
    esterillas: {
      specs: [
        ['Peso', '~454 g'],
        ['Material', 'Nailon 30D'],
        ['R-Value', 'R 4,5'],
      ],
      tip: 'No olvides comprobar la temperatura de confort y el R-Value antes de comprar: un saco inadecuado no compensa una buena esterilla.',
      help: 'Compara peso, material y aislamiento térmico de las 5 esterillas analizadas.',
      helpHref: '#tabla-comparativa',
    },
    'tiendas-familia': {
      specs: [
        ['Capacidad', '5–6 personas'],
        ['Peso', '~8 kg'],
        ['Tipo', 'Doble pared 4 est.'],
      ],
      tip: 'Con niños, la altura interior importa tanto como la capacidad nominal: poder estar de pie reduce el caos al vestirse o jugar dentro de la tienda.',
      help: 'Compara espacio, peso y resistencia al viento de las 5 tiendas del ranking.',
      helpHref: '#tabla-comparativa',
    },
    'tiendas-parejas': {
      specs: [
        ['Capacidad', '2 personas'],
        ['Peso', '~1,9 kg'],
        ['Impermeabilidad', '3000–4000 mm'],
      ],
      tip: 'En pareja, prioriza doble entrada y vestíbulo amplio: evitarás pisar el saco del otro al entrar y salir de noche.',
      help: 'Compara espacio interior, peso e impermeabilidad antes de decidir.',
      helpHref: '#tabla-comparativa',
    },
    energia: {
      specs: [
        ['Capacidad', '99 Wh'],
        ['Material', 'LiFePO4'],
        ['Peso', '1,6 kg'],
      ],
      tip: 'Calcula primero qué vas a alimentar (móvil, nevera, portátil) y suma los vatios. Una estación pequeña LiFePO4 suele bastar para acampada de fin de semana.',
      help: 'Compara capacidad, potencia AC y peso antes de invertir en una estación.',
      helpHref: '#tabla-comparativa',
    },
    linternas: {
      specs: [
        ['Lúmenes', '1500 lm'],
        ['Autonomía', 'Hasta 200 h'],
        ['Clasificación', 'IP44'],
      ],
      tip: 'No te fíes solo del número de lúmenes en la ficha: la autonomía real y el tipo de haz (flood vs spot) marcan más la diferencia en tienda.',
      help: 'Compara lúmenes, IPX y autonomía de todos los modelos del ranking.',
      helpHref: '#tabla-comparativa',
    },
    accesorios: {
      specs: [
        ['Batería', '10 000 mAh'],
        ['Autonomía', '180+ min'],
        ['Clasificación', 'IPX8'],
      ],
      tip: 'La ducha portátil no calienta el agua: deja el cubo al sol o mezcla agua tibia antes de ducharte para una experiencia realmente cómoda.',
      help: 'Revisa qué accesorio resuelve tu mayor molestia: descanso, cocina o higiene.',
      helpHref: '#tabla-comparativa',
    },
    multiherramientas: {
      specs: [
        ['Funciones', '17 en 1'],
        ['Material', 'Acero inoxidable'],
        ['Peso', '~200 g'],
      ],
      tip: 'Prioriza las funciones que usarás de verdad en ruta: cuchillo, alicates y destornillador cubren el 90 % de reparaciones en acampada.',
      help: 'Compara funciones, material y peso de cada modelo antes de elegir.',
      helpHref: '#tabla-comparativa',
    },
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function resolveBasePath() {
    return './';
  }

  function resolveHref(href) {
    return href;
  }

  function renderNav(basePath) {
    var links = CATEGORIES.map(function (cat) {
      var cls = 'article-sidebar-more__link';
      if (cat.highlight) {
        cls += ' article-sidebar-more__link--highlight';
      }
      return (
        '<li><a href="' +
        escapeHtml(resolveHref(cat.href)) +
        '" class="' +
        cls +
        '">' +
        escapeHtml(cat.label) +
        '</a></li>'
      );
    }).join('');

    return (
      '<nav class="article-sidebar-card article-sidebar-card--more" aria-labelledby="article-sidebar-nav-title">' +
      '<h3 id="article-sidebar-nav-title" class="article-sidebar-more__title">Categorías</h3>' +
      '<ul class="article-sidebar-more__list">' +
      links +
      '</ul>' +
      '</nav>'
    );
  }

  function renderSpecs(specs) {
    var rows = specs
      .map(function (row) {
        return (
          '<tr><th scope="row">' +
          escapeHtml(row[0]) +
          '</th><td>' +
          escapeHtml(row[1]) +
          '</td></tr>'
        );
      })
      .join('');

    return (
      '<div class="article-sidebar-card article-sidebar-card--specs">' +
      '<h3 class="article-sidebar-specs__title">Especificaciones rápidas</h3>' +
      '<table class="article-sidebar-specs__table"><tbody>' +
      rows +
      '</tbody></table>' +
      '</div>'
    );
  }

  function renderTip(text) {
    return (
      '<div class="article-sidebar-card article-sidebar-card--tip">' +
      '<div class="article-sidebar-tip__head">' +
      '<span class="article-sidebar-tip__icon" aria-hidden="true">' +
      TIP_ICON +
      '</span>' +
      '<h3 class="article-sidebar-tip__title">Consejo del experto</h3>' +
      '</div>' +
      '<p class="article-sidebar-tip__text">' +
      escapeHtml(text) +
      '</p>' +
      '</div>'
    );
  }

  function renderHelp(text, href) {
    return (
      '<div class="article-sidebar-card article-sidebar-card--help">' +
      '<h3 class="article-sidebar-help__title">¿Necesitas ayuda?</h3>' +
      '<p class="article-sidebar-help__text">' +
      escapeHtml(text) +
      '</p>' +
      '<a href="' +
      escapeHtml(href) +
      '" class="article-sidebar-help__btn">Ver tabla comparativa completa</a>' +
      '</div>'
    );
  }

  function renderSidebar(config, sidebarId, basePath) {
    return (
      renderNav(basePath) +
      renderSpecs(config.specs) +
      renderTip(config.tip) +
      renderHelp(config.help, config.helpHref || '#tabla-comparativa')
    );
  }

  function init() {
    var basePath = resolveBasePath();
    var sidebars = document.querySelectorAll('[data-article-sidebar]');

    sidebars.forEach(function (aside) {
      var sidebarId = aside.getAttribute('data-sidebar-id') || 'template';
      var config = CONFIGS[sidebarId] || CONFIGS.template;
      var sticky = aside.querySelector('.article-sidebar__sticky');

      if (!sticky) {
        sticky = document.createElement('div');
        sticky.className = 'article-sidebar__sticky';
        aside.appendChild(sticky);
      }

      sticky.innerHTML = renderSidebar(config, sidebarId, basePath);
    });
  }

  global.ArticleSidebarStandard = {
    init: init,
    CONFIGS: CONFIGS,
    CATEGORIES: CATEGORIES,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
