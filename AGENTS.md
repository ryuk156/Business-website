# Agent Guidance

## Project Location

The Git repository root is `/workspaces/Business-website`.
The actual React/Vite application is in `/workspaces/Business-website/Business-website`.
Run all npm commands from the nested application directory.

## Application Structure

- The React/Vite application uses TypeScript and lives in `Business-website/`.
- Shared UI belongs in `Business-website/src/components/`; route pages belong in `Business-website/src/pages/`.
- The application is wrapped in `CartProvider`, `BrowserRouter`, and `AuthProvider` in `src/App.tsx`.
- The development server currently runs at `http://localhost:5174/` in this workspace because port 5173 is occupied. Use the URL printed by Vite if the port changes.

## Run Without Building

A production build is not required for local development. Start the Vite dev server with:

```bash
cd /workspaces/Business-website/Business-website
npm install
npm run dev -- --host 0.0.0.0
```

Open the local URL printed by Vite. If port 5173 is busy, Vite selects the next available port.

The dev server provides hot module replacement. After source edits, refresh the browser if the page still shows an old runtime error. Use `Ctrl+Shift+R` for a hard refresh when needed.

## Validation Commands

Run these from the nested application directory:

```bash
npm run lint
npm run build
```

For TypeScript validation, also run `npm run type-check`.

`npm run build` is only a verification step. It is not needed to run the site locally.

## Current Routes

Public routes include:

- `/` — landing page
- `/websites`, `/websites/starter`, `/websites/appointment`, `/websites/ecommerce` — website offerings
- `/laptops`, `/laptops/:id` — refurbished laptops
- `/about`, `/contact`, `/faq`, `/terms`, `/privacy`, `/get-started`
- `/cart`, `/checkout-info`, `/checkout`, `/checkout/success` — cart and payment flow

Account and operations routes:

- `/auth` — optional customer sign-in/sign-up
- `/account` — customer portal
- `/admin` — admin dashboard

## Product and UX Changes

- The landing page “How It Works” section uses a compact responsive card grid instead of a tall vertical timeline.
- The website pricing header is compact and split horizontally on larger screens.
- The landing page “Every Laptop Includes” section was removed.
- The landing page FAQ section was removed; the dedicated `/faq` page remains available.
- Customer testimonials are presented as Upwork client reviews. Exact verified review text should replace the editable entries in `src/data/testimonials.ts`; do not invent or publish customer identities.
- The About page values are interactive selectable cards with an accessible details panel.
- Navbar dropdowns close on outside click and Escape, and active navigation links expose `aria-current`.

## Hybrid Checkout and Customer Accounts

Guest checkout is the default and does not require account creation:

1. A customer adds a website plan, laptop, or both to the cart.
2. Website orders collect project details in `/checkout-info`.
3. Laptop-only orders collect contact details without requiring website fields.
4. `/checkout` creates a Stripe Checkout Session through the Supabase Edge Function.
5. `/checkout/success` clears the cart and offers optional account creation.

Customer accounts are optional after checkout. `src/context/AuthContext.tsx` manages Supabase Auth sessions. On sign-in, `claim_guest_orders()` links unclaimed checkout records whose email matches the authenticated user. The `/account` portal displays:

- Orders from `checkout_requests`
- Invoices from `invoices`
- Website subscriptions from `subscriptions`
- Support requests from `support_requests`

Customers can submit support tickets from `/account`. The portal must only query data through Supabase RLS-protected tables.

## Admin Dashboard

The admin dashboard is at `/admin`. Authentication alone is not sufficient: the signed-in user must be listed in `public.admin_users`.

To create an admin:

1. Create a user in Supabase Authentication.
2. Copy the Auth user UUID.
3. Run:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID');
```

The dashboard currently reads and updates checkout, website, contact, and support request statuses. Admin access is enforced by the `public.is_admin()` function and RLS policies; do not replace this with frontend-only route hiding.

## Supabase Schema and Data Responsibilities

Run `Business-website/supabase/schema.sql` in the Supabase SQL Editor after schema changes. It defines:

- `checkout_requests` — guest and website/laptop checkout submissions
- `contact_requests` — contact form submissions
- `website_requests` — website inquiry submissions
- `admin_users` — allowlist for admin users
- `invoices` — customer invoice records and optional invoice URLs
- `subscriptions` — customer website subscription records
- `support_requests` — customer support tickets and admin replies

Relevant security behavior:

- Anonymous users may insert checkout, contact, and website requests.
- Customers can only read their own checkout requests, invoices, subscriptions, and support requests.
- Customers can create/update their own support requests.
- Admins can read/update operational records through `public.is_admin()`.
- The `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to frontend code.

Invoices and subscription rows are currently storage/display surfaces. Stripe webhook or backend synchronization still needs to populate them after successful payments and subscription events. Do not insert Stripe secrets or service-role credentials into `.env.local` or client code.

## Important Runtime Fixes

- `src/utils/icons.js` must export every icon used through `lucideIcons`, including `Check`, `Quote`, and `Clock`.
- Lucide icons are often React `forwardRef` objects, not functions. `FeatureCard` must render object-based icon components instead of treating them as text children.
- `ScrollRestoration` is not compatible with the current `BrowserRouter` setup. Do not add it unless the app is migrated to a React Router data router.
- `src/main.jsx` contains an error boundary so render exceptions are displayed instead of silently leaving a white page.

## Repository Conventions

- Use React JSX with Vite.
- Keep shared UI in `src/components/` and route pages in `src/pages/`.
- Prefer the existing `lucide-react` and `react-router-dom` dependencies.
- Avoid unrelated refactors when fixing runtime errors.
- Do not commit generated `dist/` output unless explicitly requested.

## Supabase and Stripe

- Run `Business-website/supabase/schema.sql` in the Supabase Dashboard SQL Editor before testing checkout.
- The frontend uses `.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Stripe checkout is created by `supabase/functions/create-checkout-session/index.ts`; the Stripe secret key must remain a Supabase function secret and must never be placed in `.env.local` or frontend code.
- Use the Supabase CLI through `npx supabase` from the nested application directory. Authenticate and link the project before deploying:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase functions deploy create-checkout-session
```

- Required function secrets are `STRIPE_SECRET_KEY`, `SITE_URL`, and `STRIPE_PRICE_STARTER`. Add other `STRIPE_PRICE_*` values only when those plans are enabled.
- `STRIPE_SECRET_KEY` must be an `sk_test_...` or `sk_live_...` key. `pk_*` keys are publishable keys and cannot create Checkout Sessions.
- Use real Stripe Price IDs beginning with `price_`, not numeric placeholders.
- If a Stripe key is exposed, revoke it in Stripe immediately and create a replacement.

## Debugging a Blank Page

1. Check the browser console for the first runtime exception.
2. Check the Vite terminal for module or HMR errors.
3. Confirm the browser URL uses the port printed by Vite.
4. Hard-refresh the browser.
5. Run `npm run lint` and `npm run build` after the fix.
6. If a render exception remains, use the error message shown by the boundary in `src/main.jsx` to locate the failing component.
