/**
 * Header global Mundo Camping — directorio de turismo de acampada.
 * Uso: <header id="site-header"></header> + site-header.css
 */
(function () {
  'use strict';

  var HOME_HREF = '/index.html';

  var NAV_ITEMS = [
    { href: HOME_HREF, label: 'Inicio', match: ['/', '/index.html', '/index'] },
    { href: '/campings.html', label: 'Campings', match: ['/campings', '/campings.html', '/mejores-sitios-acampar', '/mejores-sitios-acampar.html'] },
    { href: '/naturaleza.html', label: 'Naturaleza', match: ['/naturaleza', '/naturaleza.html'] },
    { href: '/rutas.html', label: 'Rutas', match: ['/rutas', '/rutas.html'] },
    { href: '/anunciate.html', label: 'Anúnciate', match: ['/anunciate', '/anunciate.html', '/colabora', '/colabora.html'] },
  ];

  var LOGO_SVG =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<path d="m3 18 6.2-10.5 4.1 6.8 2.4-3.8L21 18H3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>' +
    '<path d="M8.9 18 12 12.9 15.1 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>' +
    '</svg>';

  function currentPath() {
    var path = (window.location.pathname || '/').replace(/\/+$/, '');
    return path === '' ? '/' : path;
  }

  function isActiveNavItem(item) {
    var path = currentPath();
    if (item.match && item.match.length) {
      return item.match.some(function (m) {
        var norm = String(m).replace(/\/+$/, '');
        if (norm === '' || norm === '/') return path === '/';
        return path === norm;
      });
    }
    var hrefPath = String(item.href || '').split('?')[0].replace(/\/+$/, '');
    if (!hrefPath) return false;
    var withoutHtml = hrefPath.replace(/\.html$/, '');
    return path === hrefPath || path === withoutHtml;
  }

  function renderNavLink(item) {
    var active = isActiveNavItem(item);
    var classes = active ? 'btn-premium nav-guias-cta' : 'btn-premium';
    var ariaCurrent = active ? ' aria-current="page"' : '';
    return (
      '<li>' +
      '<a href="' +
      item.href +
      '" class="' +
      classes +
      '"' +
      ariaCurrent +
      '>' +
      item.label +
      '</a></li>'
    );
  }

  function renderSiteHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    header.innerHTML =
      '<nav class="site-header__nav container-premium" aria-label="Navegación principal">' +
      '<a href="' +
      HOME_HREF +
      '" class="site-header__logo-link" aria-label="Mundo Camping inicio">' +
      '<span class="site-header__logo-badge">' +
      LOGO_SVG +
      '</span>' +
      '<span class="site-header__logo-text text-readable-soft">Mundo Camping</span>' +
      '</a>' +
      '<p class="site-header__mobile-title" aria-hidden="true">Mundo Camping</p>' +
      '<ul class="menu-categorias" aria-label="Secciones principales">' +
      NAV_ITEMS.map(renderNavLink).join('') +
      '</ul>' +
      '<a href="/campings.html" class="btn-premium-solid site-header__mobile-cta">' +
      '<span class="site-header__mobile-cta-short">Mapa</span>' +
      '<span class="site-header__mobile-cta-full">Ver campings</span></a></nav>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSiteHeader);
  } else {
    renderSiteHeader();
  }
})();
