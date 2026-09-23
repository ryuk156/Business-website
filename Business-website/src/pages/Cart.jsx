import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/useCart';
import Button from '../components/Button';

function Cart() {
  const { items, monthlyTotal, oneTimeTotal, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="container-custom pt-24 pb-12 lg:pt-28">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">Your cart</p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">Ready when you are</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            Review your website subscription and laptop selections. You can connect this cart to Stripe when checkout is ready.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="card p-10 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-neutral-300" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-neutral-900">Your cart is empty</h2>
            <p className="mx-auto mt-2 max-w-md text-neutral-600">Choose a website plan or a tested laptop to get started.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/websites"><Button>Browse Website Plans</Button></Link>
              <Link to="/laptops"><Button variant="outline">Shop Laptops</Button></Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <section className="space-y-4" aria-labelledby="cart-items-heading">
              <div className="flex items-center justify-between">
                <h2 id="cart-items-heading" className="text-lg font-semibold text-neutral-900">Your selections</h2>
                <button type="button" onClick={clearCart} className="text-sm font-medium text-neutral-500 hover:text-red-600">
                  Clear cart
                </button>
              </div>
              {items.map((item) => (
                <article key={`${item.type}-${item.id}`} className="card flex gap-4 p-4 sm:p-5">
                  {item.image && <img src={item.image} alt="" className="h-20 w-24 rounded-lg object-cover sm:h-24 sm:w-32" />}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                          {item.type === 'subscription' ? 'Website subscription' : 'Laptop'}
                        </p>
                        <h3 className="mt-1 font-semibold text-neutral-900">{item.name}</h3>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id, item.type)} className="rounded-lg p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${item.name}`}>
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {item.type === 'product' && (
                          <>
                            <button type="button" onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)} className="rounded-md border border-neutral-200 p-1 hover:bg-neutral-50" aria-label={`Decrease ${item.name} quantity`}>
                              <Minus className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)} className="rounded-md border border-neutral-200 p-1 hover:bg-neutral-50" aria-label={`Increase ${item.name} quantity`}>
                              <Plus className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </>
                        )}
                        {item.type === 'subscription' && <span className="text-sm text-neutral-500">One plan</span>}
                      </div>
                      <p className="font-semibold text-neutral-900">
                        ${(item.price * item.quantity).toFixed(2)}<span className="text-sm font-normal text-neutral-500">{item.period || ''}</span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="card h-fit p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-neutral-900">Order summary</h2>
              <div className="mt-5 space-y-3 text-sm">
                {monthlyTotal > 0 && <div className="flex justify-between gap-4"><span className="text-neutral-600">Monthly subscriptions</span><span className="font-medium">${monthlyTotal.toFixed(2)}/mo</span></div>}
                {oneTimeTotal > 0 && <div className="flex justify-between gap-4"><span className="text-neutral-600">Laptop total</span><span className="font-medium">${oneTimeTotal.toFixed(2)}</span></div>}
              </div>
              <div className="my-5 border-t border-neutral-200" />
              <p className="text-sm leading-relaxed text-neutral-500">Secure checkout and payment options will be available through Stripe.</p>
              <Button className="mt-5 w-full" disabled>
                Continue to Checkout
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-center text-xs text-neutral-500">Checkout integration coming soon</p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
