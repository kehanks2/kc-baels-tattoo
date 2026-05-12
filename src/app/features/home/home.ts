import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './hero/hero';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
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

  readonly testimonials: Testimonial[] = [
    {
      quote: 'KC took my rough idea and turned it into something I never could have imagined. The attention to detail is unreal.',
      author: 'Sarah M.',
      location: 'Austin, TX',
    },
    {
      quote: 'Best tattoo experience I\'ve ever had. KC spent real time understanding what I wanted before a single line was drawn.',
      author: 'James R.',
      location: 'Round Rock, TX',
    },
    {
      quote: 'I was nervous about my first tattoo but KC made the whole process feel easy. The result is exactly what I pictured.',
      author: 'Kayla D.',
      location: 'Pflugerville, TX',
    },
  ];
}