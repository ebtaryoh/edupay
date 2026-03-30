import { useState } from "react";
import AdminAccountPlainLayout from "../../../components/admin/account/AdminAccountPlainLayout";

function Toggle({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative h-[34px] w-[58px] cursor-pointer rounded-full transition",
        active ? "bg-[#4961F3]" : "bg-[#E4E4E4]",
      ].join(" ")}
      aria-pressed={active}
    >
      <span
        className={[
          "absolute top-1 h-[26px] w-[26px] rounded-full bg-white transition",
          active ? "left-[28px]" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <p className="text-[18px] font-medium text-[#171B31]">{label}</p>
      <Toggle active={value} onClick={onChange} />
    </div>
  );
}

export default function AdminSettingsNotifications() {
  const [settings, setSettings] = useState({
    receiveNotifications: true,
    overdueNotifications: false,
    emailNotifications: false,
  });

  function toggle(field) {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  return (
    <AdminAccountPlainLayout title="Notifications" activeKey="settings">
      <div className="max-w-[430px] space-y-12">
        <ToggleRow
          label="Receive Notifications"
          value={settings.receiveNotifications}
          onChange={() => toggle("receiveNotifications")}
        />

        <ToggleRow
          label="Get Notified on Overdue Payments"
          value={settings.overdueNotifications}
          onChange={() => toggle("overdueNotifications")}
        />

        <ToggleRow
          label="Email Notifications"
          value={settings.emailNotifications}
          onChange={() => toggle("emailNotifications")}
        />

        <div className="pt-44">
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