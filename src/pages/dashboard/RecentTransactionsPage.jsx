import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";

function TxRow({ title, amount, onView }) {
  return (
    <div className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-semibold text-[#14143A] leading-snug">{title}</p>
        <p className="text-xs text-[#9AA0B4] mt-1">23rd September 2025 at 12:03 AM</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="bg-[#EDEFFF] text-[#14143A] rounded-[14px] px-4 py-2 font-semibold text-sm">
          {amount}
        </div>
        <button
          onClick={onView}
          className="h-11 px-5 rounded-full bg-[#2C14DD] text-white font-semibold flex items-center gap-2"
        >
          View <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
}

export default function RecentTransactionsPage() {
  const nav = useNavigate();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-10">
      <div>
        <div className="max-w-[520px]">
          <Input placeholder="Search transactions" className="bg-[#F6F7FF]" />
        </div>

        <h3 className="mt-8 text-[#9AA0B4] font-semibold">Today</h3>

        <div className="mt-4 space-y-4 max-w-[760px]">
          <TxRow
            title="School of Medicine Tuition Fee - 2025/2026 Academic Session"
            amount="₦86,890.00"
            onView={() => nav("/dashboard/transactions/t1")}
          />
          <TxRow
            title="Non-Medical Students Tuition Fee - 2025/2026 Academic..."
            amount="₦66,390.00"
            onView={() => nav("/dashboard/transactions/t2")}
          />
        </div>

        <h3 className="mt-10 text-[#9AA0B4] font-semibold">Last Week</h3>

        <div className="mt-4 space-y-4 max-w-[760px]">
          <TxRow
            title="Healthcare Fee - 2025/2026 Academic Session"
            amount="₦11,890.00"
            onView={() => nav("/dashboard/transactions/t3")}
          />
          <TxRow
            title="Library Fee - New Registration - 2025/2026 Academic Session"
            amount="₦13,890.00"
            onView={() => nav("/dashboard/transactions/t4")}
          />
          <TxRow
            title="Library Fee Renewal - 2025/2026 Academic Session"
            amount="₦7,890.00"
            onView={() => nav("/dashboard/transactions/t5")}
          />
        </div>

        <button className="mt-10 h-12 px-12 rounded-full bg-[#2C14DD] text-white font-semibold">
          Load More...
        </button>
      </div>

      {/* right big photo panel like UI */}
      <div className="hidden xl:block">
        <div className="h-[860px] rounded-[60px] bg-black/10 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-b from-black/10 to-black/30" />
        </div>
      </div>
    </div>
  );
}
