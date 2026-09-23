import { useState, type ChangeEvent, type FormEvent } from 'react';

const serviceOptions = [
  { value: 'starter', label: 'Starter Website — $35/month' },
  { value: 'appointment', label: 'Appointment Website — $55/month' },
  { value: 'ecommerce', label: 'E-Commerce — $99/month' },
  { value: 'laptop', label: 'Business Laptop' },
  { value: 'bundle', label: 'Website + Laptop' },
  { value: 'other', label: 'Other' },
];

type ContactFormValues = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

interface ContactFormProps {
  onSubmit: (formData: ContactFormValues) => Promise<void> | void;
  initialData?: Partial<ContactFormValues>;
}

function ContactForm({ onSubmit, initialData = {} }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    ...initialData,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormValues;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) setErrors((prev) => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      setFormData({ name: '', businessName: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="label">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="John Smith"
            required
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="businessName" className="label">Business Name *</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className={`input-field ${errors.businessName ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Smith Plumbing"
            required
            aria-invalid={errors.businessName ? 'true' : 'false'}
            aria-describedby={errors.businessName ? 'businessName-error' : undefined}
          />
          {errors.businessName && <p id="businessName-error" className="mt-1 text-sm text-red-600" role="alert">{errors.businessName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="john@smithplumbing.com"
            required
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="label">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="(555) 123-4567"
            required
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="label">Service Interested In *</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`input-field ${errors.service ? 'border-red-500 focus:ring-red-500' : ''}`}
          required
          aria-invalid={errors.service ? 'true' : 'false'}
          aria-describedby={errors.service ? 'service-error' : undefined}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {errors.service && <p id="service-error" className="mt-1 text-sm text-red-600" role="alert">{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="message" className="label">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`input-field resize-y ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Tell us about your business and what you're looking for..."
          required
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">{errors.message}</p>}
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800" role="status">
          Thank you! We&apos;ll be in touch within 1 business day.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800" role="alert">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full sm:w-auto"
      >
        {isSubmitting ? 'Sending...' : 'Request a Quote'}
      </button>
    </form>
  );
}

export default ContactForm;