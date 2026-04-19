import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Users, Home, Library, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import Input from "../../components/ui/Input";
import QuickActions from "../../components/dashboard/QuickActions";
import { billingApi } from "../../api/fees";
import { parseJwt } from "../../api/http";

function CategoryItem({ icon, title, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center justify-between px-5 py-5 rounded-[20px] border",
        active ? "bg-[#F1F2FF] border-[#F1F2FF]" : "bg-white border-[#E7E9FF]",
        "hover:bg-[#F1F2FF] transition",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-[#2C14DD]">
          {icon}
        </div>
        <div className="text-left">
          <p className="text-[16px] font-semibold text-[#14143A]">{title}</p>
        </div>
      </div>

      <span className="text-[#9AA0B4]">
        <ChevronRight size={20} strokeWidth={2.5} />
      </span>
    </button>
  );
}

export default function Payments() {
  const nav = useNavigate();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debtStatus, setDebtStatus] = useState(null);

  useEffect(() => {
    async function loadBilling() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          nav("/login/student");
          return;
        }

        const decoded = parseJwt(token);
        const studentId = decoded?.uid || decoded?.id || decoded?.userId;

        if (!studentId) {
          throw new Error("Student identity not found in session.");
        }

        const [debtRes, billsRes] = await Promise.all([
          billingApi.getStudentDebt(studentId),
          billingApi.getBillDetails(studentId)
        ]);

        setDebtStatus(debtRes?.data || debtRes);
        setBills(billsRes?.data || billsRes || []);

      } catch (err) {
        console.error("PAYMENTS LOAD FAILED:", err);
        const status = err?.response?.status;
        const msg = err?.response?.data?.message || err?.message || "";

        // Gracefully handle "no bills" or 404 errors
        if (
          status === 404 || 
          msg.toLowerCase().includes("not found") || 
          msg.toLowerCase().includes("no bill") || 
          msg.toLowerCase().includes("no fee structure")
        ) {
           setBills([]);
           if (!debtStatus) setDebtStatus({ totalDebt: 0 });
        } else {
          setError(msg || "Failed to load billing information.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadBilling();
  }, [nav]);

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amt || 0);
  };

  return (
    <div className="min-w-0 xl:min-w-[1440px] grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12">
      <div>
        <div className="max-w-[520px]">
          <Input placeholder="Search fees" className="bg-[#F6F7FF]" />
        </div>

        <h3 className="mt-10 text-[#9AA0B4] font-medium">Category</h3>

        <div className="mt-4 space-y-4">
          <CategoryItem
            title="Tuition/Healthcare"
            onClick={() => nav("/dashboard/payments/category/tuition-healthcare")}
            icon={<Activity size={22} strokeWidth={2.5} />}
          />

          <CategoryItem
            title="SUG Dues"
            onClick={() => nav("/dashboard/payments/category/sug-dues")}
            icon={<Users size={22} strokeWidth={2.5} />}
          />

          <CategoryItem
            title="Accomodation/Hostel Fees"
            onClick={() => nav("/dashboard/payments/category/accommodation-hostel")}
            icon={<Home size={22} strokeWidth={2.5} />}
          />

          <CategoryItem
            title="Departmental Fees"
            onClick={() => nav("/dashboard/payments/category/departmental-fees")}
            icon={<Library size={22} strokeWidth={2.5} />}
          />
        </div>

        <h3 className="mt-10 text-[#9AA0B4] font-medium">Quick Actions</h3>

        <div className="mt-4 bg-[#F6F7FF] rounded-[22px] p-6">
          <QuickActions
            variant="payments"
            onPayFees={() => nav("/dashboard/payments/overdue")}
            onHistory={() => nav("/dashboard/transactions")}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-semibold text-[#14143A]">
              Outstanding Dues
            </h3>
            {debtStatus && (
                <div className="text-xs font-bold px-3 py-1 bg-red-50 text-red-600 rounded-full">
                    Balance: {formatCurrency(debtStatus.totalDebt || debtStatus.balance || 0)}
                </div>
            )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9AA0B4]">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p>Fetching your bills...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-[22px] flex items-center gap-4 border border-red-100">
            <AlertCircle />
            <p className="font-medium text-sm">{error}</p>
          </div>
        ) : bills.length === 0 ? (
          <div className="bg-[#F6F7FF] text-[#9AA0B4] p-10 rounded-[22px] text-center border border-dashed border-gray-200">
            <p>You have no outstanding bills at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4 min-w-0 flex-1">
            {bills.map((bill, i) => (
              <div
                key={bill.id || i}
                className="bg-[#F1F2FF] rounded-[18px] px-6 py-5 flex items-center justify-between gap-4 transition hover:bg-[#EEF0FF]"
              >
                <div className="min-w-0">
                  <p className="font-bold text-[#14143A] leading-tight text-lg">
                    {bill.feeName || bill.description || "Unidentified Fee"}
                  </p>
                  <p className="text-xs font-medium text-[#9AA0B4] mt-1.5 uppercase tracking-wide">
                    {bill.dueDate ? `Due ${new Date(bill.dueDate).toLocaleDateString()}` : "Due immediately"}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="bg-white text-[#14143A] rounded-[14px] px-5 py-2.5 font-bold text-base shadow-sm">
                    {formatCurrency(bill.amount || bill.totalAmount)}
                  </div>
                  <button
                    onClick={() => nav(`/dashboard/checkout`, { state: { bill } })}
                    className="h-12 px-6 rounded-full bg-[#2C14DD] text-white font-bold flex items-center gap-2 transition hover:brightness-110 shadow-lg shadow-blue-200"
                  >
                    Pay <ChevronRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


