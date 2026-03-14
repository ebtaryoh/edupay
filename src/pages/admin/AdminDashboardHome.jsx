import { useNavigate } from "react-router-dom";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import Topbar from "../../components/dashboard/Topbar";

export default function AdminDashboardHome() {
  const nav = useNavigate();

  return (
    <div className="space-y-6">
      {/* Topbar should show "Admin Dashboard" */}
      <Topbar title="Admin Dashboard" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {/* Profile Card */}
          <div className="bg-white rounded-[28px] border border-[#E7E9FF] px-6 py-6 md:px-8 md:py-7">
            <div className="flex gap-5 items-start">
              <div className="w-[82px] h-[82px] rounded-full overflow-hidden border border-[#E7E9FF] bg-[#F4F6FF] shrink-0">
                {/* Replace with real image later */}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#F09A2B]">
                  Welcome Back,
                </p>

                <h2 className="mt-1 text-[28px] md:text-[32px] font-extrabold text-[#14143A] leading-tight truncate">
                  Uti Chike
                </h2>

                <p className="mt-1 text-sm text-[#6B6B85]">
                  UNILAG - CSC/2021/001
                  <br className="hidden sm:block" />
                  <span>Admin Office - College of Medicine</span>
                </p>

                <div className="mt-5 flex items-center gap-4">
                  <div className="h-2 w-full rounded-full bg-[#EEF0FF] overflow-hidden">
                    <div className="h-full w-[35%] bg-[#22C55E]" />
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

          {/* Today's Total Transaction Card */}
          <div className="rounded-[22px] bg-[#2C14DD] px-6 py-5 md:px-8 md:py-6 text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <span className="text-xl">💼</span>
              </div>

              <div>
                <p className="text-sm text-white/80">
                  Today’s Total Transaction
                </p>
                <h3 className="mt-1 text-3xl md:text-4xl font-extrabold">
                  ₦345,000
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => nav("/admin/dashboard/transactions")}
              className="h-12 px-6 rounded-full bg-[#1F10B7] hover:brightness-110 active:scale-[0.99] transition font-semibold"
            >
              See All
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[22px] border border-[#E7E9FF] px-6 py-6 md:px-8 md:py-7">
            <h3 className="text-lg font-extrabold text-[#14143A]">
              Quick Actions
            </h3>

            <div className="mt-6">
              <QuickActions
                onPayFees={() => nav("/admin/dashboard/payment-centre")}
                onHistory={() => nav("/admin/dashboard/history")}
                onBookstore={() => nav("/admin/dashboard/bookstore")}
                onBuyAirtime={() => nav("/admin/dashboard/users")}
                onBuyData={() => nav("/admin/dashboard/reports")}
                onNotifications={() => nav("/admin/dashboard/notifications")}
                onSupport={() => {}}
                onSettings={() => nav("/admin/dashboard/settings")}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:sticky xl:top-6 h-fit">
          <RecentTransactions
            onViewAll={() => nav("/admin/dashboard/transactions")}
            onViewItem={(id) =>
              nav(`/admin/dashboard/transaction/${id}`)
            }
          />
        </div>
      </div>
    </div>
  );
}