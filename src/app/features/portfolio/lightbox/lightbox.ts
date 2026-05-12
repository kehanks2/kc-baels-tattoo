import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CATEGORY_LABELS, PortfolioItem } from '../../../core/models/portfolio-item.model';

@Component({
  selector: 'app-lightbox',
  imports: [NgOptimizedImage],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'handleKeydown($event)',
  },
})
export class LightboxComponent {
  readonly items = input.required<PortfolioItem[]>();
  readonly startIndex = input.required<number>();
  readonly closed = output<void>();

  readonly currentIndex = linkedSignal(() => this.startIndex());
  readonly categoryLabels = CATEGORY_LABELS;

  readonly current = computed(() => {
    const items = this.items();
    const i = this.currentIndex();
    return i >= 0 && i < items.length ? items[i] : null;
  });

  prev(): void {
    this.currentIndex.update(i => (i - 1 + this.items().length) % this.items().length);
  }

  next(): void {
    this.currentIndex.update(i => (i + 1) % this.items().length);
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':     this.close(); break;
      case 'ArrowLeft':  this.prev();  break;
      case 'ArrowRight': this.next();  break;
    }
  }
}
