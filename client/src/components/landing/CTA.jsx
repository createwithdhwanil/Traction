import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="
            rounded-[32px]
            bg-slate-950
            text-white
            p-12
            md:p-16
            text-center
            overflow-hidden
            relative
          "
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Ready to build traction?
            </h2>

            <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
              Start tracking habits today and turn small daily actions into
              lasting progress.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="
    px-8
    py-4
    rounded-2xl
    bg-indigo-600
    text-white
    font-semibold
    hover:bg-indigo-700
    transition
  "
              >
                Get Started Free
              </Link>

              <Link
                to="/login"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-8
                  py-4
                  rounded-2xl
                  border
                  border-slate-700
                  hover:bg-slate-800
                  transition
                "
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
