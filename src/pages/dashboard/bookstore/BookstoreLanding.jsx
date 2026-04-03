import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookstoreApi } from "../../../api/bookstore";
import { Search, ChevronDown, Heart, ChevronLeft } from "lucide-react";

function BookCard({ book, onBuy }) {
  return (
    <div className="bg-[#F2F4FF] rounded-[18px] p-4">
      <div className="relative bg-[#BDBDBD] rounded-[14px] h-[140px] overflow-hidden">
        {book.coverPhoto || book.imageUrl || book.photo ? (
          <img src={book.coverPhoto || book.imageUrl || book.photo} alt={book.title} className="w-full h-full object-cover" />
        ) : null}
        <button
          type="button"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm text-[#2C14DD] hover:brightness-95 transition"
          aria-label="Like"
        >
          <Heart size={14} fill="currentColor" />
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
            className="h-8 px-4 rounded-full bg-[#2C14DD] text-white text-xs font-semibold hover:brightness-110 transition cursor-pointer"
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
    <div className="bg-[#F9FAFF] rounded-[34px] p-6 shadow-sm border border-black/5 mt-8 max-w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-[22px] font-extrabold text-[#14143A]">New Releases</h3>

        <div className="flex items-center gap-4">
          <div className="h-10 px-4 rounded-full bg-white border border-gray-100 flex items-center gap-2 text-[#8A90A6] text-[13px] w-[200px] shadow-sm">
            <Search size={16} className="text-[#8A90A6]" />
            Search Bookstore
          </div>
          <button type="button" className="flex items-center gap-2 text-[14px] text-[#555B7D] font-medium cursor-pointer hover:text-[#14143A] transition">
            Sorting
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {books.slice(0, 5).map((b) => (
          <div key={b.id} className="bg-white rounded-[18px] p-3 w-[220px] shrink-0 shadow-sm border border-gray-50 flex gap-3">
             <div className="w-[80px] h-[100px] bg-[#BDBDBD] rounded-xl overflow-hidden shrink-0">
               {(b.coverPhoto || b.imageUrl || b.photo) && (
                 <img src={b.coverPhoto || b.imageUrl || b.photo} alt={b.title} className="w-full h-full object-cover" />
               )}
             </div>
             <div className="flex flex-col justify-center min-w-0 flex-1">
                 <p className="text-[13px] font-bold text-[#14143A] truncate">{b.title}</p>
                 <p className="text-[11px] text-[#8A90A6] mt-1 truncate">By {b.author}</p>
                 <p className="text-[#2C14DD] font-extrabold text-[15px] mt-2">₦{b.price.toLocaleString()}</p>
                 <button className="text-[10px] bg-[#2C14DD] text-white px-3 py-1.5 rounded-full font-semibold w-fit mt-2 cursor-pointer hover:brightness-110">
                    Buy
                 </button>
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 flex items-center justify-center gap-2">
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
  const [activeCat, setActiveCat] = useState("All");
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await bookstoreApi.getAllBooks();
        const data = res?.data || res || [];
        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FAILED TO FETCH BOOKSTORE:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(books.map(b => b.category || b.genre).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [books]);

  const filtered = useMemo(() => {
    if (activeCat === "All") return books;
    return books.filter((b) => (b.category || b.genre) === activeCat);
  }, [books, activeCat]);

  return (
    <div className="min-w-[1440px] min-h-[calc(100vh-24px)] bg-[#2C14DD] rounded-[28px] p-6 md:p-10 pb-20 flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => nav(-1)}
            className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-lg text-[#14143A] hover:bg-gray-50 transition cursor-pointer"
            aria-label="Back"
          >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
          <h1 className="text-white text-[22px] font-semibold">Bookstore</h1>
        </div>
      </div>

      <div className="mt-8">
          <p className="max-w-[420px] text-white/90 text-[18px] leading-relaxed font-medium">
            Buy textbooks, course materials and stay-up-to date with new publications in your institution.
          </p>
      </div>

      {/* categories row */}
      <div className="mt-10 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCat(c)}
            className={[
              "px-6 py-[10px] rounded-full transition text-[15px] font-medium cursor-pointer whitespace-nowrap",
              c === activeCat ? "bg-white text-[#2C14DD] shadow-sm" : "bg-white/10 text-white hover:bg-white/20",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-white/50">Loading books...</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-white/50">No books found for this category.</p>
      ) : (
         <div className="flex-1 mt-8 hidden xl:block" />
      )}

      {/* The tray takes full width on large screens and sits at bottom */}
      <div className="mt-8 xl:mt-0 relative w-full rounded-t-[34px] overflow-hidden bg-white/5 p-4 xl:p-0 xl:bg-transparent -mx-4 xl:mx-0 px-4 xl:px-0">
          <ReleaseTray books={books} />
      </div>
    </div>
  );
}
