import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";

function FeeTransactionRow({ name }) {
  return (
    <div className="flex items-center gap-4 rounded-[14px] bg-[#F3F1FE] px-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-[#3827ED]">{name}</p>
        <p className="mt-1 truncate text-[14px] text-[#555563]">
          SUG Dues (25/26) Academic...
        </p>
        <p className="mt-1 text-[12px] text-[#70758A]">
          23rd September 2025 at 12:03 AM
        </p>
      </div>

      <div className="inline-flex h-[42px] min-w-[92px] items-center justify-center rounded-[12px] bg-[#EBE7FA] px-3 text-[13px] font-semibold text-[#1D1D22]">
        ₦86,890.00
      </div>

      <button
        type="button"
        className="inline-flex h-[42px] cursor-pointer items-center justify-center rounded-[12px] bg-[#3827ED] px-5 text-[14px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
      >
        View
      </button>
    </div>
  );
}

export default function AdminManageSpecificFee() {
  const nav = useNavigate();

  return (
    <AdminPaymentsShell title="Manage Fee" activeKey="manage-fees">
      <div className="ml-auto w-full max-w-[450px] overflow-hidden bg-[#3A26F0] shadow-[0_24px_55px_rgba(47,32,217,0.20)]">
        <div className="px-8 pb-10 pt-16 text-center text-white">
          <h2 className="text-[52px] font-extrabold tracking-[-0.03em]">
            ₦86,890.00
          </h2>

          <p className="mt-6 text-[18px] text-white/90">
            SUG Dues (25/26 Academic Session)
          </p>

          <p className="mt-2 text-[16px] text-white/80">
            Expiring 23rd September 2025
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => nav("/admin/dashboard/payments/fees/1/edit")}
              className="inline-flex h-[50px] min-w-[122px] cursor-pointer items-center justify-center rounded-full bg-white px-7 text-[16px] font-medium text-[#171717] transition hover:brightness-95 active:scale-[0.99]"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => nav("/admin/dashboard/payments/fees/1/delete-success")}
              className="inline-flex h-[50px] min-w-[122px] cursor-pointer items-center justify-center rounded-full bg-white px-7 text-[16px] font-medium text-[#171717] transition hover:brightness-95 active:scale-[0.99]"
            >
              Delete Fee
            </button>
          </div>
        </div>

        <div className="min-h-[560px] rounded-t-[40px] bg-[#F4F5FC] px-8 pb-10 pt-9">
          <h3 className="text-[18px] font-medium text-[#171717]">
            Fee-Specific Transactions
          </h3>

          <p className="mt-6 text-[18px] text-[#9DA4B8]">Today</p>

          <div className="mt-4 space-y-4">
            <FeeTransactionRow name="Cynthia Okonkwo" />
            <FeeTransactionRow name="Joy Anyanwu" />
            <FeeTransactionRow name="James Okoro" />
            <FeeTransactionRow name="Pelumi Akande" />
          </div>
        </div>
      </div>
    </AdminPaymentsShell>
  );
}