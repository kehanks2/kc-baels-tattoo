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
        title: 'KC Baels — Custom Tattoo Artist | Pflugerville, TX',
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/portfolio/portfolio').then((m) => m.PortfolioComponent),
        title: 'Portfolio — KC Baels Tattoo',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then((m) => m.AboutComponent),
        title: 'About — KC Baels Tattoo',
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./features/booking/booking').then((m) => m.BookingComponent),
        title: 'Book an Appointment — KC Baels Tattoo',
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/faq/faq').then((m) => m.FaqComponent),
        title: 'FAQ — KC Baels Tattoo',
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then((m) => m.ContactComponent),
        title: 'Contact — KC Baels Tattoo',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];