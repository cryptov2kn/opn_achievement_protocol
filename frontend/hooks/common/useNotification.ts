"use client";

import { useNotificationContext } from "@/providers/NotificationProvider";

export function useNotification() {
  return useNotificationContext();
}
