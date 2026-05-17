import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
  afterNextRender,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CATEGORY_LABELS, PortfolioItem } from '../../../core/models/portfolio-item.model';

interface GridEntry { item: PortfolioItem; index: number; }

@Component({
  selector: 'app-grid',
  imports: [NgOptimizedImage],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  readonly items = input.required<PortfolioItem[]>();
  readonly itemClick = output<number>();

  readonly categoryLabels = CATEGORY_LABELS;

  private readonly destroyRef = inject(DestroyRef);
  private readonly numColumns = signal(this.calcNumColumns());

  readonly columns = computed<GridEntry[][]>(() => {
    const n = this.numColumns();
    const cols: GridEntry[][] = Array.from({ length: n }, () => []);
    this.items().forEach((item, index) => cols[index % n].push({ item, index }));
    return cols;
  });

  constructor() {
    afterNextRender(() => {
      const handler = () => this.numColumns.set(this.calcNumColumns());
      window.addEventListener('resize', handler);
      this.destroyRef.onDestroy(() => window.removeEventListener('resize', handler));
    });
  }

  private calcNumColumns(): number {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  open(index: number): void {
    this.itemClick.emit(index);
  }
}
