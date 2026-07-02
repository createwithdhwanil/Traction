import { useState } from "react";
import { Plus } from "lucide-react";

function QuickAddCard({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [goalDays, setGoalDays] = useState(0);
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const [reminderTime, setReminderTime] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onCreate({
      title,
      description,
      category,
      goalDays,
      reminderEnabled,
      reminderTime,
    });

    setTitle("");
    setDescription("");
    setCategory("General");
    setGoalDays(0);
    setReminderEnabled(false);
    setReminderTime("");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
          <Plus className="text-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold dark:text-white">Quick Add Habit</h2>

          <p className="text-slate-500 text-sm">
            Create a new habit in seconds.
          </p>
        </div>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 px-4 py-3"
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 px-4 py-3"
          rows="3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 px-4 py-3"
        >
          <option>General</option>
          <option>Fitness</option>
          <option>Health</option>
          <option>Study</option>
          <option>Work</option>
          <option>Finance</option>
        </select>

        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            Goal Days
          </label>

          <input
            type="number"
            min="0"
            value={goalDays}
            onChange={(e) => setGoalDays(Number(e.target.value))}
            placeholder="30"
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 px-4 py-3"
          />

          <p className="text-xs text-slate-500 mt-1">Set 0 for no goal</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={reminderEnabled}
            onChange={(e) => setReminderEnabled(e.target.checked)}
          />

          <label>Enable Reminder</label>
        </div>
        {reminderEnabled && (
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 px-4 py-3"
          />
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold transition"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
}

export default QuickAddCard;
