/**
 * Genera fichas SEO de campings en España.
 * node scripts/generate-camping-fichas.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.mundocamping.net';
const TODAY = '2026-08-30';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const fichas = [
  {
    slug: 'acampar-sanguli-salou',
    nombre: 'Camping Resort Sangulí Salou',
    h1: 'Camping Sangulí Salou',
    kicker: 'Costa Dorada · Tarragona',
    image: './assets/campings/camping-sanguli-salou.jpg',
    meta: 'Guía del Camping Sangulí Salou (Tarragona): resort familiar en la Costa Dorada, piscinas, playas y consejos para acampar.',
    why: 'Sangulí Salou es uno de los referentes familiares de la Costa Dorada: parcelas amplias, zona de piscinas y acceso rápido a las playas de Salou y Cambrils. Ideal si buscas camping con servicios completos sin renunciar al mar.',
    tips: [
      'Reserva con antelación en julio y agosto: es uno de los campings más demandados de la zona.',
      'Combina día de playa en Platja de Llevant con paseo nocturno por el paseo marítimo.',
      'Si viajas en autocaravana, confirma medidas de parcela al reservar.',
    ],
    nearby: ['PortAventura a pocos minutos', 'Cambrils y su gastronomía marinera', 'Tarragona romana en day trip'],
    faq: [
      {
        q: '¿Camping Sangulí Salou es solo para familias?',
        a: 'Está orientado a familias y parejas que buscan resort con piscinas, animación y playa cercana.',
      },
      {
        q: '¿Cuándo reservar en Salou?',
        a: 'De junio a septiembre conviene reservar semanas antes, especialmente en puentes y vacaciones escolares.',
      },
    ],
  },
  {
    slug: 'acampar-gavina-tamarit',
    nombre: 'Camping Gavina',
    h1: 'Camping Gavina (Tamarit)',
    kicker: 'Tamarit · Tarragona',
    image: './assets/campings/camping-gavina.jpg',
    meta: 'Camping Gavina en Tamarit (Tarragona): acampada junto al castillo, calas y pinos en la Costa Daurada.',
    why: 'El Camping Gavina se sitúa en Tamarit, entre el castillo y calas de agua transparente. Es perfecto para quien busca sombra de pino, ambiente tranquilo y playas menos masificadas que el centro de Salou.',
    tips: [
      'Visita el Castell de Tamarit al atardecer: queda a poca distancia del camping.',
      'Lleva calzado de roca para acceder a calas con posidonia y fondo rocoso.',
      'Prueba la ruta costera hacia Altafulla o la desembocadura del Gaià.',
    ],
    nearby: ['Castell de Tamarit', 'Altafulla y la desembocadura del Francolí', 'Delta del Ebro en excursión de un día'],
    faq: [
      { q: '¿Gavina está en Costa Brava o Costa Dorada?', a: 'Tamarit pertenece a la Costa Daurada (Tarragona), aunque comparte el espíritu mediterráneo de calas y pinos.' },
      { q: '¿Se puede acampar todo el año?', a: 'Temporada alta concentra la mayor oferta de servicios; consulta apertura en invierno según parcelas.' },
    ],
  },
  {
    slug: 'acampar-bolnuevo',
    nombre: 'Camping Bolnuevo',
    h1: 'Camping Bolnuevo',
    kicker: 'Murcia · Costa Cálida',
    image: './assets/campings/camping-bolnuevo.jpg',
    meta: 'Camping Bolnuevo (Murcia): playas vírgenes, Ciudad Encantada y acampada con sol casi todo el año.',
    why: 'Bolnuevo combina playas amplias y las famosas erosiones («Ciudad Encantada») a poca distancia. El Camping Bolnuevo es base ideal para disfrutar del litoral murciano sin el ritmo de las grandes urbes costeras.',
    tips: [
      'Visita las Erosiones de Bolnuevo al amanecer: mejor luz y menos calor.',
      'Protégete del sol: sombra en parcela y crema SPF alta son imprescindibles.',
      'Combina con Mazarrón o Águilas si quieres más opciones de playa.',
    ],
    nearby: ['Erosiones de Bolnuevo', 'Playa de Bolnuevo y Percheles', 'Puerto de Mazarrón'],
    faq: [
      { q: '¿Qué hacer cerca del Camping Bolnuevo?', a: 'Baño en playas vírgenes, senderismo por las formaciones rocosas y rutas en kayak por la costa.' },
      { q: '¿Hace falta reservar en verano?', a: 'Sí, la Costa Cálida recibe mucho turismo europeo entre junio y septiembre.' },
    ],
  },
  {
    slug: 'acampar-las-dunas',
    nombre: 'Camping Las Dunas',
    h1: 'Camping Las Dunas',
    kicker: 'Sant Pere Pescador · Girona',
    image: './assets/campings/camping-las-dunas.jpg',
    meta: 'Camping Las Dunas en Sant Pere Pescador: dunas, windsurf en la Bahía de Roses y acampada en la Costa Brava.',
    why: 'Las Dunas ocupa un entorno privilegiado entre dunas naturales y la Bahía de Roses. Es un clásico para familias y surfistas que buscan camping con acceso directo a playa y rutas hacia Cap de Creus.',
    tips: [
      'Si practicas windsurf o paddle surf, pregunta por escuelas en Empuriabrava y Roses.',
      'Reserva excursión en barco a Cadaqués o camina tramos del GR-92.',
      'Lleva cortavientos: la Tramontana puede soplar con fuerza en la bahía.',
    ],
    nearby: ['Bahía de Roses', 'Parque natural del Cap de Creus', 'Empuriabrava y sus canales'],
    faq: [
      { q: '¿Camping Las Dunas es bueno para niños?', a: 'Sí: playa amplia, parcelas con sombra y actividades náuticas en la bahía.' },
      { q: '¿Distancia a Cadaqués?', a: 'Unos 45–60 minutos en coche por carretera de montaña; planifica el día completo.' },
    ],
  },
  {
    slug: 'acampar-kiko-park',
    nombre: 'Camping Kiko Park',
    h1: 'Camping Kiko Park (Oliva)',
    kicker: 'Oliva · Valencia',
    image: './assets/campings/camping-kiko-park.jpg',
    meta: 'Camping Kiko Park en Oliva (Valencia): parcelas familiares, piscinas y playa de la Costa Blanca a un paso.',
    why: 'Kiko Park se encuentra en Oliva Nova, entre naranjos y la desembocadura del río: ambiente familiar, instalaciones de piscina y acceso a kilómetros de playa fina en la Safor.',
    tips: [
      'Alquila bicicleta para recorrer la Devesa y los caminos entre huertos.',
      'Visita Gandía o Dénia en excursiones de medio día.',
      'Temporada de naranja en invierno: paisaje verde y clima suave para acampar.',
    ],
    nearby: ['Playa de Oliva y Piles', 'Marjal de Pego-Oliva', 'Dénia y el Montgó'],
    faq: [
      { q: '¿Kiko Park admite mascotas?', a: 'Consulta la política actual en la web del camping; muchas parcelas admiten perros con suplemento.' },
      { q: '¿Mejor época para Oliva?', a: 'Primavera y septiembre ofrecen buen clima y menos aglomeraciones que julio–agosto.' },
    ],
  },
  {
    slug: 'acampar-el-escorial',
    nombre: 'Camping El Escorial',
    h1: 'Camping El Escorial',
    kicker: 'San Lorenzo · Madrid',
    image: './assets/campings/camping-el-escorial.jpg',
    meta: 'Camping El Escorial (Madrid): acampada en la Sierra de Guadarrama, rutas de montaña y patrimonio real cerca.',
    why: 'Acampar en El Escorial une montaña accesible desde Madrid con patrimonio histórico: rutas por la Sierra de Guadarrama, frescor nocturno y la visita al Monasterio de San Lorenzo como plan cultural.',
    tips: [
      'Sube al Silla de Felipe II o al Abantos con mapa y capas térmicas.',
      'Evita fines de semana muy concurridos si buscas tranquilidad en parcela.',
      'Combina acampada con visita guiada al Real Monasterio.',
    ],
    nearby: ['Monasterio de El Escorial', 'La Silla de Felipe II', 'Valle de los Caídos (controversial, visita opcional)'],
    faq: [
      { q: '¿Se puede acampar todo el año en El Escorial?', a: 'La temporada alta es primavera–otoño; en invierno las noches son frías y algunos servicios reducen horario.' },
      { q: '¿Cómo llegar desde Madrid?', a: 'En coche por la A-6 hasta San Lorenzo de El Escorial (aprox. 1 h); también hay tren desde Atocha.' },
    ],
  },
  {
    slug: 'acampar-playa-joyel',
    nombre: 'Camping Playa Joyel',
    h1: 'Camping Playa Joyel',
    kicker: 'Noja · Cantabria',
    image: './assets/campings/camping-playa-joyel.jpg',
    meta: 'Camping Playa Joyel en Noja (Cantabria): playa de Ris, marisma de Santoña y acampada verde en el Cantábrico.',
    why: 'Playa Joyel es uno de los campings más conocidos del Cantábrico: parcelas entre pinos, acceso a la playa de Ris y proximidad al parque natural de Santoña, Victoria y Joyel.',
    tips: [
      'Recorre el sendero litoral hasta Santoña para observar aves marinas.',
      'Lleva chubasquero aunque sea verano: el Cantábrico cambia rápido.',
      'Prueba anchoas de Santoña y sobaos pasiegos en el mercado local.',
    ],
    nearby: ['Playa de Ris', 'Marisma de Santoña', 'Berria y Laida (Urdaibai en day trip)'],
    faq: [
      { q: '¿Playa Joyel es first line de playa?', a: 'Está muy cerca de la playa de Ris, separado por zona verde; confirma tipo de parcela al reservar.' },
      { q: '¿Cuándo ir a Noja?', a: 'Julio y agosto son más concurridos; junio y septiembre ofrecen buen equilibrio clima–tranquilidad.' },
    ],
  },
  {
    slug: 'acampar-cala-gogo',
    nombre: 'Camping Cala Gogo',
    h1: 'Camping Cala Gogo',
    kicker: 'Platja d\'Aro · Girona',
    image: './assets/campings/camping-cala-gogo.jpg',
    meta: 'Camping Cala Gogo en Platja d\'Aro: calas de la Costa Brava, caminos de ronda y acampada bajo pinos.',
    why: 'Cala Gogo es un clásico de la Costa Brava: parcelas entre pinos, acceso a la cala homónima y punto de partida para caminar el camino de ronda hacia Sant Antoni o S\'Agaró.',
    tips: [
      'Camina al atardecer por el camino de ronda: menos calor y luz dorada.',
      'Reserva restaurante con antelación en julio en Platja d\'Aro.',
      'Explora calas secretas en kayak desde la misma bahía.',
    ],
    nearby: ['Cala Gogo', 'S\'Agaró y su arquitectura', 'Palamós y museo de la pesca'],
    faq: [
      { q: '¿Cala Gogo vs otros campings de la Costa Brava?', a: 'Destaca por cala propia y ambiente familiar consolidado; Las Dunas está más al norte, en Roses.' },
      { q: '¿Parcela con electricidad?', a: 'La mayoría de parcelas premium incluyen toma; confirma al reservar según tamaño de tienda/caravana.' },
    ],
  },
  {
    slug: 'acampar-pantano-chorro',
    nombre: 'Camping Pantano del Chorro',
    h1: 'Camping Pantano del Chorro',
    kicker: 'Ardales · Málaga',
    image: './assets/campings/camping-pantano-chorro.jpg',
    meta: 'Camping en el Pantano del Chorro (Málaga): embalse Conde de Guadalhorce, Caminito del Rey y acampada en el bosque.',
    why: 'El entorno del pantano de El Chorro —embalse Conde de Guadalhorce— concentra escalada, senderismo y baño en aguas turquesas. Camping Parque Ardales y otras opciones ofrecen parcelas entre pinos a orillas del embalse.',
    tips: [
      'Reserva entradas del Caminito del Rey con semanas de antelación.',
      'Lleva bañador y agua: el verano andaluz es intenso.',
      'Visita la Cueva de Ardales si te interesa el arte rupestre.',
    ],
    nearby: ['Caminito del Rey', 'Desfiladero de los Gaitanes', 'Embalse Conde de Guadalhorce'],
    faq: [
      { q: '¿Dónde acampar cerca del Caminito del Rey?', a: 'Camping Parque Ardales y áreas de Ardales están a 1–2 km del acceso peatonal.' },
      { q: '¿Se puede bañar en el pantano?', a: 'Hay zonas habilitadas; respeta señalización y viento en actividades náuticas.' },
    ],
  },
];

function renderFicha(f) {
  const canonical = `${SITE}/${f.slug}`;
  const ogImage = `${SITE}/${f.image.replace(/^\.\//, '')}`;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: f.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  const breadcrumbLabel = f.h1.replace(/^Camping /, '');

  return `<!DOCTYPE html>
<html lang="es" data-site-root=".">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/tailwind-built.css" />
    <link rel="stylesheet" href="./css/fonts.css" />
    <meta name="description" content="${esc(f.meta)}" />
    <title>Mundo Camping | ${esc(f.h1)} — Guía y consejos</title>
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Mundo Camping" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="Mundo Camping | ${esc(f.h1)}" />
    <meta property="og:description" content="${esc(f.why.slice(0, 155))}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mundo Camping | ${esc(f.h1)}" />
    <meta name="twitter:description" content="${esc(f.why.slice(0, 155))}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="author" content="Mundo Camping" />
    <link rel="stylesheet" href="./mundo-camping.css" />
    <link rel="stylesheet" href="./site-header.css?v=11" />
    <link rel="stylesheet" href="./footer-premium.css" />
    <link rel="stylesheet" href="./styles-guias.css" />
    <link rel="stylesheet" href="./css/home-tourism.css" />
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <style>
      .article-page-hero--destino {
        background-image:
          linear-gradient(180deg, rgba(2, 4, 3, 0.25) 0%, rgba(2, 4, 3, 0.55) 48%, rgba(2, 4, 3, 0.97) 100%),
          url('${f.image}');
        background-position: center;
        background-size: cover;
      }
    </style>
  </head>
  <body class="min-h-screen bg-[#020403] font-sans text-white antialiased">
    <header id="site-header"></header>
    <main>
      <article data-cross-type="camping" itemscope itemtype="https://schema.org/Article">
        <header class="article-page-hero article-page-hero--destino relative isolate flex items-end overflow-hidden">
          <div class="container-premium pb-12 pt-28 sm:pb-16 lg:pb-20">
            <div class="max-w-3xl">
              <nav class="mb-6 text-sm text-white/65" aria-label="Migas de pan">
                <a href="index.html" class="hover:text-[#deff9a]">Inicio</a>
                <span class="mx-2 text-white/30">/</span>
                <a href="campings.html" class="hover:text-[#deff9a]">Campings</a>
                <span class="mx-2 text-white/30">/</span>
                <span>${esc(breadcrumbLabel)}</span>
              </nav>
              <p class="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">${esc(f.kicker)}</p>
              <h1 class="mt-5 font-editorial text-4xl font-black tracking-tight text-white sm:text-5xl" itemprop="headline">${esc(f.h1)}</h1>
              <p class="article-lead article-hero-lead max-w-2xl" itemprop="description">${esc(f.why.slice(0, 120))}…</p>
              <div class="article-meta-row">
                <span>Actualizado agosto 2026</span>
                <span aria-hidden="true">•</span>
                <span>Ficha de camping en España</span>
              </div>
              <p class="mt-4 text-sm text-white/70">Por <a class="text-[#deff9a]" href="sobre-mi.html">Mundo Camping</a></p>
            </div>
          </div>
        </header>
        <div class="container-premium pb-20 pt-10">
          <div class="max-w-3xl space-y-10 text-base leading-7 text-white/80">
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Por qué merece la pena</h2>
              <p class="mt-4">${esc(f.why)} Consulta su ubicación en nuestro <a href="campings.html" class="text-[#deff9a] hover:underline">mapa interactivo de campings en España</a>.</p>
            </section>
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Consejos prácticos</h2>
              <ul class="mt-4 list-disc space-y-2 pl-5">${f.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
            </section>
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Qué hacer cerca</h2>
              <ul class="mt-4 list-disc space-y-2 pl-5">${f.nearby.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
            </section>
            <section class="article-faq">
              <h2 class="font-editorial text-2xl font-black text-white">Preguntas frecuentes</h2>
              <div class="mt-4 space-y-4">${f.faq
                .map(
                  (item) =>
                    `<details class="rounded-lg border border-white/10 bg-white/5 p-4"><summary class="cursor-pointer font-bold text-white">${esc(item.q)}</summary><p class="mt-2 text-white/75">${esc(item.a)}</p></details>`
                )
                .join('')}</div>
            </section>
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Planifica la escapada</h2>
              <p class="mt-4 flex flex-wrap gap-3">
                <a href="campings.html" class="tourism-btn tourism-btn--primary inline-flex text-sm">Ver en el mapa</a>
                <a href="naturaleza.html" class="tourism-btn tourism-btn--ghost inline-flex text-sm">Naturaleza</a>
                <a href="rutas.html" class="tourism-btn tourism-btn--ghost inline-flex text-sm">Rutas</a>
              </p>
            </section>
            <p><a href="campings.html" class="text-[#deff9a] hover:underline">← Volver al directorio de campings</a></p>
          </div>
        </div>
      </article>
    </main>
    <footer id="site-footer"></footer>
    <script defer src="./js/site-header.js?v=11"></script>
    <script defer src="./js/site-footer.js"></script>
    <script defer src="./js/structured-data.js"></script>
  </body>
</html>
`;
}

for (const f of fichas) {
  const out = path.join(root, `${f.slug}.html`);
  fs.writeFileSync(out, renderFicha(f), 'utf8');
  console.log('Wrote', f.slug + '.html');
}

console.log('Done:', fichas.length, 'fichas');
