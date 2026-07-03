import {
  X,
  Menu,
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Trophy,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MobileSidebar({ open, setOpen, onLogout }) {
  const navigate = useNavigate();
  const menu = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: CheckSquare,
      title: "Habits",
      path: "/habits",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      path: "/analytics",
    },
    {
      icon: Trophy,
      title: "Achievements",
      path: "/achievements",
    },
    {
      icon: User,
      title: "Profile",
      path: "/profile",
    },
    {
      icon: Settings,
      title: "Settings",
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[220px] bg-white dark:bg-slate-900 z-50 transform transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <div className="flex justify-end p-3">
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={22} className="text-slate-700 dark:text-white" />
            </button>
          </div>

          <div className="flex flex-col items-center px-4 pb-5">
            <img
              src="/logo.png"
              alt="Traction"
              className="
        w-28
        h-auto
        object-contain
        drop-shadow-2xl
      "
            />
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                onClick={() => {
                  setOpen(false);
                  navigate(item.path);
                }}
                className="
  w-full
  flex
  items-center
  gap-4
  px-4
  py-3
  rounded-2xl
  font-medium
  text-slate-700
  dark:text-slate-300
  hover:bg-slate-100
  dark:hover:bg-slate-800
  transition-all
"
              >
                <Icon size={20} />
                {item.title}
              </button>
            );
          })}

          <div className="pt- mt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
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
        transition
      "
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default MobileSidebar;
