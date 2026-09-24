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
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AuthProvider>
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
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;