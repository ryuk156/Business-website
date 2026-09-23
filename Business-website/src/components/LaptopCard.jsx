import { Link } from 'react-router-dom';
import { ExternalLink, Check } from 'lucide-react';
import { lucideIcons } from '../utils/icons';

function LaptopCard({ laptop }) {
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
    <article className="card flex flex-col overflow-hidden">
      <div className="relative aspect-video bg-neutral-100 overflow-hidden">
        <img
          src={laptop.image}
          alt={`${laptop.brand} ${laptop.model}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
          <Link
            to={`/laptops/${laptop.id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default LaptopCard;