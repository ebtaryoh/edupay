import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";

function Toggle({ active }) {
  return (
    <div
      className={[
        "relative h-[34px] w-[54px] rounded-full transition",
        active ? "bg-[#4A63F2]" : "bg-[#E3E3E3]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-[26px] w-[26px] rounded-full bg-white transition",
          active ? "left-[24px]" : "left-1",
        ].join(" ")}
      />
    </div>
  );
}

function BankItem({ color, label, short, active = false }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex items-center gap-5">
        <div
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] text-[11px] font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {short}
        </div>

        <span className="text-[18px] font-medium text-[#36436B]">{label}</span>
      </div>

      <Toggle active={active} />
    </button>
  );
}

function AmountChip({ children }) {
  return (
    <button
      type="button"
      className="inline-flex h-[46px] min-w-[108px] cursor-pointer items-center justify-center rounded-full bg-[#EDEBFA] px-6 text-[16px] font-medium text-[#3827ED] transition hover:bg-[#E4E0FF]"
    >
      {children}
    </button>
  );
}

export default function AdminSetFeeAmount() {
  const nav = useNavigate();
  const [amount, setAmount] = useState(86890);

  return (
    <AdminPaymentsShell title="Payments" activeKey="manage-fees">
      <div className="w-full max-w-[560px] pt-2">
        <h2 className="text-[54px] font-extrabold leading-none tracking-[-0.03em] text-[#110F57]">
          Set Fee Amount
        </h2>

        <div className="mt-16 flex items-center justify-between gap-5">
          <button
            type="button"
            onClick={() => setAmount((prev) => Math.max(0, prev - 1000))}
            className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[18px] bg-[#ECEBFA] text-[28px] font-medium text-[#3827ED]"
          >
            -
          </button>

          <div className="min-w-0 flex-1 text-center">
            <p className="text-[18px] font-semibold text-[#15134F]">₦{amount.toLocaleString()}.00</p>
            <div className="mx-auto mt-5 h-px w-[200px] bg-[#E3E4EC]" />
          </div>

          <button
            type="button"
            onClick={() => setAmount((prev) => prev + 1000)}
            className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-[18px] bg-[#ECEBFA] text-[28px] font-medium text-[#3827ED]"
          >
            +
          </button>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <AmountChip>₦5,000</AmountChip>
          <AmountChip>₦15,000</AmountChip>
          <AmountChip>₦25,000</AmountChip>
        </div>

        <div className="mt-24">
          <h3 className="text-[18px] font-medium text-[#1F2030]">
            Select Settlement Account (optional)
          </h3>

          <div className="mt-10 space-y-8">
            <BankItem color="#5A348F" short="K" label="Kuda Bank" />
            <BankItem color="#E56A00" short="GT" label="GTB" active />
            <BankItem color="#0D6BFF" short="CW" label="Cowrywise" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => nav("/admin/dashboard/payments/fees/create/preview")}
          className="mt-40 inline-flex h-[72px] w-full cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
        >
          Next
        </button>
      </div>
    </AdminPaymentsShell>
  );
}