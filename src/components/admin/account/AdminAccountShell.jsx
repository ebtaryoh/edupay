import { useNavigate } from "react-router-dom";

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="#C9C8D6"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="#11142D"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavIconWrap({ children, active = false }) {
  return (
    <div
      className={[
        "flex h-[62px] w-[62px] items-center justify-center rounded-[20px]",
        active ? "bg-[#E8E6FF]" : "bg-[#EFEFFE]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function AccountUserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="#6A63E8" />
      <path
        d="M4.8 19.2c1.4-3.4 4-5.2 7.2-5.2s5.8 1.8 7.2 5.2"
        fill="#6A63E8"
        stroke="#6A63E8"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AccountSettingsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5l1.7 1.1 2-.1.6 1.9 1.7 1.1-.7 1.9.6 1.9-1.7 1-.6 1.9-2-.1-1.6 1.2-1.7-1.2-2 .1-.6-1.9-1.7-1 .7-1.9-.7-1.9 1.7-1.1.6-1.9 2 .1L12 3.5z"
        fill="#7F79F1"
      />
      <circle cx="12" cy="12" r="3.2" fill="#C7C2FF" />
    </svg>
  );
}

export function AccountHelpIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#7F79F1" />
      <path
        d="M9.9 9.4a2.4 2.4 0 1 1 3.9 2c-.9.7-1.5 1.2-1.5 2.3"
        stroke="#ECE9FF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.2" r="1" fill="#ECE9FF" />
    </svg>
  );
}

export function AccountPhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.3 4.8h2.2l1.3 3.2-1.8 1.7a13.6 13.6 0 0 0 5.3 5.3l1.7-1.8 3.2 1.3v2.2c0 .7-.5 1.3-1.2 1.4-1.1.1-2.1 0-3.2-.4A15.8 15.8 0 0 1 6.1 9.2c-.4-1-.5-2.1-.4-3.1.1-.8.7-1.3 1.6-1.3z"
        fill="#635BDF"
      />
    </svg>
  );
}

function MenuItem({ label, active, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-5 rounded-[24px] px-0 py-0 text-left transition",
        active ? "bg-[#ECEBFF]" : "bg-transparent hover:bg-[#F4F3FF]",
      ].join(" ")}
    >
      <NavIconWrap active={active}>{icon}</NavIconWrap>
      <span className="text-[16px] font-medium text-[#1D2033]">{label}</span>
      <span className="ml-auto pr-4">
        <ChevronRight />
      </span>
    </button>
  );
}

export function AdminAccountMenu({ activeKey }) {
  const nav = useNavigate();

  return (
    <div className="space-y-7">
      <MenuItem
        label="My Account"
        active={activeKey === "my-account"}
        icon={<AccountUserIcon />}
        onClick={() => nav("/admin/dashboard/account/my-account")}
      />

      <MenuItem
        label="Settings"
        active={activeKey === "settings"}
        icon={<AccountSettingsIcon />}
        onClick={() => nav("/admin/dashboard/account/settings")}
      />

      <MenuItem
        label="User Management"
        active={activeKey === "user-management"}
        icon={<AccountHelpIcon />}
        onClick={() => nav("/admin/dashboard/account/user-management")}
      />

      <MenuItem
        label="Contact Admin"
        active={activeKey === "contact-admin"}
        icon={<AccountPhoneIcon />}
        onClick={() => nav("/admin/dashboard/account/contact-admin")}
      />
    </div>
  );
}

export default function AdminAccountShell({ title, activeKey, right, intro }) {
  const nav = useNavigate();

  return (
    <div className="min-w-0 px-4 pb-8 pt-2 sm:px-6 xl:px-7">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full bg-[#F2F2F7] transition hover:bg-white"
        >
          <BackIcon />
        </button>

        <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#15192E]">
          {title}
        </h1>
      </div>

      {intro ? <div className="mt-10">{intro}</div> : null}

      <div className="mt-10 grid grid-cols-1 gap-10 xl:grid-cols-[420px_minmax(0,1fr)] xl:gap-14">
        <div className="min-w-0">
          <AdminAccountMenu activeKey={activeKey} />
        </div>

        <div className="min-w-0">{right}</div>
      </div>
    </div>
  );
}
