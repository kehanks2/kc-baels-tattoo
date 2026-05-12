import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CATEGORY_LABELS, PortfolioItem } from '../../../core/models/portfolio-item.model';

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

  open(index: number): void {
    this.itemClick.emit(index);
  }
}
