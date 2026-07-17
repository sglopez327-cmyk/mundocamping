/**
 * Empujón SEO: 10 guías long-tail + 10 fichas destino + registro sitemap/blog.
 * node scripts/generate-seo-push.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.mundocamping.net';
const TODAY = '2026-07-18';

const GUIDES = [
  {
    file: 'mejor-tienda-camping-2-personas.html',
    slug: 'mejor-tienda-camping-2-personas',
    image: 'guia-tienda-2-personas.jpg',
    heroClass: 'tiendas',
    cat: 'Tiendas',
    catHref: 'tiendas.html',
    title: 'Mundo Camping | Mejor tienda de camping para 2 personas (2026)',
    description:
      'Cómo elegir la mejor tienda de camping para 2 personas: peso, vestíbulo, columna de agua y errores al comprar en Amazon.',
    h1: 'Mejor tienda de camping para 2 personas: guía de compra 2026',
    lead: 'No hace falta la más cara: hace falta la que encaje con vuestro uso (fin de semana, mochila o coche). Criterios claros y enlaces a comparativas.',
    minutes: '9 min',
    guideId: 'tienda-2p',
    sections: [
      {
        id: 'uso',
        h2: 'Primero define el uso (no el color)',
        html: `<p>Pareja en coche ≠ pareja en mochila. Si llegáis en coche, priorizad <strong>espacio y vestíbulo</strong>. Si cargáis la tienda a pie, priorizad <strong>peso bajo 2,5 kg</strong> y volumen compacto.</p>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Fin de semana / camping: comodidad y doble entrada.</li>
          <li>Trekking: peso y montaje rápido.</li>
          <li>Lluvia frecuente: columna de agua alta + buen tensado del flysheet.</li>
        </ul>`,
      },
      {
        id: 'criterios',
        h2: 'Criterios que sí importan en 2P',
        html: `<p><strong>Capacidad real:</strong> “2 personas” a menudo es justo. Si lleváis mochilas dentro, mirad vestíbulo amplio.</p>
        <p class="mt-4"><strong>Columna de agua:</strong> a partir de ~3000 mm en techo suele bastar para lluvia sostenida si la tienda está bien montada.</p>
        <p class="mt-4"><strong>Varillas y viento:</strong> mejor estructura estable que marketing “ultraligero” sin vientos serios.</p>`,
      },
      {
        id: 'errores',
        h2: 'Errores al comprar en Amazon',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Elegir solo por estrellas sin leer reseñas con fotos de lluvia.</li>
          <li>Ignorar el peso real (saco + varillas + piquetas).</li>
          <li>Comprar 2P “barata” sin footprint ni vientos decentes.</li>
        </ul>
        <p class="mt-4">Comparativas recomendadas: <a href="top-5-tiendas-parejas.html">top tiendas para parejas</a> y <a href="tiendas.html">catálogo de tiendas</a>.</p>`,
      },
    ],
    faqs: [
      { q: '¿Una tienda 2P sirve para invierno?', a: 'Solo si está pensada para 3–4 estaciones. La mayoría de 2P baratas son 3 estaciones: bien en lluvia, mal en nieve pesada.' },
      { q: '¿Mejor con o sin vestíbulo?', a: 'Con vestíbulo si llueve o cocináis fuera. Sin vestíbulo solo si vais ultraligeros y el tiempo es estable.' },
    ],
    conclusion: 'Define uso → filtra peso/espacio → valida impermeabilidad y montaje. Luego compara modelos reales en nuestras guías de parejas.',
    next: { href: 'top-5-tiendas-parejas.html', label: 'Top tiendas para parejas' },
  },
  {
    file: 'como-elegir-saco-dormir-temperatura.html',
    slug: 'como-elegir-saco-dormir-temperatura',
    image: 'guia-saco-temperatura.jpg',
    heroClass: 'sacos',
    cat: 'Sacos',
    catHref: 'sacos.html',
    title: 'Mundo Camping | Cómo elegir saco de dormir por temperatura',
    description:
      'Guía para elegir saco de dormir según temperatura de confort, límite y extrema: qué mirar en la etiqueta ISO y errores típicos.',
    h1: 'Cómo elegir un saco de dormir según la temperatura',
    lead: 'La etiqueta engaña si solo miras el número más bajo. Aprende a leer confort / límite / extrema y elige sin pasar frío ni cargar de más.',
    minutes: '8 min',
    guideId: 'saco-temp',
    sections: [
      {
        id: 'etiqueta',
        h2: 'Confort, límite y extrema: qué mirar',
        html: `<p>En normas ISO/EN verás tres valores. Para la mayoría de personas el que importa es la <strong>temperatura de confort</strong> (mujer estándar) o el uso real que haréis.</p>
        <ul class="list-disc space-y-2 pl-5 text-white/80">
          <li><strong>Confort:</strong> dormirás bien la mayor parte de la noche.</li>
          <li><strong>Límite:</strong> puedes aguantar, pero al límite.</li>
          <li><strong>Extrema:</strong> supervivencia, no confort. Ignórala para comprar.</li>
        </ul>`,
      },
      {
        id: 'relleno',
        h2: 'Sintético vs pluma',
        html: `<p>Sintético aguanta mejor la humedad y suele ser más barato. Pluma aísla más por gramo si se mantiene seca. En España húmeda, muchos campistas prefieren sintético 3 estaciones.</p>
        <p class="mt-4">Más detalle: <a href="saco-dormir-verano-vs-invierno.html">saco verano vs invierno</a> y <a href="top-5-sacos-dormir.html">top 5 sacos 2026</a>.</p>`,
      },
    ],
    faqs: [
      { q: '¿Debo comprar un saco con margen de frío?', a: 'Sí: 3–5 °C por debajo de la noche más fría habitual. Mejor un poco “de sobra” que quedarte corto.' },
      { q: '¿Sirve un saco de verano en otoño?', a: 'Solo si las noches no bajan mucho. En montaña española de octubre, suele hacer falta un 3 estaciones.' },
    ],
    conclusion: 'Compra por temperatura de confort + tipo de relleno según humedad. Olvida el marketing de “extrema”.',
    next: { href: 'top-5-sacos-dormir.html', label: 'Top 5 sacos de dormir' },
  },
  {
    file: 'power-bank-vs-estacion-energia-camping.html',
    slug: 'power-bank-vs-estacion-energia-camping',
    image: 'guia-powerbank-vs-estacion.jpg',
    heroClass: 'energia',
    cat: 'Energía',
    catHref: 'baterias.html',
    title: 'Mundo Camping | Power bank o estación de energía para camping',
    description:
      'Power bank vs estación de energía portátil en acampada: cuándo basta un USB y cuándo necesitas Wh, AC y carga solar.',
    h1: 'Power bank o estación de energía: qué necesitas en camping',
    lead: 'No compres una estación de 10 kg si solo cargas el móvil. Ni un power bank mínimo si llevas nevera 12V. Aquí el criterio es simple.',
    minutes: '8 min',
    guideId: 'energia-vs',
    sections: [
      {
        id: 'cuando-powerbank',
        h2: 'Cuándo basta un power bank',
        html: `<p>Rutas de 1–3 días cargando móvil, GPS y frontal USB. Busca <strong>20.000–30.000 mAh</strong> reales y salida USB-C PD.</p>`,
      },
      {
        id: 'cuando-estacion',
        h2: 'Cuándo tiene sentido una estación',
        html: `<p>Camping en coche, nevera portátil, portátil, luces LED de campamento o varios dispositivos a la vez. Mira <strong>Wh</strong>, no solo “amperios de marketing”.</p>
        <p class="mt-4">Guía completa: <a href="estaciones-energia.html">estaciones de energía portátiles</a>.</p>`,
      },
    ],
    faqs: [
      { q: '¿Puedo cargar la estación con panel solar?', a: 'Sí, si la estación acepta entrada solar y el panel entrega voltaje compatible. En días nublados la carga es lenta.' },
      { q: '¿Un power bank carga un portátil?', a: 'Solo si tiene USB-C PD de potencia suficiente (suele hacer falta 45–65 W o más).' },
    ],
    conclusion: 'Móvil/frontal → power bank. Nevera/varios aparatos → estación. Empieza por listar lo que enchufarás.',
    next: { href: 'estaciones-energia.html', label: 'Guía de estaciones de energía' },
  },
  {
    file: 'impermeabilidad-tienda-columna-agua.html',
    slug: 'impermeabilidad-tienda-columna-agua',
    image: 'guia-columna-agua-tienda.jpg',
    heroClass: 'tiendas',
    cat: 'Tiendas',
    catHref: 'tiendas.html',
    title: 'Mundo Camping | Columna de agua en tiendas: qué significa',
    description:
      'Qué significa la columna de agua (mm) en tiendas de campaña, qué valores bastan para lluvia y qué no te cuenta la ficha de Amazon.',
    h1: 'Columna de agua en tiendas de campaña: qué necesitas de verdad',
    lead: 'Los “mm” de impermeabilidad se malinterpretan. Te explicamos rangos útiles y por qué el montaje importa tanto como el número.',
    minutes: '7 min',
    guideId: 'columna-agua',
    sections: [
      {
        id: 'que-es',
        h2: 'Qué mide la columna de agua',
        html: `<p>Es la presión de agua que aguanta el tejido antes de filtrar. Más mm ≠ tienda mágica: costuras, tensado y condensación cuentan igual.</p>`,
      },
      {
        id: 'rangos',
        h2: 'Rangos orientativos',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li><strong>~1500–2000 mm:</strong> llovizna corta.</li>
          <li><strong>~3000 mm:</strong> lluvia normal de camping en España.</li>
          <li><strong>5000 mm+:</strong> margen alto; útil si el tiempo es muy inestable.</li>
        </ul>
        <p class="mt-4">Recuerda: flysheet tocando el interior = goteras “fantasma” aunque tengas 10000 mm.</p>`,
      },
    ],
    faqs: [
      { q: '¿El suelo necesita más mm que el techo?', a: 'Suele llevar más porque soporta presión al arrodillarte. Revisa ficha de suelo aparte.' },
      { q: '¿Sirve impregnar de nuevo el tejido?', a: 'Sí, con productos de reimpermeabilización cuando el agua deja de perlear.' },
    ],
    conclusion: 'Busca ~3000 mm + buen diseño y montaje. El número solo no salva una tienda mal tensada.',
    next: { href: 'como-montar-tienda-campana.html', label: 'Cómo montar la tienda bien' },
  },
  {
    file: 'peso-mochila-camping-cuanto-llevar.html',
    slug: 'peso-mochila-camping-cuanto-llevar',
    image: 'guia-peso-mochila.jpg',
    heroClass: 'accesorios',
    cat: 'Accesorios',
    catHref: 'accesorios.html',
    title: 'Mundo Camping | Peso de mochila de camping: cuánto llevar',
    description:
      'Cuánto debe pesar la mochila de camping: reglas prácticas por peso corporal, qué recortar y checklist de peso muerto.',
    h1: 'Peso de la mochila de camping: cuánto es razonable llevar',
    lead: 'Una regla orientativa y una lista de lo que más engorda la mochila sin aportar seguridad.',
    minutes: '7 min',
    guideId: 'peso-mochila',
    sections: [
      {
        id: 'regla',
        h2: 'Regla práctica',
        html: `<p>Para trekking de varios días, muchos guías usan el <strong>10–20% del peso corporal</strong> (sin agua). Principiantes: apunta al rango bajo y sube forma, no kilos.</p>`,
      },
      {
        id: 'recortes',
        h2: 'Dónde se va el peso',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Tienda demasiado grande para 1–2 personas.</li>
          <li>Saco “de invierno” en julio.</li>
          <li>Comida duplicada y latas.</li>
          <li>Ropa “por si acaso” que no usas.</li>
        </ul>
        <p class="mt-4">Checklist: <a href="mochila-camping-principiantes-checklist.html">qué llevar en la mochila</a>.</p>`,
      },
    ],
    faqs: [
      { q: '¿El agua cuenta en el porcentaje?', a: 'Cuenta en la espalda, pero se calcula aparte: planifica fuentes y no cargues 4 L “por miedo” si hay arroyos seguros.' },
      { q: '¿Ultraligero es obligatorio?', a: 'No. Primero seguridad y dormir bien; después optimizar gramos.' },
    ],
    conclusion: 'Fija un techo de peso, pesa la mochila en casa y corta lujo antes que seguridad (luz, abrigo, agua).',
    next: { href: 'checklist-primera-acampada.html', label: 'Checklist primera acampada' },
  },
  {
    file: 'camping-con-ninos-equipo-basico.html',
    slug: 'camping-con-ninos-equipo-basico',
    image: 'guia-camping-ninos.jpg',
    heroClass: 'tiendas',
    cat: 'Familia',
    catHref: 'top-5-tiendas-familia.html',
    title: 'Mundo Camping | Camping con niños: equipo básico',
    description:
      'Equipo básico para acampar con niños: tienda, dormir, luz, seguridad y lo que sí / no merece la pena comprar.',
    h1: 'Camping con niños: equipo básico que sí compensa',
    lead: 'Con niños gana el confort y la rutina. Menos gadgets, más espacio, luz y un plan B si llueve.',
    minutes: '9 min',
    guideId: 'camping-ninos',
    sections: [
      {
        id: 'prioridad',
        h2: 'Prioridades (en este orden)',
        html: `<ol class="list-decimal space-y-2 pl-5 text-white/80">
          <li>Tienda con espacio real (a menudo 3–4P para familia pequeña).</li>
          <li>Sacos o sistemas de dormir según temperatura.</li>
          <li>Luz de campamento + frontal para cada adulto.</li>
          <li>Cocina simple y agua.</li>
          <li>Botiquín y capas de ropa.</li>
        </ol>
        <p class="mt-4">Comparativa: <a href="top-5-tiendas-familia.html">tiendas para familia</a>.</p>`,
      },
      {
        id: 'evitar',
        h2: 'Qué puedes dejar en casa la primera vez',
        html: `<p>Juguetes voluminosos, cocina gourmet, decoración de “glamping” barato que no aguanta viento. Mejor una mesa plegable estable y buenos sacos.</p>`,
      },
    ],
    faqs: [
      { q: '¿Mejor camping con servicios o salvaje?', a: 'Con niños pequeños, camping con baño cerca reduce estrés. El salvaje puede esperar.' },
      { q: '¿Una tienda familiar es imprescindible?', a: 'No, pero dos tiendas 2P o una 4P suelen funcionar mejor que una 2P justa.' },
    ],
    conclusion: 'Espacio + dormir + luz. Con eso la primera acampada familiar suele salir bien.',
    next: { href: 'top-5-tiendas-familia.html', label: 'Top tiendas familia' },
  },
  {
    file: 'errores-comprar-tienda-amazon.html',
    slug: 'errores-comprar-tienda-amazon',
    image: 'guia-errores-amazon-tienda.jpg',
    heroClass: 'tiendas',
    cat: 'Tiendas',
    catHref: 'tiendas.html',
    title: 'Mundo Camping | Errores al comprar tienda de campaña en Amazon',
    description:
      'Errores frecuentes al comprar tienda de campaña en Amazon: estrellas engañosas, peso falso, impermeabilidad y cómo leer reseñas.',
    h1: 'Errores al comprar una tienda de campaña en Amazon',
    lead: 'Amazon es útil si sabes filtrar. Estos son los fallos que más dinero y noches malas generan.',
    minutes: '8 min',
    guideId: 'errores-amazon-tienda',
    sections: [
      {
        id: 'estrellas',
        h2: 'No compres solo por estrellas',
        html: `<p>Ordena reseñas por <strong>críticas con fotos</strong> en lluvia y viento. Una media 4,5 con quejas de goteras es una señal.</p>`,
      },
      {
        id: 'ficha',
        h2: 'Datos que debes verificar',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Peso total del paquete (no “peso de la tela”).</li>
          <li>Medidas interiores reales.</li>
          <li>Temporada (3 vs 4 estaciones).</li>
          <li>Qué incluye: piquetas, vientos, footprint.</li>
        </ul>
        <p class="mt-4">Luego contrasta con <a href="top-5-tiendas-parejas.html">nuestra comparativa</a>.</p>`,
      },
    ],
    faqs: [
      { q: '¿Las marcas blancas sirven?', a: 'Algunas sí para uso ocasional. Exige devolución fácil y prueba el montaje en casa al recibirla.' },
      { q: '¿Cuándo desconfiar del precio?', a: 'Si promete ultraligero + 4 estaciones + doble techo a precio de outlet sin marca conocida, lee con lupa.' },
    ],
    conclusion: 'Filtra por uso, verifica peso y lluvia en reseñas, y apoya la decisión en comparativas independientes.',
    next: { href: 'tiendas.html', label: 'Ver tiendas recomendadas' },
  },
  {
    file: 'frontal-camping-cuantos-lumenes.html',
    slug: 'frontal-camping-cuantos-lumenes',
    image: 'guia-frontal-lumenes.jpg',
    heroClass: 'linternas',
    cat: 'Iluminación',
    catHref: 'iluminacion/',
    title: 'Mundo Camping | Frontal de camping: cuántos lúmenes necesitas',
    description:
      'Cuántos lúmenes necesita un frontal de camping: rangos para campamento, trekking y errores al mirar solo el número máximo.',
    h1: 'Frontal de camping: cuántos lúmenes necesitas de verdad',
    lead: 'El lumen de marketing es el modo turbo de 30 segundos. Te damos rangos útiles y qué mirar además del número.',
    minutes: '7 min',
    guideId: 'lumenes-frontal',
    sections: [
      {
        id: 'rangos',
        h2: 'Rangos prácticos',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li><strong>100–200 lm:</strong> campamento y tareas cercanas.</li>
          <li><strong>200–400 lm:</strong> trekking nocturno habitual.</li>
          <li><strong>500+ lm:</strong> útil a ratos; mira autonomía real.</li>
        </ul>
        <p class="mt-4">Complemento: <a href="farol-vs-frontal-camping.html">farol vs frontal</a> y <a href="linternas-cual-comprar.html">linternas: cuál comprar</a>.</p>`,
      },
      {
        id: 'mas',
        h2: 'Más importante que el máximo de lúmenes',
        html: `<p>Autonomía en modo medio, comodidad de la cinta, resistencia al agua (IPX) y si admite USB-C o pilas AAA en emergencia.</p>`,
      },
    ],
    faqs: [
      { q: '¿Un frontal sustituye al farol?', a: 'No del todo. El farol ilumina el espacio común sin deslumbrar; el frontal es para moverte.' },
      { q: '¿Merece la pena el modo rojo?', a: 'Sí: menos molestia nocturna en tienda compartida y mejor visión nocturna.' },
    ],
    conclusion: 'Compra por autonomía en modo medio, no por el pico de lúmenes del anuncio.',
    next: { href: 'iluminacion/', label: 'Catálogo de iluminación' },
  },
  {
    file: 'esterilla-inflable-vs-espuma.html',
    slug: 'esterilla-inflable-vs-espuma',
    image: 'guia-esterilla-inflable-espuma.jpg',
    heroClass: 'esterillas',
    cat: 'Esterillas',
    catHref: 'esterillas.html',
    title: 'Mundo Camping | Esterilla inflable vs espuma: cuál elegir',
    description:
      'Esterilla inflable o de espuma para camping: confort, R-Value, peso, fiabilidad y cuándo combinar las dos.',
    h1: 'Esterilla inflable vs espuma: cuál te conviene',
    lead: 'Una es más cómoda y compacta; la otra es a prueba de pinchazos. La mejor respuesta a veces es usar ambas.',
    minutes: '8 min',
    guideId: 'esterilla-vs',
    sections: [
      {
        id: 'comparativa',
        h2: 'Comparativa rápida',
        html: `<div class="overflow-x-auto"><table class="w-full text-left text-sm text-white/85">
          <thead><tr class="border-b border-white/15 text-emerald-200"><th class="py-2 pr-3">Aspecto</th><th class="py-2 pr-3">Inflable</th><th class="py-2">Espuma</th></tr></thead>
          <tbody>
            <tr class="border-b border-white/8"><td class="py-2 pr-3">Confort</td><td class="py-2 pr-3">Alto</td><td class="py-2">Medio</td></tr>
            <tr class="border-b border-white/8"><td class="py-2 pr-3">Fiabilidad</td><td class="py-2 pr-3">Pinchazos posibles</td><td class="py-2">Casi indestructible</td></tr>
            <tr class="border-b border-white/8"><td class="py-2 pr-3">Volumen</td><td class="py-2 pr-3">Muy bajo</td><td class="py-2">Voluminosa</td></tr>
            <tr class="border-b border-white/8"><td class="py-2 pr-3">R-Value</td><td class="py-2 pr-3">Variable (mira ficha)</td><td class="py-2">Suele ser moderado</td></tr>
          </tbody></table></div>
        <p class="mt-4">Guía R-Value: <a href="esterilla-r-value-que-necesitas.html">qué R necesitas</a>.</p>`,
      },
      {
        id: 'combo',
        h2: 'El combo inteligente',
        html: `<p>Espuma fina debajo + inflable encima: más aislamiento, protección antipinchazos y plan B si falla la válvula.</p>`,
      },
    ],
    faqs: [
      { q: '¿La inflable se enfría más?', a: 'Si tiene poco R-Value, sí: el aire no aísla solo. Elige R adecuado a la estación.' },
      { q: '¿Espuma basta para todo?', a: 'Para verano y presupuestos justos, sí. En frío o para dormir muchas noches, la inflable gana confort.' },
    ],
    conclusion: 'Verano/ocasional → espuma. Confort y mochila → inflable. Frío serio → combo o R alto.',
    next: { href: 'top-5-esterillas.html', label: 'Top 5 esterillas' },
  },
  {
    file: 'kit-cocina-camping-principiantes.html',
    slug: 'kit-cocina-camping-principiantes',
    image: 'guia-kit-cocina-camping.jpg',
    heroClass: 'accesorios',
    cat: 'Cocina',
    catHref: 'cocina.html',
    title: 'Mundo Camping | Kit de cocina para camping: principiantes',
    description:
      'Kit de cocina de camping para principiantes: hornillo, combustible, ollas y lo imprescindible sin sobrecargar la mochila.',
    h1: 'Kit de cocina para camping (principiantes): lo imprescindible',
    lead: 'Con cuatro piezas bien elegidas comes caliente sin convertir la acampada en un mudanza.',
    minutes: '7 min',
    guideId: 'cocina-kit',
    sections: [
      {
        id: 'kit',
        h2: 'Kit mínimo que funciona',
        html: `<ul class="list-disc space-y-2 pl-5 text-white/80">
          <li>Hornillo de cartucho o gas compatible.</li>
          <li>Olla/tetera 750 ml–1 L.</li>
          <li>Cubiertos + plato/vaso ligeros.</li>
          <li>Encendedor + respaldo (cerillas estancas).</li>
          <li>Paño y bolsa basura.</li>
        </ul>
        <p class="mt-4">Catálogo: <a href="cocina.html">cocina de camping</a>.</p>`,
      },
      {
        id: 'seguridad',
        h2: 'Seguridad básica',
        html: `<p>Nunca cocines dentro de la tienda. Viento: usa pantalla o coloca el hornillo a resguardo. Cierra el gas al terminar.</p>`,
      },
    ],
    faqs: [
      { q: '¿Alcohol o gas?', a: 'Gas cartucho es más simple para principiantes. Alcohol pesa menos en algunos setups ultraligeros, pero es más lento.' },
      { q: '¿Necesito nevera?', a: 'No en rutas cortas. En camping con coche, una nevera 12V cambia la experiencia familiar.' },
    ],
    conclusion: 'Hornillo + olla + fuego seguro. Amplía solo cuando ya sepas qué echas en falta en la segunda salida.',
    next: { href: 'cocina.html', label: 'Ver cocina y menaje' },
  },
];

const DESTINOS_SEO = [
  { id: 'torres-del-paine', file: 'acampar-torres-del-paine.html', name: 'Torres del Paine', country: 'Chile', image: 'destinos/destino-torres-del-paine.jpg', why: 'Granito, lagos turquesa y el trekking W: camping de montaña de nivel mundial.', tips: ['Reserva camping con antelación (nov–mar).', 'Lleva capas: el viento patagónico castiga.', 'Esterilla con buen R-Value.'] },
  { id: 'yosemite', file: 'acampar-yosemite.html', name: 'Yosemite', country: 'EE. UU.', image: 'destinos/destino-yosemite.jpg', why: 'Valle icónico, cascadas y granito: el camping de parque nacional americano por excelencia.', tips: ['Reserva campings del valle con meses.', 'Guarda comida frente a osos.', 'Llega temprano en temporada alta.'] },
  { id: 'banff', file: 'acampar-banff.html', name: 'Banff', country: 'Canadá', image: 'destinos/destino-banff.jpg', why: 'Lagos esmeralda y Rockies: paisaje de postal con infraestructura de parque nacional.', tips: ['Bear-proof lockers obligatorios.', 'Noches frías incluso en verano.', 'Permisos y reglas del parque.'] },
  { id: 'lofoten', file: 'acampar-lofoten.html', name: 'Lofoten', country: 'Noruega', image: 'destinos/destino-lofoten.jpg', why: 'Picos sobre el mar y luz árctica: camping escénico extremo en verano.', tips: ['Tienda resistente al viento.', 'Respeta normas de acampada libre.', 'Mosquitos en zonas húmedas.'] },
  { id: 'landmannalaugar', file: 'acampar-landmannalaugar.html', name: 'Landmannalaugar', country: 'Islandia', image: 'destinos/destino-landmannalaugar.jpg', why: 'Riolita de colores y termas: un paisaje lunar para acampar en verano.', tips: ['Acceso 4×4 o bus highland.', 'Solo temporada estival.', 'Viento y frío aunque sea julio.'] },
  { id: 'picos-europa', file: 'acampar-picos-europa.html', name: 'Picos de Europa', country: 'España', image: 'destinos/destino-picos-europa.jpg', why: 'El gran icono de montaña español: lagos, caliza y pueblos con encanto.', tips: ['Respeta zonas reguladas.', 'Hay excelentes campings de valle.', 'Otoño: noches frías.'] },
  { id: 'merzouga', file: 'acampar-merzouga.html', name: 'Merzouga', country: 'Marruecos', image: 'destinos/destino-merzouga.jpg', why: 'Dunas Erg Chebbi: el desierto fotogénico del Magreb para noches estrelladas.', tips: ['Noches frías en el desierto.', 'Contrata camp con buena reputación.', 'Protección solar extrema de día.'] },
  { id: 'wadi-rum', file: 'acampar-wadi-rum.html', name: 'Wadi Rum', country: 'Jordania', image: 'destinos/destino-wadi-rum.jpg', why: 'Desierto de arenisca y campamentos beduinos: paisaje de otro planeta.', tips: ['Combina con Petra.', 'Camps fijos son cómodos.', 'Lleva linterna frontal.'] },
  { id: 'moab', file: 'acampar-moab.html', name: 'Moab', country: 'EE. UU.', image: 'destinos/destino-moab.jpg', why: 'Roca roja, Arches y Canyonlands: el desierto americano más adictivo.', tips: ['Agua en abundancia.', 'Calor diurno intenso.', 'Reserva en temporada alta.'] },
  { id: 'fiordland', file: 'acampar-fiordland.html', name: 'Fiordland', country: 'Nueva Zelanda', image: 'destinos/destino-fiordland.jpg', why: 'Fiordos y bosques milenarios: camping salvaje y muy húmedo del hemisferio sur.', tips: ['Impermeable de verdad.', 'Saco con margen de frío.', 'Expectativa: lluvia frecuente.'] },
];

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function articleHtml(g) {
  const img = `./assets/${g.image}`;
  const imgAbs = `${SITE}/assets/${g.image}`;
  const tocItems = [
    ...g.sections.map((s) => ({ type: 'section', icon: 'intro', title: s.h2, href: `#${s.id}` })),
    { type: 'section', icon: 'faq', title: 'Preguntas frecuentes', href: '#faq' },
    { type: 'section', icon: 'conclusion', title: 'Conclusión', href: '#conclusion' },
  ];
  const sectionsHtml = g.sections
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
  const faqsHtml = g.faqs
    .map(
      (f) => `
                  <details>
                    <summary>${esc(f.q)}</summary>
                    <p>${esc(f.a)}</p>
                  </details>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="es" data-site-root=".">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./css/tailwind-built.css" />
    <link rel="stylesheet" href="./css/fonts.css" />
    <meta name="description" content="${esc(g.description)}" />
    <title>${esc(g.title)}</title>
    <link rel="canonical" href="${SITE}/${g.slug}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Mundo Camping" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="${esc(g.title)}" />
    <meta property="og:description" content="${esc(g.description)}" />
    <meta property="og:url" content="${SITE}/${g.slug}" />
    <meta property="og:image" content="${imgAbs}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(g.title)}" />
    <meta name="twitter:description" content="${esc(g.description)}" />
    <meta name="twitter:image" content="${imgAbs}" />
    <meta name="author" content="Mundo Camping" />
    <meta property="article:modified_time" content="${TODAY}" />
    <link rel="stylesheet" href="./mundo-camping.css" />
    <link rel="stylesheet" href="./site-header.css?v=7" />
    <link rel="stylesheet" href="./footer-premium.css" />
    <link rel="stylesheet" href="./styles-guias.css" />
    <style>
      .article-page-hero--${g.heroClass} {
        background-image:
          linear-gradient(180deg, rgba(2, 4, 3, 0.25) 0%, rgba(2, 4, 3, 0.55) 48%, rgba(2, 4, 3, 0.97) 100%),
          url('${img}');
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
    </style>
    <script type="application/ld+json">${JSON.stringify(faqSchema(g.faqs))}</script>
  </head>
  <body class="min-h-screen bg-[#020403] font-sans text-white antialiased">
    <header id="site-header"></header>
    <main>
      <article itemscope itemtype="https://schema.org/Article">
        <header class="article-page-hero article-page-hero--${g.heroClass} relative isolate flex items-end overflow-hidden">
          <div class="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-[#020403] via-[#020403]/72 to-transparent"></div>
          <div class="container-premium pb-12 pt-28 sm:pb-16 lg:pb-20">
            <div class="max-w-3xl">
              <nav class="mb-6 text-sm text-white/65" aria-label="Migas de pan">
                <a href="index.html" class="hover:text-[#deff9a]">Guías Destacadas</a>
                <span class="mx-2 text-white/30">/</span>
                <a href="blog.html" class="hover:text-[#deff9a]">Blog</a>
                <span class="mx-2 text-white/30">/</span>
                <a href="${g.catHref}" class="hover:text-[#deff9a]">${esc(g.cat)}</a>
              </nav>
              <p class="text-sm font-black uppercase tracking-[0.3em] text-emerald-300">Guía práctica · ${esc(g.cat)}</p>
              <h1 class="mt-5 font-editorial text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl" itemprop="headline">${esc(g.h1)}</h1>
              <p class="article-lead article-hero-lead max-w-2xl" itemprop="description">${esc(g.lead)}</p>
              <div class="article-meta-row">
                <span>Actualizado julio 2026</span>
                <span aria-hidden="true">•</span>
                <span>${esc(g.minutes)}</span>
                <span aria-hidden="true">•</span>
                <span>Guía editorial</span>
              </div>
              <p class="article-byline">Por <a href="sobre-mi.html" rel="author">Mundo Camping</a> · Experiencia real en campo</p>
            </div>
          </div>
        </header>
        <div class="container-premium pb-20 pt-10 lg:pt-14">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
            <div class="min-w-0 space-y-12">
              <nav id="article-toc" class="article-toc" aria-labelledby="toc-title"></nav>
              ${sectionsHtml}
              <section id="faq" class="article-section article-faq" aria-labelledby="faq-title">
                <h2 id="faq-title" class="font-editorial text-2xl font-black text-white sm:text-3xl">Preguntas frecuentes</h2>
                <div class="mt-5">${faqsHtml}</div>
              </section>
              <section id="conclusion" class="article-section">
                <h2 class="font-editorial text-2xl font-black text-white sm:text-3xl">Conclusión</h2>
                <p class="mt-5 text-base leading-7 text-white/80">${esc(g.conclusion)}</p>
                <p class="mt-4 text-base leading-7 text-white/80">
                  Siguiente lectura:
                  <a href="${g.next.href}">${esc(g.next.label)}</a>
                  · <a href="blog.html">Más guías del blog</a>
                  · <a href="mejores-sitios-acampar.html">Mejores destinos para acampar</a>
                </p>
                <p class="mt-6">
                  <a href="${g.catHref}" class="cta-button-highlight inline-flex rounded-xl px-5 py-3 text-sm font-bold">Ver productos / categoría</a>
                </p>
              </section>
            </div>
            <aside class="article-sidebar">
              <div class="article-sidebar-widgets" data-guide-id="${g.guideId}"></div>
            </aside>
          </div>
        </div>
      </article>
    </main>
    <footer id="site-footer"></footer>
    <script defer src="./js/site-header.js?v=7"></script>
    <script defer src="./js/site-footer.js"></script>
    <script defer src="./js/article-toc.js"></script>
    <script defer src="./js/article-sidebar.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        if (window.ArticleToc) {
          ArticleToc.render({
            containerId: 'article-toc',
            numbered: false,
            items: ${JSON.stringify(tocItems)},
          });
        }
        if (window.ArticleSidebar) ArticleSidebar.init();
      });
    </script>
  </body>
</html>
`;
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
    <meta name="description" content="Acampar en ${esc(d.name)} (${esc(d.country)}): por qué es uno de los mejores destinos del mundo, consejos prácticos y equipo recomendado." />
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
              <div class="article-meta-row">
                <span>Actualizado julio 2026</span>
                <span aria-hidden="true">•</span>
                <span>Guía de destino</span>
              </div>
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
              <h2 class="font-editorial text-2xl font-black text-white">Equipo recomendado para este viaje</h2>
              <p class="mt-4">Según clima y estilo de ruta, revisa:</p>
              <p class="mt-4 flex flex-wrap gap-3">
                <a href="tiendas.html" class="cta-button-highlight inline-flex rounded-xl px-5 py-3 text-sm font-bold">Tiendas</a>
                <a href="sacos.html" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Sacos</a>
                <a href="esterillas.html" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Esterillas</a>
                <a href="iluminacion/" class="inline-flex rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white/90 hover:text-[#deff9a]">Iluminación</a>
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

// Generate guides + destinos
for (const g of GUIDES) {
  fs.writeFileSync(path.join(root, g.file), articleHtml(g), 'utf8');
  console.log('Guía', g.file);
}
for (const d of DESTINOS_SEO) {
  fs.writeFileSync(path.join(root, d.file), destinoHtml(d), 'utf8');
  console.log('Destino', d.file);
}

// Patch destinos data with page links
const dataPath = path.join(root, 'js', 'destinos-camping-data.js');
let dataJs = fs.readFileSync(dataPath, 'utf8');
for (const d of DESTINOS_SEO) {
  const needle = `id: '${d.id}',`;
  if (dataJs.includes(needle) && !dataJs.includes(`page: '${d.file}'`)) {
    dataJs = dataJs.replace(needle, `id: '${d.id}',\n    page: '${d.file}',`);
  }
}
fs.writeFileSync(dataPath, dataJs, 'utf8');

// Update sitemap: append new URLs if missing
const smPath = path.join(root, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8');
const newUrls = [
  ...GUIDES.map((g) => g.slug),
  ...DESTINOS_SEO.map((d) => d.file.replace(/\.html$/, '')),
];
for (const slug of newUrls) {
  const loc = `${SITE}/${slug}`;
  if (!sm.includes(loc)) {
    sm = sm.replace(
      '</urlset>',
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n</urlset>`
    );
  }
}
fs.writeFileSync(smPath, sm, 'utf8');
console.log('Sitemap actualizado');

// Append cards to blog stack (before closing blog-featured-stack)
const blogPath = path.join(root, 'blog.html');
let blog = fs.readFileSync(blogPath, 'utf8');
if (!blog.includes('mejor-tienda-camping-2-personas.html')) {
  const cards = GUIDES.map(
    (g) =>
      `                <a href="${g.file}" class="guide-featured-card"><div class="guide-featured-card__media"><img src="./assets/${g.image}" alt="${esc(g.h1)}" width="400" height="300" loading="lazy" decoding="async" /></div><div class="guide-featured-card__body"><h2 class="guide-featured-card__title">${esc(g.h1)}</h2><p class="guide-featured-card__desc">${esc(g.lead)}</p><span class="guide-featured-card__cta cta-button-highlight">Leer guía<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></div></a>`
  ).join('\n');
  blog = blog.replace(
    '              </div>\n\n              <section class="home-faq article-faq" id="blog-catalogo"',
    `${cards}\n              </div>\n\n              <section class="home-faq article-faq" id="blog-catalogo"`
  );
  fs.writeFileSync(blogPath, blog, 'utf8');
  console.log('Blog actualizado con 10 guías');
}

console.log('OK — SEO push generado');
