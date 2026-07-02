import { CheckSquare, BarChart3, Flame, Trophy } from "lucide-react";
import FadeIn from "../ui/FadeIn";

const features = [
  {
    icon: CheckSquare,
    title: "Habit Tracking",
    description:
      "Create habits, organize routines, and stay focused on what matters most.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Understand your progress with detailed completion rates and insights.",
  },
  {
    icon: Flame,
    title: "Streaks",
    description:
      "Build momentum with daily streak tracking and consistency metrics.",
  },
  {
    icon: Trophy,
    title: "Achievements",
    description:
      "Unlock milestones and celebrate progress as you build better habits.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Everything you need to stay consistent.
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Powerful tools designed to help you build habits, track progress,
            and achieve your goals.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <div
                  className="
                    bg-white
                    dark:bg-slate-900
                    rounded-3xl
                    p-8
                    border
                    border-slate-200
                    dark:border-slate-800
                    hover:-translate-y-2
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-indigo-100
                      dark:bg-indigo-950
                      flex
                      items-center
                      justify-center
                      mb-6
                    "
                  >
                    <Icon size={28} className="text-indigo-600" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>

                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
