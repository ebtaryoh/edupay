import { useParams } from "react-router-dom";
import { Copy, ChevronDown } from "lucide-react";
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
            <Copy size={18} color="#2C14DD" strokeWidth={2.5} />
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
            <ChevronDown size={18} color="#9AA0B4" strokeWidth={2.5} />
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
