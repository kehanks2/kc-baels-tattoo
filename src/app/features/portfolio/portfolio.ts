import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  template: `
    <section class="section container">
      <p class="section-label">Gallery</p>
      <h1 class="section-title">Portfolio</h1>
      <p>Masonry gallery — coming in Phase 1 sprint 2.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {}