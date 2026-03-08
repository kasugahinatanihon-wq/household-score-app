# 実ユーザー収集向け 本番ロールアウト手順

最終更新: 2026-03-08

## 0. 方針
- `dev / stg / prod` のDBを必ず分離する
- 本番DBの変更は `db/migrations/*.sql` 経由のみ
- 同意なし収集をしない（同意UIを先に公開）

## 1. 接続先を決める（本番）
- 推奨: マネージドPostgreSQL（Supabase / Neon / RDS）
- DB名例: `household_score_prod`
- 接続URLを `DATABASE_URL_PROD` に設定

## 2. 本番DB初期化
```bash
export DATABASE_URL="$DATABASE_URL_PROD"
psql "$DATABASE_URL" -f db/migrations/0001_init_schema.sql
```

## 3. 最低限の運用設定
- DBアクセス元をAPIサーバーのIP/ネットワークに制限
- 本番ユーザー権限を最小化（DDL不可）
- 毎日バックアップ（保持30日以上）

## 4. 同意画面を有効化
- 同意文: `docs/data-collection/consent-copy-ja.md`
- 同意バージョン: `2026-03-ja-v1`
- 同意しない場合: 端末内利用のみ（サーバー送信しない）

## 5. 公開前チェック
- [ ] 同意前にAPI送信されない
- [ ] 同意撤回後に新規送信されない
- [ ] `dev/stg/prod` 取り違え防止（ENV確認）
- [ ] `n<100` セグメントは比較表示を出さない

## 6. 初期リリース時の推奨表示
- 比較機能: 「準備中」
- 理由: サンプルが安定するまで誤差が大きい
- 目安: 有効ユーザー 500〜1000 で段階的に解放

## 7. 事故防止ルール（必須）
- 本番に手動SQL直打ちしない
- migration適用時は事前バックアップ
- 個人特定につながる属性の生ログを出さない

