import { Calendar, Filter, LayoutGrid } from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";

function StatCard({ title, value, tag }) {
  return (
    <div className="rounded-[18px] border border-[#ECECF4] bg-white px-4 py-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[14px] text-[#656B81]">{title}</p>
        {tag ? <span className="text-[11px] font-semibold text-[#111]">{tag}</span> : null}
      </div>
      <p className="mt-2 text-[24px] font-bold text-[#171C34]">{value}</p>
    </div>
  );
}

function ChartCard({ title }) {
  return (
    <div className="rounded-[22px] border border-[#ECECF4] bg-white px-6 py-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[16px] font-semibold text-[#181D36]">{title}</h3>
        <p className="text-[11px] text-[#A5A8BA]">Jan 1st 2025 - Dec 31st 2025</p>
      </div>

      <svg viewBox="0 0 500 190" className="mt-6 h-[170px] w-full">
        <defs>
          <linearGradient id="reportLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#63D7F3" />
            <stop offset="100%" stopColor="#6A4BFF" />
          </linearGradient>
        </defs>
        <path d="M30 150H470" stroke="#E7EAF5" strokeDasharray="4 4" />
        <path d="M30 110H470" stroke="#E7EAF5" strokeDasharray="4 4" />
        <path d="M30 70H470" stroke="#E7EAF5" strokeDasharray="4 4" />
        <path d="M30 30H470" stroke="#E7EAF5" strokeDasharray="4 4" />
        <path
          d="M40 130 L70 122 L95 78 L120 118 L145 108 L170 106 L195 138 L220 101 L245 99 L270 64 L295 67 L320 97 L345 41 L370 74 L395 74 L420 35 L445 92 L470 60"
          fill="none"
          stroke="url(#reportLine)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function OverviewBlock({ heading }) {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-[#161B32]">{heading}</h2>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="flex h-[44px] items-center gap-2 rounded-[10px] border border-[#E8EAF5] bg-white px-4 text-[14px] text-[#697087]">
          <Calendar size={14} color="#697087" strokeWidth={2.5} />
          15 May 2024 - 24 May 2025
        </button>
        <button className="flex h-[44px] items-center gap-2 rounded-[10px] border border-[#E8EAF5] bg-white px-4 text-[14px] text-[#697087]">
          <Filter size={14} color="#697087" strokeWidth={2.5} />
          Filter
        </button>
        <button className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] bg-[#4E68F0] text-white">
          <LayoutGrid size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="New Admin" value="1,804" tag="+ Add" />
        <StatCard title="Administrators" value="89" tag="+ Add" />
        <StatCard title="Av. Session Length" value="2m 34s" />
      </div>

      <div className="mt-4">
        <ChartCard title="Active Administrators" />
      </div>
    </div>
  );
}

export default function AdminUserManagementUserReports() {
  return (
    <AdminAccountShell
      title="User Reports"
      activeKey="user-management"
      right={
        <div className="max-w-[760px] space-y-12">
          <OverviewBlock heading="Admin Overview" />
          <OverviewBlock heading="Student Overview" />
        </div>
      }
    />
  );
}
