import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentApi } from "../../api/fees";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function PaystackCheckout() {
  const nav = useNavigate();
  const { state } = useLocation(); // contains reference, authorizationUrl, etc.
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state?.authorizationUrl && !state?.reference) {
      nav("/quickpay/payments");
    }
  }, [state, nav]);

  async function handleVerify() {
    const reference = state?.reference || state?.data?.reference;
    if (!reference) return setError("No transaction reference found.");

    setVerifying(true);
    setError("");
    try {
      // In a real flow, the user is redirected back here from Paystack
      // We verify the reference with our backend
      const res = await paymentApi.verifyPayment({ reference });
      const data = res?.data || res;

      if (data?.status === "success" || data?.isSuccessful) {
         nav(`/quickpay/success`, { state: { transaction: data } });
      } else {
        throw new Error(data?.message || "Payment verification failed.");
      }
    } catch (e) {
      setError(e.message || "Could not verify payment. Please contact support.");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-sm border border-[#E8E8F5] p-10 text-center">
        <div className="w-20 h-20 bg-[#F1F2FF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#2C14DD]">
          <CheckCircle2 size={40} />
        </div>
        
        <h1 className="text-3xl font-extrabold text-[#13085E]">Secure Checkout</h1>
        <p className="mt-3 text-[#6B6B85] max-w-md mx-auto">
          Your payment is being processed securely via Paystack. Please click the button below after completing your transaction.
        </p>

        <div className="mt-8 rounded-2xl bg-[#F6F7FF] p-6 text-left border border-[#EEF0FF]">
          <div className="flex justify-between py-2 border-b border-[#E8EAF6]">
            <span className="text-[#9AA0B4] font-medium text-sm text-center">Transaction Reference</span>
            <span className="text-[#13085E] font-bold text-sm">{String(state?.reference || "N/A")}</span>
          </div>
          <div className="py-4">
            <p className="text-xs text-[#9AA0B4] uppercase tracking-wider font-bold mb-2">Checkout URL</p>
            <div className="bg-white p-3 rounded-lg border border-[#E8EAF6] text-xs font-mono text-[#2C14DD] break-all">
              {String(state?.authorizationUrl || "N/A")}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4">
          <a 
            href={state?.authorizationUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full h-16 rounded-full bg-[#2C14DD] text-white font-bold text-lg flex items-center justify-center hover:brightness-110 transition shadow-lg shadow-blue-200"
          >
            Open Paystack
          </a>
          
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="w-full h-16 rounded-full bg-white border-2 border-[#E7E9FF] text-[#13085E] font-bold text-lg flex items-center justify-center hover:bg-[#F6F7FF] transition disabled:opacity-50"
          >
            {verifying ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Verifying...</span>
              </div>
            ) : "I've Completed Payment"}
          </button>
        </div>
        
        <button 
          onClick={() => nav("/quickpay/payments")}
          className="mt-6 text-[#9AA0B4] font-semibold text-sm hover:text-[#13085E] transition"
        >
          Cancel and go back
        </button>
      </div>
    </div>
  );
}

