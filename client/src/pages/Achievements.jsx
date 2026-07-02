import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAchievements from "../hooks/useAchievements";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";

export default function Achievements() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { achievements, loading } = useAchievements();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <DashboardLayout onLogout={handleLogout}>
        <div className="text-center py-20">Loading Achievements...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <PageHeader
        title="Achievements"
        subtitle="Celebrate your milestones and progress"
        icon="🏆"
      />

      {achievements?.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
          <div className="text-6xl mb-4">🏆</div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            No Achievements Yet
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Complete habits and build streaks to unlock badges.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
              <h2 className="text-3xl font-bold">
                {achievements.length} Achievements Unlocked
              </h2>

              <p className="mt-2 text-indigo-100">
                Keep building habits and earning badges.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-lg transition"
              >
                <div className="text-6xl mb-4">{achievement.icon}</div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {achievement.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  {achievement.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400">
                    Unlocked on{" "}
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
