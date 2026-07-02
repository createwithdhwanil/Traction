import HabitCard from "./HabitCard";

function HabitGrid({ habits, onDelete, onComplete, onEdit }) {
  if (!habits || habits.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center">
        <div className="text-6xl mb-4">🎯</div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          No habits yet
        </h3>

        <p className="text-slate-500 dark:text-slate-400">
          Create your first habit and start building consistency.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default HabitGrid;
