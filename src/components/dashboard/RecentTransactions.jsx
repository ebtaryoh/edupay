import Button from "../ui/Button";

const seed = Array.from({ length: 9 }).map((_, i) => ({
  id: `t${i + 1}`,
  title: "School of Medicine Tuition Fee -",
  subtitle: "2025/2026 Academic Session",
  date: "23rd September 2025 at 12:03 AM",
  amount: "₦86,890.00",
}));

export default function RecentTransactions({ onViewAll, onViewItem }) {
  return (
    <section className="rounded-[28px] bg-[#2C14DD] text-white p-6 md:p-7">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-[18px] font-semibold">Recent Transactions</h3>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm text-white/85 hover:text-white flex items-center gap-2"
        >
          View All
          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>

      <div className="mt-5 rounded-[18px] border border-[#39B6FF]/70 p-2">
        <div className="max-h-[690px] overflow-auto pr-1">
          {seed.map((t) => (
            <div
              key={t.id}
              className="py-4 px-3 border-b border-dashed border-[#39B6FF]/60 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[13px] md:text-sm font-medium leading-snug">
                    {t.title}
                    <br />
                    {t.subtitle}
                  </p>
                  <p className="text-[11px] md:text-xs text-[#FF6B6B] mt-2">
                    {t.date}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <div className="bg-[#EDEFFF] text-[#14143A] rounded-[14px] px-4 py-2 font-semibold text-sm">
                    {t.amount}
                  </div>

                  <Button
                    className="h-10 px-5 rounded-full bg-[#1F10B7] hover:brightness-110"
                    onClick={() => onViewItem?.(t.id)}
                  >
                    View
                    <span className="ml-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
