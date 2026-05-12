import { Injectable, signal } from '@angular/core';
import { FilterOption, PortfolioItem } from '../models/portfolio-item.model';

// Static placeholder data.
// When the Spring Boot backend is ready, replace this constant with an
// HttpClient call: GET /api/portfolio  → PortfolioItem[]
// and expose the result via a signal (e.g. toSignal(this.http.get(...))).
const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // ── Black & Grey ──────────────────────────────────────────────────────────
  {
    id: 1,
    src: 'https://picsum.photos/seed/kct01/600/800',
    alt: 'Black and grey wolf portrait tattoo',
    width: 600, height: 800,
    category: 'black-grey',
    title: 'Wolf Portrait',
    featured: true,
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/kct02/600/750',
    alt: 'Realistic black and grey rose tattoo',
    width: 600, height: 750,
    category: 'black-grey',
    title: 'Midnight Rose',
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/kct03/600/900',
    alt: 'Black and grey sleeve detail',
    width: 600, height: 900,
    category: 'black-grey',
    title: 'Sleeve Detail',
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/kct04/600/680',
    alt: 'Black and grey portrait tattoo',
    width: 600, height: 680,
    category: 'black-grey',
    title: 'Portrait Study',
  },
  {
    id: 5,
    src: 'https://picsum.photos/seed/kct05/600/820',
    alt: 'Black and grey eagle tattoo',
    width: 600, height: 820,
    category: 'black-grey',
    title: 'Eagle',
  },
  // ── Color ─────────────────────────────────────────────────────────────────
  {
    id: 6,
    src: 'https://picsum.photos/seed/kct06/600/720',
    alt: 'Vibrant color koi fish tattoo',
    width: 600, height: 720,
    category: 'color',
    title: 'Koi',
    featured: true,
  },
  {
    id: 7,
    src: 'https://picsum.photos/seed/kct07/600/800',
    alt: 'Watercolor butterfly tattoo',
    width: 600, height: 800,
    category: 'color',
    title: 'Watercolor Butterfly',
  },
  {
    id: 8,
    src: 'https://picsum.photos/seed/kct08/600/620',
    alt: 'Color floral bouquet tattoo',
    width: 600, height: 620,
    category: 'color',
    title: 'Garden Bouquet',
  },
  {
    id: 9,
    src: 'https://picsum.photos/seed/kct09/600/760',
    alt: 'Tropical color sleeve tattoo',
    width: 600, height: 760,
    category: 'color',
    title: 'Tropical Sleeve',
  },
  // ── Fine Line ─────────────────────────────────────────────────────────────
  {
    id: 10,
    src: 'https://picsum.photos/seed/kct10/600/840',
    alt: 'Fine line botanical illustration tattoo',
    width: 600, height: 840,
    category: 'fine-line',
    title: 'Botanical',
    featured: true,
  },
  {
    id: 11,
    src: 'https://picsum.photos/seed/kct11/600/700',
    alt: 'Delicate fine line butterfly tattoo',
    width: 600, height: 700,
    category: 'fine-line',
    title: 'Delicate Wings',
  },
  {
    id: 12,
    src: 'https://picsum.photos/seed/kct12/600/860',
    alt: 'Fine line script and floral tattoo',
    width: 600, height: 860,
    category: 'fine-line',
    title: 'Script & Florals',
  },
  // ── Traditional ───────────────────────────────────────────────────────────
  {
    id: 13,
    src: 'https://picsum.photos/seed/kct13/600/700',
    alt: 'Traditional American eagle and banner tattoo',
    width: 600, height: 700,
    category: 'traditional',
    title: 'Eagle & Banner',
  },
  {
    id: 14,
    src: 'https://picsum.photos/seed/kct14/600/800',
    alt: 'Traditional anchor tattoo',
    width: 600, height: 800,
    category: 'traditional',
    title: 'Anchor',
  },
  {
    id: 15,
    src: 'https://picsum.photos/seed/kct15/600/660',
    alt: 'Traditional panther tattoo',
    width: 600, height: 660,
    category: 'traditional',
    title: 'Panther',
  },
  // ── Geometric ─────────────────────────────────────────────────────────────
  {
    id: 16,
    src: 'https://picsum.photos/seed/kct16/600/800',
    alt: 'Sacred geometry mandala tattoo',
    width: 600, height: 800,
    category: 'geometric',
    title: 'Mandala',
    featured: true,
  },
  {
    id: 17,
    src: 'https://picsum.photos/seed/kct17/600/760',
    alt: 'Geometric fox tattoo',
    width: 600, height: 760,
    category: 'geometric',
    title: 'Geometric Fox',
  },
  {
    id: 18,
    src: 'https://picsum.photos/seed/kct18/600/700',
    alt: 'Dotwork geometric pattern tattoo',
    width: 600, height: 700,
    category: 'geometric',
    title: 'Dotwork',
  },
];

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly _items = signal<PortfolioItem[]>(PORTFOLIO_ITEMS);

  readonly items = this._items.asReadonly();

  byCategory(category: FilterOption): PortfolioItem[] {
    const all = this._items();
    return category === 'all' ? all : all.filter(i => i.category === category);
  }

  featured(): PortfolioItem[] {
    return this._items().filter(i => i.featured);
  }
}
