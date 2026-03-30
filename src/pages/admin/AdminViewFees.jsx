import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.4" stroke="#9EB0F4" strokeWidth="2.2" />
      <path d="M16 16l3.6 3.6" stroke="#9EB0F4" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight({ color = "white" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeeRow({ item, onManage }) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] bg-[#F3F1FE] px-5 py-5">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[16px] font-medium text-[#31313B]">
          {item.title}
        </p>
        <p className="mt-2 text-[15px] text-[#FF7A1A]">
          Expiring: {item.expiry}
        </p>
      </div>

      <div className="inline-flex h-[48px] min-w-[96px] items-center justify-center rounded-[14px] bg-[#E8E5FB] px-4 text-[14px] font-semibold text-[#1E1E24]">
        {item.amount}
      </div>

      <button
        type="button"
        onClick={onManage}
        className="inline-flex h-[48px] cursor-pointer items-center gap-1 rounded-[14px] bg-[#3827ED] px-5 text-[15px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
      >
        Manage
        <ChevronRight />
      </button>
    </div>
  );
}

export default function AdminViewFees() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  const sections = useMemo(
    () => [
      {
        title: "Created Today",
        items: Array.from({ length: 5 }).map((_, i) => ({
          id: `today-${i}`,
          title: "SUG Dues (25/26) Academic...",
          expiry: "23rd September 2025",
          amount: "₦86,890.00",
        })),
      },
      {
        title: "Created Yesterday",
        items: Array.from({ length: 2 }).map((_, i) => ({
          id: `yesterday-${i}`,
          title: "SUG Dues (25/26) Academic...",
          expiry: "23rd September 2025",
          amount: "₦86,890.00",
        })),
      },
    ],
    []
  );

  return (
    <AdminPaymentsShell title="Fees" activeKey="manage-fees">
      <div className="w-full max-w-[760px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex h-[60px] w-full max-w-[390px] items-center gap-3 rounded-full border border-[#E9ECF8] bg-[#FAFBFF] px-5">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fees by amount, date, department..."
              className="w-full bg-transparent text-[15px] text-[#2B3674] outline-none placeholder:text-[#A2A8BE]"
            />
          </div>

          <button
            type="button"
            onClick={() => nav("/admin/dashboard/payments/fees/create")}
            className="inline-flex h-[60px] cursor-pointer items-center justify-center rounded-[18px] bg-[#0E012F] px-8 text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
          >
            + Create Fee
          </button>
        </div>

        <div className="mt-10 space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[22px] font-medium text-[#A1A7BC]">
                {section.title}
              </h3>

              <div className="mt-4 space-y-4">
                {section.items.map((item) => (
                  <FeeRow
                    key={item.id}
                    item={item}
                    onManage={() => nav("/admin/dashboard/payments/fees/1")}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPaymentsShell>
  );
}