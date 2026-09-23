function FeatureCard({ icon, title, description, className = '' }) {
  const isComponent = typeof icon === 'function' || (icon && typeof icon === 'object');
  const IconComponent = isComponent ? icon : null;

  return (
    <div className={`card p-6 h-full ${className}`}>
      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 text-primary-600">
        {isComponent ? (
          <IconComponent className="w-6 h-6" aria-hidden="true" />
        ) : (
          <span className="text-xl">{icon}</span>
        )}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;