import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Globe, Calendar, ShoppingCart, Laptop, Lock, Settings, Users, Headphones, Monitor, Cpu, HardDrive, MemoryStick, Battery, CheckCheck, Sparkles, Zap, Shield } from 'lucide-react';
import { siteConfig } from '../config/site';
import { pricingPlans, laptopCategories, laptopFeatures } from '../data/pricing';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faq';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQAccordion from '../components/FAQAccordion';
import Button from '../components/Button';

function Home() {
  const trustItems = [
    { icon: Globe, title: 'Professional Websites', description: 'Modern websites designed for small businesses.' },
    { icon: Calendar, title: 'Online Booking', description: 'Let customers book appointments online.' },
    { icon: ShoppingCart, title: 'E-Commerce', description: 'Sell products online with a professional storefront.' },
    { icon: Laptop, title: 'Business Laptops', description: 'Affordable tested refurbished and open-box business computers.' },
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

  const missionServices = [
    { title: 'Professional websites from $35/month', description: 'Starter, Appointment, and E-Commerce websites with hosting, maintenance, and support included.', icon: Globe },
    { title: 'Affordable refurbished business laptops', description: 'Tested, cleaned, and ready-to-use business laptops starting at $299+.', icon: Laptop },
  ];

  const laptopFeatureIconMap = {
    'Windows 11': Monitor,
    'Business-class hardware': Cpu,
    'SSD storage': HardDrive,
    'RAM upgrade options': MemoryStick,
    'Battery health testing': Battery,
    'Hardware testing': CheckCheck,
    'Professional cleaning': Sparkles,
    'Ready-to-use setup': Zap,
    'Warranty options': Shield,
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />

        <section className="section bg-white" aria-labelledby="trust-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
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

        <section className="section bg-neutral-50" aria-labelledby="pricing-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="pricing-heading" className="section-heading">Choose the Website That Fits Your Business</h2>
              <p className="section-subheading">Start small and upgrade as your business grows.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <section className="section bg-neutral-50" aria-labelledby="how-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="how-heading" className="section-heading">How It Works</h2>
              <p className="section-subheading">Get your business online in four simple steps.</p>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute top-14 left-1/2 transform -translate-x-1/2 w-px h-[calc(100%-3.5rem)] bg-neutral-200" aria-hidden="true" />
              <div className="space-y-12 lg:space-y-0">
                {howItWorks.map((step, index) => (
                  <div key={index} className="relative flex flex-col lg:flex-row items-start gap-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold z-10 lg:mr-4">
                      {step.step}
                    </div>
                    <div className="flex-1 lg:w-1/2 lg:pr-8 lg:text-right lg:order-last">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                      <p className="text-neutral-600">{step.description}</p>
                    </div>
                    <div className="flex-1 lg:w-1/2 lg:pl-8">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                      <p className="text-neutral-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="laptops-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="laptops-heading" className="section-heading">Reliable Business Laptops Without the Business Price</h2>
              <p className="section-subheading">Professionally tested refurbished and open-box laptops for work, productivity and everyday business use.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                <Button size="lg">Shop Business Laptops</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="laptop-features-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="laptop-features-heading" className="section-heading">Every Laptop Includes</h2>
              <p className="section-subheading">Quality assurance and peace of mind with every purchase.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {laptopFeatures.map((feature, index) => {
                const IconComponent = laptopFeatureIconMap[feature.name] || Monitor;
                return (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-neutral-200 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-medium text-neutral-900 mt-1">{feature.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="bundle-heading">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="bundle-heading" className="text-3xl sm:text-4xl font-bold text-white mb-6">Your Website and Your Business Computer — All in One Place.</h2>
              <p className="text-primary-100 text-lg mb-10">Need a website and computers for your business? We can provide both.</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
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
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="why-heading" className="section-heading">Why Choose {siteConfig.name}?</h2>
              <p className="section-subheading">We make technology simple, affordable, and reliable for small businesses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
            <div className="max-w-2xl mx-auto text-center p-8 bg-primary-50 rounded-2xl">
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">One Technology Partner</h3>
              <p className="text-neutral-600">Websites, business laptops and more as your business grows.</p>
            </div>
          </div>
        </section>

        <section className="section bg-neutral-900" aria-labelledby="mission-heading">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="mission-heading" className="text-3xl sm:text-4xl font-bold text-white mb-6">Technology Made Simple for Small Business.</h2>
              <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">We make professional websites and reliable business technology accessible without expensive upfront costs.</p>
              <p className="text-primary-200 mb-8">We start with two core services:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                {missionServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-neutral-800/50 rounded-xl text-left min-w-[280px]">
                    <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0 text-white">
                      <service.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{service.title}</p>
                      <p className="text-primary-200 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-primary-200 text-lg">As your business grows, we can grow with you.</p>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="testimonials-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="testimonials-heading" className="section-heading">What Our Customers Say</h2>
              <p className="section-subheading">Placeholder testimonials — replace with real customer feedback.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }} />
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="faq-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="faq-heading" className="section-heading">Frequently Asked Questions</h2>
              <p className="section-subheading">Quick answers to common questions.</p>
            </div>
            <FAQAccordion faqs={faqs} />
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
                  Shop Business Laptops
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;