import { siteConfig } from '../config/site';
import Navbar from '../components/Navbar';

function Privacy() {
  const lastUpdated = 'January 1, 2025';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-neutral-500">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="privacy-content">
          <div className="container-custom max-w-3xl">
            <div className="prose prose-neutral max-w-none">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Information We Collect</h2>
              <p className="text-neutral-700 mb-6">We collect information you provide directly to us:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Name, business name, email, phone number</li>
                <li>Business information for website content</li>
                <li>Payment and billing information</li>
                <li>Communications with our support team</li>
                <li>Website analytics and usage data</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-neutral-700 mb-4">We use your information to:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Build and manage your website</li>
                <li>Process payments and billing</li>
                <li>Communicate about your account and services</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Information Sharing</h2>
              <p className="text-neutral-700 mb-4">We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Service providers (hosting, payment processors, email services)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Data Storage & Security</h2>
              <p className="text-neutral-700 mb-4">Your data is stored on secure Canadian servers. We implement appropriate technical and organizational measures including:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>SSL/TLS encryption for all data in transit</li>
                <li>Encrypted storage for sensitive data</li>
                <li>Regular security updates and monitoring</li>
                <li>Access controls and authentication</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Website Analytics</h2>
              <p className="text-neutral-700 mb-6">We use privacy-friendly analytics to understand website usage. We do not use invasive tracking, third-party advertising cookies, or share analytics data with advertisers.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Cookies</h2>
              <p className="text-neutral-700 mb-4">We use essential cookies for:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Session management and authentication</li>
                <li>Shopping cart functionality (e-commerce sites)</li>
                <li>Form state preservation</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="text-neutral-700 mb-6">We do not use marketing or tracking cookies without explicit consent.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Your Rights (PIPEDA)</h2>
              <p className="text-neutral-700 mb-4">Under Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Withdraw consent for processing</li>
                <li>File a complaint with the Privacy Commissioner of Canada</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Data Retention</h2>
              <p className="text-neutral-700 mb-6">We retain your information only as long as necessary for the purposes outlined in this policy, or as required by law. Account data is retained for the duration of your subscription plus 2 years. Billing records are retained for 7 years for tax purposes.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Third-Party Services</h2>
              <p className="text-neutral-700 mb-4">Our services may integrate with third-party providers:</p>
              <ul className="list-disc list-inside text-neutral-700 mb-6 space-y-2">
                <li>Payment processors (Stripe, PayPal) — governed by their privacy policies</li>
                <li>Hosting providers — Canadian data centers</li>
                <li>Email services — for transactional communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Children's Privacy</h2>
              <p className="text-neutral-700 mb-6">Our services are not directed to children under 13. We do not knowingly collect information from children. If you believe we have collected such information, please contact us immediately.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-neutral-700 mb-6">We may update this policy. Material changes will be communicated via email and posted on our website with a revised "Last updated" date.</p>

              <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Contact</h2>
              <p className="text-neutral-700">Privacy questions or requests? Contact our Privacy Officer at <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-600 hover:underline">{siteConfig.contact.email}</a> or {siteConfig.contact.phone}.</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Privacy;