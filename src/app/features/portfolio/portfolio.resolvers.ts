import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { PortfolioService } from '../../core/services/portfolio.service';

/**
 * Resolvers for /tattoos/:slug/ (single-piece pages). These pages are not
 * linked from the site; they exist for image search and sharing, and open the
 * portfolio with the piece shown in the lightbox.
 */
function findPiece(route: ActivatedRouteSnapshot) {
  const slug = route.paramMap.get('slug');
  return inject(PortfolioService).items$.pipe(
    map(items => items.find(i => i.slug === slug) ?? null),
  );
}

export const pieceTitleResolver: ResolveFn<string> = route =>
  findPiece(route).pipe(
    map(piece => (piece ? `${piece.title} Tattoo in Austin, TX | Baels Tattoo` : 'Portfolio | Baels Tattoo')),
  );

export const pieceDescriptionResolver: ResolveFn<string> = route =>
  findPiece(route).pipe(
    map(piece =>
      piece
        ? `${piece.alt} by Baels at Flying Tiger Tattoo in Austin, TX.`
        : 'Browse the portfolio of Baels at Flying Tiger Tattoo in Austin, TX.',
    ),
  );
