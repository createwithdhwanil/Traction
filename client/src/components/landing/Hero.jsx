export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Build traction.
              <br />
              Every day.
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Track habits, maintain streaks, and turn daily actions into
              lasting progress.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold">
                Get Started Free
              </button>

              <button className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700">
                View Demo
              </button>
            </div>
          </div>

          {/* Right */}
          <div>
            {/* Dashboard Screenshot */}
            <img
              src="/dashboard-preview.png"
              alt="Traction Dashboard"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
