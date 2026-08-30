/**
 * Actualiza fichas acampar-*.html al modelo turismo (sin e-commerce).
 * node scripts/migrate-destino-fichas.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = fs.readdirSync(root).filter((f) => f.startsWith('acampar-') && f.endsWith('.html'));

const equipmentBlock =
  /<section>\s*<h2[^>]*>Equipo recomendado[\s\S]*?<\/section>\s*/g;

const newExploreBlock = `
            <section>
              <h2 class="font-editorial text-2xl font-black text-white">Planifica la escapada</h2>
              <p class="mt-4">Combina este destino con rutas de senderismo, pozas cercanas y el mapa de campings:</p>
              <p class="mt-4 flex flex-wrap gap-3">
                <a href="campings.html" class="tourism-btn tourism-btn--primary inline-flex text-sm">Mapa de campings</a>
                <a href="naturaleza.html" class="tourism-btn tourism-btn--ghost inline-flex text-sm">Naturaleza</a>
                <a href="rutas.html" class="tourism-btn tourism-btn--ghost inline-flex text-sm">Rutas</a>
              </p>
            </section>
`;

for (const file of files) {
  let html = fs.readFileSync(path.join(root, file), 'utf8');

  html = html.replace(/<article(\s|>)/, '<article data-cross-type="camping"$1');
  if (!html.includes('data-cross-type')) {
    html = html.replace('<article itemscope', '<article data-cross-type="camping" itemscope');
  }

  html = html.replace(/mejores-sitios-acampar\.html/g, 'campings.html');
  html = html.replace(/>Destinos</g, '>Campings<');
  html = html.replace(equipmentBlock, newExploreBlock);

  html = html.replace(/Guía de destino/g, 'Ficha de camping');
  html = html.replace(/mejores sitios del mundo para acampar/g, 'directorio de campings');
  html = html.replace(/← Volver al mapa de destinos/g, '← Volver al mapa de campings');

  html = html.replace(/site-header\.js\?v=\d+/g, 'site-header.js?v=11');
  html = html.replace(/site-header\.css\?v=\d+/g, 'site-header.css?v=11');
  html = html.replace(/\s*<script defer src="\.\/js\/load-adsense\.js"><\/script>\s*/g, '\n');

  if (!html.includes('home-tourism.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="./styles-guias.css" />',
      '<link rel="stylesheet" href="./styles-guias.css" />\n    <link rel="stylesheet" href="./css/home-tourism.css" />'
    );
  }

  fs.writeFileSync(path.join(root, file), html, 'utf8');
  console.log('OK', file);
}

console.log('Done', files.length, 'files');
