export function getUTCOffset(timezone: string) {
  if (!timezone) {
    return "UTC";
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "longOffset",
  }).formatToParts(new Date());

  const offset =
    parts.find((part) => part.type === "timeZoneName")?.value || "GMT";

  return offset.replace(/^GMT/, "UTC").replace(":00", "");
}

export function formatEventTime(
  startAt: string | null,
  endAt: string | null,
  timezone: string | null,
) {
  if (!startAt || !endAt) {
    return {
      date: "--",
      time: "--",
      timezone: null,
    };
  }

  const viewerTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const start = new Date(startAt);
  const end = new Date(endAt);

  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: viewerTimezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: viewerTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    date: `${dateFormatter.format(start)} → ${dateFormatter.format(end)}`,
    time: `${timeFormatter.format(start)} → ${timeFormatter.format(end)}`,
    timezone: getUTCOffset(viewerTimezone),
  };
}
