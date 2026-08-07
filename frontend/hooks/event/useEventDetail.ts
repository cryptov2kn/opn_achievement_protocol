"use client";

import { useEffect, useState } from "react";

import { Event } from "@/types/event";

import { getEventDetail } from "@/lib/event/getEventDetail";

export function useEventDetail(id: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      try {
        setLoading(true);

        const result = await getEventDetail(id);

        if (!cancelled && result.success) {
          setEvent(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadEvent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    event,
    loading,
  };
}
