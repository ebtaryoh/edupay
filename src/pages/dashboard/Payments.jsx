import { useNavigate } from "react-router-dom";
import { Activity, Users, Home, Library, ChevronRight } from "lucide-react";
import Input from "../../components/ui/Input";
import QuickActions from "../../components/dashboard/QuickActions";


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
            onClick={() => nav("/dashboard/payments/tuition-healthcare")}
            active
            icon={<Activity size={22} strokeWidth={2.5} />}
          />

          <CategoryItem
            title="SUG Dues"
            onClick={() => alert("SUG Dues payments are coming soon.")}
            icon={<Users size={22} strokeWidth={2.5} />}
          />

          <CategoryItem
            title="Accomodation/Hostel Fees"
            onClick={() => alert("Accommodation/Hostel fee payments are coming soon.")}
            icon={<Home size={22} strokeWidth={2.5} />}
          />

          <CategoryItem
            title="Departmental Fees"
            onClick={() => alert("Departmental fee payments are coming soon.")}
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

      {/* RIGHT: list preview area like image */}
      <div className="space-y-5">
        <h3 className="text-[18px] font-semibold text-[#14143A]">
          Tuition/Healthcare
        </h3>

        <div className="space-y-4 min-w-0 flex-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-[#14143A] leading-snug">
                  {i % 2 === 0
                    ? "School of Medicine Tuition Fee - 2025/2026 Academic Session"
                    : "Healthcare Fee - 2025/2026 Academic Session"}
                </p>
                <p className="text-xs text-[#9AA0B4] mt-1">Due 23rd September 2025</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-[#EDEFFF] text-[#14143A] rounded-[14px] px-4 py-2 font-semibold text-sm">
                  {i % 2 === 0 ? "₦86,890.00" : "₦11,890.00"}
                </div>
                <button
                  onClick={() => nav("/dashboard/payments/tuition-healthcare")}
                  className="h-11 px-5 rounded-full bg-[#2C14DD] text-white font-semibold flex items-center gap-2"
                >
                  Pay <ChevronRight size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
