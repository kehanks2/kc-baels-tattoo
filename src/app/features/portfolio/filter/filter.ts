import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CATEGORY_LABELS, FilterOption } from '../../../core/models/portfolio-item.model';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  readonly active = input<FilterOption>('all');
  readonly categoryChange = output<FilterOption>();

  readonly options: { value: FilterOption; label: string }[] = [
    { value: 'all',        label: 'All Work' },
    { value: 'black-grey', label: CATEGORY_LABELS['black-grey'] },
    { value: 'color',      label: CATEGORY_LABELS['color'] },
    { value: 'fine-line',  label: CATEGORY_LABELS['fine-line'] },
    { value: 'traditional',label: CATEGORY_LABELS['traditional'] },
    { value: 'geometric',  label: CATEGORY_LABELS['geometric'] },
  ];

  select(value: FilterOption): void {
    this.categoryChange.emit(value);
  }
}
