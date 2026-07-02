import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Trophy,
  User,
  Settings,
  LogOut,
} from "lucide-react";
function Sidebar({ onLogout }) {
  const menu = [
    { icon: LayoutDashboard, title: "Dashboard", path: "/dashboard" },
    { icon: CheckSquare, title: "Habits", path: "/habits" },
    { icon: BarChart3, title: "Analytics", path: "/analytics" },
    { icon: Trophy, title: "Achievements", path: "/achievements" },
    { icon: User, title: "Profile", path: "/profile" },
    { icon: Settings, title: "Settings", path: "/settings" },
  ];
  return (
    <aside className="mb-10 text-center bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {" "}
      {/* Logo */}{" "}
      <div className="flex items-right px-18 py-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Traction"
            className="
        w-20
        h-16
        drop-shadow-xl
      "
          />
        </div>
      </div>
      {/* Navigation */}{" "}
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.title}</span>
            </NavLink>
          );
        })}

        <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onLogout}
            className="
        w-full
        flex
        items-center
        gap-4
        px-4
        py-3
        rounded-2xl
        text-red-500
        hover:bg-red-50
        dark:hover:bg-red-950/20
        transition-all
      "
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
export default Sidebar;
