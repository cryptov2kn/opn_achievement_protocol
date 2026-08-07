create table public.events (
    id uuid primary key default gen_random_uuid(),

    issuer_id uuid not null references issuers(id) on delete cascade,

    achievement_id uuid not null references achievements(id) on delete cascade,

    title text not null,

    description text,

    location text,

    start_date date,

    end_date date,

    max_participants integer,

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);

create index idx_events_issuer
on events(issuer_id);

create index idx_events_achievement
on events(achievement_id);

alter table events enable row level security;

