import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AccountMenu from "./AccountMenu";
import Topbar from "./Topbar";

export default function AccountShell({
  title = "Account",
  activeKey = "my",
  right = null,
}) {
  const nav = useNavigate();

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden pb-10 sm:space-y-6 xl:space-y-7">
      <Topbar />

      <div className="px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header row */}
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full bg-[#F6F7FF] text-[#14143A] transition hover:bg-[#EEF0FF]"
            aria-label="Go back"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#14143A]">
            {title}
          </h1>
        </div>

        {/* Content Panel */}
        <div className="rounded-[34px] bg-[#DFDCFA] p-6 md:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] xl:gap-14">
            {/* LEFT half */}
            <div className="min-w-0 max-w-[420px]">
              <AccountMenu activeKey={activeKey} />
            </div>

            {/* RIGHT half */}
            <div className="min-w-0">{right}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
