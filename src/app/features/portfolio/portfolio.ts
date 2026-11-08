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
import { DOCUMENT, Location, isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PortfolioFilter, findFilter } from '../../core/models/portfolio-filters';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SeoService } from '../../core/services/seo.service';
import { FilterComponent } from './filter/filter';
import { GridComponent } from './grid/grid';
import { LightboxComponent } from './lightbox/lightbox';

/**
 * Serves three kinds of route:
 * - /portfolio/                 all work
 * - /portfolio/<filter>/        all work, with that filter preselected (route data `filter`)
 * - /tattoos/<slug>/            all work, with that piece open in the lightbox
 *
 * Filter chips filter in place without navigating. On /portfolio/ the URL never
 * changes. On a filter URL, picking a different filter swaps the address back to
 * /portfolio/ (history.replaceState, no navigation or scroll) and resets the title
 * and SEO tags to match, since the page no longer shows that filter's copy.
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
  private readonly location = inject(Location);
  private readonly titleService = inject(Title);
  private readonly seo = inject(SeoService);

  /** Filter preselected by the URL (/portfolio/<filter>/), if any. */
  private readonly routeFilter = findFilter(this.route.snapshot.data['filter']);
  private readonly pieceSlug = this.route.snapshot.paramMap.get('slug');

  readonly activeFilter = signal<PortfolioFilter | null>(this.routeFilter);

  /** True while the address bar still shows the filter URL this page was opened on. */
  private readonly onFilterUrl = signal(this.routeFilter !== null);

  /** The filter-specific heading, intro and copy show only while on that filter's URL. */
  readonly headerFilter = computed(() => (this.onFilterUrl() ? this.routeFilter : null));

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
    const filter = findFilter(slug);
    this.activeFilter.set(filter);
    this.lightboxIndex.set(null);

    if (this.onFilterUrl() && filter !== this.routeFilter) {
      this.onFilterUrl.set(false);
      this.showPortfolioUrl();
    }
  }

  /** Points the address bar, title and SEO tags at /portfolio/ without navigating. */
  private showPortfolioUrl(): void {
    const portfolioRoute = this.router.config
      .flatMap(r => r.children ?? [r])
      .find(r => r.path === 'portfolio');
    const title = typeof portfolioRoute?.title === 'string' ? portfolioRoute.title : 'Portfolio';
    const description = portfolioRoute?.data?.['description'] ?? '';

    this.titleService.setTitle(title);
    this.seo.update(title, description, '/portfolio');
    this.location.replaceState('/portfolio/');
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
