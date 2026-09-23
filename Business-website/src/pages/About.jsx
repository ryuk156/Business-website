import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Laptop, Users, Heart, Target, Zap, CheckCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { pricingPlans, laptopCategories } from '../data/pricing';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function About() {
  const values = [
    { icon: Heart, title: 'Small Business First', description: 'Every decision we make starts with the needs of small business owners.', detail: 'You get practical recommendations built around your goals, budget, and day-to-day work — not a one-size-fits-all package.' },
    { icon: Target, title: 'Simple & Transparent', description: 'Clear pricing, no hidden fees, no long-term contracts. Just straightforward technology.', detail: 'We explain what you are getting, what it costs, and what happens next so you can make confident decisions.' },
    { icon: Zap, title: 'Quality Without Compromise', description: 'Professional websites and tested laptops that meet business-grade standards.', detail: 'Every project and device is reviewed with care so your technology is dependable from day one.' },
    { icon: Users, title: 'Long-term Partnership', description: 'We\'re not just a vendor. We\'re your technology partner as you grow.', detail: 'As your needs change, we stay available to improve, maintain, and expand the tools your business relies on.' },
  ];
  const [selectedValue, setSelectedValue] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              About {siteConfig.name}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl leading-relaxed">
              We make professional technology accessible to small businesses without the enterprise price tag.
            </p>
            <p className="text-primary-600 font-medium">{siteConfig.tagline}</p>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="mission-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="mission-heading" className="section-heading text-center mb-8">Our Mission</h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Small businesses are the backbone of the Canadian economy, but they're often underserved by technology providers who focus on enterprise clients or sell cookie-cutter solutions.
              </p>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                We started {siteConfig.name} to change that. Our mission is simple: provide professional websites, reliable refurbished laptops, and ongoing support — all at prices small businesses can afford, with no large upfront costs.
              </p>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                We believe technology should be a tool that helps your business grow, not a burden that holds it back. That's why we handle the technical complexity so you can focus on what you do best: running your business.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="values-heading">
          <div className="container-custom">
            <h2 id="values-heading" className="section-heading text-center mb-10">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="tablist" aria-label="Our values">
              {values.map((value, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={selectedValue === index}
                  aria-controls="value-panel"
                  onClick={() => setSelectedValue(index)}
                  className={`card p-6 h-full text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    selectedValue === index ? 'border-primary-500 shadow-lg -translate-y-1' : 'hover:-translate-y-1'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 text-primary-600">
                    <value.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </button>
              ))}
            </div>
            <div
              id="value-panel"
              role="tabpanel"
              aria-live="polite"
              className="mt-8 mx-auto max-w-3xl rounded-xl border border-primary-100 bg-primary-50 p-6 text-center animate-in"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
                Why it matters
              </p>
              <p className="mt-2 text-lg leading-relaxed text-neutral-700">
                {values[selectedValue].detail}
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="services-heading">
          <div className="container-custom">
            <h2 id="services-heading" className="section-heading text-center mb-10">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card p-8">
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6 text-primary-600">
                  <Globe className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Professional Websites</h3>
                <p className="text-neutral-600 mb-6">Modern, mobile-friendly websites with hosting, maintenance, SSL, and support included. From simple starter sites to full e-commerce stores.</p>
                <ul className="space-y-2" role="list">
                  {pricingPlans.map(plan => (
                    <li key={plan.id} className="flex items-center gap-2 text-sm text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
                      <span>{plan.name} — ${plan.price}{plan.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-8">
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6 text-primary-600">
                  <Laptop className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Refurbished Laptops</h3>
                <p className="text-neutral-600 mb-6">Professionally tested refurbished and open-box laptops. Every unit is cleaned, tested, and ready for work.</p>
                <ul className="space-y-2" role="list">
                  {laptopCategories.map(cat => (
                    <li key={cat.id} className="flex items-center gap-2 text-sm text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
                      <span>{cat.name} — Starting at ${cat.startingPrice}+</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Whether you need a website, laptops, or both — we're here to help your business succeed.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-started">
                <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-700">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default About;