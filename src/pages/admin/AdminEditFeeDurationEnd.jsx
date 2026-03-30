import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";

function ChevronDown() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="#7C7F8E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const days = [
  "1", "2", "3", "4", "5", "6", "7",
  "8", "9", "10", "11", "12", "13", "14",
  "15", "16", "17", "18", "19", "20", "21",
  "22", "23", "24", "25", "26", "27", "28",
  "29", "30", "", "", "", "", "",
];

export default function AdminEditFeeDurationEnd() {
  const nav = useNavigate();

  return (
    <AdminPaymentsShell title="Payments" activeKey="manage-fees">
      <div className="w-full max-w-[560px] pt-2">
        <h2 className="text-[50px] font-extrabold leading-none tracking-[-0.03em] text-[#110F57]">
          Edit fee duration
        </h2>

        <div className="mt-16 flex items-center justify-between gap-4">
          <div>
            <p className="text-[14px] text-[#6F7488]">Month</p>
            <p className="mt-3 text-[18px] font-medium text-[#3827ED]">September 2025</p>
          </div>

          <button type="button" className="cursor-pointer">
            <ChevronDown />
          </button>
        </div>

        <div className="mt-16 border-b border-[#E7E9F2] pb-5">
          <p className="text-[18px] font-medium text-[#16171D]">Pick an end date</p>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-7 gap-y-8 text-center text-[16px] text-[#657089]">
            {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-7 gap-y-8 text-center text-[18px] text-[#18192A]">
            {days.map((day, index) =>
              day ? (
                <button
                  key={`${day}-${index}`}
                  type="button"
                  className={[
                    "mx-auto flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-[10px]",
                    day === "25" ? "bg-[#3827ED] text-white" : "",
                  ].join(" ")}
                >
                  {day}
                </button>
              ) : (
                <span key={`empty-${index}`} />
              )
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => nav("/admin/dashboard/payments/fees/1/edit")}
          className="mt-28 inline-flex h-[72px] w-full cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
        >
          Set End Date
        </button>
      </div>
    </AdminPaymentsShell>
  );
}