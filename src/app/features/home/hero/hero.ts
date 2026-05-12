import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit {
  private readonly el = inject(ElementRef);

  private readonly eyebrow = viewChild<ElementRef>('eyebrow');
  private readonly headline = viewChild<ElementRef>('headline');
  private readonly sub      = viewChild<ElementRef>('sub');
  private readonly ctas     = viewChild<ElementRef>('ctas');
  private readonly scroll   = viewChild<ElementRef>('scroll');

  ngAfterViewInit(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(this.eyebrow()?.nativeElement, { y: 20, opacity: 0, duration: 0.8 })
      .from(this.headline()?.nativeElement, { y: 40, opacity: 0, duration: 1 }, '-=0.5')
      .from(this.sub()?.nativeElement,      { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
      .from(this.ctas()?.nativeElement,     { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(this.scroll()?.nativeElement,   { opacity: 0, duration: 0.6 }, '-=0.2');
  }
}