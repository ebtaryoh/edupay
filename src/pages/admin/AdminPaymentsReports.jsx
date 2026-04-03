import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/dashboard/Topbar";

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

function BookstoreIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.1" fill="#7369EA" />
      <path
        d="M6.8 17.3c.9-2.5 2.7-3.9 5.2-3.9s4.3 1.4 5.2 3.9"
        fill="#7369EA"
      />
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
      <path
        d="M12 10v4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
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

function PeriodChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LightPeriodChevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="#8E95AD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InflowSummaryCard() {
  return (
    <section className="rounded-[28px] bg-[#2F1FC1] px-6 py-5 text-white shadow-[0_18px_45px_rgba(47,32,217,0.18)]">
      <p className="text-center text-[15px] font-semibold text-white/90">
        Total Inflow
      </p>

      <h2 className="mt-2 text-center text-[44px] font-extrabold leading-none tracking-[-0.04em] sm:text-[56px]">
        ₦92,624,000
      </h2>

      <div className="mt-3 flex items-center justify-center gap-2 text-[15px] text-white/85">
        <span>Period: Jan. 1st - Dec. 31st 2025</span>
        <PeriodChevron />
      </div>
    </section>
  );
}

function BarsChartCard() {
  const bars = [120, 160, 160, 280, 320, 240, 280, 120, 320, 390, 430, 470];
  const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const max = Math.max(...bars);

  return (
    <section className="rounded-[24px] border border-[#E6E8F3] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(20,20,58,0.04)] sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[15px] font-medium text-[#575E75]">
          Inflow (in Millions)
        </h3>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-[#5A6484]"
        >
          Jan 1 - Dec 31st 2025
          <LightPeriodChevron />
        </button>
      </div>

      <div className="mt-3 flex gap-4">
        <div className="flex w-[34px] flex-col justify-between pb-8 pt-4 text-[11px] text-[#8D93A6]">
          <span>400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-x-0 top-4 h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 top-[26%] h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 top-[48%] h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 top-[70%] h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 bottom-8 h-px bg-[#F0F1F8]" />

          <div className="relative flex h-[190px] items-end justify-between gap-2 pt-4">
            {bars.map((value, index) => (
              <div key={labels[index]} className="flex flex-1 flex-col items-center justify-end gap-3">
                <div className="flex h-[150px] w-full items-end justify-center">
                  <div className="relative w-[10px] rounded-full bg-[#EEF2FB]">
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-full bg-[#4B76F6]"
                      style={{ height: `${(value / max) * 150}px` }}
                    />
                    <div className="h-[150px] w-full" />
                  </div>
                </div>
                <span className="text-[10px] font-medium text-[#7E849A]">
                  {labels[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Sparkline({ second = false }) {
  const points = second
    ? "0,36 18,37 36,38 54,34 72,36 90,35 108,31 126,28 144,26 162,31 180,30"
    : "0,38 18,39 36,38 54,31 72,34 90,40 108,38 126,38 144,32 162,28 180,31";

  return (
    <svg width="180" height="48" viewBox="0 0 180 48" fill="none" aria-hidden="true">
      <path
        d={`M${points.replaceAll(" ", " L")}`}
        stroke="#3560F7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function MiniMetricCard({ title, value, second = false }) {
  return (
    <section className="rounded-[22px] border border-[#E6E8F3] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(20,20,58,0.04)]">
      <p className="text-[14px] font-medium text-[#6C7288]">{title}</p>
      <h3 className="mt-2 text-[18px] font-extrabold text-[#121528]">{value}</h3>
      <div className="mt-2 overflow-hidden">
        <Sparkline second={second} />
      </div>
    </section>
  );
}

function RankingRow({ label, percent }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[16px] font-semibold text-[#181B31]">{label}</span>
        <span className="text-[16px] font-semibold text-[#5B5F72]">{percent}%</span>
      </div>

      <div className="mt-3 h-[9px] w-full rounded-full bg-[#F4DAD7]">
        <div
          className="h-full rounded-full bg-[#4A76F3]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function RankingCard() {
  return (
    <section className="rounded-[24px] border border-[#E6E8F3] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(20,20,58,0.04)] sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[16px] font-semibold text-[#555B71]">
          Top 3 Fee Ranking by Inflow
        </h3>
        <p className="text-[13px] text-[#A0A4B5]">Jan 1 - Dec 31st 2025</p>
      </div>

      <div className="mt-6 space-y-7">
        <RankingRow label="Tuition Fee" percent={54} />
        <RankingRow label="Hostel Accomodation Fee" percent={15} />
        <RankingRow label="Healthcare/Clinic fees" percent={6} />
      </div>
    </section>
  );
}

function ExportButton({ label, dark = false }) {
  return (
    <button
      type="button"
      className={[
        "inline-flex h-[54px] min-w-[188px] cursor-pointer items-center justify-center rounded-full px-8 text-[18px] font-semibold shadow-[0_14px_28px_rgba(43,25,221,0.14)] transition hover:brightness-110 active:scale-[0.99]",
        dark ? "bg-[#19003D] text-white" : "bg-[#3420F0] text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function AdminPaymentsReports() {
  const nav = useNavigate();

  const chartData = useMemo(() => [], []);

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
              active
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

        <div className="min-w-0 space-y-6">
          <InflowSummaryCard />

          <BarsChartCard data={chartData} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MiniMetricCard title="% Income Growth" value="86%" />
            <MiniMetricCard title="% New Payments Processed" value="+34%" second />
          </div>

          <RankingCard />

          <div className="flex flex-wrap items-center gap-5">
            <ExportButton label="Export as CSV" />
            <ExportButton label="Export as PDF" />
          </div>
        </div>
      </div>
    </div>
  );
}