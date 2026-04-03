import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, ChevronLeft } from "lucide-react";

function CircleButton({ onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-full transition",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function BellTopIcon() {
  return <Bell size={22} strokeWidth={2} color="white" fill="none" />;
}

function SearchTopIcon() {
  return <Search size={22} strokeWidth={2} color="white" />;
}

export default function Topbar({
  onMenu,
  title: titleProp,
  showNotification = false,
  showSearch = false,
  notificationPath,
  searchPath,
  onSearchClick,
}) {
  const nav = useNavigate();
  const { pathname } = useLocation();

  let title = titleProp || "Dashboard";

  if (!titleProp) {
    if (pathname.startsWith("/dashboard/bookstore")) title = "Bookstore";
    else if (pathname.startsWith("/dashboard/payments/data")) title = "Buy Data";
    else if (pathname.startsWith("/dashboard/payments/airtime")) title = "Buy Airtime";
    else if (pathname.startsWith("/dashboard/payments/overdue")) title = "Overdue";
    else if (pathname.startsWith("/dashboard/payments")) title = "Payments";
    else if (pathname.startsWith("/dashboard/transaction/")) title = "Transaction Details";
    else if (pathname.startsWith("/dashboard/transactions")) title = "Transactions";
    else if (pathname.startsWith("/dashboard/notifications")) title = "Notifications";
    else if (pathname.startsWith("/dashboard/account")) title = "Account";
    else if (pathname.startsWith("/admin/dashboard/notifications")) title = "Notifications";
    else if (pathname.startsWith("/admin/dashboard/payments/manage-fees")) title = "Payments";
    else if (pathname.startsWith("/admin/dashboard/payments/bookstore")) title = "Manage Bookstore";
    else if (pathname.startsWith("/admin/dashboard/payments/reports")) title = "Reports";
    else if (pathname.startsWith("/admin/dashboard/payments/transactions")) title = "Transactions";
    else if (pathname.startsWith("/admin/dashboard/payments/settlement")) title = "Settlement";
    else if (pathname.startsWith("/admin/dashboard/payments")) title = "Payments";
    else if (pathname.startsWith("/admin/dashboard")) title = "Admin Dashboard";
  }

  const resolvedNotificationPath = notificationPath
    || (pathname.startsWith("/admin") ? "/admin/dashboard/notifications" : "/dashboard/notifications");

  function handleSearch() {
    if (typeof onSearchClick === "function") {
      onSearchClick();
      return;
    }

    if (searchPath) {
      nav(searchPath);
    }
  }

  return (
    <header className="flex h-[72px] items-center justify-between overflow-x-hidden">
      <div className="flex min-w-0 items-center gap-4">
        {onMenu ? (
          <button
            type="button"
            onClick={onMenu}
            className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-[16px] border border-[#E6E8F5] bg-white lg:hidden"
          >
            <div className="space-y-1.5">
              <span className="block h-[2px] w-5 rounded-full bg-[#2F2AD9]" />
              <span className="block h-[2px] w-5 rounded-full bg-[#2F2AD9]" />
              <span className="block h-[2px] w-5 rounded-full bg-[#2F2AD9]" />
            </div>
          </button>
        ) : null}

        <CircleButton
          onClick={() => nav(-1)}
          className="bg-[#F3F4FA] text-[#14143A] hover:bg-white"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </CircleButton>

        <h1 className="truncate text-[20px] font-semibold text-[#1B1C34] md:text-[22px]">
          {title}
        </h1>
      </div>

      {showNotification || showSearch ? (
        <div className="flex shrink-0 items-center gap-4">
          {showNotification ? (
            <CircleButton
              onClick={() => nav(resolvedNotificationPath)}
              className="bg-[#2F2AD9] hover:brightness-110"
            >
              <BellTopIcon />
            </CircleButton>
          ) : null}

          {showSearch ? (
            <CircleButton
              onClick={handleSearch}
              className="bg-[#2F2AD9] hover:brightness-110"
            >
              <SearchTopIcon />
            </CircleButton>
          ) : null}
        </div>
      ) : (
        <div className="w-[108px]" />
      )}
    </header>
  );
}