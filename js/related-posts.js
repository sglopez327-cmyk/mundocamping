/**
 * Bloque "También te puede interesar" al final de artículos.
 * Añade <div id="related-posts"></div> antes del cierre del artículo
 * o se inserta automáticamente antes de </article> si falta.
 */
(function () {
  'use strict';

  var POOL = [
    { href: 'mejor-tienda-camping-2-personas.html', title: 'Mejor tienda para 2 personas', tag: 'Tiendas' },
    { href: 'como-elegir-saco-dormir-temperatura.html', title: 'Elegir saco por temperatura', tag: 'Sacos' },
    { href: 'esterilla-r-value-que-necesitas.html', title: 'Qué R-Value necesitas', tag: 'Esterillas' },
    { href: 'power-bank-vs-estacion-energia-camping.html', title: 'Power bank vs estación', tag: 'Energía' },
    { href: 'como-montar-tienda-campana.html', title: 'Cómo montar la tienda', tag: 'Práctico' },
    { href: 'farol-vs-frontal-camping.html', title: 'Farol o frontal', tag: 'Luz' },
    { href: 'checklist-primera-acampada.html', title: 'Checklist primera acampada', tag: 'Principiantes' },
    { href: 'mejores-sitios-acampar.html', title: 'Mejores destinos del mundo', tag: 'Destinos' },
    { href: 'top-5-sacos-dormir.html', title: 'Top 5 sacos 2026', tag: 'Ranking' },
    { href: 'top-5-tiendas-parejas.html', title: 'Top tiendas parejas', tag: 'Ranking' },
    { href: 'guias.html', title: 'Todas las guías', tag: 'Hub' },
    { href: 'blog.html', title: 'Blog completo', tag: 'Blog' },
  ];

  function currentFile() {
    var path = window.location.pathname || '';
    var parts = path.split('/');
    var last = parts[parts.length - 1] || 'index.html';
    if (!last || last.indexOf('.') === -1) return last + '.html';
    return last;
  }

  function pickRelated(n) {
    var file = currentFile().replace(/^\//, '');
    var list = POOL.filter(function (p) {
      return p.href !== file;
    });
    // shuffle lightly
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list.slice(0, n);
  }

  function ensureContainer() {
    var el = document.getElementById('related-posts');
    if (el) return el;
    var article = document.querySelector('main article');
    if (!article) return null;
    el = document.createElement('section');
    el.id = 'related-posts';
    el.className = 'related-posts container-premium';
    el.setAttribute('aria-labelledby', 'related-posts-title');
    article.appendChild(el);
    return el;
  }

  function render() {
    if (!document.querySelector('main article')) return;
    var el = ensureContainer();
    if (!el) return;
    var items = pickRelated(4);
    el.innerHTML =
      '<div class="related-posts__inner">' +
      '<h2 id="related-posts-title" class="related-posts__title">También te puede interesar</h2>' +
      '<ul class="related-posts__list">' +
      items
        .map(function (p) {
          return (
            '<li><a href="' +
            p.href +
            '"><span class="related-posts__tag">' +
            p.tag +
            '</span><span class="related-posts__label">' +
            p.title +
            '</span></a></li>'
          );
        })
        .join('') +
      '</ul></div>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
