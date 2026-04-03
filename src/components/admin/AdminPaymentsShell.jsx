import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ChevronRight as ChevronRightLucide,
  BookOpen,
  Settings,
  BarChart3,
  CreditCard
} from "lucide-react";
import Topbar from "../dashboard/Topbar";

function EyeOpenIcon() {
  return <Eye size={24} color="white" strokeWidth={2} />;
}

function EyeClosedIcon() {
  return <EyeOff size={24} color="white" strokeWidth={2} />;
}

function ChevronRight({ color = "#CFCFDB" }) {
  return <ChevronRightLucide size={20} color={color} strokeWidth={2.5} />;
}

function WalletActionButton({ label, onClick, dark = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition active:scale-[0.99]",
        dark
          ? "bg-[#1F0EAE] text-white hover:brightness-110"
          : "bg-white text-[#2F1FC1] hover:brightness-95",
      ].join(" ")}
    >
      {label}
      <ChevronRight color={dark ? "white" : "#2F1FC1"} />
    </button>
  );
}

function WalletCard() {
  const nav = useNavigate();
  const [hidden, setHidden] = useState(false);

  return (
    <section className="overflow-hidden rounded-[30px] bg-[#2F1FC1] px-6 pb-7 pt-8 text-white shadow-[0_22px_50px_rgba(47,32,217,0.18)] sm:px-8">
      <div className="text-center">
        <p className="text-[15px] font-semibold text-white/90 sm:text-[16px]">
          Wallet Balance
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <h2 className="text-[42px] font-extrabold leading-none tracking-[-0.04em] sm:text-[50px]">
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

        <p className="mt-4 text-[15px] text-white/85 sm:text-[16px]">
          Today&apos;s Inflow:{" "}
          <span className="font-semibold">
            {hidden ? "₦x,xxx,xxx" : "₦7,345,000"}
          </span>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <WalletActionButton
          label="Withdraw"
          onClick={() => nav("/admin/dashboard/payments/settlement")}
        />
        <WalletActionButton
          label="All Payments"
          dark
          onClick={() => nav("/admin/dashboard/payments/transactions")}
        />
      </div>
    </section>
  );
}

function BookstoreIcon() {
  return <BookOpen size={30} color="#7369EA" strokeWidth={2.5} />;
}

function ManageFeesIcon() {
  return <Settings size={30} color="#7369EA" strokeWidth={2.5} />;
}

function ReportsIcon() {
  return <BarChart3 size={30} color="#7369EA" strokeWidth={2.5} />;
}

function SettlementIcon() {
  return <CreditCard size={30} color="#7369EA" strokeWidth={2.5} />;
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

export default function AdminPaymentsShell({
  title = "Payments",
  activeKey = "manage-fees",
  children,
}) {
  const nav = useNavigate();

  return (
    <div className="min-w-0 xl:min-w-[1440px] space-y-5 overflow-x-auto sm:space-y-6 xl:space-y-7 pb-10">
      <Topbar title={title} />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 2xl:gap-20">
        <div className="min-w-0">
          <WalletCard />

          <div className="w-full max-w-[404px]">
            <MenuRow
              label="Bookstore"
              icon={<BookstoreIcon />}
              active={activeKey === "bookstore"}
              onClick={() => nav("/admin/dashboard/payments/bookstore")}
            />

            <MenuRow
              label="Manage Fees"
              icon={<ManageFeesIcon />}
              active={activeKey === "manage-fees"}
              onClick={() => nav("/admin/dashboard/payments/manage-fees")}
            />

            <MenuRow
              label="Reports"
              icon={<ReportsIcon />}
              active={activeKey === "reports"}
              onClick={() => nav("/admin/dashboard/payments/reports")}
            />

            <MenuRow
              label="Settlement"
              icon={<SettlementIcon />}
              active={activeKey === "settlement"}
              onClick={() => nav("/admin/dashboard/payments/settlement")}
              hasBorder={false}
            />
          </div>
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}