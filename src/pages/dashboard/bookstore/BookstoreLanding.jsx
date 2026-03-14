// pages/dashboard/bookstore/BookstoreLanding.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookCard({ book, onBuy }) {
  return (
    <div className="bg-[#F2F4FF] rounded-[18px] p-4">
      <div className="relative bg-[#BDBDBD] rounded-[14px] h-[140px] overflow-hidden">
        <button
          type="button"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center"
          aria-label="Like"
        >
          <span className="text-[#2C14DD] text-sm">♡</span>
        </button>
      </div>

      <div className="mt-4">
        <p className="text-[13px] font-semibold text-[#14143A] truncate">{book.title}</p>
        <p className="text-[11px] text-[#8A90A6] mt-1 truncate">By {book.author}</p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[#2C14DD] font-extrabold">₦{book.price.toLocaleString()}</p>
          <button
            type="button"
            onClick={onBuy}
            className="h-8 px-4 rounded-full bg-[#2C14DD] text-white text-xs font-semibold"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

function ReleaseTray({ books }) {
  return (
    <div className="bg-white rounded-[34px] p-6 md:p-7 shadow-sm">
      <div className="flex items-center gap-4">
        <h3 className="text-[22px] font-extrabold text-[#14143A] flex-1">New Releases</h3>

        <div className="hidden sm:flex items-center gap-3">
          <div className="h-10 px-4 rounded-full bg-[#F3F4FF] flex items-center gap-2 text-[#8A90A6] text-sm">
            <span className="text-[#2C14DD]">⌕</span>
            Search Bookstore
          </div>

          <div className="text-[#8A90A6] text-sm flex items-center gap-2">
            Sorting
            <span className="text-[#2C14DD]">⏷</span>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-[700px]">
          {books.slice(0, 4).map((b) => (
            <div key={b.id} className="bg-[#F2F4FF] rounded-[18px] p-4 w-[240px]">
              <div className="relative bg-[#BDBDBD] rounded-[14px] h-[120px]" />
              <p className="mt-4 text-[13px] font-semibold text-[#14143A] truncate">{b.title}</p>
              <p className="text-[11px] text-[#8A90A6] mt-1 truncate">By {b.author}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-[#2C14DD] font-extrabold">₦{b.price.toLocaleString()}</p>
                <button className="h-8 px-4 rounded-full bg-[#2C14DD] text-white text-xs font-semibold">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
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
  );
}

export default function BookstoreLanding() {
  const nav = useNavigate();
  const [activeCat, setActiveCat] = useState("Art");

  const books = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: String(i + 1),
        title: "Abstract Colors",
        author: "James Akande",
        price: 5600,
        category: ["Art", "Music", "Collectibles", "Sports"][i % 4],
      })),
    []
  );

  const categories = ["Art", "Music", "Collectibles", "Sports"];
  const filtered = books.filter((b) => b.category === activeCat);

  return (
    <div className="min-h-[calc(100vh-24px)] bg-[#2C14DD] rounded-[28px] p-6 md:p-10">
      {/* header */}
      <div className="flex items-start gap-6">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/15 transition"
          aria-label="Back"
        >
          ‹
        </button>

        <div className="flex-1">
          <h1 className="text-white text-[20px] font-semibold">Bookstore</h1>
          <p className="mt-6 max-w-[260px] text-white/90 text-sm leading-relaxed">
            Buy textbooks, course materials and stay-up-to date with new publications in your institution.
          </p>
        </div>

        {/* right tray */}
        <div className="hidden xl:block w-[720px]">
          <ReleaseTray books={books} />
        </div>
      </div>

      {/* categories row + view all */}
      <div className="mt-10 flex items-center gap-6">
        <div className="flex items-center gap-8 text-white/85 text-sm">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCat(c)}
              className={[
                "px-6 py-2 rounded-full transition",
                c === activeCat ? "bg-white text-[#2C14DD] font-semibold" : "hover:text-white",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <button type="button" className="text-white text-sm font-semibold hover:text-white/90">
          View All  ›
        </button>
      </div>

      {/* grid */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {filtered.map((b) => (
          <BookCard
            key={b.id}
            book={b}
            onBuy={() => nav(`/dashboard/bookstore/${b.id}`, { state: { book: b } })}
          />
        ))}
      </div>

      {/* On smaller screens show releases tray below */}
      <div className="mt-10 xl:hidden">
        <ReleaseTray books={books} />
      </div>
    </div>
  );
}
