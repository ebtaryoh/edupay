import { useState } from "react";
import AccountShell from "../../../components/dashboard/AccountShell";

function FAQCard({ withArt = false }) {
  return (
    <div className="bg-[#F2F4FF] rounded-[24px] p-6 md:p-8 flex items-center justify-between gap-6">
      <div className="min-w-0">
        <h3 className="text-[22px] md:text-[24px] font-extrabold text-[#14143A]">
          How to make Payment?
        </h3>

        <p className="mt-3 text-[14px] md:text-[15px] text-[#3E4560] max-w-[430px] leading-relaxed">
          Making payment on EDUPay is easy as a breeze. Payments are completed in 3-steps in ...
        </p>

        <button type="button" className="mt-5 text-[14px] font-semibold text-[#2C14DD]">
          See More
        </button>
      </div>

      {/* Right illustration block (image has a small artwork on first card) */}
      {withArt ? (
        <div className="hidden md:flex w-[120px] h-[90px] rounded-2xl bg-white/70 items-center justify-center">
          {/* replace this with your asset image if you have it */}
          <div className="w-16 h-16 rounded-xl bg-white" />
        </div>
      ) : (
        <div className="hidden md:block w-[120px] h-[90px]" />
      )}
    </div>
  );
}

export default function FAQs() {
  const [tab, setTab] = useState("payments"); // payments | receipts | bookstore

  const tabBtn = (key, label) => (
    <button
      type="button"
      onClick={() => setTab(key)}
      className={[
        "text-[14px]",
        tab === key ? "font-semibold text-[#14143A]" : "text-[#9AA0B4]",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <AccountShell
      title="FAQs"
      activeKey="faqs"
      right={
        <div className="w-full max-w-[820px]">
          {/* top tabs */}
          <div className="flex items-center gap-7 text-sm">
            {tabBtn("payments", "Payments")}
            {tabBtn("receipts", "Receipts")}
            {tabBtn("bookstore", "Bookstore")}

            <div className="flex-1" />

            <button type="button" className="text-[14px] font-semibold text-[#2C14DD]">
              View All
            </button>
          </div>

          {/* cards */}
          <div className="mt-6 space-y-6">
            <FAQCard withArt />
            <FAQCard />
          </div>
        </div>
      }
    />
  );
}
