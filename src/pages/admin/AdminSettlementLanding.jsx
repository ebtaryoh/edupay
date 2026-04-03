import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ChevronRight as ChevronRightLucide,
  History,
  UserCog,
  Settings,
  BookOpen,
  Settings as SettingsIcon,
  BarChart3,
  CreditCard
} from "lucide-react";
import Topbar from "../../components/dashboard/Topbar";

import kudaLogo from "../../assets/admin/banks/kuda-bank.png";
import gtbLogo from "../../assets/admin/banks/gtbank.png";
import cowrywiseLogo from "../../assets/admin/banks/cowrywise.png";

function EyeOpenIcon() {
  return <Eye size={24} color="white" strokeWidth={2} />;
}

function EyeClosedIcon() {
  return <EyeOff size={24} color="white" strokeWidth={2} />;
}

function ChevronRight({ color = "#CFCFDB" }) {
  return <ChevronRightLucide size={20} color={color} strokeWidth={2.5} />;
}

function HistoryMiniIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7h10" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M5 12h8" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M5 17h6" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M16 8v8" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path
        d="M13.5 13.5L16 16l2.5-2.5"
        stroke="white"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaymentMenuBookstoreIcon() {
  return <BookOpen size={30} color="#7369EA" strokeWidth={2.5} />;
}

function PaymentMenuManageFeesIcon() {
  return <SettingsIcon size={30} color="#7369EA" strokeWidth={2.5} />;
}

function PaymentMenuReportsIcon() {
  return <BarChart3 size={30} color="#7369EA" strokeWidth={2.5} />;
}

function PaymentMenuSettlementIcon() {
  return <CreditCard size={30} color="#7369EA" strokeWidth={2.5} />;
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

function QuickMiniAction({ icon, label, onClick, showDot = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex cursor-pointer items-center gap-3"
    >
      <div className="relative flex h-[50px] w-[50px] items-center justify-center rounded-[14px] bg-[#2F1FC1] shadow-[0_14px_26px_rgba(47,42,217,0.14)] transition group-hover:translate-y-[-1px]">
        {showDot ? (
          <span className="absolute -right-[2px] -top-[2px] h-[10px] w-[10px] rounded-full bg-[#F4A13A]" />
        ) : null}
        {icon}
      </div>

      <span className="text-left text-[15px] font-medium leading-[1.2] text-[#2A2D45]">
        {label}
      </span>
    </button>
  );
}

function PaymentMenuRow({ icon, label, active = false, onClick, hasBorder = true }) {
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

function BankToggle({ active }) {
  return (
    <div
      className={[
        "relative h-[32px] w-[56px] rounded-full transition",
        active ? "bg-[#4961F3]" : "bg-[#E4E4E4]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-[24px] w-[24px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition",
          active ? "left-[28px]" : "left-1",
        ].join(" ")}
      />
    </div>
  );
}

function BankRow({ logo, name, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex items-center gap-5">
        <img
          src={logo}
          alt={name}
          className="h-[42px] w-[42px] rounded-[10px] object-cover"
        />
        <span className="text-[18px] font-medium text-[#36436B]">{name}</span>
      </div>

      <BankToggle active={active} />
    </button>
  );
}

export default function AdminSettlementLanding() {
  const nav = useNavigate();
  const [selectedBank, setSelectedBank] = useState("GTB");
  const [amount, setAmount] = useState("");

  const banks = useMemo(
    () => [
      { id: "Kuda Bank", name: "Kuda Bank", logo: kudaLogo },
      { id: "GTB", name: "GTB", logo: gtbLogo },
      { id: "Cowrywise", name: "Cowrywise", logo: cowrywiseLogo },
    ],
    []
  );

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7">
      <Topbar title="Settlement" />

      <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[404px_minmax(0,1fr)] xl:gap-14 2xl:grid-cols-[414px_minmax(0,1fr)]">
        <div className="min-w-0">
          <BalanceCard />

          <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-5">
            <QuickMiniAction
              icon={<History size={26} color="white" strokeWidth={2} />}
              label={
                <>
                  View
                  <br />
                  History
                </>
              }
              onClick={() => nav("/admin/dashboard/payments/transactions")}
              showDot
            />

            <QuickMiniAction
              icon={<UserCog size={26} color="white" strokeWidth={2} />}
              label={
                <>
                  Manage
                  <br />
                  Account(s)
                </>
              }
              onClick={() => nav("/admin/dashboard/payments/settlement/accounts")}
              showDot
            />

            <QuickMiniAction
              icon={<SettingsIcon size={26} color="white" strokeWidth={2} />}
              label="Settings"
              onClick={() => nav("/admin/dashboard/account/settings")}
              showDot
            />
          </div>

          <div className="mt-10 w-full">
            <PaymentMenuRow
              label="Bookstore"
              icon={<PaymentMenuBookstoreIcon />}
              onClick={() => nav("/admin/dashboard/payments/bookstore")}
            />

            <PaymentMenuRow
              label="Manage Fees"
              icon={<PaymentMenuManageFeesIcon />}
              onClick={() => nav("/admin/dashboard/payments/manage-fees")}
            />

            <PaymentMenuRow
              label="Reports"
              icon={<PaymentMenuReportsIcon />}
              onClick={() => nav("/admin/dashboard/payments/reports")}
            />

            <PaymentMenuRow
              label="Settlement"
              icon={<PaymentMenuSettlementIcon />}
              onClick={() => nav("/admin/dashboard/payments/settlement")}
              active
              hasBorder={false}
            />
          </div>
        </div>

        <div className="min-w-0 pt-1 xl:pl-8 2xl:pl-10">
          <div className="w-full max-w-[450px]">
            <h2 className="text-[22px] font-medium text-[#1C1D2B]">
              Select Account
            </h2>

            <div className="mt-8 space-y-8">
              {banks.map((bank) => (
                <BankRow
                  key={bank.id}
                  logo={bank.logo}
                  name={bank.name}
                  active={selectedBank === bank.id}
                  onClick={() => setSelectedBank(bank.id)}
                />
              ))}
            </div>

            <div className="mt-9 rounded-[18px] bg-[#F2F1FB] px-6 py-5">
              <p className="text-[14px] font-medium text-[#8D93A6]">
                Amount to Withdraw
              </p>

              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="mt-2 w-full bg-transparent text-[17px] text-[#2A2D45] outline-none placeholder:text-[#A3A8BB]"
              />
            </div>

            <button
              type="button"
  onClick={() => nav("/admin/dashboard/payments/settlement/success")}
              className="mx-auto mt-7 inline-flex h-[54px] w-full max-w-[236px] cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[16px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
            >
              Request Settlement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}