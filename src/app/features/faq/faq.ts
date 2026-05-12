import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  template: `
    <section class="section container">
      <p class="section-label">Common Questions</p>
      <h1 class="section-title">FAQ</h1>
      <p>Accordion FAQ — coming soon.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {}