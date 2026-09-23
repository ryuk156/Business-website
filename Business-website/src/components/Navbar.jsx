import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/site';
import Button from './Button';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location]);

  const navigation = siteConfig.navigation.main;
  const cta = siteConfig.navigation.cta;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-200' : 'bg-transparent'
    }`}>
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-2" aria-label={`${siteConfig.name} - Home`}>
            <span className="text-xl font-bold text-neutral-900 tracking-tight">{siteConfig.name}</span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1"
                aria-haspopup="true"
                aria-expanded={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Websites
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              {showDropdown && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 animate-slide-down" role="menu">
                  <Link to="/websites/starter" className="block px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors" role="menuitem">Starter Website — $35/mo</Link>
                  <Link to="/websites/appointment" className="block px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors" role="menuitem">Appointment Website — $55/mo</Link>
                  <Link to="/websites/ecommerce" className="block px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors" role="menuitem">E-Commerce Website — $99/mo</Link>
                </div>
              )}
            </div>
            
            {navigation.slice(1).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200 ${location.pathname === item.href ? 'text-primary-600' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            
            <Link to={cta.href} className="ml-4">
              <Button size="sm">{cta.label}</Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setShowDropdown(!showDropdown)}>
              Websites
            </Button>
            <button
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="py-4 space-y-4 border-t border-neutral-200">
            <div className="space-y-2 pl-4 border-l-2 border-primary-100 bg-primary-50 rounded-r-lg">
              <Link to="/websites/starter" className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors" onClick={() => setIsOpen(false)}>Starter Website — $35/mo</Link>
              <Link to="/websites/appointment" className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors" onClick={() => setIsOpen(false)}>Appointment Website — $55/mo</Link>
              <Link to="/websites/ecommerce" className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors" onClick={() => setIsOpen(false)}>E-Commerce Website — $99/mo</Link>
            </div>
            
            {navigation.slice(1).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block py-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-neutral-200">
              <Link to={cta.href} className="block" onClick={() => setIsOpen(false)}>
                <Button className="w-full">{cta.label}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;