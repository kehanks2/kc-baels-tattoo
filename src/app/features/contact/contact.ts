import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <section class="section container">
      <p class="section-label">Reach Out</p>
      <h1 class="section-title">Contact</h1>
      <p>Contact form &amp; map — coming soon.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}