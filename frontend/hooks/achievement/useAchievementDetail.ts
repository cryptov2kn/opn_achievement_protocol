"use client";

import { useEffect, useState } from "react";

import { Achievement } from "@/types/achievement";

import { getAchievementById } from "@/lib/achievement/getAchievementById";

export function useAchievementDetail(id: string) {
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function loadAchievement() {
      try {
        setLoading(true);

        const result = await getAchievementById(id);

        if (!cancelled && result.success) {
          setAchievement(result.data as Achievement);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAchievement();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    achievement,
    loading,
  };
}
