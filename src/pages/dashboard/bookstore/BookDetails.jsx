// pages/dashboard/bookstore/BookDetails.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";

function SimilarCard({ onBuy }) {
  return (
    <div className="bg-[#F2F4FF] rounded-[18px] p-4">
      <div className="relative bg-[#BDBDBD] rounded-[14px] h-[110px]">
        <button
          type="button"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center"
          aria-label="Like"
        >
          <span className="text-[#2C14DD] text-sm">♡</span>
        </button>
      </div>

      <p className="mt-4 text-[12px] font-semibold text-[#14143A]">Abstract Colors</p>
      <p className="text-[10px] text-[#8A90A6] mt-1">By James Akande</p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[#2C14DD] font-extrabold text-[13px]">₦5,600</p>
        <button
          type="button"
          onClick={onBuy}
          className="h-7 px-4 rounded-full bg-[#2C14DD] text-white text-[11px] font-semibold"
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default function BookDetails() {
  const nav = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const book = state?.book ?? { id, title: "Abstract Colors", author: "James Akande", price: 5600 };

  return (
    <div className="min-h-[calc(100vh-24px)] bg-white rounded-[28px] p-6 md:p-10">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="w-12 h-12 rounded-full bg-[#F3F4FF] text-[#14143A] flex items-center justify-center hover:bg-[#ECEEFF] transition"
          aria-label="Back"
        >
          ‹
        </button>

        <h1 className="text-[#14143A] text-[18px] font-semibold">Bookstore</h1>
      </div>

      {/* search */}
      <div className="mt-6">
        <div className="h-10 w-[220px] rounded-full bg-[#F3F4FF] flex items-center gap-2 px-4 text-[#8A90A6] text-sm">
          <span className="text-[#2C14DD]">⌕</span>
          Search Bookstore
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-10">
        {/* left */}
        <div>
          <div className="flex items-start gap-6">
            <div className="w-[160px] h-[110px] rounded-[18px] bg-[#BDBDBD]" />
            <div className="flex-1 min-w-0">
              <p className="text-[#14143A] font-semibold truncate">{book.title}</p>
              <p className="text-[#8A90A6] text-xs mt-1">By {book.author}</p>

              <div className="mt-4 flex items-center gap-4">
                <p className="text-[#2C14DD] font-extrabold text-[20px]">
                  ₦{Number(book.price).toLocaleString()}
                </p>
                <button
                  type="button"
                  onClick={() => nav("/bookstore/payment", { state: { book } })}
                  className="h-9 px-7 rounded-full bg-[#2C14DD] text-white text-sm font-semibold"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>

          <h2 className="mt-10 text-[#14143A] font-extrabold text-[22px]">Description</h2>

          <p className="mt-4 text-[#8A90A6] text-sm leading-relaxed max-w-[620px]">
            Making payment on EDUPay is easy as a breeze. Payments are completed in 3-steps in the app.
            Go to “Payments” and select the fee to be paid and make payment.
          </p>

          <p className="mt-4 text-[#8A90A6] text-sm leading-relaxed max-w-[620px]">
            Making payment on EDUPay is easy as a breeze. Payments are completed in 3-steps in the app.
            Go to “Payments” and select the fee to be paid and make payment...
          </p>
        </div>

        {/* right */}
        <div>
          <h3 className="text-[#14143A] font-extrabold text-[18px] mb-4">Books in same category</h3>

          <div className="grid grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SimilarCard
                key={i}
                onBuy={() => nav(`/dashboard/bookstore/${String(i + 20)}`, { state: { book } })}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className={[
                  "w-2 h-2 rounded-full",
                  i === 2 ? "bg-[#2C14DD]" : "bg-[#D7DAF5]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
