import { Quote } from 'lucide-react';
import { lucideIcons } from '../utils/icons';

function TestimonialCard({ testimonial }) {
  const QuoteIcon = lucideIcons.Quote;

  return (
    <article className="card p-6 sm:p-8 relative">
      <QuoteIcon className="w-10 h-10 text-primary-100 mb-4" aria-hidden="true" />
      <blockquote className="text-neutral-700 leading-relaxed mb-6 text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <footer>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
            {testimonial.initials}
          </div>
          <div>
            <p className="font-medium text-neutral-900">{testimonial.author}</p>
            <p className="text-sm text-neutral-500">{testimonial.business}</p>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default TestimonialCard;