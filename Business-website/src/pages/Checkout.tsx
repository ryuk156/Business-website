import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Loader2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/useCart';
import Button from '../components/Button';
import { createStripeCheckoutSession } from '../utils/backend';

function Checkout() {
  const { items, monthlyTotal, oneTimeTotal } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const startCheckout = async () => {
    setIsRedirecting(true);
    setCheckoutError('');
    try {
      const checkoutRequestId = window.localStorage.getItem('web-mechanix-checkout-request-id');
      const savedDetails = JSON.parse(window.localStorage.getItem('web-mechanix-checkout-info') || '{}');
      if (!checkoutRequestId || !savedDetails.email) throw new Error('Your saved project details are missing. Please go back and submit the form again.');

      const url = await createStripeCheckoutSession({
        checkoutRequestId,
        customerEmail: savedDetails.email,
        items: items.map((item) => ({ id: item.id, type: item.type, quantity: item.quantity })),
      });
      window.location.assign(url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start secure checkout.');
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="container-custom pt-24 pb-12 lg:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to cart
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="card p-6 sm:p-8" aria-labelledby="checkout-heading">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary-100 p-3 text-primary-700">
                  <CreditCard className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Step 2 of 2</p>
                  <h1 id="checkout-heading" className="mt-1 text-3xl font-bold text-neutral-900">Checkout</h1>
                  <p className="mt-3 text-neutral-600">Your project details have been saved. Payment will be securely handled through Stripe.</p>
                </div>
              </div>
              <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Your order is saved in Supabase. Continue to secure payment when you are ready.
              </div>
              {checkoutError && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{checkoutError}</p>}
              <div className="mt-6 flex items-center gap-3 text-sm text-neutral-600">
                <ShieldCheck className="h-5 w-5 text-primary-600" aria-hidden="true" />
                Your project information is stored securely.
              </div>
            </section>

            <aside className="card h-fit p-6">
              <h2 className="text-lg font-semibold text-neutral-900">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                {items.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="flex justify-between gap-4">
                    <span className="text-neutral-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}{item.period || ''}</span>
                  </div>
                ))}
                {monthlyTotal > 0 && <div className="flex justify-between gap-4 border-t border-neutral-200 pt-3"><span className="text-neutral-600">Monthly total</span><span className="font-semibold">${monthlyTotal.toFixed(2)}/mo</span></div>}
                {oneTimeTotal > 0 && <div className="flex justify-between gap-4"><span className="text-neutral-600">One-time total</span><span className="font-semibold">${oneTimeTotal.toFixed(2)}</span></div>}
              </div>
              <Button className="mt-6 w-full" onClick={startCheckout} disabled={isRedirecting}>
                {isRedirecting ? 'Opening secure checkout...' : 'Continue to secure payment'}
                {isRedirecting && <Loader2 className="ml-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              </Button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;