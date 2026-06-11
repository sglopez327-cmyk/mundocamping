/**
 * Header global Mundo Camping — menú con rutas absolutas desde la raíz del sitio.
 * Uso: <header id="site-header"></header> + <script src="RUTA/js/site-header.js">
 * Estilos: site-header.css
 *
 * Todos los href empiezan por /. Editar solo NAV_ITEMS para cambiar destinos.
 */
(function () {
  'use strict';

  var HOME_HREF = '/index.html';

  var NAV_ITEMS = [
    { href: HOME_HREF, label: 'Guías Destacadas', guiasCta: true },
    { href: '/tiendas.html', label: 'Tiendas de Campaña' },
    { href: '/sacos.html', label: 'Sacos' },
    { href: '/esterillas.html', label: 'Esterillas' },
    { href: '/baterias.html', label: 'Baterías y Energía' },
    { href: '/iluminacion/', label: 'Iluminación' },
    { href: '/herramientas.html', label: 'Herramientas' },
    { href: '/accesorios.html', label: 'Accesorios' },
  ];

  var LOGO_SVG =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="m3 18 6.2-10.5 4.1 6.8 2.4-3.8L21 18H3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>' +
    '<path d="M8.9 18 12 12.9 15.1 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>' +
    '</svg>';

  function renderNavLink(item) {
    var classes = item.guiasCta ? 'btn-premium nav-guias-cta' : 'btn-premium';
    return (
      '<li>' +
      '<a href="' +
      item.href +
      '" class="' +
      classes +
      '">' +
      item.label +
      '</a></li>'
    );
  }

  function renderSiteHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    header.innerHTML =
      '<nav class="site-header__nav container-premium" aria-label="Navegación principal">' +
      '<div class="site-header__brand">' +
      '<a href="' +
      HOME_HREF +
      '" class="site-header__logo-link" aria-label="Mundo Camping inicio">' +
      '<span class="site-header__logo-badge">' +
      LOGO_SVG +
      '</span>' +
      '<span class="site-header__logo-text text-readable-soft">Mundo Camping</span>' +
      '</a>' +
      '<p class="site-header__tagline text-readable-soft">Catálogo premium de montaña y acampada</p>' +
      '</div>' +
      '<ul class="menu-categorias" aria-label="Categorías principales">' +
      NAV_ITEMS.map(renderNavLink).join('') +
      '</ul>' +
      '<a href="' +
      HOME_HREF +
      '" class="btn-premium-solid site-header__mobile-cta">' +
      '<span class="site-header__mobile-cta-short">Guías</span>' +
      '<span class="site-header__mobile-cta-full">Guías Destacadas</span></a></nav>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSiteHeader);
  } else {
    renderSiteHeader();
  }
})();
