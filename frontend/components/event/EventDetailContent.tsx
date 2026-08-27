"use client";

import FormSection from "@/components/ui/FormSection";

import EventDetailActions from "./detail/EventDetailActions";
import EventDetailHeader from "./detail/EventDetailHeader";
import EventDetailImage from "./detail/EventDetailImage";
import EventDetailInfo from "./detail/EventDetailInfo";
import EventDetailMetadata from "./detail/EventDetailMetadata";

import { Event } from "@/types/event";

interface Props {
  event: Event;
}

export default function EventDetailContent({ event }: Props) {
  return (
    <FormSection
      title="Event Detail"
      description="View the event information and manage this event."
    >
      <EventDetailImage image={event.image ?? null} />

      <EventDetailHeader event={event} />

      <EventDetailInfo event={event} />

      <EventDetailMetadata event={event} />

      <EventDetailActions eventId={event.id} />
    </FormSection>
  );
}
