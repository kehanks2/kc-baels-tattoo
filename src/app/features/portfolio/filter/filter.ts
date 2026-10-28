import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PORTFOLIO_FILTERS } from '../../../core/models/portfolio-filters';

/**
 * Filter chips. Each chip is a real link to a prerendered filter page
 * (/portfolio/<slug>/), so search engines can discover every filtered view.
 */
@Component({
  selector: 'app-filter',
  imports: [RouterLink],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  /** Active filter slug, or null for "All Work". */
  readonly active = input<string | null>(null);

  readonly options: { slug: string | null; label: string; link: string }[] = [
    { slug: null, label: 'All Work', link: '/portfolio' },
    ...PORTFOLIO_FILTERS.map(f => ({ slug: f.slug, label: f.label, link: `/portfolio/${f.slug}` })),
  ];
}
