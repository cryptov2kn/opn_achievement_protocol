alter table public.events
  drop column if exists start_date,
  drop column if exists end_date;