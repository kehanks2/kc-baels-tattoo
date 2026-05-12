import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  template: `
    <section class="section container">
      <p class="section-label">Get Started</p>
      <h1 class="section-title">Book an Appointment</h1>
      <p>Reactive booking form with file upload — coming soon.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {}