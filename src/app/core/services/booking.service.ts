import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  idea: string;
  style: string;
  placement: string;
  size: string;
  referral: string;
}

// Replace with the form ID from your Formspree dashboard (formspree.io/forms)
const BOOKING_FORM_ID = 'xdaqaqyn';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);

  submit(payload: BookingPayload): Observable<void> {
    return this.http
      .post<{ ok: boolean }>(
        `https://formspree.io/f/${BOOKING_FORM_ID}`,
        payload,
        { headers: new HttpHeaders({ Accept: 'application/json' }) }
      )
      .pipe(map(() => undefined));
  }
}
