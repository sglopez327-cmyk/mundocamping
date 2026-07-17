import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const PUBLIC_PAGES = [
  'index.html',
  'tiendas.html',
  'sacos.html',
  'esterillas.html',
  'baterias.html',
  'herramientas.html',
  'accesorios.html',
  'cocina.html',
  'iluminacion/index.html',
  'top-5-sacos-dormir.html',
  'top-5-esterillas.html',
  'top-5-tiendas-familia.html',
  'top-5-tiendas-parejas.html',
  'multiherramientas.html',
  'linternas-cual-comprar.html',
  'estaciones-energia.html',
  'accesorios-marcan-diferencia.html',
  'esterilla-r-value-que-necesitas.html',
  'saco-dormir-verano-vs-invierno.html',
  'farol-vs-frontal-camping.html',
  'checklist-primera-acampada.html',
  'sobre-mi.html',
  'contacto.html',
  'privacidad.html',
  'aviso-legal.html',
  'resultados.html',
];

const PERFORMANCE_HEAD = (prefix) => `    <link rel="stylesheet" href="${prefix}css/tailwind-built.css" />
    <link rel="stylesheet" href="${prefix}css/fonts.css" />`;

function stripLegacyHead(content) {
  content = content.replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"[^>]*>\s*/g, '\n');
  content = content.replace(
    /\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/g,
    '\n'
  );
  content = content.replace(
    /\s*<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"[^>]*>\s*/g,
    '\n'
  );
  content = content.replace(/\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/g, '\n');
  content = content.replace(/\s*<script>\s*tailwind\.config[\s\S]*?<\/script>\s*/g, '\n');
  content = content.replace(
    /\s*<script\s+async\s+src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"]*"[^>]*><\/script>\s*/g,
    '\n'
  );
  return content;
}

function injectPerformanceCss(content, prefix) {
  if (content.includes('css/tailwind-built.css')) {
    return content;
  }
  const block = PERFORMANCE_HEAD(prefix);
  const iconMatch = content.match(/<link rel="icon"[^>]*>\s*/);
  if (iconMatch) {
    return content.replace(iconMatch[0], iconMatch[0] + block + '\n');
  }
  const viewportMatch = content.match(/<meta name="viewport"[^>]*>\s*/);
  if (viewportMatch) {
    return content.replace(viewportMatch[0], viewportMatch[0] + '\n' + block + '\n');
  }
  return content.replace('<head>', '<head>\n' + block);
}

function removeHeaderScript(content) {
  return content.replace(/\s*<script src="(\.\/|\.\.\/)js\/site-header\.js"><\/script>\s*/g, '\n');
}

function deferLocalScripts(content) {
  return content.replace(/<script src="(\.\/|\.\.\/)(js\/[^"]+)"><\/script>/g, (match, prefix, src) => {
    if (match.includes(' defer')) {
      return match;
    }
    return `<script defer src="${prefix}${src}"></script>`;
  });
}

function injectBottomScripts(content, prefix) {
  const headerScript = `    <script defer src="${prefix}js/site-header.js"></script>\n`;
  const adsenseScript = `    <script defer src="${prefix}js/load-adsense.js"></script>\n`;

  if (content.includes('js/load-adsense.js')) {
    if (!content.includes('js/site-header.js')) {
      content = content.replace(/(\s*<footer id="site-footer"><\/footer>\s*)/, `$1\n${headerScript}`);
    }
    return content;
  }

  const injection = headerScript + adsenseScript;
  if (content.includes('<footer id="site-footer"></footer>')) {
    return content.replace(/(\s*<footer id="site-footer"><\/footer>\s*)/, `$1\n${injection}`);
  }
  return content.replace(/\s*<\/body>/, `\n${injection}  </body>`);
}

for (const relativePath of PUBLIC_PAGES) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) {
    console.warn('Skip missing:', relativePath);
    continue;
  }

  const prefix = relativePath.includes('/') ? '../' : './';
  let content = fs.readFileSync(filePath, 'utf8');
  content = stripLegacyHead(content);
  content = injectPerformanceCss(content, prefix);
  content = removeHeaderScript(content);
  content = deferLocalScripts(content);
  content = injectBottomScripts(content, prefix);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched:', relativePath);
}

console.log('Done patching HTML for Level 2 performance.');
