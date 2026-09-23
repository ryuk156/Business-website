import { siteConfig } from '../config/site';
import { faqs } from '../data/faq';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQAccordion from '../components/FAQAccordion';

function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Quick answers to common questions about our websites, laptops, and services.
            </p>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="faq-heading">
          <div className="container-custom">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="contact-heading">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h2 id="contact-heading" className="section-heading mb-6">Still Have Questions?</h2>
            <p className="text-neutral-600 mb-8">Can\'t find the answer you\'re looking for? We\'re happy to help.</p>
            <a href="/contact" className="btn-primary inline-block">
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FAQ;