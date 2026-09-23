import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { lucideIcons } from '../utils/icons';
import Button from './Button';

function PricingCard({ plan, className = '' }) {
  const CheckIcon = lucideIcons.Check;

  return (
    <article className={`relative card flex flex-col ${plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : ''} ${className}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge badge-popular">Most Popular</span>
        </div>
      )}
      
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">{plan.name}</h3>
          <p className="text-neutral-600">{plan.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl sm:text-5xl font-bold text-neutral-900">${plan.price}</span>
            <span className="text-neutral-500">{plan.period}</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-1" role="list">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-neutral-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to={plan.ctaLink}>
          <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full" size="lg">
            {plan.cta}
          </Button>
        </Link>
      </div>

      {plan.recommendedFor && (
        <div className="border-t border-neutral-200 p-6 sm:p-8">
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Perfect for:</h4>
          <ul className="space-y-1.5" role="list">
            {plan.recommendedFor.map((business, index) => (
              <li key={index} className="text-sm text-neutral-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" aria-hidden="true" />
                {business}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default PricingCard;