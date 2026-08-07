"use client";

import DashboardActionButton from "./DashboardActionButton";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 border-t border-zinc-800 pt-8">
      <div className="flex items-center justify-center gap-4">
        <DashboardActionButton
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange?.(currentPage - 1);
            }
          }}
        >
          ← Previous
        </DashboardActionButton>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;

            return (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={
                  page === currentPage
                    ? "h-9 w-9 rounded-lg bg-violet-500 font-semibold text-white transition"
                    : "h-9 w-9 rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                }
              >
                {page}
              </button>
            );
          })}
        </div>

        <DashboardActionButton
          disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange?.(currentPage + 1);
            }
          }}
        >
          Next →
        </DashboardActionButton>
      </div>
    </div>
  );
}
