import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { lucideIcons } from '../utils/icons';
import { siteConfig } from '../config/site';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import { submitFormByEmail } from '../utils/email';

function Contact() {
  const handleSubmit = async (data) => {
    await submitFormByEmail('New Web Mechanix contact request', {
      Name: data.name,
      'Business name': data.businessName,
      Email: data.email,
      Phone: data.phone,
      Service: data.service,
      Message: data.message,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Have questions? Want to get started? We\'d love to hear from you. Fill out the form or reach out directly.
            </p>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="contact-heading">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <h2 id="contact-heading" className="section-heading mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                      <lucideIcons.Mail className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Email</h3>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-neutral-600 hover:text-primary-600 transition-colors mt-1 block">{siteConfig.contact.email}</a>
                      <p className="text-sm text-neutral-500 mt-1">We typically respond within 1 business day</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                      <lucideIcons.Phone className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Phone</h3>
                      <a href={`tel:${siteConfig.contact.phone}`} className="text-neutral-600 hover:text-primary-600 transition-colors mt-1 block">{siteConfig.contact.phone}</a>
                      <p className="text-sm text-neutral-500 mt-1">Mon–Fri, 9am–5pm EST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                      <lucideIcons.MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Location</h3>
                      <p className="text-neutral-600 mt-1">{siteConfig.contact.address}</p>
                      <p className="text-sm text-neutral-500 mt-1">Serving businesses across Canada</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                      <lucideIcons.Clock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Business Hours</h3>
                      <p className="text-neutral-600 mt-1">Monday – Friday: 9:00 AM – 5:00 PM EST</p>
                      <p className="text-sm text-neutral-500 mt-1">Closed weekends and holidays</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="card p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send Us a Message</h2>
                  <ContactForm onSubmit={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="faq-heading">
          <div className="container-custom max-w-3xl">
            <h2 id="faq-heading" className="section-heading text-center mb-8">Quick Answers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: 'How fast do you respond?', a: 'We typically respond to all inquiries within 1 business day during regular business hours.' },
                { q: 'Do you offer free consultations?', a: 'Yes! We offer a free 15-minute consultation to discuss your needs and recommend the best solution.' },
                { q: 'Can I see examples of your work?', a: 'Absolutely. Contact us and we\'ll share relevant portfolio examples based on your industry.' },
                { q: 'What payment methods do you accept?', a: 'We accept major credit cards, Interac e-Transfer, and monthly invoicing for website plans.' },
              ].map((item, index) => (
                <details key={index} className="card p-6 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-neutral-900">
                    {item.q}
                    <lucideIcons.ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-4 text-neutral-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Contact;