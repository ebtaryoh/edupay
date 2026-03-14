import { useLocation, useNavigate } from "react-router-dom";

function CircleBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-[#2C14DD] text-white flex items-center justify-center hover:brightness-110 active:scale-[0.99] transition"
      type="button"
    >
      {children}
    </button>
  );
}

export default function Topbar({ onMenu }) {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const titleMap = {
    "/dashboard": "Dashboard",
    "/dashboard/payments": "Payments",
    "/dashboard/payments/tuition-healthcare": "Payments",
    "/dashboard/payments/overdue": "Overdue",
    "/dashboard/transactions": "Transactions",
    "/dashboard/notifications": "Notifications",
    "/dashboard/payments/airtime": "Buy Airtime & Data",
    "/dashboard/payments/data": "Buy Airtime & Data",
    "/dashboard/transactions/t1": "Transaction Details",
  };

  const title = titleMap[pathname] || "Dashboard";

  return (
    <div className="h-[86px] px-4 md:px-8 flex items-center justify-between bg-[#F6F7FF]">
      <div className="flex items-center gap-3">
        {onMenu ? (
          <button
            type="button"
            onClick={onMenu}
            className="lg:hidden w-11 h-11 rounded-2xl bg-white border border-[#E7E9FF] flex items-center justify-center"
          >
            <div className="space-y-1">
              <span className="block w-5 h-[2px] bg-[#2C14DD]" />
              <span className="block w-5 h-[2px] bg-[#2C14DD]" />
              <span className="block w-5 h-[2px] bg-[#2C14DD]" />
            </div>
          </button>
        ) : (
          <div className="w-11 h-11" />
        )}

        <button
          type="button"
          onClick={() => nav(-1)}
          className="w-12 h-12 rounded-full bg-white border border-[#E7E9FF] flex items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#14143A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h1 className="text-[20px] md:text-[22px] font-semibold text-[#14143A]">
          {title}
        </h1>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <CircleBtn onClick={() => nav("/dashboard/notifications")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </CircleBtn>

        <CircleBtn onClick={() => {}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
            <path
              d="M20 20l-3.2-3.2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </CircleBtn>
      </div>
    </div>
  );
}
