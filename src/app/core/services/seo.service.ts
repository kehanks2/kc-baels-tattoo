import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_ORIGIN = 'https://heybaels.com';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly document = inject(DOCUMENT);

  /**
   * Updates per-route SEO tags. `path` is the router URL (query string and
   * fragment are stripped). Non-indexable routes (e.g. the 404 page) get
   * `noindex` and no canonical link.
   */
  update(pageTitle: string, description: string, path: string, indexable = true): void {
    const url = this.absoluteUrl(path);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    if (indexable) {
      this.meta.removeTag('name="robots"');
      this.setCanonical(url);
    } else {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
      this.removeCanonical();
    }
  }

  private absoluteUrl(path: string): string {
    const clean = (path.split(/[?#]/)[0] || '/').replace(/\/+$/, '');
    return clean === '' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${clean}`;
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private removeCanonical(): void {
    this.document.head.querySelector('link[rel="canonical"]')?.remove();
  }
}
