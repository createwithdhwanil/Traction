export default function Stats() {
  const stats = [
    {
      value: "100",
      label: "Habits Created",
    },
    {
      value: "1000",
      label: "Completions Logged",
    },
    {
      value: "95%",
      label: "Consistency Rate",
    },
    {
      value: "24/7",
      label: "Progress Tracking",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                rounded-3xl
                p-6
                text-center
              "
            >
              <h3 className="text-3xl font-black">{stat.value}</h3>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
