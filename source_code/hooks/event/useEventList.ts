"use client";

import { useEffect, useState } from "react";

import { useWallet } from "@/hooks/useWallet";
import { getEventList } from "@/lib/event/getEventList";
import { Event } from "@/types/event";

export function useEventList() {
  const { address, isConnected, loadingWallet } = useWallet();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) return;

    const walletAddress = address.toLowerCase();

    let cancelled = false;

    async function loadEvents() {
      try {
        setLoading(true);

        const result = await getEventList(walletAddress);

        if (!cancelled && result.success) {
          setEvents(result.data as Event[]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadEvents();

    return () => {
      cancelled = true;
    };
  }, [address, isConnected]);

  return {
    events,
    loading,
    isConnected,
    loadingWallet,
  };
}
