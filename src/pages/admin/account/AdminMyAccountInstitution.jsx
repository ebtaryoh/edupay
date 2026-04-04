import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAccountProfileLayout from "../../../components/admin/account/AdminAccountProfileLayout";

function ReadField({ label, value }) {
  return (
    <div className="rounded-[18px] bg-white px-6 py-4">
      <p className="text-[14px] font-medium text-[#A1A6B8]">{label}</p>
      <p className="mt-1 text-[18px] font-medium text-[#171B31]">{value}</p>
    </div>
  );
}

export default function AdminMyAccountInstitution() {
  const nav = useNavigate();

  const [form] = useState({
    institution: "University of Lagos, Nigeria (UNILAG)",
    departmentLevel: "Computer Science/300 Level",
    matricNo: "CSC/2021/001",
  });

  const saveDisabled = useMemo(() => false, []);

  return (
    <AdminAccountProfileLayout activeKey="my-account">
      <div className="w-full">
        <div className="mb-8 flex items-center gap-8 text-[16px]">
          <button
            type="button"
            onClick={() => nav("/admin/dashboard/account/my-account")}
            className="cursor-pointer border-r border-[#C9C6DA] pr-8 text-[#7D7992]"
          >
            Personal Information
          </button>

          <button
            type="button"
            className="cursor-pointer font-semibold text-[#171B31]"
          >
            Institution
          </button>
        </div>

        <div className="space-y-4">
          <ReadField
            label="Institution in Attendance"
            value={form.institution}
          />
          <ReadField
            label="Department/Level"
            value={form.departmentLevel}
          />
          <ReadField
            label="Matriculation No:"
            value={form.matricNo}
          />
        </div>

        <div className="mt-10 flex justify-center xl:justify-start">
          <button
            type="button"
            disabled={saveDisabled}
            className="h-[56px] w-full max-w-[306px] cursor-pointer rounded-full bg-[#EAE8FB] text-[16px] font-semibold text-[#4232EA]"
          >
            Save
          </button>
        </div>
      </div>
    </AdminAccountProfileLayout>
  );
}