import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSettlementShell from "../../components/admin/AdminPaymentsShell";

import kudaLogo from "../../assets/admin/banks/kuda-bank.png";
import gtbLogo from "../../assets/admin/banks/gtbank.png";
import cowrywiseLogo from "../../assets/admin/banks/cowrywise.png";

function InfoInput({ label, value, onChange, placeholder }) {
  return (
    <div className="rounded-[18px] bg-[#F2F1FB] px-6 py-5">
      <p className="text-[14px] font-medium text-[#8D93A6]">{label}</p>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent text-[17px] text-[#2A2D45] outline-none placeholder:text-[#A3A8BB]"
      />
    </div>
  );
}

export default function AdminSettlementUpdateAccount() {
  const { bankId } = useParams();

  const accountMap = useMemo(
    () => ({
      "kuda-1": {
        name: "Kuda Bank",
        logo: kudaLogo,
        justAdded: true,
        bankName: "Kuda Microfinance Bank",
        accountHolderName: "SUG - University of Lagos",
        accountNumber: "12345678910",
      },
      "kuda-2": {
        name: "Kuda Bank",
        logo: kudaLogo,
        justAdded: false,
        bankName: "Kuda Bank",
        accountHolderName: "SUG - University of Lagos",
        accountNumber: "12345678910",
      },
      gtb: {
        name: "GTB",
        logo: gtbLogo,
        justAdded: false,
        bankName: "Guaranty Trust Bank",
        accountHolderName: "SUG - University of Lagos",
        accountNumber: "12345678910",
      },
      cowrywise: {
        name: "Cowrywise",
        logo: cowrywiseLogo,
        justAdded: false,
        bankName: "Cowrywise",
        accountHolderName: "SUG - University of Lagos",
        accountNumber: "12345678910",
      },
    }),
    []
  );

  const selected = accountMap[bankId] || accountMap["kuda-1"];

  const [form, setForm] = useState({
    bankName: selected.bankName,
    accountHolderName: selected.accountHolderName,
    accountNumber: selected.accountNumber,
  });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <AdminSettlementShell title="Settlement">
      <div className="min-w-0 pt-1 xl:pl-8 2xl:pl-10">
        <div className="w-full max-w-[478px]">
          <div className="flex items-center gap-5">
            <img
              src={selected.logo}
              alt={selected.name}
              className="h-[42px] w-[42px] rounded-[10px] object-cover"
            />

            <div className="flex items-center gap-4">
              <span className="text-[18px] font-medium text-[#36436B]">
                {selected.name}
              </span>

              {selected.justAdded ? (
                <span className="text-[14px] font-medium text-[#FF7A1A]">
                  Just Added
                </span>
              ) : null}
            </div>
          </div>

          <h2 className="mt-14 text-[22px] font-medium text-[#1C1D2B]">
            Update Account Details
          </h2>

          <div className="mt-6 space-y-4">
            <InfoInput
              label="Bank Name"
              value={form.bankName}
              onChange={(e) => handleChange("bankName", e.target.value)}
              placeholder="Bank Name"
            />

            <InfoInput
              label="Account Holder Name"
              value={form.accountHolderName}
              onChange={(e) => handleChange("accountHolderName", e.target.value)}
              placeholder="Account Holder Name"
            />

            <InfoInput
              label="Bank Account Number"
              value={form.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              placeholder="Bank Account Number"
            />
          </div>

          <button
            type="button"
            className="mt-8 inline-flex h-[56px] w-full max-w-[220px] cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[16px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
          >
            Update Account
          </button>
        </div>
      </div>
    </AdminSettlementShell>
  );
}