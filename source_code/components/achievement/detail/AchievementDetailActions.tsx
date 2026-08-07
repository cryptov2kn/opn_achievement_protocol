"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";

interface Props {
  achievementId: string;
  status: "published" | "archived";
}

export default function AchievementDetailActions({
  achievementId,
  status,
}: Props) {
  return (
    <div className="mt-10 border-t border-zinc-800 pt-10">
      <div className="flex flex-wrap justify-end gap-4">
        {status === "published" ? (
          <>
            <Link href={`/achievements/${achievementId}/edit`}>
              <Button variant="primary" size="lg">
                Edit
              </Button>
            </Link>

            <Link href={`/achievements/${achievementId}/archive`}>
              <Button variant="secondary" size="lg">
                Archive
              </Button>
            </Link>
          </>
        ) : (
          <Link href={`/achievements/${achievementId}/restore`}>
            <Button variant="primary" size="lg">
              Restore
            </Button>
          </Link>
        )}

        <Link href={`/achievements/${achievementId}/delete`}>
          <Button variant="danger" size="lg">
            Delete
          </Button>
        </Link>
      </div>
    </div>
  );
}
