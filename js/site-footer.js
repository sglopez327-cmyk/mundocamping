/**
 * Footer global Mundo Camping — aviso de afiliación Amazon obligatorio.
 * Uso: <footer id="site-footer"></footer> + <script src="RUTA/js/site-footer.js">
 * Estilos: footer-premium.css
 */
(function () {
  'use strict';

  var AFFILIATE_NOTICE =
    'Como asociado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. ' +
    'Gracias por confiar en mis recomendaciones.';

  var LOGO_SVG =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="m3 18 6.2-10.5 4.1 6.8 2.4-3.8L21 18H3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>' +
    '<path d="M8.9 18 12 12.9 15.1 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>' +
    '</svg>';

  function renderSiteFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) {
      return;
    }

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
      'Guías, comparativas y selección de equipo para acampar, hacer senderismo y aventuras al aire libre.' +
      '</p>' +
      '<div class="site-footer__trust">' +
      '<span class="site-footer__pill"><span class="site-footer__pill-dot"></span> Guías prácticas</span>' +
      '<span class="site-footer__pill"><span class="site-footer__pill-dot"></span> Equipo contrastado</span>' +
      '</div>' +
      '</div>' +
      '<div class="site-footer__nav-columns">' +
      '<div class="site-footer__nav-col">' +
      '<p class="site-footer__nav-title">Categorías</p>' +
      '<nav class="site-footer__links" aria-label="Categorías de producto">' +
      '<a class="site-footer__link" href="/index.html">Guías Destacadas</a>' +
      '<a class="site-footer__link" href="/tiendas.html">Tiendas de Campaña</a>' +
      '<a class="site-footer__link" href="/sacos.html">Sacos</a>' +
      '<a class="site-footer__link" href="/esterillas.html">Esterillas</a>' +
      '</nav>' +
      '</div>' +
      '<div class="site-footer__nav-col">' +
      '<p class="site-footer__nav-title">Más equipo</p>' +
      '<nav class="site-footer__links" aria-label="Más categorías de equipo">' +
      '<a class="site-footer__link" href="/baterias.html">Baterías y Energía</a>' +
      '<a class="site-footer__link" href="/iluminacion/">Iluminación</a>' +
      '<a class="site-footer__link" href="/herramientas.html">Herramientas</a>' +
      '<a class="site-footer__link" href="/accesorios.html">Accesorios</a>' +
      '</nav>' +
      '</div>' +
      '<div class="site-footer__nav-col">' +
      '<p class="site-footer__nav-title">Información</p>' +
      '<nav class="site-footer__links" aria-label="Información del sitio">' +
      '<a class="site-footer__link" href="/sobre-mi.html">Sobre mí</a>' +
      '<a class="site-footer__link" href="/contacto.html">Contacto</a>' +
      '</nav>' +
      '</div>' +
      '</div>' +
      '<div class="site-footer__scene-wrap">' +
      '<img class="footer-scene" src="/assets/tienda-2-personas-interior-lujo-vip-compacta-v2.png" ' +
      'alt="Interior de tienda de campaña para dos personas con equipamiento en bosque de pinos" ' +
      'width="360" height="225" loading="lazy" decoding="async" />' +
      '</div>' +
      '</div>' +
      '<div class="site-footer__bottom">' +
      '<p id="aviso-afiliacion-amazon" class="site-footer__legal">' +
      AFFILIATE_NOTICE +
      '</p>' +
      '<p class="site-footer__copy">© Mundo Camping</p>' +
      '</div>' +
      '</div>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSiteFooter);
  } else {
    renderSiteFooter();
  }
})();
