-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

-- User progress table
create table if not exists public.user_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null unique,
  streak_count  int default 0,
  last_active   date default current_date,
  dsa_completed text[] default '{}',           -- array of topic IDs
  cgpa_data     jsonb default '[]',             -- array of { sem, sgpa }
  roadmap_progress jsonb default '{}',          -- { roadmap_id: percentage }
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Row-level security: users can only read/write their own row
alter table public.user_progress enable row level security;

create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Auto-create a progress row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_user_progress_updated_at
  before update on public.user_progress
  for each row execute procedure public.set_updated_at();
