import { Link } from 'react-router-dom';
import { Globe, Calendar, ShoppingCart } from 'lucide-react';
import { siteConfig } from '../config/site';
import { pricingPlans } from '../data/pricing';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import PricingCard from '../components/PricingCard';

function Websites() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Professional Websites for{' '}
              <span className="text-primary-600">Small Business</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Three website packages designed to grow with your business. All plans include hosting, maintenance, SSL, and ongoing support.
            </p>
            <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden="true"></span>
              Starting at $35/month • No large upfront cost • Hosting included
            </p>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="compare-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 id="compare-heading" className="section-heading">Compare Website Plans</h2>
              <p className="section-subheading">Choose the plan that matches your business needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={plan.id} plan={plan} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }} />
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="details-heading">
          <div className="container-custom">
            <h2 id="details-heading" className="section-heading text-center mb-10">Explore Each Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => {
                const IconComponent = plan.id === 'starter' ? Globe : plan.id === 'appointment' ? Calendar : ShoppingCart;
                return (
                  <Link key={plan.id} to={`/websites/${plan.id}`} className="card p-8 h-full hover:shadow-lg transition-shadow duration-300 group">
                    <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">{plan.name}</h3>
                    <p className="text-neutral-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-2xl font-bold text-neutral-900">${plan.price}</span>
                      <span className="text-neutral-500">{plan.period}</span>
                    </div>
                    <ul className="space-y-2 mb-6" role="list">
                      {plan.features.slice(0, 5).map((feature, i) => (
                        <li key={i} className="text-sm text-neutral-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                      <li className="text-sm text-primary-600 font-medium">+ {plan.features.length - 5} more features</li>
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-medium group-hover:underline">Learn more</span>
                      <span className="text-primary-600" aria-hidden="true">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="domain-heading">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 id="domain-heading" className="section-heading">Already Have a Domain? Bring It With You.</h2>
              <p className="section-subheading">Already have a domain? We'll connect it to your new website.</p>
              <p className="mt-4 text-neutral-600">Don't have a domain? No problem. We can help you purchase and set up a domain for your business.</p>
              <p className="mt-2 text-sm text-neutral-500">Domain registration fees may apply.</p>
              <div className="mt-8">
                <Link to="/get-started">
                  <Button size="lg">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Your Business Online?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Choose a plan, tell us about your business, and we'll handle the rest.</p>
            <Link to="/get-started">
              <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Websites;