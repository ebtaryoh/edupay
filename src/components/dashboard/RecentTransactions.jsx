const transactions = [
  {
    id: "t1",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "t2",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "t3",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "t4",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "t5",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "t6",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "t7",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "t8",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
];

function ChevronRight() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RecentTransactions({ onViewAll, onViewItem }) {
  return (
    <section className="min-w-0 overflow-hidden rounded-[24px] bg-[#2F20D9] text-white shadow-[0_18px_50px_rgba(47,32,217,0.18)] lg:rounded-[28px]">
      <div className="flex items-center justify-between gap-3 px-4 py-6 sm:px-5 sm:py-7 lg:px-7 lg:py-8 2xl:px-8">
        <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-white sm:text-[18px]">
          Recent Transactions
        </h3>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex cursor-pointer shrink-0 items-center gap-1 text-[13px] font-medium text-white/95 transition hover:opacity-90 sm:text-[15px]"
        >
          View All
          <span className="text-white/80">
            <ChevronRight />
          </span>
        </button>
      </div>

      <div className="px-4 pb-6 sm:px-5 sm:pb-7 lg:px-7 lg:pb-8 2xl:px-8">
        <div className="max-h-[520px] overflow-y-auto pr-1 sm:max-h-[560px]">
          <div className="space-y-5 sm:space-y-6 lg:space-y-7">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="flex min-w-0 flex-col gap-3 border-b border-white/10 pb-5 last:border-b-0 last:pb-0 sm:gap-4 lg:flex-row lg:items-start lg:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="max-w-none text-[13px] font-medium leading-6 text-white sm:text-[14px] sm:leading-7 lg:max-w-[270px] xl:max-w-[300px] 2xl:max-w-[330px]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[11px] font-medium leading-5 text-[#F2A33A] sm:text-[12px]">
                    {item.date}
                  </p>
                </div>

                <div className="flex min-w-0 flex-wrap items-center gap-2.5 sm:gap-3 lg:shrink-0 lg:flex-nowrap">
                  <div className="inline-flex h-[36px] min-w-[96px] items-center justify-center rounded-[11px] bg-white px-3 text-[13px] font-bold text-[#2B2B2B] shadow-[0_8px_20px_rgba(0,0,0,0.08)] sm:h-[38px] sm:min-w-[100px] sm:px-4 sm:text-[15px]">
                    {item.amount}
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewItem?.(item.id)}
                    className="inline-flex h-[38px] cursor-pointer items-center gap-1 rounded-[11px] bg-[#4635F3] px-3 text-[13px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99] sm:h-[40px] sm:px-4 sm:text-[14px]"
                  >
                    View
                    <ChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}