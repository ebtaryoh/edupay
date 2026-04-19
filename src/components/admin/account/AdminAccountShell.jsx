import { useNavigate } from "react-router-dom";
import { ChevronRight as ChevronRightLucide, ChevronLeft, User, Settings, Users, Phone } from "lucide-react";
function ChevronRight() {
  return <ChevronRightLucide size={20} color="#C9C8D6" strokeWidth={2.5} />;
}

function BackIcon() {
  return <ChevronLeft size={24} color="#11142D" strokeWidth={2.5} />;
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
  return <User size={24} color="#6A63E8" strokeWidth={2.5} />;
}

export function AccountSettingsIcon() {
  return <Settings size={24} color="#7F79F1" strokeWidth={2.5} />;
}

export function AccountHelpIcon() {
  return <Users size={24} color="#7F79F1" strokeWidth={2.5} />;
}

export function AccountPhoneIcon() {
  return <Phone size={24} color="#635BDF" strokeWidth={2.5} />;
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
    <div className="min-w-0 space-y-5 overflow-x-hidden pb-10 sm:space-y-6 xl:space-y-7">
      <div className="px-4 sm:px-6 xl:px-7 mt-6">
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

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] xl:gap-14">
          <div className="min-w-0">
            <AdminAccountMenu activeKey={activeKey} />
          </div>

          <div className="min-w-0">{right}</div>
        </div>
      </div>
    </div>
  );
}

