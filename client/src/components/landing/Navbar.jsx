import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          backdrop-blur-xl
          bg-white/80
          dark:bg-slate-950/80
          border-b
          border-slate-200
          dark:border-slate-800
        "
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo-icon.png" alt="Traction" className="w-10 h-10" />

              <span className="text-2xl font-black">Traction</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="font-medium hover:text-indigo-600 transition"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="font-medium hover:text-indigo-600 transition"
              >
                How It Works
              </a>

              <a
                href="#showcase"
                className="font-medium hover:text-indigo-600 transition"
              >
                Showcase
              </a>
            </nav>
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <Link
                to="/login"
                className="font-medium hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-indigo-600
                  text-white
                  font-semibold
                  hover:bg-indigo-700
                  transition
                "
              >
                Get Started
              </Link>
            </div>
            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  font-medium
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  bg-indigo-600
                  text-white
                  font-semibold
                  hover:bg-indigo-700
                  transition
                "
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`
          fixed
          inset-0
          z-[60]
          transition
          ${mobileOpen ? "visible" : "invisible"}
        `}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`
            absolute inset-0 bg-black/50
            transition-opacity
            ${mobileOpen ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Drawer */}
        <div
          className={`
            absolute
            top-0
            right-0
            h-full
            w-72
            bg-white
            dark:bg-slate-900
            transition-transform
            duration-300
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex justify-end p-5">
            <button onClick={() => setMobileOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <div className="px-6 space-y-6">
            <a href="#features" className="block text-lg font-medium">
              Features
            </a>

            <a href="#how-it-works" className="block text-lg font-medium">
              How It Works
            </a>

            <a href="#showcase" className="block text-lg font-medium">
              Showcase
            </a>

            <div className="pt-6 border-t">
              <Link to="/login" className="block mb-4">
                Login
              </Link>

              <Link
                to="/register"
                className="
                  block
                  text-center
                  py-3
                  rounded-xl
                  bg-indigo-600
                  text-white
                  font-semibold
                "
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
