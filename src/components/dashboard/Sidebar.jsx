import { NavLink, useLocation, useNavigate } from "react-router-dom";

function DashboardIcon({ active }) {
  return (
    <svg width="36" height="36" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <path
        d="M8.7 17.3L19 8.5l10.3 8.8V28c0 2.1-1.7 3.8-3.8 3.8h-5.1v-8.5h-2.8v8.5h-5.1A3.8 3.8 0 0 1 8.7 28V17.3z"
        fill={active ? "#2F2AD9" : "none"}
        stroke="#2F2AD9"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <path
        d="M19 8.5a10.5 10.5 0 1 0 10.5 10.5"
        stroke="#2F2AD9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M19 8.5v10.5h10.5"
        stroke="#2F2AD9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 15.2A8.6 8.6 0 0 1 19 10.4"
        stroke="#2F2AD9"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

function BookstoreIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <rect
        x="8.5"
        y="8.5"
        width="21"
        height="21"
        rx="5.5"
        stroke="#2F2AD9"
        strokeWidth="2.4"
      />
      <path
        d="M14 25V16"
        stroke="#2F2AD9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M19 25V13"
        stroke="#2F2AD9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24 25v-6"
        stroke="#2F2AD9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <circle cx="19" cy="13.4" r="5.4" stroke="#2F2AD9" strokeWidth="2.4" />
      <path
        d="M9.4 30c1.7-4.8 5.2-7.2 9.6-7.2s7.9 2.4 9.6 7.2"
        stroke="#2F2AD9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ItemSeparator() {
  return <div className="mx-3 my-3.5 h-px bg-[#D7DCF0]" />;
}

function SidebarLink({ to, end = false, label, icon }) {
  return (
    <NavLink to={to} end={end} className="block cursor-pointer">
      {({ isActive }) => (
        <div className="flex items-center gap-3 px-4">
          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center">
            {icon(isActive)}
          </div>

          <span
            className={[
              "text-[15px] transition",
              isActive
                ? "font-semibold text-[#2F2AD9]"
                : "font-medium text-[#2F2AD9]",
            ].join(" ")}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isAdmin = pathname.startsWith("/admin");
  const basePath = isAdmin ? "/admin/dashboard" : "/dashboard";
  const logoutPath = isAdmin ? "/login/admin" : "/login/student";

  return (
    <>
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 cursor-pointer bg-black/30 transition lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen w-[270px] shrink-0 bg-[#F4F6FF] transition-transform lg:static lg:translate-x-0 xl:w-[280px]",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <div className="rounded-[28px] bg-[#F4F6FF] pb-4 pt-2">
            <div className="px-4 pt-4">
              <div className="flex items-end gap-2">
                <div className="text-[40px] leading-none font-extrabold tracking-[-0.04em] text-[#2C14DD]">
                  Edu<span className="font-light text-[#2C14DD]/70">Pay</span>
                </div>

                {isAdmin ? (
                  <span className="pb-1 text-[15px] font-semibold text-[#2C14DD]">
                    Admin
                  </span>
                ) : null}
              </div>
            </div>

            <nav className="mt-8">
              <SidebarLink
                to={basePath}
                end
                label="Dashboard"
                icon={(active) => <DashboardIcon active={active} />}
              />

              <ItemSeparator />

              <SidebarLink
                to={`${basePath}/payments`}
                label="Payments"
                icon={() => <PaymentsIcon />}
              />

              <ItemSeparator />

              <SidebarLink
                to={`${basePath}/bookstore`}
                label="Bookstore"
                icon={() => <BookstoreIcon />}
              />

              <ItemSeparator />

              <SidebarLink
                to={`${basePath}/account`}
                label="Account"
                icon={() => <AccountIcon />}
              />
            </nav>
          </div>

          <div className="mt-auto px-2 pb-2">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("studentId");
                localStorage.removeItem("matricNo");
                nav(logoutPath, { replace: true });
              }}
              className="h-[56px] w-full cursor-pointer rounded-full border border-[#D7DCF0] bg-[#F8F9FF] text-[16px] font-semibold text-[#2F2AD9] transition hover:bg-white"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}