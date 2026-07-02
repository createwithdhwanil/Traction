import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDashboard from "../hooks/useDashboard";

import DashboardLayout from "../layouts/DashboardLayout";

import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import SectionCard from "../components/common/SectionCard";

import WeeklyChart from "../components/analytics/WeeklyChart";
import MonthlyHeatmap from "../components/analytics/MonthlyHeatmap";

export default function Analytics() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { dashboard, loading } = useDashboard();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <DashboardLayout onLogout={handleLogout}>
        <div className="text-center py-20">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <PageHeader
        title="Analytics"
        subtitle="Track your progress and consistency"
        icon="📈"
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Habits"
          value={dashboard?.stats?.totalHabits || 0}
          icon="📋"
        />

        <StatCard
          title="Completions"
          value={dashboard?.stats?.totalCompletions || 0}
          icon="✅"
        />

        <StatCard
          title="Completion Rate"
          value={`${dashboard?.stats?.completionRate || 0}%`}
          icon="🎯"
        />

        <StatCard
          title="Consistency"
          value={`${dashboard?.stats?.consistencyScore || 0}%`}
          icon="🔥"
        />
      </div>

      <div className="space-y-6">
        <SectionCard>
          <WeeklyChart weeklyData={dashboard?.weeklyData ?? []} />
        </SectionCard>

        <SectionCard>
          <MonthlyHeatmap logs={dashboard?.heatmapLogs || []} />
        </SectionCard>
      </div>
    </DashboardLayout>
  );
}
