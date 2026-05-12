import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, SectionHeaderComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly submitted  = signal(false);
  readonly submitting = signal(false);
  readonly error      = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    topic:   ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly topics = [
    'General Question',
    'Collaboration / Guest Spot',
    'Press Inquiry',
    'Other',
  ];

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.contactService.submit(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitted.set(true);
        this.submitting.set(false);
      },
      error: () => {
        this.error.set('Something went wrong. Please try again or email us directly.');
        this.submitting.set(false);
      },
    });
  }
}
