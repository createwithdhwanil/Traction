import FadeIn from "../ui/FadeIn";

const screenshots = [
  {
    title: "Dashboard Overview",
    image: "../../../public/screenshots/dashboard.png",
  },
  {
    title: "Habit Tracking",
    image: "../../../public/screenshots/habits.png",
  },
  {
    title: "Analytics",
    image: "../../../public/screenshots/analytics.png",
  },
  {
    title: "Achievements",
    image: "../../../public/screenshots/achievements.png",
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              See Traction in action.
            </h2>

            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to build consistency and measure progress.
            </p>
          </div>
        </FadeIn>

        {/* Main Screenshot */}
        <FadeIn>
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-800
              shadow-2xl
              bg-white
              dark:bg-slate-900
              mb-10
            "
          >
            {/* Browser Bar */}
            <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <img
              src="/screenshots/dashboard.png"
              alt="Dashboard"
              className="w-full"
            />
          </div>
        </FadeIn>

        {/* Feature Screenshots */}
        <div className="grid md:grid-cols-3 gap-8">
          {screenshots.slice(1).map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-800
                  bg-white
                  dark:bg-slate-900
                  shadow-xl
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>

                <img src={item.image} alt={item.title} className="w-full" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
