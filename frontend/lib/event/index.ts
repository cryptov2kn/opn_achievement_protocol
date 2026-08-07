import { Event } from "@/types/event";

// ===============================
// Constants
// ===============================

export const PAGE_SIZE = 6;

// ===============================
// Filter
// ===============================

export function filterEvents(events: Event[], keyword: string) {
  const search = keyword.trim().toLowerCase();

  return events.filter((event) => {
    const text = [
      event.title,
      event.event_type,
      event.location ?? "",
      event.description ?? "",
      event.achievement?.title ?? "",
      event.achievement?.category ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return text.includes(search);
  });
}

// ===============================
// Sort
// ===============================

export function sortEvents(events: Event[], sort: string) {
  const sorted = [...events];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );

    case "upcoming":
    case "live":
      return sorted.sort(
        (a, b) =>
          new Date(a.start_date ?? "").getTime() -
          new Date(b.start_date ?? "").getTime(),
      );

    case "ended":
      return sorted.sort(
        (a, b) =>
          new Date(b.end_date ?? "").getTime() -
          new Date(a.end_date ?? "").getTime(),
      );

    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }
}

// ===============================
// View
// ===============================

export function viewEvents(events: Event[], view: string) {
  const now = new Date();

  switch (view) {
    case "upcoming":
      return events.filter((event) => {
        if (!event.start_date) return false;

        return new Date(event.start_date) > now;
      });

    case "live":
      return events.filter((event) => {
        if (!event.start_date || !event.end_date) return false;

        return (
          new Date(event.start_date) <= now && new Date(event.end_date) >= now
        );
      });

    case "ended":
      return events.filter((event) => {
        if (!event.end_date) return false;

        return new Date(event.end_date) < now;
      });

    default:
      return events;
  }
}

// ===============================
// Pagination
// ===============================

export function paginateEvents(
  events: Event[],
  page: number,
  pageSize: number = PAGE_SIZE,
) {
  const start = (page - 1) * pageSize;

  return events.slice(start, start + pageSize);
}

// ===============================
// Total pages
// ===============================

export function getTotalPages(
  totalItems: number,
  pageSize: number = PAGE_SIZE,
) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}
