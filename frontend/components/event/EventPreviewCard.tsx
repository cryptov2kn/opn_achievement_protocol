import { getUTCOffset } from "@/lib/timezone";
import { Achievement } from "@/types/achievement";
import { EventFormData } from "@/types/event";

interface Props {
  form: EventFormData;
  achievements: Achievement[];
}

export default function EventPreviewCard({ form, achievements }: Props) {
  const achievement = achievements.find(
    (item) => item.id === form.achievementId,
  );
  return (
    <div className="rounded-3xl border border-violet-500/20 bg-[#121214] p-5 md:p-6">
      <h2 className="text-lg font-bold md:text-xl">Live Preview</h2>

      {/* preview */}
      <div className="mt-6 p-6">
        <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-zinc-800">
          {form.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={form.image}
              alt={form.title || "Event Image"}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-zinc-500">Event Image</span>
          )}
        </div>

        <div className="mt-5 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold">{form.title || "Event Title"}</h3>

          <p className="mt-2 text-sm text-zinc-500">
            {achievement?.title || "Linked Achievement"}
          </p>
        </div>

        <div className="mt-6 space-y-2 text-sm text-zinc-400">
          {/* Date */}
          <div className="flex justify-between">
            <span>📅 Date</span>
            <span>
              {form.startDate
                ? `${form.startDate} → ${form.endDate || "?"}`
                : "--"}
            </span>
          </div>

          {/* Time */}
          <div className="flex justify-between">
            <span>🕐 Time</span>

            <span>
              {form.startTime ? (
                <>
                  {form.startTime} → {form.endTime || "?"}
                  <span className="ml-1 text-xs text-zinc-500">
                    ({getUTCOffset(form.timezone)})
                  </span>
                </>
              ) : (
                "--"
              )}
            </span>
          </div>

          {/* Participants */}
          <div className="flex justify-between">
            <span>👥 Participants</span>
            <span>{form.maxParticipants || "--"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
