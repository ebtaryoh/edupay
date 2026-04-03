import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight as ChevronRightLucide } from "lucide-react";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";
import { feesApi } from "../../api/fees";

function SearchIcon() {
  return <Search size={20} color="#9EB0F4" strokeWidth={2.5} />;
}

function ChevronRight({ color = "white" }) {
  return <ChevronRightLucide size={18} color={color} strokeWidth={2.5} />;
}

function FeeRow({ item, onManage }) {
  return (
    <div className="min-w-0 xl:min-w-[1440px] space-y-5 overflow-x-auto sm:space-y-6 xl:space-y-7 pb-10">
      <Topbar title="Payments" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 2xl:gap-20">
        <p className="truncate text-[16px] font-medium text-[#31313B]">
          {item.title}
        </p>
        <p className="mt-2 text-[15px] text-[#FF7A1A]">
          Expiring: {item.expiry}
        </p>
      </div>

      <div className="inline-flex h-[48px] min-w-[96px] items-center justify-center rounded-[14px] bg-[#E8E5FB] px-4 text-[14px] font-semibold text-[#1E1E24]">
        {item.amount}
      </div>

      <button
        type="button"
        onClick={onManage}
        className="inline-flex h-[48px] cursor-pointer items-center gap-1 rounded-[14px] bg-[#3827ED] px-5 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
      >
        Manage
        <ChevronRight />
      </button>
    </div>
  );
}

export default function AdminViewFees() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFees() {
      try {
        const res = await feesApi.getAllFeeStructures();
        const data = res?.data || res || [];
        setFees(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FAILED TO LOAD FEES:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFees();
  }, []);

  const filtered = fees.filter(f =>
    (f.feeName || f.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminPaymentsShell title="Fees" activeKey="manage-fees">
      <div className="w-full max-w-[760px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex h-[60px] w-full max-w-[390px] items-center gap-3 rounded-full border border-[#E9ECF8] bg-[#FAFBFF] px-5">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fees by amount, date, department..."
              className="w-full bg-transparent text-[15px] text-[#2B3674] outline-none placeholder:text-[#A2A8BE]"
            />
          </div>

          <button
            type="button"
            onClick={() => nav("/admin/dashboard/payments/fees/create")}
            className="inline-flex h-[60px] cursor-pointer items-center justify-center rounded-[18px] bg-[#0E012F] px-8 text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
          >
            + Create Fee
          </button>
        </div>

        <div className="mt-10 space-y-12">
          {loading ? (
            <p className="text-sm text-gray-400">Loading fee structures...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-400">No fee structures found.</p>
          ) : (
            <div>
              <h3 className="text-[22px] font-medium text-[#A1A7BC]">All Fees</h3>
              <div className="mt-4 space-y-4">
                {filtered.map((fee) => (
                  <FeeRow
                    key={fee.id}
                    item={{
                      id: fee.id,
                      title: fee.feeName || fee.title || "Fee",
                      expiry: fee.endDate || fee.expiryDate || "N/A",
                      amount: fee.amount ? `₦${Number(fee.amount).toLocaleString()}` : fee.amountText || "N/A",
                    }}
                    onManage={() => nav(`/admin/dashboard/payments/fees/${fee.id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminPaymentsShell>
  );
}