import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ExternalLink, Shield, RotateCcw, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { laptops, brands, categories, conditions } from '../data/laptops';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LaptopCard from '../components/LaptopCard';
import Button from '../components/Button';

const warrantyItems = [
  { icon: Shield, title: '90-Day Warranty', description: 'Most laptops include a 90-day hardware warranty. Extended options available.' },
  { icon: RotateCcw, title: '30-Day Returns', description: 'Not satisfied? Return within 30 days for a full refund.' },
  { icon: Headphones, title: 'Technical Support', description: 'Free setup assistance and ongoing technical support.' },
];

function Laptops() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const filteredLaptops = useMemo(() => {
    return laptops.filter(laptop => {
      const matchesSearch = laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.cpu.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === 'All' || laptop.brand === selectedBrand;
      const matchesCategory = selectedCategory === 'All' || laptop.category === selectedCategory;
      const matchesCondition = selectedCondition === 'All' || laptop.condition === selectedCondition;
      return matchesSearch && matchesBrand && matchesCategory && matchesCondition;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'newest': return b.id - a.id;
        default: return 0;
      }
    });
  }, [searchQuery, selectedBrand, selectedCategory, selectedCondition, sortBy]);

  const categoryLabels = {
    essential: 'Essential',
    business: 'Business',
    professional: 'Professional',
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight mb-6">
              Business Laptops
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professionally tested refurbished and open-box laptops for work, productivity and everyday business use.
            </p>
            <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-500" aria-hidden="true"></span>
              Starting at $299+ • 90-day warranty • Ready to use
            </p>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="filters-heading">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search laptops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                  aria-label="Search laptops"
                />
              </div>
              <div className="flex flex-wrap gap-3 lg:hidden">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="input-field py-2 text-sm"
                  aria-label="Filter by brand"
                >
                  {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field py-2 text-sm"
                  aria-label="Filter by category"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : categoryLabels[cat] || cat}</option>)}
                </select>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="input-field py-2 text-sm"
                  aria-label="Filter by condition"
                >
                  {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
              </div>
            </div>

            <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-4 flex-wrap">
                <label className="text-sm font-medium text-neutral-700">Brand:</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="input-field py-1.5 text-sm w-auto"
                  aria-label="Filter by brand"
                >
                  {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>
                <label className="text-sm font-medium text-neutral-700">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field py-1.5 text-sm w-auto"
                  aria-label="Filter by category"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : categoryLabels[cat] || cat}</option>)}
                </select>
                <label className="text-sm font-medium text-neutral-700">Condition:</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="input-field py-1.5 text-sm w-auto"
                  aria-label="Filter by condition"
                >
                  {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-neutral-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field py-1.5 text-sm w-auto"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <div className="flex items-center gap-1 border border-neutral-300 rounded-lg p-1" role="group" aria-label="View mode">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
                    aria-pressed={viewMode === 'grid'}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
                    aria-pressed={viewMode === 'list'}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 lg:pb-24 bg-white" aria-labelledby="products-heading">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 id="products-heading" className="section-heading">
                {filteredLaptops.length} {filteredLaptops.length === 1 ? 'Product' : 'Products'} Found
              </h2>
              {selectedBrand !== 'All' || selectedCategory !== 'All' || selectedCondition !== 'All' || searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrand('All');
                    setSelectedCategory('All');
                    setSelectedCondition('All');
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  Clear filters
                </button>
              )}
            </div>

            {filteredLaptops.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">No laptops found</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your filters or search terms.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBrand('All');
                    setSelectedCategory('All');
                    setSelectedCondition('All');
                  }}
                  className="btn-outline"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredLaptops.map((laptop, index) => (
                  <LaptopCard key={laptop.id} laptop={laptop} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section bg-neutral-50" id="warranty" aria-labelledby="warranty-heading">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 id="warranty-heading" className="section-heading">Warranty & Support</h2>
              <p className="section-subheading">Peace of mind with every purchase.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {warrantyItems.map((item, index) => (
                <div key={index} className="card p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4 text-primary-600">
                    <item.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-primary-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Need Help Choosing?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Not sure which laptop is right for your business? Contact us for a personalized recommendation.</p>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-50">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Laptops;