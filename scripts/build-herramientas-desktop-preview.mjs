import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const desktop = path.join(process.env.USERPROFILE || '', 'Desktop');

const css1 = fs.readFileSync(path.join(root, 'herramientas-animation.css'), 'utf8');
const css2 = fs.readFileSync(path.join(root, 'herramientas-animation-v2.css'), 'utf8');
const v1Svg = fs.readFileSync(path.join(root, 'herramientas-hero-scene.svg'), 'utf8');
const v2Svg = fs.readFileSync(path.join(root, 'herramientas-hero-scene-v2.svg'), 'utf8');

const scene = (extraClass, ariaLabel, svg) => `
      <div class="herr-scene herr-scene--hero ${extraClass}" role="img" aria-label="${ariaLabel}">
        <span class="herr-scene__glow herr-scene__glow--left" aria-hidden="true"></span>
        <span class="herr-scene__glow herr-scene__glow--center" aria-hidden="true"></span>
        <span class="herr-scene__glow herr-scene__glow--right" aria-hidden="true"></span>
        ${svg}
      </div>`;

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Animación Herramientas — comparativa | Mundo Camping</title>
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
        border-bottom: 1px solid rgba(110, 231, 183, 0.25);
        background: rgba(2, 4, 3, 0.94);
        backdrop-filter: blur(12px);
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.55;
        color: rgba(255, 255, 255, 0.82);
      }
      .preview-banner strong { color: #deff9a; }
      .container {
        width: 100%;
        max-width: 80rem;
        margin: 0 auto;
        padding: 1.5rem 1rem 3rem;
      }
      @media (min-width: 640px) { .container { padding-inline: 1.5rem; } }
      @media (min-width: 1024px) { .container { padding-inline: 2rem; } }
      .compare-grid {
        display: grid;
        gap: 2rem;
        margin-top: 1.5rem;
      }
      @media (min-width: 1024px) {
        .compare-grid { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
      }
      .compare-card {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 1.15rem;
        overflow: hidden;
        background: rgba(8, 14, 12, 0.6);
      }
      .compare-card--v2 {
        border-color: rgba(110, 231, 183, 0.35);
        box-shadow: 0 0 32px rgba(16, 185, 129, 0.08);
      }
      .compare-card__head {
        padding: 1rem 1.15rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .compare-card__kicker {
        margin: 0;
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #6ee7b7;
      }
      .compare-card__title {
        margin: 0.4rem 0 0;
        font-size: 1.15rem;
        font-weight: 800;
      }
      .compare-card__desc {
        margin: 0.45rem 0 0;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.68);
      }
      .compare-card__scene {
        min-height: 16rem;
      }
      @media (min-width: 768px) {
        .compare-card__scene { min-height: 20rem; }
      }
      @media (min-width: 1024px) {
        .compare-card__scene { min-height: 22rem; }
      }
      .compare-card__scene .herr-scene {
        border-radius: 0;
        border: 0;
        box-shadow: none;
      }
      .compare-list {
        margin: 1.5rem 0 0;
        padding: 1.15rem 1.25rem;
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(255, 255, 255, 0.03);
        font-size: 0.875rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.78);
      }
      .compare-list h2 {
        margin: 0 0 0.65rem;
        font-size: 0.95rem;
        font-weight: 800;
        color: #deff9a;
      }
      .compare-list ul { margin: 0; padding-left: 1.15rem; }
      .compare-list li + li { margin-top: 0.35rem; }

      /* Animación v1 */
${css1}

      /* Animación v2 */
${css2}
    </style>
  </head>
  <body>
    <p class="preview-banner">
      <strong>Vista previa — no publicada.</strong>
      Comparativa de animaciones de Herramientas. La web en producción no cambia hasta que la apruebes.
    </p>
    <div class="container">
      <p style="margin:0;font-size:0.75rem;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;color:#6ee7b7;">
        Mundo Camping
      </p>
      <h1 style="margin:0.5rem 0 0;font-size:clamp(1.5rem,4vw,2rem);font-weight:900;">
        Animación Herramientas — comparativa
      </h1>
      <p style="margin:0.75rem 0 0;max-width:40rem;line-height:1.6;color:rgba(255,255,255,0.72);">
        Izquierda: animación actual. Derecha: propuesta nueva (v2).
      </p>

      <div class="compare-grid">
        <section class="compare-card">
          <div class="compare-card__head">
            <p class="compare-card__kicker">Producción actual</p>
            <h2 class="compare-card__title">Versión v1</h2>
            <p class="compare-card__desc">La que está en la página de Herramientas hoy.</p>
          </div>
          <div class="compare-card__scene">
            ${scene('', 'Animación actual: leñador, carrito y hoguera', v1Svg)}
          </div>
        </section>

        <section class="compare-card compare-card--v2">
          <div class="compare-card__head">
            <p class="compare-card__kicker">Propuesta nueva</p>
            <h2 class="compare-card__title">Versión v2</h2>
            <p class="compare-card__desc">Personaje más detallado, ruedas, humo y hoguera persistente.</p>
          </div>
          <div class="compare-card__scene">
            ${scene('herr-scene--v2', 'Animación propuesta v2', v2Svg)}
          </div>
        </section>
      </div>

      <div class="compare-list">
        <h2>Mejoras en la v2</h2>
        <ul>
          <li>Corregida la caída del pino (sin triángulo flotante).</li>
          <li>Ruedas del carrito que giran al moverse.</li>
          <li>Humo suave sobre la hoguera y luz cálida en el suelo.</li>
          <li>Personaje con más detalle (botas, peto, expresión).</li>
          <li>La hoguera permanece encendida al final del ciclo.</li>
          <li>Cielo con viñeta y más estrellas.</li>
        </ul>
      </div>
    </div>
  </body>
</html>
`;

const outPath = path.join(desktop, 'animacion-herramientas-preview.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Creado:', outPath);
