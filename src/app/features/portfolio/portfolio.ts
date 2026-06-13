import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FilterOption } from '../../core/models/portfolio-item.model';
import { PortfolioService } from '../../core/services/portfolio.service';
import { FilterComponent } from './filter/filter';
import { GridComponent } from './grid/grid';
import { LightboxComponent } from './lightbox/lightbox';

@Component({
  selector: 'app-portfolio',
  imports: [FilterComponent, GridComponent, LightboxComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  private readonly portfolioService = inject(PortfolioService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly activeCategory = signal<FilterOption>('all');
  readonly lightboxIndex = signal<number | null>(null);

  readonly loading = computed(() => this.portfolioService.items() === undefined);

  readonly filteredItems = computed(() =>
    this.portfolioService.byCategory(this.activeCategory())
  );

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

  onCategoryChange(category: FilterOption): void {
    this.activeCategory.set(category);
    this.lightboxIndex.set(null);
  }

  onItemClick(index: number): void {
    this.lightboxIndex.set(index);
  }

  onLightboxClose(): void {
    this.lightboxIndex.set(null);
  }
}
