import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
  private readonly destroyRef = inject(DestroyRef);
  readonly visible = signal(false);

  constructor() {
    afterNextRender(() => {
      const win = this.document.defaultView;
      if (!win) return;
      const onScroll = () => this.visible.set(win.scrollY > 300);
      win.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => win.removeEventListener('scroll', onScroll));
    });
  }

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
