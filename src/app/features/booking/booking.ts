import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule, RouterLink, SectionHeaderComponent],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);

  readonly submitted    = signal(false);
  readonly submitting   = signal(false);
  readonly error        = signal<string | null>(null);
  readonly selectedFiles = signal<File[]>([]);
  readonly fileError    = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name:      ['', [Validators.required, Validators.minLength(2)]],
    email:     ['', [Validators.required, Validators.email]],
    phone:     [''],
    idea:      ['', [Validators.required, Validators.minLength(20)]],
    style:     ['', Validators.required],
    placement: ['', Validators.required],
    size:      ['', Validators.required],
    referral:  [''],
  });

  readonly styles = [
    'Neotraditional',
    'Traditional',
    'Black & Grey',
    'Illustrative',
    'Realism',
    'Script / Lettering',
    'Not sure yet',
  ];

  readonly sizes = [
    'Small — under 3"',
    'Medium — 3–6"',
    'Large — 6–10"',
    'Extra Large / Full piece',
    'Not sure yet',
  ];

  readonly referralSources = ['Instagram', 'Word of mouth', 'Google', 'Other'];

  onFilesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const incoming = Array.from(input.files ?? []);
    input.value = '';

    const nonImages = incoming.filter(f => !f.type.startsWith('image/'));
    if (nonImages.length > 0) {
      this.fileError.set('Only image files (JPEG, PNG, WEBP) are accepted.');
      return;
    }

    const combined = [...this.selectedFiles(), ...incoming];
    if (combined.length > 3) {
      this.fileError.set('Maximum 3 reference images allowed.');
      this.selectedFiles.set(combined.slice(0, 3));
    } else {
      this.fileError.set(null);
      this.selectedFiles.set(combined);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.update(files => files.filter((_, i) => i !== index));
    this.fileError.set(null);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.bookingService.submit(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitted.set(true);
        this.submitting.set(false);
      },
      error: () => {
        this.error.set('Something went wrong. Please try again or reach out directly.');
        this.submitting.set(false);
      },
    });
  }
}
