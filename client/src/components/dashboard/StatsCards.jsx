import { Flame, CheckCircle2, Target, Trophy, TrendingUp } from "lucide-react";

function StatsCards({ dashboard }) {
  const dashboardStats = [
    {
      title: "Current Streak",
      value: dashboard?.bestHabit?.currentStreak ?? 0,
      subtitle: dashboard?.bestHabit?.title || "No habits yet",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      title: "Total Habits",
      value: dashboard?.stats?.totalHabits ?? 0,
      subtitle: "Across all categories",
      icon: CheckCircle2,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Completion Rate",
      value: `${dashboard?.stats?.completionRate ?? 0}%`,
      subtitle: "Last 7 Days",
      icon: Target,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Total Completions",
      value: dashboard?.stats?.totalCompletions ?? 0,
      subtitle: "All Time",
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-8">
      {dashboardStats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="text-4xl font-bold mt-3 text-slate-900 dark:text-white">
                  {item.value}
                </h2>

                <div className="flex items-center gap-2 mt-4">
                  <TrendingUp size={16} className="text-green-500" />

                  <p className="text-sm text-slate-500">{item.subtitle}</p>
                </div>
              </div>

              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center shadow-lg`}
              >
                <Icon size={30} className="text-white" />
              </div>
            </div>

            <div className="mt-6 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full bg-linear-to-r ${item.color} w-3/4`}
              ></div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default StatsCards;
