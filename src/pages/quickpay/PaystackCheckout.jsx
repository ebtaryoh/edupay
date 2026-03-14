import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { quickpayApi } from "../../api/quickpay";

export default function PaystackCheckout() {
  const nav = useNavigate();
  const { state } = useLocation(); // contains reference, authorizationUrl, etc.

  useEffect(() => {
    if (!state) nav("/quickpay/payments");
  }, [state, nav]);

  async function simulatePaid() {
    // In real life: user completes Paystack, your backend callback happens,
    // then you verify using reference.
    const reference = state?.reference || state?.data?.reference;
    if (!reference) return;

    const verify = await quickpayApi.verify(reference);
    // Suppose verify returns transactionId
    nav(`/quickpay/transaction/${verify.transactionId}`);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl rounded-3xl border border-[#E8E8F5] p-8">
        <h1 className="text-2xl font-extrabold text-[#14143A]">Paystack Checkout</h1>
        <p className="mt-2 text-[#6B6B85]">
          Use your backend authorizationUrl here (redirect or embed).
        </p>

        <div className="mt-6 rounded-2xl bg-[#F7F7FF] p-6 text-sm text-[#3B3B57]">
          <div><b>authorizationUrl:</b> {String(state?.authorizationUrl || "N/A")}</div>
          <div className="mt-2"><b>reference:</b> {String(state?.reference || "N/A")}</div>
        </div>

        <button
          onClick={simulatePaid}
          className="mt-8 w-full rounded-full py-4 bg-[#2F2AD9] text-white font-semibold hover:brightness-110"
        >
          I completed payment (verify)
        </button>
      </div>
    </div>
  );
}
