import { useMemo, useState } from "react";
import AdminSettlementShell from "../../components/admin/AdminPaymentsShell";

import kudaLogo from "../../assets/admin/banks/kuda-bank.png";
import gtbLogo from "../../assets/admin/banks/gtbank.png";
import cowrywiseLogo from "../../assets/admin/banks/cowrywise.png";

function Toggle({ active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative h-[34px] w-[58px] cursor-pointer rounded-full transition",
        active ? "bg-[#4961F3]" : "bg-[#E4E4E4]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-[26px] w-[26px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition",
          active ? "left-[28px]" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

function BankRow({ logo, name, active, onClick }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img src={logo} alt={name} className="h-[42px] w-[42px] rounded-[10px] object-cover" />
        <span className="text-[18px] font-medium text-[#36436B]">{name}</span>
      </div>

      <Toggle active={active} onClick={onClick} />
    </div>
  );
}

export default function AdminSettlementSettings() {
  const [autoSettlement, setAutoSettlement] = useState(true);
  const [selectedBank, setSelectedBank] = useState("GTB");

  const banks = useMemo(
    () => [
      { id: "Kuda Bank", name: "Kuda Bank", logo: kudaLogo },
      { id: "GTB", name: "GTB", logo: gtbLogo },
      { id: "Cowrywise", name: "Cowrywise", logo: cowrywiseLogo },
    ],
    []
  );

  return (
    <AdminSettlementShell title="Settlement">
      <div className="min-w-0 pt-1 xl:pl-8 2xl:pl-10">
        <div className="w-full max-w-[520px]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[22px] font-medium text-[#1C1D2B]">
              Turn on auto-settlement
            </h2>

            <Toggle
              active={autoSettlement}
              onClick={() => setAutoSettlement((prev) => !prev)}
            />
          </div>

          <div className="mt-10 h-px bg-[#D9D9E6]" />

          <h3 className="mt-12 text-[22px] font-medium text-[#1C1D2B]">
            Select Account
          </h3>

          <div className="mt-8 space-y-8">
            {banks.map((bank) => (
              <BankRow
                key={bank.id}
                logo={bank.logo}
                name={bank.name}
                active={selectedBank === bank.id}
                onClick={() => setSelectedBank(bank.id)}
              />
            ))}
          </div>

          <button
            type="button"
            className="mx-auto mt-24 inline-flex h-[72px] w-full max-w-[150px] cursor-pointer items-center justify-center rounded-[28px] bg-[#3827ED] text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
          >
            Save
          </button>
        </div>
      </div>
    </AdminSettlementShell>
  );
}