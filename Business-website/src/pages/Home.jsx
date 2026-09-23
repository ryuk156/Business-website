import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Globe, Calendar, ShoppingCart, Laptop, Lock, Settings, Users, Headphones } from 'lucide-react';
import { siteConfig } from '../config/site';
import { pricingPlans, laptopCategories } from '../data/pricing';
import { testimonials } from '../data/testimonials';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';
import Button from '../components/Button';

function Home() {
  const trustItems = [
    { icon: Globe, title: 'Professional Websites', description: 'Modern websites designed for small businesses.' },
    { icon: Calendar, title: 'Online Booking', description: 'Let customers book appointments online.' },
    { icon: ShoppingCart, title: 'E-Commerce', description: 'Sell products online with a professional storefront.' },
    { icon: Laptop, title: 'Refurbished Laptops', description: 'Affordable tested refurbished and open-box computers.' },
  ];

  const howItWorks = [
    { step: '01', title: 'Choose Your Plan', description: 'Choose the website package that fits your business.' },
    { step: '02', title: 'Tell Us About Your Business', description: 'Provide your business information, logo, images and content.' },
    { step: '03', title: 'We Build Your Website', description: 'We create and configure your professional website.' },
    { step: '04', title: 'Go Live', description: 'Your website goes live and we continue maintaining it for you.' },
  ];

  const whyChooseUs = [
    { icon: Lock, title: 'Affordable', description: 'Professional technology without a large upfront investment.' },
    { icon: Settings, title: 'Simple', description: 'Choose a plan that fits your business.' },
    { icon: Users, title: 'Built for Small Business', description: 'Practical technology designed around the needs of small businesses.' },
    { icon: Headphones, title: 'Ongoing Support', description: 'We\'re available after your website or laptop is delivered.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />

        <section className="section bg-white" aria-labelledby="trust-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 id="trust-heading" className="section-heading">Everything Your Business Needs to Get Online</h2>
              <p className="section-subheading">Four core services to help your business succeed online and offline.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustItems.map((item, index) => (
                <FeatureCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 bg-neutral-50" aria-labelledby="pricing-heading">
          <div className="container-custom">
            <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">Website plans</p>
                <h2 id="pricing-heading" className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                  Choose the right fit for your business
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-neutral-600 sm:pb-1 sm:text-right">
                Start small and upgrade as your business grows. Not sure which plan fits?{' '}
                <Link to="/get-started" className="font-medium text-primary-600 hover:text-primary-700">
                  We can help.
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={plan.id} plan={plan} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }} />
              ))}
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

        <section className="py-8 sm:py-10 bg-neutral-50" aria-labelledby="how-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 id="how-heading" className="section-heading">How It Works</h2>
              <p className="section-subheading">Get your business online in four simple steps.</p>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-primary-200" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {howItWorks.map((step, index) => (
                  <div
                    key={index}
                    className="relative z-10 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white ring-8 ring-neutral-50">
                      {step.step}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-neutral-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="laptops-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-7">
              <h2 id="laptops-heading" className="section-heading">Reliable Refurbished Laptops at Great Prices</h2>
              <p className="section-subheading">Professionally tested refurbished and open-box laptops for work, productivity and everyday business use.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {laptopCategories.map((category, index) => (
                <div key={category.id} className="card p-6 h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{category.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-neutral-900">${category.startingPrice}+</span>
                  </div>
                  <p className="text-neutral-600 mb-6">{category.description}</p>
                  <ul className="space-y-2 mb-6" role="list">
                    {category.features.slice(0, 5).map((feature, i) => (
                      <li key={i} className="text-sm text-neutral-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/laptops" className="btn-outline w-full text-center">
                    View {category.name} Laptops
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-neutral-500">Prices vary depending on model, specifications and availability.</p>
            <div className="mt-10 text-center">
              <Link to="/laptops">
                <Button size="lg">Shop Refurbished Laptops</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="bundle-heading">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="bundle-heading" className="text-3xl sm:text-4xl font-bold text-white mb-6">Your Website and Your Business Computer — All in One Place.</h2>
              <p className="text-primary-100 text-lg mb-10">Need a website and computers for your business? We can provide both.</p>
              <div className="mb-10 inline-block rounded-lg bg-white px-5 py-3 text-lg font-semibold text-primary-700 shadow-sm">
                Buy a $299 laptop and get your first month of the $35/month website free.
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                <div className="text-center p-6 bg-primary-700/50 rounded-xl">
                  <p className="text-primary-200 text-sm font-medium mb-1">Website</p>
                  <p className="text-3xl font-bold text-white">Starting at $35/month</p>
                </div>
                <span className="text-4xl font-bold text-primary-200 hidden md:block">+</span>
                <span className="text-4xl font-bold text-primary-200 md:hidden my-4">+</span>
                <div className="text-center p-6 bg-primary-700/50 rounded-xl">
                  <p className="text-primary-200 text-sm font-medium mb-1">Business Laptop</p>
                  <p className="text-3xl font-bold text-white">Starting at $299+</p>
                </div>
              </div>
              
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">One affordable technology partner instead of dealing with multiple providers.</p>
              <Link to="/get-started">
                <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="why-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 id="why-heading" className="section-heading">Why Choose {siteConfig.name}?</h2>
              <p className="section-subheading">We make technology simple, affordable, and reliable for small businesses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {whyChooseUs.map((item, index) => (
                <FeatureCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="testimonials-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 id="testimonials-heading" className="section-heading">What Our Customers Say</h2>
              <p className="section-subheading">Reviews from our Upwork clients.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }} />
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Choose a plan, tell us about your business, and we'll handle the rest.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-started">
                <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  Build Your Website
                </Button>
              </Link>
              <Link to="/laptops">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-700">
                  Shop Refurbished Laptops
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Home;