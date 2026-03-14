// components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";

const itemBase =
  "flex items-center gap-4 px-6 py-4 rounded-2xl transition";
const itemText = "text-[15px] font-medium";
const itemActiveText = "text-[#2C14DD] font-semibold";
const itemInactiveText = "text-[#14143A]";

function IconWrap({ active, children }) {
  return (
    <span
      className={[
        "w-12 h-12 rounded-2xl flex items-center justify-center transition",
        active ? "bg-[#2C14DD]" : "bg-transparent",
        active ? "" : "border border-[#E6E8FF]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

const IconHome = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5z"
      stroke={active ? "#FFFFFF" : "#2C14DD"}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPie = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2v10h10A10 10 0 1 1 12 2z"
      stroke={active ? "#FFFFFF" : "#2C14DD"}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M14 2.3A10 10 0 0 1 21.7 10H14V2.3z"
      stroke={active ? "#FFFFFF" : "#2C14DD"}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBookstore = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 4h2v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
      fill={active ? "#FFFFFF" : "#2C14DD"}
      opacity={active ? 1 : 0.15}
    />
    <path
      d="M10 4h4v16h-4V4z"
      fill={active ? "#FFFFFF" : "#2C14DD"}
      opacity={active ? 1 : 0.35}
    />
    <path
      d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2V4z"
      fill={active ? "#FFFFFF" : "#2C14DD"}
      opacity={active ? 1 : 0.15}
    />
    <path
      d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
      stroke={active ? "#FFFFFF" : "#2C14DD"}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUser = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 21a8 8 0 1 0-16 0"
      stroke={active ? "#FFFFFF" : "#2C14DD"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"
      stroke={active ? "#FFFFFF" : "#2C14DD"}
      strokeWidth="2"
    />
  </svg>
);

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 bg-black/30 z-40 lg:hidden transition",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed lg:static z-50 top-0 left-0 h-full w-[320px]",
          "bg-[#F6F7FF] border-r border-[#E9EBFF]",
          "px-8 py-10 rounded-tr-[36px] rounded-br-[36px]",
          "transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="text-5xl font-extrabold text-[#2C14DD]">
          Edu<span className="font-light text-[#2C14DD]/60">Pay</span>
        </div>

        <nav className="mt-10 space-y-3">
          {[
            { to: "/dashboard", label: "Dashboard", Icon: IconHome, end: true },
            { to: "/dashboard/payments", label: "Payments", Icon: IconPie },
            { to: "/dashboard/bookstore", label: "Bookstore", Icon: IconBookstore },
            { to: "/dashboard/account", label: "Account", Icon: IconUser },
          ].map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => [
                itemBase,
                isActive ? "bg-white/60" : "hover:bg-white/40",
              ].join(" ")}
            >
              {({ isActive }) => (
                <>
                  <IconWrap active={isActive}>
                    <Icon active={isActive} />
                  </IconWrap>
                  <span className={[itemText, isActive ? itemActiveText : itemInactiveText].join(" ")}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute left-8 right-8 bottom-10">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full h-12 rounded-full border border-[#DADCFB] bg-transparent text-[#2C14DD] font-semibold hover:bg-white/40 transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
