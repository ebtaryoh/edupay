import { useLocation, useNavigate } from "react-router-dom";

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
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.5 15.5h-11c1-1.1 1.6-2.7 1.6-4.5 0-2.5 1.7-4.4 3.9-4.4s3.9 1.9 3.9 4.4c0 1.8.6 3.4 1.6 4.5z"
        stroke="white"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 18.4a1.8 1.8 0 0 0 3 0"
        stroke="white"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchTopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.4" stroke="white" strokeWidth="2" />
      <path
        d="M16 16l3.6 3.6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Topbar({ onMenu }) {
  const nav = useNavigate();
  const { pathname } = useLocation();

  let title = "Dashboard";

  if (pathname.startsWith("/dashboard/bookstore")) title = "Bookstore";
  else if (pathname.startsWith("/dashboard/payments/data")) title = "Buy Data";
  else if (pathname.startsWith("/dashboard/payments/airtime")) title = "Buy Airtime";
  else if (pathname.startsWith("/dashboard/payments/overdue")) title = "Overdue";
  else if (pathname.startsWith("/dashboard/payments")) title = "Payments";
  else if (pathname.startsWith("/dashboard/transaction/")) title = "Transaction Details";
  else if (pathname.startsWith("/dashboard/transactions")) title = "Transactions";
  else if (pathname.startsWith("/dashboard/notifications")) title = "Notifications";
  else if (pathname.startsWith("/dashboard/account")) title = "Account";
  else if (pathname.startsWith("/admin/dashboard")) title = "Dashboard";

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
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#1F1F34"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CircleButton>

        <h1 className="truncate text-[20px] font-semibold text-[#1B1C34] md:text-[22px]">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <CircleButton
          onClick={() => nav("/dashboard/notifications")}
          className="bg-[#2F2AD9] hover:brightness-110"
        >
          <BellTopIcon />
        </CircleButton>

        <CircleButton
          onClick={() => {}}
          className="bg-[#2F2AD9] hover:brightness-110"
        >
          <SearchTopIcon />
        </CircleButton>
      </div>
    </header>
  );
}