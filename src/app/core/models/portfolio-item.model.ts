export type PortfolioCategory =
  | 'black-grey'
  | 'color';

/** Style tags assigned per piece in portfolio.json. */
export type PortfolioStyle =
  | 'traditional'
  | 'neotraditional'
  | 'illustrative'
  | 'anime'
  | 'fine-line';

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  'black-grey': 'Black & Grey',
  'color':      'Color',
};

export interface PortfolioItem {
  id:       number;
  slug:     string;
  src:      string;
  alt:      string;
  width:    number;
  height:   number;
  category: PortfolioCategory;
  styles:   PortfolioStyle[];
  title?:   string;
  /** Optional one or two sentence description shown in the lightbox and on the piece page. */
  story?:   string;
  featured?: boolean;
}
