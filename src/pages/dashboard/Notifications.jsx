import { Bell, ChevronRight } from "lucide-react";

function NoticeRow({ title, desc }) {
  return (
    <div className="w-full flex items-center justify-between px-5 py-5 rounded-[22px] bg-white border border-[#E7E9FF]">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-[#2C14DD]">
          <Bell size={26} strokeWidth={2} />
        </div>
        <div>
          <p className="font-semibold text-[#14143A]">{title}</p>
          <p className="text-sm text-[#6B6B85] mt-1">{desc}</p>
        </div>
      </div>
      <ChevronRight size={22} color="#9AA0B4" strokeWidth={2.5} />
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
