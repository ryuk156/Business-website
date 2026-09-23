import { Link } from 'react-router-dom';
import { Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { lucideIcons } from '../utils/icons';
import { siteConfig } from '../config/site';
import { pricingPlans } from '../data/pricing';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function Starter() {
  const plan = pricingPlans.find(p => p.id === 'starter');
  const CheckIcon = lucideIcons.Check;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              Most Popular Starting Point
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Starter Website
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl leading-relaxed">
              A professional online presence for businesses that need a simple website. Perfect for service businesses, contractors, and local companies.
            </p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl sm:text-5xl font-bold text-neutral-900">${plan.price}</span>
              <span className="text-neutral-500">{plan.period}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-started?plan=starter">
                <Button size="lg" className="w-full sm:w-auto group">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/websites" className="btn-secondary w-full sm:w-auto">
                View All Plans
              </Link>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="features-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="features-heading" className="section-heading mb-8">What's Included</h2>
            <div className="space-y-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <CheckIcon className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-neutral-900">{feature}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      {getFeatureDescription(feature)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="perfect-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="perfect-heading" className="section-heading text-center mb-8">Perfect For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plan.recommendedFor.map((business, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-neutral-200 text-center hover:border-primary-300 transition-colors">
                  <p className="font-medium text-neutral-900">{business}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="process-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="process-heading" className="section-heading text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Choose Starter Plan', description: 'Select the Starter Website at $35/month.' },
                { step: '02', title: 'Share Your Content', description: 'Provide business info, logo, images, and text.' },
                { step: '03', title: 'We Build It', description: 'We create your professional 3-page website.' },
                { step: '04', title: 'Launch & Maintain', description: 'Your site goes live with ongoing support.' },
              ].map((step, index) => (
                <div key={index} className="text-center p-6 relative">
                  <div className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm">{step.description}</p>
                  {index < 3 && <div className="hidden md:block absolute top-7 right-[-40%] w-[80%] h-px bg-neutral-200" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready for Your Starter Website?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Get a professional online presence starting at just $35/month.</p>
            <Link to="/get-started?plan=starter">
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

function getFeatureDescription(feature) {
  const descriptions = {
    'Up to 3 pages': 'Home, About, Contact — or your choice of 3 pages',
    'Mobile-friendly design': 'Responsive design that works on all devices',
    'Fast & secure hosting': 'Canadian hosting with 99.9% uptime',
    'SSL certificate': 'Free SSL certificate for security and SEO',
    'Contact form': 'Custom contact form with spam protection',
    'Basic SEO setup': 'Meta tags, sitemap, and search console setup',
    'Domain connection': 'We connect your domain or help you buy one',
    'Website maintenance': 'Core updates, security patches, backups',
    'Up to 5 minor updates/month': 'Text, images, hours, contact info changes',
    'Technical support': 'Email and phone support during business hours',
  };
  return descriptions[feature] || '';
}

export default Starter;