import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";

function CalendarIcon() {
  return (
    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#F0F2FA]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="16" height="14" rx="3" stroke="#3827ED" strokeWidth="1.9" />
        <path d="M8 3.8v3M16 3.8v3M4 9.5h16" stroke="#3827ED" strokeWidth="1.9" strokeLinecap="round" />
        <circle cx="8.5" cy="13" r="1" fill="#3827ED" />
        <circle cx="12" cy="13" r="1" fill="#3827ED" />
      </svg>
    </div>
  );
}

function ChangeLink() {
  return (
    <button type="button" className="cursor-pointer text-[16px] font-medium text-[#4A3AF4]">
      Change
    </button>
  );
}

export default function AdminCreateFeePreview() {
  const nav = useNavigate();

  return (
    <AdminPaymentsShell title="Payments" activeKey="manage-fees">
      <div className="w-full max-w-[560px] pt-2">
        <h2 className="text-[54px] font-extrabold leading-none tracking-[-0.03em] text-[#110F57]">
          Preview
        </h2>

        <div className="mt-12 rounded-[28px] bg-[#3B28F0] px-8 py-10 text-center text-white shadow-[0_20px_50px_rgba(47,32,217,0.18)]">
          <p className="text-[20px] text-white/90">Fee Amount</p>
          <h3 className="mt-3 text-[48px] font-extrabold tracking-[-0.03em]">
            ₦86,890.00
          </h3>

          <p className="mt-6 text-[18px] text-white/90">Fee Name</p>
          <p className="mt-3 text-[18px] font-semibold">
            SUG Dues (25/26 Academic Session)
          </p>
        </div>

        <div className="mt-14 space-y-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[#E56A00] text-[11px] font-bold text-white">
                GT
              </div>
              <div>
                <p className="text-[14px] text-[#18224F]">Settlement Account</p>
                <p className="mt-2 text-[18px] font-medium text-[#262834]">GTB</p>
              </div>
            </div>
            <ChangeLink />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CalendarIcon />
              <div>
                <p className="text-[14px] text-[#18224F]">Fee Duration</p>
                <p className="mt-2 text-[18px] font-medium text-[#262834]">
                  Jul. 16th 2025 - Sept. 25 2025
                </p>
                <p className="mt-1 text-[14px] text-[#9A9EAF]">Start Date - End Date</p>
              </div>
            </div>
            <ChangeLink />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] text-[#18224F]">Assigned Department/Faculty</p>
              <p className="mt-3 text-[18px] font-medium text-[#262834]">
                Entire Institution
              </p>
            </div>
            <ChangeLink />
          </div>
        </div>

        <button
          type="button"
          onClick={() => nav("/admin/dashboard/payments/fees/create/success")}
          className="mt-44 inline-flex h-[72px] w-full cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
        >
          Create Fee
        </button>
      </div>
    </AdminPaymentsShell>
  );
}