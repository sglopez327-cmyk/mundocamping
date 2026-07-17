/**
 * Genera blog.html + 3 artículos del blog y deja listos los datos de registro.
 * node scripts/generate-blog-section.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const ARTICLES = [
  {
    file: 'como-montar-tienda-campana.html',
    slug: 'como-montar-tienda-campana',
    id: 'montar-tienda',
    image: './assets/pareja-tienda-campana-bosque-amstaff.png',
    imageAbs: 'https://www.mundocamping.net/assets/pareja-tienda-campana-bosque-amstaff.png',
    heroClass: 'article-page-hero--tiendas',
    title: 'Mundo Camping | Cómo montar una tienda de campaña paso a paso',
    description:
      'Guía paso a paso para montar una tienda de campaña correctamente: suelo, mástil, vientos y errores que dejan la tienda inestable.',
    h1: 'Cómo montar una tienda de campaña correctamente (paso a paso)',
    lead:
      'Un montaje ordenado evita goteras, vientos flojos y la típica pelea con varillas a oscuras. Sigue esta secuencia y deja la tienda lista antes de que baje el sol.',
    minutes: '10 min',
    kicker: 'Guía práctica · Tiendas',
    cardTitle: 'Cómo montar una tienda de campaña',
    cardDesc: 'Paso a paso: emplazamiento, estructura, flysheet, vientos y errores habituales.',
    sections: [
      {
        id: 'antes',
        h2: 'Antes de empezar: elige el sitio',
        html: `<h3 class="text-lg font-bold text-emerald-200">Terreno y orientación</h3>
        <p>Busca suelo lo más llano posible, sin raíces ni piedras. Evita hondonadas (se acumula agua) y crestas muy expuestas al viento. Orienta la puerta a sotavento si puedes: entrarás con menos corriente.</p>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">Material a mano</h3>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Tienda completa (interior + flysheet + varillas + piquetas + cuerdas).</li>
          <li>2–4 piquetas de repuesto y un mazo ligero si el suelo es duro.</li>
          <li>Frontal o linterna si llega la noche.</li>
        </ul>`,
      },
      {
        id: 'pasos',
        h2: 'Montaje paso a paso',
        html: `<h3 class="text-lg font-bold text-emerald-200">1. Extiende y orienta</h3>
        <p>Saca la tienda del saco, extiende el suelo (footprint o el propio suelo de la tienda) y marca dónde irá la puerta. Clava temporalmente las esquinas del suelo para que no vuele.</p>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">2. Inserta las varillas</h3>
        <p>Ensarta las varillas en las fundas o en los clips según el modelo. No fuerces: si hay resistencia, revisa que no esté torcida o en el canal equivocado.</p>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">3. Levanta la estructura</h3>
        <p>Une varillas a los anclajes de las esquinas y levanta con cuidado. En tiendas de mástil central, asegúrate de que el poste queda vertical antes de tensar.</p>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">4. Coloca el flysheet (doble techo)</h3>
        <p>Cubre el interior sin que toque la tela interior (evita condensación). Alinea costuras y cremalleras de la puerta. Tensa de forma uniforme, no solo un lado.</p>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">5. Vientos y ajuste final</h3>
        <p>Clava los vientos en diagonal, no demasiado cerca de la tienda. Reajusta tras 10 minutos: la tela se asienta. Deja ventilaciones abiertas si no llueve a cántaros.</p>`,
      },
      {
        id: 'errores',
        h2: 'Errores que dejan la tienda inestable',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Montar sobre pendiente sin nivelar el saco (te deslizas toda la noche).</li>
          <li>Flysheet tocando el interior: condensación y goteras “fantasma”.</li>
          <li>Piquetas verticales en suelo blando: clávalas en ángulo hacia fuera.</li>
          <li>Olvidar practicar en casa: el primer montaje en el monte siempre tarda más.</li>
        </ul>`,
      },
      {
        id: 'cta-tienda',
        h2: 'Elige una tienda que se monte sin drama',
        html: `<p>Si aún no tienes tienda o quieres cambiar de modelo, compara opciones reales en nuestro catálogo:</p>
        <p class="mt-4 flex flex-wrap gap-3">
          <a href="tiendas.html" class="cta-button-highlight inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold">Ver tiendas de campaña</a>
          <a href="top-5-tiendas-parejas.html" class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:border-emerald-300/40 hover:text-[#deff9a]">Top tiendas para parejas</a>
          <a href="top-5-tiendas-familia.html" class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:border-emerald-300/40 hover:text-[#deff9a]">Top tiendas para familia</a>
        </p>`,
      },
    ],
    faqs: [
      {
        q: '¿Cuánto tarda montar una tienda de 2 personas?',
        a: 'Con práctica, 5–15 minutos. La primera vez puede llevar el doble: por eso conviene ensayar en el jardín o salón.',
      },
      {
        q: '¿Hace falta footprint?',
        a: 'No es obligatorio, pero protege el suelo de la tienda y alarga su vida. Útil en piedra o camping frecuente.',
      },
    ],
    conclusion:
      'Sitio bueno + estructura bien clavada + flysheet sin tocar el interior + vientos tensos. Con esa secuencia, la tienda aguanta lluvia y viento mucho mejor.',
  },
  {
    file: 'mochila-camping-principiantes-checklist.html',
    slug: 'mochila-camping-principiantes-checklist',
    id: 'mochila-checklist',
    image: './assets/accesorios-mochila-gps-cerillas-bosque.png',
    imageAbs: 'https://www.mundocamping.net/assets/accesorios-mochila-gps-cerillas-bosque.png',
    heroClass: 'article-page-hero--accesorios',
    title: 'Mundo Camping | Checklist mochila de camping para principiantes',
    description:
      'Checklist definitiva de mochila de camping para principiantes: dormir, cocina, luz, ropa y seguridad sin sobrecargar.',
    h1: 'Checklist definitiva: qué llevar en tu mochila de camping (principiantes)',
    lead:
      'Una lista clara por categorías para no olvidar lo crítico ni llenar la mochila de peso muerto en tu primera ruta.',
    minutes: '9 min',
    kicker: 'Checklist · Principiantes',
    cardTitle: 'Checklist mochila para principiantes',
    cardDesc: 'Qué meter (y qué no) en la mochila: dormir, cocina, luz y seguridad.',
    sections: [
      {
        id: 'dormir',
        h2: 'Dormir: el núcleo de la mochila',
        html: `<h3 class="text-lg font-bold text-emerald-200">Imprescindible</h3>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Tienda (o saco de vivac) + piquetas.</li>
          <li>Saco de dormir según temperatura de confort.</li>
          <li>Esterilla con R-Value adecuado al suelo y la estación.</li>
        </ul>
        <p class="mt-4">Sin este trío, el resto es secundario. Si dudas del aislamiento, lee <a href="esterilla-r-value-que-necesitas.html">qué R-Value necesitas</a> y <a href="saco-dormir-verano-vs-invierno.html">saco verano vs invierno</a>.</p>`,
      },
      {
        id: 'cocina-luz',
        h2: 'Cocina, agua y luz',
        html: `<h3 class="text-lg font-bold text-emerald-200">Cocina y agua</h3>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Hornillo + cartucho + mechero de reserva.</li>
          <li>Olla/kit menaje, cubiertos, comida sencilla.</li>
          <li>Botella / sistema de filtrado según el destino.</li>
        </ul>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">Iluminación</h3>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Frontal (manos libres) + farol o linterna de área.</li>
          <li>Power bank cargado.</li>
        </ul>
        <p class="mt-4">Más detalle en <a href="farol-vs-frontal-camping.html">farol vs frontal</a>.</p>`,
      },
      {
        id: 'ropa-seguridad',
        h2: 'Ropa, seguridad y “pequeños salvavidas”',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Capas: base + abrigo + impermeable (aunque “no vaya a llover”).</li>
          <li>Botiquín, navaja/multiherramienta, silbato.</li>
          <li>Mapa offline / track descargado.</li>
          <li>Bolsas de basura: deja el sitio limpio.</li>
        </ul>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">Qué no meter (al principio)</h3>
        <p>Sartenes enormes, ropa “por si acaso” de más, gadgets que no hayas probado en casa. Empieza ligero y añade según fallos reales.</p>`,
      },
      {
        id: 'cta-pack',
        h2: 'Completa tu kit en el catálogo',
        html: `<p>Cuando tengas la lista, elige equipo contrastado en nuestras secciones de producto:</p>
        <p class="mt-4 flex flex-wrap gap-3">
          <a href="accesorios.html" class="cta-button-highlight inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold">Ver accesorios</a>
          <a href="sacos.html" class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:border-emerald-300/40 hover:text-[#deff9a]">Sacos</a>
          <a href="esterillas.html" class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:border-emerald-300/40 hover:text-[#deff9a]">Esterillas</a>
          <a href="herramientas.html" class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:border-emerald-300/40 hover:text-[#deff9a]">Herramientas</a>
        </p>`,
      },
    ],
    faqs: [
      {
        q: '¿Qué capacidad de mochila necesito para 1–2 noches?',
        a: 'Entre 40 y 55 L suele bastar si eliges saco y esterilla compactos. Más de 60 L invita a sobrecargar.',
      },
      {
        q: '¿Es lo mismo que el checklist de primera acampada?',
        a: 'Complementarios: el checklist general cubre el fin de semana; esta guía prioriza qué cabe y cómo organizar la mochila.',
      },
    ],
    conclusion:
      'Prioriza dormir, agua/cocina y luz. El resto se añade con salidas. Imprime la lista y tácala antes de salir de casa.',
  },
  {
    file: 'tendencias-camping-2026.html',
    slug: 'tendencias-camping-2026',
    id: 'tendencias-2026',
    image: './assets/estaciones-energia-portatiles-bosque-pinos.png',
    imageAbs: 'https://www.mundocamping.net/assets/estaciones-energia-portatiles-bosque-pinos.png',
    heroClass: 'article-page-hero--energia',
    title: 'Mundo Camping | Tendencias y novedades de camping 2026',
    description:
      'Novedades para camping 2026: tendencias en tiendas, energía portátil, iluminación y equipo ligero. Qué merece la pena y qué es humo.',
    h1: 'Tendencias de camping 2026: lo nuevo en equipo y tecnología',
    lead:
      'Si buscas novedades para camping, aquí filtramos lo que de verdad cambia la experiencia en 2026: energía, luz, materiales y formatos de tienda.',
    minutes: '11 min',
    kicker: 'Novedades · 2026',
    cardTitle: 'Tendencias de camping 2026',
    cardDesc: 'Novedades en equipo y tecnología: energía, luz, tiendas y ultraligero.',
    sections: [
      {
        id: 'energia',
        h2: 'Energía portátil: más autonomía, menos peso',
        html: `<h3 class="text-lg font-bold text-emerald-200">Qué está pasando</h3>
        <p>Las estaciones LiFePO4 compactas y los power banks de alta capacidad se han vuelto el “segundo saco” de muchos campistas: cargar frontal, nevera pequeña o CPAP sin generador ruidoso.</p>
        <h3 class="mt-6 text-lg font-bold text-emerald-200">Qué mirar antes de comprar</h3>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Wh reales vs marketing.</li>
          <li>Salidas USB-C PD y, si la necesitas, AC.</li>
          <li>Peso: si vas en mochila, prioriza power bank; si vas en coche, estación.</li>
        </ul>
        <p class="mt-4"><a href="baterias.html">Ver baterías y energía</a> · <a href="estaciones-energia.html">Guía de estaciones portátiles</a></p>`,
      },
      {
        id: 'luz',
        h2: 'Iluminación: frontales inteligentes y faroles USB',
        html: `<p>Las novedades para camping en luz van hacia <strong>USB-C</strong>, modos rojos útiles y faroles con buena difusión (no solo “más lúmenes”). El combo frontal + farol sigue siendo el estándar.</p>
        <p class="mt-4"><a href="iluminacion/">Catálogo de iluminación</a> · <a href="linternas-cual-comprar.html">Cuál comprar</a> · <a href="farol-vs-frontal-camping.html">Farol vs frontal</a></p>`,
      },
      {
        id: 'tiendas',
        h2: 'Tiendas: montaje rápido y mejor ventilación',
        html: `<h3 class="text-lg font-bold text-emerald-200">Tendencias 2026</h3>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Estructuras más rápidas para familia (menos pelea con varillas).</li>
          <li>Más mesh y ventilación para calor y condensación.</li>
          <li>2P ligeras con doble entrada (parejas / mochileros).</li>
        </ul>
        <p class="mt-4"><a href="tiendas.html">Ver tiendas</a> · <a href="como-montar-tienda-campana.html">Cómo montarla bien</a></p>`,
      },
      {
        id: 'ultraligero',
        h2: 'Ultraligero y “menos pero mejor”',
        html: `<p>La tendencia no es comprar más gadgets: es <strong>elegir bien</strong> saco, esterilla y multiherramienta. Menos volumen, más noches cómodas.</p>
        <p class="mt-4 flex flex-wrap gap-3">
          <a href="herramientas.html" class="cta-button-highlight inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold">Herramientas</a>
          <a href="accesorios.html" class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:border-emerald-300/40 hover:text-[#deff9a]">Accesorios</a>
          <a href="cocina.html" class="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:border-emerald-300/40 hover:text-[#deff9a]">Cocina</a>
        </p>`,
      },
    ],
    faqs: [
      {
        q: '¿Qué novedades para camping merecen la pena en 2026?',
        a: 'Energía portátil fiable, iluminación USB-C con buena difusión y tiendas con montaje más simple. Desconfía de “mil lúmenes” sin autonomía ni difusión.',
      },
      {
        q: '¿Debo renovar todo el equipo?',
        a: 'No. Renueva lo que te falla (saco frío, esterilla floja, linterna muerta). El resto puede esperar.',
      },
    ],
    conclusion:
      '2026 premia autonomía eléctrica, luz práctica y tiendas fáciles de vivir. Filtra el marketing y compra según tu tipo de salida.',
  },
];

function articleHtml(g) {
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
      const icons = ['intro', 'table', 'tools', 'pros'];
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
        "logo": "https://www.mundocamping.net/favicon-48.png"
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
                <a href="index.html" class="hover:text-[#deff9a]">Inicio</a>
                <span class="mx-2 text-white/30">/</span>
                <a href="blog.html" class="hover:text-[#deff9a]">Blog</a>
                <span class="mx-2 text-white/30">/</span>
                <span>Artículo</span>
              </nav>
              <p class="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">${g.kicker}</p>
              <h1 class="mt-5 font-editorial text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl" itemprop="headline">
                ${g.h1}
              </h1>
              <p class="article-lead article-hero-lead max-w-2xl" itemprop="description">${g.lead}</p>
              <div class="article-meta-row">
                <span>Actualizado 2026</span>
                <span aria-hidden="true">•</span>
                <span>${g.minutes}</span>
                <span aria-hidden="true">•</span>
                <span>Blog</span>
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
                  Más guías en el <a href="blog.html">blog de Mundo Camping</a>.
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

function blogHtml() {
  const cards = ARTICLES.map(
    (a) => `
            <a href="${a.file}" class="group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-300/35 hover:bg-white/[0.05]">
              <p class="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">${a.kicker}</p>
              <h2 class="mt-3 font-editorial text-xl font-black text-white group-hover:text-[#deff9a] sm:text-2xl">${a.cardTitle}</h2>
              <p class="mt-3 text-sm leading-6 text-white/70">${a.cardDesc}</p>
              <span class="cta-button-highlight mt-5 inline-flex items-center gap-2 text-sm font-bold">Leer artículo</span>
            </a>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/tailwind-built.css" />
    <link rel="stylesheet" href="./css/fonts.css" />
    <meta
      name="description"
      content="Blog de camping: guías prácticas, checklists, novedades para camping 2026 y consejos para elegir equipo."
    />
    <title>Mundo Camping | Blog y guías informativas</title>
    <link rel="canonical" href="https://www.mundocamping.net/blog" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Mundo Camping" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="Mundo Camping | Blog y guías informativas" />
    <meta property="og:description" content="Blog de camping: guías prácticas, checklists, novedades para camping 2026 y consejos para elegir equipo." />
    <meta property="og:url" content="https://www.mundocamping.net/blog" />
    <meta property="og:image" content="https://www.mundocamping.net/Fondo.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mundo Camping | Blog y guías informativas" />
    <meta name="twitter:description" content="Blog de camping: guías prácticas, checklists, novedades para camping 2026 y consejos para elegir equipo." />
    <meta name="twitter:image" content="https://www.mundocamping.net/Fondo.jpg" />
    <link rel="stylesheet" href="./mundo-camping.css" />
    <link rel="stylesheet" href="./site-header.css" />
    <link rel="stylesheet" href="./footer-premium.css" />
    <style>
      .container-premium {
        width: 100%;
        max-width: 80rem;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      @media (min-width: 640px) {
        .container-premium { padding-left: 1.5rem; padding-right: 1.5rem; }
      }
      @media (min-width: 1024px) {
        .container-premium { padding-left: 2rem; padding-right: 2rem; }
      }
    </style>
  </head>
  <body class="min-h-screen bg-[#020403] font-sans text-white antialiased">
    <header id="site-header"></header>
    <main>
      <section class="relative overflow-hidden bg-[#020403] text-white">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(34,197,94,0.22),transparent_21rem),linear-gradient(180deg,#050805_0%,#020403_70%)]"></div>
        <div class="container-premium relative pb-16 pt-28 sm:pb-20 lg:pt-32">
          <p class="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">Blog · Guías informativas</p>
          <h1 class="mt-4 max-w-3xl font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
            Guías, checklists y novedades de camping
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-7 text-white/75">
            Contenido práctico para posicionar búsquedas como “novedades para camping”, montaje de tienda y packing para principiantes — con enlaces a nuestro catálogo cuando toque elegir equipo.
          </p>
        </div>
      </section>

      <section class="container-premium pb-20">
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
${cards}
        </div>

        <div class="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 class="font-editorial text-2xl font-black text-white">¿Buscas comparativas de producto?</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-white/75">
            El blog explica el “cómo”. Las <a href="index.html" class="text-[#deff9a] hover:underline">Guías Destacadas</a> y las categorías del menú te llevan a rankings y catálogo afiliado.
          </p>
          <p class="mt-5 flex flex-wrap gap-3">
            <a href="tiendas.html" class="cta-button-highlight inline-flex rounded-xl px-5 py-3 text-sm font-bold">Tiendas</a>
            <a href="sacos.html" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Sacos</a>
            <a href="baterias.html" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Energía</a>
            <a href="iluminacion/" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Iluminación</a>
          </p>
        </div>
      </section>
    </main>
    <footer id="site-footer"></footer>
    <script defer src="./js/site-header.js"></script>
    <script defer src="./js/site-footer.js"></script>
  </body>
</html>
`;
}

// blog.html se mantiene a mano (layout Guías Destacadas / home.css). No regenerar.
console.log('Omitida blog.html (rediseño alineado con index.html; editar a mano)');

for (const a of ARTICLES) {
  fs.writeFileSync(path.join(root, a.file), articleHtml(a), 'utf8');
  console.log('Creada', a.file);
}

console.log('OK — blog + 3 artículos');
