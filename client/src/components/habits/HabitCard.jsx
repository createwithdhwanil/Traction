import { Check, Pencil, Trash2, Flame, CalendarDays, Eye } from "lucide-react";
import HabitCalendar from "./HabitCalendar";
import { useNavigate } from "react-router-dom";

function HabitCard({ habit, onDelete, onComplete, onEdit }) {
  const completionCount = habit.totalCompletions || 0;

  const progress =
    habit.goalDays > 0
      ? Math.min(Math.round((completionCount / habit.goalDays) * 100), 100)
      : 0;

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/habits/${habit.id}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Premium Accent */}
      <div className="h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">
              {habit.title}
            </h3>

            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
              {habit.category || "General"}
            </span>

            {habit.reminderEnabled && habit.reminderTime && (
              <div className="mt-2 text-xs text-blue-500 font-medium">
                🔔 Reminder: {habit.reminderTime}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mt-5 text-slate-600 dark:text-slate-400 min-h-12">
          {habit.description || "No description added yet."}
        </p>

        {/* Streak */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-500">
            <Flame size={18} />

            <span
              className={`font-semibold ${
                habit.currentStreak >= 7 ? "text-orange-600" : ""
              }`}
            >
              {habit.currentStreak || 0} Day Streak
            </span>
          </div>

          <span className="text-sm text-slate-500">
            Best: {habit.longestStreak || 0} 🔥
          </span>
        </div>

        {/* Stats */}
        <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
          <span>✅ {completionCount} Completions</span>

          <span>🎯 {habit.goalDays > 0 ? habit.goalDays : "No Goal"}</span>
        </div>

        {/* Goal Progress */}
        {habit.goalDays > 0 && (
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                🎯 Goal: {habit.goalDays} Days
              </span>

              <span className="text-sm font-medium text-slate-500">
                {progress}%
              </span>
            </div>

            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-green-500 to-emerald-400 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                ✅ {completionCount} completed
              </span>

              <span className="text-slate-600 dark:text-slate-400">
                ⏳ {Math.max(habit.goalDays - completionCount, 0)} remaining
              </span>
            </div>

            {completionCount >= habit.goalDays && (
              <div className="mt-4 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 text-white px-4 py-3 text-sm font-semibold text-center shadow-lg">
                🏆 Goal Achieved! Keep The Momentum Going
              </div>
            )}
          </div>
        )}

        {/* Last Completed */}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />

          <span>Last Completed: {habit.lastCompletedDate || "Not yet"}</span>
        </div>

        {/* Calendar */}
        <div className="mt-6">
          <HabitCalendar habitId={habit._id} />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <button
            onClick={() => navigate(`/habits/${habit._id}`)}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-700 hover:bg-slate-800 text-white font-medium transition-all duration-300"
          >
            Details
          </button>
          <button
            onClick={() => onComplete(habit._id)}
            disabled={habit.completedToday}
            className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-medium transition-all duration-300 ${
              habit.completedToday
                ? "bg-slate-400 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {habit.completedToday ? "Completed" : "Complete"}
          </button>

          <button
            onClick={() => onEdit(habit)}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this habit?")) {
                onDelete(habit._id);
              }
            }}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;
