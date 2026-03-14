import { NavLink } from "react-router-dom";
import {
  User,
  Settings,
  HelpCircle,
  PhoneCall,
} from "lucide-react";

const item =
  "flex items-center gap-4 px-4 py-4 rounded-xl transition";
const active =
  "bg-white text-[#2F2AD9] font-semibold";

export default function AccountMenu() {
  return (
    <nav className="space-y-3">
      <NavLink
        to="/dashboard/account"
        end
        className={({ isActive }) =>
          `${item} ${isActive ? active : "text-[#2B2B4B] hover:bg-white/60"}`
        }
      >
        <User size={20} /> My Account
      </NavLink>

      <NavLink
        to="/dashboard/account/settings"
        className={({ isActive }) =>
          `${item} ${isActive ? active : "text-[#2B2B4B] hover:bg-white/60"}`
        }
      >
        <Settings size={20} /> Settings
      </NavLink>

      <NavLink
        to="/dashboard/account/faqs"
        className={({ isActive }) =>
          `${item} ${isActive ? active : "text-[#2B2B4B] hover:bg-white/60"}`
        }
      >
        <HelpCircle size={20} /> FAQs
      </NavLink>

      <NavLink
        to="/dashboard/account/contact"
        className={({ isActive }) =>
          `${item} ${isActive ? active : "text-[#2B2B4B] hover:bg-white/60"}`
        }
      >
        <PhoneCall size={20} /> Contact Admin
      </NavLink>
    </nav>
  );
}
