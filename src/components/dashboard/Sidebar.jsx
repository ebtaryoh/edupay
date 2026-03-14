import { NavLink, useNavigate } from "react-router-dom";

const linkWrap =
  "flex items-center gap-4 px-6 py-4 rounded-xl transition w-full";

const getLinkClass = (isActive) =>
  [
    linkWrap,
    isActive
      ? "text-[#2C14DD] font-semibold"
      : "text-[#14143A] hover:bg-white/50",
  ].join(" ");

function IconBox({ children, active }) {
  return (
    <span
      className={[
        "w-11 h-11 rounded-2xl flex items-center justify-center border",
        active ? "border-[#2C14DD]" : "border-transparent",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/** Icons styled like your design (outline, blue stroke) */
function DashboardIcon({ active }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z"
        stroke={active ? "#2C14DD" : "#2C14DD"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaymentsIcon({ active }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 1 0 9 9"
        stroke="#2C14DD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 7v6l4 2"
        stroke="#2C14DD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookstoreIcon({ active }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 0-2 2V4z"
        stroke="#2C14DD"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 20h12"
        stroke="#2C14DD"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AccountIcon({ active }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21a8 8 0 1 0-16 0"
        stroke="#2C14DD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"
        stroke="#2C14DD"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Sidebar({ open, onClose }) {
  const nav = useNavigate();

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 bg-black/30 z-40 lg:hidden transition",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed lg:static z-50 top-0 left-0 h-full w-[320px] bg-[#F5F6FF]",
          "transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Rounded container like design */}
        <div className="h-full px-6 py-8">
          <div className="h-full rounded-[28px] bg-[#F5F6FF] flex flex-col">
            {/* Brand */}
            <div className="px-6 pt-8">
              <div className="text-[44px] leading-none font-extrabold text-[#2C14DD]">
                Edu<span className="font-light text-[#2C14DD]/70">Pay</span>
              </div>
            </div>

            {/* Nav */}
            <nav className="mt-10 px-4">
              <NavLink to="/dashboard" end className={({ isActive }) => getLinkClass(isActive)}>
                {({ isActive }) => (
                  <>
                    <IconBox active={isActive}>
                      <DashboardIcon active={isActive} />
                    </IconBox>
                    <span className="text-[15px]">Dashboard</span>
                  </>
                )}
              </NavLink>

              <div className="my-3 h-px bg-[#D9DDF3]" />

              <NavLink to="/dashboard/payments" className={({ isActive }) => getLinkClass(isActive)}>
                {({ isActive }) => (
                  <>
                    <IconBox active={isActive}>
                      <PaymentsIcon active={isActive} />
                    </IconBox>
                    <span className="text-[15px]">Payments</span>
                  </>
                )}
              </NavLink>

              <div className="my-3 h-px bg-[#D9DDF3]" />

              <NavLink to="/dashboard/bookstore" className={({ isActive }) => getLinkClass(isActive)}>
                {({ isActive }) => (
                  <>
                    <IconBox active={isActive}>
                      <BookstoreIcon active={isActive} />
                    </IconBox>
                    <span className="text-[15px]">Bookstore</span>
                  </>
                )}
              </NavLink>

              <div className="my-3 h-px bg-[#D9DDF3]" />

              {/* ✅ Active for /dashboard/account and ALL nested account pages */}
              <NavLink to="/dashboard/account" className={({ isActive }) => getLinkClass(isActive)}>
                {({ isActive }) => (
                  <>
                    <IconBox active={isActive}>
                      <AccountIcon active={isActive} />
                    </IconBox>
                    <span className="text-[15px]">Account</span>
                  </>
                )}
              </NavLink>
            </nav>

            {/* Logout button like design */}
            <div className="mt-auto px-6 pb-8">
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  nav("/login", { replace: true });
                }}
                className="w-full h-12 rounded-full border border-[#D9DDF3] bg-[#F5F6FF] text-[#2C14DD] font-semibold hover:bg-white/50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
