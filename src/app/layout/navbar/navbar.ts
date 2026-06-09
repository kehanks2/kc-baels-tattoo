import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.scrolled]': 'isScrolled()',
    '[class.menu-open]': 'mobileMenuOpen()',
    role: 'banner',
    '(window:scroll)': 'onScroll()',
  },
})
export class NavbarComponent {
  protected readonly links: NavLink[] = [
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About',     path: '/about' },
    { label: 'Booking',   path: '/booking' },
    { label: 'FAQ',       path: '/faq' },
    { label: 'Contact',   path: '/contact' },
  ];

  protected readonly isScrolled     = signal(false);
  protected readonly mobileMenuOpen = signal(false);
  protected readonly menuAriaLabel  = computed(() =>
    this.mobileMenuOpen() ? 'Close navigation menu' : 'Open navigation menu'
  );

  constructor() {
    afterNextRender(() => {
      this.isScrolled.set(window.scrollY > 20);
    });
  }

  protected onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  protected toggleMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}