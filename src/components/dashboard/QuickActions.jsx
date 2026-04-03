import {
  Wallet,
  History as HistoryIconLucide,
  ShoppingCart,
  Users as UsersIconLucide,
  Globe,
  Bell,
  Phone,
  Settings
} from "lucide-react";

function ActionShell({ label, onClick, icon, showDot = false }) {
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

      <span className="mt-3 text-center text-[13px] font-medium leading-5 text-[#3A3793] sm:text-[14px]">
        {label}
      </span>
    </button>
  );
}

function PaymentCentreIcon() {
  return <Wallet size={28} strokeWidth={2} color="white" />;
}

function HistoryIcon() {
  return <HistoryIconLucide size={28} strokeWidth={2} color="white" />;
}

function CartIcon() {
  return <ShoppingCart size={28} strokeWidth={2} color="white" />;
}

function UsersIcon() {
  return <UsersIconLucide size={28} strokeWidth={2} color="white" />;
}

function GlobeIcon() {
  return <Globe size={28} strokeWidth={2} color="white" />;
}

function BellIcon() {
  return <Bell size={28} strokeWidth={2} color="white" />;
}

function SupportIcon() {
  return <Phone size={28} strokeWidth={2.5} color="white" />;
}

function SettingsIcon() {
  return <Settings size={28} strokeWidth={2} color="white" />;
}

export default function QuickActions({
  onPayFees,
  onHistory,
  onBookstore,
  onBuyAirtime,
  onBuyData,
  onNotifications,
  onSupport,
  onSettings,
  onPaymentCentre,
  onUsers,
  onReports,
  variant = "dashboard",
}) {
  if (variant === "payments") {
    return (
      <div className="grid grid-cols-2 gap-8">
        <ActionShell label="Overdue" onClick={onPayFees} icon={<PaymentCentreIcon />} showDot />
        <ActionShell label="History" onClick={onHistory} icon={<HistoryIcon />} showDot />
      </div>
    );
  }

  if (variant === "admin") {
    return (
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        <ActionShell label="Payment Centre" onClick={onPaymentCentre} icon={<PaymentCentreIcon />} showDot />
        <ActionShell label="History" onClick={onHistory} icon={<HistoryIcon />} showDot />
        <ActionShell label="Bookstore" onClick={onBookstore} icon={<CartIcon />} showDot />
        <ActionShell label="Users" onClick={onUsers} icon={<UsersIcon />} />
        <ActionShell label="Reports" onClick={onReports} icon={<GlobeIcon />} />
        <ActionShell label="Notifications" onClick={onNotifications} icon={<BellIcon />} showDot />
        <ActionShell label="Support" onClick={onSupport} icon={<SupportIcon />} />
        <ActionShell label="Settings" onClick={onSettings} icon={<SettingsIcon />} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      <ActionShell label="Pay Fees" onClick={onPayFees} icon={<PaymentCentreIcon />} showDot />
      <ActionShell label="History" onClick={onHistory} icon={<HistoryIcon />} showDot />
      <ActionShell label="Bookstore" onClick={onBookstore} icon={<CartIcon />} showDot />
      <ActionShell label="Buy Airtime" onClick={onBuyAirtime} icon={<UsersIcon />} />
      <ActionShell label="Buy Data" onClick={onBuyData} icon={<GlobeIcon />} />
      <ActionShell label="Notifications" onClick={onNotifications} icon={<BellIcon />} showDot />
      <ActionShell label="Support" onClick={onSupport} icon={<SupportIcon />} />
      <ActionShell label="Settings" onClick={onSettings} icon={<SettingsIcon />} />
    </div>
  );
}