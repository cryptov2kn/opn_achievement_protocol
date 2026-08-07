"use client";

import { useNotification } from "@/hooks/common/useNotification";

import Notification from "./Notification";

export default function NotificationContainer() {
  const { notifications } = useNotification();

  return (
    <div className="pointer-events-none fixed top-5 right-5 z-[9999] flex w-full max-w-sm flex-col gap-3 max-md:right-3 max-md:left-3 max-md:max-w-none max-md:translate-x-0">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
