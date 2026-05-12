import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from './hero/hero';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';

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
}