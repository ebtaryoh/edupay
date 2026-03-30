import { useMemo, useState } from "react";
import AdminSettlementShell from "../../components/admin/AdminPaymentsShell";
import kudaLogo from "../../assets/admin/banks/kuda-bank.png";

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="#9EB0F4" strokeWidth="2.2" />
      <path d="M16 16l4 4" stroke="#9EB0F4" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="#2A2D45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HistoryRow({ logo, bank, amount }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <img src={logo} alt={bank} className="h-[42px] w-[42px] rounded-[10px] object-cover" />
        <span className="text-[18px] font-medium text-[#2F3556]">{bank}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[18px] font-semibold text-[#22242D]">{amount}</span>
        <ChevronDown />
      </div>
    </button>
  );
}

export default function AdminSettlementHistory() {
  const [search, setSearch] = useState("");

  const groups = useMemo(
    () => [
      {
        date: "23rd December 2025",
        items: [{ bank: "Kuda Bank", amount: "₦12,000,000.00", logo: kudaLogo }],
      },
      {
        date: "13th October 2025",
        items: [
          { bank: "Kuda Bank", amount: "₦3,000,000.00", logo: kudaLogo },
          { bank: "Kuda Bank", amount: "₦40,000,000.00", logo: kudaLogo },
        ],
      },
    ],
    []
  );

  return (
    <AdminSettlementShell title="Settlement History">
      <div className="min-w-0 pt-1 xl:pl-8 2xl:pl-10">
        <div className="w-full max-w-[520px]">
          <div className="flex h-[72px] items-center gap-4 rounded-[28px] bg-[#F4F3FB] px-6">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search settlements"
              className="w-full bg-transparent text-[17px] text-[#2B3674] outline-none placeholder:text-[#A2A8BE]"
            />
          </div>

          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <div key={group.date}>
                <h3 className="text-[18px] font-medium text-[#9FA6BB]">{group.date}</h3>

                <div className="mt-8 space-y-10">
                  {group.items.map((item, index) => (
                    <HistoryRow
                      key={`${group.date}-${index}`}
                      logo={item.logo}
                      bank={item.bank}
                      amount={item.amount}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminSettlementShell>
  );
}