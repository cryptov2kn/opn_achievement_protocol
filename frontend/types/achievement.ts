export interface AchievementFormData {
  title: string;
  category: string;
  difficulty: string;
  description: string;
  image: string;
  expiration: string;
  metadata: string;
}

export const achievementFormDefault: AchievementFormData = {
  title: "",
  category: "Education",
  difficulty: "Beginner",
  description: "",
  image: "",
  expiration: "",
  metadata: "",
};

export interface Achievement {
  id: string;

  issuer_id: string;

  title: string;

  category: string | null;

  difficulty: string | null;

  description: string | null;

  image: string | null;

  expiration: string | null;

  metadata: {
    note: string;
  } | null;

  created_at: string;

  updated_at: string;

  status: "published" | "archived";

  archived_at: string | null;
}
