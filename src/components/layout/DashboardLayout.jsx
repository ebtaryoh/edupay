import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFAFD]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1536px] overflow-x-hidden">
        {/* Sidebar */}
        <Sidebar open={open} onClose={() => setOpen(false)} />

        {/* Main content */}
        <main className="min-w-0 flex-1 overflow-x-hidden bg-[#FAFAFD]">
          <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6 xl:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}