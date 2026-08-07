// Notification type

export type NotificationType = "success" | "error" | "warning" | "info";

// Notification object

export interface NotificationData {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}
