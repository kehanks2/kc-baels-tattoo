import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith } from 'rxjs';

@Component({
  selector: 'app-scroll-to-top',
  template: `
    @if (visible()) {
      <button class="scroll-top" (click)="scrollToTop()" aria-label="Scroll to top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    }
  `,
  styleUrl: './scroll-to-top.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  private readonly document = inject(DOCUMENT);
  private readonly win = this.document.defaultView;

  readonly visible = toSignal(
    fromEvent(this.win!, 'scroll').pipe(
      map(() => (this.win?.scrollY ?? 0) > 300),
      startWith(false)
    ),
    { initialValue: false }
  );

  scrollToTop(): void {
    this.win?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
