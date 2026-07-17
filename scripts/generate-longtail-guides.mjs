/**
 * Genera 4 guías long-tail SEO y actualiza sitemap + registros.
 * Ejecutar: node scripts/generate-longtail-guides.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const today = '2026-07-17';

const GUIDES = [
  {
    file: 'esterilla-r-value-que-necesitas.html',
    slug: 'esterilla-r-value-que-necesitas',
    id: 'r-value',
    hub: 'esterillas.html',
    hubLabel: 'Esterillas',
    image: './assets/esterillas-colchoneta-tienda-camping-realista.png',
    imageAbs: 'https://www.mundocamping.net/assets/esterillas-colchoneta-tienda-camping-realista.png',
    title: 'Mundo Camping | Qué R-Value necesita tu esterilla de camping',
    description:
      'Guía clara del R-Value en esterillas: qué número elegir según estación, suelo frío y si vas en tienda o en bivouac.',
    h1: 'Qué R-Value necesita tu esterilla de camping',
    lead:
      'El R-Value mide el aislamiento frente al frío del suelo. Aquí tienes una tabla práctica para no comprar a ciegas ni pasar la noche tiritando.',
    minutes: '8 min',
    relatedHref: 'top-5-esterillas.html',
    relatedLabel: 'Top 5 esterillas',
    heroClass: 'article-page-hero--esterillas',
    sections: [
      {
        id: 'que-es',
        h2: 'Qué es el R-Value (y qué no es)',
        html: `<p>El <strong>R-Value</strong> indica cuánto aísla la esterilla del frío del suelo. Cuanto más alto, más aislamiento. No mide el confort de acolchado ni la durabilidad: una esterilla blanda puede tener R bajo, y una de espuma fina puede aislar bien.</p>
        <p>Desde 2020, muchas marcas publican el R-Value con el estándar ASTM F3340. Si un anuncio no lo indica, asume que el número puede ser marketing, no laboratorio.</p>`,
      },
      {
        id: 'tabla',
        h2: 'Tabla rápida: qué R-Value elegir',
        html: `<div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-white/85">
            <thead><tr class="border-b border-white/15 text-emerald-200">
              <th class="py-2 pr-4">Uso</th><th class="py-2 pr-4">R-Value orientativo</th><th class="py-2">Notas</th>
            </tr></thead>
            <tbody>
              <tr class="border-b border-white/8"><td class="py-2 pr-4">Verano / suelo templado</td><td class="py-2 pr-4">R 1,5–2,5</td><td class="py-2">Espuma o inflable ligera</td></tr>
              <tr class="border-b border-white/8"><td class="py-2 pr-4">Primavera / otoño</td><td class="py-2 pr-4">R 2,5–4</td><td class="py-2">El rango más útil en España</td></tr>
              <tr class="border-b border-white/8"><td class="py-2 pr-4">Invierno / suelo frío</td><td class="py-2 pr-4">R 4–5+</td><td class="py-2">O combina espuma + inflable</td></tr>
              <tr><td class="py-2 pr-4">Nieve / 3 estaciones agresivas</td><td class="py-2 pr-4">R 5–7</td><td class="py-2">No ahorres aquí</td></tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4">Si dudas entre dos números, quédate con el más alto: el frío del suelo se nota más que un poco de peso extra.</p>`,
      },
      {
        id: 'errores',
        h2: 'Errores habituales al comprar',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Creer que el grosor en cm = más calor. El aislamiento depende del diseño interno, no solo de la altura.</li>
          <li>Ignorar el saco: un buen R-Value no salva un saco de verano en noche fría.</li>
          <li>Usar solo inflable en invierno sin espuma debajo: pierdes aislamiento si se pincha o se deshincha.</li>
          <li>Comprar “para todo el año” con R 2 y luego quejarte en noviembre.</li>
        </ul>
        <p class="mt-4">Para modelos concretos, mira nuestra <a href="top-5-esterillas.html">comparativa de las 5 mejores esterillas</a> y elige según el R-Value de esta tabla.</p>`,
      },
    ],
    faqs: [
      {
        q: '¿Qué R-Value necesito para acampar en España en otoño?',
        a: 'En la mayoría de zonas, R 2,5–4 cubre noches frescas en tienda. En sierra o si duermes mal con el frío, apunta a R 4 o combina dos esterillas.',
      },
      {
        q: '¿Puedo sumar el R-Value de dos esterillas?',
        a: 'Sí, de forma aproximada. Espuma R 2 + inflable R 3 suele dar un aislamiento cercano a R 5, muy útil en frío.',
      },
      {
        q: '¿El R-Value importa también en verano?',
        a: 'Menos, pero un R muy bajo en suelo húmedo o a la orilla del río aún se nota. R 1,5–2 suele bastar en verano.',
      },
    ],
    conclusion:
      'Empieza por la estación en la que más sales, elige el R-Value de la tabla y después compara peso y precio. Si quieres modelos ya filtrados, ve al top 5 de esterillas.',
  },
  {
    file: 'saco-dormir-verano-vs-invierno.html',
    slug: 'saco-dormir-verano-vs-invierno',
    id: 'saco-temporada',
    hub: 'sacos.html',
    hubLabel: 'Sacos',
    image: './assets/sacos-dormir-colores-bosque-pinos.png',
    imageAbs: 'https://www.mundocamping.net/assets/sacos-dormir-colores-bosque-pinos.png',
    title: 'Mundo Camping | Saco de dormir verano vs invierno: cómo elegir',
    description:
      'Diferencias reales entre saco de verano e invierno: temperatura de confort, relleno sintético o pluma, y cuándo necesitas dos sacos.',
    h1: 'Saco de dormir verano vs invierno: cómo elegir sin equivocarte',
    lead:
      'No existe el saco perfecto para todo el año. Aquí ves qué mirar en la etiqueta, qué falla en la práctica y cuándo conviene tener dos.',
    minutes: '9 min',
    relatedHref: 'top-5-sacos-dormir.html',
    relatedLabel: 'Top 5 sacos 2026',
    heroClass: 'article-page-hero--sacos',
    sections: [
      {
        id: 'temperaturas',
        h2: 'Temperatura de confort: la cifra que importa',
        html: `<p>Ignora el marketing de “aguanta −20 °C” si no especifica <strong>confort</strong>, <strong>límite</strong> y <strong>extremo</strong> (norma EN/ISO). Para dormir bien, compra según la <strong>temperatura de confort</strong>, no el extremo.</p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-white/80">
          <li><strong>Verano:</strong> confort aprox. +8 °C a +15 °C (o más).</li>
          <li><strong>Entretiempo:</strong> confort aprox. 0 °C a +8 °C.</li>
          <li><strong>Invierno:</strong> confort por debajo de 0 °C, según tu zona.</li>
        </ul>
        <p class="mt-4">Si eres friolero o mujer (las tablas de confort suelen ser más exigentes), elige un saco un peldaño más cálido.</p>`,
      },
      {
        id: 'relleno',
        h2: 'Sintético vs pluma',
        html: `<p><strong>Sintético:</strong> mejor con humedad, más barato, más pesado y voluminoso. Ideal si acampas cerca del coche o en clima húmedo.</p>
        <p><strong>Pluma:</strong> más calor por gramo y se comprime mejor. Pierde aislamiento si se moja: usa funda o tienda bien ventilada.</p>
        <p>Para verano en España, un sintético ligero suele sobrar. Para invierno en montaña, la pluma gana si controlas la humedad.</p>`,
      },
      {
        id: 'uno-o-dos',
        h2: '¿Un saco para todo o dos especializados?',
        html: `<p>Un solo saco “3 estaciones” compromete: en julio sudas y en enero pasas frío. Si sales todo el año, <strong>dos sacos</strong> (verano + entretiempo/invierno) suelen salir más baratos que un modelo premium “todo uso” que no aciertas nunca.</p>
        <p>Compara opciones reales en el <a href="top-5-sacos-dormir.html">ranking de sacos de dormir 2026</a> y cruza con el aislamiento de tu <a href="esterilla-r-value-que-necesitas.html">esterilla (R-Value)</a>.</p>`,
      },
    ],
    faqs: [
      {
        q: '¿Puedo usar un saco de invierno en verano?',
        a: 'Sí, pero pasarás calor. Abre la cremallera, úsalo como manta o lleva un saco quilt/sábana. Mejor un saco de verano dedicado si sales mucho en julio-agosto.',
      },
      {
        q: '¿Qué temperatura de confort necesito en Pirineos en octubre?',
        a: 'Depende de la cota, pero un confort cercano a 0 °C o −5 °C con buena esterilla es una base segura para no pasar mala noche.',
      },
      {
        q: '¿El saco mummy siempre es mejor?',
        a: 'Aísla más y pesa menos, pero restringe movimiento. Si prefieres espacio, un rectangular o semi-rectangular de entretiempo puede merecer la pena en camping en coche.',
      },
    ],
    conclusion:
      'Elige por temperatura de confort y humedad de tus salidas, no por el número más bajo de la etiqueta. Si sales en verano e invierno, dos sacos ganan a uno mediocre.',
  },
  {
    file: 'farol-vs-frontal-camping.html',
    slug: 'farol-vs-frontal-camping',
    id: 'farol-frontal',
    hub: 'iluminacion/',
    hubLabel: 'Iluminación',
    image: './assets/linternas-cual-comprar-indeciso.png',
    imageAbs: 'https://www.mundocamping.net/assets/linternas-cual-comprar-indeciso.png',
    title: 'Mundo Camping | Farol o frontal para camping: qué elegir',
    description:
      'Farol de campamento vs frontal: cuándo usar cada uno, lúmenes reales, autonomía y el combo mínimo para acampar sin quedarte a oscuras.',
    h1: 'Farol o frontal para camping: qué elegir (y por qué casi siempre necesitas los dos)',
    lead:
      'El frontal te deja las manos libres en la ruta. El farol ilumina la tienda y la mesa. Mezclarlos mal es el error más común al comprar iluminación de camping.',
    minutes: '7 min',
    relatedHref: 'linternas-cual-comprar.html',
    relatedLabel: 'Guía de linternas',
    heroClass: 'article-page-hero--linternas',
    sections: [
      {
        id: 'frontal',
        h2: 'Cuándo gana el frontal',
        html: `<p>Úsalo para <strong>caminar de noche</strong>, cocinar con las manos ocupadas, reparar la tienda o ir al baño del camping. Prioriza:</p>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-white/80">
          <li>150–300 lúmenes reales (no hace falta un cañón).</li>
          <li>Modo rojo para no deslumbrar ni atraer insectos.</li>
          <li>Correa cómoda y batería USB o pilas fáciles de encontrar.</li>
        </ul>`,
      },
      {
        id: 'farol',
        h2: 'Cuándo gana el farol (o linterna de área)',
        html: `<p>Ilumina el <strong>campamento</strong>: interior de tienda, mesa, zona de cocina. Busca luz difusa, gancho o imán, y buena autonomía a potencia media. Un farol de 200–400 lúmenes bien difundidos vale más que 1000 lúmenes en un punto cegador.</p>`,
      },
      {
        id: 'combo',
        h2: 'El combo mínimo recomendado',
        html: `<p>Para casi cualquier acampada de fin de semana: <strong>1 frontal + 1 farol/linterna de área</strong>. Si vas ultraligero, un frontal con modo flood amplio puede hacer de “farol” colgado, pero en familia o camping fijo el farol gana comodidad.</p>
        <p>Modelos y criterios de compra en <a href="linternas-cual-comprar.html">Linternas: cuál comprar</a>.</p>`,
      },
    ],
    faqs: [
      {
        q: '¿Bastan solo 1000 lúmenes en una linterna de mano?',
        a: 'Para acampada, no. Un haz estrecho de muchos lúmenes deslumbra y deja el campamento en penumbra. Mejor difusión y autonomía.',
      },
      {
        q: '¿Pilas o recargable USB?',
        a: 'USB es práctico si llevas power bank. Las pilas AA/AAA salvan si te quedas sin carga. Un híbrido o llevar ambos sistemas es lo más fiable.',
      },
      {
        q: '¿Necesito modo rojo?',
        a: 'Muy útil de noche: preserva visión nocturna y molesta menos a compañeros. En frontal casi es obligatorio.',
      },
    ],
    conclusion:
      'No elijas entre farol o frontal: elige el rol. Frontal para moverte; farol para vivir en el campamento. Con ese criterio aciertas casi siempre.',
  },
  {
    file: 'checklist-primera-acampada.html',
    slug: 'checklist-primera-acampada',
    id: 'checklist',
    hub: 'accesorios.html',
    hubLabel: 'Accesorios',
    image: './assets/accesorios-mochila-gps-cerillas-bosque.png',
    imageAbs: 'https://www.mundocamping.net/assets/accesorios-mochila-gps-cerillas-bosque.png',
    title: 'Mundo Camping | Checklist primera acampada: qué no olvidar',
    description:
      'Lista práctica para tu primera acampada: tienda, dormir, cocina, luz y seguridad. Evita el clásico “se me olvidó…” en el monte.',
    h1: 'Checklist para tu primera acampada: lo esencial (sin pasarte de peso)',
    lead:
      'Una lista corta y realista para no olvidar lo crítico ni llenar el maletero de cosas que no usarás.',
    minutes: '6 min',
    relatedHref: 'accesorios-marcan-diferencia.html',
    relatedLabel: 'Accesorios útiles',
    heroClass: 'article-page-hero--accesorios',
    sections: [
      {
        id: 'dormir',
        h2: 'Dormir: el trío que marca la noche',
        html: `<ol class="list-decimal space-y-2 pl-5 text-white/80">
          <li><strong>Tienda</strong> + piquetas + cuerdas de viento (y práctica de montaje en casa).</li>
          <li><strong>Saco</strong> acorde a la temperatura de confort de la noche más fría prevista.</li>
          <li><strong>Esterilla</strong> con R-Value suficiente — ver <a href="esterilla-r-value-que-necesitas.html">guía de R-Value</a>.</li>
        </ol>
        <p class="mt-4">Sin estos tres, el resto da igual.</p>`,
      },
      {
        id: 'campo',
        h2: 'Campo, cocina y luz',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Hornillo + cartucho + mechero/cerillas en bote seco.</li>
          <li>Olla o kit cocina, cubiertos, plato/vaso.</li>
          <li>Agua / sistema de filtrado según el destino.</li>
          <li>Frontal + farol o linterna de área (<a href="farol-vs-frontal-camping.html">farol vs frontal</a>).</li>
          <li>Power bank cargado.</li>
        </ul>`,
      },
      {
        id: 'seguridad',
        h2: 'Seguridad y “pequeños que salvan el fin de semana”',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Botiquín básico, linterna de reserva, navaja o multiherramienta.</li>
          <li>Basura: bolsas para dejar el sitio mejor de como lo encontraste.</li>
          <li>Ropa de abrigo + impermeable aunque “no vaya a llover”.</li>
          <li>Mapa offline / track descargado si vas a zona sin cobertura.</li>
        </ul>
        <p class="mt-4">Prioridades de compra en <a href="accesorios-marcan-diferencia.html">accesorios que marcan la diferencia</a>.</p>`,
      },
    ],
    faqs: [
      {
        q: '¿Qué es lo que más se olvida en la primera acampada?',
        a: 'Piquetas de repuesto, mechero de reserva, esterilla (o una con poco aislamiento) y una fuente de luz para la tienda.',
      },
      {
        q: '¿Hace falta comprar todo nuevo?',
        a: 'No. Prioriza tienda, saco y esterilla decentes. El resto puede ser sencillo al principio.',
      },
      {
        q: '¿Cuánta comida llevar para una noche?',
        a: 'Cena fácil de cocinar + desayuno + snacks. Evita platos elaborados la primera vez: menos estrés, menos peso.',
      },
    ],
    conclusion:
      'Imprime o guarda esta lista, monta la tienda en el salón una vez y revisa saco + esterilla según la previsión. Con eso evitas el 80 % de los disgustos de la primera noche.',
  },
];

function buildPage(g) {
  const sectionsHtml = g.sections
    .map(
      (s) => `
              <section id="${s.id}" class="article-section">
                <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">${s.h2}</h2>
                <div class="article-prose mt-5 max-w-none space-y-4 text-base leading-7 text-white/80">
                  ${s.html}
                </div>
              </section>`
    )
    .join('\n');

  const faqsHtml = g.faqs
    .map(
      (f) => `
                  <details>
                    <summary>${f.q}</summary>
                    <p>${f.a}</p>
                  </details>`
    )
    .join('\n');

  const tocItems = g.sections
    .map((s, i) => {
      const icons = ['intro', 'table', 'tools'];
      return `{ type: 'section', icon: '${icons[i] || 'intro'}', title: ${JSON.stringify(s.h2)}, href: '#${s.id}' }`;
    })
    .concat([
      `{ type: 'section', icon: 'faq', title: 'Preguntas frecuentes', href: '#faq' }`,
      `{ type: 'section', icon: 'conclusion', title: 'Conclusión', href: '#conclusion' }`,
    ])
    .join(',\n            ');

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/tailwind-built.css" />
    <link rel="stylesheet" href="./css/fonts.css" />
    <meta name="description" content="${g.description}" />
    <title>${g.title}</title>
    <link rel="canonical" href="https://www.mundocamping.net/${g.slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Mundo Camping" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="${g.title}" />
    <meta property="og:description" content="${g.description}" />
    <meta property="og:url" content="https://www.mundocamping.net/${g.slug}" />
    <meta property="og:image" content="${g.imageAbs}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${g.title}" />
    <meta name="twitter:description" content="${g.description}" />
    <meta name="twitter:image" content="${g.imageAbs}" />
    <link rel="stylesheet" href="./mundo-camping.css" />
    <link rel="stylesheet" href="./site-header.css" />
    <link rel="stylesheet" href="./footer-premium.css" />
    <link rel="stylesheet" href="./styles-guias.css" />
    <style>
      .${g.heroClass} {
        background-image:
          linear-gradient(180deg, rgba(2, 4, 3, 0.25) 0%, rgba(2, 4, 3, 0.55) 48%, rgba(2, 4, 3, 0.97) 100%),
          url('${g.image}');
        background-position: center;
        background-size: cover;
      }
      .article-faq details {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        padding: 1rem 1.25rem;
        margin-bottom: 0.75rem;
        background: rgba(255, 255, 255, 0.03);
      }
      .article-faq summary {
        font-weight: 700;
        color: #f4f7f5;
        cursor: pointer;
        list-style: none;
      }
      .article-faq summary::-webkit-details-marker { display: none; }
      .article-faq details[open] summary {
        margin-bottom: 0.75rem;
        color: #deff9a;
      }
      .article-faq details p { margin: 0; }
    </style>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mundo Camping",
        "url": "https://www.mundocamping.net/",
        "logo": "https://www.mundocamping.net/favicon-48.png",
        "description": "Sitio independiente de guías de acampada con reseñas basadas en experiencia real.",
        "email": "contacto@mundocamping.net"
      }
    </script>
  </head>
  <body class="min-h-screen bg-[#020403] font-sans text-white antialiased">
    <header id="site-header"></header>
    <main>
      <article itemscope itemtype="https://schema.org/Article">
        <header class="article-page-hero ${g.heroClass} relative isolate flex items-end overflow-hidden">
          <div class="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#020403] via-[#020403]/72 to-transparent"></div>
          <div class="container-premium pb-12 pt-28 sm:pb-16 lg:pb-20">
            <div class="max-w-3xl">
              <nav class="mb-6 text-sm text-white/65" aria-label="Migas de pan">
                <a href="index.html" class="hover:text-[#deff9a]">Guías Destacadas</a>
                <span class="mx-2 text-white/30">/</span>
                <a href="${g.hub}" class="hover:text-[#deff9a]">${g.hubLabel}</a>
                <span class="mx-2 text-white/30">/</span>
                <span>Guía</span>
              </nav>
              <p class="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">Guía práctica · SEO</p>
              <h1 class="mt-5 font-editorial text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl" itemprop="headline">
                ${g.h1}
              </h1>
              <p class="article-lead article-hero-lead max-w-2xl" itemprop="description">${g.lead}</p>
              <div class="article-meta-row">
                <span>Actualizado 2026</span>
                <span aria-hidden="true">•</span>
                <span>${g.minutes}</span>
                <span aria-hidden="true">•</span>
                <span>Guía editorial</span>
              </div>
            </div>
          </div>
        </header>

        <div class="container-premium pb-20 pt-10 lg:pt-14">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
            <div class="min-w-0 space-y-12">
              <nav id="article-toc" class="article-toc" aria-labelledby="toc-title"></nav>
${sectionsHtml}

              <section id="faq" class="article-section article-faq">
                <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">Preguntas frecuentes</h2>
                <div class="mt-6">
${faqsHtml}
                </div>
              </section>

              <section id="conclusion" class="article-section">
                <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">Conclusión</h2>
                <p class="mt-5 text-base leading-7 text-white/80">${g.conclusion}</p>
                <p class="mt-4 text-base leading-7 text-white/80">
                  Siguiente lectura recomendada:
                  <a href="${g.relatedHref}">${g.relatedLabel}</a>.
                </p>
              </section>
            </div>

            <aside class="article-sidebar">
              <div class="article-sidebar-widgets" data-guide-id="${g.id}"></div>
            </aside>
          </div>
        </div>
      </article>
    </main>
    <footer id="site-footer"></footer>
    <script defer src="./js/site-header.js"></script>
    <script defer src="./js/site-footer.js"></script>
    <script defer src="./js/article-toc.js"></script>
    <script defer src="./js/article-sidebar.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        if (window.ArticleToc) {
          ArticleToc.render({
            containerId: 'article-toc',
            numbered: false,
            items: [
            ${tocItems}
            ],
          });
        }
        if (window.ArticleSidebar) ArticleSidebar.init();
      });
    </script>
  </body>
</html>
`;
}

for (const g of GUIDES) {
  fs.writeFileSync(path.join(root, g.file), buildPage(g), 'utf8');
  console.log('Creada', g.file);
}

console.log('OK — ' + GUIDES.length + ' guías long-tail.');
