import { siteConfig } from '../config/site';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Terms() {
  const lastUpdated = 'January 1, 2025';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-neutral-500">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="terms-content">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-neutral max-w-none">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-neutral-700 mb-6">By accessing and using the services of {siteConfig.name} ("Company", "we", "us", "our"), you ("Customer", "you", "your") agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use our services.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Services Provided</h2>
              <p className="text-neutral-700 mb-4">We provide the following services:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Website design, development, hosting, and maintenance</li>
                <li>Appointment booking website solutions</li>
                <li>E-commerce website solutions</li>
                <li>Refurbished and open-box business laptop sales</li>
                <li>Related technical support and consulting</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Website Subscription Plans</h2>
              <p className="text-neutral-700 mb-4">Our website services are provided on a monthly subscription basis:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li><strong>Starter Website:</strong> $35/month — Up to 3 pages, hosting, maintenance, support</li>
                <li><strong>Appointment Website:</strong> $55/month — Up to 6 pages, online booking, hosting, maintenance, support</li>
                <li><strong>E-Commerce Website:</strong> $99/month — Up to 8 pages, online store, hosting, maintenance, support</li>
              </ul>
              <p className="text-neutral-700 mb-6">All plans include: SSL certificate, domain connection, basic SEO, up to 5 minor updates/month, technical support. Major redesigns and new functionality may incur additional charges.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Billing & Payment</h2>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Monthly fees are billed in advance on the same date each month</li>
                <li>Payments accepted: major credit cards, Interac e-Transfer</li>
                <li>Failed payments may result in service suspension after 7 days notice</li>
                <li>Prices are in CAD and do not include applicable taxes</li>
                <li>Price changes require 30 days written notice</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Laptop Sales</h2>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>All laptops are sold "as described" with specifications listed</li>
                <li>Refurbished laptops undergo testing, cleaning, and Windows 11 installation</li>
                <li>90-day hardware warranty included on most units (varies by listing)</li>
                <li>30-day return policy for defective items</li>
                <li>Prices vary based on model, specifications, and availability</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Domain Names</h2>
              <p className="text-neutral-700 mb-4">Customers may bring their own domain or purchase through us. Domain registration fees apply separately and are billed annually. We do not guarantee availability of specific domain names.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Intellectual Property</h2>
              <p className="text-neutral-700 mb-6">Website designs, code, and content created by us remain our intellectual property until full payment is received. Customer-provided content (logos, images, text) remains the customer's property. Customers receive a license to use the website for their business purposes.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Cancellation & Refunds</h2>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Website subscriptions may be cancelled with 30 days written notice</li>
                <li>No partial month refunds for website subscriptions</li>
                <li>Laptop returns accepted within 30 days for defective items only</li>
                <li>Custom development work is non-refundable once commenced</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-neutral-700 mb-6">Our total liability shall not exceed the total fees paid by the customer in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages including lost profits, data loss, or business interruption.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Governing Law</h2>
              <p className="text-neutral-700 mb-6">These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of Ontario.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Changes to Terms</h2>
              <p className="text-neutral-700 mb-6">We may update these Terms from time to time. Continued use of our services after changes constitutes acceptance. We will notify customers of material changes via email.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Contact</h2>
              <p className="text-neutral-700">Questions about these Terms? Contact us at <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-600 hover:underline">{siteConfig.contact.email}</a> or {siteConfig.contact.phone}.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Terms;