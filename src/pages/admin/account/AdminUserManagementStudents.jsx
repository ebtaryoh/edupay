import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  LayoutGrid,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { studentApi } from "../../../api/student";


function Avatar({ label, add = false, onClick }) {
  const [first, second] = label.split("\n");

  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-center"
    >
      <div className={[
        "relative mx-auto flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full text-sm font-bold",
        add ? "bg-[#A3A3A3] text-white" : "bg-[linear-gradient(135deg,#2F6BFF_0%,#F6D2DA_100%)] text-white",
      ].join(" ")}>
        {add ? null : (
          <span className="rounded-full bg-white/20 px-3 py-2">{first?.[0]}{second?.[0]}</span>
        )}

        {add ? (
          <span className="absolute bottom-[-2px] right-[-2px] flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#3724E9] text-white">
            <Plus size={16} strokeWidth={3} />
          </span>
        ) : null}
      </div>
      <p className="mt-3 whitespace-pre-line text-[14px] leading-[1.15] text-[#6D7387]">{label}</p>
    </button>
  );
}

export default function AdminUserManagementStudents() {
  const nav = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await studentApi.getStudentList({ Name: search, PageNo: page, PageSize: 20 });
        const data = res?.data || res || [];
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FAILED TO LOAD STUDENTS:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, page]);

  return (
    <AdminAccountShell
      title="Students"
      activeKey="user-management"
      right={
        <div className="max-w-[760px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                placeholder="Search Students"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-[44px] w-[150px] rounded-[8px] border border-[#E8EAF5] bg-white px-3 text-[14px] outline-none placeholder:text-[#7C8090]"
              />

              <div className="flex rounded-[8px] border border-[#E8EAF5] bg-white p-1">
                <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] text-[#C0C3D0]">
                  <List size={18} strokeWidth={2.5} />
                </button>
                <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#4E68F0] text-white">
                  <LayoutGrid size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <button className="flex h-[44px] items-center gap-2 rounded-[8px] border border-[#E8EAF5] bg-white px-4 text-[14px] text-[#687089]">
              <ArrowUpDown size={14} strokeWidth={2.5} />
              Sort By A-Z
              <ChevronDown size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            <Avatar
              label="Add User"
              add
              onClick={() => nav("/admin/dashboard/account/user-management/students/add-user")}
            />
            {loading ? (
              <p className="col-span-full text-sm text-gray-400">Loading students...</p>
            ) : students.length === 0 ? (
              <p className="col-span-full text-sm text-gray-400">No students found.</p>
            ) : (
              students.map((s) => {
                const label = `${s.firstName || ""} \n${s.lastName || ""}`;
                return (
                  <Avatar
                    key={s.id || s.studentId}
                    label={label.trim() || "Student"}
                    onClick={() => nav(`/admin/dashboard/account/user-management/students/${s.id || s.studentId}`)}
                  />
                );
              })
            )}
          </div>

          <div className="mt-16 flex items-center justify-center gap-5 text-[13px] text-[#B1B3C0]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex items-center gap-1 hover:text-[#171C34]"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
              Previous
            </button>
            <span className="font-semibold text-[#171C34]">{page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 hover:text-[#171C34]"
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
