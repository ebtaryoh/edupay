import { useState } from "react";
import AdminAccountPlainLayout from "../../../components/admin/account/AdminAccountPlainLayout";

function InputCard({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="rounded-[18px] bg-[#F1F1F1] px-6 py-5">
      <p className="text-[14px] font-medium text-[#9AA0B4]">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-3 w-full bg-transparent text-[18px] text-[#171B31] outline-none placeholder:text-[#A2A8B8]"
      />
    </div>
  );
}

export default function AdminSettingsPasswordReset() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <AdminAccountPlainLayout title="Password Reset" activeKey="settings">
      <div className="max-w-[460px]">
        <div className="space-y-8">
          <InputCard
            label="Old Password"
            placeholder="Enter old password"
            type="password"
            value={form.oldPassword}
            onChange={(e) => handleChange("oldPassword", e.target.value)}
          />

          <InputCard
            label="New Password"
            placeholder="Enter new password"
            type="password"
            value={form.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
          />

          <InputCard
            label="Retype New Password"
            placeholder="Retype new password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />

          <InputCard
            label="Enter OTP sent to registered Email Address"
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