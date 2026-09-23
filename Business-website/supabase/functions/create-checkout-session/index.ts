const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type CheckoutItem = {
  id: string;
  type: 'product' | 'subscription';
  quantity: number;
};

type CheckoutRequest = {
  checkoutRequestId: string;
  items: CheckoutItem[];
  customerEmail: string;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function getPriceId(item: CheckoutItem) {
  const envName = item.type === 'subscription'
    ? `STRIPE_PRICE_${item.id.toUpperCase()}`
    : `STRIPE_PRICE_LAPTOP_${item.id}`;
  return Deno.env.get(envName);
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const siteUrl = Deno.env.get('SITE_URL');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!stripeSecretKey || !siteUrl || !supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'Stripe function secrets are not configured.' }, 500);
    }

    const payload = await request.json() as CheckoutRequest;
    if (!payload.checkoutRequestId || !payload.customerEmail || !Array.isArray(payload.items) || payload.items.length === 0) {
      return jsonResponse({ error: 'Invalid checkout request.' }, 400);
    }

    const lineItems = payload.items.map((item) => {
      const priceId = getPriceId(item);
      const quantity = Math.max(1, Math.floor(Number(item.quantity)));
      if (!priceId || !Number.isFinite(quantity)) throw new Error(`No Stripe price configured for ${item.type} ${item.id}.`);
      return { priceId, quantity };
    });
    const hasSubscription = payload.items.some((item) => item.type === 'subscription');
    const params = new URLSearchParams({
      mode: hasSubscription ? 'subscription' : 'payment',
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
      customer_email: payload.customerEmail,
      'metadata[checkout_request_id]': payload.checkoutRequestId,
    });

    lineItems.forEach((item, index) => {
      params.set(`line_items[${index}][price]`, item.priceId);
      params.set(`line_items[${index}][quantity]`, String(item.quantity));
    });

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    const session = await stripeResponse.json();
    if (!stripeResponse.ok || !session.url) {
      return jsonResponse({ error: session.error?.message || 'Stripe session creation failed.' }, 502);
    }

    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/checkout_requests?id=eq.${encodeURIComponent(payload.checkoutRequestId)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ stripe_session_id: session.id, stripe_payment_status: 'checkout_created' }),
      },
    );
    if (!updateResponse.ok) return jsonResponse({ error: 'Could not update the saved checkout request.' }, 502);

    return jsonResponse({ url: session.url });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'Checkout creation failed.' }, 400);
  }
});