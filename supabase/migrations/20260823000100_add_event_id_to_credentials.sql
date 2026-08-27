alter table public.credentials
add column if not exists event_id uuid
references public.events(id)
on delete restrict;

create index if not exists credentials_event_id_idx
on public.credentials (event_id);