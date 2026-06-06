import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar';
import { FooterComponent } from '../footer/footer';
import { SeoService } from '../../core/services/seo.service';
import { ScrollToTopComponent } from '../../shared/ui/scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent],
  template: `
    <app-navbar />
    <main id="main-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-scroll-to-top />
  `,
  styles: `
    main {
      min-height: 100dvh;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  constructor() {
    const router = inject(Router);
    const seo = inject(SeoService);
    const destroyRef = inject(DestroyRef);

    router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed(destroyRef),
    ).subscribe(() => {
      let route = router.routerState.root.firstChild;
      while (route?.firstChild) { route = route.firstChild; }
      const snapshot = route?.snapshot;
      const title = typeof snapshot?.title === 'string' ? snapshot.title : '';
      const description = snapshot?.data['description'] ?? '';
      seo.update(title, description);
    });
  }
}
