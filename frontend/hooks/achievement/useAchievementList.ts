"use client";

import { useEffect, useState } from "react";

import { useWallet } from "@/hooks/useWallet";
import { Achievement } from "@/types/achievement";

import { getAchievementList } from "@/lib/achievement/getAchievementList";

export function useAchievementList() {
  const { address, isConnected, loadingWallet } = useWallet();

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) return;

    const walletAddress = address.toLowerCase();

    let cancelled = false;

    async function loadAchievements() {
      try {
        setLoading(true);

        const result = await getAchievementList(walletAddress);

        if (!cancelled && result.success) {
          setAchievements(result.data as Achievement[]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAchievements();

    return () => {
      cancelled = true;
    };
  }, [address, isConnected]);

  return {
    achievements,
    loading,
    isConnected,
    loadingWallet,
  };
}
