// Generates public/sitemap.xml from the route list, the portfolio filters and
// portfolio.json. Run with `npm run sitemap` after adding pages, filters or
// portfolio pieces, then commit the result.
//
// <lastmod> is the date of the last git commit touching each page's source
// files, or today if those files have uncommitted changes.

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const ORIGIN = 'https://heybaels.com';
const PORTFOLIO_JSON = 'public/assets/portfolio/portfolio.json';
const FILTERS_TS = 'src/app/core/models/portfolio-filters.ts';
const PORTFOLIO_SRC = 'src/app/features/portfolio';

const today = new Date().toISOString().slice(0, 10);

function lastmod(paths) {
  const dirty = execFileSync('git', ['status', '--porcelain', '--', ...paths], { encoding: 'utf-8' }).trim();
  if (dirty) return today;
  const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], { encoding: 'utf-8' }).trim();
  return date || today;
}

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pieces = JSON.parse(readFileSync(PORTFOLIO_JSON, 'utf-8'));
const filterSlugs = [...readFileSync(FILTERS_TS, 'utf-8').matchAll(/^\s+slug: '([a-z0-9-]+)',$/gm)].map(
  (m) => m[1],
);

/** @type {{ path: string; sources: string[]; images?: string[] }[]} */
const pages = [
  { path: '/', sources: ['src/app/features/home', 'src/index.html'] },
  {
    path: '/portfolio/',
    sources: [PORTFOLIO_SRC, PORTFOLIO_JSON],
    images: pieces.map((p) => p.imageUrl),
  },
  ...filterSlugs.map((slug) => ({
    path: `/portfolio/${slug}/`,
    sources: [PORTFOLIO_SRC, PORTFOLIO_JSON, FILTERS_TS],
  })),
  { path: '/about/', sources: ['src/app/features/about'] },
  { path: '/booking/', sources: ['src/app/features/booking'] },
  { path: '/faq/', sources: ['src/app/features/faq'] },
  { path: '/contact/', sources: ['src/app/features/contact'] },
  ...pieces.map((p) => ({
    path: `/tattoos/${p.slug}/`,
    sources: [PORTFOLIO_JSON],
    images: [p.imageUrl],
  })),
];

const urls = pages.map(({ path, sources, images = [] }) => {
  const imageTags = images
    .map((src) => `\n    <image:image><image:loc>${escape(ORIGIN + src)}</image:loc></image:image>`)
    .join('');
  return `  <url>\n    <loc>${escape(ORIGIN + path)}</loc>\n    <lastmod>${lastmod(sources)}</lastmod>${imageTags}\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;

writeFileSync('public/sitemap.xml', xml);
console.log(`Wrote public/sitemap.xml with ${pages.length} URLs.`);
