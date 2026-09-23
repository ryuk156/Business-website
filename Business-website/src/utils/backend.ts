import { supabase } from '../lib/supabase';

type CheckoutRequest = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteGoal: string;
  pagesNeeded: string;
  featuresNeeded: string;
  existingWebsite: string;
  domain: string;
  additionalInfo: string;
  cartItems: unknown[];
  monthlyTotal: number;
  oneTimeTotal: number;
};

type StripeCheckoutInput = {
  checkoutRequestId: string;
  items: Array<{ id: string; type: 'product' | 'subscription'; quantity: number }>;
  customerEmail: string;
};

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

export async function saveCheckoutRequest(request: CheckoutRequest) {
  const checkoutRequestId = crypto.randomUUID();
  const { error } = await requireSupabase().from('checkout_requests').insert({
    id: checkoutRequestId,
    business_name: request.businessName,
    contact_name: request.contactName,
    email: request.email,
    phone: request.phone,
    business_type: request.businessType,
    website_goal: request.websiteGoal,
    pages_needed: request.pagesNeeded,
    features_needed: request.featuresNeeded,
    existing_website: request.existingWebsite,
    domain: request.domain,
    additional_info: request.additionalInfo,
    cart_items: request.cartItems,
    monthly_total: request.monthlyTotal,
    one_time_total: request.oneTimeTotal,
  });

  if (error) throw error;
  return checkoutRequestId;
}

type ContactRequest = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type WebsiteRequest = {
  plan: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  hasWebsite: string;
  hasDomain: string;
  additionalInfo: string;
};

export async function saveContactRequest(request: ContactRequest) {
  const { error } = await requireSupabase().from('contact_requests').insert({
    name: request.name,
    business_name: request.businessName,
    email: request.email,
    phone: request.phone,
    service: request.service,
    message: request.message,
  });

  if (error) throw error;
}

export async function createStripeCheckoutSession(request: StripeCheckoutInput) {
  const { data, error } = await requireSupabase().functions.invoke('create-checkout-session', {
    body: request,
  });

  if (error) throw error;
  if (!data?.url) throw new Error('Stripe did not return a checkout URL.');
  return data.url as string;
}

export async function saveWebsiteRequest(request: WebsiteRequest) {
  const { error } = await requireSupabase().from('website_requests').insert({
    plan: request.plan,
    business_name: request.businessName,
    contact_name: request.contactName,
    email: request.email,
    phone: request.phone,
    business_type: request.businessType,
    has_website: request.hasWebsite,
    has_domain: request.hasDomain,
    additional_info: request.additionalInfo,
  });

  if (error) throw error;
}