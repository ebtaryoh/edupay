import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AdminBookstoreHeader,
  BookCover,
  BookSearchBar,
  AdminPrimaryAction,
} from "../../../components/admin/bookstore/AdminBookstoreShared";
import { bookstoreApi } from "../../../api/bookstore";

export default function AdminBookstoreBookDetails() {
  const nav = useNavigate();
  const { bookId } = useParams();
  const { state } = useLocation();
  const [book, setBook] = useState(state?.book || null);
  const [loading, setLoading] = useState(!state?.book);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const res = await bookstoreApi.getBookDetails(bookId);
        setBook(res?.data || res);
      } catch (err) {
        console.error("ADMIN FETCH BOOK ERROR:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [bookId]);

  if (loading) {
    return <div className="p-10 text-white/50 italic">Loading book details...</div>;
  }

  if (!book) {
    return <div className="p-10 text-white font-bold">Book not found or error loading data.</div>;
  }

  const price = book.price ? `₦${Number(book.price).toLocaleString()}` : "N/A";
  const coverImg = book.coverPhoto || book.imageUrl || book.photo;

  return (
    <div className="min-h-[calc(100vh-24px)] px-4 py-7 md:px-6 max-w-[1440px] mx-auto w-full">
      <AdminBookstoreHeader title="Viewing Book" backTo="/admin/dashboard/bookstore" />

      <div className="mt-12 grid grid-cols-1 gap-12 xl:grid-cols-[460px_minmax(0,1fr)] bg-white rounded-[40px] p-8 lg:p-12 shadow-xl border border-gray-100">
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
            <div className="relative w-[280px] h-[400px] shrink-0 rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <BookCover fullSize value={coverImg} />
            </div>

            <div className="pt-4 text-center sm:text-left flex-1 min-w-0">
              <div className="inline-block px-3 py-1 rounded-full bg-[#3525E8]/10 text-[#3525E8] text-[10px] font-black uppercase tracking-widest mb-4">
                {book.category || book.genre || "General"}
              </div>
              
              <h2 className="text-[42px] font-black leading-[1.1] tracking-tight text-[#14143A]">
                {book.title || book.bookName}
              </h2>

              <p className="mt-4 text-lg font-semibold text-[#8A90A6]">
                Authored by <span className="text-[#14143A]">{book.author || book.authorName || "Unknown"}</span>
              </p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-[40px] font-black text-[#3525E8]">{price}</span>
                <span className="text-sm text-[#8A90A6] font-bold">per copy</span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => nav(`/admin/dashboard/bookstore/${bookId}/edit`, { state: { book } })}
                  className="inline-flex h-[56px] min-w-[160px] cursor-pointer items-center justify-center rounded-[24px] bg-[#3525E8] px-8 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:scale-105 active:scale-95"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <h3 className="text-2xl font-black text-[#14143A]">Summary & Description</h3>
            <div className="mt-6 text-lg leading-relaxed text-[#555B7D] space-y-4">
              {book.description ? (
                 <p>{book.description}</p>
              ) : (
                 <p className="italic text-gray-300">No description provided for this book.</p>
              )}
            </div>
          </div>
        </div>

        <aside className="hidden xl:block">
           <div className="bg-[#F9FAFF] rounded-[32px] p-8 border border-[#E7E9FF]">
              <h4 className="text-sm font-black text-[#14143A] uppercase tracking-wider mb-6">Inventory Data</h4>
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <span className="text-[#8A90A6] font-medium">Status</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                      (book.status === "Live" || book.status === 1) ? "bg-green-100 text-green-700" :
                      (book.status === "Draft" || book.status === 0) ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                       {book.status === 0 ? "Draft" : book.status === 1 ? "Live" : (book.status || "Live")}
                    </span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[#8A90A6] font-medium">Published</span>
                    <span className="text-[#14143A] font-bold">{book.dateOfPublishing || "N/A"}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[#8A90A6] font-medium">ID</span>
                    <span className="text-[#14143A] font-mono text-xs">{book.id || book.value}</span>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}