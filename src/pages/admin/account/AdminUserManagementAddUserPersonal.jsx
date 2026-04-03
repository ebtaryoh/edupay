import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { PurpleSaveButton } from "../../../components/admin/account/AdminAccountBlocks";

function LineField({ label, value, onChange, type = "text", dropdown = false, children }) {
  return (
    <div>
      <p className="text-[13px] text-[#8E92A4]">{label}</p>
      {dropdown ? (
        <div className="mt-3 flex items-center justify-between gap-4 border-b border-[#E8EAF5] pb-3">
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-transparent text-[17px] font-medium text-[#171C34] outline-none"
          >
            {children}
          </select>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={label}
          className="mt-3 w-full border-b border-[#E8EAF5] bg-transparent pb-3 text-[17px] font-medium text-[#171C34] outline-none placeholder:text-[#C0C3D0]"
        />
      )}
    </div>
  );
}

export default function AdminUserManagementAddUserPersonal() {
  const nav = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", gender: "" });

  function set(key) { return v => setForm(f => ({ ...f, [key]: v })); }

  function handleContinue() {
    nav("/admin/dashboard/account/user-management/students/add-user/institution", { state: { personal: form } });
  }

  return (
    <AdminAccountShell
      title="Add User"
      activeKey="user-management"
      right={
        <div className="max-w-[500px] space-y-10 pt-1">
          <div>
            <h2 className="text-[34px] font-semibold text-[#161B32]">Add User</h2>
            <p className="mt-6 text-[18px] font-semibold text-[#161B32]">Personal Information</p>
          </div>

          <div className="flex justify-center pb-2">
            <div className="relative h-[96px] w-[96px] rounded-full bg-[#C9C9C9]">
              <button className="absolute bottom-[-2px] right-[-4px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#8B84F5] text-white">
                <Camera size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <LineField label="First Name" value={form.firstName} onChange={set("firstName")} />
            <LineField label="Last Name" value={form.lastName} onChange={set("lastName")} />
            <LineField label="Email Address" value={form.email} onChange={set("email")} type="email" />
            <LineField label="Phone Number" value={form.phone} onChange={set("phone")} type="tel" />
            <LineField label="Gender" value={form.gender} onChange={set("gender")} dropdown>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </LineField>
          </div>

          <div className="pt-4">
            <PurpleSaveButton className="w-full max-w-[380px]" onClick={handleContinue}>
              Continue
            </PurpleSaveButton>
          </div>
        </div>
      }
    />
  );
}
