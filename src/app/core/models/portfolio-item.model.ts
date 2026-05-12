export type PortfolioCategory =
  | 'black-grey'
  | 'color'
  | 'fine-line'
  | 'traditional'
  | 'geometric';

export type FilterOption = PortfolioCategory | 'all';

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  'black-grey':  'Black & Grey',
  'color':       'Color',
  'fine-line':   'Fine Line',
  'traditional': 'Traditional',
  'geometric':   'Geometric',
};

export interface PortfolioItem {
  id:       number;
  src:      string;
  alt:      string;
  width:    number;
  height:   number;
  category: PortfolioCategory;
  title?:   string;
  featured?: boolean;
}
