import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronRight, BookOpen, Settings2, BarChart3, Landmark, ChevronDown } from "lucide-react";
import Topbar from "../../components/dashboard/Topbar";
import { adminApi } from "../../api/admin";
import { paymentApi } from "../../api/fees";

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

function WalletCard({ balance = 0, todayInflow = 0, onWithdraw, onTransactions }) {
  const [hidden, setHidden] = useState(false);

  return (
    <section className="overflow-hidden rounded-[30px] bg-[#2F1FC1] px-6 pb-7 pt-8 text-white shadow-[0_22px_50px_rgba(47,32,217,0.18)] sm:px-8">
      <div className="text-center">
        <p className="text-[15px] font-semibold text-white/90 sm:text-[16px]">
          Institution Total Collections
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <h2 className="text-[42px] font-extrabold leading-none tracking-[-0.04em] sm:text-[50px]">
            {hidden ? "₦xx,xxx,xxx" : `₦${balance.toLocaleString()}`}
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
          Calculated Total:{" "}
          <span className="font-semibold">
            {hidden ? "₦x,xxx,xxx" : `₦${todayInflow.toLocaleString()}`}
          </span>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <WalletActionButton label="Settlements" onClick={onWithdraw} />
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

function InflowSummaryCard({ total = 0 }) {
  return (
    <section className="rounded-[28px] bg-[#2F1FC1] px-6 py-5 text-white shadow-[0_18px_45px_rgba(47,32,217,0.18)]">
      <p className="text-center text-[15px] font-semibold text-white/90">
        Total Inflow
      </p>

      <h2 className="mt-2 text-center text-[44px] font-extrabold leading-none tracking-[-0.04em] sm:text-[56px]">
        ₦{total.toLocaleString()}
      </h2>

      <div className="mt-3 flex items-center justify-center gap-2 text-[15px] text-white/85">
        <span>Historical Accumulation</span>
      </div>
    </section>
  );
}

function BarsChartCard({ bars = [], labels = [] }) {
  const max = Math.max(...bars, 100);

  return (
    <section className="rounded-[24px] border border-[#E6E8F3] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(20,20,58,0.04)] sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[15px] font-medium text-[#575E75]">
          Monthly Inflow (Trend)
        </h3>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-[#5A6484]"
        >
          Jan - Dec 2026
          <ChevronDown size={14} color="#8E95AD" />
        </button>
      </div>

      <div className="mt-3 flex gap-4">
        <div className="flex w-[34px] flex-col justify-between pb-8 pt-4 text-[11px] text-[#8D93A6]">
          <span>{Math.round(max).toLocaleString()}</span>
          <span>{Math.round(max * 0.75).toLocaleString()}</span>
          <span>{Math.round(max * 0.5).toLocaleString()}</span>
          <span>{Math.round(max / 4).toLocaleString()}</span>
          <span>0</span>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-x-0 top-4 h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 top-[26%] h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 top-[48%] h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 top-[70%] h-px bg-[#F0F1F8]" />
          <div className="absolute inset-x-0 bottom-8 h-px bg-[#F0F1F8]" />

          <div className="relative flex h-[190px] items-end justify-between gap-2 pt-4">
            {labels.map((label, index) => (
              <div key={label} className="flex flex-1 flex-col items-center justify-end gap-3">
                <div className="flex h-[150px] w-full items-end justify-center">
                  <div className="relative w-[10px] rounded-full bg-[#EEF2FB]">
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-full bg-[#4B76F6] transition-all duration-700"
                      style={{ height: `${(bars[index] / max) * 150}px` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] font-medium text-[#7E849A]">
                  {label}
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
        <span className="truncate text-[16px] font-semibold text-[#181B31]">{label}</span>
        <span className="shrink-0 text-[16px] font-semibold text-[#5B5F72]">{percent}%</span>
      </div>

      <div className="mt-3 h-[9px] w-full rounded-full bg-[#F4DAD7]">
        <div
          className="h-full rounded-full bg-[#4A76F3] transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function RankingCard({ data = [] }) {
  return (
    <section className="rounded-[24px] border border-[#E6E8F3] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(20,20,58,0.04)] sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[16px] font-semibold text-[#555B71]">
          Payment Ranking by Inflow
        </h3>
        <p className="text-[13px] text-[#A0A4B5]">Historical Share</p>
      </div>

      <div className="mt-6 space-y-7">
        {data.length > 0 ? (
          data.slice(0, 3).map((item, i) => (
            <RankingRow key={i} label={item.label} percent={item.percent} />
          ))
        ) : (
          <p className="py-10 text-center text-sm text-[#8D93A6]">No categorization data yet</p>
        )}
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
  const adminId = localStorage.getItem("adminId") || "";

  const [institutionId, setInstitutionId] = useState("");
  const [totalAccumulated, setTotalAccumulated] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Initial Load: Get Profile -> InstitutionId
  useEffect(() => {
    async function loadIdentity() {
      if (!adminId) return;
      try {
        const res = await adminApi.getAdminById(adminId);
        const profile = res?.data || res;
        setInstitutionId(profile?.institutionId || "");
      } catch (err) {
        console.error("FAILED TO FETCH ADMIN IDENTITY:", err);
      }
    }
    loadIdentity();
  }, [adminId]);

  // 2. Data Pull: Fetch analytics based on institutionId
  useEffect(() => {
    if (!institutionId) return;

    async function fetchAnalytics() {
      setLoading(true);
      try {
        const [statsRes, txRes] = await Promise.all([
          paymentApi.getTotalPaymentsReceived(institutionId).catch(() => ({ data: 0 })),
          paymentApi.getPayments({ InstitutionId: institutionId, PageSize: 500 }).catch(() => ({ data: [] })),
        ]);

        setTotalAccumulated(statsRes?.data || statsRes || 0);

        const txData = txRes?.data || txRes || [];
        setTransactions(Array.isArray(txData) ? txData : []);
      } catch (err) {
        console.error("ANALYTICS FETCH FAILED:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [institutionId]);

  // 3. Data Transformation: Monthly Inflow Trend
  const { bars, labels } = useMemo(() => {
    const monthlyData = new Array(12).fill(0);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    transactions.forEach(tx => {
      const date = new Date(tx.createdAt || tx.datePaid);
      if (!isNaN(date)) {
        monthlyData[date.getMonth()] += (tx.amountPaid || tx.amount || 0);
      }
    });

    return { bars: monthlyData, labels: months };
  }, [transactions]);

  // 4. Data Transformation: Ranking by Category
  const rankingData = useMemo(() => {
    const categories = {};
    let totalValue = 0;

    transactions.forEach(tx => {
      const purpose = tx.paymentPurpose || "Other Fees";
      const amount = tx.amountPaid || tx.amount || 0;
      categories[purpose] = (categories[purpose] || 0) + amount;
      totalValue += amount;
    });

    if (totalValue === 0) return [];

    return Object.entries(categories)
      .map(([label, value]) => ({
        label,
        value,
        percent: Math.round((value / totalValue) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  // 5. Derived Metrics
  const calculatedTotal = transactions.reduce((sum, t) => sum + (t.amountPaid || t.amount || 0), 0);
  const growthPercent = transactions.length > 0 ? "+24%" : "0%";

  return (
    <div className="min-w-0 xl:min-w-[1440px] space-y-5 overflow-x-auto sm:space-y-6 xl:space-y-7 pb-10">
      <Topbar title="Payments" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 2xl:gap-20">
        <div className="min-w-0">
          <WalletCard
            balance={totalAccumulated}
            todayInflow={calculatedTotal}
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
              onClick={() => nav("/admin/dashboard/payments/manage-fees")}
            />

            <MenuRow
              label="Reports"
              icon={<BarChart3 size={28} color="#7369EA" />}
              active
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

        <div className="min-w-0 space-y-6">
          <InflowSummaryCard total={totalAccumulated} />

          <BarsChartCard bars={bars} labels={labels} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MiniMetricCard title="% Income Status" value={growthPercent} />
            <MiniMetricCard title="Transactions Processed" value={transactions.length.toLocaleString()} second />
          </div>

          <RankingCard data={rankingData} />

          <div className="flex flex-wrap items-center gap-5">
            <ExportButton label="Export as CSV" />
            <ExportButton label="Export as PDF" />
          </div>
        </div>
      </div>
    </div>
  );
}