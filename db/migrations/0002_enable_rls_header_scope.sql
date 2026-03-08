-- Enable RLS with per-anonymous-user scoping via request header `x-anon-id`.
-- This keeps browser publishable-key writes working while isolating rows by user.

-- Helper: read anonymous id from request header.
create or replace function public.request_anon_id()
returns text
language sql
stable
as $$
  select nullif((current_setting('request.headers', true)::jsonb ->> 'x-anon-id'), '');
$$;

-- Helper: resolve current user uuid from anonymous id.
create or replace function public.current_user_id()
returns uuid
language sql
stable
as $$
  select u.id
  from public.users u
  where u.anonymous_id = public.request_anon_id()
  limit 1;
$$;

grant execute on function public.request_anon_id() to anon, authenticated;
grant execute on function public.current_user_id() to anon, authenticated;

-- USERS
alter table public.users enable row level security;

drop policy if exists users_select_own on public.users;
create policy users_select_own
on public.users
for select
to anon, authenticated
using (anonymous_id = public.request_anon_id());

drop policy if exists users_insert_own on public.users;
create policy users_insert_own
on public.users
for insert
to anon, authenticated
with check (anonymous_id = public.request_anon_id());

drop policy if exists users_update_own on public.users;
create policy users_update_own
on public.users
for update
to anon, authenticated
using (anonymous_id = public.request_anon_id())
with check (anonymous_id = public.request_anon_id());

-- USER_PROFILES
alter table public.user_profiles enable row level security;

drop policy if exists user_profiles_select_own on public.user_profiles;
create policy user_profiles_select_own
on public.user_profiles
for select
to anon, authenticated
using (user_id = public.current_user_id());

drop policy if exists user_profiles_insert_own on public.user_profiles;
create policy user_profiles_insert_own
on public.user_profiles
for insert
to anon, authenticated
with check (user_id = public.current_user_id());

drop policy if exists user_profiles_update_own on public.user_profiles;
create policy user_profiles_update_own
on public.user_profiles
for update
to anon, authenticated
using (user_id = public.current_user_id())
with check (user_id = public.current_user_id());

-- MONTHLY_SETTINGS
alter table public.monthly_settings enable row level security;

drop policy if exists monthly_settings_select_own on public.monthly_settings;
create policy monthly_settings_select_own
on public.monthly_settings
for select
to anon, authenticated
using (user_id = public.current_user_id());

drop policy if exists monthly_settings_insert_own on public.monthly_settings;
create policy monthly_settings_insert_own
on public.monthly_settings
for insert
to anon, authenticated
with check (user_id = public.current_user_id());

drop policy if exists monthly_settings_update_own on public.monthly_settings;
create policy monthly_settings_update_own
on public.monthly_settings
for update
to anon, authenticated
using (user_id = public.current_user_id())
with check (user_id = public.current_user_id());

-- TRANSACTIONS
alter table public.transactions enable row level security;

drop policy if exists transactions_select_own on public.transactions;
create policy transactions_select_own
on public.transactions
for select
to anon, authenticated
using (user_id = public.current_user_id());

drop policy if exists transactions_insert_own on public.transactions;
create policy transactions_insert_own
on public.transactions
for insert
to anon, authenticated
with check (user_id = public.current_user_id());

drop policy if exists transactions_update_own on public.transactions;
create policy transactions_update_own
on public.transactions
for update
to anon, authenticated
using (user_id = public.current_user_id())
with check (user_id = public.current_user_id());

-- Optional telemetry lock-down (write-only from client).
alter table public.app_events enable row level security;

drop policy if exists app_events_insert_own on public.app_events;
create policy app_events_insert_own
on public.app_events
for insert
to anon, authenticated
with check (
  user_id is null
  or user_id = public.current_user_id()
);

drop policy if exists app_events_select_own on public.app_events;
create policy app_events_select_own
on public.app_events
for select
to anon, authenticated
using (
  user_id is not null
  and user_id = public.current_user_id()
);

