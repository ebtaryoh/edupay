import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Globe, ChevronRight, ChevronDown } from "lucide-react";
import Input from "../../components/ui/Input";

function LeftTab({ active, title, icon }) {
  return (
    <div className={["w-full flex items-center justify-between px-5 py-5 rounded-[20px]",
      active ? "bg-[#F1F2FF]" : "bg-white", "border border-[#E7E9FF]"].join(" ")}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-[#2C14DD]">
          {icon}
        </div>
        <div className="font-semibold text-[#14143A]">{title}</div>
      </div>
      <span className="text-[#9AA0B4]">
        <ChevronRight size={18} strokeWidth={2.5} />
      </span>
    </div>
  );
}

export default function DataPurchase() {
  const nav = useNavigate();
  const [network, setNetwork] = useState("");

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-10">
      <div>
        <div className="space-y-4 max-w-[540px]">
          <div className="cursor-pointer" onClick={() => nav("/dashboard/payments/airtime")}>
            <LeftTab
              title="Airtime Recharge"
              icon={<Smartphone size={22} strokeWidth={2.5} />}
            />
          </div>
          <div className="cursor-pointer">
            <LeftTab
              active
              title="Buy Data"
              icon={<Globe size={22} strokeWidth={2.5} />}
            />
          </div>
        </div>

        <h3 className="mt-10 font-semibold text-[#14143A]">Recent Data Purchases</h3>

        <div className="mt-4 space-y-4 max-w-[540px]">
          {["Glo Data", "MTN Data", "Airtel Data"].map((t, i) => (
            <div key={i} className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#14143A]">{t}</p>
                <p className="text-xs text-[#9AA0B4] mt-1">23rd September 2025 at 12:03 AM</p>
              </div>
              <div className="font-semibold text-[#14143A]">₦2,000.00</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[560px]">
        <div className="space-y-5">
          <div className="rounded-[22px] bg-[#F3F4FF] border border-[#E7E9FF] px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9AA0B4] font-semibold">Select a Network</p>
              <p className="text-[#9AA0B4] mt-1">Select Mobile Operator</p>
            </div>
            <button
              type="button"
              onClick={() => setNetwork(network ? "" : "MTN")}
              className="w-12 h-12 rounded-full bg-white border border-[#E7E9FF] flex items-center justify-center"
            >
              <ChevronDown size={20} color="#9AA0B4" strokeWidth={2.5} />
            </button>
          </div>

          <div>
            <p className="text-xs text-[#9AA0B4] font-semibold mb-2">Phone Number</p>
            <Input placeholder="Enter Phone Number" />
          </div>

          <div>
            <p className="text-xs text-[#9AA0B4] font-semibold mb-2">Data Bundle</p>
            <Input placeholder="Enter Amount or Select Bundle" />
          </div>

          <button className="mt-6 h-12 px-10 rounded-full bg-[#2C14DD] text-white font-semibold w-fit">
            Buy Data
          </button>
        </div>
      </div>
    </div>
  );
}
