import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Websites from './pages/Websites';
import Starter from './pages/Starter';
import Appointment from './pages/Appointment';
import Ecommerce from './pages/Ecommerce';
import Laptops from './pages/Laptops';
import LaptopDetail from './pages/LaptopDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import GetStarted from './pages/GetStarted';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import CheckoutInfo from './pages/CheckoutInfo';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/websites" element={<Websites />} />
            <Route path="/websites/starter" element={<Starter />} />
            <Route path="/websites/appointment" element={<Appointment />} />
            <Route path="/websites/ecommerce" element={<Ecommerce />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/laptops/:id" element={<LaptopDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-info" element={<CheckoutInfo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;