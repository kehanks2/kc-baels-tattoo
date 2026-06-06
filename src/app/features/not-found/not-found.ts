import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <div class="container not-found__inner">
        <p class="section-label">404</p>
        <h1 class="not-found__heading">Page Not Found</h1>
        <p class="not-found__sub">
          This page doesn't exist or may have moved.
        </p>
        <div class="not-found__actions">
          <a class="btn btn-primary" routerLink="/">Back to Home</a>
          <a class="btn btn-outline" routerLink="/portfolio">View Portfolio</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .not-found {
      min-height: calc(100dvh - var(--nav-height));
      display: flex;
      align-items: center;
      padding-top: var(--nav-height);

      &__inner {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
        max-width: 560px;
      }

      &__heading {
        font-size: clamp(2rem, 6vw, 3.5rem);
      }

      &__sub {
        font-size: 1rem;
        color: var(--color-text-muted);
        line-height: 1.8;
      }

      &__actions {
        display: flex;
        gap: var(--space-md);
        flex-wrap: wrap;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
