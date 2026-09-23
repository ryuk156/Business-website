import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { lucideIcons } from '../utils/icons';
import Button from './Button';
import { useCart } from '../context/useCart';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  recommendedFor?: string[];
  popular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
  style?: React.CSSProperties;
}

function PricingCard({ plan, className = '', style }: PricingCardProps) {
  const CheckIcon = lucideIcons.Check;
  const { addItem } = useCart();
  const [cartMessage, setCartMessage] = useState('');

  const handleAddToCart = () => {
    const added = addItem({ id: plan.id, type: 'subscription', name: plan.name, price: plan.price, period: plan.period });
    setCartMessage(added ? `${plan.name} added to your cart.` : 'Your cart already has a website plan. Remove it before choosing another.');
  };

  return (
    <article className={`relative card overflow-visible flex flex-col ${plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : ''} ${className}`} style={style}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
          <span className="badge badge-popular">Most Popular</span>
        </div>
      )}
      
      <div className={`p-5 sm:p-6 flex-1 flex flex-col ${plan.popular ? 'pt-7' : ''}`}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1.5">{plan.name}</h3>
          <p className="text-sm text-neutral-600">{plan.description}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl sm:text-4xl font-bold text-neutral-900">${plan.price}</span>
            <span className="text-sm text-neutral-500">{plan.period}</span>
          </div>
        </div>

        <ul className="space-y-2 mb-6 flex-1" role="list">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-neutral-600 text-xs sm:text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={plan.popular ? 'primary' : 'outline'}
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
          Add Plan to Cart
        </Button>
        {cartMessage && <p className="mt-2 text-center text-xs text-neutral-500" role="status">{cartMessage}</p>}
      </div>

      {plan.recommendedFor && (
        <div className="border-t border-neutral-200 p-5 sm:p-6">
          <h4 className="text-xs font-medium text-neutral-700 mb-2">Perfect for:</h4>
          <ul className="space-y-1" role="list">
            {plan.recommendedFor.map((business, index) => (
              <li key={index} className="text-xs text-neutral-600 flex items-center gap-2">
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