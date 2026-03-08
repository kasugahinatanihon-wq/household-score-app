# DB Migrations

## Initial migration

- File: `db/migrations/0001_init_schema.sql`

## Apply (PostgreSQL)

```bash
psql "$DATABASE_URL" -f db/migrations/0001_init_schema.sql
psql "$DATABASE_URL" -f db/migrations/0002_enable_rls_header_scope.sql
```

## Notes

- This project currently uses SQL-file migration style.
- If you later introduce a migration tool (Prisma, Drizzle, Flyway, etc.),
  keep this file as the baseline migration.
