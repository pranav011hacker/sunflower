create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists generations (
  id uuid primary key,
  project_id uuid not null references projects(id) on delete cascade,
  owner_id text not null,
  prompt text not null,
  context text,
  target_language text not null default 'typescript',
  result_code text not null,
  explanation text not null,
  model text not null,
  created_at timestamptz not null default now()
);

alter table projects enable row level security;
alter table generations enable row level security;

create policy if not exists "Projects owner select" on projects for select using (auth.uid()::text = owner_id);
create policy if not exists "Projects owner insert" on projects for insert with check (auth.uid()::text = owner_id);
create policy if not exists "Generations owner select" on generations for select using (auth.uid()::text = owner_id);
create policy if not exists "Generations owner insert" on generations for insert with check (auth.uid()::text = owner_id);
