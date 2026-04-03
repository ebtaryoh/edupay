import { useNavigate } from "react-router-dom";
import AccountShell from "../../../components/dashboard/AccountShell";

function SettingsRow({ title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-5 border-b border-[#ECEEF8] text-left"
    >
      <div>
        <p className="text-[16px] font-semibold text-[#14143A]">{title}</p>
        {subtitle ? (
          <p className="text-[13px] text-[#9AA0B4] mt-1">{subtitle}</p>
        ) : null}
      </div>

      <span className="text-3xl text-[#14143A] leading-none">›</span>
    </button>
  );
}

export default function SettingsLanding() {
  const nav = useNavigate();

  return (
    <AccountShell
      title="Account"
      activeKey="settings"
      right={
        <div className="w-full max-w-[720px]">
          <p className="text-sm text-[#9AA0B4] font-medium">General</p>

          <div className="mt-4">
            <SettingsRow
              title="Reset Password"
              onClick={() => nav("/dashboard/account/settings/password-reset")}
            />
            <SettingsRow
              title="Change Email Address"
              onClick={() => nav("/dashboard/account/settings/change-email")}
            />
            <SettingsRow
              title="Notifications"
              onClick={() => nav("/dashboard/account/settings/notifications")}
            />
          </div>

          <div className="mt-10">
            <p className="text-sm text-[#9AA0B4] font-medium">Security</p>

            <div className="mt-4">
              <SettingsRow
                title="Privacy Policy"
                subtitle="Choose what data you share with us"
                onClick={() =>
                  nav("/dashboard/account/settings/privacy-policy")
                }
              />
            </div>
          </div>

          <div className="mt-14 flex justify-end">
            <button
              type="button"
              className="h-14 px-16 rounded-full bg-white border border-[#E7E6FF] text-[#2C14DD] font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      }
    />
  );
}
