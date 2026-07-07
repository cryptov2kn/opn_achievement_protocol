import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import ActivityScoreCard from "@/components/dashboard/ActivityScoreCard";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentEvents from "@/components/dashboard/RecentEvents";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div
        className="
    flex-1

    px-4
    sm:px-6
    lg:px-8

    py-6
  "
      >
        <Topbar />

        <div
          className="
  mt-8

  grid
  grid-cols-1

  xl:grid-cols-3

  gap-8
"
        >
          {/* LEFT */}
          <div
            className="
xl:col-span-2
flex
flex-col
gap-8
"
          >
            <div>
              <ActivityScoreCard />
            </div>

            <div>
              <StatsCards />
            </div>

            <RecentActivity />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">
            <QuickActions />

            <RecentEvents />
          </div>
        </div>
      </div>
    </main>
  );
}
