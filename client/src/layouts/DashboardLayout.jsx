import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import MobileSidebar from "../components/layout/MobileSidebar";
import Topbar from "../components/layout/Topbar";
import MobileBottomNav from "../components/layout/MobileBottomNav";

function DashboardLayout({ children, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar onLogout={onLogout} />
      </div>
      {/* Mobile Sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onLogout={onLogout}
      />

      {/* Main Content */}

      <main className="flex-1 pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <Topbar onMenu={() => setSidebarOpen(true)} />
          {children}
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}

export default DashboardLayout;
