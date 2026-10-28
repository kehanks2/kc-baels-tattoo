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
  featured?: boolean;
}
