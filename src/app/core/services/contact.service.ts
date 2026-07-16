import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
}

// Replace with the form ID from your Formspree dashboard (formspree.io/forms)
const CONTACT_FORM_ID = 'mqererwa';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  submit(payload: ContactPayload): Observable<void> {
    return this.http
      .post<{ ok: boolean }>(
        `https://formspree.io/f/${CONTACT_FORM_ID}`,
        payload,
        { headers: new HttpHeaders({ Accept: 'application/json' }) }
      )
      .pipe(map(() => undefined));
  }
}
