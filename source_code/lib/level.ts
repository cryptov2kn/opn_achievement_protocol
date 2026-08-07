export function getLevel(xp: number) {
  let level = 1;

  while (xp >= 100 * level * level) {
    level++;
  }

  return level - 1;
}

export function getProgress(xp: number) {
  const level = getLevel(xp);

  const currentXP = 100 * level * level;
  const nextXP = 100 * (level + 1) * (level + 1);

  const progress =
    ((xp - currentXP) /
      (nextXP - currentXP)) *
    100;

  return {
    level,
    currentXP,
    nextXP,
    progress,
  };
}

export function getRank(level: number) {
  if (level <= 2) return "Explorer";
  if (level <= 4) return "Builder";
  if (level <= 6) return "Contributor";
  if (level <= 8) return "Expert";
  if (level <= 10) return "Master";

  return "Legend";
}