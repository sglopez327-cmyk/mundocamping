import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

let html = fs.readFileSync(path.join(root, 'herramientas.html'), 'utf8');
const v2Svg = fs.readFileSync(path.join(root, 'herramientas-hero-scene-v2.svg'), 'utf8');

if (!html.includes('herramientas-animation-v2.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="./herramientas-animation.css" />',
    '<link rel="stylesheet" href="./herramientas-animation.css" />\n    <link rel="stylesheet" href="./herramientas-animation-v2.css" />'
  );
}

html = html.replace(
  'class="herr-scene herr-scene--hero -mt-2',
  'class="herr-scene herr-scene--hero herr-scene--v2 -mt-2'
);

const indentedSvg = v2Svg
  .trim()
  .split('\n')
  .map((line) => `              ${line}`)
  .join('\n');

html = html.replace(/<svg class="herr-scene__svg"[\s\S]*?<\/svg>/, indentedSvg);

fs.writeFileSync(path.join(root, 'herramientas.html'), html, 'utf8');
fs.copyFileSync(
  path.join(root, 'herramientas-hero-scene-v2.svg'),
  path.join(root, 'herramientas-hero-scene.svg')
);

console.log('herramientas.html actualizado con animación v2.');
