import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  LayoutGrid,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { studentApi } from "../../../api/student";

function getInitials(first, last) {
  return `${(first || "?")[0]}${(last || "?")[0]}`.toUpperCase();
}

function AvatarCard({ first, last, onClick }) {
  return (
    <button type="button" onClick={onClick} className="group text-center">
      <div className="relative mx-auto flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#2F6BFF_0%,#F6D2DA_100%)] text-sm font-bold text-white">
        <span className="rounded-full bg-white/20 px-2 py-2">{getInitials(first, last)}</span>
      </div>
      <p className="mt-3 text-[14px] leading-[1.15] text-[#6D7387]">
        {first}<br />{last}
      </p>
    </button>
  );
}

function AddCard({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="group text-center">
      <div className="relative mx-auto flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full bg-[#A3A3A3] text-white">
        <span className="absolute bottom-[-2px] right-[-2px] flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#3724E9] text-white">
          <Plus size={16} strokeWidth={3} />
        </span>
      </div>
      <p className="mt-3 text-[14px] leading-[1.15] text-[#6D7387]">Add User</p>
    </button>
  );
}

function ListRow({ first, last, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-[14px] border border-[#ECECF4] bg-white px-4 py-3 transition hover:shadow-sm"
    >
      <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2F6BFF_0%,#F6D2DA_100%)] text-sm font-bold text-white">
        {getInitials(first, last)}
      </div>
      <span className="flex-1 text-left text-[15px] font-medium text-[#171C34]">
        {first} {last}
      </span>
      <ChevronRight size={18} color="#C9C8D6" strokeWidth={2.5} />
    </button>
  );
}

export default function AdminUserManagementStudents() {
  const nav = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortAZ, setSortAZ] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // Extract InstitutionId from cached value or JWT token
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
            console.warn("[Students] JWT parse failed:", e);
          }
        }

        const res = await studentApi.getStudentList({
          Name: search,
          PageNo: page,
          PageSize: 20,
          ...(institutionId ? { InstitutionId: institutionId } : {}),
        });

        let finalData = [];
        const d = res?.data || res;

        if (Array.isArray(d)) {
          finalData = d;
        } else if (d && typeof d === "object") {
          if (Array.isArray(d.items)) finalData = d.items;
          else if (Array.isArray(d.data)) finalData = d.data;
          else if (Array.isArray(d.students)) finalData = d.students;
        }

        setStudents(finalData);
      } catch (err) {
        console.error("FAILED TO LOAD STUDENTS:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, page]);


  const displayed = useMemo(() => {
    return [...students].sort((a, b) => {
      const nameA = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
      const nameB = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();
      return sortAZ ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }, [students, sortAZ]);

  return (
    <AdminAccountShell
      title="Students"
      activeKey="user-management"
      right={
        <div className="max-w-[760px]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                placeholder="Search Students"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="h-[44px] w-[180px] rounded-[8px] border border-[#E8EAF5] bg-white px-3 text-[14px] outline-none placeholder:text-[#7C8090] focus:border-[#4E68F0]"
              />

              {/* View toggle */}
              <div className="flex rounded-[8px] border border-[#E8EAF5] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={[
                    "flex h-[34px] w-[34px] items-center justify-center rounded-[6px] transition",
                    viewMode === "list" ? "bg-[#4E68F0] text-white" : "text-[#C0C3D0] hover:text-[#4E68F0]",
                  ].join(" ")}
                  title="List view"
                >
                  <List size={18} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={[
                    "flex h-[34px] w-[34px] items-center justify-center rounded-[6px] transition",
                    viewMode === "grid" ? "bg-[#4E68F0] text-white" : "text-[#C0C3D0] hover:text-[#4E68F0]",
                  ].join(" ")}
                  title="Grid view"
                >
                  <LayoutGrid size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Sort toggle */}
            <button
              type="button"
              onClick={() => setSortAZ(v => !v)}
              className="flex h-[44px] items-center gap-2 rounded-[8px] border border-[#E8EAF5] bg-white px-4 text-[14px] text-[#687089] transition hover:border-[#4E68F0] hover:text-[#4E68F0]"
            >
              <ArrowUpDown size={14} strokeWidth={2.5} />
              Sort {sortAZ ? "A → Z" : "Z → A"}
              <ChevronDown size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <p className="mt-10 text-sm text-gray-400">Loading students...</p>
          ) : displayed.length === 0 ? (
            <p className="mt-10 text-sm text-gray-400">No students found.</p>
          ) : viewMode === "grid" ? (
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              <AddCard onClick={() => nav("/admin/dashboard/account/user-management/students/add-user")} />
              {displayed.map((s) => (
                <AvatarCard
                  key={s.id || s.studentId}
                  first={s.firstName}
                  last={s.lastName}
                  onClick={() => nav(`/admin/dashboard/account/user-management/students/${s.id || s.studentId}`)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => nav("/admin/dashboard/account/user-management/students/add-user")}
                className="flex w-full items-center gap-4 rounded-[14px] border border-dashed border-[#4E68F0] bg-white px-4 py-3 transition hover:bg-[#F4F6FE]"
              >
                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#E8EDF9] text-[#4E68F0]">
                  <Plus size={20} strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-medium text-[#4E68F0]">Add User</span>
              </button>
              {displayed.map((s) => (
                <ListRow
                  key={s.id || s.studentId}
                  first={s.firstName}
                  last={s.lastName}
                  onClick={() => nav(`/admin/dashboard/account/user-management/students/${s.id || s.studentId}`)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-5 text-[13px] text-[#B1B3C0]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 hover:text-[#171C34] disabled:opacity-40"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
              Previous
            </button>
            <span className="font-semibold text-[#171C34]">{page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={displayed.length < 20}
              className="flex items-center gap-1 hover:text-[#171C34] disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      }
    />
  );
}
