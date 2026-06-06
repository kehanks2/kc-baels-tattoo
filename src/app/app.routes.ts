import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home').then((m) => m.HomeComponent),
        title: 'Baels — Tattoo Artist | Austin, TX',
        data: {
          description: 'Get tattooed by Baels in Austin, TX — neotraditional, traditional, and black & grey work at Flying Tiger Tattoo. Every piece starts with a conversation.',
        },
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/portfolio/portfolio').then((m) => m.PortfolioComponent),
        title: 'Portfolio — Baels Tattoo',
        data: {
          description: 'Browse the portfolio of Baels in Austin, TX — neotraditional, traditional, black & grey, illustrative, and script work at Flying Tiger Tattoo.',
        },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then((m) => m.AboutComponent),
        title: 'About — Baels Tattoo',
        data: {
          description: 'Learn about Baels in Austin, TX — raised on surrealism, graffiti, and fine art, now tattooing neotraditional and traditional work at Flying Tiger Tattoo.',
        },
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./features/booking/booking').then((m) => m.BookingComponent),
        title: 'Book an Appointment — Baels Tattoo',
        data: {
          description: 'Ready to get tattooed by Baels in Austin, TX? Submit a booking inquiry at Flying Tiger Tattoo and start the conversation about your next piece.',
        },
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/faq/faq').then((m) => m.FaqComponent),
        title: 'FAQ — Baels Tattoo',
        data: {
          description: 'Everything you need to know about getting tattooed by Baels in Austin, TX — styles, pricing, the consultation process, and aftercare.',
        },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then((m) => m.ContactComponent),
        title: 'Contact — Baels Tattoo',
        data: {
          description: 'Questions, collaborations, or anything else — reach out to Baels at Flying Tiger Tattoo in Austin, TX.',
        },
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found').then((m) => m.NotFoundComponent),
        title: 'Page Not Found — Baels Tattoo',
      },
    ],
  },
];