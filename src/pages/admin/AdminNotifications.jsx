import { useNavigate } from "react-router-dom";
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

function NotificationRowIcon() {
  return (
    <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[20px] bg-[#E9E7FF]">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" fill="#6A63E8" />
        <path
          d="M6.6 17.3c.9-2.5 2.8-3.9 5.4-3.9s4.5 1.4 5.4 3.9"
          fill="#6A63E8"
        />
      </svg>
    </div>
  );
}

function ChevronRight({ color = "#D1D1D8" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function AdminQuickActionCard({ label, onClick, icon, showDot = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer flex-col items-center text-center"
    >
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-[18px] bg-[#2F2AD9] shadow-[0_14px_26px_rgba(47,42,217,0.18)] transition group-hover:translate-y-[-2px]">
        {showDot ? (
          <span className="absolute -right-[2px] -top-[2px] h-[11px] w-[11px] rounded-full bg-[#F4A13A]" />
        ) : null}
        {icon}
      </div>

      <span className="mt-3 text-[14px] font-medium text-[#3A3793]">
        {label}
      </span>
    </button>
  );
}

function PaymentCentreIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12.5" rx="2.5" stroke="white" strokeWidth="1.9" />
      <path d="M6.5 10h10.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M7 14.5h3.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7h10" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M5 12h8" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M5 17h6" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M16 8v8" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M13.5 13.5L16 16l2.5-2.5" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 6h2l1.6 8.2h8.8l1.7-6.1H8.3" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10.1" cy="18.2" r="1.2" fill="white" />
      <circle cx="16.7" cy="18.2" r="1.2" fill="white" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.2 11.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4z" stroke="white" strokeWidth="1.9" />
      <path d="M15.7 10.4a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2z" stroke="white" strokeWidth="1.9" />
      <path d="M4.8 18.2c.7-2.4 2.2-3.7 4.4-3.7 2.2 0 3.7 1.3 4.4 3.7" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M14.1 17.7c.5-1.6 1.6-2.5 3.2-2.5 1.4 0 2.4.7 3 2.1" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="white" strokeWidth="1.9" />
      <path d="M3.8 12h16.4" stroke="white" strokeWidth="1.9" />
      <path d="M12 3.8c2.4 2.4 3.6 5.1 3.6 8.2s-1.2 5.8-3.6 8.2c-2.4-2.4-3.6-5.1-3.6-8.2s1.2-5.8 3.6-8.2z" stroke="white" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 15H6c1.1-1.2 1.8-3 1.8-5.1 0-2.8 1.9-4.9 4.2-4.9s4.2 2.1 4.2 4.9c0 2.1.7 3.9 1.8 5.1z" stroke="white" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M10.2 18.2a2 2 0 0 0 3.6 0" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.8" stroke="white" strokeWidth="1.9" />
      <path d="M9 10.3h.01M15 10.3h.01" stroke="white" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M9.2 14c.7.8 1.7 1.2 2.8 1.2s2.1-.4 2.8-1.2" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" stroke="white" strokeWidth="1.9" />
      <path
        d="M19.2 13.2l1.1-.8-1-2.9-1.4.1a6.6 6.6 0 0 0-1.3-1.3l.1-1.4-2.9-1-1 .9a7 7 0 0 0-1.8 0l-1-.9-2.9 1 .1 1.4c-.5.4-.9.8-1.3 1.3l-1.4-.1-1 2.9 1.1.8a7 7 0 0 0 0 1.8l-1.1.8 1 2.9 1.4-.1c.4.5.8.9 1.3 1.3l-.1 1.4 2.9 1 1-.9a7 7 0 0 0 1.8 0l1 .9 2.9-1-.1-1.4c.5-.4.9-.8 1.3-1.3l1.4.1 1-2.9-1.1-.8a7 7 0 0 0 0-1.8z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AdminOverviewPane() {
  const nav = useNavigate();
  const adminPhoto = "";

  return (
    <div className="min-w-0 space-y-6 xl:space-y-7">
      <section className="overflow-hidden rounded-[24px] border border-[#DCD8FF] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(44,20,221,0.04)] sm:rounded-[26px] sm:px-5 sm:py-5 lg:rounded-[28px]">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="mx-auto h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-[4px] border-[#F3E4D7] bg-[radial-gradient(circle_at_50%_30%,#D5B08D_0%,#A86E45_62%,#8A5636_100%)] sm:mx-0 sm:h-[96px] sm:w-[96px] lg:h-[106px] lg:w-[106px]">
            {adminPhoto ? (
              <img
                src={adminPhoto}
                alt="Admin profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[30px] font-bold text-white/95 sm:text-[32px] lg:text-[34px]">
                UC
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-0 text-center sm:pt-2 sm:text-left">
            <p className="text-[14px] font-semibold text-[#F4A13A] sm:text-[15px]">
              Welcome Back,
            </p>

            <h2 className="mt-1 truncate text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[#2F2AD9] sm:text-[28px] md:text-[30px] xl:text-[32px]">
              Uti Chike
            </h2>

            <p className="mt-1 text-[13px] leading-[1.4] text-[#3E3E76] sm:text-[14px]">
              UNILAG - CSC/2021/001
              <br />
              Admin Office - College of Medicine
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#E7EDF6]">
            <div className="h-full w-[22%] rounded-full bg-[#22D04F]" />
          </div>

          <button
            type="button"
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
            <BadgeFeeIcon />
          </div>

          <div className="min-w-0">
            <p className="text-[14px] text-white/90 sm:text-[15px]">
              Today&apos;s Total Transaction
            </p>
            <h3 className="mt-1 text-[30px] font-extrabold leading-none tracking-[-0.02em] sm:text-[34px] xl:text-[36px]">
              ₦345,000
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => nav("/admin/dashboard/payments/transactions")}
          className="inline-flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[16px] bg-[#4735F5] px-6 text-[15px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition hover:brightness-110 active:scale-[0.99] sm:w-auto sm:rounded-[18px] sm:px-7 sm:text-[16px]"
        >
          See All
          <ChevronRight color="white" />
        </button>
      </section>

      <section className="rounded-[24px] border border-[#DCD8FF] bg-white px-4 py-5 shadow-[0_10px_30px_rgba(44,20,221,0.04)] sm:px-5 lg:rounded-[28px]">
        <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#2B2772] sm:text-[18px]">
          Quick Actions
        </h3>

        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          <AdminQuickActionCard
            label="Payment Centre"
            onClick={() => nav("/admin/dashboard/payment-centre")}
            icon={<PaymentCentreIcon />}
            showDot
          />
          <AdminQuickActionCard
            label="History"
            onClick={() => nav("/admin/dashboard/history")}
            icon={<HistoryIcon />}
            showDot
          />
          <AdminQuickActionCard
            label="Bookstore"
            onClick={() => nav("/admin/dashboard/bookstore")}
            icon={<CartIcon />}
            showDot
          />
          <AdminQuickActionCard
            label="Users"
            onClick={() => nav("/admin/dashboard/users")}
            icon={<UsersIcon />}
          />
          <AdminQuickActionCard
            label="Reports"
            onClick={() => nav("/admin/dashboard/reports")}
            icon={<ReportsIcon />}
          />
          <AdminQuickActionCard
            label="Notifications"
            onClick={() => nav("/admin/dashboard/notifications")}
            icon={<BellIcon />}
            showDot
          />
          <AdminQuickActionCard
            label="Support"
            onClick={() => nav("/admin/dashboard/support")}
            icon={<SupportIcon />}
          />
          <AdminQuickActionCard
            label="Settings"
            onClick={() => nav("/admin/dashboard/settings")}
            icon={<SettingsIcon />}
          />
        </div>
      </section>
    </div>
  );
}

const notifications = [
  {
    id: 1,
    title: "New Updates Available!",
    message: "EDUPay just got an upgrade. Download now!!!",
  },
  {
    id: 2,
    title: "Secure your account!",
    message: "Be careful. Secure your account.",
  },
  {
    id: 3,
    title: "New Updates Available!",
    message: "EDUPay just got an upgrade. Download now!!!",
  },
  {
    id: 4,
    title: "Secure your account!",
    message: "Be careful. Secure your account.",
  },
  {
    id: 5,
    title: "New Updates Available!",
    message: "EDUPay just got an upgrade. Download now!!!",
  },
  {
    id: 6,
    title: "Secure your account!",
    message: "Be careful. Secure your account.",
  },
  {
    id: 7,
    title: "New Updates Available!",
    message: "EDUPay just got an upgrade. Download now!!!",
  },
  {
    id: 8,
    title: "Secure your account!",
    message: "Be careful. Secure your account.",
  },
];

function NotificationsList() {
  return (
    <section className="min-w-0">
      <div className="space-y-5">
        {notifications.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex w-full cursor-pointer items-center gap-4 rounded-[22px] bg-transparent px-2 py-2 text-left transition hover:bg-white/50"
          >
            <NotificationRowIcon />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[18px] font-semibold leading-tight text-[#1B1C34]">
                {item.title}
              </h3>
              <p className="mt-1 text-[14px] leading-[1.35] text-[#3E3E53]">
                {item.message}
              </p>
            </div>

            <div className="shrink-0">
              <ChevronRight />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function AdminNotifications() {
  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7">
      <Topbar
        title="Notifications"
        showNotification
        showSearch
        notificationPath="/admin/dashboard/notifications"
        onSearchClick={() => {}}
      />

      <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_430px] 2xl:grid-cols-[minmax(0,1fr)_470px] 2xl:gap-10">
        <AdminOverviewPane />
        <NotificationsList />
      </div>
    </div>
  );
}