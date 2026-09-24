create table if not exists public.checkout_requests (
	id uuid primary key default gen_random_uuid(),
	business_name text not null,
	contact_name text not null,
	email text not null,
	phone text not null,
	business_type text not null,
	website_goal text not null,
	pages_needed text not null,
	features_needed text,
	existing_website text not null,
	domain text not null,
	additional_info text,
	cart_items jsonb not null,
	monthly_total numeric(10, 2) not null default 0,
	one_time_total numeric(10, 2) not null default 0,
	status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
	created_at timestamptz not null default now()
);

alter table public.checkout_requests add column if not exists stripe_session_id text;
alter table public.checkout_requests add column if not exists stripe_payment_status text not null default 'pending';
alter table public.checkout_requests enable row level security;

drop policy if exists "Anyone can submit checkout requests" on public.checkout_requests;
create policy "Anyone can submit checkout requests"
	on public.checkout_requests for insert
	to anon, authenticated
	with check (true);

create table if not exists public.contact_requests (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	business_name text not null,
	email text not null,
	phone text not null,
	service text not null,
	message text not null,
	status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
	created_at timestamptz not null default now()
);

create table if not exists public.website_requests (
	id uuid primary key default gen_random_uuid(),
	plan text not null,
	business_name text not null,
	contact_name text not null,
	email text not null,
	phone text not null,
	business_type text not null,
	has_website text not null,
	has_domain text not null,
	additional_info text,
	status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
	created_at timestamptz not null default now()
);

alter table public.contact_requests enable row level security;
alter table public.website_requests enable row level security;

drop policy if exists "Anyone can submit contact requests" on public.contact_requests;
create policy "Anyone can submit contact requests"
	on public.contact_requests for insert
	to anon, authenticated
	with check (true);

drop policy if exists "Anyone can submit website requests" on public.website_requests;
create policy "Anyone can submit website requests"
	on public.website_requests for insert
	to anon, authenticated
	with check (true);
