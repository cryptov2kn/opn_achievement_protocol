alter table events
  add column start_at timestamptz,
  add column end_at timestamptz,
  add column timezone text;