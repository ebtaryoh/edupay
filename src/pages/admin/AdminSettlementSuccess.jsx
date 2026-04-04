import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, ChevronRight, BookOpen, Settings2, BarChart3, Landmark } from "lucide-react";
import Topbar from "../../components/dashboard/Topbar";
import rocketImg from "../../assets/admin/rocket.png";

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
            {hidden ? <EyeOff size={24} color="white" /> : <Eye size={24} color="white" />}
          </button>
        </div>

        <p className="mt-4 text-[16px] text-white/85">
          Today&apos;s Inflow: <span className="font-semibold">{hidden ? "₦x,xxx,xxx" : "₦7,345,000"}</span>
        </p>
      </div>
    </section>
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

      <ChevronRight size={20} color="#D2D2DB" />

      {hasBorder && !active ? (
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#D9D9E6]" />
      ) : null}
    </button>
  );
}

export default function AdminSettlementSuccess() {
  const nav = useNavigate();

  return (
    <div className="min-w-0 xl:min-w-[1440px] space-y-5 overflow-x-auto sm:space-y-6 xl:space-y-7 pb-10">
      <Topbar title="Settlement" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 2xl:gap-20">
        <div className="min-w-0">
          <BalanceCard />

          <div className="mt-10 w-full">
            <PaymentMenuRow
              label="Bookstore"
              icon={<BookOpen size={28} color="#7369EA" />}
              onClick={() => nav("/admin/dashboard/payments/bookstore")}
            />

            <PaymentMenuRow
              label="Manage Fees"
              icon={<Settings2 size={28} color="#7369EA" />}
              onClick={() => nav("/admin/dashboard/payments/manage-fees")}
            />

            <PaymentMenuRow
              label="Reports"
              icon={<BarChart3 size={28} color="#7369EA" />}
              onClick={() => nav("/admin/dashboard/payments/reports")}
            />

            <PaymentMenuRow
              label="Settlement"
              icon={<Landmark size={28} color="#7369EA" />}
              onClick={() => nav("/admin/dashboard/payments/settlement")}
              active
              hasBorder={false}
            />
          </div>
        </div>

        <div className="flex min-h-[760px] items-center justify-center xl:justify-end">
          <div className="w-full max-w-[560px] text-center">
            <img
              src={rocketImg}
              alt="Settlement in progress"
              className="mx-auto w-[170px] object-contain"
            />

            <h2 className="mx-auto mt-14 max-w-[430px] text-[64px] font-extrabold leading-[0.96] tracking-[-0.04em] text-[#110F57]">
              Your payment
              <br />
              is on it&apos;s way
            </h2>

            <p className="mx-auto mt-8 max-w-[520px] text-[24px] leading-[1.55] text-[#2E2E36]">
              Your payment will be processed within
              <br />
              24hours and paid to the account selected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}