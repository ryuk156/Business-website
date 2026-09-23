import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { lucideIcons } from '../utils/icons';
import { siteConfig } from '../config/site';
import { pricingPlans } from '../data/pricing';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

function Ecommerce() {
  const plan = pricingPlans.find(p => p.id === 'ecommerce');
  const CheckIcon = lucideIcons.Check;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              E-Commerce Website
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl leading-relaxed">
              A complete online store for businesses ready to sell products online. Professional storefront, secure checkout, and payment integration.
            </p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl sm:text-5xl font-bold text-neutral-900">${plan.price}</span>
              <span className="text-neutral-500">{plan.period}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-started?plan=ecommerce">
                <Button size="lg" className="w-full sm:w-auto group">
                  Start Selling Online
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
            <h2 id="features-heading" className="section-heading mb-12">What's Included</h2>
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

        <section className="section bg-neutral-50" aria-labelledby="store-heading">
          <div className="container-custom max-w-4xl">
            <div className="card p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-20 h-20 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <lucideIcons.ShoppingCart className="w-10 h-10 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">Complete Online Store</h3>
                  <p className="text-neutral-600 mb-6 max-w-xl">
                    Everything you need to sell online: product catalog, shopping cart, secure checkout, payment processing, inventory management, and order tracking.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-700" role="list">
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Unlimited products & categories</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Product variants (size, color, etc.)</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Inventory tracking & low stock alerts</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Secure checkout (Stripe/PayPal)</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Order management & fulfillment</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Customer accounts & order history</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Shipping & tax calculations</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Coupon codes & discounts</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Abandoned cart recovery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="perfect-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="perfect-heading" className="section-heading text-center mb-12">Perfect For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plan.recommendedFor.map((business, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-neutral-200 text-center hover:border-primary-300 transition-colors">
                  <p className="font-medium text-neutral-900">{business}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Selling Online?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Launch your professional online store starting at just $99/month.</p>
            <Link to="/get-started?plan=ecommerce">
              <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                Start Selling Online
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function getFeatureDescription(feature) {
  const descriptions = {
    'Up to 8 pages': 'Home, Shop, Product, Cart, Checkout, Account, About, Contact',
    'Online store': 'Full e-commerce platform with product catalog',
    'Product pages': 'Detailed product pages with galleries, variants, reviews',
    'Shopping cart': 'Persistent cart with saved items',
    'Checkout': 'Streamlined, mobile-optimized checkout flow',
    'Payment integration': 'Stripe, PayPal, and other payment gateways',
    'Mobile-friendly design': 'Responsive design that works on all devices',
    'Fast & secure hosting': 'Canadian hosting with 99.9% uptime',
    'SSL certificate': 'Free SSL certificate for security and SEO',
    'Basic SEO setup': 'Meta tags, sitemap, and search console setup',
    'Domain connection': 'We connect your domain or help you buy one',
    'Website maintenance': 'Core updates, security patches, backups',
    'Up to 5 minor updates/month': 'Text, images, product updates, content changes',
    'Technical support': 'Email and phone support during business hours',
  };
  return descriptions[feature] || '';
}

export default Ecommerce;