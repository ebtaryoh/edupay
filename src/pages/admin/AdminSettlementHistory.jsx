import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import AdminSettlementShell from "./AdminSettlementShell";
import kudaLogo from "../../assets/admin/banks/kuda-bank.png";

function HistoryRow({ logo, bank, amount }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center justify-between group transition-colors hover:bg-black/5 p-2 rounded-xl -m-2"
    >
      <div className="flex items-center gap-4">
        <img src={logo} alt={bank} className="h-[42px] w-[42px] rounded-[10px] object-cover" />
        <span className="text-[18px] font-medium text-[#2F3556]">{bank}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[18px] font-semibold text-[#22242D]">{amount}</span>
        <ChevronDown size={18} color="#2A2D45" />
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
          <div className="flex h-[72px] items-center gap-4 rounded-[28px] bg-[#F4F3FB] px-6 focus-within:ring-2 ring-[#3827ED]/20 transition-all">
            <Search size={22} color="#9EB0F4" strokeWidth={2.5} />
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