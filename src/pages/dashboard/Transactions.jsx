import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../api/dashboard";
import { studentApi } from "../../api/student";
import Input from "../../components/ui/Input";
import txImage from "../../assets/dashboard/dashboard-transaction-detail.jpg";

function TxRow({ title, amount, date, status, onView }) {
  const statusColor =
    status === "Successful" || status === "successful"
      ? "text-green-600"
      : status === "Failed" || status === "failed"
      ? "text-red-500"
      : "text-[#9AA0B4]";

  return (
    <div className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-semibold text-[#14143A] leading-snug">{title}</p>
        <p className="text-xs text-[#9AA0B4] mt-1">{date || "—"}</p>
        {status && (
          <p className={`text-xs font-semibold mt-0.5 ${statusColor}`}>{status}</p>
        )}
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
  const studentId = localStorage.getItem("studentId") || "";

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    async function fetchTransactions() {
      try {
        setLoading(true);

        // Step 1: get MatricNo from profile
        const profileRes = await studentApi.getStudentProfile(studentId).catch(() => null);
        const matricNo =
          profileRes?.data?.matricNo ||
          profileRes?.matricNo ||
          localStorage.getItem("matricNo") ||
          "";

        // Step 2: pull this student's payment history
        const response = await dashboardApi.transactions(
          matricNo ? { MatricNo: matricNo, PageSize: 100 } : {}
        );
        const data = response?.data || response || [];
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("FAILED TO FETCH TRANSACTIONS LIST:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [studentId]);

  const filteredTxs = transactions.filter((t) =>
    (t.paymentPurpose || t.title || t.description || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  function formatAmount(tx) {
    const val = tx.amountPaid ?? tx.amount ?? tx.totalAmount ?? 0;
    return `₦${Number(val).toLocaleString()}`;
  }

  function formatDate(tx) {
    const raw = tx.createdAt || tx.datePaid || tx.date;
    if (!raw) return "—";
    const d = new Date(raw);
    return isNaN(d)
      ? raw
      : d.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  }

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

        <h3 className="mt-8 text-[#9AA0B4] font-semibold">
          Payment History
          {!loading && (
            <span className="ml-2 text-[#2C14DD]">({filteredTxs.length})</span>
          )}
        </h3>

        <div className="mt-4 space-y-4 max-w-[760px]">
          {loading ? (
            <p className="text-sm text-gray-500 py-10 text-center">Loading your transactions...</p>
          ) : filteredTxs.length === 0 ? (
            <p className="text-sm text-gray-500 py-10 text-center">
              {searchTerm ? "No results match your search." : "No transactions recorded yet."}
            </p>
          ) : (
            filteredTxs.map((tx) => (
              <TxRow
                key={tx.id || tx.paymentId}
                title={tx.paymentPurpose || tx.title || tx.description || "System Payment"}
                amount={formatAmount(tx)}
                date={formatDate(tx)}
                status={tx.paymentStatus || tx.status}
                onView={() => nav(`/dashboard/transaction/${tx.id || tx.paymentId}`)}
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
        <div className="h-[860px] rounded-[60px] overflow-hidden bg-black/5 shadow-sm">
          <img 
            src={txImage} 
            alt="Students walking on campus" 
            className="h-full w-full object-cover grayscale" 
          />
        </div>
      </div>
    </div>
  );
}
