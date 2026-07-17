import fs from 'fs';

const files = [
  'top-5-sacos-dormir.html',
  'top-5-esterillas.html',
  'top-5-tiendas-parejas.html',
  'top-5-tiendas-familia.html',
  'estaciones-energia.html',
  'linternas-cual-comprar.html',
];

const box = `
          <aside class="article-internal-cta" aria-label="Más guías">
            <p class="article-internal-cta__kicker">Sigue explorando</p>
            <h2 class="article-internal-cta__title">¿Quieres acertar también en el resto del equipo?</h2>
            <p class="article-internal-cta__text">Consulta el <a href="guias.html">índice de guías</a>, el <a href="blog.html">blog práctico</a> o el <a href="mejores-sitios-acampar.html">mapa de destinos</a> para seguir eligiendo con criterio.</p>
          </aside>
`;

const style = `
    <style id="article-internal-cta-style">
      .article-internal-cta{margin:2rem 0 1rem;padding:1.25rem 1.35rem;border-radius:1rem;border:1px solid rgba(110,231,183,.28);background:linear-gradient(135deg,rgba(16,185,129,.12),rgba(2,4,3,.35));}
      .article-internal-cta__kicker{margin:0;font-size:.7rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#6ee7b7;}
      .article-internal-cta__title{margin:.4rem 0 .55rem;font-size:1.15rem;font-weight:900;color:#f8faf9;}
      .article-internal-cta__text{margin:0;color:rgba(248,250,249,.82);line-height:1.55;}
      .article-internal-cta a{color:#a7f3d0;font-weight:700;text-decoration:underline;}
    </style>
`;

for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  if (html.includes('article-internal-cta')) {
    console.log('skip', f);
    continue;
  }
  if (!html.includes('</article>')) {
    console.log('no article', f);
    continue;
  }
  if (!html.includes('id="article-internal-cta-style"')) {
    html = html.replace('</head>', style + '</head>');
  }
  html = html.replace('</article>', box + '      </article>');
  fs.writeFileSync(f, html);
  console.log('patched', f);
}
