import { Flame, Target, CheckCircle } from "lucide-react";

function WelcomeBanner({ user, dashboard }) {
  const currentStreak = dashboard?.bestHabit?.currentStreak || 0;
  const totalCompletions = dashboard?.stats?.totalCompletions || 0;
  const totalHabits = dashboard?.stats?.totalHabits || 0;

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="mb-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold">
        {greeting}, {user?.name || "User"} 👋
      </h1>

      <p className="mt-2 text-indigo-100">
        Stay consistent. Small actions compound into big results.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={18} />
            <span className="text-sm font-medium">Current Streak</span>
          </div>

          <p className="text-2xl font-bold">{currentStreak} Days</p>
        </div>

        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Completions</span>
          </div>

          <p className="text-2xl font-bold">{totalCompletions}</p>
        </div>

        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={18} />
            <span className="text-sm font-medium">Active Habits</span>
          </div>

          <p className="text-2xl font-bold">{totalHabits}</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
