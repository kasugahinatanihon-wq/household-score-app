-- Fix ambiguous "household_id" inside RPC functions.
-- Root cause: output column names in RETURNS TABLE collide with ON CONFLICT column references.

drop function if exists public.create_household_with_membership(text);
drop function if exists public.join_household_by_code(text);

create function public.create_household_with_membership(p_name text)
returns table(out_household_id uuid, out_household_name text, out_household_invite_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_code text;
  v_household_id uuid;
  v_household_name text;
  v_household_invite_code text;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  insert into public.users (id, anonymous_id, consent_version, app_version, locale, timezone)
  values (v_uid, 'auth_' || v_uid::text, '2026-03-ja-v1', 'web-local', 'ja-JP', 'Asia/Tokyo')
  on conflict on constraint users_pkey do update
  set anonymous_id = excluded.anonymous_id,
      updated_at = now();

  v_code := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));

  insert into public.households(name, invite_code, created_by)
  values (coalesce(nullif(trim(p_name), ''), 'わが家'), v_code, v_uid)
  returning households.id, households.name, households.invite_code
  into v_household_id, v_household_name, v_household_invite_code;

  insert into public.household_members(household_id, user_id, role)
  values (v_household_id, v_uid, 'owner')
  on conflict on constraint household_members_pkey do update
  set role = excluded.role;

  return query
  select v_household_id, v_household_name, v_household_invite_code;
end;
$$;

create function public.join_household_by_code(p_invite_code text)
returns table(out_household_id uuid, out_household_name text, out_household_invite_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_household_id uuid;
  v_household_name text;
  v_household_invite_code text;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'not_authenticated';
  end if;

  insert into public.users (id, anonymous_id, consent_version, app_version, locale, timezone)
  values (v_uid, 'auth_' || v_uid::text, '2026-03-ja-v1', 'web-local', 'ja-JP', 'Asia/Tokyo')
  on conflict on constraint users_pkey do update
  set anonymous_id = excluded.anonymous_id,
      updated_at = now();

  select h.id, h.name, h.invite_code
    into v_household_id, v_household_name, v_household_invite_code
  from public.households h
  where h.invite_code = upper(trim(p_invite_code))
  limit 1;

  if v_household_id is null then
    raise exception 'invite_code_not_found';
  end if;

  insert into public.household_members(household_id, user_id, role)
  values (v_household_id, v_uid, 'member')
  on conflict on constraint household_members_pkey do update
  set role = 'member';

  return query
  select v_household_id, v_household_name, v_household_invite_code;
end;
$$;

grant execute on function public.create_household_with_membership(text) to authenticated;
grant execute on function public.join_household_by_code(text) to authenticated;

