import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './hero/hero';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';

/**
 * A real client review, copied from its source with the reviewer's words
 * unchanged. Only add reviews that actually exist; the section is hidden
 * while this list is empty.
 */
interface Testimonial {
  quote: string;
  /** As shown on the source, e.g. "Sarah M." */
  author: string;
  /** Where the review was posted, e.g. "Google". */
  source: string;
  /** Link to the review or the listing it was posted on. */
  sourceUrl?: string;
}

@Component({
  selector: 'app-home',
  imports: [HeroComponent, RouterLink, NgOptimizedImage, SectionHeaderComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent {
  private readonly portfolioService = inject(PortfolioService);
  readonly featuredItems = computed(() => this.portfolioService.featured());

  // Real Google reviews, trimmed with ellipses; wording otherwise unchanged.
  readonly testimonials: Testimonial[] = [
    {
      quote: 'Baels has done all of my tattoos, and I wouldn’t trust anyone else with my ink. His work is always top-notch, he’s fast without sacrificing quality, and every piece has come out better than I expected.',
      author: 'Nate S.',
      source: 'Google',
      sourceUrl: 'https://www.google.com/maps/contrib/109368004469791585590/reviews?hl=en',
    },
    {
      quote: 'KC does great work! Super clean, professional, and nice. Always up to do something interesting.',
      author: 'Tyler R.',
      source: 'Google',
      sourceUrl: 'https://www.google.com/maps/contrib/111617959128695370524/reviews?hl=en-US',
    },
    {
      quote: 'Kc has done my right arm sleeve which also includes a shoulder cover up. … I get compliments all the time on the work he has done and I recommend him to everyone.',
      author: 'Random V.',
      source: 'Google',
      sourceUrl: 'https://www.google.com/maps/contrib/106784026828012250178/reviews?hl=en',
    },
  ];
}