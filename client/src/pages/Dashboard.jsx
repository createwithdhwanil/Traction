import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useHabits from "../hooks/useHabits";
import DashboardLayout from "../layouts/DashboardLayout";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";
import SearchBar from "../components/dashboard/SearchBar";
import WeeklyChart from "../components/analytics/WeeklyChart";
import AnalyticsCard from "../components/analytics/AnalyticsCard";
import QuickAddCard from "../components/habits/QuickAddCard";
import HabitGrid from "../components/habits/HabitGrid";
import EditHabitModal from "../components/habits/EditHabitModal";
import useDashboard from "../hooks/useDashboard";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import { requestNotificationPermission } from "../utils/notifications";
import useReminderWatcher from "../hooks/useReminderWatcher";
import useAchievements from "../hooks/useAchievements";
import MonthlyHeatmap from "../components/analytics/MonthlyHeatmap";
import FloatingAddButton from "../components/layout/FloatingAddButton";

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const {
    habits,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
  } = useHabits();
  const { data: achievements = [] } = useAchievements();
  useReminderWatcher(habits);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const { dashboard, loading: dashboardLoading } = useDashboard();

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("All");
  const [editingHabit, setEditingHabit] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [achievementToast, setAchievementToast] = useState(null);
  const previousCountRef = useRef(0);

  useEffect(() => {
    if (!achievements) return;

    if (
      previousCountRef.current > 0 &&
      achievements.length > previousCountRef.current
    ) {
      const newestBadge = achievements[0];

      setAchievementToast(newestBadge);

      setTimeout(() => {
        setAchievementToast(null);
      }, 5000);
    }

    previousCountRef.current = achievements.length;
  }, [achievements]);
  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesSearch =
        habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = filter === "All" || habit.category === filter;

      return matchesSearch && matchesCategory;
    });
  }, [habits, searchTerm, filter]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  if (loading || dashboardLoading) {
    return <DashboardSkeleton />;
  }
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + (habit.totalCompletions || 0),
    0,
  );

  let nextBadge = null;

  if (totalCompletions < 10) {
    nextBadge = {
      icon: "🥈",
      title: "Getting Consistent",
      target: 10,
    };
  } else if (totalCompletions < 50) {
    nextBadge = {
      icon: "🥇",
      title: "Habit Builder",
      target: 50,
    };
  } else if (totalCompletions < 100) {
    nextBadge = {
      icon: "💎",
      title: "Habit Master",
      target: 100,
    };
  }

  const progress = nextBadge
    ? Math.min((totalCompletions / nextBadge.target) * 100, 100)
    : 100;
  const score = dashboard?.stats?.consistencyScore || 0;

  const scoreColor =
    score >= 80
      ? "text-emerald-500"
      : score >= 50
        ? "text-yellow-500"
        : "text-red-500";
  const completionAchievements = achievements.filter(
    (badge) => !badge.badgeId.startsWith("streak_"),
  );

  const streakAchievements = achievements.filter((badge) =>
    badge.badgeId.startsWith("streak_"),
  );

  return (
    <DashboardLayout onLogout={handleLogout}>
      <WelcomeBanner user={user} dashboard={dashboard} />

      <StatsCards dashboard={dashboard} />

      <div className="grid xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Consistency Score
                </p>

                <h3 className={`text-4xl font-bold mt-2 ${scoreColor}`}>
                  {score}%
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Last 30 days
                </p>
              </div>

              <div className="text-5xl">📈</div>
            </div>

            <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${dashboard?.stats?.consistencyScore || 0}%`,
                }}
              />
            </div>
          </div>
          <WeeklyChart weeklyData={dashboard?.weeklyData ?? []} />

          <div className="mt-6">
            <MonthlyHeatmap logs={dashboard?.heatmapLogs || []} />
          </div>
        </div>
        <AnalyticsCard dashboard={dashboard} />
      </div>

      {/* Desktop */}

      <div className="hidden lg:block">
        <QuickAddCard onCreate={(habit) => createHabit.mutate(habit)} />
      </div>

      {/* Mobile Bottom Sheet */}

      {showQuickAdd && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Add Habit
              </h2>

              <button
                onClick={() => setShowQuickAdd(false)}
                className="text-3xl leading-none dark:text-white"
              >
                ×
              </button>
            </div>

            <QuickAddCard
              onCreate={(habit) => {
                createHabit.mutate(habit);
                setShowQuickAdd(false);
              }}
            />
          </div>
        </div>
      )}

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />
      {nextBadge && (
        <div className="mb-8">
          <div className="bg-linear-to-r from-yellow-500 to-orange-500 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Next Achievement</p>

                <h3 className="text-2xl font-bold mt-1">
                  {nextBadge.icon} {nextBadge.title}
                </h3>

                <p className="mt-2 text-sm opacity-90">
                  {totalCompletions} / {nextBadge.target} completions
                </p>
              </div>

              <div className="text-5xl">{nextBadge.icon}</div>
            </div>

            <div className="mt-5">
              <div className="w-full bg-white/30 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-sm">{Math.round(progress)}% Complete</p>
            </div>
          </div>
        </div>
      )}
      {achievements.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              🏆 Achievements
            </h2>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              {achievements.length} Unlocked
            </span>
          </div>

          {/* Completion Achievements */}

          {completionAchievements.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                🏆 Completion Achievements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {completionAchievements.map((badge) => (
                  <div
                    key={badge._id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="text-5xl mb-3">{badge.icon}</div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {badge.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      {badge.description}
                    </p>

                    <div className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Unlocked
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Streak Achievements */}

          {streakAchievements.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-8 mb-4 text-slate-900 dark:text-white">
                🔥 Streak Achievements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {streakAchievements.map((badge) => (
                  <div
                    key={badge._id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="text-5xl mb-3">{badge.icon}</div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {badge.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      {badge.description}
                    </p>

                    <div className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Unlocked
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <EditHabitModal
        habit={editingHabit}
        onClose={() => setEditingHabit(null)}
        onSave={(updatedHabit) => {
          updateHabit.mutate({
            id: updatedHabit._id,
            habit: updatedHabit,
          });

          setEditingHabit(null);
        }}
      />
      {filteredHabits.length === 0 && searchTerm ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No matching habits
          </h3>

          <p className="text-slate-500 dark:text-slate-400">
            Try a different search term.
          </p>
        </div>
      ) : (
        <HabitGrid
          habits={filteredHabits}
          onDelete={(id) => deleteHabit.mutate(id)}
          onComplete={(id) => completeHabit.mutate(id)}
          onEdit={setEditingHabit}
        />
      )}
      {achievementToast && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-white dark:bg-slate-900 border border-yellow-400 rounded-3xl shadow-xl p-5 w-80">
            <div className="flex gap-4">
              <div className="text-5xl">{achievementToast.icon}</div>

              <div>
                <p className="text-yellow-500 font-bold text-sm">
                  🏆 Achievement Unlocked
                </p>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  {achievementToast.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {achievementToast.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <FloatingAddButton onClick={() => setShowQuickAdd(true)} />
    </DashboardLayout>
  );
}

export default Dashboard;
