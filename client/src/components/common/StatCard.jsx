export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-500">{title}</p>

        <span className="text-3xl">{icon}</span>
      </div>

      <h3 className="text-3xl font-bold mt-4 text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
}
