import { useNavigate, useLocation } from "react-router-dom";
import { Share2, Eye, Download, RotateCcw } from "lucide-react";

function SuccessArt() {
  return (
    <div className="relative mx-auto flex h-[200px] w-[200px] items-center justify-center">
      {/* Confetti / decorative elements */}
      <span className="absolute left-4 top-6 h-3 w-3 rotate-[20deg] rounded-sm bg-[#C9BBFF]" />
      <span className="absolute right-6 top-4 h-2 w-8 rotate-[-15deg] rounded-full bg-[#B0A8FF]" />
      <span className="absolute bottom-10 left-2 h-2 w-6 rotate-[35deg] rounded-full bg-[#9C8FFF]" />
      <span className="absolute bottom-6 right-4 h-3 w-3 rotate-[-25deg] rounded-sm bg-[#C9BBFF]" />
      <span className="absolute left-10 bottom-14 text-[#7B63FF] text-lg font-bold">✦</span>
      <span className="absolute right-8 bottom-12 text-[#9C8FFF] text-sm">★</span>
      <span className="absolute left-3 top-[50%] text-[#B0A8FF] text-2xl">)</span>
      <span className="absolute right-2 top-[40%] text-[#B0A8FF] text-xl">~</span>

      {/* Circle check */}
      <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#2C14DD] shadow-[0_12px_40px_rgba(44,20,221,0.35)]">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path
            d="M10 21L17 28L30 14"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function QuickPaySuccess() {
  const nav = useNavigate();
  const location = useLocation();
  const reference = location.state?.reference || "";

  return (
    <div className="min-h-screen bg-[#F7F7FB] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-[32px] bg-white shadow-[0_20px_60px_rgba(44,20,221,0.10)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]">
          {/* Left: Art + text */}
          <div className="flex flex-col items-center justify-center px-8 py-12 border-b md:border-b-0 md:border-r border-[#EDEDF5]">
            <SuccessArt />

            <h2 className="mt-6 text-[28px] font-extrabold leading-tight text-center text-[#13085E]">
              Payment{"\n"}Successful
            </h2>
            <p className="mt-3 text-center text-[14px] text-[#8E8EA8]">
              A receipt has been sent to your email.
            </p>
            {reference ? (
              <p className="mt-2 text-center text-[12px] text-[#a0a0bc] font-mono">
                Ref: {reference}
              </p>
            ) : null}
          </div>

          {/* Right: Action buttons */}
          <div className="flex flex-col items-stretch justify-center gap-4 px-8 py-12">
            <ActionButton
              icon={<Share2 size={18} strokeWidth={2.5} />}
              label="Share Receipt"
              onClick={() => {}}
            />
            <ActionButton
              icon={<Eye size={18} strokeWidth={2.5} />}
              label="View Receipt"
              onClick={() => {
                if (reference) nav(`/quickpay/transaction/${reference}`);
              }}
            />
            <ActionButton
              icon={<Download size={18} strokeWidth={2.5} />}
              label="Download Receipt"
              onClick={() => {}}
            />
            <ActionButton
              icon={<RotateCcw size={18} strokeWidth={2.5} />}
              label="Make Another Payment"
              dark
              onClick={() => nav("/quickpay/payments")}
            />

            <p className="mt-4 text-center text-[13px] text-[#8E8EA8]">
              Want to do more?{" "}
              <button
                type="button"
                onClick={() => nav("/signup/student")}
                className="font-semibold text-[#B23BFF] hover:underline cursor-pointer"
              >
                Create An Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, dark = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full text-[15px] font-semibold transition hover:brightness-110 active:scale-[0.99]",
        dark
          ? "bg-[#0E0422] text-white"
          : "bg-[#2C14DD] text-white shadow-[0_8px_24px_rgba(44,20,221,0.25)]",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}
