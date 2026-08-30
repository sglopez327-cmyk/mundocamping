/**
 * Bloques de recomendación cruzada al final de fichas (campings, naturaleza, rutas).
 * Uso: <article data-cross-type="camping|naturaleza|ruta" data-cross-region="...">
 */
(function () {
  'use strict';

  var BLOCKS = {
    camping: {
      title: 'Combina con tu escapada',
      subtitle: 'Naturaleza y rutas cerca de este destino',
      items: [
        {
          href: 'naturaleza.html',
          tag: 'Naturaleza',
          title: 'Pozas y ríos escondidos',
          desc: 'Charcas y tramos de río para el día después de acampar.',
        },
        {
          href: 'rutas.html',
          tag: 'Rutas',
          title: 'Senderismo imprescindible',
          desc: 'Itinerarios enlazados con campings y puntos de agua.',
        },
        {
          href: 'campings.html',
          tag: 'Directorio',
          title: 'Más campings en el mapa',
          desc: 'Explora otros destinos en el mapa interactivo.',
        },
      ],
    },
    naturaleza: {
      title: 'Campings cercanos recomendados',
      subtitle: 'Pernocta cerca de pozas y ríos',
      items: [
        {
          href: 'acampar-picos-europa.html',
          tag: 'España',
          title: 'Picos de Europa',
          desc: 'Campings de valle y rutas de montaña.',
        },
        {
          href: 'acampar-banff.html',
          tag: 'Canadá',
          title: 'Banff',
          desc: 'Lagos turquesas y campings de parque nacional.',
        },
        {
          href: 'campings.html',
          tag: 'Mapa',
          title: 'Directorio completo',
          desc: 'Encuentra más campings en el mapa.',
        },
      ],
    },
    ruta: {
      title: 'Después de la ruta',
      subtitle: 'Dónde pernoctar y refrescarte',
      items: [
        {
          href: 'campings.html',
          tag: 'Campings',
          title: 'Mapa de campings',
          desc: 'Elige dónde dormir cerca del final de la ruta.',
        },
        {
          href: 'naturaleza.html',
          tag: 'Naturaleza',
          title: 'Pozas y ríos',
          desc: 'Agua fría y calma al terminar el trekking.',
        },
        {
          href: 'anunciate.html',
          tag: 'B2B',
          title: '¿Gestionas un camping en la zona?',
          desc: 'Aparece destacado en esta ruta.',
        },
      ],
    },
  };

  function render() {
    var article = document.querySelector('main article[data-cross-type]');
    if (!article) return;

    var type = article.getAttribute('data-cross-type') || 'camping';
    var block = BLOCKS[type] || BLOCKS.camping;

    var section = document.createElement('section');
    section.className = 'cross-rec';
    section.setAttribute('aria-labelledby', 'cross-rec-title');
    section.innerHTML =
      '<div class="cross-rec__inner">' +
      '<header class="cross-rec__header">' +
      '<p class="cross-rec__kicker">' +
      block.subtitle +
      '</p>' +
      '<h2 id="cross-rec-title" class="cross-rec__title">' +
      block.title +
      '</h2>' +
      '</header>' +
      '<ul class="cross-rec__list">' +
      block.items
        .map(function (item) {
          return (
            '<li><a class="cross-rec__card" href="' +
            item.href +
            '"><span class="cross-rec__tag">' +
            item.tag +
            '</span><strong class="cross-rec__label">' +
            item.title +
            '</strong><span class="cross-rec__desc">' +
            item.desc +
            '</span></a></li>'
          );
        })
        .join('') +
      '</ul></div>';

    var container = article.querySelector('.container-premium') || article;
    container.appendChild(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
