import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  ShoppingCart,
  Heart,
} from "lucide-react";
import React from "react";
import bookIcon from "../../../assets/book-3d-icon-png-download-8027322 1.png";

export function AdminBookstoreHeader({ title = "Bookstore", backTo = null, onCartClick = null }) {
  const nav = useNavigate();

  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => (backTo ? nav(backTo) : nav(-1))}
          className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-white text-[#161B32] transition hover:bg-white/90 shadow-sm"
        >
          <BackIcon />
        </button>
        <h1 className="text-[20px] font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => nav("/admin/dashboard/bookstore/add")}
          className="flex h-[42px] cursor-pointer items-center justify-center rounded-full bg-white px-5 text-[14px] font-semibold text-[#1F2340] transition hover:bg-white/90 sm:px-6"
        >
          Add Book
        </button>

        <button
          type="button"
          onClick={onCartClick}
          className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full bg-[#1366D9] text-white transition hover:bg-[#1366D9]/90"
        >
          <div className="relative">
            <ShoppingCart size={18} />
            <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF4C4C] text-[9px] font-bold text-white">
              2
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export function BookSearchBar({ className = "" }) {
  return (
    <div className={["flex h-[42px] items-center gap-2 rounded-full border border-gray-100 bg-white px-4 shadow-sm", className].join(" ")}>
      <Search size={18} className="text-[#8E94A9]" />
      <input
        type="text"
        placeholder="Search Bookstore"
        className="w-full bg-transparent text-[13px] text-[#2F3446] placeholder-[#8E94A9] outline-none"
      />
    </div>
  );
}

export function SortingControl() {
  return (
    <div className="flex items-center gap-2 text-[15px] text-[#555B7D] cursor-pointer hover:text-[#14143A] transition">
      <span className="font-medium">Sorting</span>
      <Filter size={18} strokeWidth={2.5} />
    </div>
  );
}

export function CategoryBreadcrumb({ category = "Education" }) {
  return (
    <div className="mb-6 flex items-center gap-2 text-[13px]">
      <span className="text-[#9AA0B4]">Bookstore</span>
      <span className="text-[#9AA0B4]">/</span>
      <span className="font-medium text-[#1F2340]">{category}</span>
    </div>
  );
}

export function BookCover({ value = null, narrow = false, fullSize = false, className = "" }) {
  const isString = typeof value === "string";

  if (fullSize) {
    return (
      <div className={["flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] bg-white", className].join(" ")}>
        {isString && value ? (
          <img src={value} alt="Cover" className="h-full w-full object-cover rounded-[18px]" />
        ) : (
          <img src={bookIcon} alt="Book" className="h-[210px] w-auto opacity-90" />
        )}
      </div>
    );
  }

  return (
    <div
      className={[
        "relative flex items-center justify-center overflow-hidden rounded-[14px] bg-[#F1F2FB]",
        narrow ? "h-[85px] w-[65px]" : "h-[140px] w-full",
        className,
      ].join(" ")}
    >
      {isString && value ? (
        <img src={value} alt="Cover" className="h-full w-full object-cover" />
      ) : (
        <img
          src={bookIcon}
          alt="Book"
          className={narrow ? "h-12 w-auto opacity-80" : "h-20 w-auto opacity-70"}
        />
      )}

      {/* Love icon */}
      {!narrow && (
        <button
          type="button"
          className="absolute right-3 top-3 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[#2C14DD] shadow-sm hover:scale-105 transition"
        >
          <Heart size={14} fill="currentColor" />
        </button>
      )}
    </div>
  );
}

export function ReleaseCard({ narrow = false, book = {}, onClick }) {
  if (!book || !book.id)
    return (
      <div className={narrow ? "w-[72px] shrink-0" : "w-[240px] shrink-0"}>
        <div className="rounded-[18px] bg-[#F2F4FF] p-4 opacity-50 shadow-sm border border-black/5" />
      </div>
    );
  return (
    <div className={narrow ? "w-[72px] shrink-0" : "w-[240px] shrink-0"}>
      <div className="rounded-[22px] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/5">
        <BookCover narrow={narrow} className={narrow ? "mx-auto" : ""} value={book.coverPhoto || book.imageUrl || book.photo} />

        <div className="mt-4 flex flex-col justify-between">
          <div>
            <h3 className="truncate text-[15px] font-bold text-[#14143A]">
              {book.title || book.bookName}
            </h3>
            <p className="mt-1 text-[11px] text-[#8A90A6]">By {book.author || book.authorName || "Unknown"}</p>
          </div>
          
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-[16px] font-extrabold text-[#2C14DD]">₦{Number(book.price).toLocaleString()}</p>
  
            {!narrow ? (
              <button
                type="button"
                onClick={onClick}
                className="h-[30px] min-w-[50px] cursor-pointer rounded-full bg-[#2C14DD] px-4 text-[11px] font-bold text-white transition hover:brightness-110"
              >
                Buy
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewReleasesTray({ books = [], onBuy, className = "" }) {
  return (
    <div className={["rounded-[40px] bg-white p-6 text-[#161B32] shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:p-8", className].join(" ")}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[24px] font-extrabold text-[#14143A]">New Releases</h2>

        <div className="flex items-center gap-4">
          <BookSearchBar className="w-[230px]" />
          <SortingControl />
        </div>
      </div>

      <div className="mt-8 flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        <ReleaseCard narrow book={books[0]} />
        <ReleaseCard book={books[1]} onClick={() => onBuy?.(books[1]?.id, books[1])} />
        <ReleaseCard book={books[2]} onClick={() => onBuy?.(books[2]?.id, books[2])} />
        <ReleaseCard book={books[3]} onClick={() => onBuy?.(books[3]?.id, books[3])} />
        <ReleaseCard narrow book={books[4]} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className={[
              "h-[7px] w-[7px] rounded-full",
              i === 2 ? "bg-[#2C14DD]" : "bg-[#D7DAF5]",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

export function AdminBookCard({
  title = "Abstract Colors",
  author = "By James Akande",
  price = "₦5,600",
  buttonLabel = "Buy",
  onClick,
}) {
  return (
    <div className="rounded-[20px] bg-white p-4 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/5">
      <div>
        <BookCover />
        <div className="mt-4">
          <h3 className="truncate text-[15px] font-bold text-[#14143A]">{title}</h3>
          <p className="mt-1 text-[11px] text-[#8A90A6]">{author}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[16px] font-extrabold text-[#2C14DD]">{price}</p>

        <button
          type="button"
          onClick={onClick}
          className="h-[30px] min-w-[50px] cursor-pointer rounded-full bg-[#2C14DD] px-4 text-[11px] font-bold text-white transition hover:brightness-110"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}