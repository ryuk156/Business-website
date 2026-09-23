import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from './Button';

function Hero() {
  return (
    <section className="relative flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-50/50 via-transparent to-transparent" aria-hidden="true" />
      
      <div className="container-custom relative py-8 lg:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            New: Appointment Booking Websites now available
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6 animate-slide-up">
            Technology Made Simple for{' '}
            <span className="text-primary-600">Small Business.</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
            Professional websites, online booking, e-commerce solutions, and reliable refurbished laptops — all from one affordable technology partner.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up delay-200">
            <Link to="/get-started">
              <Button size="lg" className="w-full sm:w-auto group">
                Build Your Website
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/laptops">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Shop Refurbished Laptops
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-500 animate-slide-up delay-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <span>Starting at $35/month</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <span>No large upfront website cost</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <span>Hosting included</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}

export default Hero;