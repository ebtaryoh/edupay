import { useNavigate } from "react-router-dom";
import {
  ChevronRight as ChevronRightLucide,
  User,
  Settings,
  Users,
  Phone
} from "lucide-react";

function ChevronRight() {
  return <ChevronRightLucide size={22} color="#C6C5D6" strokeWidth={2.5} />;
}

function MyAccountIcon() {
  return <User size={28} color="#7369EA" strokeWidth={2.5} />;
}

function SettingsIcon() {
  return <Settings size={28} color="#7369EA" strokeWidth={2.5} />;
}

function UserManagementIcon() {
  return (
    <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#8A82F0] text-white">
      <Users size={16} strokeWidth={2.5} />
    </div>
  );
}

function ContactAdminIcon() {
  return <Phone size={28} color="#5D52DE" strokeWidth={2.5} />;
}

function MenuItem({ label, icon, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full cursor-pointer items-center gap-5 rounded-[24px] px-7 py-4 text-left transition",
        active ? "bg-[#ECEAFB]" : "hover:bg-white/35",
      ].join(" ")}
    >
      <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[20px] bg-[#E9E7FB]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[18px] font-medium text-[#1A1D33]">{label}</p>
      </div>

      <ChevronRight />
    </button>
  );
}

export default function AdminAccountMenu({ activeKey }) {
  const nav = useNavigate();

  return (
    <div className="space-y-4">
      <MenuItem
        label="My Account"
        icon={<MyAccountIcon />}
        active={activeKey === "my-account"}
        onClick={() => nav("/admin/dashboard/account/my-account")}
      />

      <MenuItem
        label="Settings"
        icon={<SettingsIcon />}
        active={activeKey === "settings"}
        onClick={() => nav("/admin/dashboard/account/settings")}
      />

      <MenuItem
        label="User Management"
        icon={<UserManagementIcon />}
        active={activeKey === "user-management"}
        onClick={() => nav("/admin/dashboard/account/user-management")}
      />

      <MenuItem
        label="Contact Admin"
        icon={<ContactAdminIcon />}
        active={activeKey === "contact-admin"}
        onClick={() => nav("/admin/dashboard/account/contact-admin")}
      />
    </div>
  );
}