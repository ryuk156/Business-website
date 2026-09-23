# Agent Guidance

## Project Location

The Git repository root is `/workspaces/Business-website`.
The actual React/Vite application is in `/workspaces/Business-website/Business-website`.
Run all npm commands from the nested application directory.

## Run Without Building

A production build is not required for local development. Start the Vite dev server with:

```bash
cd /workspaces/Business-website/Business-website
npm install
npm run dev -- --host 0.0.0.0
```

Open `http://localhost:5173/`. If that port is busy, Vite will select the next available port and print it in the terminal.

The dev server provides hot module replacement. After source edits, refresh the browser if the page still shows an old runtime error. Use `Ctrl+Shift+R` for a hard refresh when needed.

## Validation Commands

Run these from the nested application directory:

```bash
npm run lint
npm run build
```

For TypeScript validation, also run `npm run type-check`.

`npm run build` is only a verification step. It is not needed to run the site locally.

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
