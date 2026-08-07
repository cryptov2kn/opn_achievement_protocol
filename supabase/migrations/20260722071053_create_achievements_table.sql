create table public.achievements (
  id uuid primary key default gen_random_uuid(),

  issuer_id uuid not null,

  title text not null,

  category text,

  difficulty text,

  description text,

  image text,

  points integer,

  max_supply integer,

  expiration text,

  metadata text,

  created_at timestamptz default now(),

  constraint achievements_issuer_fk
    foreign key (issuer_id)
    references public.issuers(id)
    on delete cascade
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),

  issuer_id uuid not null,

  title text not null,

  category text,

  difficulty text,

  description text,

  image text,

  points integer,

  max_supply integer,

  expiration text,

  metadata text,

  created_at timestamptz default now(),

  constraint achievements_issuer_fk
    foreign key (issuer_id)
    references public.issuers(id)
    on delete cascade
);

grant select, insert, update, delete
on table public.achievements
to service_role;