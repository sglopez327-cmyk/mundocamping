/**
 * Genera hubs y fichas SEO: España, A vs B, estaciones, presupuestos,
 * glosario, rutas, perfiles, mantenimiento, ofertas, FAQ, calculadoras, kits.
 * node scripts/generate-seo-sections.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.mundocamping.net';
const TODAY = '2026-07-18';
const IMG = 'Fondo.jpg';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function articlePage(p) {
  const faqs = p.faqs || [];
  const faqLd =
    faqs.length > 0
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        })
      : '';

  const sectionsHtml = (p.sections || [])
    .map(
      (s) => `
              <section id="${s.id}" class="article-section">
                <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">${esc(s.h2)}</h2>
                <div class="article-prose mt-5 max-w-none space-y-4 text-base leading-7 text-white/80">
                  ${s.html}
                </div>
              </section>`
    )
    .join('\n');

  const faqHtml =
    faqs.length > 0
      ? `
              <section id="faq" class="article-section article-faq">
                <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">Preguntas frecuentes</h2>
                <div class="mt-5 space-y-3">
                  ${faqs
                    .map(
                      (f) => `<details open>
                    <summary>${esc(f.q)}</summary>
                    <p>${esc(f.a)}</p>
                  </details>`
                    )
                    .join('\n')}
                </div>
              </section>`
      : '';

  const nextHtml = p.next
    ? `<p class="mt-6"><a class="text-[#deff9a] font-bold underline" href="${p.next.href}">${esc(p.next.label)} →</a></p>`
    : '';

  const calcBlock = p.calcHtml || '';
  const extraScripts = (p.scripts || []).map((s) => `<script defer src="${s}"></script>`).join('\n    ');
  const extraCss = (p.css || []).map((c) => `<link rel="stylesheet" href="${c}" />`).join('\n    ');

  return `<!DOCTYPE html>
<html lang="es" data-site-root=".">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/tailwind-built.css" />
    <link rel="stylesheet" href="./css/fonts.css" />
    <meta name="description" content="${esc(p.description)}" />
    <title>${esc(p.title)}</title>
    <link rel="canonical" href="${SITE}/${p.slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Mundo Camping" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="${esc(p.title)}" />
    <meta property="og:description" content="${esc(p.description)}" />
    <meta property="og:url" content="${SITE}/${p.slug}" />
    <meta property="og:image" content="${SITE}/${p.image || IMG}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.title)}" />
    <meta name="twitter:description" content="${esc(p.description)}" />
    <meta name="twitter:image" content="${SITE}/${p.image || IMG}" />
    <meta name="author" content="Mundo Camping" />
    <meta property="article:modified_time" content="${TODAY}" />
    <link rel="stylesheet" href="./mundo-camping.css" />
    <link rel="stylesheet" href="./site-header.css?v=9" />
    <link rel="stylesheet" href="./footer-premium.css" />
    <link rel="stylesheet" href="./styles-guias.css" />
    ${extraCss}
    <style>
      .article-page-hero--seo {
        background-image:
          linear-gradient(180deg, rgba(2, 4, 3, 0.35) 0%, rgba(2, 4, 3, 0.65) 48%, rgba(2, 4, 3, 0.97) 100%),
          url('./${p.image || IMG}');
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
      .article-faq summary { font-weight: 700; color: #f4f7f5; cursor: pointer; list-style: none; }
      .article-faq summary::-webkit-details-marker { display: none; }
      .article-faq details[open] summary { margin-bottom: 0.75rem; color: #deff9a; }
      .article-faq details p { margin: 0; }
      .article-byline { margin-top: 1rem; font-size: 0.875rem; color: rgba(232,240,236,0.7); }
      .article-byline a { color: #deff9a; }
      .hub-grid { display: grid; gap: 0.75rem; }
      @media (min-width: 640px) { .hub-grid { grid-template-columns: 1fr 1fr; } }
      .hub-card {
        display: block; padding: 1rem 1.15rem; border-radius: 0.9rem;
        border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03);
        text-decoration: none; color: #f8faf9;
      }
      .hub-card:hover { border-color: rgba(110,231,183,0.45); background: rgba(16,185,129,0.08); }
      .hub-card strong { display: block; font-size: 1.05rem; margin-bottom: 0.25rem; }
      .hub-card span { font-size: 0.9rem; color: rgba(248,250,249,0.7); }
    </style>
    ${faqLd ? `<script type="application/ld+json">${faqLd}</script>` : ''}
  </head>
  <body class="min-h-screen bg-[#020403] font-sans text-white antialiased">
    <header id="site-header"></header>
    <main>
      <article itemscope itemtype="https://schema.org/Article">
        <header class="article-page-hero article-page-hero--seo relative isolate flex items-end overflow-hidden">
          <div class="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#020403] via-[#020403]/72 to-transparent"></div>
          <div class="container-premium pb-12 pt-28 sm:pb-16 lg:pb-20">
            <div class="max-w-3xl">
              <nav class="mb-6 text-sm text-white/65" aria-label="Migas de pan">
                <a href="index.html" class="hover:text-[#deff9a]">Inicio</a>
                <span class="mx-2 text-white/30">/</span>
                <a href="guias.html" class="hover:text-[#deff9a]">Guías</a>
                ${
                  p.crumb
                    ? `<span class="mx-2 text-white/30">/</span><a href="${p.crumb.href}" class="hover:text-[#deff9a]">${esc(p.crumb.label)}</a>`
                    : ''
                }
              </nav>
              <p class="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">${esc(p.kicker || 'Guía · Mundo Camping')}</p>
              <h1 class="mt-5 font-editorial text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl" itemprop="headline">${esc(p.h1)}</h1>
              <p class="article-lead article-hero-lead max-w-2xl" itemprop="description">${esc(p.lead)}</p>
              <div class="article-meta-row">
                <span>Actualizado julio 2026</span>
                <span aria-hidden="true">•</span>
                <span>${esc(p.minutes || '7 min')}</span>
              </div>
              <p class="article-byline">Por <a href="sobre-mi.html" rel="author">Mundo Camping</a></p>
            </div>
          </div>
        </header>
        <div class="container-premium pb-20 pt-10 lg:pt-14">
          <div class="min-w-0 max-w-3xl space-y-12">
            ${calcBlock}
            ${sectionsHtml}
            ${faqHtml}
            <section class="article-section">
              <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">Conclusión</h2>
              <div class="article-prose mt-5 text-base leading-7 text-white/80">
                <p>${esc(p.conclusion || 'Usa esta guía junto a nuestras comparativas y catálogo para decidir con criterio.')}</p>
                ${nextHtml}
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
    <footer id="site-footer"></footer>
    <script defer src="./js/site-header.js?v=9"></script>
    <script defer src="./js/load-adsense.js"></script>
    <script defer src="./js/site-footer.js"></script>
    ${extraScripts}
  </body>
</html>
`;
}

function hubCards(items) {
  return `<div class="hub-grid">${items
    .map(
      (i) =>
        `<a class="hub-card" href="${i.href}"><strong>${esc(i.title)}</strong><span>${esc(i.desc)}</span></a>`
    )
    .join('')}</div>`;
}

const pages = [];

function add(p) {
  pages.push(p);
}

// ——— ESPAÑA ———
add({
  file: 'acampar-en-espana.html',
  slug: 'acampar-en-espana',
  kicker: 'Destinos · España',
  title: 'Mundo Camping | Acampar en España: regiones, legalidad y equipo',
  description:
    'Guía para acampar en España: mejores regiones, consejos legales, clima y equipo recomendado por zona (Asturias, Pirineos, Andalucía…).',
  h1: 'Acampar en España: regiones y equipo según el destino',
  lead: 'España concentra montaña, costa y clima muy distinto. Elige región, respeta normativa local y adapta tienda, saco y esterilla.',
  minutes: '10 min',
  sections: [
    {
      id: 'regiones',
      h2: 'Regiones para acampar (fichas)',
      html: hubCards([
        { href: 'acampar-asturias.html', title: 'Asturias', desc: 'Costa, Picos y lluvia frecuente.' },
        { href: 'acampar-pirineos.html', title: 'Pirineos', desc: 'Alta montaña y noches frías.' },
        { href: 'acampar-galicia.html', title: 'Galicia', desc: 'Humedad, costa y verde intenso.' },
        { href: 'acampar-andalucia.html', title: 'Andalucía', desc: 'Calor, sierra y noches suaves.' },
        { href: 'acampar-canarias.html', title: 'Canarias', desc: 'Volcanes y microclimas.' },
        { href: 'acampar-gredos.html', title: 'Gredos', desc: 'Granito y fin de semana cerca de Madrid.' },
        { href: 'acampar-costa-brava.html', title: 'Costa Brava', desc: 'Cala + camping organizado.' },
        { href: 'acampar-sierra-nevada.html', title: 'Sierra Nevada', desc: 'Altitud y contraste térmico.' },
        { href: 'acampar-picos-europa.html', title: 'Picos de Europa', desc: 'Icono de montaña española.' },
      ]),
    },
    {
      id: 'legal',
      h2: 'Legalidad: camping vs vivac',
      html: `<p>En España el <strong>acampada libre</strong> está muy restringida. Prioriza <strong>campings homologados</strong>, áreas autorizadas o vivac de altura según normativa autonómica/municipal. Antes de ir, confirma reglas locales.</p>
      <p class="mt-4">Más contexto mundial: <a href="mejores-sitios-acampar.html">mapa de destinos</a>.</p>`,
    },
    {
      id: 'equipo',
      h2: 'Equipo base para España',
      html: `<ul class="list-disc space-y-2 pl-5">
        <li>Norte húmedo: tienda con buena columna de agua + saco 3 estaciones.</li>
        <li>Interior/sur: ventilación, esterilla con R-Value acorde y protección solar.</li>
        <li>Montaña: márgenes de frío y luz frontal fiable.</li>
      </ul>
      <p class="mt-4">Empieza por <a href="top-5-tiendas-parejas.html">tiendas</a>, <a href="top-5-sacos-dormir.html">sacos</a> y <a href="checklist-primera-acampada.html">checklist</a>.</p>`,
    },
  ],
  faqs: [
    { q: '¿Se puede acampar libre en España?', a: 'En general no. Usa campings o zonas autorizadas y revisa la normativa de cada comunidad.' },
    { q: '¿Qué región es mejor para principiantes?', a: 'Campings de costa o Gredos/Sierra cercanos a ciudad, con servicios y poco compromiso técnico.' },
  ],
  conclusion: 'Elige región → confirma legalidad → adapta impermeabilidad y temperatura del saco.',
  next: { href: 'rutas-camping-fin-semana.html', label: 'Rutas de fin de semana' },
});

const espanaFichas = [
  {
    file: 'acampar-asturias.html',
    slug: 'acampar-asturias',
    h1: 'Acampar en Asturias: costa, Picos y lluvia',
    description: 'Dónde y cómo acampar en Asturias: clima húmedo, Picos de Europa, campings y equipo impermeable.',
    lead: 'Asturias premia con verde y costa salvaje, pero la lluvia manda: prioriza tienda estable e impermeable.',
    tips: 'Flysheet bien tensado, saco que tolere humedad, calzado de agarre.',
  },
  {
    file: 'acampar-pirineos.html',
    slug: 'acampar-pirineos',
    h1: 'Acampar en los Pirineos: altitud y frío nocturno',
    description: 'Guía para acampar en Pirineos: noches frías, viento, campings de valle y equipo 3–4 estaciones.',
    lead: 'En Pirineos la altitud cambia el plan: de día puede hacer sol y de noche bajar varios grados.',
    tips: 'Saco con margen de frío, esterilla R-Value alto, frontal y capa impermeable.',
  },
  {
    file: 'acampar-galicia.html',
    slug: 'acampar-galicia',
    h1: 'Acampar en Galicia: humedad y costa atlántica',
    description: 'Acampar en Galicia: humedad, costa, Rías y equipo que aguante lluvia sostenida.',
    lead: 'Galicia es paraíso verde: espera condensación y llovizna. Mejor sintético que pluma si no controlas la humedad.',
    tips: 'Tienda ventilada, saco sintético, ropa de cambio en bolsa estanca.',
  },
  {
    file: 'acampar-andalucia.html',
    slug: 'acampar-andalucia',
    h1: 'Acampar en Andalucía: calor, sierra y noches suaves',
    description: 'Acampar en Andalucía: calor diurno, sierras y equipo ligero con buena ventilación.',
    lead: 'En verano el enemigo es el calor y el sol. Busca sombra, ventilación y agua de sobra.',
    tips: 'Tienda con ventilación, saco de verano, nevera 12V o botellas frías.',
  },
  {
    file: 'acampar-canarias.html',
    slug: 'acampar-canarias',
    h1: 'Acampar en Canarias: volcanes y microclimas',
    description: 'Acampar en Canarias: zonas autorizadas, viento, altitud y equipo según isla y mes.',
    lead: 'Cada isla cambia: costa cálida vs cumbres frías y ventosas. Confirma zonas legales antes de ir.',
    tips: 'Capa cortavientos, anclaje serio de tienda, capas térmicas en cumbres.',
  },
  {
    file: 'acampar-gredos.html',
    slug: 'acampar-gredos',
    h1: 'Acampar en Gredos: granito y escape de fin de semana',
    description: 'Acampar en Sierra de Gredos: campings, clima de meseta y equipo para noches frescas.',
    lead: 'Gredos es un clásico cerca de Madrid: granito, gargantas y noches más frescas de lo que parece.',
    tips: 'Saco 3 estaciones en primavera/otoño, esterilla decente, frontal.',
  },
  {
    file: 'acampar-costa-brava.html',
    slug: 'acampar-costa-brava',
    h1: 'Acampar en la Costa Brava: calas y campings',
    description: 'Acampar en Costa Brava: mejores opciones de camping, verano mediterráneo y equipo de costa.',
    lead: 'Aquí manda el camping organizado y la reserva en temporada alta. Ideal para familia y pareja.',
    tips: 'Tienda familiar o 2P cómoda, esterilla confort, farol de mesa.',
  },
  {
    file: 'acampar-sierra-nevada.html',
    slug: 'acampar-sierra-nevada',
    h1: 'Acampar en Sierra Nevada: altitud y contraste térmico',
    description: 'Acampar en Sierra Nevada: frío nocturno, sol intenso y equipo de montaña en el sur.',
    lead: 'Estás en el sur, pero a 2500 m el frío es real. No elijas saco solo por “Andalucía”.',
    tips: 'Margen de frío, protección UV, capas y anclaje ante viento.',
  },
];

for (const f of espanaFichas) {
  add({
    file: f.file,
    slug: f.slug,
    crumb: { href: 'acampar-en-espana.html', label: 'España' },
    kicker: 'España · Destino',
    title: `Mundo Camping | ${f.h1}`,
    description: f.description,
    h1: f.h1,
    lead: f.lead,
    sections: [
      {
        id: 'clima',
        h2: 'Clima y expectativas',
        html: `<p>${esc(f.lead)}</p><p class="mt-4"><strong>Equipo clave:</strong> ${esc(f.tips)}</p>`,
      },
      {
        id: 'equipo',
        h2: 'Enlaces de equipo',
        html: `<ul class="list-disc space-y-2 pl-5">
          <li><a href="top-5-tiendas-parejas.html">Tiendas recomendadas</a></li>
          <li><a href="top-5-sacos-dormir.html">Sacos por temperatura</a></li>
          <li><a href="camping-lluvia-equipo.html">Equipo para lluvia</a></li>
          <li><a href="acampar-en-espana.html">Volver al hub España</a></li>
        </ul>`,
      },
    ],
    faqs: [
      { q: '¿Camping o vivac?', a: 'Si no conoces la zona, camping homologado. El vivac solo donde esté permitido y con experiencia.' },
    ],
    conclusion: 'Adapta impermeabilidad y temperatura al microclima real, no al estereotipo de la región.',
    next: { href: 'acampar-en-espana.html', label: 'Más regiones de España' },
  });
}

// ——— A vs B ———
const vs = [
  {
    file: 'pluma-vs-fibra-saco.html',
    slug: 'pluma-vs-fibra-saco',
    h1: 'Saco de pluma vs fibra sintética: cuál elegir',
    description: 'Pluma vs fibra en saco de dormir: calor/peso, humedad, precio y cuándo conviene cada uno en camping.',
    lead: 'Pluma gana en calor por gramo si está seca. Fibra perdona más la humedad española y suele costar menos.',
    a: 'Pluma',
    b: 'Fibra',
    whenA: 'Trekking seco, frío intenso, priorizas peso.',
    whenB: 'Lluvia/humedad, presupuesto, uso ocasional.',
    links: '<a href="top-5-sacos-dormir.html">Top sacos</a> · <a href="como-elegir-saco-dormir-temperatura.html">Temperatura</a>',
  },
  {
    file: 'tienda-2p-vs-3p.html',
    slug: 'tienda-2p-vs-3p',
    h1: 'Tienda 2 personas vs 3 personas: qué te conviene',
    description: 'Comparativa tienda 2P vs 3P: espacio real, peso, vestíbulo y cuándo pagar el tamaño extra.',
    lead: 'Una 2P justa ahoga si metéis mochilas. Una 3P para dos suele ser el dulce punto en fin de semana.',
    a: '2P',
    b: '3P',
    whenA: 'Ultraligero, buen tiempo, mochilas fuera.',
    whenB: 'Pareja + mochilas dentro, lluvia, más confort.',
    links: '<a href="top-5-tiendas-parejas.html">Top parejas</a> · <a href="mejor-tienda-camping-2-personas.html">Guía 2P</a>',
  },
  {
    file: 'hornillo-gas-vs-alcohol.html',
    slug: 'hornillo-gas-vs-alcohol',
    h1: 'Hornillo de gas vs alcohol: cocina de camping',
    description: 'Hornillo gas vs alcohol para camping: potencia, frío, peso del combustible y facilidad de uso.',
    lead: 'Gas es rápido y cómodo. Alcohol es simple y legal en avión a veces, pero más lento.',
    a: 'Gas',
    b: 'Alcohol',
    whenA: 'Mayoría de salidas, frío, cocinas elaboradas.',
    whenB: 'Minimalismo, backup, viajes con límites de cartucho.',
    links: '<a href="kit-cocina-camping-principiantes.html">Kit cocina</a> · <a href="cocina.html">Catálogo cocina</a>',
  },
  {
    file: 'farol-vs-frontal-comparativa.html',
    slug: 'farol-vs-frontal-comparativa',
    h1: 'Farol vs frontal: iluminación de camping',
    description: 'Farol de camping vs frontal: cuándo usar cada uno, lúmenes y batería.',
    lead: 'Frontal para manos libres. Farol para ambiente de mesa y tienda. Lo ideal: ambos ligeros.',
    a: 'Frontal',
    b: 'Farol',
    whenA: 'Cocinar, pasear, emergencias, montaje nocturno.',
    whenB: 'Cena, juego de mesa, luz de ambiente.',
    links: '<a href="farol-vs-frontal-camping.html">Guía completa</a> · <a href="iluminacion/">Iluminación</a>',
  },
];

for (const v of vs) {
  add({
    file: v.file,
    slug: v.slug,
    kicker: 'Comparativa A vs B',
    title: `Mundo Camping | ${v.h1}`,
    description: v.description,
    h1: v.h1,
    lead: v.lead,
    sections: [
      {
        id: 'resumen',
        h2: 'Resumen rápido',
        html: `<p><strong>${esc(v.a)}:</strong> ${esc(v.whenA)}</p><p class="mt-4"><strong>${esc(v.b)}:</strong> ${esc(v.whenB)}</p><p class="mt-4">${v.links}</p>`,
      },
      {
        id: 'decision',
        h2: 'Cómo decidir en 30 segundos',
        html: `<p>${esc(v.lead)}</p><p class="mt-4">Si dudas, prioriza el escenario más frecuente de tus salidas (no el viaje soñado una vez al año).</p>`,
      },
    ],
    faqs: [
      { q: `¿Puedo tener ambos (${v.a} y ${v.b})?`, a: 'Sí, si el peso y presupuesto lo permiten. Empieza por el que cubre el 80% de tus salidas.' },
    ],
    conclusion: 'Elige por uso real, no por marketing. Luego valida modelos en nuestras comparativas.',
    next: { href: 'guias.html', label: 'Índice de guías' },
  });
}

// ——— ESTACIONES ———
const seasons = [
  {
    file: 'camping-invierno-equipo.html',
    slug: 'camping-invierno-equipo',
    h1: 'Equipo de camping para invierno',
    description: 'Equipo esencial para camping en invierno: saco, esterilla R-Value, tienda 4 estaciones y seguridad.',
    lead: 'En invierno fallan el aislamiento del suelo y el saco corto. Prioriza R-Value y temperatura de confort.',
    items: ['Saco con margen de frío', 'Esterilla R-Value alto', 'Tienda estable / 4 estaciones', 'Capas + frontal fiable'],
  },
  {
    file: 'camping-lluvia-equipo.html',
    slug: 'camping-lluvia-equipo',
    h1: 'Equipo de camping para lluvia',
    description: 'Camping con lluvia: tienda impermeable, montaje, huella (footprint) y cómo evitar goteras.',
    lead: 'La lluvia no se gana con marketing: se gana con montaje, tensado y emplazamiento correcto.',
    items: ['Columna de agua realista', 'Footprint / suelo', 'Ropa impermeable', 'Bolsa estanca para dormitorio'],
  },
  {
    file: 'camping-calor-extremo.html',
    slug: 'camping-calor-extremo',
    h1: 'Camping con calor extremo: cómo no sufrir',
    description: 'Camping en calor: ventilación de tienda, hidratación, sombra y saco de verano.',
    lead: 'En ola de calor, la tienda se convierte en horno a mediodía. Planifica sombra y siestas fuera.',
    items: ['Tienda ventilada', 'Saco verano / sábana', 'Sombrilla o toldo', 'Agua y electrolitos'],
  },
];

for (const s of seasons) {
  add({
    file: s.file,
    slug: s.slug,
    kicker: 'Guía por clima',
    title: `Mundo Camping | ${s.h1}`,
    description: s.description,
    h1: s.h1,
    lead: s.lead,
    sections: [
      {
        id: 'checklist',
        h2: 'Checklist prioritario',
        html: `<ul class="list-disc space-y-2 pl-5">${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        <p class="mt-4"><a href="kits-recomendados.html">Ver kits por perfil</a> · <a href="calculadora-saco-temperatura.html">Calculadora de saco</a></p>`,
      },
    ],
    faqs: [{ q: '¿Sirve el mismo equipo todo el año?', a: 'No del todo. Puedes compartir tienda base, pero saco y esterilla cambian mucho entre verano e invierno.' }],
    conclusion: s.lead,
    next: { href: 'guias.html', label: 'Más guías' },
  });
}

// ——— PRESUPUESTOS ———
const budgets = [
  {
    file: 'kit-camping-100-euros.html',
    slug: 'kit-camping-100-euros',
    h1: 'Kit de camping por 100 € (principiantes)',
    description: 'Qué comprar para acampar con 100 euros: prioridades reales y qué no merece la pena barato.',
    lead: 'Con 100 € no compres “todo barato”: prioriza dormir seco y no pasar frío.',
    order: ['Esterilla mínima decente', 'Saco acorde a estación', 'Frontal simple', 'Dejar tienda para préstamo/oferta'],
  },
  {
    file: 'kit-camping-300-euros.html',
    slug: 'kit-camping-300-euros',
    h1: 'Kit de camping completo por 300 €',
    description: 'Equipo de camping completo alrededor de 300 euros: tienda, saco, esterilla y luz con criterio.',
    lead: 'Con ~300 € ya puedes montar un kit serio de fin de semana si evitas marcas de postureo.',
    order: ['Tienda 2P/3P usable', 'Saco 3 estaciones', 'Esterilla con R-Value', 'Frontal + farol barato'],
  },
  {
    file: 'equipo-completo-principiantes-presupuesto.html',
    slug: 'equipo-completo-principiantes-presupuesto',
    h1: 'Equipo completo para principiantes: por dónde empezar',
    description: 'Orden de compra del equipo de camping para principiantes según presupuesto y uso.',
    lead: 'No empieces por gadgets. Empieza por dormir bien: tienda, saco, esterilla.',
    order: ['Dormir (tienda/saco/esterilla)', 'Luz', 'Cocina básica', 'Energía solo si la necesitas'],
  },
];

for (const b of budgets) {
  add({
    file: b.file,
    slug: b.slug,
    kicker: 'Presupuesto',
    title: `Mundo Camping | ${b.h1}`,
    description: b.description,
    h1: b.h1,
    lead: b.lead,
    sections: [
      {
        id: 'orden',
        h2: 'Orden de compra recomendado',
        html: `<ol class="list-decimal space-y-2 pl-5">${b.order.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>
        <p class="mt-4"><a href="top-5-sacos-dormir.html">Sacos</a> · <a href="top-5-esterillas.html">Esterillas</a> · <a href="top-5-tiendas-parejas.html">Tiendas</a> · <a href="ofertas-camping-mes.html">Ofertas del mes</a></p>`,
      },
    ],
    faqs: [{ q: '¿Compensa comprar el pack más barato de Amazon?', a: 'Suele fallar en lluvia o frío. Mejor piezas sueltas con mínimo de calidad.' }],
    conclusion: b.lead,
    next: { href: 'kits-recomendados.html', label: 'Kits recomendados' },
  });
}

// ——— GLOSARIO ———
const terms = [
  { file: 'glosario-columna-agua.html', slug: 'glosario-columna-agua', term: 'Columna de agua (HH)', def: 'Resistencia a la presión del agua en mm. Más mm no siempre = tienda perfecta si el montaje es malo.', more: 'impermeabilidad-tienda-columna-agua.html' },
  { file: 'glosario-r-value.html', slug: 'glosario-r-value', term: 'R-Value', def: 'Aislamiento de la esterilla frente al frío del suelo. En invierno importa tanto como el saco.', more: 'esterilla-r-value-que-necesitas.html' },
  { file: 'glosario-denier.html', slug: 'glosario-denier', term: 'Denier (D)', def: 'Grosor/resistencia relativa del hilo de la tela. Útil para comparar suelos y flysheets, no es el único factor.', more: 'tiendas.html' },
  { file: 'glosario-confort-saco.html', slug: 'glosario-confort-saco', term: 'Temperatura de confort', def: 'Temperatura a la que una persona estándar debería dormir cómoda. Úsala frente a “extrema”.', more: 'como-elegir-saco-dormir-temperatura.html' },
  { file: 'glosario-footprint.html', slug: 'glosario-footprint', term: 'Footprint', def: 'Huella o suelo extra bajo la tienda que protege el piso y reduce humedad/abrasión.', more: 'como-montar-tienda-campana.html' },
  { file: 'glosario-vestibulo.html', slug: 'glosario-vestibulo', term: 'Vestíbulo', def: 'Zona cubierta fuera del dormitorio para mochilas y cocinar con lluvia (sin fuego dentro).', more: 'mejor-tienda-camping-2-personas.html' },
  { file: 'glosario-wh.html', slug: 'glosario-wh', term: 'Wh (vatios-hora)', def: 'Capacidad energética. Sirve para estimar cuántas cargas da una estación o power bank.', more: 'calculadora-wh-bateria.html' },
  { file: 'glosario-lumenes.html', slug: 'glosario-lumenes', term: 'Lúmenes', def: 'Cantidad de luz. Más no siempre es mejor: mira también autonomía y modos.', more: 'frontal-camping-cuantos-lumenes.html' },
];

add({
  file: 'glosario-camping.html',
  slug: 'glosario-camping',
  kicker: 'Glosario',
  title: 'Mundo Camping | Glosario de camping: términos que importan',
  description: 'Glosario de camping: columna de agua, R-Value, confort, Wh, lúmenes, denier, footprint y vestíbulo explicados claro.',
  h1: 'Glosario de camping: términos para comprar sin líos',
  lead: 'Estas palabras aparecen en fichas de Amazon. Entenderlas evita compras fallidas.',
  sections: [
    {
      id: 'terminos',
      h2: 'Términos clave',
      html: hubCards(terms.map((t) => ({ href: t.file, title: t.term, desc: t.def.slice(0, 90) + '…' }))),
    },
  ],
  faqs: [{ q: '¿Hace falta memorizarlos todos?', a: 'No. Con R-Value, confort del saco, columna de agua y Wh cubres el 80% de decisiones.' }],
  conclusion: 'Usa el glosario como apoyo al comprar; luego valida con nuestras comparativas.',
  next: { href: 'preguntas-frecuentes-camping.html', label: 'FAQ de camping' },
});

for (const t of terms) {
  add({
    file: t.file,
    slug: t.slug,
    crumb: { href: 'glosario-camping.html', label: 'Glosario' },
    kicker: 'Glosario',
    title: `Mundo Camping | ¿Qué es ${t.term}?`,
    description: `Qué significa ${t.term} en camping y cómo usarlo al elegir equipo.`,
    h1: `¿Qué es ${t.term}?`,
    lead: t.def,
    sections: [
      {
        id: 'uso',
        h2: 'Cómo usarlo al comprar',
        html: `<p>${esc(t.def)}</p><p class="mt-4">Ampliar: <a href="${t.more}">guía relacionada</a> · <a href="glosario-camping.html">todo el glosario</a>.</p>`,
      },
    ],
    faqs: [{ q: `¿${t.term} es lo único que importa?`, a: 'No. Es un dato clave, pero úsalo junto a peso, reseñas reales y tu tipo de salida.' }],
    conclusion: t.def,
    next: { href: 'glosario-camping.html', label: 'Volver al glosario' },
  });
}

// ——— RUTAS ———
add({
  file: 'rutas-camping-fin-semana.html',
  slug: 'rutas-camping-fin-semana',
  kicker: 'Rutas',
  title: 'Mundo Camping | Rutas de camping de fin de semana en España',
  description: 'Ideas de rutas y escapes de fin de semana para acampar en España con checklist de equipo.',
  h1: 'Rutas de camping para un fin de semana',
  lead: 'Salidas cortas para coger ritmo: poco kilometraje, buen camping y equipo sin excesos.',
  sections: [
    {
      id: 'rutas',
      h2: 'Tres escapes recomendados',
      html: hubCards([
        { href: 'ruta-fin-semana-gredos.html', title: 'Gredos express', desc: 'Granito y desconexión cerca de Madrid.' },
        { href: 'ruta-fin-semana-picos.html', title: 'Picos de Europa', desc: 'Montaña intensa en 2–3 días.' },
        { href: 'ruta-fin-semana-pirineos.html', title: 'Pirineos valle', desc: 'Valle + noche fresca.' },
      ]),
    },
  ],
  faqs: [{ q: '¿Cuánto equipo llevo en un finde?', a: 'Menos de lo que crees: dormir + cocina simple + luz. Usa la calculadora de peso.' }],
  conclusion: 'El finde perfecto es el que sales a descansar, no a pelearte con 18 kg de cacharros.',
  next: { href: 'calculadora-peso-mochila.html', label: 'Calculadora de peso' },
});

for (const r of [
  { file: 'ruta-fin-semana-gredos.html', slug: 'ruta-fin-semana-gredos', h1: 'Fin de semana camping en Gredos', description: 'Plan de fin de semana para acampar en Gredos: timing, clima y equipo.', lead: 'Salida viernes tarde, sábado activo, domingo retorno sin prisas.', zone: 'acampar-gredos.html' },
  { file: 'ruta-fin-semana-picos.html', slug: 'ruta-fin-semana-picos', h1: 'Fin de semana en Picos de Europa', description: 'Plan de fin de semana camping/trekking en Picos de Europa con equipo.', lead: 'Elige valle accesible si es tu primera vez; deja cumbres largas para más días.', zone: 'acampar-picos-europa.html' },
  { file: 'ruta-fin-semana-pirineos.html', slug: 'ruta-fin-semana-pirineos', h1: 'Fin de semana camping en Pirineos', description: 'Escape de fin de semana a Pirineos: frío nocturno y checklist.', lead: 'Prioriza un camping de valle y una caminata moderada el sábado.', zone: 'acampar-pirineos.html' },
]) {
  add({
    file: r.file,
    slug: r.slug,
    crumb: { href: 'rutas-camping-fin-semana.html', label: 'Rutas' },
    kicker: 'Ruta fin de semana',
    title: `Mundo Camping | ${r.h1}`,
    description: r.description,
    h1: r.h1,
    lead: r.lead,
    sections: [
      {
        id: 'plan',
        h2: 'Plan sugerido',
        html: `<p>${esc(r.lead)}</p>
        <ul class="list-disc space-y-2 pl-5 mt-4">
          <li>Viernes: llegada + montaje con luz.</li>
          <li>Sábado: actividad principal + cena temprana.</li>
          <li>Domingo: desayuno + desmontaje + margen de tráfico.</li>
        </ul>
        <p class="mt-4">Ficha de zona: <a href="${r.zone}">ver destino</a> · <a href="checklist-primera-acampada.html">checklist</a></p>`,
      },
    ],
    faqs: [{ q: '¿Reservo camping?', a: 'En temporada alta, sí. Especialmente puentes y julio-agosto.' }],
    conclusion: r.lead,
    next: { href: 'rutas-camping-fin-semana.html', label: 'Más rutas' },
  });
}

// ——— PERFILES ———
add({
  file: 'camping-perfiles.html',
  slug: 'camping-perfiles',
  kicker: 'Por perfil',
  title: 'Mundo Camping | Camping según perfil: perro, niños, pareja',
  description: 'Guías de camping por perfil: con perro, con niños o en pareja, con equipo y consejos.',
  h1: 'Camping según tu perfil',
  lead: 'No es lo mismo salir en pareja ligera que con niños o mascota. Empieza por tu caso.',
  sections: [
    {
      id: 'perfiles',
      h2: 'Elige tu caso',
      html: hubCards([
        { href: 'camping-con-perro.html', title: 'Con perro', desc: 'Normativa, kit y campings pet-friendly.' },
        { href: 'camping-en-pareja.html', title: 'En pareja', desc: 'Tienda 2P/3P y confort compartido.' },
        { href: 'camping-con-ninos-equipo-basico.html', title: 'Con niños', desc: 'Equipo básico y seguridad.' },
        { href: 'kit-ultraligero.html', title: 'Ultraligero', desc: 'Peso mínimo sin sufrir.' },
        { href: 'kit-familia.html', title: 'Familia', desc: 'Espacio y montaje fácil.' },
        { href: 'kit-principiante.html', title: 'Principiante', desc: 'Primer kit sin errores caros.' },
      ]),
    },
  ],
  faqs: [{ q: '¿Hay un kit universal?', a: 'No. Comparte base (luz, cocina simple) y cambia dormir según perfil.' }],
  conclusion: 'Define perfil → elige kit → valida con calculadoras y rankings.',
  next: { href: 'kits-recomendados.html', label: 'Kits recomendados' },
});

add({
  file: 'camping-con-perro.html',
  slug: 'camping-con-perro',
  crumb: { href: 'camping-perfiles.html', label: 'Perfiles' },
  kicker: 'Perfil · Perro',
  title: 'Mundo Camping | Camping con perro: consejos y equipo',
  description: 'Cómo acampar con perro: campings que admiten mascotas, kit básico y errores a evitar.',
  h1: 'Camping con perro: guía práctica',
  lead: 'Confirma pet-friendly, lleva agua extra, cama/aislamiento y respeta horarios y otros campistas.',
  sections: [
    {
      id: 'kit',
      h2: 'Kit mínimo canino',
      html: `<ul class="list-disc space-y-2 pl-5">
        <li>Agua, comedero, correa corta y larga.</li>
        <li>Manta/aislamiento del suelo (frío).</li>
        <li>Botiquín básico y bolsas.</li>
        <li>Tienda con espacio real (valora 3P para 2+perro).</li>
      </ul>
      <p class="mt-4"><a href="tienda-2p-vs-3p.html">2P vs 3P</a> · <a href="top-5-tiendas-familia.html">Tiendas amplias</a></p>`,
    },
  ],
  faqs: [{ q: '¿El perro puede dormir en la tienda?', a: 'Sí si cabe sin aplastaros y no destroza el piso. Usa footprint y supervisión.' }],
  conclusion: 'La clave es espacio, hidratación y normas del camping.',
  next: { href: 'camping-perfiles.html', label: 'Otros perfiles' },
});

add({
  file: 'camping-en-pareja.html',
  slug: 'camping-en-pareja',
  crumb: { href: 'camping-perfiles.html', label: 'Perfiles' },
  kicker: 'Perfil · Pareja',
  title: 'Mundo Camping | Camping en pareja: tienda y equipo',
  description: 'Camping en pareja: mejor tamaño de tienda, sacos y confort para dos.',
  h1: 'Camping en pareja sin pelearos por el espacio',
  lead: 'Una 2P justa genera discusiones. Valora 3P para dos o 2P con vestíbulo serio.',
  sections: [
    {
      id: 'equipo',
      h2: 'Equipo que mejor funciona en pareja',
      html: `<ul class="list-disc space-y-2 pl-5">
        <li><a href="top-5-tiendas-parejas.html">Tiendas para parejas</a></li>
        <li>Dos sacos o un sistema doble según frío.</li>
        <li>Farol de ambiente + frontal individual.</li>
        <li><a href="kit-camping-300-euros.html">Presupuesto ~300 €</a></li>
      </ul>`,
    },
  ],
  faqs: [{ q: '¿Un solo saco doble?', a: 'Cómodo en verano; en frío suele mejor dos sacos con buen aislamiento.' }],
  conclusion: 'Prioriza espacio usable y sueño: el resto es secundario.',
  next: { href: 'top-5-tiendas-parejas.html', label: 'Top tiendas parejas' },
});

// ——— MANTENIMIENTO ———
add({
  file: 'mantenimiento-equipo-camping.html',
  slug: 'mantenimiento-equipo-camping',
  kicker: 'Mantenimiento',
  title: 'Mundo Camping | Mantenimiento del equipo de camping',
  description: 'Cómo cuidar tienda, saco y esterilla: limpieza, secado, almacenamiento y reparaciones básicas.',
  h1: 'Mantenimiento del equipo de camping',
  lead: 'Un cuidado básico alarga la vida del equipo más que comprar marca cara.',
  sections: [
    {
      id: 'guias',
      h2: 'Guías de cuidado',
      html: hubCards([
        { href: 'reparar-tienda-campana.html', title: 'Reparar tienda', desc: 'Parches, costuras y varillas.' },
        { href: 'limpiar-saco-dormir.html', title: 'Limpiar saco', desc: 'Lavado sin matar el aislamiento.' },
        { href: 'guardar-esterilla-inflable.html', title: 'Guardar esterilla', desc: 'Evita pinchazos y pérdida de R-Value.' },
      ]),
    },
  ],
  faqs: [{ q: '¿Guardo la tienda húmeda “solo un día”?', a: 'No. Un día basta para olores y hongos. Sécala siempre.' }],
  conclusion: 'Seca, limpia suave y guarda sin comprimir eterno el aislamiento.',
  next: { href: 'reparar-tienda-campana.html', label: 'Reparar tienda' },
});

add({
  file: 'reparar-tienda-campana.html',
  slug: 'reparar-tienda-campana',
  crumb: { href: 'mantenimiento-equipo-camping.html', label: 'Mantenimiento' },
  kicker: 'Mantenimiento',
  title: 'Mundo Camping | Cómo reparar una tienda de campaña',
  description: 'Reparar tienda de camping: parches de tela, sellado de costuras y qué hacer con varillas rotas.',
  h1: 'Cómo reparar una tienda de campaña',
  lead: 'La mayoría de fallos son pinchazos de suelo o costuras. Un kit de parches te saca de un apuro.',
  sections: [
    {
      id: 'pasos',
      h2: 'Reparaciones habituales',
      html: `<ul class="list-disc space-y-2 pl-5">
        <li>Agujero en piso: limpia, seca, parche por dentro y fuera si puedes.</li>
        <li>Costura que gotea: sellador de costuras específico.</li>
        <li>Varilla rota: férula/repuesto; no fuerces el tramo.</li>
      </ul>
      <p class="mt-4"><a href="accesorios.html">Accesorios</a> · <a href="como-montar-tienda-campana.html">Montaje correcto</a></p>`,
    },
  ],
  faqs: [{ q: '¿Compensa reparar o comprar otra?', a: 'Si la estructura está bien y el agujero es local, repara. Si el tejido está cristalizado, reemplaza.' }],
  conclusion: 'Repara pronto: un agujero pequeño crece en la siguiente lluvia.',
  next: { href: 'mantenimiento-equipo-camping.html', label: 'Más mantenimiento' },
});

add({
  file: 'limpiar-saco-dormir.html',
  slug: 'limpiar-saco-dormir',
  crumb: { href: 'mantenimiento-equipo-camping.html', label: 'Mantenimiento' },
  kicker: 'Mantenimiento',
  title: 'Mundo Camping | Cómo limpiar un saco de dormir',
  description: 'Limpiar saco de dormir de pluma o fibra sin estropear el aislamiento: lavado y secado.',
  h1: 'Cómo limpiar un saco de dormir',
  lead: 'Lava poco y con cuidado. El secado completo es tan importante como el jabón.',
  sections: [
    {
      id: 'metodo',
      h2: 'Método seguro',
      html: `<ul class="list-disc space-y-2 pl-5">
        <li>Usa detergente específico pluma/fibra.</li>
        <li>Ciclo suave, sin suavizante.</li>
        <li>Secado largo a baja temperatura; remueve grumos (pelotas de tenis en pluma).</li>
        <li>Guarda holgado, no comprimido meses.</li>
      </ul>
      <p class="mt-4"><a href="pluma-vs-fibra-saco.html">Pluma vs fibra</a></p>`,
    },
  ],
  faqs: [{ q: '¿Cada cuánto lo lavo?', a: 'Cuando huela o esté muy sucio. Entre usos: airear y secar.' }],
  conclusion: 'Menos lavados agresivos = más vida útil del saco.',
  next: { href: 'guardar-esterilla-inflable.html', label: 'Cuidar esterilla' },
});

add({
  file: 'guardar-esterilla-inflable.html',
  slug: 'guardar-esterilla-inflable',
  crumb: { href: 'mantenimiento-equipo-camping.html', label: 'Mantenimiento' },
  kicker: 'Mantenimiento',
  title: 'Mundo Camping | Cómo guardar una esterilla inflable',
  description: 'Guardar esterilla inflable: evitar pliegues eternos, humedad y pinchazos.',
  h1: 'Cómo guardar una esterilla inflable',
  lead: 'No la dejes meses enrollada húmeda. Seca, desinfla y evita objetos punzantes.',
  sections: [
    {
      id: 'tips',
      h2: 'Buenas prácticas',
      html: `<ul class="list-disc space-y-2 pl-5">
        <li>Seca antes de guardar.</li>
        <li>Guarda ligeramente hinchada en casa si el fabricante lo recomienda.</li>
        <li>Usa funda; revisa suelo en campo.</li>
      </ul>
      <p class="mt-4"><a href="esterilla-r-value-que-necesitas.html">R-Value</a> · <a href="top-5-esterillas.html">Top esterillas</a></p>`,
    },
  ],
  faqs: [{ q: '¿La puedo dejar comprimida en la mochila?', a: 'Solo para el viaje. En casa, mejor sin compresión extrema permanente.' }],
  conclusion: 'Cuidado en almacenamiento = menos pinchazos y mejor aislamiento.',
  next: { href: 'mantenimiento-equipo-camping.html', label: 'Hub mantenimiento' },
});

// ——— OFERTAS ———
add({
  file: 'ofertas-camping-mes.html',
  slug: 'ofertas-camping-mes',
  kicker: 'Actualizado · Julio 2026',
  title: 'Mundo Camping | Ofertas y mejores compras de camping del mes',
  description: 'Mejores compras de camping del mes: dónde mirar descuentos y qué priorizar en tiendas, sacos y energía.',
  h1: 'Ofertas de camping del mes (julio 2026)',
  lead: 'No perseguimos “el precio más bajo del mundo”: priorizamos valor real según nuestras guías.',
  sections: [
    {
      id: 'prioridad',
      h2: 'Qué merece la pena cazar en oferta',
      html: `<ul class="list-disc space-y-2 pl-5">
        <li>Sacos y esterillas de modelos consolidados.</li>
        <li>Tiendas 2P/3P con buenas reseñas de lluvia.</li>
        <li>Frontales y power banks — suelen bajar frecuentemente.</li>
      </ul>
      <p class="mt-4">Empieza por: <a href="top-5-sacos-dormir.html">sacos</a>, <a href="top-5-esterillas.html">esterillas</a>, <a href="top-5-tiendas-parejas.html">tiendas</a>, <a href="estaciones-energia.html">energía</a>.</p>
      <p class="mt-4">Para presupuestos: <a href="kit-camping-100-euros.html">100 €</a> · <a href="kit-camping-300-euros.html">300 €</a>.</p>`,
    },
  ],
  faqs: [{ q: '¿Actualizáis precios exactos?', a: 'Los precios cambian a diario en Amazon. Usamos estas páginas como brújula de modelos y criterios.' }],
  conclusion: 'Oferta buena = modelo sólido más descuento, no desconocido ultra barato.',
  next: { href: 'kits-recomendados.html', label: 'Kits recomendados' },
});

// ——— FAQ GIGANTE ———
const bigFaqs = [
  { q: '¿Qué equipo mínimo necesito para acampar?', a: 'Tienda (o techo seguro), saco, esterilla, luz y agua. Todo lo demás es secundario al principio.' },
  { q: '¿Puedo acampar libre en España?', a: 'En general no. Usa campings o zonas autorizadas y revisa la normativa local.' },
  { q: '¿Qué R-Value necesito?', a: 'Verano bajo; 3 estaciones medio; invierno alto. Consulta la guía de R-Value.' },
  { q: '¿Pluma o fibra?', a: 'Pluma si priorizas peso en seco; fibra si hay humedad o presupuesto ajustado.' },
  { q: '¿Tienda 2P o 3P para pareja?', a: '3P para dos suele ser más cómoda si metéis mochilas o llueve.' },
  { q: '¿Cuántos lúmenes necesito en un frontal?', a: 'Para camping general, modos bajos/medios bien hechos importan más que el pico de marketing.' },
  { q: '¿Power bank o estación?', a: 'Móvil/frontal: power bank. Nevera/cacharros AC: estación con Wh suficientes.' },
  { q: '¿Cómo no pasar frío?', a: 'Saco por confort + esterilla adecuada + ropa seca. El suelo roba más calor del que crees.' },
  { q: '¿Cómo evitar condensación?', a: 'Ventila, no cocines dentro, reduce humedad de ropa mojada en el dormitorio.' },
  { q: '¿Qué llevo en la primera acampada?', a: 'Sigue el checklist de primera acampada y no sobrecargues gadgets.' },
  { q: '¿Compra barata en pack?', a: 'Riesgo alto de goteras y frío. Mejor piezas clave decentes.' },
  { q: '¿Cómo elegir saco por temperatura?', a: 'Usa temperatura de confort y la calculadora de saco.' },
];

add({
  file: 'preguntas-frecuentes-camping.html',
  slug: 'preguntas-frecuentes-camping',
  kicker: 'FAQ',
  title: 'Mundo Camping | Preguntas frecuentes de camping',
  description: 'Preguntas frecuentes de camping: equipo, legalidad en España, frío, tiendas, sacos, energía y presupuestos.',
  h1: 'Preguntas frecuentes de camping',
  lead: 'Respuestas directas con enlaces a guías profundas cuando quieras ampliar.',
  minutes: '12 min',
  sections: [
    {
      id: 'atajos',
      h2: 'Atajos útiles',
      html: `<p><a href="acampar-en-espana.html">España</a> · <a href="glosario-camping.html">Glosario</a> · <a href="calculadoras.html">Calculadoras</a> · <a href="kits-recomendados.html">Kits</a> · <a href="checklist-primera-acampada.html">Checklist</a></p>`,
    },
  ],
  faqs: bigFaqs,
  conclusion: 'Si tu duda no está aquí, empieza por el glosario o el índice de guías.',
  next: { href: 'guias.html', label: 'Índice de guías' },
});

// ——— KITS ———
add({
  file: 'kits-recomendados.html',
  slug: 'kits-recomendados',
  kicker: 'Kits',
  title: 'Mundo Camping | Kits de camping recomendados por perfil',
  description: 'Kits de camping recomendados: principiante, familia y ultraligero, con enlaces a guías y presupuestos.',
  h1: 'Kits de camping recomendados',
  lead: 'Tres perfiles claros para no comprar a ciegas. Ajusta con presupuestos y calculadoras.',
  sections: [
    {
      id: 'kits',
      h2: 'Elige kit',
      html: hubCards([
        { href: 'kit-principiante.html', title: 'Principiante', desc: 'Primer equipo sin errores caros.' },
        { href: 'kit-familia.html', title: 'Familia', desc: 'Espacio, facilidad y seguridad.' },
        { href: 'kit-ultraligero.html', title: 'Ultraligero', desc: 'Peso bajo para caminar más.' },
        { href: 'kit-camping-100-euros.html', title: 'Presupuesto 100 €', desc: 'Prioridades si el dinero aprieta.' },
        { href: 'kit-camping-300-euros.html', title: 'Presupuesto 300 €', desc: 'Kit completo de finde.' },
      ]),
    },
  ],
  faqs: [{ q: '¿Estos kits incluyen marcas fijas?', a: 'Son criterios y rutas de compra. Los modelos concretos están en Top 5 y catálogo.' }],
  conclusion: 'Elige perfil + presupuesto y valida dormir primero.',
  next: { href: 'kit-principiante.html', label: 'Kit principiante' },
});

for (const k of [
  {
    file: 'kit-principiante.html',
    slug: 'kit-principiante',
    h1: 'Kit de camping para principiantes',
    description: 'Kit principiante de camping: qué comprar primero y qué dejar para después.',
    lead: 'Objetivo: una noche cómoda sin gastar en gadgets.',
    items: ['Tienda fácil 2P/3P', 'Saco según estación', 'Esterilla básica buena', 'Frontal', 'Checklist'],
  },
  {
    file: 'kit-familia.html',
    slug: 'kit-familia',
    h1: 'Kit de camping familiar',
    description: 'Kit familiar de camping: tienda amplia, luz de ambiente y organización.',
    lead: 'Prioriza espacio, montaje simple y seguridad de los peques.',
    items: ['Tienda familiar', 'Esterillas confort', 'Faroles + frontales', 'Cocina estable', 'Botiquín'],
  },
  {
    file: 'kit-ultraligero.html',
    slug: 'kit-ultraligero',
    h1: 'Kit de camping ultraligero',
    description: 'Kit ultraligero: peso mínimo en tienda, saco y esterilla sin sufrimiento absurdo.',
    lead: 'Ultraligero no es sufrir frío: es recortar gramos tontos y mantener dormir seguro.',
    items: ['Tienda/shelter ligero', 'Saco eficiente', 'Esterilla ligera con R-Value suficiente', 'Cocina minimal', 'Calculadora peso'],
  },
]) {
  add({
    file: k.file,
    slug: k.slug,
    crumb: { href: 'kits-recomendados.html', label: 'Kits' },
    kicker: 'Kit recomendado',
    title: `Mundo Camping | ${k.h1}`,
    description: k.description,
    h1: k.h1,
    lead: k.lead,
    sections: [
      {
        id: 'piezas',
        h2: 'Piezas del kit',
        html: `<ul class="list-disc space-y-2 pl-5">${k.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        <p class="mt-4"><a href="calculadoras.html">Calculadoras</a> · <a href="camping-perfiles.html">Perfiles</a> · <a href="ofertas-camping-mes.html">Ofertas</a></p>`,
      },
    ],
    faqs: [{ q: '¿Dónde veo modelos concretos?', a: 'En las Guías Destacadas (Top 5) y en las categorías del menú.' }],
    conclusion: k.lead,
    next: { href: 'kits-recomendados.html', label: 'Otros kits' },
  });
}

// ——— CALCULADORAS ———
add({
  file: 'calculadoras.html',
  slug: 'calculadoras',
  kicker: 'Herramientas',
  title: 'Mundo Camping | Calculadoras de camping',
  description: 'Calculadoras de camping: temperatura de saco, peso de mochila y Wh de batería.',
  h1: 'Calculadoras de camping',
  lead: 'Tres herramientas rápidas para decidir saco, carga de mochila y energía.',
  sections: [
    {
      id: 'lista',
      h2: 'Herramientas',
      html: hubCards([
        { href: 'calculadora-saco-temperatura.html', title: 'Saco por temperatura', desc: 'Estima el confort que necesitas.' },
        { href: 'calculadora-peso-mochila.html', title: 'Peso de mochila', desc: 'Suma y compara con tu peso corporal.' },
        { href: 'calculadora-wh-bateria.html', title: 'Wh de batería', desc: '¿Cuántas cargas te dan?' },
      ]),
    },
  ],
  faqs: [{ q: '¿Son exactas al milímetro?', a: 'Son estimaciones educativas. Úsalas como guía junto a fichas ISO y reseñas.' }],
  conclusion: 'Calcula → contrasta con guías → compra con criterio.',
  next: { href: 'calculadora-saco-temperatura.html', label: 'Empezar por el saco' },
});

const calcShell = (inner) => `
            <section class="article-section" id="calculadora">
              <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">Calculadora</h2>
              <div class="mt-5">${inner}</div>
            </section>`;

add({
  file: 'calculadora-saco-temperatura.html',
  slug: 'calculadora-saco-temperatura',
  crumb: { href: 'calculadoras.html', label: 'Calculadoras' },
  kicker: 'Calculadora',
  title: 'Mundo Camping | Calculadora de saco de dormir por temperatura',
  description: 'Calculadora para estimar qué temperatura de confort necesitas en tu saco de dormir.',
  h1: 'Calculadora: saco por temperatura',
  lead: 'Introduce la noche más fría esperada y tu sensibilidad al frío.',
  calcHtml: calcShell(`
    <form id="calc-saco" class="calc-box space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <label class="block">Noche más fría esperada (°C)
        <input name="temp" type="number" value="5" class="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2" />
      </label>
      <label class="block">Sensibilidad
        <select name="sens" class="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2">
          <option value="2">Paso frío fácilmente</option>
          <option value="0" selected>Normal</option>
          <option value="-2">Aguanto bien el frío</option>
        </select>
      </label>
      <button type="submit" class="rounded-full bg-emerald-500 px-5 py-2.5 font-bold text-black">Calcular</button>
      <p id="calc-saco-out" class="text-[#deff9a] font-semibold" role="status"></p>
    </form>`),
  sections: [
    {
      id: 'como',
      h2: 'Cómo interpretarlo',
      html: `<p>Busca un saco cuya <strong>temperatura de confort</strong> esté en esa cifra o por debajo. Amplía en <a href="como-elegir-saco-dormir-temperatura.html">la guía de temperatura</a>.</p>`,
    },
  ],
  faqs: [{ q: '¿Y la temperatura extrema?', a: 'Ignórala para comprar. Es supervivencia, no confort.' }],
  conclusion: 'Usa confort + esterilla adecuada. El saco solo no basta.',
  next: { href: 'top-5-sacos-dormir.html', label: 'Top 5 sacos' },
  css: ['./css/calculadoras.css'],
  scripts: ['./js/calculadoras.js'],
});

add({
  file: 'calculadora-peso-mochila.html',
  slug: 'calculadora-peso-mochila',
  crumb: { href: 'calculadoras.html', label: 'Calculadoras' },
  kicker: 'Calculadora',
  title: 'Mundo Camping | Calculadora de peso de mochila de camping',
  description: 'Calculadora de peso de mochila: suma equipo y compáralo con un porcentaje de tu peso corporal.',
  h1: 'Calculadora: peso de mochila',
  lead: 'Suma lo que cargas y mira si te pasas del margen razonable.',
  calcHtml: calcShell(`
    <form id="calc-peso" class="calc-box space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <label class="block">Tu peso corporal (kg)
        <input name="body" type="number" value="70" min="30" class="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2" />
      </label>
      <label class="block">Peso de la mochila cargada (kg)
        <input name="pack" type="number" value="12" min="0" step="0.1" class="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2" />
      </label>
      <button type="submit" class="rounded-full bg-emerald-500 px-5 py-2.5 font-bold text-black">Calcular</button>
      <p id="calc-peso-out" class="text-[#deff9a] font-semibold" role="status"></p>
    </form>`),
  sections: [
    {
      id: 'ref',
      h2: 'Referencia rápida',
      html: `<p>Orientativo: muchos hikers intentan no pasar del ~15–20% del peso corporal en rutas cómodas. Más detalle en <a href="peso-mochila-camping-cuanto-llevar.html">peso de mochila</a>.</p>`,
    },
  ],
  faqs: [{ q: '¿Incluyo agua?', a: 'Sí, el peso real de salida incluye agua y comida del día.' }],
  conclusion: 'Si te pasas, recorta gadgets antes que dormir seguro.',
  next: { href: 'kit-ultraligero.html', label: 'Kit ultraligero' },
  css: ['./css/calculadoras.css'],
  scripts: ['./js/calculadoras.js'],
});

add({
  file: 'calculadora-wh-bateria.html',
  slug: 'calculadora-wh-bateria',
  crumb: { href: 'calculadoras.html', label: 'Calculadoras' },
  kicker: 'Calculadora',
  title: 'Mundo Camping | Calculadora Wh: power bank y estación',
  description: 'Calculadora de Wh para estimar cuántas cargas de móvil o consumo te da una batería de camping.',
  h1: 'Calculadora: Wh de batería',
  lead: 'Estima cargas de móvil a partir de la capacidad en Wh (o mAh).',
  calcHtml: calcShell(`
    <form id="calc-wh" class="calc-box space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <label class="block">Capacidad de la batería (Wh)
        <input name="wh" type="number" value="100" min="1" class="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2" />
      </label>
      <label class="block">Batería del móvil (Wh aprox.)
        <input name="phone" type="number" value="15" min="1" step="0.1" class="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2" />
      </label>
      <button type="submit" class="rounded-full bg-emerald-500 px-5 py-2.5 font-bold text-black">Calcular</button>
      <p id="calc-wh-out" class="text-[#deff9a] font-semibold" role="status"></p>
    </form>`),
  sections: [
    {
      id: 'nota',
      h2: 'Nota importante',
      html: `<p>Hay pérdidas por conversión (suele quedar ~60–80% usable). Por eso la cifra es orientativa. Guía: <a href="power-bank-vs-estacion-energia-camping.html">power bank vs estación</a>.</p>`,
    },
  ],
  faqs: [{ q: '¿Y si solo tengo mAh?', a: 'Wh ≈ (mAh × V) / 1000. En power banks USB suele usarse 3,7 V nominales.' }],
  conclusion: 'Compra por Wh reales según tus aparatos, no por marketing.',
  next: { href: 'estaciones-energia.html', label: 'Estaciones de energía' },
  css: ['./css/calculadoras.css'],
  scripts: ['./js/calculadoras.js'],
});

// Write pages
const slugs = [];
for (const p of pages) {
  fs.writeFileSync(path.join(root, p.file), articlePage(p), 'utf8');
  slugs.push(p.slug);
  console.log('OK', p.file);
}

// Patch sitemap
const sitemapPath = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
for (const slug of slugs) {
  const loc = `${SITE}/${slug}`;
  if (!sitemap.includes(loc)) {
    const entry = `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    sitemap = sitemap.replace('</urlset>', entry + '</urlset>');
  }
}
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('Sitemap updated,', slugs.length, 'pages');
