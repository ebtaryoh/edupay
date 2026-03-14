import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";

function Row({ title, amount, onPay }) {
  return (
    <div className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-semibold text-[#14143A]">{title}</p>
        <p className="text-xs text-[#9AA0B4] mt-1">
          Due 23rd September 2025.{" "}
          <span className="text-[#FF3B3B] font-semibold">23 Days Overdue</span>
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="bg-[#EDEFFF] text-[#14143A] rounded-[14px] px-4 py-2 font-semibold text-sm">
          {amount}
        </div>
        <button
          onClick={onPay}
          className="h-11 px-5 rounded-full bg-[#2C14DD] text-white font-semibold flex items-center gap-2"
        >
          Pay <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
}

export default function Overdue() {
  const nav = useNavigate();
  return (
    <div>
      <div className="max-w-[520px]">
        <Input placeholder="Search fees" className="bg-[#F6F7FF]" />
      </div>

      <div className="mt-8 space-y-4 max-w-[760px]">
        <Row
          title="School of Medicine Tuition Fee - 2025/2026 Academic Session"
          amount="₦86,890.00"
          onPay={() => nav("/dashboard/checkout/paystack")}
        />
        <Row
          title="Healthcare Fee - 2025/2026 Academic Session"
          amount="₦11,890.00"
          onPay={() => nav("/dashboard/checkout/paystack")}
        />
        <Row
          title="School of Medicine Tuition Fee - 2025/2026 Academic Session"
          amount="₦86,890.00"
          onPay={() => nav("/dashboard/checkout/paystack")}
        />
      </div>
    </div>
  );
}
