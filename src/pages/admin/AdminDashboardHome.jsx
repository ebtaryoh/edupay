import { useNavigate } from "react-router-dom";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import Topbar from "../../components/dashboard/Topbar";

function ProgressArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="#8D7CFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AdminSummaryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.25l2.42 2.01 3.11-.12.86 2.99 2.61 1.69-1.1 2.91.87 2.99-2.64 1.58-.94 2.97-3.1-.21L12 20.75l-2.42-2.01-3.11.12-.86-2.99-2.61-1.69 1.1-2.91-.87-2.99 2.64-1.58.94-2.97 3.1.21L12 3.25z"
        stroke="white"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 12.15l2.05 2.05 5-5"
        stroke="white"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminDashboardHome() {
  const nav = useNavigate();

  const adminProfile = {
    firstName: "Uti",
    lastName: "Chike",
    fullName: "Uti Chike",
    matricNo: "CSC/2021/001",
    institutionName: "UNILAG",
    office: "Admin Office - College of Medicine",
    completion: 22,
    initials: "UC",
  };

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7">
      <Topbar title="Admin Dashboard" />

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_460px] 2xl:grid-cols-[minmax(0,1fr)_520px] 2xl:gap-8">
        <div className="min-w-0 space-y-6 xl:space-y-7">
          <section className="overflow-hidden rounded-[24px] border border-[#DCD8FF] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(44,20,221,0.04)] sm:rounded-[26px] sm:px-5 sm:py-5 lg:rounded-[28px]">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="mx-auto h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-[4px] border-[#F3E4D7] bg-[radial-gradient(circle_at_50%_30%,#D5B08D_0%,#A86E45_62%,#8A5636_100%)] sm:mx-0 sm:h-[96px] sm:w-[96px] lg:h-[106px] lg:w-[106px]">
                <div className="flex h-full w-full items-center justify-center text-[30px] font-bold text-white/95 sm:text-[32px] lg:text-[34px]">
                  {adminProfile.initials}
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-0 text-center sm:pt-2 sm:text-left">
                <p className="text-[14px] font-semibold text-[#F4A13A] sm:text-[15px]">
                  Welcome Back,
                </p>

                <h2 className="mt-1 truncate text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[#2F2AD9] sm:text-[28px] md:text-[30px] xl:text-[32px]">
                  {adminProfile.fullName}
                </h2>

                <p className="mt-1 text-[13px] leading-[1.4] text-[#3E3E76] sm:text-[14px]">
                  {adminProfile.institutionName} - {adminProfile.matricNo}
                  <br />
                  {adminProfile.office}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#E7EDF6]">
                <div
                  className="h-full rounded-full bg-[#22D04F] transition-all duration-500"
                  style={{ width: `${adminProfile.completion}%` }}
                />
              </div>

              <button
                type="button"
                onClick={() => nav("/admin/dashboard/account")}
                className="inline-flex cursor-pointer shrink-0 items-center gap-1 text-[11px] font-medium text-[#7E6EFF] transition hover:underline sm:text-[12px]"
              >
                Complete Profile
                <ProgressArrow />
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-5 rounded-[22px] bg-[#2E1FD9] px-4 py-4 text-white shadow-[0_20px_50px_rgba(44,20,221,0.18)] sm:px-5 sm:py-5 lg:rounded-[24px] lg:px-6 lg:py-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[17px] bg-[#6556F5] sm:h-[62px] sm:w-[62px] sm:rounded-[18px]">
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#FFB130]" />
                <AdminSummaryIcon />
              </div>

              <div className="min-w-0">
                <p className="text-[14px] text-white/90 sm:text-[15px]">
                  Today’s Total Transaction
                </p>
                <h3 className="mt-1 text-[30px] font-extrabold leading-none tracking-[-0.02em] sm:text-[34px] xl:text-[36px]">
                  ₦345,000
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => nav("/admin/dashboard/transactions")}
              className="inline-flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[16px] bg-[#4735F5] px-6 text-[15px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition hover:brightness-110 active:scale-[0.99] sm:w-auto sm:rounded-[18px] sm:px-7 sm:text-[16px]"
            >
              See All
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </section>

          <section className="rounded-[24px] border border-[#DCD8FF] bg-white px-4 py-5 shadow-[0_10px_30px_rgba(44,20,221,0.04)] sm:px-5 lg:rounded-[28px]">
            <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#2B2772] sm:text-[18px]">
              Quick Actions
            </h3>

            <div className="mt-5">
              <QuickActions
                variant="admin"
                onPaymentCentre={() => nav("/admin/dashboard/payment-centre")}
                onHistory={() => nav("/admin/dashboard/history")}
                onBookstore={() => nav("/admin/dashboard/bookstore")}
                onUsers={() => nav("/admin/dashboard/users")}
                onReports={() => nav("/admin/dashboard/reports")}
                onNotifications={() => nav("/admin/dashboard/notifications")}
                onSupport={() => nav("/admin/dashboard/support")}
                onSettings={() => nav("/admin/dashboard/settings")}
              />
            </div>
          </section>
        </div>

        <div className="min-w-0 xl:sticky xl:top-7 xl:h-fit">
          <RecentTransactions
            onViewAll={() => nav("/admin/dashboard/transactions")}
            onViewItem={(id) => nav(`/admin/dashboard/transaction/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}