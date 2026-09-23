import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowRight, BriefcaseBusiness, CheckCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import Button from '../components/Button';
import { saveCheckoutRequest } from '../utils/backend';

const CHECKOUT_INFO_KEY = 'web-mechanix-checkout-info';

type CheckoutFormValues = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteGoal: string;
  pagesNeeded: string;
  featuresNeeded: string;
  existingWebsite: string;
  domain: string;
  additionalInfo: string;
};

const initialForm: CheckoutFormValues = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  businessType: '',
  websiteGoal: '',
  pagesNeeded: '',
  featuresNeeded: '',
  existingWebsite: '',
  domain: '',
  additionalInfo: '',
};

function CheckoutInfo() {
  const { items, monthlyTotal, oneTimeTotal } = useCart();
  const navigate = useNavigate();
  const hasWebsitePlan = items.some((item) => item.type === 'subscription');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormValues>(() => {
    try {
      return { ...initialForm, ...JSON.parse(window.localStorage.getItem(CHECKOUT_INFO_KEY) || '{}') };
    } catch {
      return initialForm;
    }
  });

  useEffect(() => {
    if (!hasWebsitePlan) navigate('/cart', { replace: true });
  }, [hasWebsitePlan, navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof CheckoutFormValues;
    setFormData((current) => ({ ...current, [fieldName]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setSaveError(false);
    window.localStorage.setItem(CHECKOUT_INFO_KEY, JSON.stringify(formData));
    try {
      const checkoutRequestId = await saveCheckoutRequest({
        ...formData,
        cartItems: items,
        monthlyTotal,
        oneTimeTotal,
      });
      window.localStorage.setItem('web-mechanix-checkout-request-id', checkoutRequestId);
      navigate('/checkout');
    } catch {
      setSaveError(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (!hasWebsitePlan) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="container-custom pt-24 pb-12 lg:pt-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link to="/cart" className="text-sm font-medium text-primary-600 hover:text-primary-700">← Back to cart</Link>
            <div className="mt-5 flex items-start gap-4">
              <div className="rounded-xl bg-primary-100 p-3 text-primary-700">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Step 1 of 2</p>
                <h1 className="mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl">Tell us about your business</h1>
                <p className="mt-3 text-neutral-600">These details help us understand what you need before we prepare your website and checkout.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-7 p-5 sm:p-8">
            <section aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-lg font-semibold text-neutral-900">Your contact details</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field id="businessName" label="Business name" value={formData.businessName} onChange={handleChange} placeholder="Smith Plumbing" required />
                <Field id="contactName" label="Your name" value={formData.contactName} onChange={handleChange} placeholder="Jane Smith" required />
                <Field id="email" label="Email address" type="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" required />
                <Field id="phone" label="Phone number" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" required />
              </div>
            </section>

            <section aria-labelledby="website-heading">
              <h2 id="website-heading" className="text-lg font-semibold text-neutral-900">Your website project</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field id="businessType" label="What type of business do you run?" value={formData.businessType} onChange={handleChange} placeholder="Landscaping, consulting, salon..." required />
                <SelectField id="websiteGoal" label="What is your main goal?" value={formData.websiteGoal} onChange={handleChange} required options={['Get more local customers', 'Showcase my services', 'Accept appointment bookings', 'Sell products online', 'Build credibility']} />
                <SelectField id="pagesNeeded" label="How much content do you need?" value={formData.pagesNeeded} onChange={handleChange} required options={['I need help deciding', 'Up to 3 pages', '4–6 pages', 'More than 6 pages']} />
                <SelectField id="existingWebsite" label="Do you have an existing website?" value={formData.existingWebsite} onChange={handleChange} required options={['No, this is a new website', 'Yes, I want a redesign', 'Yes, I need updates']} />
                <SelectField id="domain" label="Do you have a domain name?" value={formData.domain} onChange={handleChange} required options={['I need help choosing one', 'Yes, I own a domain', 'No, I need to purchase one']} />
              </div>
              <div className="mt-5">
                <label htmlFor="featuresNeeded" className="label">What features would you like?</label>
                <textarea id="featuresNeeded" name="featuresNeeded" value={formData.featuresNeeded} onChange={handleChange} className="input-field min-h-24 resize-y" placeholder="Online booking, photo gallery, quote form, online store..." />
              </div>
              <div className="mt-5">
                <label htmlFor="additionalInfo" className="label">Anything else we should know?</label>
                <textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className="input-field min-h-24 resize-y" placeholder="Tell us about your ideal customers, style, timeline, or questions..." />
              </div>
            </section>

            <div className="flex items-start gap-3 rounded-lg bg-primary-50 p-4 text-sm text-primary-900">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" aria-hidden="true" />
              <p>Your answers are saved securely when you review the order and can be used to prepare your project before payment.</p>
            </div>
            {saveError && (
              <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
                We could not save your project details. Please check your connection and try again.
              </p>
            )}
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSaving}>
              {isSaving ? 'Saving details...' : 'Review Order'}
              {isSaving ? <Loader2 className="ml-2 h-5 w-5 animate-spin" aria-hidden="true" /> : <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

interface FieldProps {
  id: keyof CheckoutFormValues;
  label: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
}

function Field({ id, label, type = 'text', value, onChange, placeholder, required }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}{required && ' *'}</label>
      <input id={id} name={id} type={type} value={value} onChange={onChange} className="input-field" placeholder={placeholder} required={required} />
    </div>
  );
}

interface SelectFieldProps {
  id: keyof CheckoutFormValues;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

function SelectField({ id, label, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}{required && ' *'}</label>
      <select id={id} name={id} value={value} onChange={onChange} className="input-field" required={required}>
        <option value="">Select an option</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

export default CheckoutInfo;
