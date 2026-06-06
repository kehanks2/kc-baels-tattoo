import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  label: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  imports: [RouterLink, SectionHeaderComponent],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  readonly openId = signal<string | null>(null);

  toggle(id: string): void {
    this.openId.update(current => (current === id ? null : id));
  }

  readonly categories: FaqCategory[] = [
    {
      label: 'Booking & Consultations',
      items: [
        {
          id: 'booking-1',
          question: 'How do I book an appointment?',
          answer:
            'Fill out the booking form with your idea, preferred placement, and a few reference images. You\'ll hear back to confirm availability and schedule a consultation. Walk-ins are not accepted — all work is by appointment only.',
        },
        {
          id: 'booking-2',
          question: 'What happens during a consultation?',
          answer:
            "Consultations are a chance to talk through your idea before any commitment is made. Baels will discuss size, placement, style, and what to realistically expect from the process. You'll leave with a clear sense of the design direction, timeline, and total cost — no pressure.",
        },
        {
          id: 'booking-3',
          question: 'Is a deposit required to hold my appointment?',
          answer:
            'Yes. A non-refundable deposit is required to secure your spot after your consultation. It goes toward the final cost of your tattoo and ensures time is set aside to draw your design.',
        },
        {
          id: 'booking-4',
          question: 'What is the cancellation and rescheduling policy?',
          answer:
            'At least 48 hours notice is required to reschedule. No-shows forfeit their deposit. Repeated last-minute cancellations may affect your ability to book future appointments.',
        },
      ],
    },
    {
      label: 'Pricing',
      items: [
        {
          id: 'pricing-1',
          question: 'How much does a tattoo cost?',
          answer:
            'Pricing depends on size, complexity, and placement. Larger pieces are quoted at a day rate; smaller work starts at a studio minimum. The most accurate way to get a quote is to submit a booking inquiry with your idea and reference images.',
        },
        {
          id: 'pricing-2',
          question: 'Is the custom design included in the price?',
          answer:
            'Yes. Every piece is drawn specifically for you — the design work is part of the process, not a separate charge.',
        },
        {
          id: 'pricing-3',
          question: 'What payment methods are accepted?',
          answer:
            'Cash and major credit/debit cards are both accepted. Deposits can be paid by card when your appointment is confirmed.',
        },
      ],
    },
    {
      label: 'Preparing for Your Session',
      items: [
        {
          id: 'prep-1',
          question: 'How should I prepare the day of my appointment?',
          answer:
            "Eat a full meal and stay hydrated before you come in. Wear clothing that gives easy access to the area being tattooed — loose layers work best. Moisturize the area in the days leading up, but skip lotion on the day of. Getting a solid night's sleep makes a bigger difference than most people expect.",
        },
        {
          id: 'prep-2',
          question: 'What should I avoid before getting tattooed?',
          answer:
            'Avoid alcohol for at least 24 hours before your session — it thins the blood and slows healing. Avoid aspirin and ibuprofen for the same reason. Keep the area out of prolonged sun or avoid sunburn for at least a week prior.',
        },
        {
          id: 'prep-3',
          question: 'Can I bring someone with me?',
          answer:
            'One guest is welcome. The studio space at Flying Tiger Tattoo is comfortable but intimate, so please keep it to one person.',
        },
      ],
    },
    {
      label: 'The Session',
      items: [
        {
          id: 'session-1',
          question: 'How long will my session take?',
          answer:
            'Small pieces typically take 1–2 hours. Larger or more detailed work may be spread across multiple sessions. You\'ll get a realistic time estimate during your consultation so you can plan accordingly.',
        },
        {
          id: 'session-2',
          question: 'How much does it hurt?',
          answer:
            'Pain varies by placement and individual tolerance. Areas over bone — ribs, spine, feet, hands — tend to be more intense. Fleshier spots are generally more comfortable. Most people find the experience very manageable, especially with breaks.',
        },
        {
          id: 'session-3',
          question: 'Can I take breaks during the session?',
          answer:
            "Yes, and you should whenever you need one. Just say the word if you need a moment to eat a snack, drink some water, or step away for a bit. Short breaks are completely normal and won't affect the quality of the work.",
        },
      ],
    },
    {
      label: 'Aftercare & Healing',
      items: [
        {
          id: 'aftercare-1',
          question: 'What do I do after my tattoo?',
          answer:
            "You'll leave with detailed aftercare instructions. The essentials: keep it clean, apply a thin layer of unscented lotion, avoid direct sunlight and standing water — pools, ocean, and baths — and don't scratch or pick at the skin as it heals.",
        },
        {
          id: 'aftercare-2',
          question: 'How long does a tattoo take to heal?',
          answer:
            'The surface heals in roughly 2–3 weeks. Full dermal healing takes 3–6 months. During the peeling and flaking phase, colors may look dull or faded — this is completely normal. The final result reveals itself once the skin fully settles.',
        },
        {
          id: 'aftercare-3',
          question: 'Do you offer touch-ups?',
          answer:
            'Yes. If your tattoo heals with light or patchy spots — which occasionally happens depending on skin type and aftercare — Baels offers a complimentary touch-up within 3 months of your original session.',
        },
      ],
    },
    {
      label: 'Design & Style',
      items: [
        {
          id: 'design-1',
          question: 'Can I bring reference images?',
          answer:
            "Absolutely — references are encouraged. They communicate the mood, style, and direction you're going for without needing to put it all into words. Pinterest boards, saved photos, sketches, and screenshots are all welcome.",
        },
        {
          id: 'design-2',
          question: 'Will my tattoo look exactly like my reference?',
          answer:
            "References are used as direction, not as templates to copy. Baels will adapt the concept to work as a tattoo on your specific placement — which sometimes means simplifying details or adjusting proportions. The result will feel true to your vision while being built to last on skin.",
        },
        {
          id: 'design-3',
          question: 'What styles does Baels specialize in?',
          answer:
            "Primary styles are neotraditional, traditional, blackwork, and illustrative work. If your idea sits outside those categories, reach out anyway — he takes on select projects outside the usual scope.",
        },
        {
          id: 'design-4',
          question: 'Can Baels tattoo over an existing tattoo or scar?',
          answer:
            'Cover-ups and scar work are evaluated on a case-by-case basis. They depend on the size, darkness, and age of the existing ink or scar tissue. Include a clear photo in your booking inquiry for an honest assessment of what\'s possible.',
        },
      ],
    },
  ];
}
