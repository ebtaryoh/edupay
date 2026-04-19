import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Filter, LayoutGrid, Users, ShieldCheck, TrendingUp } from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { studentApi } from "../../../api/student";
import { adminApi } from "../../../api/admin";
import { parseJwt } from "../../../api/http";

/* ─── helpers ─── */
function extractCount(res) {
  const d = res?.data || res;
  if (typeof d?.totalCount === "number") return d.totalCount;
  if (typeof d?.total === "number") return d.total;
  if (Array.isArray(d?.items)) return d.items.length;
  if (Array.isArray(d)) return d.length;
  const dd = d?.data;
  if (typeof dd?.totalCount === "number") return dd.totalCount;
  if (Array.isArray(dd?.items)) return dd.items.length;
  return 0;
}

function getInstitutionId() {
  let id = localStorage.getItem("institutionId") || "";
  if (!id) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = parseJwt(token);
        id =
          decoded?.institutionId ||
          decoded?.instid ||
          decoded?.institutionID ||
          decoded?.InstitutionId ||
          "";
        if (id) localStorage.setItem("institutionId", id);
      }
    } catch (_) {}
  }
  return id;
}

/* ─── sub-components ─── */
function StatCard({ icon, title, value, loading, accent = "#4E68F0" }) {
  return (
    <div className="rounded-[18px] border border-[#ECECF4] bg-white px-5 py-5">
      <div className="flex items-center gap-3">
        <div
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px]"
          style={{ backgroundColor: `${accent}18` }}
        >
          {icon}
        </div>
        <p className="text-[14px] text-[#656B81]">{title}</p>
      </div>
      <p className="mt-3 text-[28px] font-bold text-[#171C34]">
        {loading ? <span className="text-[16px] text-[#B0B4C8]">Loading…</span> : value}
      </p>
    </div>
  );
}

function MiniChart({ data, title, color = "#6A4BFF" }) {
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const max = Math.max(...data, 1);
  const xStart = 30, xEnd = 470, top = 20, h = 130;
  const step = (xEnd - xStart) / (data.length - 1);
  const pts = data.map((v, i) => `${xStart + i * step},${top + h - (v / max) * h}`);
  const line = "M" + pts.join(" L ");

  return (
    <div className="rounded-[22px] border border-[#ECECF4] bg-white px-6 py-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[15px] font-semibold text-[#181D36]">{title}</h3>
        <p className="text-[11px] text-[#A5A8BA]">Jan – Dec {new Date().getFullYear()}</p>
      </div>
      <svg viewBox="0 0 500 185" className="mt-4 h-[160px] w-full">
        {[155, 115, 75, 35].map(y => (
          <path key={y} d={`M30 ${y}H470`} stroke="#E7EAF5" strokeDasharray="4 4" />
        ))}
        {data.length > 1 && (
          <path d={line} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {pts.map((pt, i) => {
          const [x, y] = pt.split(",");
          return <circle key={i} cx={x} cy={y} r="4" fill={color} />;
        })}
        {months.map((m, i) => (
          <text key={m} x={xStart + i * step} y="178" textAnchor="middle" fontSize="9" fill="#A5A8BA">{m}</text>
        ))}
      </svg>
    </div>
  );
}

/* ─── main page ─── */
export default function AdminUserManagementUserReports() {
  const nav = useNavigate();
  const [studentCount, setStudentCount] = useState(null);
  const [adminCount, setAdminCount] = useState(null);
  const [loading, setLoading] = useState(true);

  // Zero-filled 12-month arrays (would need a dedicated stats endpoint to populate properly)
  const [studentMonthly] = useState(Array(12).fill(0));
  const [adminMonthly] = useState(Array(12).fill(0));

  useEffect(() => {
    async function load() {
      try {
        const institutionId = getInstitutionId();
        const [studentRes, adminRes] = await Promise.all([
          studentApi
            .getStudentList({ PageNo: 1, PageSize: 100, ...(institutionId ? { InstitutionId: institutionId } : {}) })
            .catch(() => null),
          adminApi.getAllAdmins({ PageNo: 1, PageSize: 100 }).catch(() => null),
        ]);
        setStudentCount(studentRes !== null ? extractCount(studentRes) : 0);
        setAdminCount(adminRes !== null ? extractCount(adminRes) : 0);
      } catch (err) {
        console.error("[Reports] Failed to load stats:", err);
        setStudentCount(0);
        setAdminCount(0);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <AdminAccountShell
      title="User Reports"
      activeKey="user-management"
      right={
        <div className="max-w-[760px] space-y-12">

          {/* ── Admin Overview ── */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[22px] font-semibold text-[#161B32]">Admin Overview</h2>
              <button
                type="button"
                onClick={() => nav("/admin/dashboard/account/user-management/administrators")}
                className="text-[14px] font-semibold text-[#4E68F0] hover:underline"
              >
                View all admins →
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatCard
                icon={<ShieldCheck size={20} color="#4E68F0" strokeWidth={2} />}
                title="Total Administrators"
                value={(adminCount ?? 0).toLocaleString()}
                loading={loading}
                accent="#4E68F0"
              />
              <StatCard
                icon={<TrendingUp size={20} color="#22D04F" strokeWidth={2} />}
                title="Active This Month"
                value="—"
                loading={false}
                accent="#22D04F"
              />
            </div>

            <div className="mt-4">
              <MiniChart data={adminMonthly} title="Admin Registrations" color="#4E68F0" />
            </div>
          </section>

          {/* ── Student Overview ── */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[22px] font-semibold text-[#161B32]">Student Overview</h2>
              <button
                type="button"
                onClick={() => nav("/admin/dashboard/account/user-management/students")}
                className="text-[14px] font-semibold text-[#4E68F0] hover:underline"
              >
                View all students →
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatCard
                icon={<Users size={20} color="#A855F7" strokeWidth={2} />}
                title="Total Students"
                value={(studentCount ?? 0).toLocaleString()}
                loading={loading}
                accent="#A855F7"
              />
              <StatCard
                icon={<TrendingUp size={20} color="#F59E0B" strokeWidth={2} />}
                title="Active This Month"
                value="—"
                loading={false}
                accent="#F59E0B"
              />
            </div>

            <div className="mt-4">
              <MiniChart data={studentMonthly} title="Student Registrations" color="#A855F7" />
            </div>
          </section>

        </div>
      }
    />
  );
}
