import EventDetailStat from "@/components/event/detail/EventDetailStat";
import { Credential } from "@/types/credential";
import { DateTime } from "luxon";

interface Props {
  credential: Credential;
}

function formatDateTime(value: string | null) {
  if (!value) {
    return {
      date: "-",
      time: "-",
      offset: "",
    };
  }

  const dateTime = DateTime.fromISO(value).toLocal();

  return {
    date: dateTime.toFormat("MMM dd, yyyy"),
    time: dateTime.toFormat("HH:mm"),
    offset: `UTC${dateTime.toFormat("ZZ").slice(0, 3)}`,
  };
}

export default function CredentialDetailInfo({ credential }: Props) {
  const issued = formatDateTime(credential.issued_at);
  const revoked = formatDateTime(credential.revoked_at);

  return (
    <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
      <EventDetailStat
        icon="🪪"
        title="Status"
        value={
          <span
            className={
              credential.status === "valid"
                ? "text-emerald-400"
                : "text-red-400"
            }
          >
            {credential.status === "valid" ? "✓ Valid" : "✕ Revoked"}
          </span>
        }
      />

      <EventDetailStat
        icon="🎫"
        title="Token ID"
        value={credential.token_id ?? "-"}
      />

      <EventDetailStat
        icon="📅"
        title="Issued At"
        value={
          <div>
            <div>{issued.date}</div>

            <div className="mt-1 text-sm font-normal text-zinc-400">
              {issued.time}
              {issued.offset && ` (${issued.offset})`}
            </div>
          </div>
        }
      />

      <EventDetailStat
        icon="🚫"
        title="Revoked At"
        value={
          <div>
            <div>{revoked.date}</div>

            <div className="mt-1 text-sm font-normal text-zinc-400">
              {revoked.time}
              {revoked.offset && ` (${revoked.offset})`}
            </div>
          </div>
        }
      />
    </section>
  );
}
