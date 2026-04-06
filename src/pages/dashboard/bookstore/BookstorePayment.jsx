import { useLocation, useNavigate } from "react-router-dom";

export default function BookstorePayment() {
  const nav = useNavigate();
  const { state } = useLocation();
  
  const book = state?.book;
  const paymentData = state?.paymentData;

  if (!book || !paymentData) {
    return (
      <div className="min-h-screen bg-[#2C14DD] flex flex-col items-center justify-center p-10 text-white">
        <h2 className="text-2xl font-bold">Session Expired</h2>
        <p className="mt-4 opacity-70">No payment information was found.</p>
        <button onClick={() => nav("/dashboard/bookstore")} className="mt-8 px-8 py-3 bg-white text-[#2C14DD] rounded-full font-bold">Return to Bookstore</button>
      </div>
    );
  }

  const handlePay = () => {
    if (paymentData.authorizationUrl) {
      window.location.href = paymentData.authorizationUrl;
    } else {
      alert("Authorization URL not found. Please contact support.");
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
            <p className="text-white/60 text-lg font-medium">Author: {book.author}</p>
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
                  <span className="text-[#14143A] font-mono text-sm font-bold">{paymentData.reference || "EDP-REF-ID"}</span>
               </div>
               <div className="py-2">
                 <p className="text-[#8A90A6] text-xs leading-relaxed text-center italic">
                   You will be redirected to Paystack to complete your transaction securely.
                 </p>
               </div>
            </div>
          </div>

          <button
            onClick={handlePay}
            className="mt-10 w-full h-18 rounded-[24px] bg-[#2C14DD] text-white text-lg font-black shadow-xl shadow-blue-200 transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 group/btn h-16"
          >
            Complete Payment
            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover/btn:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
