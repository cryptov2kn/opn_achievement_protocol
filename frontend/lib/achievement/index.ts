import { Achievement } from "@/types/achievement";

// ===============================
// Constants
// ===============================

export const PAGE_SIZE = 6;

// ===============================
// Filter achievements
// ===============================

export function filterAchievements(
  achievements: Achievement[],
  category: string,
) {
  if (category === "all") {
    return achievements;
  }

  return achievements.filter(
    (achievement) => achievement.category === category,
  );
}

// ===============================
// Sort achievements
// ===============================

export function sortAchievements(achievements: Achievement[], sort: string) {
  const sorted = [...achievements];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );

    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }
}

// ===============================
// Pagination
// ===============================

export function paginateAchievements(
  achievements: Achievement[],
  page: number,
  pageSize: number = PAGE_SIZE,
) {
  const start = (page - 1) * pageSize;

  return achievements.slice(start, start + pageSize);
}

// ===============================
// Total pages
// ===============================

export function getTotalPages(
  totalItems: number,
  pageSize: number = PAGE_SIZE,
) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
