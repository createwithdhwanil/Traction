import { Menu, Sun, Moon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";
function Topbar({ onMenu }) {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="flex items-center justify-between mb-8">
      {" "}
      {/* Left */}{" "}
      <div className="flex items-center gap-4">
        {" "}
        <button
          onClick={onMenu}
          className="lg:hidden p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition"
        >
          {" "}
          <Menu size={22} />{" "}
        </button>{" "}
        <div>
          {" "}
          <p className="text-sm text-slate-500"> {today} </p>{" "}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {" "}
            Dashboard{" "}
          </h1>{" "}
        </div>{" "}
      </div>{" "}
      {/* Right */}{" "}
      <div className="flex items-center gap-3">
        {" "}
        {/* Theme Toggle */}{" "}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {" "}
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}{" "}
        </button>{" "}
        {/* User */}{" "}
        <div className="flex items-center gap-3 ml-2">
          {" "}
          <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
            {" "}
            {user?.name?.charAt(0).toUpperCase() || "U"}{" "}
          </div>{" "}
          <div className="hidden lg:block">
            {" "}
            <p className="font-semibold text-slate-900 dark:text-white">
              {" "}
              {user?.name || "User"}{" "}
            </p>{" "}
            <p className="text-sm text-slate-500"> Keep going 🚀 </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </header>
  );
}
export default Topbar;
