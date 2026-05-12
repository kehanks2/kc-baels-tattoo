import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
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

  readonly activeCategory = signal<FilterOption>('all');
  readonly lightboxIndex = signal<number | null>(null);

  readonly filteredItems = computed(() =>
    this.portfolioService.byCategory(this.activeCategory())
  );

  constructor() {
    effect(() => {
      document.body.style.overflow = this.lightboxIndex() !== null ? 'hidden' : '';
    });

    this.destroyRef.onDestroy(() => {
      document.body.style.overflow = '';
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
