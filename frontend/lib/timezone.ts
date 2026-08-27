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
