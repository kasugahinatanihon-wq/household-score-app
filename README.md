# Household Score App

A household finance scoring app that visualizes spending behavior and monthly diagnostics.

## Features
- Input household income and expenses
- Monthly scoring and diagnostics
- Mobile-first UI

## Tech Stack
HTML / CSS / JavaScript (localStorage)

## Production Data Collection
- DB schema: `db/migrations/0001_init_schema.sql`
- Data collection docs: `docs/data-collection/`
- Production rollout guide (JA): `docs/data-collection/prod-rollout-ja.md`

### Apply initial schema
```bash
export DATABASE_URL="$DATABASE_URL_PROD"
psql "$DATABASE_URL" -f db/migrations/0001_init_schema.sql
psql "$DATABASE_URL" -f db/migrations/0002_enable_rls_header_scope.sql
psql "$DATABASE_URL" -f db/migrations/0003_auth_household_model.sql
psql "$DATABASE_URL" -f db/migrations/0004_fix_household_members_rls_recursion.sql
psql "$DATABASE_URL" -f db/migrations/0005_fix_household_rls_auth_mismatch.sql
psql "$DATABASE_URL" -f db/migrations/0006_household_rpc_create_join.sql
psql "$DATABASE_URL" -f db/migrations/0007_household_rpc_bootstrap_user.sql
psql "$DATABASE_URL" -f db/migrations/0008_fix_household_rpc_ambiguous_id.sql
```

### Security hardening (prod-like)
- `0002_enable_rls_header_scope.sql` enables RLS on:
  - `users`
  - `user_profiles`
  - `monthly_settings`
  - `transactions`
  - `app_events`
- App sends `x-anon-id` header and policies scope each row to the same anonymous id.

### Shared household mode (couple/family)
- `0003_auth_household_model.sql` adds:
  - `households`
  - `household_members`
  - `household_id` columns on core tables
- App supports:
  - Email/password sign-up and sign-in (Supabase Auth)
  - Household create (invite code issuance)
  - Household join by invite code
  - Household data pull (shared report view across members)
  - Invite copy (code + URL with `?invite=XXXXXX`)
  - First tutorial branch: solo or shared setup

### App to Supabase wiring (current)
1. Open `設定` → `Supabase連携（本番データ収集）`
2. Set:
   - Supabase URL (`https://<project-ref>.supabase.co`)
   - Supabase Anon Key (Project Settings → API)
3. Click `接続情報を保存` → `接続テスト` → `今すぐ同期`

Synced tables:
- `users`
- `user_profiles`
- `monthly_settings`
- `transactions`
