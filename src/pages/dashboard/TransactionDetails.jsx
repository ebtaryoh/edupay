// import { useNavigate, useParams } from "react-router-dom";
// import img from "../../assets/dashboard/dashboard-transaction-detail.jpg";

// export default function TransactionDetails() {
//   const nav = useNavigate();
//   const { id } = useParams();

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Left */}
//       <div className="bg-white rounded-[22px] border border-[#E7E9FF] p-5 md:p-8">
//         <button
//           onClick={() => nav(-1)}
//           className="w-10 h-10 rounded-full bg-[#EEF0FF] flex items-center justify-center"
//         >
//           ←
//         </button>

//         <h1 className="mt-6 text-2xl font-extrabold text-[#14143A]">
//           Transaction Details
//         </h1>

//         <h2 className="mt-6 text-2xl md:text-3xl font-extrabold text-[#14143A] leading-tight">
//           SUG Dues (25/25 Academic Session) - 1st Semester
//         </h2>

//         <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#EEF0FF] px-6 py-3 text-[#2F2AD9] font-semibold">
//           ₦20,983.00 <span className="text-[#6B6B86]">▾</span>
//         </div>

//         <div className="mt-8 rounded-[18px] bg-[#F7F8FF] p-6">
//           <Row k="Transaction ID:" v={`TX-${id}-DUMMY`} />
//           <Row k="Date:" v="25th November, 2025" />
//           <Row k="Recipient Account:" v="1234567877" />
//           <Row k="Receiving Institution:" v="UNILAG" />
//           <Row k="Mat/Reg No:" v="CSC/2021/001" />
//           <Row k="RRR No.:" v="123456789012" />
//         </div>

//         <div className="mt-10 flex flex-col sm:flex-row gap-4">
//           <button className="flex-1 rounded-full bg-[#2F2AD9] text-white py-4 font-semibold">
//             Download Receipt
//           </button>
//           <button className="flex-1 rounded-full bg-[#2F2AD9] text-white py-4 font-semibold">
//             Share Receipt
//           </button>
//         </div>
//       </div>

//       {/* Right image */}
//       <div className="hidden lg:block">
//         <div className="h-full w-full overflow-hidden rounded-l-[60px]">
//           <img src={img} alt="" className="h-full w-full object-cover grayscale" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Row({ k, v }) {
//   return (
//     <div className="flex items-center justify-between py-3 text-sm">
//       <span className="text-[#6B6B86]">{k}</span>
//       <span className="text-[#14143A] font-semibold">{v}</span>
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";

function Row({ left, right, copy }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <p className="text-[#9AA0B4]">{left}</p>
      <div className="flex items-center gap-2">
        <p className="text-[#14143A] font-medium">{right}</p>
        {copy ? (
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#EEF0FF] flex items-center justify-center"
            onClick={() => navigator.clipboard.writeText(right)}
            title="Copy"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 9h10v10H9z" stroke="#2C14DD" strokeWidth="2"/>
              <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke="#2C14DD" strokeWidth="2"/>
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function TransactionDetails() {
  const { id } = useParams();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#14143A] text-center mt-6">
          SUG Dues (25/25 Academic
          <br />
          Session) - 1st Semester
        </h2>

        <div className="mt-6 flex justify-center">
          <div className="bg-[#F3F4FF] border border-[#E7E9FF] rounded-full px-8 py-4 font-semibold text-[#6B6B85] flex items-center gap-3">
            ₦20,983.00
            <span className="text-[#9AA0B4]">▼</span>
          </div>
        </div>

        <div className="mt-10 bg-[#F6F7FF] rounded-[22px] border border-[#EEF0FF] p-8 max-w-[720px] mx-auto">
          <Row left="Transaction ID:" right={`12susn0osEE4%ducvwswwe-${id || "t1"}`} copy />
          <Row left="Date:" right="25th November, 2025" />
          <Row left="Recipient Account:" right="1234567877" />
          <Row left="Receiving Institution:" right="UNILAG" />
          <Row left="Mat/Reg No:" right="CSC/2021/001" />
          <Row left="RRR No.:" right="123456789012" />
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <Button className="h-14 px-12">Download Receipt</Button>
          <Button className="h-14 px-12">Share Receipt</Button>
        </div>
      </div>

      <div className="hidden xl:block">
        <div className="h-[860px] rounded-[60px] bg-black/10 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-b from-black/10 to-black/30" />
        </div>
      </div>
    </div>
  );
}
