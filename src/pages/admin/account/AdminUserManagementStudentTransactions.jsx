import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { ProfileHero, RoundedSearch } from "../../../components/admin/account/AdminAccountBlocks";

const rows = Array.from({ length: 5 }).map((_, index) => ({
  id: index + 1,
  name: "Cynthia Okonkwo",
  title: "SUG Dues (25/26) Academic...",
  time: "23rd September 2025 at 12:03 AM",
  amount: "N86,890.00",
}));

function TransactionRow({ item }) {
  return (
    <div className="flex items-center gap-4 rounded-[14px] bg-[#F5F4FD] px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-[#3D2BE9]">{item.name}</p>
        <p className="mt-1 truncate text-[15px] text-[#404455]">{item.title}</p>
        <p className="mt-1 text-[13px] text-[#7A7F92]">{item.time}</p>
      </div>
      <div className="rounded-[14px] bg-[#ECEBFA] px-4 py-2 text-[16px] font-semibold text-[#161B32]">
        {item.amount}
      </div>
      <button className="h-[44px] rounded-[14px] bg-[#3724E9] px-5 text-[17px] font-semibold text-white">
        View ›
      </button>
    </div>
  );
}

export default function AdminUserManagementStudentTransactions() {
  return (
    <AdminAccountShell
      title="Student Transactions"
      activeKey="user-management"
      right={
        <div className="max-w-[760px] space-y-8">
          <ProfileHero
            name="Cynthia Okonkwo"
            subline1="UNILAG - CSC/2021/001"
            subline2="Computer Science - 300 Level"
          />

          <div className="max-w-[610px]">
            <RoundedSearch placeholder="Search student transactions" />
          </div>

          <div>
            <p className="mb-4 text-[18px] font-medium text-[#9A9CAC]">Today</p>
            <div className="space-y-3">
              {rows.map((item) => (
                <TransactionRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
