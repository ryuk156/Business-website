import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { lucideIcons } from '../utils/icons';
import { siteConfig } from '../config/site';
import { pricingPlans } from '../data/pricing';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function Appointment() {
  const plan = pricingPlans.find(p => p.id === 'appointment');
  const CheckIcon = lucideIcons.Check;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
              Most Popular
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Appointment Website
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl leading-relaxed">
              A professional website with online booking for appointment-based businesses. Let customers book 24/7 without phone calls.
            </p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl sm:text-5xl font-bold text-neutral-900">${plan.price}</span>
              <span className="text-neutral-500">{plan.period}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-started?plan=appointment">
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

        <section className="section bg-neutral-50" aria-labelledby="booking-heading">
          <div className="container-custom max-w-4xl">
            <div className="card p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-20 h-20 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <lucideIcons.Calendar className="w-10 h-10 text-primary-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">Online Booking Built In</h3>
                  <p className="text-neutral-600 mb-6 max-w-xl">
                    Customers can book appointments directly on your website 24/7. No phone tag, no missed calls. Automated confirmations, reminders, and calendar sync included.
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-700" role="list">
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Customizable booking forms</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Service selection & duration</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Staff/calendar management</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Email/SMS confirmations</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Automated reminders</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-primary-500" aria-hidden="true" />Google/Outlook calendar sync</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="perfect-heading">
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

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready for Online Booking?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Let customers book appointments 24/7. Starting at just $55/month.</p>
            <Link to="/get-started?plan=appointment">
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
    'Up to 6 pages': 'Home, About, Services, Booking, Contact, FAQ',
    'Online appointment booking': 'Full booking system with calendar management',
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

export default Appointment;