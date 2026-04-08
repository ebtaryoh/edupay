import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Trash2, Pencil } from "lucide-react";
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
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      let institutionId = localStorage.getItem("institutionId") || "";
      
      if (!institutionId) {
        try {
          const { parseJwt } = await import("../../../api/http");
          const token = localStorage.getItem("token");
          if (token) {
            const decoded = parseJwt(token);
            institutionId = 
              decoded?.institutionId || 
              decoded?.instid || 
              decoded?.institutionID || 
              decoded?.InstitutionId || 
              "";
            if (institutionId) localStorage.setItem("institutionId", institutionId);
          }
        } catch(e) {
          console.warn("[AdminBookstore] JWT parse failed during fetch");
        }
      }

      console.log("[AdminBookstore] Syncing library with institutionId:", institutionId || "(anonymous)");
      const res = await bookstoreApi.getAllBooks({ InstitutionId: institutionId || undefined });

      // Robust response parsing
      let finalData = [];
      const d = res?.data || res;
      
      if (Array.isArray(d)) {
         finalData = d;
      } else if (d && typeof d === 'object') {
         if (Array.isArray(d.items)) finalData = d.items;
         else if (Array.isArray(d.data)) finalData = d.data;
         else if (Array.isArray(d.books)) finalData = d.books;
      }

      setBooks(finalData);
    } catch (err) {
      console.error("ADMIN BOOKSTORE FETCH ERROR:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const reverseCategoryMap = {
    0: "General", 1: "Science", 2: "Arts", 3: "Engineering",
    4: "Medicine", 5: "Social Sciences", 6: "Law", 7: "Business"
  };

  const categories = useMemo(() => {
    const cats = new Set(books.map(b => {
      const c = b.category ?? b.genre;
      return typeof c === "number" ? reverseCategoryMap[c] : c;
    }).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [books]);

  const filtered = useMemo(() => {
    if (activeCat === "All") return books;
    return books.filter(b => {
      const c = b.category ?? b.genre;
      const catString = typeof c === "number" ? reverseCategoryMap[c] : c;
      return catString === activeCat;
    });
  }, [books, activeCat]);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) return;
    
    try {
      setRefreshing(true);
      await bookstoreApi.deleteBook(bookId);
      await fetchBooks();
    } catch (err) {
      alert("Failed to delete book: " + (err.message || "Unknown error"));
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-24px)] max-w-[1440px] mx-auto w-full rounded-[40px] bg-[#2A16DF] px-6 lg:px-12 py-10 text-white pb-20 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      
      <AdminBookstoreHeader title="Manage Bookstore" />

      <div className="relative z-10 mt-10">
        <h2 className="text-4xl font-black tracking-tight">Inventory</h2>
        <p className="mt-3 max-w-[480px] text-lg text-white/70 font-medium">
          Monitor your institution's bookstore inventory. Add, edit, or remove academic materials in real-time.
        </p>
      </div>

      <div className="relative z-10 mt-12 flex items-center justify-between gap-6 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex items-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveCat(item)}
              className={[
                "h-[46px] cursor-pointer rounded-[18px] px-8 text-sm font-bold transition-all border whitespace-nowrap",
                item === activeCat
                  ? "bg-white text-[#2C14DD] shadow-xl border-white"
                  : "bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-10 flex-1">
        {loading || refreshing ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-4 text-white/30">
             <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em]">Syncing Library</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-center bg-white/5 rounded-[40px] border border-white/10 p-12">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/20">
                <Search size={32} />
             </div>
             <h3 className="text-white font-bold text-xl">Inventory Empty</h3>
             <p className="text-white/40 mt-2">Start by adding your first academic book to the library.</p>
             <button 
               onClick={() => nav("/admin/dashboard/bookstore/add")}
               className="mt-8 px-8 py-3 bg-white text-[#2C14DD] rounded-full font-bold hover:scale-105 transition shadow-lg"
             >
               Add Book Now
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filtered.map((book) => (
              <div key={book.id || book.bookId || book.value} className="group relative">
                <AdminBookCard
                  title={book.title || book.bookName}
                  author={book.publisherName || book.author || book.authorName || "Unknown Author"}
                  price={book.price ? `₦${Number(book.price).toLocaleString()}` : "N/A"}
                  imageUrl={book.imageUrl || book.coverPhoto || book.photo}
                  buttonLabel="Details"
                  onClick={() => nav(`/admin/dashboard/bookstore/${book.id || book.bookId || book.value}`, { state: { book } })}
                />
                <button
                  onClick={() => handleDelete(book.id || book.bookId || book.value)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-500 hover:text-white shadow-sm"
                  title="Delete Book"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => nav(`/admin/dashboard/bookstore/${book.id || book.bookId || book.value}/edit`, { state: { book } })}
                  className="absolute top-2 right-12 w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-blue-500 hover:text-white shadow-sm"
                  title="Edit Book"
                >
                  <Pencil size={14} />
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-16 pt-10 border-t border-white/10">
        <NewReleasesTray books={books} onBuy={(id, b) => nav(`/admin/dashboard/bookstore/${id}`, { state: { book: b } })} />
      </div>
    </div>
  );
}