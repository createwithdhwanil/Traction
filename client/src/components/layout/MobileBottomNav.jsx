import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  CheckSquare,
  Trophy,
  User,
} from "lucide-react";

export default function MobileBottomNav() {
  const items = [
    {
      icon: BarChart3,
      path: "/analytics",
    },
    {
      icon: CheckSquare,
      path: "/habits",
    },
    {
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      icon: Trophy,
      path: "/achievements",
    },
    {
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 ${
                  isActive ? "text-indigo-600" : "text-slate-500"
                }`
              }
            >
              <Icon size={22} />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
