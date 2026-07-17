/**
 * Completa SEO: 15 destinos restantes + hub guías + related posts + sitemap
 * node scripts/complete-traffic-seo.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.mundocamping.net';
const TODAY = '2026-07-18';

const MISSING = [
  { id: 'el-chalten', file: 'acampar-el-chalten.html', name: 'El Chaltén / Fitz Roy', country: 'Argentina', image: 'destinos/destino-el-chalten.jpg', why: 'Capital del trekking argentino: amaneceres frente al Fitz Roy y campings de montaña con vibra de pueblo aventurero.', tips: ['Clima cambiante: capas siempre.', 'Esterilla con buen R-Value.', 'Sal temprano a miradores.'] },
  { id: 'scottish-highlands', file: 'acampar-scottish-highlands.html', name: 'Highlands', country: 'Escocia', image: 'destinos/destino-scottish-highlands.jpg', why: 'Glen, lochs y niebla: wild camping atmosférico con responsabilidad.', tips: ['Outdoor Access Code.', 'Mosquitos (midges) en verano.', 'Impermeable imprescindible.'] },
  { id: 'dolomites', file: 'acampar-dolomites.html', name: 'Dolomitas', country: 'Italia', image: 'destinos/destino-dolomites.jpg', why: 'Torres rosadas al atardecer y refugios: trekking y camping de alto nivel visual.', tips: ['Reserva en julio–agosto.', 'Combina valle + día de cumbre.', 'Saco 3 estaciones.'] },
  { id: 'swiss-alps', file: 'acampar-swiss-alps.html', name: 'Alpes suizos', country: 'Suiza', image: 'destinos/destino-swiss-alps.jpg', why: 'Lagos glaciares y pueblos de cuento: camping ordenado con paisaje de película.', tips: ['Campings caros pero impecables.', 'Reserva en temporada alta.', 'Transporte público excelente.'] },
  { id: 'tasmania', file: 'acampar-tasmania.html', name: 'Tasmania', country: 'Australia', image: 'destinos/destino-tasmania.jpg', why: 'Parques remotos y costas batidas: camping australiano sin el calor extremo del continente.', tips: ['Permisos Parks Tasmania.', 'Clima cambiante.', 'Fauna: guarda comida.'] },
  { id: 'serengeti', file: 'acampar-serengeti.html', name: 'Serengeti', country: 'Tanzania', image: 'destinos/destino-serengeti.jpg', why: 'Sabana y migración: camping safari donde la noche es tan intensa como el día.', tips: ['Ve con operador.', 'No improvises camping libre.', 'Frontal + power bank.'] },
  { id: 'sossusvlei', file: 'acampar-sossusvlei.html', name: 'Sossusvlei', country: 'Namibia', image: 'destinos/destino-sossusvlei.jpg', why: 'Dunas rojas y cielos limpios: desierto + astronomía en una sola noche.', tips: ['Amanece temprano en Dune 45.', 'Agua abundante.', 'Noches frías.'] },
  { id: 'japanese-alps', file: 'acampar-japanese-alps.html', name: 'Alpes japoneses', country: 'Japón', image: 'destinos/destino-japanese-alps.jpg', why: 'Bosques limpios y onsen: camping disciplinado con cultura outdoor japonesa.', tips: ['Temporada corta en altura.', 'Fechas de apertura Kamikochi.', 'Respeta normas de camping.'] },
  { id: 'costa-rica', file: 'acampar-costa-rica.html', name: 'Península de Osa', country: 'Costa Rica', image: 'destinos/destino-costa-rica.jpg', why: 'Selva y playas: biodiversidad extrema en camping tropical.', tips: ['Mosquitera obligatoria.', 'Ropa de secado rápido.', 'Reserva lodges/campings.'] },
  { id: 'denali', file: 'acampar-denali.html', name: 'Denali', country: 'EE. UU.', image: 'destinos/destino-denali.jpg', why: 'Tundra y escala épica: camping salvaje bajo la montaña más alta de Norteamérica.', tips: ['Permisos backcountry.', 'Defensa ante osos.', 'Saco extremo.'] },
  { id: 'cappadocia', file: 'acampar-cappadocia.html', name: 'Capadocia', country: 'Turquía', image: 'destinos/destino-cappadocia.jpg', why: 'Chimeneas de hadas y globos al amanecer: escenario único para dormir bajo estrellas.', tips: ['Madruga para los globos.', 'Valle Göreme.', 'Glamping o camp regulado.'] },
  { id: 'triglav', file: 'acampar-triglav.html', name: 'Parque Triglav', country: 'Eslovenia', image: 'destinos/destino-triglav.jpg', why: 'Lagos alpinos y Alpes Julianos: joya compacta menos masificada.', tips: ['Camping lago + cumbre.', 'Temporada verano.', 'Saco 3 estaciones.'] },
  { id: 'lapland', file: 'acampar-lapland.html', name: 'Laponia', country: 'Finlandia', image: 'destinos/destino-lapland.jpg', why: 'Auroras y silencio boreal: el camping nórdico más mágico.', tips: ['Invierno: R-Value alto.', 'Saco extremo.', 'Planifica luz polar.'] },
  { id: 'atacama', file: 'acampar-atacama.html', name: 'Desierto de Atacama', country: 'Chile', image: 'destinos/destino-atacama.jpg', why: 'Desierto seco y cielos astronómicos de los mejores del mundo.', tips: ['Altitud + frío nocturno.', 'Hidrátate.', 'Protección solar.'] },
  { id: 'valle-sagrado', file: 'acampar-valle-sagrado.html', name: 'Valle Sagrado', country: 'Perú', image: 'destinos/destino-valle-sagrado.jpg', why: 'Andes e historia inca: camping a gran altitud con noches estrelladas.', tips: ['Aclimata en Cusco.', 'Saco para frío.', 'Respeta comunidades.'] },
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function destinoHtml(d) {
  const img = `./assets/${d.image}`;
  const imgAbs = `${SITE}/assets/${d.image}`;
  const slug = d.file.replace(/\.html$/, '');
  const tips = d.tips.map((t) => `<li>${esc(t)}</li>`).join('');
  return `<!DOCTYPE html>
<html lang="es" data-site-root=".">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/tailwind-built.css" />
    <link rel="stylesheet" href="./css/fonts.css" />
    <meta name="description" content="Acampar en ${esc(d.name)} (${esc(d.country)}): por qué es de los mejores destinos, consejos y equipo recomendado." />
    <title>Mundo Camping | Acampar en ${esc(d.name)} (${esc(d.country)})</title>
    <link rel="canonical" href="${SITE}/${slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Mundo Camping" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="Mundo Camping | Acampar en ${esc(d.name)}" />
    <meta property="og:description" content="${esc(d.why)}" />
    <meta property="og:url" content="${SITE}/${slug}" />
    <meta property="og:image" content="${imgAbs}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mundo Camping | Acampar en ${esc(d.name)}" />
    <meta name="twitter:description" content="${esc(d.why)}" />
    <meta name="twitter:image" content="${imgAbs}" />
    <meta name="author" content="Mundo Camping" />
    <meta property="article:modified_time" content="${TODAY}" />
    <link rel="stylesheet" href="./mundo-camping.css" />
    <link rel="stylesheet" href="./site-header.css?v=7" />
    <link rel="stylesheet" href="./footer-premium.css" />
    <link rel="stylesheet" href="./styles-guias.css" />
    <style>
      .article-page-hero--destino {
        background-image:
          linear-gradient(180deg, rgba(2, 4, 3, 0.25) 0%, rgba(2, 4, 3, 0.55) 48%, rgba(2, 4, 3, 0.97) 100%),
          url('${img}');
        background-position: center;
        background-size: cover;
      }
    </style>
  </head>
  <body class="min-h-screen bg-[#020403] font-sans text-white antialiased">
    <header id="site-header"></header>
    <main>
      <article itemscope itemtype="https://schema.org/Article">
        <header class="article-page-hero article-page-hero--destino relative isolate flex items-end overflow-hidden">
          <div class="container-premium pb-12 pt-28 sm:pb-16 lg:pb-20">
            <div class="max-w-3xl">
              <nav class="mb-6 text-sm text-white/65" aria-label="Migas de pan">
                <a href="index.html" class="hover:text-[#deff9a]">Inicio</a>
                <span class="mx-2 text-white/30">/</span>
                <a href="mejores-sitios-acampar.html" class="hover:text-[#deff9a]">Destinos</a>
                <span class="mx-2 text-white/30">/</span>
                <span>${esc(d.name)}</span>
              </nav>
              <p class="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">Destino · ${esc(d.country)}</p>
              <h1 class="mt-5 font-editorial text-4xl font-black tracking-tight text-white sm:text-5xl" itemprop="headline">Acampar en ${esc(d.name)}</h1>
              <p class="article-lead article-hero-lead max-w-2xl" itemprop="description">${esc(d.why)}</p>
              <div class="article-meta-row"><span>Actualizado julio 2026</span><span aria-hidden="true">•</span><span>Guía de destino</span></div>
              <p class="mt-4 text-sm text-white/70">Por <a class="text-[#deff9a]" href="sobre-mi.html">Mundo Camping</a></p>
            </div>
          </div>
        </header>
        <div class="container-premium pb-20 pt-10">
          <div class="max-w-3xl space-y-10 text-base leading-7 text-white/80">
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Por qué merece la pena</h2>
              <p class="mt-4">${esc(d.why)} Forma parte de nuestra selección de <a href="mejores-sitios-acampar.html">mejores sitios del mundo para acampar</a>.</p>
            </section>
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Consejos prácticos</h2>
              <ul class="mt-4 list-disc space-y-2 pl-5">${tips}</ul>
            </section>
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Equipo recomendado</h2>
              <p class="mt-4">Prepara tu salida con nuestras guías de compra:</p>
              <p class="mt-4 flex flex-wrap gap-3">
                <a href="tiendas.html" class="cta-button-highlight inline-flex rounded-xl px-5 py-3 text-sm font-bold">Tiendas</a>
                <a href="sacos.html" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Sacos</a>
                <a href="esterillas.html" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Esterillas</a>
                <a href="iluminacion/" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Iluminación</a>
                <a href="blog.html" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Blog</a>
              </p>
            </section>
            <p><a href="mejores-sitios-acampar.html" class="text-[#deff9a] hover:underline">← Volver al mapa de destinos</a></p>
          </div>
        </div>
      </article>
    </main>
    <footer id="site-footer"></footer>
    <script defer src="./js/site-header.js?v=7"></script>
    <script defer src="./js/site-footer.js"></script>
  </body>
</html>
`;
}

for (const d of MISSING) {
  fs.writeFileSync(path.join(root, d.file), destinoHtml(d), 'utf8');
  console.log('destino', d.file);
}

// Patch destinos data with page links
let dataJs = fs.readFileSync(path.join(root, 'js', 'destinos-camping-data.js'), 'utf8');
for (const d of MISSING) {
  const needle = `id: '${d.id}',`;
  if (dataJs.includes(needle) && !dataJs.includes(`id: '${d.id}',\n    page:`)) {
    dataJs = dataJs.replace(needle, `id: '${d.id}',\n    page: '${d.file}',`);
  }
}
fs.writeFileSync(path.join(root, 'js', 'destinos-camping-data.js'), dataJs, 'utf8');

// Sitemap
let sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const d of MISSING) {
  const loc = `${SITE}/${d.file.replace(/\.html$/, '')}`;
  if (!sm.includes(loc)) {
    sm = sm.replace(
      '</urlset>',
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n</urlset>`
    );
  }
}
if (!sm.includes(`${SITE}/guias`)) {
  sm = sm.replace(
    '</urlset>',
    `  <url>\n    <loc>${SITE}/guias</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n</urlset>`
  );
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), sm, 'utf8');

console.log('OK destinos + sitemap');
