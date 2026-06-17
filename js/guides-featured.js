/**
 * Mundo Camping — tarjetas de Guías Destacadas (página principal /index.html)
 */
(function () {
  'use strict';

  var GUIDES_DATA = [
    {
      titulo: 'Top 5 sacos de dormir para camping 2026',
      descripcion:
        'Análisis de sacos por temperatura de confort, tipo de relleno y relación calidad-precio para distintas estaciones.',
      imagen: './assets/sacos-dormir-colores-bosque-pinos.png',
      imagenFallback: './assets/sacos-hero-scene.svg',
      url: 'top-5-sacos-dormir.html',
    },
    {
      titulo: 'Top 5 mejores esterillas',
      descripcion:
        'Análisis de esterillas según confort, aislamiento (R-Value), peso y facilidad de transporte.',
      imagen: './assets/esterillas-colchoneta-tienda-camping-realista.png',
      imagenFallback: 'https://m.media-amazon.com/images/I/81iuLQCeDGL._AC_SL1500_.jpg',
      url: 'top-5-esterillas.html',
    },
    {
      titulo: 'Mejores tiendas de campaña para familia',
      descripcion:
        'Guía de compra con capacidad, resistencia al viento y montaje sencillo para salidas en grupo o con niños.',
      imagen: './assets/familia-tienda-campana-bosque-pinos-bullterrier.png',
      url: 'top-5-tiendas-familia.html',
    },
    {
      titulo: 'Multiherramientas esenciales en ruta',
      descripcion:
        'Las funciones imprescindibles, materiales duraderos y modelos compactos para llevar en mochila sin pasarte de peso.',
      imagen: './assets/multiherramientas-tronco-pino-bosque.png',
      url: 'multiherramientas.html',
    },
    {
      titulo: 'Linternas: cual comprar',
      descripcion:
        'Comparativa de autonomía, lúmenes reales, resistencia al agua y modos de luz para campamento y senderismo.',
      imagen: './assets/linternas-cual-comprar-indeciso.png',
      url: 'linternas-cual-comprar.html',
    },
    {
      titulo: 'Estaciones de energía portátiles para acampada',
      descripcion:
        'Capacidad en Wh, salidas USB/AC, carga solar y peso: todo lo que debes revisar antes de comprar.',
      imagen: './assets/estaciones-energia-portatiles-bosque-pinos.png',
      url: 'estaciones-energia.html',
    },
    {
      titulo: 'Mejores tiendas para parejas',
      descripcion:
        'Análisis comparativo de las mejores opciones para acampar en pareja con espacio y comodidad.',
      imagen: './assets/pareja-tienda-campana-bosque-amstaff.png',
      imagenFallback: 'https://m.media-amazon.com/images/I/51vIRqj6e9L._AC_SL1500_.jpg',
      url: 'top-5-tiendas-parejas.html',
    },
    {
      titulo: 'Accesorios que marcan la diferencia',
      descripcion:
        'Desde mochilas hasta kit de cocina ligero: prioridades según tipo de salida y duración del viaje.',
      imagen: './assets/accesorios-mochila-gps-cerillas-bosque.png',
      url: 'accesorios-marcan-diferencia.html',
    },
  ];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderGuideCard(guide) {
    var titulo = escapeHtml(guide.titulo);
    var descripcion = escapeHtml(guide.descripcion);
    var imagen = escapeHtml(guide.imagen);
    var url = escapeHtml(guide.url);
    var alt = escapeHtml(guide.titulo);
    var fallback = guide.imagenFallback ? escapeHtml(guide.imagenFallback) : '';
    var imgTag =
      '<img src="' +
      imagen +
      '" alt="' +
      alt +
      '" width="400" height="300" loading="lazy" decoding="async"' +
      (fallback
        ? ' data-fallback="' + fallback + '" onerror="if(this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback;}"'
        : '') +
      ' />';

    return (
      '<a href="' +
      url +
      '" class="guide-featured-card">' +
      '<div class="guide-featured-card__media">' +
      imgTag +
      '</div>' +
      '<div class="guide-featured-card__body">' +
      '<h2 class="guide-featured-card__title">' +
      titulo +
      '</h2>' +
      '<p class="guide-featured-card__desc">' +
      descripcion +
      '</p>' +
      '<span class="guide-featured-card__cta cta-button-highlight">' +
      'Leer guía' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg>' +
      '</span>' +
      '</div>' +
      '</a>'
    );
  }

  function renderGuidesFeatured() {
    var stack = document.getElementById('guides-featured-stack');
    if (!stack || !GUIDES_DATA.length) {
      return;
    }
    stack.innerHTML = GUIDES_DATA.map(renderGuideCard).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGuidesFeatured);
  } else {
    renderGuidesFeatured();
  }
})();
