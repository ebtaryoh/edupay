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

      <span className="mt-3 text-[14px] font-medium text-[#3A3793]">
        {label}
      </span>
    </button>
  );
}

function PayFeesIcon() {
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

function AirtimeIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.5 7.5a2.5 2.5 0 0 1 2.5-2.5h8a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5H11l-3.7 2.8V15H8a2.5 2.5 0 0 1-2.5-2.5v-5z" stroke="white" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M9.2 9.6h5.6" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
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

export default function QuickActions({
  onPayFees,
  onHistory,
  onBookstore,
  onBuyAirtime,
  onBuyData,
  onNotifications,
  onSupport,
  onSettings,
  variant = "dashboard",
}) {
  if (variant === "payments") {
    return (
      <div className="grid grid-cols-2 gap-8">
        <ActionShell label="Overdue" onClick={onPayFees} icon={<PayFeesIcon />} showDot />
        <ActionShell label="History" onClick={onHistory} icon={<HistoryIcon />} showDot />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      <ActionShell label="Pay Fees" onClick={onPayFees} icon={<PayFeesIcon />} showDot />
      <ActionShell label="History" onClick={onHistory} icon={<HistoryIcon />} showDot />
      <ActionShell label="Bookstore" onClick={onBookstore} icon={<CartIcon />} showDot />
      <ActionShell label="Buy Airtime" onClick={onBuyAirtime} icon={<AirtimeIcon />} />
      <ActionShell label="Buy Data" onClick={onBuyData} icon={<GlobeIcon />} />
      <ActionShell label="Notifications" onClick={onNotifications} icon={<BellIcon />} showDot />
      <ActionShell label="Support" onClick={onSupport} icon={<SupportIcon />} />
      <ActionShell label="Settings" onClick={onSettings} icon={<SettingsIcon />} />
    </div>
  );
}