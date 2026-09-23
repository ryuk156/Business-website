import { Link } from 'react-router-dom';
import { Globe, Laptop, Users, Heart, Target, Zap, CheckCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { pricingPlans, laptopCategories } from '../data/pricing';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

function About() {
  const values = [
    { icon: Heart, title: 'Small Business First', description: 'Every decision we make starts with the needs of small business owners.' },
    { icon: Target, title: 'Simple & Transparent', description: 'Clear pricing, no hidden fees, no long-term contracts. Just straightforward technology.' },
    { icon: Zap, title: 'Quality Without Compromise', description: 'Professional websites and tested laptops that meet business-grade standards.' },
    { icon: Users, title: 'Long-term Partnership', description: 'We\'re not just a vendor. We\'re your technology partner as you grow.' },
  ];

  const team = [
    { name: 'Founder & CEO', role: 'Leads vision and customer relationships' },
    { name: 'Lead Developer', role: 'Builds and maintains all websites' },
    { name: 'Hardware Specialist', role: 'Tests and certifies every laptop' },
    { name: 'Support Lead', role: 'Ensures ongoing customer success' },
  ];

  const milestones = [
    { year: '2024', title: 'Company Founded', description: 'Started with a mission to make technology affordable for small businesses.' },
    { year: '2024', title: 'First 50 Websites', description: 'Launched professional websites for local service businesses across Canada.' },
    { year: '2024', title: 'Laptop Program Launched', description: 'Added refurbished business laptops to help businesses equip their teams affordably.' },
    { year: '2025', title: 'Appointment & E-Commerce', description: 'Expanded website offerings to include booking and online store solutions.' },
  ];

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
            <h2 id="mission-heading" className="section-heading text-center mb-12">Our Mission</h2>
            <div className="prose prose-neutral max-w-none">
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Small businesses are the backbone of the Canadian economy, but they're often underserved by technology providers who focus on enterprise clients or sell cookie-cutter solutions.
              </p>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                We started {siteConfig.name} to change that. Our mission is simple: provide professional websites, reliable business laptops, and ongoing support — all at prices small businesses can afford, with no large upfront costs.
              </p>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                We believe technology should be a tool that helps your business grow, not a burden that holds it back. That's why we handle the technical complexity so you can focus on what you do best: running your business.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="values-heading">
          <div className="container-custom">
            <h2 id="values-heading" className="section-heading text-center mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="card p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 text-primary-600">
                    <value.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="services-heading">
          <div className="container-custom">
            <h2 id="services-heading" className="section-heading text-center mb-16">What We Do</h2>
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
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Business Laptops</h3>
                <p className="text-neutral-600 mb-6">Professionally tested refurbished and open-box business laptops. Every unit is cleaned, tested, and ready for work.</p>
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

        <section className="section bg-neutral-900" aria-labelledby="team-heading">
          <div className="container-custom">
            <h2 id="team-heading" className="section-heading text-white text-center mb-16">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4 text-primary-600 font-bold text-2xl">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-200 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="journey-heading">
          <div className="container-custom max-w-3xl">
            <h2 id="journey-heading" className="section-heading text-center mb-16">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 relative">
                  <div className="flex-shrink-0 w-20 text-right pt-1">
                    <span className="text-2xl font-bold text-primary-600">{milestone.year}</span>
                  </div>
                  <div className="flex-1 border-l-2 border-neutral-200 pl-6 pb-8 relative">
                    <div className="absolute left-[-10px] top-1 w-4 h-4 rounded-full bg-primary-600 border-4 border-white" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-1">{milestone.title}</h3>
                    <p className="text-neutral-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
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

      <Footer />
    </div>
  );
}

export default About;