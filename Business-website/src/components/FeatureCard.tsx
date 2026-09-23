import type { CSSProperties, ElementType, ReactNode } from 'react';
import { isValidElement } from 'react';

type IconComponentType = ElementType;

interface FeatureCardProps {
  icon: ReactNode | IconComponentType;
  title: string;
  description: string;
  className?: string;
  style?: CSSProperties;
}

function FeatureCard({ icon, title, description, className = '', style }: FeatureCardProps) {
  const isComponent = typeof icon === 'function' || (typeof icon === 'object' && icon !== null && 'render' in icon);
  const IconComponent = isComponent ? (icon as IconComponentType) : null;
  const fallbackIcon = typeof icon === 'string' || typeof icon === 'number' || isValidElement(icon) ? icon : null;

  return (
    <div className={`card p-6 h-full ${className}`} style={style}>
      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 text-primary-600">
        {isComponent && IconComponent ? (
          <IconComponent className="w-6 h-6" aria-hidden={true} />
        ) : (
          <span className="text-xl">{fallbackIcon}</span>
        )}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;