import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import Button from '../components/Button';

function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    window.localStorage.removeItem('web-mechanix-checkout-info');
    window.localStorage.removeItem('web-mechanix-checkout-request-id');
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="container-custom flex justify-center pt-28 pb-16">
        <section className="card max-w-xl p-8 text-center sm:p-12">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-bold text-neutral-900">Payment received</h1>
          <p className="mt-4 text-neutral-600">Thank you. Your payment was successful and your project details have been received.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/auth"><Button>Create an account</Button></Link>
            <Link to="/" className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50">Continue as guest</Link>
          </div>
          <p className="mt-4 text-sm text-neutral-500">Create an account to track orders and manage future support. You can also continue without one.</p>
        </section>
      </main>
    </div>
  );
}

export default CheckoutSuccess;