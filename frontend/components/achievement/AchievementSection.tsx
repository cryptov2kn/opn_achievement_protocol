"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import DashboardActionButton from "@/components/ui/DashboardActionButton";
import DashboardPagination from "@/components/ui/DashboardPagination";
import DashboardSection from "@/components/ui/DashboardSection";
import DashboardSelect from "@/components/ui/DashboardSelect";
import DataState from "@/components/ui/DataState";

import AchievementCard from "./AchievementCard";

import { ACHIEVEMENT_CATEGORIES } from "@/constants/achievement";

import { useAchievementFilters } from "@/hooks/achievement/useAchievementFilters";
import { useAchievementList } from "@/hooks/achievement/useAchievementList";

import {
  PAGE_SIZE,
  filterAchievements,
  getTotalPages,
  paginateAchievements,
  sortAchievements,
} from "@/lib/achievement";

import { viewAchievements } from "@/lib/achievement/viewAchievements";

export default function AchievementSection() {
  const { achievements, loading, isConnected, loadingWallet } =
    useAchievementList();

  const {
    search,
    category,
    view,
    page,

    setCategory,
    setView,
    setPage,
  } = useAchievementFilters();

  const router = useRouter();

  /**
   * Search + Category
   */
  const filteredAchievements = useMemo(() => {
    const categoryFiltered = filterAchievements(achievements, category);

    const keyword = search.trim().toLowerCase();

    if (!keyword) return categoryFiltered;

    return categoryFiltered.filter((achievement) => {
      return (
        achievement.title.toLowerCase().includes(keyword) ||
        achievement.category?.toLowerCase().includes(keyword) ||
        achievement.difficulty?.toLowerCase().includes(keyword)
      );
    });
  }, [achievements, category, search]);

  /**
   * View
   *
   * newest
   * oldest
   * live
   * ended
   * archived
   */
  const viewedAchievements = useMemo(() => {
    switch (view) {
      case "live":
      case "ended":
      case "archived":
        return viewAchievements(filteredAchievements, view);

      case "oldest":
      case "newest":
      default:
        return sortAchievements(filteredAchievements, view);
    }
  }, [filteredAchievements, view]);

  /**
   * Pagination
   */
  const paginatedAchievements = useMemo(() => {
    return paginateAchievements(viewedAchievements, page, PAGE_SIZE);
  }, [viewedAchievements, page]);

  /**
   * Total Pages
   */
  const totalPages = useMemo(() => {
    return getTotalPages(viewedAchievements.length, PAGE_SIZE);
  }, [viewedAchievements]);

  if (loadingWallet) {
    return (
      <DashboardSection
        title="Achievement List"
        description="Manage all achievements created by your organization."
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
      title="Achievement List"
      description="Manage all achievements created by your organization."
      actions={
        <>
          <DashboardSelect
            label="Category"
            value={category}
            onChange={setCategory}
            items={ACHIEVEMENT_CATEGORIES}
          />

          <DashboardSelect
            label="View"
            value={view}
            onChange={setView}
            items={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },

              { divider: true, label: "" },

              { label: "Live", value: "live" },
              { label: "Ended", value: "ended" },
              { label: "Archived", value: "archived" },
            ]}
          />

          <DashboardActionButton
            variant="primary"
            className="h-10 min-w-[120px] px-3 sm:h-14 sm:min-w-[140px] sm:px-4"
            onClick={() => router.push("/achievements/create")}
          >
            + New Achievement
          </DashboardActionButton>
        </>
      }
    >
      {!isConnected ? (
        <DataState
          title="Wallet Not Connected"
          description="Connect your wallet to view your achievements."
        />
      ) : loading ? (
        <DataState
          title="Loading Achievements..."
          description="Fetching your achievement list."
        />
      ) : viewedAchievements.length === 0 ? (
        <DataState
          title="No Achievements Found"
          description="Try another filter or create your first achievement."
          buttonText="+ New Achievement"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
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
