import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../api/dashboard";
import Input from "../../components/ui/Input";

function TxRow({ title, amount, date, onView }) {
  return (
    <div className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-semibold text-[#14143A] leading-snug">{title}</p>
        <p className="text-xs text-[#9AA0B4] mt-1">{date || "Today at 12:00 AM"}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="bg-[#EDEFFF] text-[#14143A] rounded-[14px] px-4 py-2 font-semibold text-sm">
          {amount}
        </div>
        <button
          onClick={onView}
          className="h-11 px-5 rounded-full bg-[#2C14DD] text-white font-semibold flex items-center gap-2 transition hover:opacity-90 active:scale-95"
        >
          View <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
}

export default function Transactions() {
  const nav = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await dashboardApi.transactions();
        const data = response?.data || response || [];
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("FAILED TO FETCH TRANSACTIONS LIST:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const filteredTxs = transactions.filter(t => 
    (t.title || t.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-10">
      <div>
        <div className="max-w-[520px]">
          <Input 
            placeholder="Search transactions" 
            className="bg-[#F6F7FF]" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h3 className="mt-8 text-[#9AA0B4] font-semibold">Payment History</h3>

        <div className="mt-4 space-y-4 max-w-[760px]">
          {loading ? (
            <p className="text-sm text-gray-500">Loading transactions...</p>
          ) : filteredTxs.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions recorded.</p>
          ) : (
            filteredTxs.map((tx) => (
              <TxRow
                key={tx.id}
                title={tx.title || tx.description || "System Payment"}
                amount={tx.amount || `₦${tx.totalAmount || 0}`}
                date={tx.date || tx.createdAt}
                onView={() => nav(`/dashboard/transaction/${tx.id}`)}
              />
            ))
          )}
        </div>

        {filteredTxs.length > 0 && (
          <button className="mt-10 h-12 px-12 rounded-full bg-[#2C14DD] text-white font-semibold transition hover:opacity-90 active:scale-95">
            Load More...
          </button>
        )}
      </div>

      <div className="hidden xl:block">
        <div className="h-[860px] rounded-[60px] bg-black/10 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-b from-[#2C14DD]/10 to-[#2C14DD]/30" />
        </div>
      </div>
    </div>
  );
}
