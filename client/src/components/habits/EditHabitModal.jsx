import { useEffect, useState } from "react";

function EditHabitModal({ habit, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [goalDays, setGoalDays] = useState(0);
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
      setDescription(habit.description || "");
      setCategory(habit.category || "General");
      setGoalDays(habit.goalDays || 0);

      setReminderEnabled(habit.reminderEnabled || false);

      setReminderTime(habit.reminderTime || "");
    }
  }, [habit]);

  if (!habit) return null;

  const submitHandler = (e) => {
    e.preventDefault();

    onSave({
      ...habit,
      title,
      description,
      category,
      goalDays,
      reminderEnabled,
      reminderTime: reminderEnabled ? reminderTime : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Habit</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border p-3 dark:bg-slate-800"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border p-3 dark:bg-slate-800"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border p-3 dark:bg-slate-800"
          >
            <option>General</option>
            <option>Fitness</option>
            <option>Health</option>
            <option>Study</option>
            <option>Work</option>
            <option>Finance</option>
          </select>
          <input
            type="number"
            min="0"
            value={goalDays}
            onChange={(e) => setGoalDays(Number(e.target.value))}
            placeholder="Goal Days"
            className="w-full rounded-xl border p-3 dark:bg-slate-800"
          />
          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
            />

            <label className="text-sm font-medium">Enable Reminder</label>
          </div>

          {reminderEnabled && (
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full rounded-xl border p-3 dark:bg-slate-800 mt-3"
            />
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHabitModal;
