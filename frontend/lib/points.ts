export const ACHIEVEMENT_POINTS: Record<string, number> = {
  Participant: 100,
  Graduate: 150,
  "Top 20": 300,
  "Top 10": 500,
  "Top 3": 1000,
  Winner: 1500,
  Organizer: 1000,
  Judge: 800,
  Mentor: 600,
};

export function getPoints(
  achievementName: string
) {
  return ACHIEVEMENT_POINTS[achievementName] ?? 0;
}