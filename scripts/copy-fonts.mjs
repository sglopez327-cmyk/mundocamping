import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const fontsDir = path.join(root, 'fonts');
const cssDir = path.join(root, 'css');

const fontFiles = [
  ['@fontsource/inter/files/inter-latin-400-normal.woff2', 'inter-latin-400-normal.woff2', 'Inter', 400],
  ['@fontsource/inter/files/inter-latin-500-normal.woff2', 'inter-latin-500-normal.woff2', 'Inter', 500],
  ['@fontsource/inter/files/inter-latin-600-normal.woff2', 'inter-latin-600-normal.woff2', 'Inter', 600],
  ['@fontsource/inter/files/inter-latin-700-normal.woff2', 'inter-latin-700-normal.woff2', 'Inter', 700],
  ['@fontsource/inter/files/inter-latin-800-normal.woff2', 'inter-latin-800-normal.woff2', 'Inter', 800],
  ['@fontsource/inter/files/inter-latin-900-normal.woff2', 'inter-latin-900-normal.woff2', 'Inter', 900],
  [
    '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2',
    'plus-jakarta-sans-latin-700-normal.woff2',
    'Plus Jakarta Sans',
    700,
  ],
  [
    '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2',
    'plus-jakarta-sans-latin-800-normal.woff2',
    'Plus Jakarta Sans',
    800,
  ],
  [
    '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2',
    'plus-jakarta-sans-latin-900-normal.woff2',
    'Plus Jakarta Sans',
    900,
  ],
  [
    '@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff2',
    'playfair-display-latin-700-normal.woff2',
    'Playfair Display',
    700,
  ],
  [
    '@fontsource/playfair-display/files/playfair-display-latin-800-normal.woff2',
    'playfair-display-latin-800-normal.woff2',
    'Playfair Display',
    800,
  ],
  [
    '@fontsource/playfair-display/files/playfair-display-latin-900-normal.woff2',
    'playfair-display-latin-900-normal.woff2',
    'Playfair Display',
    900,
  ],
];

fs.mkdirSync(fontsDir, { recursive: true });
fs.mkdirSync(cssDir, { recursive: true });

const faces = [];

for (const [pkgPath, fileName, family, weight] of fontFiles) {
  const src = path.join(root, 'node_modules', pkgPath);
  const dest = path.join(fontsDir, fileName);
  if (!fs.existsSync(src)) {
    console.warn('Font missing (run npm install):', pkgPath);
    continue;
  }
  fs.copyFileSync(src, dest);
  faces.push(
    `@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:${weight};src:url('../fonts/${fileName}') format('woff2');}`
  );
}

fs.writeFileSync(path.join(cssDir, 'fonts.css'), faces.join('\n') + '\n', 'utf8');
console.log('Copied', faces.length, 'font files → fonts/ + css/fonts.css');
