"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import DashboardActionButton from "@/components/ui/DashboardActionButton";
import DashboardPagination from "@/components/ui/DashboardPagination";
import DashboardSection from "@/components/ui/DashboardSection";
import DashboardSelect from "@/components/ui/DashboardSelect";
import DataState from "@/components/ui/DataState";

import EventCard from "./EventCard";

import { useEventFilters } from "@/hooks/event/useEventFilters";
import { useEventList } from "@/hooks/event/useEventList";

import {
  PAGE_SIZE,
  filterEvents,
  getTotalPages,
  paginateEvents,
  sortEvents,
  viewEvents,
} from "@/lib/event";

export default function EventSection() {
  const { events, loading, isConnected, loadingWallet } = useEventList();

  const { search, view, page, setView, setPage } = useEventFilters();

  const router = useRouter();

  /**
   * Search
   */
  const filteredEvents = useMemo(() => {
    return filterEvents(events, search);
  }, [events, search]);

  /**
   * View
   */
  const viewedEvents = useMemo(() => {
    let result = filteredEvents;

    result = viewEvents(result, view);

    result = sortEvents(result, view);

    return result;
  }, [filteredEvents, view]);

  /**
   * Pagination
   */
  const paginatedEvents = useMemo(() => {
    return paginateEvents(viewedEvents, page, PAGE_SIZE);
  }, [viewedEvents, page]);

  /**
   * Total Pages
   */
  const totalPages = useMemo(() => {
    return getTotalPages(viewedEvents.length, PAGE_SIZE);
  }, [viewedEvents]);

  if (loadingWallet) {
    return (
      <DashboardSection
        title="Event List"
        description="Manage all events created by your organization."
      >
        <DataState
          title="Loading Wallet..."
          description="Connecting to your wallet..."
        />
      </DashboardSection>
    );
  }

  return (
    <DashboardSection
      title="Event List"
      description="Manage all events created by your organization."
      actions={
        <>
          <DashboardSelect
            label="View"
            value={view}
            onChange={setView}
            items={[
              {
                label: "Newest",
                value: "newest",
              },
              {
                label: "Oldest",
                value: "oldest",
              },

              {
                divider: true,
                label: "",
              },

              {
                label: "Upcoming",
                value: "upcoming",
              },
              {
                label: "Live",
                value: "live",
              },
              {
                label: "Ended",
                value: "ended",
              },
            ]}
          />

          <DashboardActionButton
            variant="primary"
            className="h-10 min-w-[120px] px-3 sm:h-14 sm:min-w-[140px] sm:px-4"
            onClick={() => router.push("/events/create")}
          >
            + New Event
          </DashboardActionButton>
        </>
      }
    >
      {!isConnected ? (
        <DataState
          title="Wallet Not Connected"
          description="Connect your wallet to view your events."
        />
      ) : loading ? (
        <DataState
          title="Loading Events..."
          description="Fetching your event list."
        />
      ) : viewedEvents.length === 0 ? (
        <DataState
          title="No Events Found"
          description="Try another filter or create your first event."
          buttonText="+ New Event"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <DashboardPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </DashboardSection>
  );
}
