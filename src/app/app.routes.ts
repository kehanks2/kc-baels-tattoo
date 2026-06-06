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
          description: 'Custom tattoos rooted in intentional design. Baels creates thoughtfully designed tattoos at Flying Tiger Tattoo in Austin, TX.',
        },
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/portfolio/portfolio').then((m) => m.PortfolioComponent),
        title: 'Portfolio — Baels Tattoo',
        data: {
          description: 'Browse Baels\' custom tattoo portfolio — blackwork, fine line, realism, color, and more. Based at Flying Tiger Tattoo in Austin, TX.',
        },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then((m) => m.AboutComponent),
        title: 'About — Baels Tattoo',
        data: {
          description: 'Learn about Baels, tattoo artist based at Flying Tiger Tattoo in Austin, TX. Every session starts with a conversation.',
        },
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./features/booking/booking').then((m) => m.BookingComponent),
        title: 'Book an Appointment — Baels Tattoo',
        data: {
          description: 'Ready to start your custom tattoo? Submit a booking inquiry and Baels will be in touch within 2–3 business days to discuss your idea.',
        },
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/faq/faq').then((m) => m.FaqComponent),
        title: 'FAQ — Baels Tattoo',
        data: {
          description: 'Common questions about booking, pricing, preparing for your session, aftercare, and Baels\' design process.',
        },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then((m) => m.ContactComponent),
        title: 'Contact — Baels Tattoo',
        data: {
          description: 'Get in touch with Baels for general questions, collaboration inquiries, or press. Located at Flying Tiger Tattoo in Austin, TX.',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];