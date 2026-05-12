import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appCta]',
  host: {
    '[class.btn]':         'true',
    '[class.btn-primary]': "variant() === 'primary'",
    '[class.btn-outline]': "variant() === 'outline'",
  },
})
export class CtaButtonDirective {
  readonly variant = input<'primary' | 'outline'>('primary');
}
