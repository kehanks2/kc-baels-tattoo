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
        title: 'Kc Baels — Tattoo Artist | Austin, TX',
        data: {
          description: 'Custom tattoos rooted in intentional design. Kc Baels creates thoughtfully designed tattoos at Flying Tiger Tattoo in Austin, TX.',
        },
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/portfolio/portfolio').then((m) => m.PortfolioComponent),
        title: 'Portfolio — Kc Baels Tattoo',
        data: {
          description: 'Browse Kc Baels\' custom tattoo portfolio — blackwork, fine line, realism, color, and more. Based at Flying Tiger Tattoo in Austin, TX.',
        },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then((m) => m.AboutComponent),
        title: 'About — Kc Baels Tattoo',
        data: {
          description: 'Learn about Kc Baels, tattoo artist based at Flying Tiger Tattoo in Austin, TX. Every session starts with a conversation.',
        },
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./features/booking/booking').then((m) => m.BookingComponent),
        title: 'Book an Appointment — Kc Baels Tattoo',
        data: {
          description: 'Ready to start your custom tattoo? Submit a booking inquiry and Kc will be in touch within 2–3 business days to discuss your idea.',
        },
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/faq/faq').then((m) => m.FaqComponent),
        title: 'FAQ — Kc Baels Tattoo',
        data: {
          description: 'Common questions about booking, pricing, preparing for your session, aftercare, and Kc\'s design process.',
        },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then((m) => m.ContactComponent),
        title: 'Contact — Kc Baels Tattoo',
        data: {
          description: 'Get in touch with Kc Baels for general questions, collaboration inquiries, or press. Located at Flying Tiger Tattoo in Austin, TX.',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];