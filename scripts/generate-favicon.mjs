import sharp from 'sharp';
import toIco from 'to-ico';
import potrace from 'potrace';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'public/assets/about/kc-baels-logo.jpeg');
const out = resolve(root, 'public');

// Trace the logo JPEG into SVG path data using potrace.
// Returns just the <path d="..."/> string (no wrapper SVG).
async function traceToPaths() {
  // Prepare a trimmed, high-res greyscale PNG for potrace
  const traced = await sharp(src)
    .trim()
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .greyscale()
    .png()
    .toBuffer();

  return new Promise((resolve, reject) => {
    potrace.trace(traced, { threshold: 128, turdSize: 2 }, (err, svg) => {
      if (err) return reject(err);
      // Extract the path data from the generated SVG
      const match = svg.match(/<path[^>]*d="([^"]+)"/);
      if (!match) return reject(new Error('No path found in traced SVG'));
      resolve(match[1]);
    });
  });
}

// Raster PNG helpers (used for .ico and apple-touch-icon)
async function renderTransparent(size) {
  const alphaMask = await sharp(src)
    .trim()
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .greyscale()
    .negate()
    .raw()
    .toBuffer();

  const blackBase = await sharp({
    create: { width: size, height: size, channels: 3, background: { r: 0, g: 0, b: 0 } },
  }).png().toBuffer();

  const logoPng = await sharp(blackBase)
    .joinChannel(alphaMask, { raw: { width: size, height: size, channels: 1 } })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: logoPng }])
    .png()
    .toBuffer();
}

async function renderSolid(size) {
  const transparent = await renderTransparent(size);
  const whiteMarks = await sharp(transparent).negate({ alpha: false }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 3, background: { r: 15, g: 15, b: 16 } } })
    .composite([{ input: whiteMarks, blend: 'over' }])
    .png()
    .toBuffer();
}

async function main() {
  mkdirSync(out, { recursive: true });

  const [pathData, buf16, buf32, buf48, buf180, buf192] = await Promise.all([
    traceToPaths(),
    renderTransparent(16),
    renderTransparent(32),
    renderTransparent(48),
    renderSolid(180),
    renderSolid(192),
  ]);

  // favicon.ico — legacy browsers
  const icoBuffer = await toIco([buf16, buf32, buf48]);
  writeFileSync(resolve(out, 'favicon.ico'), icoBuffer);
  console.log('✓ favicon.ico (16/32/48)');

  // favicon.svg — real SVG paths so CSS media query reliably changes fill color.
  // potrace traces against a 512×512 canvas; viewBox matches that.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <style>
    path { fill: #000; stroke: #000; stroke-width: 10; stroke-linejoin: round; }
    @media (prefers-color-scheme: dark) { path { fill: #fff; stroke: #fff; } }
  </style>
  <path fill-rule="evenodd" d="${pathData}"/>
</svg>`;
  writeFileSync(resolve(out, 'favicon.svg'), svg);
  console.log('✓ favicon.svg (adaptive light/dark, SVG paths)');

  // apple-touch-icon.png — iOS (solid dark bg)
  writeFileSync(resolve(out, 'apple-touch-icon.png'), buf180);
  console.log('✓ apple-touch-icon.png (180)');

  // favicon-192.png — Android / PWA
  writeFileSync(resolve(out, 'favicon-192.png'), buf192);
  console.log('✓ favicon-192.png (192)');
}

main().catch(err => { console.error(err); process.exit(1); });
