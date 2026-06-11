/**
 * Mundo Camping — ArticleSidebar
 * Widgets estándar del sidebar derecho en guías editoriales.
 *
 * Uso:
 *   <aside class="article-sidebar">...</aside>
 *   <div class="article-sidebar-widgets" data-guide-id="linternas"></div>
 *   <script src="./js/article-sidebar.js"></script>
 *   <script>ArticleSidebar.init();</script>
 */
(function (global) {
  'use strict';

  var GUIDES = [
    {
      id: 'tiendas-familia',
      title: 'Top 5 tiendas para familia',
      href: 'top-5-tiendas-familia.html',
      image: './assets/familia-tienda-campana-bosque-pinos-bullterrier.png',
    },
    {
      id: 'tiendas-parejas',
      title: 'Mejores tiendas para parejas',
      href: 'top-5-tiendas-parejas.html',
      image: './assets/pareja-tienda-campana-bosque-amstaff.png',
    },
    {
      id: 'linternas',
      title: 'Linternas: cuál comprar',
      href: 'linternas-cual-comprar.html',
      image: './assets/linternas-cual-comprar-indeciso.png',
    },
    {
      id: 'estaciones-energia',
      title: 'Estaciones de energía portátiles',
      href: 'estaciones-energia.html',
      image: './assets/estaciones-energia-portatiles-bosque-pinos.png',
    },
    {
      id: 'multiherramientas',
      title: 'Multiherramientas en ruta',
      href: 'multiherramientas.html',
      image: './assets/multiherramientas-tronco-pino-bosque.png',
    },
    {
      id: 'accesorios',
      title: 'Accesorios que marcan la diferencia',
      href: 'accesorios-marcan-diferencia.html',
      image: './assets/accesorios-mochila-gps-cerillas-bosque.png',
    },
  ];

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

  function resolveImage(image) {
    return image;
  }

  function pickRelated(guideId, basePath) {
    var currentIndex = -1;
    for (var i = 0; i < GUIDES.length; i++) {
      if (GUIDES[i].id === guideId) {
        currentIndex = i;
        break;
      }
    }

    var picked = [];
    for (var step = 1; step < GUIDES.length && picked.length < 3; step++) {
      var guide = GUIDES[(currentIndex + step + GUIDES.length) % GUIDES.length];
      if (guide.id === guideId) continue;
      picked.push({
        title: guide.title,
        href: resolveHref(guide.href),
        image: resolveImage(guide.image),
      });
    }

    return picked;
  }

  function renderRelated(related) {
    return (
      '<div class="article-sidebar-card article-sidebar-card--related">' +
      '<p class="article-sidebar-card__kicker">Lecturas relacionadas</p>' +
      '<ul class="article-sidebar-related__list">' +
      related
        .map(function (item) {
          return (
            '<li>' +
            '<a href="' +
            escapeHtml(item.href) +
            '" class="article-sidebar-related__item">' +
            '<span class="article-sidebar-related__thumb">' +
            '<img src="' +
            escapeHtml(item.image) +
            '" alt="" loading="lazy" decoding="async" width="48" height="48" />' +
            '</span>' +
            '<span class="article-sidebar-related__title">' +
            escapeHtml(item.title) +
            '</span>' +
            '</a>' +
            '</li>'
          );
        })
        .join('') +
      '</ul>' +
      '</div>'
    );
  }

  function init(options) {
    var basePath = (options && options.basePath) || resolveBasePath();
    var containers = document.querySelectorAll('.article-sidebar-widgets');

    containers.forEach(function (container, index) {
      var guideId = (options && options.guideId) || container.getAttribute('data-guide-id') || '';
      var related = pickRelated(guideId, basePath);
      container.innerHTML = renderRelated(related);
    });
  }

  global.ArticleSidebar = {
    init: init,
    GUIDES: GUIDES,
  };
})(typeof window !== 'undefined' ? window : this);
