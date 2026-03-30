import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/dashboard/Topbar";

import kudaLogo from "../../assets/admin/banks/kuda-bank.png";
import gtbLogo from "../../assets/admin/banks/gtbank.png";
import cowrywiseLogo from "../../assets/admin/banks/cowrywise.png";

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

function ChevronRight({ color = "#CFCFDB" }) {
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
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.1" fill="#7369EA" />
      <path d="M6.8 17.3c.9-2.5 2.7-3.9 5.2-3.9s4.3 1.4 5.2 3.9" fill="#7369EA" />
    </svg>
  );
}

function PaymentMenuManageFeesIcon() {
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

function PaymentMenuReportsIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="#7369EA" />
      <path d="M12 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8.2" r="0.9" fill="white" />
    </svg>
  );
}

function PaymentMenuSettlementIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.2 7.2c.5 2.1 1.6 4.1 3.2 5.7 1.6 1.6 3.6 2.7 5.7 3.2l1.6-2a1.5 1.5 0 0 0-.2-2l-2-1.6a1.5 1.5 0 0 0-1.8 0l-1.2.9c-.8-.4-1.7-1.1-2.6-2-.9-.9-1.6-1.8-2-2.6l.9-1.2a1.5 1.5 0 0 0 0-1.8l-1.6-2a1.5 1.5 0 0 0-2-.2l-2 1.6z"
        fill="#7369EA"
      />
    </svg>
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
              icon={<HistoryMiniIcon />}
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
              icon={<HistoryMiniIcon />}
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
              icon={<HistoryMiniIcon />}
              label="Settings"
              onClick={() => nav("/admin/dashboard/settings")}
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