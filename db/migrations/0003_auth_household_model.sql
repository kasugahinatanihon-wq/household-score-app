-- Auth + household sharing model
-- 1) Add households and household_members
-- 2) Add household_id on profile/settings/transactions/scores
-- 3) Add authenticated-user RLS policies

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text unique not null,
  created_by uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.household_members (
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  primary key (household_id, user_id)
);

create index if not exists idx_household_members_user on public.household_members(user_id);

alter table public.user_profiles
  add column if not exists household_id uuid references public.households(id) on delete set null;
create index if not exists idx_user_profiles_household_month
  on public.user_profiles(household_id, effective_month desc);

alter table public.monthly_settings
  add column if not exists household_id uuid references public.households(id) on delete set null;
create index if not exists idx_monthly_settings_household_month
  on public.monthly_settings(household_id, month desc);

alter table public.transactions
  add column if not exists household_id uuid references public.households(id) on delete set null;
create index if not exists idx_transactions_household_date
  on public.transactions(household_id, occurred_on desc);

alter table public.monthly_scores
  add column if not exists household_id uuid references public.households(id) on delete set null;
create index if not exists idx_monthly_scores_household_month
  on public.monthly_scores(household_id, month desc);

-- RLS for new tables
alter table public.households enable row level security;
alter table public.household_members enable row level security;

drop policy if exists households_select_member on public.households;
create policy households_select_member
on public.households
for select
to authenticated
using (
  exists (
    select 1
    from public.household_members hm
    where hm.household_id = households.id
      and hm.user_id = auth.uid()
  )
);

drop policy if exists households_insert_owner on public.households;
create policy households_insert_owner
on public.households
for insert
to authenticated
with check (created_by = auth.uid());

drop policy if exists households_update_owner on public.households;
create policy households_update_owner
on public.households
for update
to authenticated
using (
  exists (
    select 1
    from public.household_members hm
    where hm.household_id = households.id
      and hm.user_id = auth.uid()
      and hm.role = 'owner'
  )
)
with check (
  exists (
    select 1
    from public.household_members hm
    where hm.household_id = households.id
      and hm.user_id = auth.uid()
      and hm.role = 'owner'
  )
);

drop policy if exists household_members_select_self_or_member on public.household_members;
create policy household_members_select_self_or_member
on public.household_members
for select
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.household_members hm2
    where hm2.household_id = household_members.household_id
      and hm2.user_id = auth.uid()
  )
);

drop policy if exists household_members_insert_self on public.household_members;
create policy household_members_insert_self
on public.household_members
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists household_members_update_owner on public.household_members;
create policy household_members_update_owner
on public.household_members
for update
to authenticated
using (
  exists (
    select 1
    from public.household_members hm
    where hm.household_id = household_members.household_id
      and hm.user_id = auth.uid()
      and hm.role = 'owner'
  )
)
with check (
  exists (
    select 1
    from public.household_members hm
    where hm.household_id = household_members.household_id
      and hm.user_id = auth.uid()
      and hm.role = 'owner'
  )
);

-- Add authenticated policies to existing users table
drop policy if exists users_select_auth_self on public.users;
create policy users_select_auth_self
on public.users
for select
to authenticated
using (id = auth.uid());

drop policy if exists users_insert_auth_self on public.users;
create policy users_insert_auth_self
on public.users
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists users_update_auth_self on public.users;
create policy users_update_auth_self
on public.users
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Add authenticated household-member scoped policies to core tables
drop policy if exists user_profiles_auth_scope on public.user_profiles;
create policy user_profiles_auth_scope
on public.user_profiles
for all
to authenticated
using (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = user_profiles.household_id
        and hm.user_id = auth.uid()
    )
  )
)
with check (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = user_profiles.household_id
        and hm.user_id = auth.uid()
    )
  )
);

drop policy if exists monthly_settings_auth_scope on public.monthly_settings;
create policy monthly_settings_auth_scope
on public.monthly_settings
for all
to authenticated
using (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = monthly_settings.household_id
        and hm.user_id = auth.uid()
    )
  )
)
with check (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = monthly_settings.household_id
        and hm.user_id = auth.uid()
    )
  )
);

drop policy if exists transactions_auth_scope on public.transactions;
create policy transactions_auth_scope
on public.transactions
for all
to authenticated
using (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = transactions.household_id
        and hm.user_id = auth.uid()
    )
  )
)
with check (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = transactions.household_id
        and hm.user_id = auth.uid()
    )
  )
);

drop policy if exists monthly_scores_auth_scope on public.monthly_scores;
create policy monthly_scores_auth_scope
on public.monthly_scores
for all
to authenticated
using (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = monthly_scores.household_id
        and hm.user_id = auth.uid()
    )
  )
)
with check (
  user_id = auth.uid()
  or (
    household_id is not null
    and exists (
      select 1
      from public.household_members hm
      where hm.household_id = monthly_scores.household_id
        and hm.user_id = auth.uid()
    )
  )
);

