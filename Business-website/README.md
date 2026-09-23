# Web Mechanix

## Supabase setup

The contact and website request forms save submissions to Supabase. To connect your project:

1. Create a `.env.local` file beside `package.json` using `.env.example` as a template.
2. In Supabase, open **SQL Editor** and run `supabase/schema.sql`.
3. Copy the project URL and the public anon key from **Project Settings > API** into `.env.local`.
4. Start the app with `npm run dev`.

Only the public anon key belongs in the frontend. The SQL enables row-level security and permits anonymous inserts without permitting visitors to read submissions. View requests from the Supabase dashboard using an authenticated account.

Without Supabase environment variables, forms continue to use the existing email fallback.

## Development

```bash
npm install
npm run dev
```

Run checks with `npm run lint`, `npm run type-check`, and `npm run build`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
