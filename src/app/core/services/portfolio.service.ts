import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { PortfolioCategory, PortfolioItem, PortfolioStyle } from '../models/portfolio-item.model';
import { PortfolioFilter } from '../models/portfolio-filters';

interface PortfolioImageDto {
  id: number;
  slug: string;
  imageUrl: string;
  altText: string;
  title: string | null;
  story?: string;
  category: string;
  styles?: string[];
  showOnHomepage: boolean;
  displayOrder: number;
  width: number;
  height: number;
}

function toItem(dto: PortfolioImageDto): PortfolioItem {
  return {
    id: dto.id,
    slug: dto.slug,
    src: dto.imageUrl,
    alt: dto.altText,
    title: dto.title ?? undefined,
    story: dto.story,
    category: dto.category as PortfolioCategory,
    styles: (dto.styles ?? []) as PortfolioStyle[],
    featured: dto.showOnHomepage,
    width: dto.width,
    height: dto.height,
  };
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  /** Shared, cached stream of portfolio items (used by route resolvers). */
  readonly items$: Observable<PortfolioItem[]> = this.http
    .get<PortfolioImageDto[]>('/assets/portfolio/portfolio.json')
    .pipe(
      map(dtos => dtos.map(toItem)),
      catchError(() => of([] as PortfolioItem[])),
      shareReplay(1),
    );

  readonly items = toSignal(this.items$);

  byFilter(filter: PortfolioFilter | null): PortfolioItem[] {
    const all = this.items() ?? [];
    return filter ? all.filter(filter.matches) : all;
  }

  featured(): PortfolioItem[] {
    return (this.items() ?? []).filter(i => i.featured);
  }
}
