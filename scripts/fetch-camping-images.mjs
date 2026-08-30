/**
 * Descarga imágenes reales desde Wikimedia Commons.
 * node scripts/fetch-camping-images.mjs [archivo...]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'assets', 'campings');

const campings = [
  { file: 'camping-picos-europa.jpg', search: 'Picos de Europa Lagos Covadonga' },
  { file: 'camping-sanguli-salou.jpg', search: 'Platja Llevant Salou' },
  { file: 'camping-gavina.jpg', search: 'Castillo de Tamarit playa' },
  { file: 'camping-bolnuevo.jpg', search: 'Erosiones Bolnuevo Mazarrón' },
  { file: 'camping-las-dunas.jpg', search: 'Platja de Sant Pere Pescador' },
  { file: 'camping-ordesa.jpg', search: 'Parque Nacional Ordesa Monte Perdido' },
  { file: 'camping-kiko-park.jpg', search: 'Platja de Oliva La Safor' },
  { file: 'camping-el-escorial.jpg', search: 'Monasterio San Lorenzo El Escorial' },
  { file: 'camping-playa-joyel.jpg', search: 'Noja Cantabria beach' },
  { file: 'camping-cala-gogo.jpg', search: 'Platja de Can Cristus Platja d Aro' },
  { file: 'camping-pantano-chorro.jpg', search: 'Embalse Conde Guadalhorce presa' },
];

const only = process.argv.slice(2);

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function searchThumb(query) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: query,
    gsrnamespace: '6',
    gsrlimit: '8',
    prop: 'imageinfo',
    iiprop: 'url|mime|size',
    iiurlwidth: '800',
    format: 'json',
    origin: '*',
  });
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
  if (res.status === 429) throw new Error('429 rate limit');
  const data = await res.json();
  const pages = data.query?.pages || {};
  for (const page of Object.values(pages)) {
    const info = page.imageinfo?.[0];
    if (!info?.thumburl || !info.mime?.startsWith('image/')) continue;
    if (/\.(djvu|pdf|svg)$/i.test(page.title)) continue;
    if (!/^image\/(jpeg|png|webp)$/i.test(info.mime)) continue;
    if (info.size > 12_000_000) continue;
    return { url: info.thumburl, title: page.title };
  }
  return null;
}

async function download(url) {
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(4000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error('429 rate limit on download');
}

fs.mkdirSync(outDir, { recursive: true });

const queue = only.length
  ? campings.filter((c) => only.includes(c.file))
  : campings;

for (const item of queue) {
  const dest = path.join(outDir, item.file);
  try {
    await sleep(3500);
    let hit = null;
    for (let attempt = 0; attempt < 3 && !hit; attempt++) {
      try {
        hit = await searchThumb(item.search);
      } catch (e) {
        if (e.message.includes('429')) await sleep(6000);
        else throw e;
      }
    }
    if (!hit) {
      console.log(`SKIP ${item.file}`);
      continue;
    }
    const buf = await download(hit.url);
    fs.writeFileSync(dest, buf);
    console.log(`OK ${item.file} — ${hit.title} (${buf.length})`);
  } catch (err) {
    console.log(`ERR ${item.file} — ${err.message}`);
  }
}
