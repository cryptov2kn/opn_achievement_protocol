"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { NotificationData, NotificationType } from "@/types/notification";

import NotificationContainer from "@/components/ui/notification/NotificationContainer";

// Context type

interface NotificationContextType {
  notifications: NotificationData[];

  show: (message: string, type?: NotificationType, duration?: number) => void;

  success: (message: string, duration?: number) => void;

  error: (message: string, duration?: number) => void;

  warning: (message: string, duration?: number) => void;

  info: (message: string, duration?: number) => void;

  remove: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Remove notification

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Add notification

  const show = useCallback(
    (message: string, type: NotificationType = "info", duration = 4000) => {
      const id = crypto.randomUUID();

      const notification: NotificationData = {
        id,
        message,
        type,
        duration,
      };

      setNotifications((prev) => [...prev, notification]);

      window.setTimeout(() => {
        remove(id);
      }, duration);
    },
    [remove],
  );

  const value = useMemo(
    () => ({
      notifications,

      show,

      success: (message: string, duration?: number) =>
        show(message, "success", duration),

      error: (message: string, duration?: number) =>
        show(message, "error", duration),

      warning: (message: string, duration?: number) =>
        show(message, "warning", duration),

      info: (message: string, duration?: number) =>
        show(message, "info", duration),

      remove,
    }),
    [notifications, remove, show],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Global notification container */}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

// Notification hook

export function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext must be used inside NotificationProvider",
    );
  }

  return context;
}
