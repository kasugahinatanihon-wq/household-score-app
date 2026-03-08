-- Fix RLS recursion on household_members
-- Error: infinite recursion detected in policy for relation "household_members"

-- Drop recursive policies
drop policy if exists household_members_select_self_or_member on public.household_members;
drop policy if exists household_members_update_owner on public.household_members;

-- Keep only non-recursive minimal policies required by current app flow
-- (read own membership rows, insert self membership row)
drop policy if exists household_members_select_self on public.household_members;
create policy household_members_select_self
on public.household_members
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists household_members_insert_self on public.household_members;
create policy household_members_insert_self
on public.household_members
for insert
to authenticated
with check (user_id = auth.uid());

