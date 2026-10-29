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
  /** Longer copy shown below the grid on the filter's own page. */
  body:        readonly string[];
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
    body: [
      'Black and grey tattoos use black ink diluted into a range of grey tones to build shading, depth, and contrast without color. The style works for nearly any subject, from soft, realistic shading to bold illustrative designs, and it suits clients who want a timeless look or a piece that sits well alongside existing work.',
      'Kc "Baels" Hanks tattoos black and grey work at Flying Tiger Tattoo in North Austin. His portfolio includes a koi and lotus forearm piece, an animal skull half sleeve with flowers and butterflies, a forest scene with a bear, an anatomical heart with lilies, a Creation of Adam forearm tattoo, and a sleeve built from panels of the manga Battle Angel Alita.',
      'Strong black and grey work depends on contrast: the darkest blacks and the open skin between them are what keep a design readable as it heals and ages.',
      'Clients come to Flying Tiger Tattoo on West Parmer Lane from across Austin, Round Rock, Pflugerville, and Cedar Park. To start a black and grey piece, send a booking inquiry with your idea and a few reference images.',
    ],
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
    body: [
      'Color tattoos use saturated ink to make a design stand out, and they are strongest when bold outlines hold the color in place. Traditional, neotraditional, and illustrative styles all rely on color to create depth, contrast, and mood.',
      'Kc "Baels" Hanks tattoos color work at Flying Tiger Tattoo in North Austin, from classic traditional designs to richer neotraditional pieces. His color portfolio includes a Japanese-style tiger, an anatomical heart in deep red, a skull with mushrooms on the neck, a sacred heart pierced by a dagger, a red spider lily thigh piece, and a hummingbird.',
      'Aftercare matters even more for color work. Following the healing instructions closely and keeping healed tattoos out of strong sun helps colors stay bright for years.',
      'Clients come to Flying Tiger Tattoo on West Parmer Lane from across Austin, Round Rock, Pflugerville, and Cedar Park. To start a color piece, send a booking inquiry with your idea and a few reference images.',
    ],
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
    body: [
      'Traditional tattooing, often called American traditional, is built on rules that have held up for more than a century: bold black outlines, a limited palette of solid color, and simple, readable imagery. Daggers, sacred hearts, snakes, tigers, skulls, and animals all come from that history, and they remain popular because they stay clear and bright for decades.',
      'Kc "Baels" Hanks tattoos traditional work at Flying Tiger Tattoo in North Austin, and it is one of the primary styles in his portfolio. His traditional pieces range from flaming sacred hearts and daggers to a Japanese-style tiger, a cat with butterfly wings, a flying pig, and a teal and yellow crab.',
      'Every traditional tattoo starts with a consultation. Kc talks through your idea, size, and placement, then draws a custom design that fits that part of the body, whether you want a small flash-style piece or a larger arrangement that ties several images together.',
      'Clients come to Flying Tiger Tattoo on West Parmer Lane from across Austin, Round Rock, Pflugerville, and Cedar Park. To start a traditional piece, send a booking inquiry with your idea and a few reference images.',
    ],
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
    body: [
      'Neotraditional tattooing keeps the backbone of American traditional work, with bold outlines and solid color that holds, and builds on it with richer palettes, more dimension, and finer detail. It is the style Kc "Baels" Hanks returns to most often at Flying Tiger Tattoo in North Austin, and it suits the way he sees: he grew up surrounded by surrealist painting at the Salvador Dalí Museum, where his mother worked as a curator, and spent his teenage years writing graffiti, so strong shapes and unexpected color come naturally to him.',
      'Every neotraditional piece starts with a conversation. Kc talks through your idea, your references, and the placement, then draws a design for that specific part of the body so the composition follows the muscle and still reads clearly from a distance. Skulls, animals, florals, daggers, and sacred hearts are all familiar territory, and his portfolio shows how he pushes classic imagery somewhere stranger, such as a skull crowned with mushrooms or an anatomical heart wrapped in lilies.',
      'The heavier structure is what lets neotraditional tattoos age well. Detail and color sit inside strong linework, so the piece stays legible as the skin changes over the years.',
      'Clients come to Flying Tiger Tattoo on West Parmer Lane from across Austin, Round Rock, Pflugerville, and Cedar Park. If you have a neotraditional piece in mind, send a booking inquiry with your idea and a few reference images to start the conversation.',
    ],
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
    body: [
      'Illustrative tattoos borrow from drawing, printmaking, and fine art. They combine linework, shading, and texture to set a scene or tell a small story, and they leave more room for a personal or unusual idea than strictly traditional styles.',
      'Kc "Baels" Hanks came to tattooing from fine art and graffiti, and that background shows in his illustrative work at Flying Tiger Tattoo in North Austin. His portfolio includes a cathedral window with a shadowed figure, a cowboy raccoon with revolvers, and a color hummingbird.',
      'Illustrative pieces work well for clients who arrive with an idea rather than a single reference photo. During the consultation, Kc talks through the concept, mood, and placement, then draws a custom design that fits the body and holds its detail over time.',
      'Clients come to Flying Tiger Tattoo on West Parmer Lane from across Austin, Round Rock, Pflugerville, and Cedar Park. To start an illustrative piece, send a booking inquiry with your idea and any references that capture the mood you want.',
    ],
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
    body: [
      'Anime, manga, and cartoon tattoos let clients carry a favorite series, character, or scene with them. The strongest ones respect the original art style, keeping the linework, expressions, and screentone shading that make the source recognizable.',
      'Kc "Baels" Hanks tattoos anime and cartoon pieces at Flying Tiger Tattoo in North Austin. His portfolio includes a black and grey sleeve built from a client\'s favorite panels of the manga Battle Angel Alita, a Halloween Bulbasaur with a jack-o-lantern, and a color SpongeBob and Patrick piece.',
      'Character tattoos work best when they are adapted for skin rather than copied line for line. During the consultation, Kc talks through the characters or panels you want, the size, and the placement, then lays out a design that keeps the details readable.',
      'Clients come to Flying Tiger Tattoo on West Parmer Lane from across Austin, Round Rock, Pflugerville, and Cedar Park. To start an anime or cartoon piece, send a booking inquiry with the characters or panels you have in mind and a few reference images.',
    ],
    matches: (item) => item.styles.includes('anime'),
  },
];

export function findFilter(slug: string | null | undefined): PortfolioFilter | null {
  return PORTFOLIO_FILTERS.find((f) => f.slug === slug) ?? null;
}
