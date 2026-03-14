import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quickpayApi } from "../../api/quickpay";

export default function TransactionDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [tx, setTx] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await quickpayApi.transaction(id);
      setTx(data);
    })();
  }, [id]);

  if (!tx) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white px-8 lg:px-16 py-12">
      <h1 className="text-3xl font-extrabold text-[#14143A]">Transaction Detail</h1>

      <div className="mt-8 max-w-2xl rounded-3xl bg-[#F7F7FF] p-8">
        <div className="grid grid-cols-2 gap-4 text-[#3B3B57]">
          <Row label="Transaction ID" value={tx.transactionId || id} />
          <Row label="Date" value={tx.date || "-"} />
          <Row label="Recipient Account" value={tx.recipientAccount || "-"} />
          <Row label="Receiving Institution" value={tx.institution || "-"} />
          <Row label="Mat/Reg No" value={tx.matRegNo || "-"} />
          <Row label="RRR No" value={tx.rrr || "-"} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <button className="px-10 py-4 rounded-full bg-[#2F2AD9] text-white font-semibold">
          Download Receipt
        </button>
        <button className="px-10 py-4 rounded-full bg-[#2F2AD9] text-white font-semibold">
          Share Receipt
        </button>
      </div>

      <div className="mt-10">
        <button
          onClick={() => nav("/quickpay/success")}
          className="underline text-[#2F2AD9] font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#6B6B85]">{label}:</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
