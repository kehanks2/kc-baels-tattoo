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

  // Placeholder testimonials removed. Add real Google reviews here.
  readonly testimonials: Testimonial[] = [];
}