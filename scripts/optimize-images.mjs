// One-time image pipeline: design-source/raw-assets -> public/assets (WebP, max 1600px, ~200 KB),
// plus favicons from the badge and 1200x630 Open Graph cards per page.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const raw = path.join(root, 'design-source/raw-assets');
const out = path.join(root, 'public/assets');

async function photos() {
  const dir = path.join(raw, 'photos');
  await fs.mkdir(path.join(out, 'photos'), { recursive: true });
  for (const f of await fs.readdir(dir)) {
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
    const name = f.replace(/\.\w+$/, '');
    const img = sharp(path.join(dir, f)).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true });
    let q = 78, buf;
    do { buf = await img.clone().webp({ quality: q }).toBuffer(); q -= 8; } while (buf.length > 200_000 && q > 40);
    await fs.writeFile(path.join(out, 'photos', name + '.webp'), buf);
    const m = await sharp(buf).metadata();
    console.log('photo', name, m.width + 'x' + m.height, Math.round(buf.length / 1024) + 'KB');
  }
}

async function sponsors() {
  const dir = path.join(raw, 'sponsors');
  await fs.mkdir(path.join(out, 'sponsors'), { recursive: true });
  for (const f of await fs.readdir(dir)) {
    if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
    const name = f.replace(/\.\w+$/, '');
    const buf = await sharp(path.join(dir, f)).resize({ width: 600, height: 300, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 90 }).toBuffer();
    await fs.writeFile(path.join(out, 'sponsors', name + '.webp'), buf);
    console.log('logo', name, Math.round(buf.length / 1024) + 'KB');
  }
}

async function icons() {
  const badge = path.join(out, 'logo/badge.jpg');
  const circle = (s) => Buffer.from(`<svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#fff"/></svg>`);
  for (const [file, s, round] of [['favicon-32.png', 32, true], ['favicon-192.png', 192, true], ['icon-512.png', 512, false], ['apple-touch-icon.png', 180, false]]) {
    let img = sharp(badge).resize(s, s);
    if (round) img = sharp(await img.toBuffer()).composite([{ input: circle(s), blend: 'dest-in' }]);
    await img.png().toFile(path.join(root, 'public', file));
  }
  await sharp(badge).resize(320, 320).webp({ quality: 90 }).toFile(path.join(out, 'logo/badge.webp'));
  console.log('icons done');
}

// OG cards: purple-duotone photo, bead stripe, page title. 1200x630.
async function og() {
  const { OG_CARDS } = await import(path.join(root, 'src/og-cards.js'));
  await fs.mkdir(path.join(out, 'og'), { recursive: true });
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  for (const c of OG_CARDS) {
    const photo = await sharp(path.join(raw, 'photos', c.photo)).resize(1200, 630, { fit: 'cover', position: c.position || 'attention' }).grayscale().linear(1.1, 0).tint({ r: 130, g: 36, b: 227 }).toBuffer();
    const lines = c.title.toUpperCase().split('\n');
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A0850" stop-opacity=".25"/><stop offset="1" stop-color="#2A0850" stop-opacity=".92"/></linearGradient></defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <text x="60" y="${630 - 70 - lines.length * 96 - 30}" font-family="Oswald, Arial Narrow, Arial, sans-serif" font-weight="600" font-size="30" letter-spacing="4" fill="#F2E21B">${esc(c.eyebrow.toUpperCase())}</text>
      ${lines.map((l, i) => `<text x="56" y="${630 - 70 - (lines.length - 1 - i) * 96}" font-family="Oswald, Arial Narrow, Arial, sans-serif" font-weight="700" font-size="104" fill="#fff">${esc(l)}</text>`).join('')}
      ${Array.from({ length: 40 }, (_, i) => `<circle cx="${15 + i * 30}" cy="615" r="11" fill="${['#8224E3', '#2E9E1F', '#F2E21B'][i % 3]}"/>`).join('')}
    </svg>`;
    const badge = await sharp(path.join(out, 'logo/badge.jpg')).resize(150, 150).composite([{ input: Buffer.from('<svg width="150" height="150"><circle cx="75" cy="75" r="75"/></svg>'), blend: 'dest-in' }]).png().toBuffer();
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#55119C' } })
      .composite([{ input: photo }, { input: Buffer.from(svg) }, { input: badge, top: 40, left: 1010 }])
      .jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(out, 'og', c.slug + '.jpg'));
    console.log('og', c.slug);
  }
}

const only = process.argv[2];
if (!only || only === 'photos') await photos();
if (!only || only === 'sponsors') await sponsors();
if (!only || only === 'icons') await icons();
if (!only || only === 'og') await og();
