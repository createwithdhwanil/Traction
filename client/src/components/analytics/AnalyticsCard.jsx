import { Trophy, Flame, Target, TrendingUp } from "lucide-react";

function AnalyticsCard({ dashboard }) {
  const bestHabit = dashboard?.bestHabit;
  const bestCategory = dashboard?.bestCategory;
  const weeklyGoal = dashboard?.weeklyGoal;

  const goalPercent =
    weeklyGoal?.target > 0
      ? Math.min(
          Math.round((weeklyGoal.completed / weeklyGoal.target) * 100),
          100,
        )
      : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-full">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Insights
      </h2>

      {/* Best Habit */}
      <div className="mb-6 p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
            <Trophy size={22} className="text-white" />
          </div>

          <div>
            <p className="text-sm text-slate-500">Most Consistent</p>

            <h3 className="font-bold text-slate-900 dark:text-white">
              {bestHabit?.title || "No habits yet"}
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          🔥 {bestHabit?.currentStreak || 0} day streak
        </p>
      </div>

      {/* Best Category */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Flame className="text-orange-500" size={20} />
          </div>

          <div>
            <p className="text-sm text-slate-500">Best Category</p>

            <h3 className="font-semibold text-slate-900 dark:text-white">
              {bestCategory?.name || "N/A"}
            </h3>
          </div>
        </div>

        <span className="font-bold text-orange-500">
          {bestCategory?.count || 0} habits
        </span>
      </div>

      {/* Weekly Goal */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="text-green-500" size={18} />
            <span className="font-medium">Weekly Goal</span>
          </div>

          <span className="font-semibold">
            {weeklyGoal?.completed || 0} / {weeklyGoal?.target || 7}
          </span>
          <p className="text-xs text-slate-500 mt-2">
            {goalPercent}% completed
          </p>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${goalPercent}%` }}
          />
        </div>
      </div>

      {/* Progress Summary */}
      <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 p-5">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-green-500" size={22} />

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Keep Going
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              You've completed {dashboard?.stats?.totalCompletions || 0} habits
              so far.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
