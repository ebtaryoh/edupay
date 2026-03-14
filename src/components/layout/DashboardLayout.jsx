import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F7FF]  ">
      {/* Mobile topbar
      <div className="lg:hidden sticky top-0 z-40 bg-[#F6F7FF]">
        <Topbar onMenu={() => setOpen(true)} />
      </div> */}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar open={open} onClose={() => setOpen(false)} />

        {/* Main content */}
        <main className="flex-1 min-h-screen bg-white">
          {/* Desktop topbar
          <div className="hidden lg:block sticky top-0 z-30 bg-[#F6F7FF]">
            <Topbar />
          </div> */}

          {/* Page container spacing (matches screenshot feel) */}
          <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
