# Create Stripe Checkout Session

Deploy this function with the Supabase CLI:

```bash
supabase functions deploy create-checkout-session
```

Set these function secrets before deploying:

```bash
supabase secrets set \
  STRIPE_SECRET_KEY=sk_test_... \
  SITE_URL=http://localhost:5174 \
  STRIPE_PRICE_STARTER=price_... \
  STRIPE_PRICE_APPOINTMENT=price_... \
  STRIPE_PRICE_ECOMMERCE=price_...
```

Laptop prices use `STRIPE_PRICE_LAPTOP_<id>` when laptop items are included.