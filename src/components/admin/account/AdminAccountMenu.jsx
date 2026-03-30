import { useNavigate } from "react-router-dom";

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="#C6C5D6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MyAccountIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" fill="#7369EA" />
      <path d="M6.8 17.4c.9-2.5 2.8-4 5.2-4 2.5 0 4.3 1.5 5.2 4" fill="#7369EA" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15.15a3.15 3.15 0 1 0 0-6.3 3.15 3.15 0 0 0 0 6.3z"
        stroke="#7369EA"
        strokeWidth="1.9"
      />
      <path
        d="M19.05 13.2l1-.75-.95-2.7-1.3.1a6.3 6.3 0 0 0-1.2-1.2l.1-1.3-2.7-.95-.9 1a6.8 6.8 0 0 0-1.7 0l-.9-1-2.7.95.1 1.3c-.45.35-.86.75-1.2 1.2l-1.3-.1-.95 2.7 1 .75a6.8 6.8 0 0 0 0 1.7l-1 .75.95 2.7 1.3-.1c.35.45.75.86 1.2 1.2l-.1 1.3 2.7.95.9-1a6.8 6.8 0 0 0 1.7 0l.9 1 2.7-.95-.1-1.3c.45-.35.86-.75 1.2-1.2l1.3.1.95-2.7-1-.75a6.8 6.8 0 0 0 0-1.7z"
        stroke="#7369EA"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserManagementIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#8A82F0" />
      <path d="M12 10.2v.15" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M10.9 13.2c.35-.5.8-.75 1.35-.75.85 0 1.4.55 1.4 1.35 0 .75-.4 1.1-1 1.45-.7.4-.95.7-.95 1.35v.2"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactAdminIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.2 7.2c.5 2.1 1.6 4.1 3.2 5.7 1.6 1.6 3.6 2.7 5.7 3.2l1.6-2a1.5 1.5 0 0 0-.2-2l-2-1.6a1.5 1.5 0 0 0-1.8 0l-1.2.9c-.8-.4-1.7-1.1-2.6-2-.9-.9-1.6-1.8-2-2.6l.9-1.2a1.5 1.5 0 0 0 0-1.8l-1.6-2a1.5 1.5 0 0 0-2-.2l-2 1.6z"
        fill="#5D52DE"
      />
    </svg>
  );
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