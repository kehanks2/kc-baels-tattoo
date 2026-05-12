import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, SectionHeaderComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  readonly submitted = signal(false);

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
    // TODO: POST to backend API
    this.submitted.set(true);
  }
}
