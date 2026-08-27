export interface EventFormData {
  achievementId: string;

  title: string;

  eventType: "online" | "offline";

  startDate: string;
  endDate: string;

  startTime: string;
  endTime: string;

  timezone: string;

  maxParticipants: string;

  location: string;

  description: string;

  points: string;

  participationKeyword: string;

  image: string;
}

export const eventFormDefault: EventFormData = {
  achievementId: "",

  title: "",

  eventType: "online",

  startDate: "",
  endDate: "",

  startTime: "",
  endTime: "",

  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  maxParticipants: "",

  location: "",

  description: "",

  points: "",

  participationKeyword: "",

  image: "",
};

import { Achievement } from "./achievement";

export interface Event {
  id: string;

  issuer_id: string;

  achievement_id: string;

  title: string;

  event_type: "online" | "offline";

  description: string | null;

  location: string | null;

  start_at: string | null;
  end_at: string | null;
  timezone: string | null;

  max_participants: number | null;

  points: number | null;

  image: string | null;

  participation_keyword_hash: string | null;
  claim_end_at: string | null;

  created_at: string;
  updated_at: string;

  achievement: Pick<
    Achievement,
    "id" | "title" | "image" | "category" | "difficulty"
  >;
}
