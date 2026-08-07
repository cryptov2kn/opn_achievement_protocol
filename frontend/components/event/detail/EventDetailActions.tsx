"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";

interface Props {
  eventId: string;
}

export default function EventDetailActions({ eventId }: Props) {
  return (
    <div className="mt-10 border-t border-zinc-800 pt-10">
      <div className="flex flex-wrap justify-end gap-4">
        <Link href={`/events/${eventId}/edit`}>
          <Button variant="primary" size="lg">
            Edit
          </Button>
        </Link>

        <Link href={`/events/${eventId}/delete`}>
          <Button variant="danger" size="lg">
            Delete
          </Button>
        </Link>
      </div>
    </div>
  );
}
