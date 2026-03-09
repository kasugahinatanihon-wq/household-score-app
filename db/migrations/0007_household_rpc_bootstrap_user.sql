-- Ensure auth users can create/join household even if public.users row is missing.
-- RPC now bootstraps users row inside SECURITY DEFINER function.

create or replace function public.create_household_with_membership(p_name text)
returns table(id uuid, name text, invite_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_code text;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  insert into public.users (id, anonymous_id, consent_version, app_version, locale, timezone)
  values (v_uid, 'auth_' || v_uid::text, '2026-03-ja-v1', 'web-local', 'ja-JP', 'Asia/Tokyo')
  on conflict (id) do update
  set anonymous_id = excluded.anonymous_id,
      updated_at = now();

  v_code := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));

  insert into public.households(name, invite_code, created_by)
  values (coalesce(nullif(trim(p_name), ''), 'わが家'), v_code, v_uid)
  returning households.id, households.name, households.invite_code
  into id, name, invite_code;

  insert into public.household_members(household_id, user_id, role)
  values (id, v_uid, 'owner')
  on conflict (household_id, user_id) do update
  set role = excluded.role;

  return next;
end;
$$;

create or replace function public.join_household_by_code(p_invite_code text)
returns table(id uuid, name text, invite_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  insert into public.users (id, anonymous_id, consent_version, app_version, locale, timezone)
  values (v_uid, 'auth_' || v_uid::text, '2026-03-ja-v1', 'web-local', 'ja-JP', 'Asia/Tokyo')
  on conflict (id) do update
  set anonymous_id = excluded.anonymous_id,
      updated_at = now();

  select h.id, h.name, h.invite_code
    into id, name, invite_code
  from public.households h
  where h.invite_code = upper(trim(p_invite_code))
  limit 1;

  if id is null then
    raise exception 'invite_code_not_found';
  end if;

  insert into public.household_members(household_id, user_id, role)
  values (id, v_uid, 'member')
  on conflict (household_id, user_id) do update
  set role = 'member';

  return next;
end;
$$;

grant execute on function public.create_household_with_membership(text) to authenticated;
grant execute on function public.join_household_by_code(text) to authenticated;

