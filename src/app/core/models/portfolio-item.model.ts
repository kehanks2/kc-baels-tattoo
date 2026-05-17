export type PortfolioCategory =
  | 'black-grey'
  | 'color';

export type FilterOption = PortfolioCategory | 'all';

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  'black-grey': 'Black & Grey',
  'color':      'Color',
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
