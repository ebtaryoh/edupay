import { useNavigate } from "react-router-dom";

function MenuRow({ active, icon, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center justify-between rounded-[20px] px-5 py-5 text-left transition",
        active ? "bg-[#F1F2FF]" : "bg-transparent",
        "hover:bg-[#F1F2FF]",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center">
          {icon}
        </div>
        <p className="text-[16px] font-semibold text-[#14143A]">{title}</p>
      </div>

      <span className="text-[#B5B9C9] text-2xl leading-none">›</span>
    </button>
  );
}

export default function AccountMenu({ activeKey = "my" }) {
  const nav = useNavigate();

  const IconUser = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M20 21a8 8 0 1 0-16 0" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" stroke="#2C14DD" strokeWidth="2" />
    </svg>
  );

  const IconGear = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15.5a3.5 3.5 0 1 0-3.5-3.5 3.5 3.5 0 0 0 3.5 3.5z"
        stroke="#2C14DD"
        strokeWidth="2"
      />
      <path
        d="M19.4 15a8 8 0 0 0 .1-6l-2 .4-1.1-1.8 1.2-1.7A9.5 9.5 0 0 0 12 3.5a9.5 9.5 0 0 0-5.6 2.4l1.2 1.7-1.1 1.8-2-.4a8 8 0 0 0 .1 6l2-.4 1.1 1.8-1.2 1.7A9.5 9.5 0 0 0 12 20.5a9.5 9.5 0 0 0 5.6-2.4l-1.2-1.7 1.1-1.8 2 .4z"
        stroke="#2C14DD"
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );

  const IconFAQ = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 18h.01" stroke="#2C14DD" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M9.5 9a2.5 2.5 0 1 1 4.1 1.9c-.8.6-1.1 1-1.1 2.1"
        stroke="#2C14DD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10z" stroke="#2C14DD" strokeWidth="2" />
    </svg>
  );

  const IconPhone = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 6.2 2 2 0 0 1 5.1 4h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L9.9 11.6a16 16 0 0 0 2.5 2.5l1.2-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z"
        stroke="#2C14DD"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="space-y-4">
      <MenuRow
        title="My Account"
        icon={IconUser}
        active={activeKey === "my"}
        onClick={() => nav("/dashboard/account/my-account")}
      />
      <MenuRow
        title="Settings"
        icon={IconGear}
        active={activeKey === "settings"}
        onClick={() => nav("/dashboard/account/settings")}
      />
      <MenuRow
        title="FAQs"
        icon={IconFAQ}
        active={activeKey === "faqs"}
        onClick={() => nav("/dashboard/account/faqs")}
      />
      <MenuRow
        title="Contact Admin"
        icon={IconPhone}
        active={activeKey === "contact"}
        onClick={() => nav("/dashboard/account/contact-admin")}
      />
    </div>
  );
}
