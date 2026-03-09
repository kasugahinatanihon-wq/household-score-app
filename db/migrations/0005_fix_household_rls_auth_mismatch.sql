-- Fix household creation/join failures when auth uid and app user id path mismatch.

-- households: allow insert/update when created_by matches either auth uid or resolved app user id
drop policy if exists households_insert_owner on public.households;
create policy households_insert_owner
on public.households
for insert
to authenticated
with check (
  created_by = auth.uid()
  or created_by = public.current_user_id()
);

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
      and (
        hm.user_id = auth.uid()
        or hm.user_id = public.current_user_id()
      )
      and hm.role = 'owner'
  )
)
with check (
  exists (
    select 1
    from public.household_members hm
    where hm.household_id = households.id
      and (
        hm.user_id = auth.uid()
        or hm.user_id = public.current_user_id()
      )
      and hm.role = 'owner'
  )
);

-- household_members: allow self insert for both identity paths
drop policy if exists household_members_insert_self on public.household_members;
create policy household_members_insert_self
on public.household_members
for insert
to authenticated
with check (
  user_id = auth.uid()
  or user_id = public.current_user_id()
);

-- household_members: allow reading own rows for both identity paths
drop policy if exists household_members_select_self on public.household_members;
create policy household_members_select_self
on public.household_members
for select
to authenticated
using (
  user_id = auth.uid()
  or user_id = public.current_user_id()
);

