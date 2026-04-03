import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminAccountProfileLayout from "../../../components/admin/account/AdminAccountProfileLayout";

function VerifiedIcon() {
  return (
    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#3C2BE8]">
      <Check size={18} color="white" strokeWidth={3.5} />
    </div>
  );
}

function ReadField({ label, value, rightIcon }) {
  return (
    <div className="rounded-[18px] bg-white px-6 py-4">
      <p className="text-[14px] font-medium text-[#A1A6B8]">{label}</p>

      <div className="mt-1 flex items-center justify-between gap-4">
        <p className="text-[18px] font-medium text-[#171B31]">{value}</p>
        {rightIcon}
      </div>
    </div>
  );
}

export default function AdminMyAccountPersonal() {
  const nav = useNavigate();

  const [form] = useState({
    firstName: "Ayotunde",
    lastName: "K. Samuel",
    emailAddress: "ayotundesamuel@gmail.com",
    phoneNumber: "+234 80 1234 6789",
    gender: "Male",
  });

  const saveDisabled = useMemo(() => false, []);

  return (
    <AdminAccountProfileLayout activeKey="my-account">
      <div className="max-w-[560px]">
        <div className="mb-8 flex items-center gap-8 text-[16px]">
          <button
            type="button"
            className="cursor-pointer border-r border-[#C9C6DA] pr-8 font-semibold text-[#171B31]"
          >
            Personal Information
          </button>

          <button
            type="button"
            onClick={() => nav("/admin/dashboard/account/my-account/institution")}
            className="cursor-pointer text-[#7D7992]"
          >
            Institution
          </button>
        </div>

        <div className="space-y-4">
          <ReadField label="First Name" value={form.firstName} />
          <ReadField label="Last Name" value={form.lastName} />
          <ReadField
            label="Email Address"
            value={form.emailAddress}
            rightIcon={<VerifiedIcon />}
          />
          <ReadField label="Phone Number" value={form.phoneNumber} />
          <ReadField label="Gender" value={form.gender} />
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