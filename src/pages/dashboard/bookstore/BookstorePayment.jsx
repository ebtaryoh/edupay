import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookstoreApi } from "../../../api/bookstore";

export default function BookstorePayment() {
  const nav = useNavigate();
  const { state } = useLocation();
  
  const book = state?.book;
  const initialPaymentData = state?.paymentData;
  const [processing, setProcessing] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState("");

  if (!book) {
    return (
      <div className="min-h-screen bg-[#2C14DD] flex flex-col items-center justify-center p-10 text-white">
        <h2 className="text-2xl font-bold">Session Expired</h2>
        <p className="mt-4 opacity-70">No book information was found.</p>
        <button onClick={() => nav("/dashboard/bookstore")} className="mt-8 px-8 py-3 bg-white text-[#2C14DD] rounded-full font-bold">Return to Bookstore</button>
      </div>
    );
  }

  const handlePay = async () => {
    // 1. Pro Session Resolution
    let studentId = localStorage.getItem("studentId") || "";
    if (!studentId) {
      try {
        const { parseJwt } = await import("../../../api/http");
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = parseJwt(token);
          studentId = decoded?.studentId || decoded?.studentID || decoded?.id || decoded?.uid || "";
          if (studentId) localStorage.setItem("studentId", String(studentId));
        }
      } catch(e) { console.warn("[Bookstore] ID resolve failed in Checkout"); }
    }

    // 2. Already have paymentData?
    const existingUrl = initialPaymentData?.authorizationUrl || initialPaymentData?.authorization_url || initialPaymentData?.data?.authorizationUrl;
    if (existingUrl) {
       console.log("[Bookstore] SUCCESS: Redirecting to existing Paystack session ->", existingUrl);
       window.location.assign(existingUrl);
       return;
    }

    const bookId = book.id || book.value;
    if (!studentId) {
       alert("Verification failed. Please log in again to complete your purchase.");
       return;
    }
    
    setProcessing(true);
    setFallbackUrl("");

    let finalUrl = "";

    try {
      // 3. Pro Flow for Mock Books: Simulate Redirect
      if (book.isMock || bookId?.toString().startsWith("mock-")) {
        console.log("[Bookstore] Mock Trigger -> Simulating Paystack redirect");
        await new Promise(r => setTimeout(r, 1200));
        finalUrl = "https://checkout.paystack.com/mock-redirect";
        setFallbackUrl(finalUrl);
        window.location.assign(finalUrl);
        return;
      }

      // 4. Real Initiation
      const payload = { studentId, bookId, quantity: 1 };
      console.log("[Bookstore] INIT PAYLOAD:", payload);
      
      const res = await bookstoreApi.purchaseBook(bookId, studentId, payload);
      console.log("[Bookstore] RAW API RESPONSE:", res);

      const data = res?.data || res;
      console.log("[Bookstore] NORMALIZED DATA:", data);
      
      // Extensive Normalization (Master Level)
      const authUrl = 
        data?.authorizationUrl || 
        data?.data?.authorizationUrl || 
        data?.authorization_url || 
        data?.data?.authorization_url || 
        data?.url ||
        res?.authorizationUrl;

      if (authUrl) {
        console.log("[Bookstore] REDIRECTING TO PAYSTACK:", authUrl);
        finalUrl = authUrl;
        setFallbackUrl(authUrl);
        window.location.assign(authUrl);
      } else if (res?.succeeded === true && (res?.message?.includes("SUCCESSFUL") || res?.message?.includes("Already"))) {
        console.log("[Bookstore] SUCCESS WITHOUT PAYMENT: Routing to Library.");
        nav("/dashboard/bookstore/my-books");
      } else {
        console.warn("[Bookstore] No authorization URL found in response. Response was:", res);
        throw new Error(res?.message || "The server did not return a payment link. The book might already be in your library.");
      }
    } catch (err) {
      console.error("[Bookstore] TRANSACTION FAILED:", err);
      alert(err.message || "Something went wrong while initiating payment.");
    } finally {
      if (!finalUrl) setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2C14DD] px-6 md:px-12 py-10 flex flex-col">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/15 transition shadow-lg"
          aria-label="Back"
        >
          <span className="text-2xl mt-[-4px]">‹</span>
        </button>

        <h1 className="text-white text-[24px] font-bold tracking-tight">Checkout</h1>
      </div>

      <div className="flex-1 mt-14 grid grid-cols-1 xl:grid-cols-[1fr_620px] gap-16 items-center max-w-[1400px] mx-auto w-full">
        {/* left */}
        <div className="text-center xl:text-left space-y-6">
          <div className="mx-auto xl:mx-0 w-[200px] h-[280px] rounded-[32px] bg-white/10 overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
             {(book.coverPhoto || book.imageUrl || book.photo) ? (
               <img src={book.coverPhoto || book.imageUrl || book.photo} alt={book.title} className="w-full h-full object-cover" />
             ) : (
               <span className="text-white/20 text-4xl font-bold">PDF</span>
             )}
          </div>
          <div>
            <p className="text-white/60 text-lg font-medium">Author: {book.publisherName || book.author || book.authorName || "Unknown"}</p>
            <h2 className="mt-2 text-white font-black text-[56px] leading-[1.1]">
              ₦{Number(book.price || 0).toLocaleString()}
            </h2>
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-2xl border border-white/5">
               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
               <p className="text-white/90 text-base font-semibold">
                Secure payment for: <span className="text-white underline decoration-white/30 underline-offset-4 ml-1">{book.title}</span>
               </p>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="bg-white rounded-[50px] p-10 md:p-14 shadow-2xl shadow-blue-900/40 w-full relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-indigo-600" />
          
          <div className="flex items-center justify-between mb-10">
             <div className="space-y-1">
                <p className="text-[#14143A] font-black text-2xl uppercase tracking-tighter">Paystack</p>
                <p className="text-[#9AA0B4] text-xs font-bold uppercase tracking-widest">Secured Payment Gateway</p>
             </div>
             <div className="w-12 h-12 bg-[#F3F4FF] rounded-2xl flex items-center justify-center">
                <span className="text-[#2C14DD] text-xl font-bold">💳</span>
             </div>
          </div>

          <div className="bg-[#F9FAFF] rounded-[32px] p-8 border border-[#E7E9FF]">
            <div className="space-y-6">
               <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <span className="text-[#9AA0B4] font-medium text-sm">Amount to Pay</span>
                  <span className="text-[#14143A] font-black text-xl">₦{Number(book.price || 0).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <span className="text-[#9AA0B4] font-medium text-sm">Reference</span>
                  <span className="text-[#14143A] font-mono text-sm font-bold italic opacity-60">
                    {initialPaymentData?.reference || initialPaymentData?.payment_reference || "Generated on payment"}
                  </span>
               </div>
               <div className="py-2">
                 <p className="text-[#8A90A6] text-xs leading-relaxed text-center italic">
                   You will be redirected to Paystack to complete your transaction securely.
                 </p>
               </div>
            </div>
          </div>

          {fallbackUrl ? (
             <div className="mt-8 p-6 bg-blue-50 rounded-[28px] border border-blue-100 animate-in fade-in slide-in-from-top-4">
                <p className="text-[#2C14DD] text-sm font-bold text-center">Redirecting you to Paystack...</p>
                <p className="mt-2 text-[#9AA0B4] text-xs text-center leading-relaxed">
                  If the payment page doesn't open automatically, please click the button below manually:
                </p>
                <a
                  href={fallbackUrl}
                  className="mt-6 w-full h-14 rounded-2xl bg-white border-2 border-[#2C14DD] text-[#2C14DD] text-sm font-extrabold flex items-center justify-center hover:bg-blue-50 transition"
                >
                  Click Here to Pay
                </a>
             </div>
           ) : (
             <button
               onClick={handlePay}
               disabled={processing}
               className="mt-10 w-full h-18 rounded-[24px] bg-[#2C14DD] text-white text-lg font-black shadow-xl shadow-blue-200 transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 group/btn h-16 disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {processing ? (
                 <>
                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Redirecting...
                 </>
               ) : (
                 <>
                   Complete Payment
                   <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover/btn:translate-x-2 transition-transform">→</span>
                 </>
               )}
             </button>
           )}
        </div>
      </div>
    </div>
  );
}
