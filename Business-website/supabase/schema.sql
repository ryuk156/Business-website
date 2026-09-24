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
alter table public.checkout_requests add column if not exists customer_id uuid references auth.users(id);
alter table public.checkout_requests enable row level security;

drop policy if exists "Anyone can submit checkout requests" on public.checkout_requests;
create policy "Anyone can submit checkout requests"
	on public.checkout_requests for insert
	to anon, authenticated
	with check (true);

create table if not exists public.admin_users (
	user_id uuid primary key references auth.users(id) on delete cascade,
	created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
	select exists (
		select 1 from public.admin_users where user_id = auth.uid()
	);
$$;

drop policy if exists "Admins can view checkout requests" on public.checkout_requests;
create policy "Admins can view checkout requests"
	on public.checkout_requests for select
	to authenticated
	using (public.is_admin());

drop policy if exists "Admins can update checkout requests" on public.checkout_requests;
create policy "Admins can update checkout requests"
	on public.checkout_requests for update
	to authenticated
	using (public.is_admin())
	with check (public.is_admin());

create or replace function public.claim_guest_orders()
returns void
language sql
security definer
set search_path = public
as $$
	update public.checkout_requests
	set customer_id = auth.uid()
	where customer_id is null
		and lower(email) = lower((select email from auth.users where id = auth.uid()));
$$;

drop policy if exists "Customers can view their checkout requests" on public.checkout_requests;
create policy "Customers can view their checkout requests"
	on public.checkout_requests for select
	to authenticated
	using (customer_id = auth.uid());

create table if not exists public.invoices (
	id uuid primary key default gen_random_uuid(),
	customer_id uuid not null references auth.users(id) on delete cascade,
	checkout_request_id uuid references public.checkout_requests(id) on delete set null,
	stripe_invoice_id text,
	amount numeric(10, 2) not null default 0,
	currency text not null default 'cad',
	status text not null default 'open' check (status in ('draft', 'open', 'paid', 'void', 'uncollectible')),
	invoice_url text,
	due_at timestamptz,
	created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
	id uuid primary key default gen_random_uuid(),
	customer_id uuid not null references auth.users(id) on delete cascade,
	checkout_request_id uuid references public.checkout_requests(id) on delete set null,
	stripe_subscription_id text,
	plan_name text not null,
	amount numeric(10, 2) not null default 0,
	period text not null default '/mo',
	status text not null default 'active' check (status in ('trialing', 'active', 'past_due', 'cancelled', 'incomplete')),
	current_period_end timestamptz,
	created_at timestamptz not null default now()
);

create table if not exists public.support_requests (
	id uuid primary key default gen_random_uuid(),
	customer_id uuid not null references auth.users(id) on delete cascade,
	subject text not null,
	message text not null,
	status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
	admin_reply text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.invoices enable row level security;
alter table public.subscriptions enable row level security;
alter table public.support_requests enable row level security;

create policy "Customers can view their invoices" on public.invoices for select to authenticated using (customer_id = auth.uid() or public.is_admin());
create policy "Customers can view their subscriptions" on public.subscriptions for select to authenticated using (customer_id = auth.uid() or public.is_admin());
create policy "Customers can view their support requests" on public.support_requests for select to authenticated using (customer_id = auth.uid() or public.is_admin());
create policy "Customers can create support requests" on public.support_requests for insert to authenticated with check (customer_id = auth.uid());
create policy "Customers can update their support requests" on public.support_requests for update to authenticated using (customer_id = auth.uid()) with check (customer_id = auth.uid());
create policy "Admins can update support requests" on public.support_requests for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can view invoices" on public.invoices for select to authenticated using (public.is_admin());
create policy "Admins can view subscriptions" on public.subscriptions for select to authenticated using (public.is_admin());

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

drop policy if exists "Admins can view contact requests" on public.contact_requests;
create policy "Admins can view contact requests"
	on public.contact_requests for select
	to authenticated
	using (public.is_admin());

drop policy if exists "Admins can update contact requests" on public.contact_requests;
create policy "Admins can update contact requests"
	on public.contact_requests for update
	to authenticated
	using (public.is_admin())
	with check (public.is_admin());

drop policy if exists "Anyone can submit website requests" on public.website_requests;
create policy "Anyone can submit website requests"
	on public.website_requests for insert
	to anon, authenticated
	with check (true);

drop policy if exists "Admins can view website requests" on public.website_requests;
create policy "Admins can view website requests"
	on public.website_requests for select
	to authenticated
	using (public.is_admin());

drop policy if exists "Admins can update website requests" on public.website_requests;
create policy "Admins can update website requests"
	on public.website_requests for update
	to authenticated
	using (public.is_admin())
	with check (public.is_admin());
