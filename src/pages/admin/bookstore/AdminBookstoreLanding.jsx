import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminBookCard,
  AdminBookstoreHeader,
  NewReleasesTray,
} from "../../../components/admin/bookstore/AdminBookstoreShared";
import { bookstoreApi } from "../../../api/bookstore";

export default function AdminBookstoreLanding() {
  const nav = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await bookstoreApi.getAllBooks();
        const data = res?.data || res || [];
        setBooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("ADMIN BOOKSTORE FETCH ERROR:", err);
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
    return books.filter(b => (b.category || b.genre) === activeCat);
  }, [books, activeCat]);

  const handleBuy = (id, book) => {
    nav(`/admin/dashboard/bookstore/${id}`, { state: { book } });
  };

  return (
    <div className="min-h-[calc(100vh-24px)] min-w-[1440px] rounded-[30px] bg-[#2A16DF] px-6 py-7 text-white md:px-8 pb-8 flex flex-col">
      <AdminBookstoreHeader title="Bookstore" />

      <div className="mt-8">
        <p className="max-w-[440px] text-[18px] leading-[1.4] text-white/90">
          Buy textbooks, course materials and stay-up-to date with new publications in your institution.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveCat(item)}
              className={[
                "h-[40px] cursor-pointer rounded-full px-7 text-[15px] font-medium transition",
                item === activeCat
                  ? "bg-white text-[#1F2340] shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-white/60">Loading books...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white/60">No books found for this category.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mb-10">
            {filtered.slice(0, 8).map((book) => (
              <AdminBookCard
                key={book.id}
                title={book.title || book.bookName}
                author={book.author || book.authorName || "Unknown Author"}
                price={book.price ? `₦${Number(book.price).toLocaleString()}` : book.priceText || ""}
                buttonLabel="View"
                onClick={() => nav(`/admin/dashboard/bookstore/${book.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <NewReleasesTray books={books} onBuy={handleBuy} className="border border-white/5" />
      </div>
    </div>
  );
}