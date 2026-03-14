function NoticeRow({ title, desc }) {
  return (
    <div className="w-full flex items-center justify-between px-5 py-5 rounded-[22px] bg-white border border-[#E7E9FF]">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-[#2C14DD]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M20 21a8 8 0 1 0-16 0" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" stroke="#2C14DD" strokeWidth="2"/>
          </svg>
        </div>
        <div>
          <p className="font-semibold text-[#14143A]">{title}</p>
          <p className="text-sm text-[#6B6B85] mt-1">{desc}</p>
        </div>
      </div>
      <span className="text-[#9AA0B4] text-xl">›</span>
    </div>
  );
}

export default function Notifications() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="space-y-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <NoticeRow
            key={i}
            title={i % 2 === 0 ? "New Updates Available!" : "Secure your account!"}
            desc={
              i % 2 === 0
                ? "EDUPay just got an upgrade. Download now!!!"
                : "Be careful. Secure your account."
            }
          />
        ))}
      </div>

      <div className="space-y-5 hidden xl:block">
        {Array.from({ length: 7 }).map((_, i) => (
          <NoticeRow
            key={i}
            title={i % 2 === 0 ? "New Updates Available!" : "Secure your account!"}
            desc={
              i % 2 === 0
                ? "EDUPay just got an upgrade. Download now!!!"
                : "Be careful. Secure your account."
            }
          />
        ))}
      </div>
    </div>
  );
}
