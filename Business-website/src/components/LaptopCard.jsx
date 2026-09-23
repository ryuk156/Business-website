import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/useCart';

function LaptopCard({ laptop }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const savings = laptop.originalPrice - laptop.price;
  const savingsPercent = Math.round((savings / laptop.originalPrice) * 100);

  const categoryLabels = {
    essential: 'Essential',
    business: 'Business',
    professional: 'Professional',
  };

  const categoryColors = {
    essential: 'bg-blue-100 text-blue-800',
    business: 'bg-green-100 text-green-800',
    professional: 'bg-purple-100 text-purple-800',
  };

  const conditionColors = {
    'Refurbished': 'bg-amber-100 text-amber-800',
    'Open Box': 'bg-green-100 text-green-800',
    'New': 'bg-blue-100 text-blue-800',
  };

  return (
    <article
      className="card group flex cursor-pointer flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/laptops/${laptop.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(`/laptops/${laptop.id}`);
        }
      }}
      aria-label={`View details for ${laptop.brand} ${laptop.model}`}
    >
      <div className="relative aspect-video bg-neutral-100 overflow-hidden">
        <img
          src={laptop.image}
          alt={`${laptop.brand} ${laptop.model}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <span className={`badge ${categoryColors[laptop.category] || 'bg-neutral-100 text-neutral-800'}`}>
            {categoryLabels[laptop.category] || laptop.category}
          </span>
          <span className={`badge ${conditionColors[laptop.condition] || 'bg-neutral-100 text-neutral-800'}`}>
            {laptop.condition}
          </span>
        </div>
        {savings > 0 && (
          <div className="absolute bottom-3 left-3 bg-primary-600 text-white px-2 py-1 rounded text-sm font-medium">
            Save {savingsPercent}% (${savings.toFixed(2)})
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-semibold text-neutral-900 text-lg">{laptop.brand} {laptop.model}</h3>
            <p className="text-sm text-neutral-500">{laptop.cpu}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-neutral-600">
            <span className="w-4 h-4" aria-hidden="true">💾</span>
            <span>{laptop.ram} RAM</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <span className="w-4 h-4" aria-hidden="true">💿</span>
            <span>{laptop.storage}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <span className="w-4 h-4" aria-hidden="true">🖥️</span>
            <span>{laptop.screen}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <span className="w-4 h-4" aria-hidden="true">⚡</span>
            <span>Windows 11</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 mt-auto">
          <div>
            <span className="text-2xl font-bold text-neutral-900">${laptop.price.toFixed(2)}</span>
            {laptop.originalPrice > laptop.price && (
              <span className="ml-2 text-sm text-neutral-400 line-through">${laptop.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              addItem({ id: laptop.id, type: 'product', name: `${laptop.brand} ${laptop.model}`, price: laptop.price, image: laptop.image });
            }}
            className="group/cart inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-primary-700 hover:to-primary-600 hover:shadow-lg hover:shadow-primary-500/35 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover/cart:scale-110" aria-hidden="true" />
            Add to Cart
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cart:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default LaptopCard;