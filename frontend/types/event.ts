export interface EventFormData {
  achievementId: string;

  title: string;

  eventType: "online" | "offline";

  startDate: string;

  endDate: string;

  maxParticipants: string;

  location: string;

  description: string;
}

export const eventFormDefault: EventFormData = {
  achievementId: "",

  title: "",

  eventType: "online",

  startDate: "",

  endDate: "",

  maxParticipants: "",

  location: "",

  description: "",
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

  start_date: string | null;

  end_date: string | null;

  max_participants: number | null;

  created_at: string;

  updated_at: string;

  achievement: Pick<
    Achievement,
    "id" | "title" | "image" | "points" | "category" | "difficulty"
  >;
}
