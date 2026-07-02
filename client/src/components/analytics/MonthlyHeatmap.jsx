import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function MonthlyHeatmap({ logs = [] }) {
  const today = new Date();

  const startDate = new Date();
  startDate.setDate(today.getDate() - 180);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        🔥 Activity Heatmap
      </h2>

      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={logs}
        classForValue={(value) => {
          if (!value) return "color-empty";

          if (value.count >= 5) return "color-github-4";

          if (value.count >= 3) return "color-github-3";

          if (value.count >= 2) return "color-github-2";

          return "color-github-1";
        }}
        showWeekdayLabels
      />
    </div>
  );
}
