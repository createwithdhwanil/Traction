import { Plus, CheckCircle2, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Plus,
      title: "Create Habits",
      description: "Set up habits that align with your goals and priorities.",
    },
    {
      icon: CheckCircle2,
      title: "Track Daily",
      description: "Mark habits complete and maintain your streaks every day.",
    },
    {
      icon: TrendingUp,
      title: "Build Traction",
      description:
        "Watch your consistency grow through analytics and achievements.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Simple. Consistent. Effective.</h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Three steps to turn daily actions into lasting habits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>

                <div className="text-sm font-bold text-indigo-600 mb-2">
                  Step {index + 1}
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>

                <p className="text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
