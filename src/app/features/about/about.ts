import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="section container">
      <p class="section-label">The Artist</p>
      <h1 class="section-title">About KC Baels</h1>
      <p>Bio &amp; studio story — coming soon.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}