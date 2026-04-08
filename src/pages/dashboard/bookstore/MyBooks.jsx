import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, ShoppingBag } from "lucide-react";
import { bookstoreApi } from "../../../api/bookstore";

function BookCard({ book, onView }) {
  return (
    <div className="bg-white rounded-[22px] border border-[#E7E9FF] overflow-hidden shadow-[0_8px_24px_rgba(44,20,221,0.06)] flex flex-col transition hover:shadow-[0_14px_36px_rgba(44,20,221,0.12)] hover:-translate-y-1">
      {/* Cover */}
      <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#EEF0FF] to-[#D8D5FF] flex items-center justify-center overflow-hidden">
        {book.imageUrl || book.coverImage ? (
          <img
            src={book.imageUrl || book.coverImage}
            alt={book.name || book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <BookOpen size={48} className="text-[#2C14DD] opacity-30" />
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-bold text-[#14143A] text-[15px] leading-snug line-clamp-2">
          {book.name || book.title || "Untitled Book"}
        </h3>
        <p className="text-xs text-[#9AA0B4]">
          {book.author || book.bookAuthor || "Unknown Author"}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#F0F2FF]">
          <span className="text-xs font-semibold text-[#2C14DD]">
            ₦{Number(book.price || book.amountPaid || 0).toLocaleString()}
          </span>
          <span className="text-[10px] px-2 py-1 bg-[#E6FFEE] text-green-700 rounded-full font-semibold">
            Purchased
          </span>
        </div>
        <button
          onClick={() => onView(book.bookId || book.id)}
          className="mt-2 w-full h-10 rounded-full bg-[#2C14DD] text-white text-sm font-semibold transition hover:opacity-90 active:scale-95"
        >
          View Book
        </button>
      </div>
    </div>
  );
}

export default function MyBooks() {
  const nav = useNavigate();
  const studentId = localStorage.getItem("studentId") || "";

  const [purchases, setPurchases] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchMyBooks() {
      try {
        setLoading(true);
        
        // --- PRO SESSION REPAIR ---
        let resolvedId = localStorage.getItem("studentId") || "";
        try {
          const { parseJwt } = await import("../../../api/http");
          const token = localStorage.getItem("token");
          if (token) {
            const decoded = parseJwt(token);
            // Strictly prefer studentId profile claim over userId/uid
            const tid = decoded?.studentId || decoded?.studentID || decoded?.id || decoded?.uid || "";
            if (tid && String(tid) !== resolvedId) {
              resolvedId = String(tid);
              localStorage.setItem("studentId", resolvedId);
            }
          }
        } catch(e) { console.warn("[MyBooks] Session repair failed"); }

        if (!resolvedId) {
          setLoading(false);
          return;
        }
        // ---------------------------

        const [purchasesRes, spentRes] = await Promise.all([
          bookstoreApi.getAllPurchasedBooks({ StudentId: resolvedId, PageSize: 100 }),
          bookstoreApi.getTotalAmountSpent(resolvedId).catch(() => ({ data: 0 })),
        ]);

        const data = purchasesRes?.data || purchasesRes || [];
        setPurchases(Array.isArray(data) ? data : []);
        setTotalSpent(spentRes?.data || spentRes || 0);
      } catch (err) {
        // PRO TOUCH: Gracefully handle record not found by showing an empty library instead of an error string
        if (err.message?.includes("NOT FOUND") || err.status === 404) {
          console.log("[MyBooks] Active student profile not found on bookstore server. Showing empty library.");
          setPurchases([]);
          setTotalSpent(0);
        } else {
          console.error("MY BOOKS FETCH FAILED:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMyBooks();
  }, [studentId]);

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return purchases.filter(
      (p) =>
        (p.name || p.title || p.bookName || "").toLowerCase().includes(q) ||
        (p.author || p.bookAuthor || "").toLowerCase().includes(q)
    );
  }, [purchases, searchTerm]);

  return (
    <div className="max-w-[960px]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-extrabold text-[#14143A] tracking-tight">
            My Books
            {purchases.length > 0 && (
              <span className="ml-2 text-[16px] font-semibold text-[#2C14DD]">
                ({purchases.length})
              </span>
            )}
          </h2>
          {totalSpent > 0 && (
            <p className="text-sm text-[#9AA0B4] mt-1">
              Total spent:{" "}
              <span className="font-semibold text-[#2C14DD]">
                ₦{Number(totalSpent).toLocaleString()}
              </span>
            </p>
          )}
        </div>
        <button
          onClick={() => nav("/dashboard/bookstore")}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#2C14DD] text-white text-sm font-semibold transition hover:opacity-90 active:scale-95"
        >
          <ShoppingBag size={16} />
          Browse Bookstore
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-[440px]">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA0B4]" />
        <input
          type="text"
          placeholder="Search your books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-full bg-[#F6F7FF] border border-[#E7E9FF] text-sm text-[#14143A] placeholder:text-[#9AA0B4] focus:outline-none focus:ring-2 focus:ring-[#2C14DD]/30"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[22px] bg-[#F1F2FF] aspect-[3/4] animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <BookOpen size={56} strokeWidth={1.5} className="text-[#E7E9FF]" />
          <p className="text-lg font-semibold text-[#9AA0B4]">
            {searchTerm ? "No books match your search." : "You haven't purchased any books yet."}
          </p>
          {!searchTerm && (
            <button
              onClick={() => nav("/dashboard/bookstore")}
              className="mt-2 h-11 px-8 rounded-full bg-[#2C14DD] text-white text-sm font-semibold transition hover:opacity-90"
            >
              Go to Bookstore
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((purchase, i) => (
            <BookCard
              key={purchase.id || purchase.bookId || i}
              book={purchase}
              onView={(bookId) => nav(`/dashboard/bookstore/${bookId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
