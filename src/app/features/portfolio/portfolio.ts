import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PortfolioFilter, findFilter } from '../../core/models/portfolio-filters';
import { PortfolioService } from '../../core/services/portfolio.service';
import { FilterComponent } from './filter/filter';
import { GridComponent } from './grid/grid';
import { LightboxComponent } from './lightbox/lightbox';

/**
 * Serves three kinds of route:
 * - /portfolio/                 all work
 * - /portfolio/<filter>/        all work, with that filter preselected (route data `filter`)
 * - /tattoos/<slug>/            all work, with that piece open in the lightbox
 *
 * Filter chips filter in place and never change the URL.
 */
@Component({
  selector: 'app-portfolio',
  imports: [FilterComponent, GridComponent, LightboxComponent, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  private readonly portfolioService = inject(PortfolioService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /** Filter preselected by the URL (/portfolio/<filter>/), if any. */
  private readonly routeFilter = findFilter(this.route.snapshot.data['filter']);
  private readonly pieceSlug = this.route.snapshot.paramMap.get('slug');

  readonly activeFilter = signal<PortfolioFilter | null>(this.routeFilter);

  /** The filter-specific heading and intro show only while the URL's filter is active. */
  readonly headerFilter = computed(() =>
    this.routeFilter && this.activeFilter() === this.routeFilter ? this.routeFilter : null
  );

  readonly loading = computed(() => this.portfolioService.items() === undefined);

  readonly filteredItems = computed(() => this.portfolioService.byFilter(this.activeFilter()));

  readonly piece = computed(() =>
    this.pieceSlug ? this.filteredItems().find(i => i.slug === this.pieceSlug) ?? null : null
  );

  readonly lightboxIndex = linkedSignal<number | null>(() => {
    const piece = this.piece();
    return piece ? this.filteredItems().indexOf(piece) : null;
  });

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = this.lightboxIndex() !== null ? 'hidden' : '';
      }
    });

    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = '';
      }
    });
  }

  onFilterChange(slug: string | null): void {
    this.activeFilter.set(findFilter(slug));
    this.lightboxIndex.set(null);
  }

  onItemClick(index: number): void {
    this.lightboxIndex.set(index);
  }

  onLightboxClose(): void {
    this.lightboxIndex.set(null);
    if (this.pieceSlug) {
      this.router.navigateByUrl('/portfolio');
    }
  }
}
