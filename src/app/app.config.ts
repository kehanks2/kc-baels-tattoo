import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    // Portfolio images ship in two WebP sizes: <name>.webp (up to 1200px wide)
    // and <name>-600.webp. Requests for 600w get the small file; everything
    // else is passed through unchanged.
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) =>
        config.width && config.width <= 600 && config.src.startsWith('/assets/portfolio/images/')
          ? config.src.replace(/\.webp$/, '-600.webp')
          : config.src,
    },
  ],
};