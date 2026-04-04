import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AdminAccountPlainLayout from "../../../components/admin/account/AdminAccountPlainLayout";

function ArrowRight() {
  return <ChevronRight size={22} color="#171B31" strokeWidth={2.5} />;
}

function SettingLink({ title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
    >
      <div>
        <p className="text-[18px] font-semibold text-[#171B31]">{title}</p>
        {subtitle ? (
          <p className="mt-2 text-[16px] text-[#7F869D]">{subtitle}</p>
        ) : null}
      </div>

      <ArrowRight />
    </button>
  );
}

export default function AdminSettingsLanding() {
  const nav = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("studentId");
    localStorage.removeItem("matricNo");
    nav("/login/admin", { replace: true });
  }

  return (
    <AdminAccountPlainLayout title="Account" activeKey="settings">
      <div className="w-full">
        <div>
          <p className="text-[18px] text-[#8F94A6]">General</p>

          <div className="mt-8 space-y-8">
            <SettingLink
              title="Reset Password"
              onClick={() => nav("/admin/dashboard/account/settings/password-reset")}
            />

            <SettingLink
              title="Change Email Address"
              onClick={() => nav("/admin/dashboard/account/settings/change-email")}
            />

            <SettingLink
              title="Notifications"
              onClick={() => nav("/admin/dashboard/account/settings/notifications")}
            />
          </div>
        </div>

        <div className="mt-16">
          <p className="text-[18px] text-[#8F94A6]">Security</p>

          <div className="mt-8">
            <SettingLink
              title="Privacy Policy"
              subtitle="Choose what data you share with us"
              onClick={() => nav("/admin/dashboard/account/settings/privacy-policy")}
            />
          </div>
        </div>

        <div className="mt-28">
          <button
            type="button"
            onClick={handleLogout}
            className="h-[78px] w-full max-w-[392px] cursor-pointer rounded-full border border-[#D9D5F8] bg-transparent text-[18px] font-semibold text-[#3727E8]"
          >
            Logout
          </button>
        </div>
      </div>
    </AdminAccountPlainLayout>
  );
}