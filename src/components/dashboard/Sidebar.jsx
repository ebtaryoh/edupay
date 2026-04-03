import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { studentApi } from "../../api/student";
import { LayoutDashboard, Wallet, BookOpen, User } from "lucide-react";

function DashboardIcon({ active }) {
  return (
    <LayoutDashboard
      size={28}
      strokeWidth={active ? 2.5 : 2}
      color="#2F2AD9"
      className={`transition-all duration-200 ${active ? "opacity-100" : "opacity-75"}`}
    />
  );
}

function PaymentsIcon({ active }) {
  return (
    <Wallet
      size={28}
      strokeWidth={active ? 2.5 : 2}
      color="#2F2AD9"
      className={`transition-all duration-200 ${active ? "opacity-100" : "opacity-75"}`}
    />
  );
}

function BookstoreIcon({ active }) {
  return (
    <BookOpen
      size={28}
      strokeWidth={active ? 2.5 : 2}
      color="#2F2AD9"
      className={`transition-all duration-200 ${active ? "opacity-100" : "opacity-75"}`}
    />
  );
}

function AccountIcon({ active }) {
  return (
    <User
      size={28}
      strokeWidth={active ? 2.5 : 2}
      color="#2F2AD9"
      className={`transition-all duration-200 ${active ? "opacity-100" : "opacity-75"}`}
    />
  );
}

function ItemSeparator() {
  return <div className="mx-3 my-3.5 h-px bg-[#D7DCF0]" />;
}

export default function Sidebar({ open, onClose }) {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const isAdmin = pathname.startsWith("/admin");
  const dashboardPath = isAdmin ? "/admin/dashboard" : "/dashboard";
  const paymentsPath = `${dashboardPath}/payments`;
  const bookstorePath = `${dashboardPath}/bookstore`;
  const accountPath = `${dashboardPath}/account`;
  const logoutPath = isAdmin ? "/login/admin" : "/login/student";

  async function handleLogout() {
    const studentId = localStorage.getItem("studentId") || "";

    try {
      if (!isAdmin && studentId) {
        await studentApi.logoutStudent(studentId);
      }
    } catch (error) {
      console.error("STUDENT LOGOUT ERROR:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("studentId");
      localStorage.removeItem("matricNo");
      localStorage.removeItem("studentPhoto");
      localStorage.removeItem("adminPhoto");
      onClose?.();
      nav(logoutPath, { replace: true });
    }
  }

  function handleLinkClick() {
    onClose?.();
  }

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
          "fixed left-0 top-0 z-40 h-screen w-[260px] bg-[#F4F6FF] transition-transform lg:static lg:translate-x-0 lg:border-r lg:border-[#D7DCF0]",
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-4 py-8">
          <div className="px-4">
            <div className="flex items-end gap-2">
              <div className="text-[38px] font-extrabold leading-none tracking-[-0.04em] text-[#2C14DD]">
                Edu<span className="font-light text-[#2C14DD]/70">Pay</span>
              </div>

              {isAdmin ? (
                <span className="pb-1 text-[15px] font-semibold text-[#2C14DD]">
                  Admin
                </span>
              ) : null}
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            <SidebarLink
              to={dashboardPath}
              label="Dashboard"
              icon={(active) => <DashboardIcon active={active} />}
              end
              onClick={handleLinkClick}
            />
            <SidebarLink
              to={paymentsPath}
              label="Payments"
              icon={(active) => <PaymentsIcon active={active} />}
              onClick={handleLinkClick}
            />
            <SidebarLink
              to={bookstorePath}
              label="Bookstore"
              icon={(active) => <BookstoreIcon active={active} />}
              onClick={handleLinkClick}
            />
            <SidebarLink
              to={accountPath}
              label="Account"
              icon={(active) => <AccountIcon active={active} />}
              onClick={handleLinkClick}
            />
          </nav>

          <div className="mt-auto px-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-[52px] w-full cursor-pointer items-center justify-center rounded-full bg-[#E7E9FB] text-[15px] font-bold text-[#2C14DD] transition hover:bg-[#DDE0F8]"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ to, end = false, label, icon, onClick }) {
  return (
    <NavLink to={to} end={end} className="block cursor-pointer outline-none" onClick={onClick}>
      {({ isActive }) => (
        <div
          className={[
            "flex h-[54px] items-center gap-3 px-4 transition-all duration-200",
            isActive ? "rounded-full bg-white shadow-sm" : "bg-transparent",
          ].join(" ")}
        >
          <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center">
            {icon(isActive)}
          </div>

          <span
            className={[
              "text-[15px] transition-colors",
              isActive ? "font-bold text-[#2C14DD]" : "font-medium text-[#2C14DD]/80",
            ].join(" ")}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
}