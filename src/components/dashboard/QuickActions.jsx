function ActionCard({ label, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left"
    >
      <div className="w-full rounded-2xl bg-[#2C14DD] p-5 flex items-center justify-center relative">
        {/* orange dot like in UI */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F5A524]" />
        <div className="text-white">{icon}</div>
      </div>
      <div className="mt-2 text-center text-sm font-medium text-[#2C14DD]">
        {label}
      </div>
    </button>
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
  variant = "dashboard", // "dashboard" = 8 items, "payments" = 2 items
}) {
  if (variant === "payments") {
    return (
      <div className="grid grid-cols-2 gap-6 max-w-[360px]">
        <ActionCard
          label="Overdue"
          onClick={onPayFees}
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8v5l3 2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
            </svg>
          }
        />
        <ActionCard
          label="History"
          onClick={onHistory}
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4v6h6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 20v-6h-6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 9A8 8 0 0 0 6.3 5.3L4 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 15a8 8 0 0 0 13.7 3.7L20 14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
      <ActionCard
        label="Pay Fees"
        onClick={onPayFees}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="6" width="16" height="12" rx="2" stroke="white" strokeWidth="2" />
            <path d="M7 10h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
      />
      <ActionCard
        label="History"
        onClick={onHistory}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 4v6h6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 12a8 8 0 0 0-14-5l-2 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 8v5l3 2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        }
      />
      <ActionCard
        label="Bookstore"
        onClick={onBookstore}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M6 4h13v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="white" strokeWidth="2"/>
            <path d="M8 8h7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />
      <ActionCard
        label="Buy Airtime"
        onClick={onBuyAirtime}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M7 7h10v10H7z" stroke="white" strokeWidth="2"/>
            <path d="M10 10h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />

      <ActionCard
        label="Buy Data"
        onClick={onBuyData}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
            <path d="M3 12h18" stroke="white" strokeWidth="2"/>
            <path d="M12 3a15 15 0 0 1 0 18" stroke="white" strokeWidth="2"/>
          </svg>
        }
      />
      <ActionCard
        label="Notifications"
        onClick={onNotifications}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />
      <ActionCard
        label="Support"
        onClick={onSupport}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" stroke="white" strokeWidth="2"/>
          </svg>
        }
      />
      <ActionCard
        label="Settings"
        onClick={onSettings}
        icon={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M19.4 15a7.9 7.9 0 0 0 .1-6l-2 .5-1.4-1.4.5-2a7.9 7.9 0 0 0-6-.1l-.5 2-1.4 1.4-2-.5a7.9 7.9 0 0 0-.1 6l2-.5 1.4 1.4-.5 2a7.9 7.9 0 0 0 6 .1l.5-2 1.4-1.4 2 .5z"
              stroke="white"
              strokeWidth="1.6"
              opacity="0.95"
            />
          </svg>
        }
      />
    </div>
  );
}
