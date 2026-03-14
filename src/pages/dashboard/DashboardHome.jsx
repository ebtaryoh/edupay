import { useNavigate } from "react-router-dom";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import Topbar from "../../components/dashboard/Topbar";

export default function DashboardHome() {
  const nav = useNavigate();

  return (
    <div className="space-y-6">
      <Topbar />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-8">
        {/* LEFT column */}
        <div className="space-y-8">
          {/* Profile card */}
          <div className="bg-white rounded-[28px] border border-[#E7E9FF] px-6 py-6 md:px-8 md:py-7">
            <div className="flex gap-5 items-start">
              <div className="w-[82px] h-[82px] rounded-full overflow-hidden border border-[#E7E9FF] bg-[#F4F6FF] shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#F09A2B]">
                  Welcome Back,
                </p>

                <h2 className="mt-1 text-[28px] md:text-[32px] font-extrabold text-[#14143A] leading-tight truncate">
                  Ayotunde K. Samuel
                </h2>

                <p className="mt-1 text-sm text-[#6B6B85]">
                  UNILAG - CSC/2021/001
                  <br className="hidden sm:block" />
                  <span>Computer Science - 300 Level</span>
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <div className="h-2 w-full rounded-full bg-[#EEF0FF] overflow-hidden">
                    <div className="h-full w-[18%] bg-[#22C55E]" />
                  </div>

                  <button
                    type="button"
                    className="text-sm font-semibold text-[#2C14DD] hover:underline whitespace-nowrap"
                  >
                    Complete Profile <span className="ml-1">›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Outstanding fees card */}
          <div className="rounded-[22px] bg-[#2C14DD] px-6 py-5 md:px-8 md:py-6 text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center relative">
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F5A524]" />
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 10.5l2 2 5-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 2l2.4 2.2L17.7 4l.3 3.2L21 9l-2 2.5.7 3.2-3.1-.9L14 17l-2 2-2-2-2.6-3.2-3.1.9.7-3.2L3 9l3-1.8L6.3 4l3.3.2L12 2z"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm text-white/90">
                  You have{" "}
                  <span className="text-[#FF5C5C] font-extrabold">3</span>{" "}
                  Outstanding Fees
                </p>
                <h3 className="mt-1 text-3xl md:text-4xl font-extrabold">
                  ₦345,000
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => nav("/dashboard/payments")}
              className="h-12 px-6 rounded-full bg-[#1F10B7] hover:brightness-110 active:scale-[0.99] transition font-semibold flex items-center gap-2"
            >
              Pay Now <span className="text-lg leading-none">›</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[22px] border border-[#E7E9FF] px-6 py-6 md:px-8 md:py-7">
            <h3 className="text-lg font-extrabold text-[#14143A]">
              Quick Actions
            </h3>

            <div className="mt-6">
              <QuickActions
                onPayFees={() => nav("/dashboard/payments")}
                onHistory={() => nav("/dashboard/transactions")}
                onBookstore={() => nav("/dashboard/bookstore")}
                onBuyAirtime={() => nav("/dashboard/payments/airtime")}
                onBuyData={() => nav("/dashboard/payments/data")}
                onNotifications={() => nav("/dashboard/notifications")}
                onSupport={() => {}}
                onSettings={() => {}}
              />
            </div>
          </div>

          {/* Quick Pay banner */}
          <div className="rounded-[22px] bg-[#2C14DD] px-6 py-6 md:px-8 md:py-7 text-white overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 items-center">
              <div>
                <h3 className="text-3xl md:text-[36px] font-extrabold">
                  Quick Pay
                </h3>
                <p className="mt-2 text-white/85 max-w-md text-sm md:text-base">
                  Make a quick payment. Pay for someone else
                  <br className="hidden sm:block" />
                  and do much more...
                </p>

                <button
                  type="button"
                  onClick={() => nav("/quickpay")}
                  className="mt-5 h-12 px-8 rounded-full bg-white text-[#2C14DD] font-semibold hover:brightness-95 active:scale-[0.99] transition"
                >
                  Pay Now
                </button>
              </div>

              <div className="hidden md:block justify-self-end">
                <div className="w-[240px] h-[150px] rounded-3xl bg-white/10" />
              </div>
            </div>

            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          </div>
        </div>

        {/* RIGHT column */}
        <div className="xl:sticky xl:top-6 h-fit">
          <RecentTransactions
            onViewAll={() => nav("/dashboard/transactions")}
            onViewItem={(id) => nav(`/dashboard/transaction/${id}`)} // ✅ fixed route
          />
        </div>
      </div>
    </div>
  );
}
