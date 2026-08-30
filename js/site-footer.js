/**
 * Footer global Mundo Camping — directorio de turismo de acampada.
 */
(function () {
  'use strict';

  var LOGO_SVG =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="m3 18 6.2-10.5 4.1 6.8 2.4-3.8L21 18H3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>' +
    '<path d="M8.9 18 12 12.9 15.1 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>' +
    '</svg>';

  function renderSiteFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="container-premium site-footer__inner">' +
      '<div class="site-footer__grid">' +
      '<div class="site-footer__brand">' +
      '<div class="site-footer__logo-row">' +
      '<span class="site-footer__logo-mark" aria-hidden="true">' +
      LOGO_SVG +
      '</span>' +
      '<p class="site-footer__title">Mundo Camping</p>' +
      '</div>' +
      '<p class="site-footer__tagline">' +
      'Directorio de campings, rutas de senderismo y rincones de naturaleza para planificar tu próxima escapada al aire libre.' +
      '</p>' +
      '<p class="site-footer__credential">' +
      'Guías editoriales independientes. Campings y marcas pueden aparecer destacados mediante colaboración B2B.' +
      '</p>' +
      '<div class="site-footer__trust">' +
      '<span class="site-footer__pill"><span class="site-footer__pill-dot"></span> Mapas interactivos</span>' +
      '<span class="site-footer__pill"><span class="site-footer__pill-dot"></span> Rutas y naturaleza</span>' +
      '</div>' +
      '</div>' +
      '<div class="site-footer__nav-columns">' +
      '<div class="site-footer__nav-col">' +
      '<p class="site-footer__nav-title">Explorar</p>' +
      '<nav class="site-footer__links" aria-label="Secciones del sitio">' +
      '<a class="site-footer__link" href="/index.html">Inicio</a>' +
      '<a class="site-footer__link" href="/campings.html">Campings</a>' +
      '<a class="site-footer__link" href="/naturaleza.html">Naturaleza</a>' +
      '<a class="site-footer__link" href="/rutas.html">Rutas</a>' +
      '</nav>' +
      '</div>' +
      '<div class="site-footer__nav-col">' +
      '<p class="site-footer__nav-title">Destacados</p>' +
      '<nav class="site-footer__links" aria-label="Contenido destacado">' +
      '<a class="site-footer__link" href="/acampar-picos-europa.html">Picos de Europa</a>' +
      '<a class="site-footer__link" href="/acampar-lofoten.html">Lofoten</a>' +
      '<a class="site-footer__link" href="/naturaleza.html#pozas">Pozas y ríos</a>' +
      '<a class="site-footer__link" href="/rutas.html#senderismo">Rutas de senderismo</a>' +
      '</nav>' +
      '</div>' +
      '<div class="site-footer__nav-col">' +
      '<p class="site-footer__nav-title">Profesionales</p>' +
      '<nav class="site-footer__links" aria-label="Colaboraciones">' +
      '<a class="site-footer__link" href="/anunciate.html">Anúnciate / Colabora</a>' +
      '<a class="site-footer__link" href="/contacto.html">Contacto</a>' +
      '<a class="site-footer__link" href="/sobre-mi.html">Sobre Mundo Camping</a>' +
      '</nav>' +
      '</div>' +
      '<div class="site-footer__nav-col">' +
      '<p class="site-footer__nav-title">Legal</p>' +
      '<nav class="site-footer__links" aria-label="Información legal">' +
      '<a class="site-footer__link" href="/privacidad.html">Política de Privacidad</a>' +
      '<a class="site-footer__link" href="/aviso-legal.html">Aviso Legal</a>' +
      '</nav>' +
      '</div>' +
      '</div>' +
      '<div class="site-footer__scene-wrap">' +
      '<img class="footer-scene" src="/assets/destinos/destino-picos-europa.jpg" ' +
      'alt="Campamento junto a montañas verdes al amanecer" ' +
      'width="360" height="225" loading="lazy" decoding="async" />' +
      '</div>' +
      '</div>' +
      '<div class="site-footer__bottom">' +
      '<p class="site-footer__legal">' +
      '© Mundo Camping · Directorio de turismo de acampada. Los contenidos destacados pueden incluir colaboraciones comerciales claramente identificadas.' +
      '</p>' +
      '<p class="site-footer__copy">© Mundo Camping</p>' +
      '</div>' +
      '</div>';
  }

  function loadSiteScripts() {
    var queue = ['/js/site-config.js', '/js/site-analytics.js', '/js/structured-data.js'];
    function next(index) {
      if (index >= queue.length) {
        loadCrossRecommendations();
        return;
      }
      var script = document.createElement('script');
      script.src = queue[index];
      script.defer = true;
      script.onload = function () {
        next(index + 1);
      };
      document.body.appendChild(script);
    }
    next(0);
  }

  function loadCrossRecommendations() {
    var article = document.querySelector('main article[data-cross-type]');
    if (!article) return;
    if (document.querySelector('link[data-cross-rec]')) return;
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/css/cross-recommendations.css?v=1';
    css.setAttribute('data-cross-rec', '1');
    document.head.appendChild(css);
    var script = document.createElement('script');
    script.src = '/js/cross-recommendations.js?v=1';
    script.defer = true;
    document.body.appendChild(script);
  }

  function bootSiteFooter() {
    renderSiteFooter();
    loadSiteScripts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSiteFooter);
  } else {
    bootSiteFooter();
  }
})();
