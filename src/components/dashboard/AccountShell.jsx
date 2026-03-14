import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";

export default function AccountShell({
  title = "Account",
  activeKey = "my",
  right = null,
  variant = "white", // "blue" | "white"
}) {
  const nav = useNavigate();

  const isBlue = variant === "blue";

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => nav(-1)}
          className={[
            "w-11 h-11 rounded-full flex items-center justify-center transition",
            isBlue ? "bg-white/10 text-white hover:bg-white/15" : "bg-[#F6F7FF] text-[#14143A] hover:bg-[#EEF0FF]",
          ].join(" ")}
          aria-label="Go back"
        >
          <span className="text-2xl leading-none">‹</span>
        </button>

        <h1
          className={[
            "text-xl font-semibold",
            isBlue ? "text-white" : "text-[#14143A]",
          ].join(" ")}
        >
          {title}
        </h1>
      </div>

      {/* Big rounded panel like the images */}
      <div className="bg-[#DFDCFA] rounded-[34px] p-6 md:p-10">
        {/* EXACT 50/50 split on xl */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10">
          {/* LEFT half */}
          <div className="min-w-0">
            <AccountMenu activeKey={activeKey} />
          </div>

          {/* RIGHT half */}
          <div className="min-w-0">{right}</div>
        </div>
      </div>
    </div>
  );
}
