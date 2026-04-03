import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Settings, BarChart, CreditCard, Eye, EyeOff, ChevronRight } from "lucide-react";

import Topbar from "../../components/dashboard/Topbar";

function WalletActionButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-[42px] min-w-[138px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#3A24F4] px-6 text-[15px] font-semibold text-white shadow-[0_10px_22px_rgba(59,36,244,0.22)] transition hover:brightness-110 active:scale-[0.99]"
    >
      {label}
      <ChevronRight size={20} color="white" strokeWidth={2.5} />
    </button>
  );
}

function WalletCard({ onWithdraw, onAllPayments }) {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="relative mb-16 w-full max-w-[480px]">
      <section className="relative overflow-hidden rounded-[30px] bg-[#2F1FC1] px-6 pb-14 pt-8 text-white shadow-[0_22px_50px_rgba(47,32,217,0.18)] sm:px-8">
        <div className="text-center">
          <p className="text-[15px] font-semibold text-white/90 sm:text-[16px]">
            Wallet Balance
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <h2 className="text-[44px] font-extrabold leading-none tracking-[-0.04em] sm:text-[50px]">
              {hidden ? "₦xx,xxx,xxx" : "₦17,345,000"}
            </h2>

            <button
              type="button"
              onClick={() => setHidden((prev) => !prev)}
              className="cursor-pointer text-white/70 hover:text-white"
              aria-label={hidden ? "Show balance" : "Hide balance"}
            >
              {hidden ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <p className="mt-4 text-[15px] text-white/85 sm:text-[16px]">
            Today&apos;s Inflow:{" "}
            <span className="font-semibold">
              {hidden ? "₦x,xxx,xxx" : "₦7,345,000"}
            </span>
          </p>
        </div>
      </section>

      <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 items-center justify-center gap-5 sm:gap-7">
        <WalletActionButton label="Withdraw" onClick={onWithdraw} />
        <WalletActionButton label="All Payments" onClick={onAllPayments} />
      </div>
    </div>
  );
}

function BookstoreIcon() {
  return <Book size={30} strokeWidth={2} color="#7369EA" />;
}

function ManageFeesIcon() {
  return <Settings size={30} strokeWidth={2} color="#7369EA" />;
}

function ReportsIcon() {
  return <BarChart size={30} strokeWidth={2} color="#7369EA" />;
}

function SettlementIcon() {
  return <CreditCard size={30} strokeWidth={2} color="#7369EA" />;
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

export default function AdminPaymentsLanding() {
  const nav = useNavigate();

  return (
    <div className="min-w-0 xl:min-w-[1440px] space-y-5 overflow-x-auto sm:space-y-6 xl:space-y-7 pb-10">
      <Topbar title="Payments" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 2xl:gap-20">
        <div className="min-w-0">
          <WalletCard
            onWithdraw={() => nav("/admin/dashboard/payments/settlement")}
            onAllPayments={() => nav("/admin/dashboard/payments/transactions")}
          />

          <div className="w-full max-w-[480px]">
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
              hasBorder={false}
            />
          </div>
        </div>

        <div className="hidden xl:block" />
      </div>
    </div>
  );
}