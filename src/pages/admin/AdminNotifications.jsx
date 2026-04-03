import { useNavigate } from "react-router-dom";
import {
  ChevronRight as ChevronRightLucide,
  BadgeCheck,
  User,
  CreditCard,
  History,
  ShoppingCart,
  Users,
  FileText,
  Bell,
  Phone,
  Settings
} from "lucide-react";
import Topbar from "../../components/dashboard/Topbar";

function ProgressArrow() {
  return <ChevronRightLucide size={16} color="#8D7CFF" strokeWidth={2.5} />;
}

function BadgeFeeIcon() {
  return <BadgeCheck size={28} color="white" strokeWidth={2} />;
}

function NotificationRowIcon() {
  return (
    <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[20px] bg-[#E9E7FF]">
      <User size={30} color="#6A63E8" strokeWidth={2.5} />
    </div>
  );
}

function ChevronRight({ color = "#D1D1D8" }) {
  return <ChevronRightLucide size={24} color={color} strokeWidth={2.5} />;
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
  return <CreditCard size={31} color="white" strokeWidth={2} />;
}

function HistoryIcon() {
  return <History size={31} color="white" strokeWidth={2} />;
}

function CartIcon() {
  return <ShoppingCart size={31} color="white" strokeWidth={2} />;
}

function UsersIcon() {
  return <Users size={31} color="white" strokeWidth={2} />;
}

function ReportsIcon() {
  return <FileText size={31} color="white" strokeWidth={2} />;
}

function BellIcon() {
  return <Bell size={31} color="white" strokeWidth={2} />;
}

function SupportIcon() {
  return <Phone size={31} color="white" strokeWidth={2.5} />;
}

function SettingsIcon() {
  return <Settings size={31} color="white" strokeWidth={2} />;
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
            onClick={() => nav("/admin/dashboard/payments")}
            icon={<PaymentCentreIcon />}
            showDot
          />
          <AdminQuickActionCard
            label="History"
            onClick={() => nav("/admin/dashboard/payments/transactions")}
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
            onClick={() => nav("/admin/dashboard/payments/reports")}
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
            onClick={() => nav("/admin/dashboard/account/contact-admin")}
            icon={<SupportIcon />}
          />
          <AdminQuickActionCard
            label="Settings"
            onClick={() => nav("/admin/dashboard/account/settings")}
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