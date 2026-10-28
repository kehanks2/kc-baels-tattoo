import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PORTFOLIO_FILTERS } from '../../../core/models/portfolio-filters';

/**
 * Filter chips. Each chip is a real link to its prerendered filter page
 * (/portfolio/<slug>/) so search engines can discover it, but a normal click
 * filters in place without navigating. Modified clicks (new tab, etc.) are
 * left to the browser.
 */
@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  /** Active filter slug, or null for "All Work". */
  readonly active = input<string | null>(null);
  readonly filterChange = output<string | null>();

  readonly options: { slug: string | null; label: string; href: string }[] = [
    { slug: null, label: 'All Work', href: '/portfolio/' },
    ...PORTFOLIO_FILTERS.map(f => ({ slug: f.slug, label: f.label, href: `/portfolio/${f.slug}/` })),
  ];

  select(event: MouseEvent, slug: string | null): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    this.filterChange.emit(slug);
  }
}
