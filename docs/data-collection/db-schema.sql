-- Household Score App: data collection schema (PostgreSQL)
-- Purpose:
-- 1) store anonymized usage data
-- 2) compute segment-based benchmarks safely
-- 3) support future percentile/deviation features

create extension if not exists "pgcrypto";

-- User identity (anonymous by default)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  anonymous_id text unique not null,               -- client-generated stable id
  consent_version text not null,                   -- agreed consent doc version
  consented_at timestamptz not null default now(),
  app_version text,
  locale text default 'ja-JP',
  timezone text default 'Asia/Tokyo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional install/session level info
create table if not exists user_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  platform text not null check (platform in ('ios','android','web')),
  os_version text,
  app_build text,
  last_seen_at timestamptz not null default now()
);
create index if not exists idx_user_devices_user_id on user_devices(user_id);

-- Profile snapshot used for segmentation
create table if not exists user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  household_size smallint,
  age smallint,
  annual_income_gross_yen bigint,
  housing_type text check (housing_type in ('rent','mortgage','owned','unknown')),
  region_type text check (region_type in ('metro','local','unknown')),
  work_type text check (work_type in ('co','single','unknown')),
  value_cat_1 text,
  value_cat_2 text,
  value_cat_3 text,
  value_cat_4 text,
  value_cat_5 text,
  value_top_1 text,
  value_top_2 text,
  value_top_3 text,
  effective_month date not null,                  -- first day of month
  created_at timestamptz not null default now()
);
create index if not exists idx_user_profiles_user_month on user_profiles(user_id, effective_month desc);

-- Monthly fixed costs and income
create table if not exists monthly_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  month date not null,                            -- first day of month
  income_yen bigint not null default 0,
  saving_yen bigint not null default 0,
  invest_yen bigint not null default 0,
  housing_yen bigint not null default 0,
  utility_yen bigint not null default 0,
  net_yen bigint not null default 0,
  sub_yen bigint not null default 0,
  mortgage_principal_yen bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, month)
);
create index if not exists idx_monthly_settings_month on monthly_settings(month);

-- Transaction records
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  occurred_on date not null,
  category text not null,
  amount_yen bigint not null check (amount_yen >= 0),
  sat smallint check (sat between 1 and 5),
  value_tag text,
  memo text,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_transactions_user_date on transactions(user_id, occurred_on desc);
create index if not exists idx_transactions_category on transactions(category);

-- Monthly computed metrics (materialized from tx/settings/profile)
create table if not exists monthly_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  month date not null,
  satisfaction_score smallint,                    -- 0..100
  stability_score smallint,                       -- 0..100
  monthly_avg_score smallint,                     -- 0..100
  surplus_rate numeric(6,4),
  food_rate numeric(6,4),
  housing_rate numeric(6,4),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, month)
);
create index if not exists idx_monthly_scores_month on monthly_scores(month);

-- Segment-level aggregates for benchmark/deviation
create table if not exists benchmark_segments (
  id uuid primary key default gen_random_uuid(),
  month date not null,
  age_band text not null,                         -- e.g. under40/40s/50s/60plus
  household_band text not null,                   -- 1/2/3/4plus
  income_band text not null,                      -- 0-299/300-499/...
  region_type text not null,
  housing_type text not null,
  n_users integer not null,
  avg_satisfaction numeric(6,2),
  std_satisfaction numeric(6,2),
  avg_stability numeric(6,2),
  std_stability numeric(6,2),
  p10_stability numeric(6,2),
  p50_stability numeric(6,2),
  p90_stability numeric(6,2),
  created_at timestamptz not null default now(),
  unique(month, age_band, household_band, income_band, region_type, housing_type)
);
create index if not exists idx_benchmark_segments_month on benchmark_segments(month);

-- Event telemetry (optional)
create table if not exists app_events (
  id bigserial primary key,
  user_id uuid references users(id) on delete set null,
  event_name text not null,
  event_time timestamptz not null default now(),
  properties jsonb not null default '{}'::jsonb
);
create index if not exists idx_app_events_name_time on app_events(event_name, event_time desc);

-- Minimal RLS-ready helper view (example)
create or replace view v_user_monthly_scores as
select user_id, month, satisfaction_score, stability_score, monthly_avg_score
from monthly_scores;

