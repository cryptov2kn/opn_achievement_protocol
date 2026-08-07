"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import clsx from "clsx";

import { useNotification } from "@/hooks/common/useNotification";
import { NotificationData } from "@/types/notification";

interface Props {
  notification: NotificationData;
}

export default function Notification({ notification }: Props) {
  const { remove } = useNotification();

  const [visible, setVisible] = useState(false);

  // Play enter animation

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  // Play exit animation

  function handleClose() {
    setVisible(false);

    window.setTimeout(() => {
      remove(notification.id);
    }, 250);
  }

  const icon = {
    success: <CheckCircle2 size={22} className="text-green-400" />,
    error: <AlertCircle size={22} className="text-red-400" />,
    warning: <AlertTriangle size={22} className="text-yellow-400" />,
    info: <Info size={22} className="text-sky-400" />,
  };

  const border = {
    success: "border-green-500/40",
    error: "border-red-500/40",
    warning: "border-yellow-500/40",
    info: "border-sky-500/40",
  };

  const background = {
    success: "bg-green-500/10",
    error: "bg-red-500/10",
    warning: "bg-yellow-500/10",
    info: "bg-sky-500/10",
  };

  return (
    <div
      className={clsx(
        "pointer-events-auto",
        "transition-all duration-300",
        visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden rounded-2xl border",
          "bg-[#101827]/95 backdrop-blur-xl",
          "shadow-2xl shadow-black/40",
          "px-5 py-4",
          border[notification.type],
        )}
      >
        {/* Progress */}

        <div
          className={clsx(
            "absolute bottom-0 left-0 h-[2px]",
            notification.type === "success" && "bg-green-400",
            notification.type === "error" && "bg-red-400",
            notification.type === "warning" && "bg-yellow-400",
            notification.type === "info" && "bg-sky-400",
          )}
          style={{
            width: "100%",
            animation: `notificationProgress ${notification.duration ?? 4000}ms linear forwards`,
          }}
        />

        <div className="flex items-center gap-4">
          <div
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-full",
              background[notification.type],
            )}
          >
            {icon[notification.type]}
          </div>

          <div className="flex flex-1 items-center">
            <p className="text-sm leading-none font-semibold text-white">
              {notification.message}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
