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
```

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
