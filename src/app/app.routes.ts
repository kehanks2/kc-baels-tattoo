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
        data: {
          description: 'Custom tattoos rooted in intentional design. KC Baels creates blackwork, fine line, and realism tattoos at Flying Tiger Tattoo in Pflugerville, TX.',
        },
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./features/portfolio/portfolio').then((m) => m.PortfolioComponent),
        title: 'Portfolio — KC Baels Tattoo',
        data: {
          description: 'Browse KC Baels\' custom tattoo portfolio — blackwork, fine line, realism, color, and more. Based at Flying Tiger Tattoo in Pflugerville, TX.',
        },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then((m) => m.AboutComponent),
        title: 'About — KC Baels Tattoo',
        data: {
          description: 'Learn about KC Baels, custom tattoo artist based at Flying Tiger Tattoo in Pflugerville, TX. Every session starts with a conversation.',
        },
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./features/booking/booking').then((m) => m.BookingComponent),
        title: 'Book an Appointment — KC Baels Tattoo',
        data: {
          description: 'Ready to start your custom tattoo? Submit a booking inquiry and KC will be in touch within 2–3 business days to discuss your idea.',
        },
      },
      {
        path: 'faq',
        loadComponent: () =>
          import('./features/faq/faq').then((m) => m.FaqComponent),
        title: 'FAQ — KC Baels Tattoo',
        data: {
          description: 'Common questions about booking, pricing, preparing for your session, aftercare, and KC\'s design process.',
        },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact').then((m) => m.ContactComponent),
        title: 'Contact — KC Baels Tattoo',
        data: {
          description: 'Get in touch with KC Baels for general questions, collaboration inquiries, or press. Located at Flying Tiger Tattoo in Pflugerville, TX.',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];