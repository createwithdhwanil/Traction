function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-32 rounded-3xl bg-slate-200 dark:bg-slate-800" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-3xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default DashboardSkeleton;
