import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ChevronRight,
  BookOpen,
  Settings2,
  BarChart3,
  Landmark,
  ChevronDown
} from "lucide-react";
import Topbar from "../../components/dashboard/Topbar";
import paymentCoinImg from "../../assets/admin/payment-Coint.png";
import coinStackImg from "../../assets/admin/coin.png";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";


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
      <ChevronRight size={18} color={dark ? "white" : "#2F1FC1"} />
    </button>
  );
}

function WalletCard({ onWithdraw, onTransactions }) {
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
            {hidden ? <EyeOff size={24} color="white" /> : <Eye size={24} color="white" />}
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
        <WalletActionButton label="Withdraw" onClick={onWithdraw} />
        <WalletActionButton
          label="All Payments"
          onClick={onTransactions}
          dark
        />
      </div>
    </section>
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

      <ChevronRight size={20} color="#D2D2DB" />

      {hasBorder && !active ? (
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#D9D9E6]" />
      ) : null}
    </button>
  );
}

function CoinArt() {
  return (
    <div className="relative mx-auto h-[175px] w-full max-w-[270px]">
      <img
        src={paymentCoinImg}
        alt="Payment coin"
        className="absolute left-8 top-12 w-[110px] object-contain sm:w-[160px]"
      />

      <img
        src={coinStackImg}
        alt="Coin stacks"
        className="absolute right-0 top-[46px] w-[150px] object-contain sm:w-[160px]"
      />
    </div>
  );
}

function CTAButton({ label, dark = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-[76px] w-full cursor-pointer items-center justify-center rounded-full px-8 text-[18px] font-semibold shadow-[0_14px_32px_rgba(20,20,58,0.12)] transition hover:brightness-110 active:scale-[0.99]",
        dark ? "bg-[#16003A] text-white" : "bg-[#3420F0] text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function AdminManageFees() {
  const nav = useNavigate();

  return (
    <div className="min-w-0 xl:min-w-[1440px] space-y-5 overflow-x-auto sm:space-y-6 xl:space-y-7 pb-10">
      <Topbar title="Payments" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 2xl:gap-20">
        <div className="min-w-0">
          <WalletCard
            onWithdraw={() => nav("/admin/dashboard/payments/settlement")}
            onTransactions={() => nav("/admin/dashboard/payments/transactions")}
          />

          <div className="w-full max-w-[404px]">
            <MenuRow
              label="Bookstore"
              icon={<BookOpen size={28} color="#7369EA" />}
              onClick={() => nav("/admin/dashboard/payments/bookstore")}
            />

            <MenuRow
              label="Manage Fees"
              icon={<Settings2 size={28} color="#7369EA" />}
              active
              onClick={() => nav("/admin/dashboard/payments/manage-fees")}
            />

            <MenuRow
              label="Reports"
              icon={<BarChart3 size={28} color="#7369EA" />}
              onClick={() => nav("/admin/dashboard/payments/reports")}
            />

            <MenuRow
              label="Settlement"
              icon={<Landmark size={28} color="#7369EA" />}
              onClick={() => nav("/admin/dashboard/payments/settlement")}
              hasBorder={false}
            />
          </div>
        </div>

        <div className="min-w-0">
          <section className="overflow-hidden rounded-[34px] bg-[#3420F0] px-6 py-8 shadow-[0_22px_50px_rgba(47,32,217,0.18)] sm:px-8 sm:py-9">
            <CoinArt />

            <div className="mt-2 text-center">
              <p className="text-[18px] font-semibold text-white/90 sm:text-[20px]">
                Fee Management
              </p>

              <h2 className="mt-3 text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[46px]">
                Create New Fee
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-[420px]">
              <button
                type="button"
                className="inline-flex h-[78px] w-full cursor-pointer items-center justify-center rounded-full bg-white px-8 text-[19px] font-semibold text-[#3420F0] transition hover:brightness-95 active:scale-[0.99]"
              >
                Get Started
              </button>
            </div>
          </section>

          <div className="mx-auto mt-7 flex max-w-[420px] flex-col gap-6">
            <CTAButton
              label="View Inflow"
              onClick={() => nav("/admin/dashboard/payments/reports")}
            />
            <CTAButton label="View Fees" dark onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}