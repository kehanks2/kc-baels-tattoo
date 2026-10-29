import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GOOGLE_REVIEW_URL } from '../../core/constants/google-profile';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
  protected readonly reviewUrl = GOOGLE_REVIEW_URL;
}