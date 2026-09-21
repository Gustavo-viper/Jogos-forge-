-- Cyber Detective - configuração do perfil dos jogadores
-- Execute este arquivo no SQL Editor do projeto correto do Supabase.

create table if not exists public.player_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  xp integer not null default 0 check (xp >= 0),
  current_case integer not null default 1 check (current_case between 1 and 7),
  solved_cases integer[] not null default '{}',
  evidence_keys text[] not null default '{}',
  interviews jsonb not null default '{}'::jsonb,
  decisions jsonb not null default '{}'::jsonb,
  logs jsonb not null default '[]'::jsonb,
  commands integer not null default 0 check (commands >= 0),
  theme text not null default 'dark' check (theme in ('dark','light')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.player_profiles enable row level security;

drop policy if exists "Players can view own profile" on public.player_profiles;
drop policy if exists "Players can insert own profile" on public.player_profiles;
drop policy if exists "Players can update own profile" on public.player_profiles;

create policy "Players can view own profile"
on public.player_profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "Players can insert own profile"
on public.player_profiles for insert to authenticated
with check ((select auth.uid()) = id);

create policy "Players can update own profile"
on public.player_profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

grant select, insert, update on public.player_profiles to authenticated;

create or replace function public.handle_new_player()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.player_profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'display_name',
      split_part(coalesce(new.email, ''), '@', 1)
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_player() from public;

drop trigger if exists on_auth_user_created_player on auth.users;

create trigger on_auth_user_created_player
after insert on auth.users
for each row execute procedure public.handle_new_player();
