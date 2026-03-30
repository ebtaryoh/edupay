import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";
import piggybankImg from "../../assets/admin/Piggybank.png";

export default function AdminDeleteFeeSuccess() {
  const nav = useNavigate();

  return (
    <AdminPaymentsShell title="Payments" activeKey="manage-fees">
      <div className="flex min-h-full items-stretch">
        <section className="ml-auto flex min-h-[940px] w-full max-w-[450px] flex-col items-center bg-[#3A26F0] px-7 pb-12 pt-16 text-center shadow-[0_24px_55px_rgba(47,32,217,0.20)]">
          <img
            src={piggybankImg}
            alt="Piggy bank"
            className="mt-6 w-[245px] object-contain"
          />

          <h2 className="mt-10 text-[54px] font-extrabold leading-none tracking-[-0.03em] text-white">
            Fee Deleted
          </h2>

          <p className="mt-8 text-[18px] leading-8 text-white/75">
            Let&apos;s create new fees!
          </p>

          <div className="mt-auto w-full space-y-5">
            <button
              type="button"
              onClick={() => nav("/admin/dashboard/payments/fees/create")}
              className="inline-flex h-[68px] w-full cursor-pointer items-center justify-center rounded-full bg-[#0E012F] text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
            >
              Create Fee
            </button>

            <button
              type="button"
              onClick={() => nav("/admin/dashboard/payments/fees")}
              className="inline-flex h-[68px] w-full cursor-pointer items-center justify-center rounded-full bg-white text-[18px] font-semibold text-[#3A26F0] transition hover:brightness-95 active:scale-[0.99]"
            >
              View Fees
            </button>
          </div>
        </section>
      </div>
    </AdminPaymentsShell>
  );
}