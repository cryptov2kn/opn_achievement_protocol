ALTER TABLE achievements
ADD COLUMN status TEXT NOT NULL DEFAULT 'published';

ALTER TABLE achievements
ADD COLUMN archived_at TIMESTAMPTZ;