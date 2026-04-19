import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Filter, LayoutGrid, ChevronRight } from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { AccountSettingsIcon, AccountUserIcon } from "../../../components/admin/account/AdminAccountShell";
import { studentApi } from "../../../api/student";
import { adminApi } from "../../../api/admin";

function MetricCard({ title, value, loading, tag, onTagClick }) {
  return (
    <div className="rounded-[18px] border border-[#ECECF4] bg-white px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[14px] text-[#656B81]">{title}</p>
        {tag ? (
          <button
            type="button"
            onClick={onTagClick}
            className="text-[11px] font-semibold text-[#4E68F0] hover:underline transition"
          >
            {tag}
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-[24px] font-bold text-[#171C34]">
        {loading ? <span className="text-[16px] text-[#B0B4C8]">Loading...</span> : value}
      </p>
    </div>
  );
}

function MiniChart({ monthlyData }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const maxVal = Math.max(...monthlyData, 1);

  // Map month counts to SVG y-coordinates (higher count = lower y value)
  const chartHeight = 160;
  const chartTop = 20;
  const xStart = 40;
  const xEnd = 470;
  const step = (xEnd - xStart) / (monthlyData.length - 1);

  const points = monthlyData.map((val, i) => {
    const x = xStart + i * step;
    const y = chartTop + chartHeight - (val / maxVal) * chartHeight;
    return `${x} ${y}`;
  });

  const polyline = points.join(" L ");

  return (
    <div className="rounded-[22px] border border-[#ECECF4] bg-white px-6 py-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[16px] font-semibold text-[#181D36]">Monthly Registrations</h3>
        <p className="text-[11px] text-[#A5A8BA]">Jan - Dec {new Date().getFullYear()}</p>
      </div>

      <svg viewBox="0 0 500 210" className="mt-4 h-[180px] w-full">
        <defs>
          <linearGradient id="lineGradUM" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#63D7F3" />
            <stop offset="100%" stopColor="#6A4BFF" />
          </linearGradient>
        </defs>
        <path d="M30 170H470" stroke="#E7EAF5" strokeDasharray="4 4" />
        <path d="M30 130H470" stroke="#E7EAF5" strokeDasharray="4 4" />
        <path d="M30 90H470" stroke="#E7EAF5" strokeDasharray="4 4" />
        <path d="M30 50H470" stroke="#E7EAF5" strokeDasharray="4 4" />

        {monthlyData.length > 1 ? (
          <path
            d={`M${points[0]} L ${points.slice(1).join(" L ")}`}
            fill="none"
            stroke="url(#lineGradUM)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {monthlyData.map((val, i) => {
          const x = xStart + i * step;
          const y = chartTop + chartHeight - (val / maxVal) * chartHeight;
          return (
            <circle key={i} cx={x} cy={y} r="5" fill="#6A4BFF" />
          );
        })}

        {months.map((m, i) => {
          const x = xStart + i * step;
          return (
            <text key={m} x={x} y="200" textAnchor="middle" fontSize="9" fill="#A5A8BA">{m}</text>
          );
        })}
      </svg>
    </div>
  );
}

function PeopleRow({ icon, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-5 rounded-[18px] bg-white px-0 py-4 text-left transition hover:opacity-95"
    >
      <div className="flex h-[66px] w-[66px] items-center justify-center rounded-[22px] bg-[#EFEFFE]">
        {icon}
      </div>
      <span className="text-[18px] font-medium text-[#171C34]">{title}</span>
      <span className="ml-auto">
        <ChevronRight size={22} color="#C9C8D6" strokeWidth={2.5} />
      </span>
    </button>
  );
}

function extractCount(res, label = "") {
  // Try top-level
  if (typeof res?.totalCount === "number") { console.log(`[UM:${label}] found res.totalCount`); return res.totalCount; }
  if (typeof res?.total === "number") { console.log(`[UM:${label}] found res.total`); return res.total; }
  if (Array.isArray(res)) { console.log(`[UM:${label}] res is array`); return res.length; }

  // Try res.data
  const d = res?.data;
  if (typeof d?.totalCount === "number") { console.log(`[UM:${label}] found res.data.totalCount`); return d.totalCount; }
  if (typeof d?.total === "number") { console.log(`[UM:${label}] found res.data.total`); return d.total; }
  if (Array.isArray(d)) { console.log(`[UM:${label}] res.data is array`); return d.length; }
  if (Array.isArray(d?.items)) { console.log(`[UM:${label}] found res.data.items`); return d.items.length; }

  // Try res.data.data (double-wrapped)
  const dd = d?.data;
  if (typeof dd?.totalCount === "number") { console.log(`[UM:${label}] found res.data.data.totalCount`); return dd.totalCount; }
  if (typeof dd?.total === "number") { console.log(`[UM:${label}] found res.data.data.total`); return dd.total; }
  if (Array.isArray(dd)) { console.log(`[UM:${label}] res.data.data is array`); return dd.length; }
  if (Array.isArray(dd?.items)) { console.log(`[UM:${label}] found res.data.data.items`); return dd.items.length; }

  console.warn(`[UM:${label}] could not find count in response:`, res);
  return 0;
}

export default function AdminUserManagementLanding() {
  const nav = useNavigate();
  const [studentCount, setStudentCount] = useState(null);
  const [adminCount, setAdminCount] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  // Monthly registration data: 12 months, default zeros
  const [monthlyData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    async function loadStats() {
      try {
        // Extract InstitutionId from cache or JWT
        let institutionId = localStorage.getItem("institutionId") || "";
        if (!institutionId) {
          try {
            const { parseJwt } = await import("../../../api/http");
            const token = localStorage.getItem("token");
            if (token) {
              const decoded = parseJwt(token);
              institutionId =
                decoded?.institutionId ||
                decoded?.instid ||
                decoded?.institutionID ||
                decoded?.InstitutionId ||
                "";
              if (institutionId) localStorage.setItem("institutionId", institutionId);
            }
          } catch (e) {
            console.warn("[UM Stats] JWT parse failed:", e);
          }
        }

        const [studentRes, adminRes] = await Promise.all([
          studentApi.getStudentList({
            PageNo: 1,
            PageSize: 100,
            ...(institutionId ? { InstitutionId: institutionId } : {}),
          }).catch(() => null),
          adminApi.getAllAdmins({ PageNo: 1, PageSize: 100 }).catch(() => null),
        ]);

        setStudentCount(studentRes !== null ? extractCount(studentRes, "student") : 0);
        setAdminCount(adminRes !== null ? extractCount(adminRes, "admin") : 0);
      } catch (err) {
        console.error("FAILED TO LOAD USER STATS:", err);
        setStudentCount(0);
        setAdminCount(0);
      } finally {
        setLoadingStats(false);
      }
    }
    loadStats();
  }, []);




  return (
    <AdminAccountShell
      title="User Management"
      activeKey="user-management"
      right={
        <div className="space-y-10">
          <div className="max-w-[760px]">
            <h2 className="text-[22px] font-semibold text-[#161B32]">Overview</h2>

            <div className="mt-6 flex flex-wrap items-center gap-3">
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

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricCard
                title="Students"
                value={loadingStats ? "…" : (studentCount ?? 0).toLocaleString()}
                loading={loadingStats}
                tag="+ Add"
                onTagClick={() => nav("/admin/dashboard/account/user-management/students/add-user")}
              />
              <MetricCard
                title="Administrators"
                value={loadingStats ? "…" : (adminCount ?? 0).toLocaleString()}
                loading={loadingStats}
                tag="+ Add"
                onTagClick={() => nav("/admin/dashboard/account/user-management/students/add-user")}
              />
              <MetricCard title="Av. Session Length" value="2m 34s" loading={false} />
            </div>

            <div className="mt-5">
              <MiniChart monthlyData={monthlyData} />
            </div>

          </div>

          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-[20px] font-semibold text-[#181D36]">People</h3>
              <button
                type="button"
                onClick={() => nav("/admin/dashboard/account/user-management/students/add-user")}
                className="text-[16px] font-semibold text-[#111]"
              >
                + Add User
              </button>
            </div>

            <div className="space-y-5">
              <PeopleRow
                title="Students"
                icon={<AccountUserIcon />}
                onClick={() => nav("/admin/dashboard/account/user-management/students")}
              />
              <PeopleRow
                title="Administrators"
                icon={<AccountSettingsIcon />}
                onClick={() => nav("/admin/dashboard/account/user-management/administrators")}
              />
              <PeopleRow
                title="User Reports"
                icon={<AccountSettingsIcon />}
                onClick={() => nav("/admin/dashboard/account/user-management/reports")}
              />
            </div>
          </div>
        </div>
      }
    />
  );
}
