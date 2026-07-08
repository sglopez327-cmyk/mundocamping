import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pagePath = path.join(root, 'iluminacion', 'index.html');

let html = fs.readFileSync(pagePath, 'utf8');
const v2Svg = fs.readFileSync(path.join(root, 'iluminacion-hero-scene-v2.svg'), 'utf8');

if (!html.includes('iluminacion-animation-v2.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../iluminacion-animation.css" />',
    '<link rel="stylesheet" href="../iluminacion-animation.css" />\n    <link rel="stylesheet" href="../iluminacion-animation-v2.css" />'
  );
}

html = html.replace(
  'class="il3-scene il3-scene--hero -mt-2',
  'class="il4-scene il4-scene--hero -mt-2'
);

html = html.replaceAll('il3-scene__glow', 'il4-scene__glow');

html = html.replace(
  'aria-label="Familia caminando de noche hacia una cueva; el padre enciende la linterna, un oso se alza y todos corren hacia la tienda"',
  'aria-label="Familia que ilumina una cueva con linterna, descubre un monstruo y huye a refugiarse en la tienda"'
);

const indentedSvg = v2Svg
  .trim()
  .split('\n')
  .map((line) => `              ${line}`)
  .join('\n');

html = html.replace(/<svg class="il3-scene__svg"[\s\S]*?<\/svg>/, indentedSvg);

fs.writeFileSync(pagePath, html, 'utf8');

fs.copyFileSync(
  path.join(root, 'iluminacion-hero-scene-v2.svg'),
  path.join(root, 'assets', 'iluminacion-hero-scene.svg')
);

console.log('iluminacion/index.html actualizado con animación v2.');
