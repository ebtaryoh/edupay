import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { studentApi } from "../../../api/student";
import {
  AccountTabs,
  GhostSaveButton,
  ProfileHero,
  TinyVerifiedBadge,
} from "../../../components/admin/account/AdminAccountBlocks";

function DataRow({ label, value, trailing = null }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] text-[#9A9CAC]">{label}</p>
        <p className="mt-2 text-[17px] font-medium text-[#161B32]">{value || "---"}</p>
      </div>
      {trailing}
    </div>
  );
}

export default function AdminUserManagementStudentData() {
  const nav = useNavigate();
  const { studentId } = useParams();
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const isInstitution = new URLSearchParams(location.search).get("tab") === "institution";

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await studentApi.getStudentProfile(studentId);
        const data = res?.data || res;
        setStudent(data);
      } catch (err) {
        console.error("FAILED TO LOAD STUDENT PROFILE:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [studentId]);

  if (loading) {
    return (
      <AdminAccountShell
        title="Student Data"
        activeKey="user-management"
        right={
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-lg text-gray-500">Loading student profile...</p>
          </div>
        }
      />
    );
  }

  if (!student) {
    return (
      <AdminAccountShell
        title="Student Data"
        activeKey="user-management"
        right={
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-lg text-red-500">Student not found.</p>
          </div>
        }
      />
    );
  }

  const fullName = `${student.firstName || ""} ${student.lastName || ""}`.trim() || "Student Profile";
  const matricNo = student.matricNo || "---";
  const institution = student.institutionName || student.institution || "---";
  const department = student.department || student.dept || "---";
  const level = student.level || "---";

  const tabs = [
    { key: "personal", label: "Personal Information", to: `/admin/dashboard/account/user-management/students/${studentId}` },
    { key: "institution", label: "Institution", to: `/admin/dashboard/account/user-management/students/${studentId}?tab=institution` },
  ];

  return (
    <AdminAccountShell
      title="Student Data"
      activeKey="user-management"
      right={
        <div className="max-w-[760px] space-y-10">
          <ProfileHero
            name={fullName}
            subline1={`${institution} - ${matricNo}`}
            subline2={`${department} - ${level}`}
            photo={student.photoUrl || student.image}
            actionLabel="Access User Transactions"
            onAction={() => nav("transactions")}
          />

          <div className="max-w-[560px]">
            <AccountTabs
              tabs={tabs}
              activeKey={isInstitution ? "institution" : "personal"}
            />

            <div className="mt-8 space-y-10">
              {isInstitution ? (
                <>
                  <DataRow 
                    label="Institution in Attendance" 
                    value={institution} 
                    trailing={
                      <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F3F4FA] text-[#9BA0B4]">
                        <ChevronDown size={20} strokeWidth={2.5} />
                      </span>
                    } 
                  />
                  <DataRow label="Department/Level" value={`${department} / ${level}`} />
                  <DataRow label="Matriculation No:" value={matricNo} />
                </>
              ) : (
                <>
                  <DataRow label="First Name" value={student.firstName} />
                  <DataRow label="Last Name" value={student.lastName} />
                  <DataRow 
                    label="Email Address" 
                    value={student.email} 
                    trailing={<TinyVerifiedBadge />} 
                  />
                  <DataRow label="Phone Number" value={student.phoneNumber || student.phone || "---"} />
                  <DataRow label="Gender" value={student.gender || "---"} />
                </>
              )}
            </div>

            <div className="mt-10 flex justify-center xl:justify-start">
              <GhostSaveButton />
            </div>
          </div>
        </div>
      }
    />
  );
}
