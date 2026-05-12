import { Directive, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyImage]',
})
export class LazyImageDirective implements OnInit, OnDestroy {
  readonly lazySrc = input.required<string>();
  readonly lazyAlt = input<string>('');

  private readonly el = inject(ElementRef<HTMLImageElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.el.nativeElement.alt = this.lazyAlt();

    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          this.el.nativeElement.src = this.lazySrc();
          this.observer?.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
