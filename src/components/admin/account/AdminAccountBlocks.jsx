import { useNavigate } from "react-router-dom";

export function AccountSectionLabel({ children }) {
  return <p className="text-[13px] font-medium text-[#9A9CAC]">{children}</p>;
}

export function AccountValue({ children, className = "" }) {
  return (
    <p className={["text-[17px] font-medium text-[#161B32]", className].join(" ")}>
      {children}
    </p>
  );
}

export function LightField({ label, value, trailing = null, tall = false }) {
  return (
    <div
      className={[
        "rounded-[18px] bg-[#F4F4FB] px-6",
        tall ? "min-h-[190px] py-5" : "min-h-[84px] py-5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <AccountSectionLabel>{label}</AccountSectionLabel>
          <AccountValue className="mt-2">{value}</AccountValue>
        </div>
        {trailing}
      </div>
    </div>
  );
}

export function GhostSaveButton({ children = "Save", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[84px] w-full max-w-[460px] cursor-pointer rounded-full bg-[#E8E7FB] text-[22px] font-semibold text-[#4132E6] transition hover:brightness-[0.99]"
    >
      {children}
    </button>
  );
}

export function PurpleSaveButton({ children = "Save", onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-[66px] min-w-[190px] cursor-pointer items-center justify-center rounded-full bg-[#3A22E9] px-10 text-[18px] font-semibold text-white shadow-[0_10px_24px_rgba(58,34,233,0.24)] transition hover:brightness-110",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function SettingsLinkRow({ title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start justify-between gap-5 rounded-[18px] px-0 py-1 text-left transition hover:opacity-90"
    >
      <div>
        <h3 className="text-[18px] font-semibold text-[#161B32]">{title}</h3>
        {subtitle ? <p className="mt-1 text-[15px] text-[#7F8398]">{subtitle}</p> : null}
      </div>

      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 6l6 6-6 6"
          stroke="#171C34"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function SimpleToggle({ checked = false, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={[
        "relative h-[34px] w-[60px] cursor-pointer rounded-full transition",
        checked ? "bg-[#5370F8]" : "bg-[#E4E4E4]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-[26px] w-[26px] rounded-full bg-white transition-all",
          checked ? "left-[30px]" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

export function RoundedSearch({ placeholder = "Search" }) {
  return (
    <div className="flex h-[62px] items-center gap-4 rounded-[18px] border border-[#ECECF4] bg-white px-5">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="6.7" stroke="#B5C2FF" strokeWidth="2.2" />
        <path d="M16 16l3.8 3.8" stroke="#B5C2FF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <input
        placeholder={placeholder}
        className="w-full bg-transparent text-[17px] text-[#232743] outline-none placeholder:text-[#A6A9B8]"
      />
    </div>
  );
}

export function ProfileHero({
  name,
  subline1,
  subline2,
  photo,
  showCamera = false,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
      <div className="flex items-center gap-6">
        <div className="relative h-[160px] w-[160px] shrink-0 overflow-hidden rounded-full border-[6px] border-[#E6A0A8] bg-[linear-gradient(180deg,#A8D8EB_0%,#B9E0EF_100%)]">
          {photo ? (
            <img src={photo} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[44px] font-bold text-[#1B2237]">
              {name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </div>
          )}

          {showCamera ? (
            <button
              type="button"
              className="absolute bottom-[10px] right-[2px] flex h-[48px] w-[48px] items-center justify-center rounded-full border-[4px] border-white bg-[#7A73F0] text-white shadow-lg"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 7l1.2-2h5.6L16 7h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2z" fill="white" fillOpacity="0.95" />
                <circle cx="12" cy="12.5" r="3.2" fill="#7A73F0" />
              </svg>
            </button>
          ) : null}
        </div>

        <div className="min-w-0">
          <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.02em] text-white xl:text-[38px]">
            {name}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-white">{subline1}</p>
          <p className="text-[15px] leading-7 text-white">{subline2}</p>
        </div>
      </div>

      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex h-[58px] min-w-[390px] max-w-[390px] items-center justify-center rounded-full bg-[#3A22E9] px-8 text-[16px] font-semibold text-white shadow-[0_14px_24px_rgba(58,34,233,0.25)] transition hover:brightness-110"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export function AccountCardShell({ children, className = "" }) {
  return (
    <div className={["rounded-[42px] bg-[#DCD8F7] px-8 py-8", className].join(" ")}>{children}</div>
  );
}

export function AccountTabs({ tabs, activeKey }) {
  const nav = useNavigate();

  return (
    <div className="flex items-center gap-7 text-[17px]">
      {tabs.map((tab, index) => (
        <div key={tab.key} className="flex items-center gap-7">
          <button
            type="button"
            onClick={() => nav(tab.to)}
            className={[
              "cursor-pointer font-medium transition",
              activeKey === tab.key ? "text-[#171C33]" : "text-[#8B8D9C]",
            ].join(" ")}
          >
            {tab.label}
          </button>
          {index !== tabs.length - 1 ? <span className="text-[#C6C7D2]">|</span> : null}
        </div>
      ))}
    </div>
  );
}

export function TinyVerifiedBadge() {
  return (
    <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#3D2BE9] text-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
