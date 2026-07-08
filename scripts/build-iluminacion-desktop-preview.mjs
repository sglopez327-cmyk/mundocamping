import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const desktop = path.join(process.env.USERPROFILE || '', 'Desktop');

const css = fs.readFileSync(path.join(root, 'iluminacion-animation-v2.css'), 'utf8');
const svg = fs.readFileSync(path.join(root, 'iluminacion-hero-scene-v2.svg'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Animación Iluminación — vista previa | Mundo Camping</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        color: #fff;
        background: #020403;
        -webkit-font-smoothing: antialiased;
      }
      .preview-banner {
        position: sticky;
        top: 0;
        z-index: 20;
        padding: 0.85rem 1.25rem;
        border-bottom: 1px solid rgba(251, 191, 36, 0.25);
        background: rgba(2, 4, 3, 0.94);
        backdrop-filter: blur(12px);
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.55;
        color: rgba(255, 255, 255, 0.82);
      }
      .preview-banner strong { color: #fde68a; }
      .container {
        width: 100%;
        max-width: 56rem;
        margin: 0 auto;
        padding: 1.5rem 1rem 3rem;
      }
      @media (min-width: 640px) { .container { padding-inline: 1.5rem; } }
      .scene-wrap {
        margin-top: 1.5rem;
        border: 1px solid rgba(251, 191, 36, 0.3);
        border-radius: 1.15rem;
        overflow: hidden;
        box-shadow: 0 0 40px rgba(251, 191, 36, 0.08);
      }
      .scene-wrap .il4-scene {
        border-radius: 0;
        border: 0;
        min-height: 16rem;
      }
      @media (min-width: 768px) {
        .scene-wrap .il4-scene { min-height: 22rem; }
      }
      @media (min-width: 1024px) {
        .scene-wrap .il4-scene { min-height: 26rem; }
      }
      .story-list {
        margin: 1.5rem 0 0;
        padding: 1.15rem 1.25rem;
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        font-size: 0.875rem;
        line-height: 1.65;
        color: rgba(255, 255, 255, 0.78);
      }
      .story-list h2 {
        margin: 0 0 0.65rem;
        font-size: 0.95rem;
        font-weight: 800;
        color: #fde68a;
      }
      .story-list ol { margin: 0; padding-left: 1.2rem; }
      .story-list li + li { margin-top: 0.4rem; }

${css}
    </style>
  </head>
  <body>
    <p class="preview-banner">
      <strong>Vista previa — no publicada.</strong>
      Propuesta nueva para la página de Iluminación. La web en producción no cambia.
    </p>
    <div class="container">
      <p style="margin:0;font-size:0.75rem;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;color:#fbbf24;">
        Mundo Camping · Iluminación
      </p>
      <h1 style="margin:0.5rem 0 0;font-size:clamp(1.5rem,4vw,2rem);font-weight:900;">
        Linterna, cueva y huida a la tienda
      </h1>
      <p style="margin:0.75rem 0 0;max-width:36rem;line-height:1.6;color:rgba(255,255,255,0.72);">
        El padre ilumina el interior de la cueva con su linterna, descubren un monstruo y salen corriendo a refugiarse en la tienda.
      </p>

      <div class="scene-wrap">
        <div
          class="il4-scene il4-scene--hero"
          role="img"
          aria-label="Familia que ilumina una cueva con linterna, descubre un monstruo y huye a la tienda de campaña"
        >
          <span class="il4-scene__glow il4-scene__glow--moon" aria-hidden="true"></span>
          <span class="il4-scene__glow il4-scene__glow--beam" aria-hidden="true"></span>
          <span class="il4-scene__glow il4-scene__glow--tent" aria-hidden="true"></span>
          ${svg.trim()}
        </div>
      </div>

      <div class="story-list">
        <h2>Secuencia de la animación</h2>
        <ol>
          <li>La familia sale de la tienda y camina hacia la cueva.</li>
          <li>El padre enciende la linterna y la apunta al interior de la cueva.</li>
          <li>La luz revela un monstruo escondido en la oscuridad.</li>
          <li>¡Susto! Salen corriendo de vuelta.</li>
          <li>Se meten dentro de la tienda, a salvo.</li>
        </ol>
      </div>
    </div>
  </body>
</html>
`;

const outPath = path.join(desktop, 'animacion-iluminacion-preview.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Creado:', outPath);
