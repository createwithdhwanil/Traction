export default function PageHeader({ title, subtitle, icon }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <span className="text-5xl">{icon}</span>

        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
