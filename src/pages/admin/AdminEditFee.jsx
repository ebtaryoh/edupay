import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="3" stroke="#3827ED" strokeWidth="1.9" />
      <path d="M8 3.8v3M16 3.8v3M4 9.5h16" stroke="#3827ED" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="8.5" cy="13" r="1" fill="#3827ED" />
      <circle cx="12" cy="13" r="1" fill="#3827ED" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="#151515" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FieldLabel({ children }) {
  return <p className="text-[14px] text-[#6F7488]">{children}</p>;
}

export default function AdminEditFee() {
  const nav = useNavigate();

  return (
    <AdminPaymentsShell title="Payments" activeKey="manage-fees">
      <div className="w-full max-w-[560px] pt-2">
        <h2 className="text-[54px] font-extrabold leading-none tracking-[-0.03em] text-[#110F57]">
          Edit Fee
        </h2>

        <p className="mt-6 text-[18px] text-[#2E2E36]">
          Set the fee amount, duration and assign user(s).
        </p>

        <div className="mt-20 space-y-14">
          <div>
            <FieldLabel>Fee Name</FieldLabel>
            <p className="mt-3 text-[18px] font-medium text-[#131525]">
              SUG Dues (25/26 Academic Session)
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <FieldLabel>Duration of Fee</FieldLabel>
              <p className="mt-3 text-[18px] font-medium text-[#131525]">
                Pick a start date
              </p>
            </div>

            <button
              type="button"
              onClick={() => nav("/admin/dashboard/payments/fees/1/edit/start-date")}
              className="cursor-pointer"
            >
              <CalendarIcon />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <FieldLabel>Assign Department/Faculty</FieldLabel>
              <p className="mt-3 text-[18px] font-medium text-[#131525]">
                Select Department/Faculty
              </p>
            </div>

            <button type="button" className="cursor-pointer">
              <ChevronDown />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => nav("/admin/dashboard/payments/fees/1")}
          className="mt-[340px] inline-flex h-[72px] w-full cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
        >
          Continue
        </button>
      </div>
    </AdminPaymentsShell>
  );
}