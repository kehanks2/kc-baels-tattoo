import { PortfolioItem } from './portfolio-item.model';

/**
 * Portfolio filters. Each filter is reachable at /portfolio/<slug>/ and is
 * prerendered as its own indexable page with its own title, description,
 * heading and intro. Vanity URLs such as /traditional-tattoo-austin redirect
 * to these pages (see public/_redirects).
 */
export interface PortfolioFilter {
  slug:        string;
  label:       string;
  heading:     string;
  title:       string;
  description: string;
  intro:       string;
  matches:     (item: PortfolioItem) => boolean;
}

export const PORTFOLIO_FILTERS: readonly PortfolioFilter[] = [
  {
    slug: 'black-and-grey',
    label: 'Black & Grey',
    heading: 'Black and Grey Tattoos',
    title: 'Black and Grey Tattoos in Austin, TX | Baels Tattoo',
    description:
      'Black and grey tattoos by Baels at Flying Tiger Tattoo in North Austin, from koi and anatomical hearts to forest scenes and full sleeves.',
    intro:
      'Black and grey work by Baels, from koi and anatomical hearts to forest scenes and full sleeves, all tattooed at Flying Tiger Tattoo in North Austin.',
    matches: (item) => item.category === 'black-grey',
  },
  {
    slug: 'color',
    label: 'Color',
    heading: 'Color Tattoos',
    title: 'Color Tattoos in Austin, TX | Baels Tattoo',
    description:
      'Color tattoos by Baels at Flying Tiger Tattoo in North Austin, in traditional, neotraditional, and illustrative styles.',
    intro:
      'Color work by Baels in traditional, neotraditional, and illustrative styles, all tattooed at Flying Tiger Tattoo in North Austin.',
    matches: (item) => item.category === 'color',
  },
  {
    slug: 'traditional',
    label: 'Traditional',
    heading: 'Traditional Tattoos',
    title: 'Traditional Tattoos in Austin, TX | Baels Tattoo',
    description:
      'Traditional tattoos by Baels at Flying Tiger Tattoo in North Austin: bold outlines, solid color, and classic imagery built to last.',
    intro:
      'Bold outlines, solid color, and classic imagery such as daggers, sacred hearts, snakes, and tigers. Every traditional piece below was tattooed by Baels at Flying Tiger Tattoo in North Austin.',
    matches: (item) => item.styles.includes('traditional'),
  },
  {
    slug: 'neotraditional',
    label: 'Neotraditional',
    heading: 'Neotraditional Tattoos',
    title: 'Neotraditional Tattoos in Austin, TX | Baels Tattoo',
    description:
      'Neotraditional tattoos by Baels at Flying Tiger Tattoo in North Austin, with bold structure, rich color, and added depth and detail.',
    intro:
      'Neotraditional work keeps the bold structure of traditional tattooing and adds richer color, more depth, and finer detail. These pieces were tattooed by Baels at Flying Tiger Tattoo in North Austin.',
    matches: (item) => item.styles.includes('neotraditional'),
  },
  {
    slug: 'illustrative',
    label: 'Illustrative',
    heading: 'Illustrative Tattoos',
    title: 'Illustrative Tattoos in Austin, TX | Baels Tattoo',
    description:
      'Illustrative tattoos by Baels at Flying Tiger Tattoo in North Austin: detailed scenes and characters drawn with a fine art sensibility.',
    intro:
      'Detailed scenes and characters drawn with a fine art sensibility, all tattooed by Baels at Flying Tiger Tattoo in North Austin.',
    matches: (item) => item.styles.includes('illustrative'),
  },
  {
    slug: 'anime',
    label: 'Anime & Cartoon',
    heading: 'Anime and Cartoon Tattoos',
    title: 'Anime and Cartoon Tattoos in Austin, TX | Baels Tattoo',
    description:
      'Anime, manga, and cartoon tattoos by Baels at Flying Tiger Tattoo in North Austin, from manga panel sleeves to Pokemon pieces.',
    intro:
      'Anime, manga, and cartoon tattoos by Baels, from a manga panel sleeve to Pokemon and SpongeBob pieces, all tattooed at Flying Tiger Tattoo in North Austin.',
    matches: (item) => item.styles.includes('anime'),
  },
];

export function findFilter(slug: string | null | undefined): PortfolioFilter | null {
  return PORTFOLIO_FILTERS.find((f) => f.slug === slug) ?? null;
}
