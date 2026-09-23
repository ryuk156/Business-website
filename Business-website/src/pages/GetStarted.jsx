import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { lucideIcons } from '../utils/icons';
import { siteConfig } from '../config/site';
import { pricingPlans } from '../data/pricing';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import ContactForm from '../components/ContactForm';

function GetStarted() {
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    hasWebsite: '',
    hasDomain: '',
    selectedPlan: '',
    additionalInfo: '',
  });

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      const plan = pricingPlans.find(p => p.id === planParam);
      if (plan) setSelectedPlan(plan);
    }
  }, [searchParams]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
    setFormData(prev => ({ ...prev, selectedPlan: plan.name }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Get Started submission:', { plan: selectedPlan, ...formData });
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        businessType: '',
        hasWebsite: '',
        hasDomain: '',
        selectedPlan: '',
        additionalInfo: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CheckIcon = lucideIcons.Check;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Let&apos;s Get Your Business Online
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Choose a website plan, tell us about your business, and we&apos;ll handle the rest. No technical experience needed.
            </p>
          </div>
        </section>

        {!showForm ? (
          <section className="section bg-white" aria-labelledby="plans-heading">
            <div className="container-custom">
              <h2 id="plans-heading" className="section-heading text-center mb-12">Choose Your Website Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    className={`card p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-primary-500 animate-slide-up ${selectedPlan?.id === plan.id ? 'ring-2 ring-primary-500' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handlePlanSelect(plan)}
                  >
                    {plan.popular && (
                      <div className="mb-4 text-center">
                        <span className="badge badge-popular">Most Popular</span>
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{plan.name}</h3>
                      <p className="text-neutral-600 text-sm">{plan.description}</p>
                    </div>
                    <div className="flex items-baseline justify-center gap-1 mb-6">
                      <span className="text-3xl font-bold text-neutral-900">${plan.price}</span>
                      <span className="text-neutral-500">{plan.period}</span>
                    </div>
                    <ul className="space-y-2 mb-6" role="list">
                      {plan.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="text-sm text-neutral-600 flex items-center gap-2 justify-center">
                          <CheckIcon className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                      <li className="text-sm text-primary-600 font-medium text-center">+ {plan.features.length - 4} more features</li>
                    </ul>
                    <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'}>
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="section bg-white" aria-labelledby="form-heading">
            <div className="container-custom max-w-2xl mx-auto">
              <div className="mb-8 text-center">
                <Button variant="ghost" onClick={() => { setShowForm(false); setSelectedPlan(null); }} className="mb-6">
                  ← Back to Plans
                </Button>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                  Selected: <span className="font-semibold">{selectedPlan.name}</span> — ${selectedPlan.price}{selectedPlan.period}
                </div>
                <h2 id="form-heading" className="text-3xl font-bold text-neutral-900 mb-4">Tell Us About Your Business</h2>
                <p className="text-neutral-600">We&apos;ll use this information to build your custom website.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="businessName" className="label">Business Name *</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleFormChange}
                      className="input-field"
                      placeholder="Smith Plumbing"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="label">Contact Name *</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleFormChange}
                      className="input-field"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="input-field"
                      placeholder="john@smithplumbing.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="input-field"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="businessType" className="label">Business Type *</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleFormChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select your business type</option>
                    <option value="contractor">Contractor / Trades</option>
                    <option value="service">Local Service Business</option>
                    <option value="retail">Retail / Product Sales</option>
                    <option value="restaurant">Restaurant / Food Service</option>
                    <option value="health">Health / Wellness</option>
                    <option value="professional">Professional Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Do you have an existing website? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasWebsite"
                          value="yes"
                          checked={formData.hasWebsite === 'yes'}
                          onChange={handleFormChange}
                          className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                        <span className="text-neutral-700">Yes, I have a website</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasWebsite"
                          value="no"
                          checked={formData.hasWebsite === 'no'}
                          onChange={handleFormChange}
                          className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                        <span className="text-neutral-700">No, this is my first website</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="label">Do you have a domain name? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasDomain"
                          value="yes"
                          checked={formData.hasDomain === 'yes'}
                          onChange={handleFormChange}
                          className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                        <span className="text-neutral-700">Yes, I own a domain</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasDomain"
                          value="no"
                          checked={formData.hasDomain === 'no'}
                          onChange={handleFormChange}
                          className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                        <span className="text-neutral-700">No, I need help getting one</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="label">Additional Information</label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleFormChange}
                    rows={4}
                    className="input-field resize-y"
                    placeholder="Any specific features, design preferences, or questions?"
                  />
                </div>

                <input type="hidden" name="selectedPlan" value={formData.selectedPlan} />

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800" role="status">
                    Thank you! We&apos;ll review your information and contact you within 1 business day to discuss next steps.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800" role="alert">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" aria-hidden="true" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-neutral-500">
                  By submitting, you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </section>
        )}

        <section className="section bg-neutral-50" aria-labelledby="next-heading">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h2 id="next-heading" className="section-heading mb-6">What Happens Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'We Review', description: 'We\'ll review your request and contact you within 1 business day.' },
                { step: '2', title: 'Discovery Call', description: 'Quick 15-min call to confirm details and answer questions.' },
                { step: '3', title: 'Build & Launch', description: 'We build your website and launch it with your approval.' },
              ].map((item, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default GetStarted;