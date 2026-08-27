import { DateTime } from "luxon";

export function convertEventTimeToUTC(
  date: string,
  time: string,
  timezone: string,
): string | null {
  if (!date || !time || !timezone) {
    return null;
  }

  const localDateTime = DateTime.fromISO(`${date}T${time}`, {
    zone: timezone,
  });

  if (!localDateTime.isValid) {
    throw new Error(
      `Invalid event time: ${localDateTime.invalidReason ?? "Unknown error"}`,
    );
  }

  return localDateTime.toUTC().toISO();
}
