import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/layout/DashboardContent";

import ActivityScoreCard from "@/components/dashboard/ActivityScoreCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RecentEvents from "@/components/dashboard/RecentEvents";
import StatsCards from "@/components/dashboard/StatsCards";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <DashboardContent showSearch>
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* LEFT */}
          <div className="flex flex-col gap-8 xl:col-span-2">
            <ActivityScoreCard />

            <StatsCards />

            <RecentActivity />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">
            <QuickActions />

            <RecentEvents />
          </div>
        </div>
      </DashboardContent>
    </main>
  );
}
