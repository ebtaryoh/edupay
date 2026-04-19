import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-auto bg-[#FAFAFD]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] overflow-x-auto">
        {/* Sidebar */}
        <Sidebar open={open} onClose={() => setOpen(false)} />

        {/* Main content */}
        <main className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden bg-[#FAFAFD]">
          <div className="px-5 py-5 sm:px-6 lg:px-8 xl:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}