alter table public.events
add column if not exists participation_keyword_hash text;

alter table public.events
add column if not exists claim_end_at timestamptz;