// import { useNavigate } from "react-router-dom";

// export default function Payments() {
//   const nav = useNavigate();

//   // mock data for now (backend already done, we’ll wire later)
//   const transactions = [
//     {
//       id: "1",
//       title: "School of Medicine Tuition Fee - 2025/2026 Academic Session",
//       amount: "₦86,890.00",
//       date: "23rd September 2025 at 12:03 AM",
//     },
//     {
//       id: "2",
//       title: "Non-Medical Students Tuition Fee - 2025/2026 Academic Session",
//       amount: "₦66,390.00",
//       date: "23rd September 2025 at 12:03 AM",
//     },
//     {
//       id: "3",
//       title: "Healthcare Fee - 2025/2026 Academic Session",
//       amount: "₦11,890.00",
//       date: "23rd September 2025 at 12:03 AM",
//     },
//     {
//       id: "4",
//       title: "Library Fee Renewal - 2025/2026 Academic Session",
//       amount: "₦7,890.00",
//       date: "23rd September 2025 at 12:03 AM",
//     },
//   ];

//   return (
//     <div className="p-6 md:p-10">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-2xl md:text-3xl font-extrabold text-[#14143A]">
//           Transactions
//         </h1>
//       </div>

//       {/* Search */}
//       <div className="mb-8">
//         <input
//           type="text"
//           placeholder="Search transactions"
//           className="w-full md:max-w-md rounded-full border border-[#E6E7F2]
//                      px-5 py-3 text-sm outline-none
//                      focus:ring-2 focus:ring-[#2F2AD9]/40"
//         />
//       </div>

//       {/* Transactions List */}
//       <div className="space-y-4">
//         {transactions.map((tx) => (
//           <div
//             key={tx.id}
//             className="flex flex-col md:flex-row md:items-center md:justify-between
//                        bg-[#F7F8FE] rounded-2xl p-5 gap-4"
//           >
//             {/* Left */}
//             <div>
//               <p className="font-semibold text-[#14143A] leading-snug">
//                 {tx.title}
//               </p>
//               <p className="text-sm text-[#6B6F93] mt-1">{tx.date}</p>
//             </div>

//             {/* Right */}
//             <div className="flex items-center gap-4">
//               <span className="bg-[#EEF0FF] text-[#2F2AD9]
//                                px-4 py-2 rounded-full font-semibold text-sm">
//                 {tx.amount}
//               </span>

//               <button
//                 onClick={() => nav(`/dashboard/transaction/${tx.id}`)}
//                 className="bg-[#2F2AD9] text-white
//                            px-5 py-2 rounded-full text-sm font-semibold
//                            hover:brightness-110 transition"
//               >
//                 View →
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Load more */}
//       <div className="flex justify-center mt-10">
//         <button
//           className="bg-[#2F2AD9] text-white
//                      px-10 py-3 rounded-full font-semibold
//                      hover:brightness-110 transition"
//         >
//           Load More...
//         </button>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import QuickActions from "../../components/dashboard/QuickActions";

function CategoryItem({ icon, title, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center justify-between px-5 py-5 rounded-[20px] border",
        active ? "bg-[#F1F2FF] border-[#F1F2FF]" : "bg-white border-[#E7E9FF]",
        "hover:bg-[#F1F2FF] transition",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-[#2C14DD]">
          {icon}
        </div>
        <div className="text-left">
          <p className="text-[16px] font-semibold text-[#14143A]">{title}</p>
        </div>
      </div>

      <span className="text-[#9AA0B4] text-xl">›</span>
    </button>
  );
}

export default function Payments() {
  const nav = useNavigate();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-10">
      <div>
        <div className="max-w-[520px]">
          <Input placeholder="Search fees" className="bg-[#F6F7FF]" />
        </div>

        <h3 className="mt-10 text-[#9AA0B4] font-medium">Category</h3>

        <div className="mt-4 space-y-4 max-w-[520px]">
          <CategoryItem
            title="Tuition/Healthcare"
            onClick={() => nav("/dashboard/payments/tuition-healthcare")}
            active
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21a8 8 0 1 0-16 0"
                  stroke="#2C14DD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"
                  stroke="#2C14DD"
                  strokeWidth="2"
                />
              </svg>
            }
          />

          <CategoryItem
            title="SUG Dues"
            onClick={() => nav("/dashboard/payments/tuition-healthcare")}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v20" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5 7h14" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          />

          <CategoryItem
            title="Accomodation/Hostel Fees"
            onClick={() => nav("/dashboard/payments/tuition-healthcare")}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 10.5L12 3l9 7.5V21H3V10.5z" stroke="#2C14DD" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            }
          />

          <CategoryItem
            title="Departmental Fees"
            onClick={() => nav("/dashboard/payments/tuition-healthcare")}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 7h12v10H6z" stroke="#2C14DD" strokeWidth="2"/>
                <path d="M9 11h6" stroke="#2C14DD" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          />
        </div>

        <h3 className="mt-10 text-[#9AA0B4] font-medium">Quick Actions</h3>

        <div className="mt-4 bg-[#F6F7FF] rounded-[22px] p-6 max-w-[520px]">
          <QuickActions
            variant="payments"
            onPayFees={() => nav("/dashboard/payments/overdue")}
            onHistory={() => nav("/dashboard/transactions")}
          />
        </div>
      </div>

      {/* RIGHT: list preview area like image */}
      <div className="space-y-5">
        <h3 className="text-[18px] font-semibold text-[#14143A]">
          Tuition/Healthcare
        </h3>

        <div className="space-y-4 max-w-[720px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#F1F2FF] rounded-[18px] px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="font-semibold text-[#14143A] leading-snug">
                  {i % 2 === 0
                    ? "School of Medicine Tuition Fee - 2025/2026 Academic Session"
                    : "Healthcare Fee - 2025/2026 Academic Session"}
                </p>
                <p className="text-xs text-[#9AA0B4] mt-1">Due 23rd September 2025</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-[#EDEFFF] text-[#14143A] rounded-[14px] px-4 py-2 font-semibold text-sm">
                  {i % 2 === 0 ? "₦86,890.00" : "₦11,890.00"}
                </div>
                <button
                  onClick={() => nav("/dashboard/payments/tuition-healthcare")}
                  className="h-11 px-5 rounded-full bg-[#2C14DD] text-white font-semibold flex items-center gap-2"
                >
                  Pay <span className="text-lg">›</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
