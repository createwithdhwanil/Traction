import { useState } from "react";
import { encrypt } from "../../utils/encryption";

function HabitForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [goalDays, setGoalDays] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;
    console.log({
      title,
      description,
      category,
      goalDays,
    });
    onCreate({
      title,
      description,
      category,
      goalDays,
    });

    setTitle("");
    setDescription("");
    setCategory("General");
    setGoalDays(0);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Create New Habit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Habit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          rows="3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="General">General</option>
          <option value="Health">Health</option>
          <option value="Fitness">Fitness</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Finance">Finance</option>
        </select>

        <div>
          <label className="block mb-2 text-sm font-medium text-black dark:text-white">
            Goal Days
          </label>

          <input
            type="number"
            min="0"
            placeholder="30"
            value={goalDays}
            onChange={(e) => setGoalDays(Number(e.target.value))}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <p className="text-xs text-gray-500 mt-1">
            Set 0 if you don't want a goal.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
}

export default HabitForm;
