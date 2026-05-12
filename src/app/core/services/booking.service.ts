import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);

  submit(payload: BookingPayload): Observable<void> {
    return this.http.post<void>('/api/bookings', payload);
  }
}
