import { useState } from "react";
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
      <span className="text-[#9AA0B4] text-xl">›</span>
    </div>
  );
}

export default function AirtimePurchase() {
  const [network, setNetwork] = useState("");

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-10">
      <div>
        <div className="space-y-4 max-w-[540px]">
          <LeftTab
            active
            title="Airtime Recharge"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20 21a8 8 0 1 0-16 0" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" stroke="#2C14DD" strokeWidth="2" />
              </svg>
            }
          />
          <LeftTab
            title="Buy Data"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 7h14" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round" />
              </svg>
            }
          />
        </div>

        <h3 className="mt-10 font-semibold text-[#14143A]">Recent Top-ups</h3>

        <div className="mt-4 space-y-4 max-w-[540px]">
          {["MTN Airtime", "Glo Data", "Airtel Data"].map((t, i) => (
            <div key={i} className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#14143A]">{t}</p>
                <p className="text-xs text-[#9AA0B4] mt-1">23rd September 2025 at 12:03 AM</p>
              </div>
              <div className="font-semibold text-[#14143A]">₦4,000.00</div>
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
              <span className="text-[#9AA0B4] text-xl">˅</span>
            </button>
          </div>

          <div>
            <p className="text-xs text-[#9AA0B4] font-semibold mb-2">Phone Number</p>
            <Input placeholder="Enter Phone Number" />
          </div>

          <div>
            <p className="text-xs text-[#9AA0B4] font-semibold mb-2">Amount</p>
            <Input placeholder="Enter Amount" />
          </div>

          <button className="mt-6 h-12 px-10 rounded-full bg-[#2C14DD] text-white font-semibold w-fit">
            Buy Airtime
          </button>
        </div>
      </div>
    </div>
  );
}
