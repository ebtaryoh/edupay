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

function BadgeFeeIcon() {
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

function QuickPayArt() {
  return (
    <div className="relative mx-auto h-[150px] w-full max-w-[310px]">
      <div className="absolute right-[7px] top-[8px] rotate-[-15deg]">
        <svg width="118" height="86" viewBox="0 0 124 90" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="capA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1B0D9F" />
              <stop offset="100%" stopColor="#7E66FF" />
            </linearGradient>
          </defs>
          <path d="M13 33L63 10l48 21-48 22L13 33z" fill="url(#capA)" />
          <path
            d="M41 45v15c0 10 14 17 23 17s23-7 23-17V45"
            stroke="#C9BBFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M111 33v23"
            stroke="#C9BBFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="111" cy="60" r="5" fill="#E7DEFF" />
        </svg>
      </div>

      <div className="absolute right-[8px] top-[12px]">
        <svg width="90" height="50" viewBox="0 0 92 52" fill="none" aria-hidden="true">
          <path d="M8 42L74 10l10 5-66 27L8 42z" fill="#BFB4FF" opacity="0.9" />
          <path
            d="M8 42l14-1 62-26"
            stroke="#EEE9FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="absolute bottom-[-6px] right-[8px]">
        <svg width="122" height="122" viewBox="0 0 126 126" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="cupA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D8D1FF" />
              <stop offset="100%" stopColor="#8F79FF" />
            </linearGradient>
          </defs>
          <rect x="48" y="96" width="28" height="10" rx="4" fill="#1B0D9F" />
          <rect x="38" y="106" width="48" height="12" rx="5" fill="#A79AFF" />
          <path
            d="M40 28h46v24c0 18-11 31-23 31S40 70 40 52V28z"
            fill="url(#cupA)"
          />
          <path
            d="M86 38h13c0 14-5 24-17 24"
            stroke="#DAD3FF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 38H27c0 14 5 24 17 24"
            stroke="#DAD3FF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M63 40v19"
            stroke="#5C45F6"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M56 47h14"
            stroke="#5C45F6"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const nav = useNavigate();

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7">
      <Topbar />

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_460px] 2xl:grid-cols-[minmax(0,1fr)_520px] 2xl:gap-8">
        <div className="min-w-0 space-y-6 xl:space-y-7">
          <section className="overflow-hidden rounded-[24px] border border-[#DCD8FF] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(44,20,221,0.04)] sm:rounded-[26px] sm:px-5 sm:py-5 lg:rounded-[28px]">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="mx-auto h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-[4px] border-[#F3E4D7] bg-[radial-gradient(circle_at_50%_30%,#D5B08D_0%,#A86E45_62%,#8A5636_100%)] sm:mx-0 sm:h-[96px] sm:w-[96px] lg:h-[106px] lg:w-[106px]">
                <div className="flex h-full w-full items-center justify-center text-[30px] font-bold text-white/95 sm:text-[32px] lg:text-[34px]">
                  AS
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-0 text-center sm:pt-2 sm:text-left">
                <p className="text-[14px] font-semibold text-[#F4A13A] sm:text-[15px]">
                  Welcome Back,
                </p>

                <h2 className="mt-1 truncate text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[#2F2AD9] sm:text-[28px] md:text-[30px] xl:text-[32px]">
                  Ayotunde K. Samuel
                </h2>

                <p className="mt-1 text-[13px] leading-[1.4] text-[#3E3E76] sm:text-[14px]">
                  UNILAG - CSC/2021/001
                  <br />
                  Computer Science - 300 Level
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#E7EDF6]">
                <div className="h-full w-[22%] rounded-full bg-[#22D04F]" />
              </div>

              <button
                type="button"
                className="inline-flex cursor-pointer shrink-0 items-center gap-1 text-[11px] font-medium text-[#7E6EFF] sm:text-[12px]"
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
                <BadgeFeeIcon />
              </div>

              <div className="min-w-0">
                <p className="text-[14px] text-white/90 sm:text-[15px]">
                  You have <span className="font-extrabold text-[#FF6A6A]">3</span>{" "}
                  Outstanding Fees
                </p>
                <h3 className="mt-1 text-[30px] font-extrabold leading-none tracking-[-0.02em] sm:text-[34px] xl:text-[36px]">
                  ₦345,000
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => nav("/dashboard/payments")}
              className="inline-flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[16px] bg-[#4735F5] px-6 text-[15px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition hover:brightness-110 active:scale-[0.99] sm:w-auto sm:px-7 sm:text-[16px] sm:rounded-[18px]"
            >
              Pay Now
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
                onPayFees={() => nav("/dashboard/payments")}
                onHistory={() => nav("/dashboard/transactions")}
                onBookstore={() => nav("/dashboard/bookstore")}
                onBuyAirtime={() => nav("/dashboard/payments/airtime")}
                onBuyData={() => nav("/dashboard/payments/data")}
                onNotifications={() => nav("/dashboard/notifications")}
                onSupport={() => {}}
                onSettings={() => nav("/dashboard/account/settings")}
              />
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_35%_18%,#5B43FF_0%,#371FE1_45%,#2913C8_100%)] px-5 py-5 text-white shadow-[0_20px_50px_rgba(44,20,221,0.18)] sm:px-6 sm:py-6">
            <div className="relative z-10 grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_210px] lg:grid-cols-[minmax(0,1fr)_230px] xl:grid-cols-[minmax(0,1fr)_140px]">
              <div className="min-w-0">
                <h3 className="text-[28px] font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-[34px] lg:text-[40px] xl:text-[28px]">
                  Quick Pay
                </h3>

                <p className="mt-3 max-w-[350px] text-[12px] leading-5 text-white/88 sm:text-[13px] sm:leading-6">
                  Make a quick payment. Pay for someone else
                  <br />
                  and do much more...
                </p>

                <button
                  type="button"
                  onClick={() => nav("/quickpay")}
                  className="mt-4 inline-flex h-[40px] cursor-pointer items-center justify-center rounded-[12px] bg-white px-6 text-[12px] font-semibold text-[#2E1FD9] transition hover:brightness-95 active:scale-[0.99] sm:px-7 sm:text-[13px]"
                >
                  Pay Now
                </button>
              </div>

              <div className="hidden min-w-0 md:block">
                <QuickPayArt />
              </div>
            </div>

            <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-70px] left-[35%] h-36 w-36 rounded-full bg-[#7B67FF]/30 blur-3xl" />
          </section>
        </div>

        <div className="min-w-0 xl:sticky xl:top-7 xl:h-fit">
          <RecentTransactions
            onViewAll={() => nav("/dashboard/transactions")}
            onViewItem={(id) => nav(`/dashboard/transaction/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}