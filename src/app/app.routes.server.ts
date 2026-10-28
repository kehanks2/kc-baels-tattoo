import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

/** Reads piece slugs at build time so every /tattoos/:slug/ page is prerendered. */
function pieceSlugs(): { slug: string }[] {
  const file = join(process.cwd(), 'public/assets/portfolio/portfolio.json');
  const items = JSON.parse(readFileSync(file, 'utf-8')) as { slug: string }[];
  return items.map(({ slug }) => ({ slug }));
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tattoos/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => pieceSlugs(),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
