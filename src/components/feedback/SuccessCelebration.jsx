import { Check } from "lucide-react";

const pieces = [
  { left: "8%", top: "22%", bg: "#3C22F2", rotate: "-16deg", delay: "0s" },
  { left: "16%", top: "12%", bg: "#F59E0B", rotate: "18deg", delay: "0.2s" },
  { left: "24%", top: "28%", bg: "#EC4899", rotate: "10deg", delay: "0.4s" },
  { left: "76%", top: "12%", bg: "#22C55E", rotate: "-12deg", delay: "0.1s" },
  { left: "84%", top: "24%", bg: "#A855F7", rotate: "16deg", delay: "0.35s" },
  { left: "72%", top: "30%", bg: "#F59E0B", rotate: "-20deg", delay: "0.5s" },
  { left: "18%", top: "74%", bg: "#22C55E", rotate: "-10deg", delay: "0.3s" },
  { left: "30%", top: "84%", bg: "#3C22F2", rotate: "20deg", delay: "0.6s" },
  { left: "70%", top: "82%", bg: "#EC4899", rotate: "-18deg", delay: "0.25s" },
  { left: "82%", top: "72%", bg: "#A855F7", rotate: "14deg", delay: "0.45s" },
];

export default function SuccessCelebration({
  title = "Success",
  subtitle = "Everything is set.",
}) {
  return (
    <div className="text-center">
      <style>
        {`
          @keyframes successFloat {
            0%, 100% { transform: translateY(0px) rotate(var(--r)); opacity: 0.85; }
            50% { transform: translateY(-10px) rotate(calc(var(--r) + 8deg)); opacity: 1; }
          }

          @keyframes successPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.18; }
            50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.28; }
          }

          @keyframes successPop {
            0% { transform: translate(-50%, -50%) scale(0.72); opacity: 0; }
            60% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          }
        `}
      </style>

      <div className="relative mx-auto h-[260px] w-[260px]">
        <div
          className="absolute left-1/2 top-1/2 h-[210px] w-[210px] rounded-full bg-[#EEE9FF]"
          style={{ transform: "translate(-50%, -50%)", animation: "successPulse 2.4s ease-in-out infinite" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[170px] w-[170px] rounded-full border border-[#E6DEFF]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#3C22F2] shadow-[0_20px_60px_rgba(60,34,242,0.35)]"
          style={{ animation: "successPop 650ms ease-out both" }}
        >
          <Check size={42} strokeWidth={3} color="white" />
        </div>

        {pieces.map((piece, index) => (
          <span
            key={index}
            className="absolute block rounded-[4px]"
            style={{
              left: piece.left,
              top: piece.top,
              width: index % 2 === 0 ? "12px" : "10px",
              height: index % 2 === 0 ? "18px" : "12px",
              background: piece.bg,
              boxShadow: `0 8px 20px ${piece.bg}30`,
              "--r": piece.rotate,
              transform: `rotate(${piece.rotate})`,
              animation: "successFloat 2.2s ease-in-out infinite",
              animationDelay: piece.delay,
            }}
          />
        ))}

        <span className="absolute left-[14%] top-[44%] h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
        <span className="absolute right-[14%] top-[40%] h-2 w-2 rounded-full bg-[#22C55E]" />
        <span className="absolute left-[28%] bottom-[16%] h-2 w-2 rounded-full bg-[#EC4899]" />
        <span className="absolute right-[28%] bottom-[14%] h-2.5 w-2.5 rounded-full bg-[#A855F7]" />
      </div>

      <h1 className="mt-2 text-[32px] font-bold tracking-[-0.02em] text-[#14143A]">
        {title}
      </h1>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8E8EA8]">
        {subtitle}
      </p>
    </div>
  );
}