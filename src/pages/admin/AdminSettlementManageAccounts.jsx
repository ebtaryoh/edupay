import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSettlementShell from "./AdminSettlementShell";

import kudaLogo from "../../assets/admin/banks/kuda-bank.png";
import gtbLogo from "../../assets/admin/banks/gtbank.png";
import cowrywiseLogo from "../../assets/admin/banks/cowrywise.png";

function AccountRow({ logo, name, justAdded = false, onEdit }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-5">
        <img src={logo} alt={name} className="h-[42px] w-[42px] rounded-[10px] object-cover" />
        <div className="flex items-center gap-4">
          <span className="text-[18px] font-medium text-[#36436B]">{name}</span>
          {justAdded ? (
            <span className="text-[14px] font-medium text-[#FF7A1A]">Just Added</span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-[38px] min-w-[70px] cursor-pointer items-center justify-center rounded-full bg-[#4B68F2] px-4 text-[14px] font-medium text-white transition hover:brightness-110"
        >
          Edit
        </button>

        <button
          type="button"
          className="inline-flex h-[38px] min-w-[70px] cursor-pointer items-center justify-center rounded-full bg-[#4B68F2] px-4 text-[14px] font-medium text-white transition hover:brightness-110"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

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

export default function AdminSettlementManageAccounts() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
  });

  const accounts = useMemo(
    () => [
      { id: "kuda-1", name: "Kuda Bank", logo: kudaLogo, justAdded: true },
      { id: "kuda-2", name: "Kuda Bank", logo: kudaLogo },
      { id: "gtb", name: "GTB", logo: gtbLogo },
      { id: "cowrywise", name: "Cowrywise", logo: cowrywiseLogo },
    ],
    []
  );

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <AdminSettlementShell title="Settlement">
      <div className="min-w-0 pt-1 xl:pl-8 2xl:pl-10">
        <div className="w-full max-w-[478px]">
          <h2 className="text-[22px] font-medium text-[#1C1D2B]">
            Manage Account(s)
          </h2>

          <div className="mt-8 space-y-7">
            {accounts.map((account) => (
              <AccountRow
                key={account.id}
                logo={account.logo}
                name={account.name}
                justAdded={account.justAdded}
                onEdit={() =>
                  nav(`/admin/dashboard/payments/settlement/accounts/edit/${account.id}`)
                }
              />
            ))}
          </div>

          <h3 className="mt-14 text-[22px] font-medium text-[#1C1D2B]">
            Add Account(s)
          </h3>

          <div className="mt-6 space-y-4">
            <InfoInput
              label="Bank Name"
              value={form.bankName}
              onChange={(e) => handleChange("bankName", e.target.value)}
              placeholder="Enter Bank Name"
            />

            <InfoInput
              label="Account Holder Name"
              value={form.accountHolderName}
              onChange={(e) => handleChange("accountHolderName", e.target.value)}
              placeholder="Enter Account Holder Name"
            />

            <InfoInput
              label="Bank Account Number"
              value={form.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              placeholder="Enter Bank Account Number"
            />
          </div>

          <button
            type="button"
            className="mx-auto mt-6 inline-flex h-[54px] w-full max-w-[190px] cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[16px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
          >
            Add Account
          </button>
        </div>
      </div>
    </AdminSettlementShell>
  );
}