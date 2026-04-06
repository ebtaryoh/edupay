import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { billingApi } from "../../api/fees";
import { parseJwt } from "../../api/http";
import Input from "../../components/ui/Input";
import { Loader2, AlertCircle } from "lucide-react";

function FeeRow({ title, amount, onPay }) {
  return (
    <div className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-semibold text-[#14143A] leading-snug">{title}</p>
        <p className="text-xs text-[#9AA0B4] mt-1">Due 23rd September 2025</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="bg-[#EDEFFF] text-[#14143A] rounded-[14px] px-4 py-2 font-semibold text-sm">
          {amount}
        </div>
        <button
          onClick={onPay}
          className="h-11 px-5 rounded-full bg-[#2C14DD] text-white font-semibold flex items-center gap-2 transition hover:brightness-110"
        >
          Pay <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
}

export default function TuitionHealthcare() {
  const nav = useNavigate();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadBills() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          nav("/login/student");
          return;
        }

        const decoded = parseJwt(token);
        const studentId = decoded?.uid || decoded?.id || decoded?.userId;

        if (!studentId) throw new Error("Student identity not found.");

        const response = await billingApi.getBillDetails(studentId);
        const data = response?.data || response || [];
        setBills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FAILED TO LOAD BILL DETAILS:", err);
        setError("Failed to load tuition/healthcare bills.");
      } finally {
        setLoading(false);
      }
    }
    loadBills();
  }, [nav]);

  const filteredBills = bills.filter(b => 
    (b.feeName || b.title || b.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-10">
      <div>
        <div className="max-w-[520px]">
          <Input 
            placeholder="Search fees" 
            className="bg-[#F6F7FF]" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <h3 className="mt-8 text-[#14143A] font-semibold text-[18px]">
          Tuition/Healthcare
        </h3>

        <div className="mt-4 space-y-4 max-w-[720px]">
          {loading ? (
             <div className="flex items-center gap-3 text-[#9AA0B4] py-10">
                <Loader2 className="animate-spin" />
                <span>Loading bills...</span>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          ) : filteredBills.length === 0 ? (
            <div className="py-10 text-center bg-[#F6F7FF] rounded-2xl text-[#9AA0B4]">
              <p>No outstanding bills found.</p>
            </div>
          ) : (
            filteredBills.map((bill, index) => (
              <FeeRow
                key={bill.id || index}
                title={bill.feeName || bill.title || bill.description || "School Fee"}
                amount={`₦${(bill.amount || bill.amountDue || 0).toLocaleString()}`}
                onPay={() => nav("/dashboard/checkout", { state: { bill } })}
              />
            ))
          )}
        </div>
      </div>

      {/* right image-style panel */}
      <div className="hidden xl:block">
        <div className="h-[760px] rounded-[40px] bg-black/10 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-b from-black/10 to-black/30" />
        </div>
      </div>
    </div>
  );
}

