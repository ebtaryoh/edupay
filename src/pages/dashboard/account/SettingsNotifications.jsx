import { useState } from "react";
import AccountShell from "../../../components/dashboard/AccountShell";

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-5">
      <p className="text-[16px] font-semibold text-[#14143A]">{label}</p>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          "w-14 h-8 rounded-full transition flex items-center px-1.5",
          checked ? "bg-[#2C14DD]" : "bg-[#E6E6E6]",
        ].join(" ")}
        aria-pressed={checked}
      >
        <span
          className={[
            "w-6 h-6 rounded-full bg-white transition",
            checked ? "translate-x-6" : "translate-x-0",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export default function SettingsNotifications() {
  const [receive, setReceive] = useState(true);
  const [overdue, setOverdue] = useState(false);
  const [email, setEmail] = useState(false);

  return (
    <AccountShell
      title="Notifications"
      activeKey="settings"
      right={
        <div className="w-full max-w-[720px]">
          <div className="space-y-2">
            <ToggleRow
              label="Receive Notifications"
              checked={receive}
              onChange={setReceive}
            />
            <ToggleRow
              label="Get Notified on Overdue Payments"
              checked={overdue}
              onChange={setOverdue}
            />
            <ToggleRow
              label="Email Notifications"
              checked={email}
              onChange={setEmail}
            />
          </div>

          <div className="mt-16 flex justify-end">
            <button
              type="button"
              className="h-14 px-20 rounded-full bg-[#E7E6FF] text-[#2C14DD] font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      }
    />
  );
}
