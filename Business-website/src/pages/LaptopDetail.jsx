import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { lucideIcons } from '../utils/icons';
import { siteConfig } from '../config/site';
import { laptops } from '../data/laptops';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

function LaptopDetail() {
  const { id } = useParams();
  const laptop = laptops.find(l => l.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  if (!laptop) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Navbar />
        <main className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Laptop Not Found</h1>
          <p className="text-neutral-600 mb-8">The laptop you're looking for doesn't exist or has been sold.</p>
          <Link to="/laptops">
            <Button>Back to All Laptops</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const savings = laptop.originalPrice - laptop.price;
  const savingsPercent = Math.round((savings / laptop.originalPrice) * 100);

  const categoryLabels = {
    essential: 'Essential',
    business: 'Business',
    professional: 'Professional',
  };

  const categoryColors = {
    essential: 'bg-blue-100 text-blue-800',
    business: 'bg-green-100 text-green-800',
    professional: 'bg-purple-100 text-purple-800',
  };

  const conditionColors = {
    'Refurbished': 'bg-amber-100 text-amber-800',
    'Open Box': 'bg-green-100 text-green-800',
    'New': 'bg-blue-100 text-blue-800',
  };

  const handleInquire = async () => {
    // Placeholder for inquiry/purchase flow
    alert('Inquiry functionality would integrate with your CRM or email system.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-24 pb-12 bg-white">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-neutral-700">Home</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <Link to="/laptops" className="hover:text-neutral-700">Business Laptops</Link>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <span className="text-neutral-900 truncate max-w-xs">{laptop.brand} {laptop.model}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="relative aspect-video bg-neutral-100 rounded-xl overflow-hidden mb-4">
                  <img
                    src={laptop.image}
                    alt={`${laptop.brand} ${laptop.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[laptop.image, laptop.image, laptop.image].map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImage === i ? 'border-primary-500' : 'border-transparent hover:border-neutral-300'
                      }`}
                      aria-label={`View image ${i + 1}`}
                      aria-current={currentImage === i ? 'true' : 'false'}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`badge ${categoryColors[laptop.category] || 'bg-neutral-100 text-neutral-800'}`}>
                    {categoryLabels[laptop.category] || laptop.category}
                  </span>
                  <span className={`badge ${conditionColors[laptop.condition] || 'bg-neutral-100 text-neutral-800'}`}>
                    {laptop.condition}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{laptop.brand} {laptop.model}</h1>
                <p className="text-neutral-600 mb-6">{laptop.cpu}</p>

                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-3xl font-bold text-neutral-900">${laptop.price.toFixed(2)}</span>
                  {laptop.originalPrice > laptop.price && (
                    <>
                      <span className="text-xl text-neutral-400 line-through">${laptop.originalPrice.toFixed(2)}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        Save {savingsPercent}% (${savings.toFixed(2)})
                      </span>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-neutral-50 rounded-xl">
                  <div>
                    <p className="text-sm text-neutral-500">RAM</p>
                    <p className="font-medium text-neutral-900">{laptop.ram}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Storage</p>
                    <p className="font-medium text-neutral-900">{laptop.storage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Screen</p>
                    <p className="font-medium text-neutral-900">{laptop.screen}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">OS</p>
                    <p className="font-medium text-neutral-900">Windows 11 Pro</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button onClick={handleInquire} size="lg" className="flex-1">
                    Inquire / Purchase
                  </Button>
                  <Button variant="outline" onClick={handleInquire} size="lg" className="flex-1">
                    Request More Info
                  </Button>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">What's Included</h3>
                  <ul className="space-y-2" role="list">
                    {[
                      'Laptop with Windows 11 Pro installed',
                      'AC adapter / charger',
                      '90-day hardware warranty',
                      'Professional cleaning & testing',
                      'Ready to use out of the box',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-neutral-700">
                        <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-neutral-50" aria-labelledby="specs-heading">
          <div className="container-custom">
            <h2 id="specs-heading" className="section-heading mb-12">Full Specifications</h2>
            <div className="max-w-3xl mx-auto">
              <div className="card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {laptop.specs.map((spec, index) => (
                    <div key={index} className={`p-4 border-b border-neutral-200 ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'} md:border-r md:border-r-neutral-200 last:md:border-r-0`}>
                      <p className="text-sm text-neutral-500">Specification</p>
                      <p className="font-medium text-neutral-900">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 card p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Warranty Information</h3>
                <p className="text-neutral-600">{laptop.warranty}</p>
                <p className="text-sm text-neutral-500 mt-2">Extended warranty options available. Contact us for details.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="similar-heading">
          <div className="container-custom">
            <h2 id="similar-heading" className="section-heading text-center mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {laptops
                .filter(l => l.id !== laptop.id && l.category === laptop.category)
                .slice(0, 3)
                .map((item, index) => (
                  <Link key={item.id} to={`/laptops/${item.id}`} className="card h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={`${item.brand} ${item.model}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`badge ${categoryColors[item.category] || 'bg-neutral-100 text-neutral-800'}`}>
                          {categoryLabels[item.category] || item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-neutral-900 mb-1">{item.brand} {item.model}</h3>
                      <p className="text-sm text-neutral-500 mb-2">{item.cpu}</p>
                      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                        <span>{item.ram} RAM</span>
                        <span>•</span>
                        <span>{item.storage}</span>
                        <span>•</span>
                        <span>{item.screen}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-neutral-900">${item.price.toFixed(2)}</span>
                        <span className="text-primary-600 font-medium text-sm">View Details</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Upgrade Your Business Tech?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Get a professional website and reliable business laptop from one trusted partner.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-started">
                <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                  Get a Website
                </Button>
              </Link>
              <Link to="/laptops">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-700">
                  Browse All Laptops
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LaptopDetail;