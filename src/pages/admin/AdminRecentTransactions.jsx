import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/dashboard/Topbar";
import sideImage from "../../assets/admin/Recent Transactions-image.png";

const transactions = [
  {
    id: "at1",
    group: "Today",
    title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦86,890.00",
  },
  {
    id: "at2",
    group: "Today",
    title: "Non-Medical Students Tuition Fee - 2025/2026 Academic...",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦66,390.00",
  },
  {
    id: "at3",
    group: "Last Week",
    title: "Healthcare Fee - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦11,890.00",
  },
  {
    id: "at4",
    group: "Last Week",
    title: "Library Fee - New Registration - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦13,890.00",
  },
  {
    id: "at5",
    group: "Last Week",
    title: "Library Fee Renewal - 2025/2026 Academic Session",
    date: "23rd September 2025 at 12:03 AM",
    amount: "₦7,890.00",
  },
  {
    id: "at6",
    group: "Last Week",
    title: "Postgraduate Screening Fee - 2025/2026 Academic Session",
    date: "20th September 2025 at 02:11 PM",
    amount: "₦18,500.00",
  },
  {
    id: "at7",
    group: "Last Week",
    title: "Transcript Processing Fee - 2025/2026 Academic Session",
    date: "18th September 2025 at 09:27 AM",
    amount: "₦24,500.00",
  },
];

function SearchIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7.2" stroke="#A9B7F7" strokeWidth="2.6" />
      <path
        d="M16.4 16.4L20 20"
        stroke="#A9B7F7"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronRight({ color = "white" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TransactionRow({ item, onView }) {
  return (
    <div className="rounded-[18px] bg-[#F1F0FB] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="max-w-[430px] text-[16px] font-medium leading-[1.45] text-[#15172E]">
            {item.title}
          </p>

          <p className="mt-1 text-[12px] font-medium text-[#7E7F8E]">
            {item.date}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 self-start lg:self-center">
          <div className="inline-flex h-[42px] min-w-[112px] items-center justify-center rounded-[14px] bg-[#E3E0F8] px-4 text-[15px] font-bold text-[#22232E]">
            {item.amount}
          </div>

          <button
            type="button"
            onClick={() => onView(item.id)}
            className="inline-flex h-[42px] cursor-pointer items-center gap-2 rounded-[14px] bg-[#3420F0] px-5 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
          >
            View
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminRecentTransactions() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return transactions;

    return transactions.filter((item) =>
      [item.title, item.date, item.amount, item.group].some((value) =>
        value.toLowerCase().includes(q)
      )
    );
  }, [search]);

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);

  const groupedTransactions = useMemo(() => {
    return visibleTransactions.reduce((acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    }, {});
  }, [visibleTransactions]);

  const hasMore = visibleCount < filteredTransactions.length;

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7">
      <Topbar title="Transactions" />

      <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_500px] 2xl:grid-cols-[minmax(0,1fr)_540px]">
        <div className="min-w-0">
          <div className="max-w-[515px]">
            <div className="flex h-[76px] items-center gap-4 rounded-[28px] border border-[#E9E8F7] bg-[#F9F8FF] px-6 shadow-[0_10px_30px_rgba(20,20,58,0.03)]">
              <SearchIcon />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(5);
                }}
                placeholder="Search transactions"
                className="w-full bg-transparent text-[16px] text-[#202338] outline-none placeholder:text-[#9C9CAA]"
              />
            </div>
          </div>

          <div className="mt-9 space-y-12">
            {Object.entries(groupedTransactions).map(([group, items]) => (
              <section key={group}>
                <h2 className="text-[18px] font-semibold text-[#9A9EAF]">
                  {group}
                </h2>

                <div className="mt-5 space-y-3.5">
                  {items.map((item) => (
                    <TransactionRow
                      key={item.id}
                      item={item}
                      onView={(id) =>
                        nav(`/admin/dashboard/payments/transaction/${id}`)
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {visibleTransactions.length === 0 ? (
            <div className="mt-10 rounded-[20px] border border-dashed border-[#DADCEC] bg-white px-6 py-10 text-center text-[#7E849A]">
              No transactions found.
            </div>
          ) : null}

          {hasMore ? (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="inline-flex h-[54px] min-w-[168px] cursor-pointer items-center justify-center rounded-full bg-[#3420F0] px-8 text-[18px] font-semibold text-white shadow-[0_16px_32px_rgba(52,32,240,0.18)] transition hover:brightness-110 active:scale-[0.99]"
              >
                Load More...
              </button>
            </div>
          ) : null}
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-7 h-[860px] overflow-hidden rounded-l-[56px] rounded-r-[12px] bg-[#EDECF6] shadow-[0_12px_32px_rgba(20,20,58,0.04)]">
            <img
              src={sideImage}
              alt="Students"
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
}