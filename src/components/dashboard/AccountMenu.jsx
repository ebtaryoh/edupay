import { useNavigate } from "react-router-dom";
import { User, Settings, HelpCircle, Phone, ChevronRight } from "lucide-react";

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

      <span className="text-[#B5B9C9]">
        <ChevronRight size={20} />
      </span>
    </button>
  );
}

export default function AccountMenu({ activeKey = "my" }) {
  const nav = useNavigate();

  const IconUser = <User size={22} color="#2C14DD" strokeWidth={2} />;
  const IconGear = <Settings size={22} color="#2C14DD" strokeWidth={2} />;
  const IconFAQ = <HelpCircle size={22} color="#2C14DD" strokeWidth={2} />;
  const IconPhone = <Phone size={22} color="#2C14DD" strokeWidth={2.5} />;

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
