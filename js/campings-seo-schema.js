/**
 * JSON-LD ItemList + FAQPage para /campings
 */
(function () {
  'use strict';

  var campings = window.CAMPINGS_MAP_SPAIN || [];
  if (!campings.length) return;

  var SITE = 'https://www.mundocamping.net';

  function inject(schema) {
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
  }

  inject({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mapa de campings en España',
    description:
      'Once campings destacados en España con coordenadas GPS: Picos de Europa, Sangulí Salou, Ordesa, El Chorro y más.',
    numberOfItems: campings.length,
    itemListElement: campings.map(function (c, i) {
      var slug = c.page ? c.page.replace(/\.html$/, '') : 'campings';
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: c.nombre,
        url: SITE + '/' + slug,
        item: {
          '@type': 'Campground',
          name: c.nombre,
          description: c.descripcion,
          address: c.ubicacion,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: c.coords[0],
            longitude: c.coords[1],
          },
        },
      };
    }),
  });

  inject({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuántos campings hay en el mapa de España?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'El mapa incluye 11 campings seleccionados en la península con coordenadas GPS reales y fichas editoriales.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo usar el mapa de campings de Mundo Camping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Haz clic en cada marcador verde para ver foto, descripción y enlace a la guía del camping. Puedes ampliar y desplazarte por OpenStreetMap.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Hay campings en la Costa Brava y Costa Dorada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Sí: Sangulí Salou y Gavina (Tarragona), Las Dunas (Roses), Cala Gogo (Platja d\'Aro) y otros en el mapa.',
        },
      },
    ],
  });
})();
