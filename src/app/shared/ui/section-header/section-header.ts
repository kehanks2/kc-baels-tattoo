import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="section-label">{{ label() }}</p>
    @switch (level()) {
      @case ('h3') {
        <h3 class="section-title" [id]="headingId() || null">{{ title() }}</h3>
      }
      @default {
        <h2 class="section-title" [id]="headingId() || null">{{ title() }}</h2>
      }
    }
  `,
})
export class SectionHeaderComponent {
  readonly label     = input.required<string>();
  readonly title     = input.required<string>();
  readonly level     = input<'h2' | 'h3'>('h2');
  readonly headingId = input<string>();
}
