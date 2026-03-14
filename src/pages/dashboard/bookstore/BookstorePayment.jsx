// pages/bookstore/BookstorePayment.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function BookstorePayment() {
  const nav = useNavigate();
  const { state } = useLocation();
  const book = state?.book ?? { title: "Abstract Colors", price: 5600 };

  return (
    <div className="min-h-screen bg-[#2C14DD] px-6 md:px-12 py-10">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/15 transition"
          aria-label="Back"
        >
          ‹
        </button>

        <h1 className="text-white text-[22px] font-semibold">Payments</h1>
      </div>

      <div className="mt-14 grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
        {/* left */}
        <div className="text-center xl:text-left">
          <div className="mx-auto xl:mx-0 w-[170px] h-[120px] rounded-[22px] bg-white/10" />
          <p className="mt-10 text-white font-extrabold text-[44px]">
            ₦{Number(book.price).toLocaleString()}.00
          </p>
          <p className="mt-2 text-white/90 text-[18px]">
            Payment for: {book.title}
          </p>
        </div>

        {/* right */}
        <div className="bg-white rounded-[44px] p-8 md:p-12 max-w-[760px] mx-auto w-full">
          <div className="bg-[#F2F2F2] rounded-[18px] p-6 md:p-8">
            <div className="h-[340px] md:h-[420px] rounded-[14px] bg-white flex items-center justify-center text-[#9AA0B4]">
              Paystack UI goes here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
