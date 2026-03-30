import { useState } from "react";
import AdminAccountPlainLayout from "../../../components/admin/account/AdminAccountPlainLayout";

function InputCard({ label, placeholder, value, onChange }) {
  return (
    <div className="rounded-[18px] bg-[#F1F1F1] px-6 py-5">
      <p className="text-[14px] font-medium text-[#9AA0B4]">{label}</p>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent text-[18px] text-[#171B31] outline-none placeholder:text-[#A2A8B8]"
      />
    </div>
  );
}

export default function AdminSettingsChangeEmail() {
  const [form, setForm] = useState({
    currentEmail: "",
    newEmail: "",
    otp: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <AdminAccountPlainLayout title="Change Email Address" activeKey="settings">
      <div className="max-w-[460px]">
        <div className="space-y-5">
          <InputCard
            label="Current Email Address"
            placeholder="Enter current Email Address"
            value={form.currentEmail}
            onChange={(e) => handleChange("currentEmail", e.target.value)}
          />

          <InputCard
            label="New Email Address"
            placeholder="Enter New Email Address"
            value={form.newEmail}
            onChange={(e) => handleChange("newEmail", e.target.value)}
          />

          <div className="flex justify-end pr-2">
            <button
              type="button"
              className="cursor-pointer text-[15px] font-semibold text-[#171B31]"
            >
              Send OTP for Verification
            </button>
          </div>

          <InputCard
            label="Enter OTP"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={(e) => handleChange("otp", e.target.value)}
          />
        </div>

        <div className="mt-28">
          <button
            type="button"
            className="h-[78px] w-full max-w-[460px] cursor-pointer rounded-full bg-[#DCDCF5] text-[18px] font-semibold text-[#4232EA]"
          >
            Save
          </button>
        </div>
      </div>
    </AdminAccountPlainLayout>
  );
}