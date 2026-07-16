import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { FilterOption, PortfolioCategory, PortfolioItem } from '../models/portfolio-item.model';

interface PortfolioImageDto {
  id: number;
  imageUrl: string;
  altText: string;
  title: string | null;
  category: string;
  showOnHomepage: boolean;
  displayOrder: number;
  width: number;
  height: number;
}

function toItem(dto: PortfolioImageDto): PortfolioItem {
  return {
    id: dto.id,
    src: dto.imageUrl,
    alt: dto.altText,
    title: dto.title ?? undefined,
    category: dto.category as PortfolioCategory,
    featured: dto.showOnHomepage,
    width: dto.width,
    height: dto.height,
  };
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  private readonly _items = toSignal(
    this.http.get<PortfolioImageDto[]>('/assets/portfolio/portfolio.json').pipe(
      map(dtos => dtos.map(toItem)),
      catchError(() => of([] as PortfolioItem[]))
    )
  );

  readonly items = this._items;

  byCategory(category: FilterOption): PortfolioItem[] {
    const all = this._items() ?? [];
    return category === 'all' ? all : all.filter(i => i.category === category);
  }

  featured(): PortfolioItem[] {
    return (this._items() ?? []).filter(i => i.featured);
  }
}
