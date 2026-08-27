create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),

  issuer_id uuid not null
    references public.issuers(id)
    on delete cascade,

  achievement_id uuid not null
    references public.achievements(id)
    on delete restrict,

  recipient_address text not null,

  token_id text,

  status text not null default 'valid'
    check (status in ('valid', 'revoked')),

  issued_at timestamptz not null default now(),

  revoked_at timestamptz,

  transaction_hash text,

  revoke_transaction_hash text,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

create index if not exists credentials_issuer_id_idx
  on public.credentials (issuer_id);

create index if not exists credentials_achievement_id_idx
  on public.credentials (achievement_id);

create index if not exists credentials_recipient_address_idx
  on public.credentials (recipient_address);

create index if not exists credentials_status_idx
  on public.credentials (status);

create index if not exists credentials_issued_at_idx
  on public.credentials (issued_at desc);