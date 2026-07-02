import useProfile from "../hooks/useProfile";
import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: profile, isLoading } = useProfile();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <DashboardLayout onLogout={handleLogout}>
        <div className="text-center py-20">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout onLogout={handleLogout}>
      <PageHeader title="Profile" subtitle="Your habit journey" icon="👤" />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Habits" value={profile.totalHabits} icon="📋" />

        <StatCard
          title="Completions"
          value={profile.totalCompletions}
          icon="✅"
        />

        <StatCard title="Best Streak" value={profile.bestStreak} icon="🔥" />

        <StatCard
          title="Achievements"
          value={profile.achievementsCount}
          icon="🏆"
        />
      </div>

      <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {profile.name}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {profile.email}
            </p>

            <p className="text-sm text-slate-400 mt-2">
              Joined {new Date(profile.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {profile.achievements?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            🏆 Achievements
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {profile.achievements.map((badge) => (
              <div
                key={badge._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6"
              >
                <div className="text-5xl mb-4">{badge.icon}</div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {badge.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
