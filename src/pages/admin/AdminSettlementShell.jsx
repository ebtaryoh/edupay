import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../dashboard/Topbar";

function EyeOpenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.8" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3l18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M9.4 9.4A3.7 3.7 0 0 0 8.3 12c0 2 1.7 3.7 3.7 3.7.95 0 1.82-.36 2.46-.96"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.55 6.55C3.96 8.12 2.5 10.62 2.5 12c0 0 3.8 6.5 9.5 6.5 1.83 0 3.42-.45 4.8-1.14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9 5.58c.36-.05.72-.08 1.1-.08 5.7 0 9.5 6.5 9.5 6.5-.64 1.09-1.85 2.77-3.63 4.18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ color = "#D2D2DB" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookstoreIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.1" fill="#7369EA" />
      <path d="M6.8 17.3c.9-2.5 2.7-3.9 5.2-3.9s4.3 1.4 5.2 3.9" fill="#7369EA" />
    </svg>
  );
}

function ManageFeesIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"
        stroke="#7369EA"
        strokeWidth="1.9"
      />
      <path
        d="M19.2 13.2l1.1-.8-1-2.9-1.4.1a6.6 6.6 0 0 0-1.3-1.3l.1-1.4-2.9-1-1 .9a7 7 0 0 0-1.8 0l-1-.9-2.9 1 .1 1.4c-.5.4-.9.8-1.3 1.3l-1.4-.1-1 2.9 1.1.8a7 7 0 0 0 0 1.8l-1.1.8 1 2.9 1.4-.1c.4.5.8.9 1.3 1.3l-.1 1.4 2.9 1 1-.9a7 7 0 0 0 1.8 0l1 .9 2.9-1-.1-1.4c.5-.4.9-.8 1.3-1.3l1.4.1 1-2.9-1.1-.8a7 7 0 0 0 0-1.8z"
        stroke="#7369EA"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="#7369EA" />
      <path d="M12 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8.2" r="0.9" fill="white" />
    </svg>
  );
}

function SettlementIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.2 7.2c.5 2.1 1.6 4.1 3.2 5.7 1.6 1.6 3.6 2.7 5.7 3.2l1.6-2a1.5 1.5 0 0 0-.2-2l-2-1.6a1.5 1.5 0 0 0-1.8 0l-1.2.9c-.8-.4-1.7-1.1-2.6-2-.9-.9-1.6-1.8-2-2.6l.9-1.2a1.5 1.5 0 0 0 0-1.8l-1.6-2a1.5 1.5 0 0 0-2-.2l-2 1.6z"
        fill="#7369EA"
      />
    </svg>
  );
}

function MenuRow({ icon, label, active = false, onClick, hasBorder = true }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex w-full cursor-pointer items-center gap-5 text-left transition",
        active
          ? "rounded-[22px] bg-[#ECEBFA] px-3 py-4"
          : "px-0 py-4 hover:bg-white/40",
      ].join(" ")}
    >
      <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[20px] bg-[#E9E7FF]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[18px] font-medium text-[#17192F]">{label}</p>
      </div>

      <ChevronRight color="#D2D2DB" />

      {hasBorder && !active ? (
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#D9D9E6]" />
      ) : null}
    </button>
  );
}

function BalanceCard() {
  const [hidden, setHidden] = useState(false);

  return (
    <section className="overflow-hidden rounded-[30px] bg-[#2F1FC1] px-8 pb-7 pt-8 text-white shadow-[0_22px_50px_rgba(47,32,217,0.18)]">
      <div className="text-center">
        <p className="text-[16px] font-semibold text-white/90">Wallet Balance</p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <h2 className="text-[50px] font-extrabold leading-none tracking-[-0.04em]">
            {hidden ? "₦xx,xxx,xxx" : "₦17,345,000"}
          </h2>

          <button
            type="button"
            onClick={() => setHidden((prev) => !prev)}
            className="cursor-pointer"
            aria-label={hidden ? "Show balance" : "Hide balance"}
          >
            {hidden ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        </div>

        <p className="mt-4 text-[16px] text-white/85">
          Today&apos;s Inflow:{" "}
          <span className="font-semibold">
            {hidden ? "₦x,xxx,xxx" : "₦7,345,000"}
          </span>
        </p>
      </div>
    </section>
  );
}

export default function AdminSettlementShell({
  title = "Settlement",
  children,
}) {
  const nav = useNavigate();

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7">
      <Topbar title={title} />

      <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[404px_minmax(0,1fr)] xl:gap-14 2xl:grid-cols-[414px_minmax(0,1fr)]">
        <div className="min-w-0">
          <BalanceCard />

          <div className="mt-10 w-full">
            <MenuRow
              label="Bookstore"
              icon={<BookstoreIcon />}
              onClick={() => nav("/admin/dashboard/payments/bookstore")}
            />

            <MenuRow
              label="Manage Fees"
              icon={<ManageFeesIcon />}
              onClick={() => nav("/admin/dashboard/payments/manage-fees")}
            />

            <MenuRow
              label="Reports"
              icon={<ReportsIcon />}
              onClick={() => nav("/admin/dashboard/payments/reports")}
            />

            <MenuRow
              label="Settlement"
              icon={<SettlementIcon />}
              onClick={() => nav("/admin/dashboard/payments/settlement")}
              active
              hasBorder={false}
            />
          </div>
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}