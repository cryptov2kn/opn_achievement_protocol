ALTER TABLE public.events
ADD COLUMN event_type text NOT NULL DEFAULT 'online'
CHECK (event_type IN ('online', 'offline'));