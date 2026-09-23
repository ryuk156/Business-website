import { Link } from 'react-router-dom';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300" role="contentinfo">
      <div className="container-custom py-10 lg:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6" aria-label={`${siteConfig.name} - Home`}>
              <span className="text-xl font-bold text-white tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              {siteConfig.tagline}
            </p>
            <p className="text-neutral-500 text-sm">&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          </div>

          <nav aria-label="Company links">
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {siteConfig.footer.company.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Website services">
            <h3 className="text-white font-semibold mb-4">Websites</h3>
            <ul className="space-y-3">
              {siteConfig.footer.websites.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Business laptop services">
            <h3 className="text-white font-semibold mb-4">Refurbished Laptops</h3>
            <ul className="space-y-3">
              {siteConfig.footer.laptops.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {siteConfig.footer.legal.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 lg:mt-10 pt-6 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">{siteConfig.contact.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">{siteConfig.contact.email}</a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-sm text-neutral-500">Follow us</p>
              <div className="flex items-center gap-4">
                {Object.entries(siteConfig.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                    aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <X className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;