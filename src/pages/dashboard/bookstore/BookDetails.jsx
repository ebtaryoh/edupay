import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { bookstoreApi } from "../../../api/bookstore";

const MOCK_BOOKS = [
  {
    isMock: true,
    id: "mock-1",
    title: "Organic Chemistry: Structure and Function",
    author: "K. Peter C. Vollhardt",
    price: 12500,
    category: "Science",
    description: "A comprehensive guide to organic chemistry principles, focusing on molecular structure and dynamic chemical functions.",
    imageUrl: "https://images.unsplash.com/photo-1532187875605-2fe358a71e48?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "mock-2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 4500,
    category: "Literature",
    description: "A classic of American literature, exploring themes of wealth, class, and the elusive American Dream in the 1920s.",
    imageUrl: "https://images.unsplash.com/photo-1543004218-ee1411043329?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "mock-3",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    price: 8900,
    category: "Economics",
    description: "An essential textbook for understanding micro and macro economic principles in the modern world.",
    imageUrl: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "mock-4",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    price: 15000,
    category: "Technology",
    description: "The definitive reference and textbook for algorithms and data structures, used by professionals and students worldwide.",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80"
  }
];

export default function BookDetails() {
  const nav = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [book, setBook] = useState(state?.book || null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(!state?.book);
  const [loadingSimilar, setLoadingSimilar] = useState(true);
  
  const studentId = localStorage.getItem("studentId") || "";
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingSimilar(true);
        
        let bookData = null;
        if (id?.startsWith("mock-")) {
          bookData = MOCK_BOOKS.find(b => b.id === id);
        } else {
          // Always re-fetch to ensure fresh status/metadata
          const res = await bookstoreApi.getBookDetails(id);
          bookData = res?.data || res;
        }
        
        if (bookData) setBook(bookData);

        const allBooksRes = await bookstoreApi.getAllBooks().catch(() => ({ data: MOCK_BOOKS }));
        const all = allBooksRes?.data || allBooksRes || MOCK_BOOKS;
        setSimilarBooks(Array.isArray(all) ? all : MOCK_BOOKS);
      } catch (err) {
        console.error("FAILED TO LOAD BOOK DETAILS:", err);
        if (!book) setBook(MOCK_BOOKS[0]);
      } finally {
        setLoading(false);
        setLoadingSimilar(false);
      }
    }
    loadData();
  }, [id, state]);

  const related = useMemo(() => {
    if (!book) return [];
    const cat = book.category || book.genre || "General";
    return similarBooks
      .filter(b => (b.id !== (book.id || book.value) && b.value !== (book.id || book.value)) && (b.category || b.genre || "General") === cat)
      .slice(0, 4);
  }, [book, similarBooks]);

  const handlePurchase = async () => {
    const studentId = localStorage.getItem("studentId") || "";
    if (!studentId) {
      alert("You must be logged in to purchase a book.");
      return;
    }

    setPurchasing(true);
    try {
      // 1. Intercept mock book purchases for UI demo/verification
      if (book.id?.toString().startsWith("mock-") || book.value?.toString().startsWith("mock-")) {
        console.log("Simulating purchase for mock book...");
        // Delay to simulate network
        await new Promise(r => setTimeout(r, 1000));
        
        const mockPaymentData = {
          authorizationUrl: "https://checkout.paystack.com/mock-redirect", // For testing redirect
          reference: `MOCK-${Date.now()}`,
          amount: book.price || 0
        };
        
        nav(`/dashboard/bookstore/${book.id || book.value}/payment`, { 
          state: { book, paymentData: mockPaymentData } 
        });
        return;
      }

      // 2. Real purchase call
      const res = await bookstoreApi.purchaseBook(book.id || book.value, studentId);
      const paymentData = res?.data || res;

      if (paymentData && (paymentData.authorizationUrl || paymentData.reference)) {
        nav(`/dashboard/bookstore/${book.id || book.value}/payment`, { state: { book, paymentData } });
      } else {
        throw new Error("No payment authorization received from server.");
      }
    } catch (err) {
      console.error("PURCHASE ERROR:", err);
      // Detailed error reporting for the user
      const errorMsg = err.response?.data?.message || err.message || "Failed to initiate purchase.";
      alert(errorMsg);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-24px)] bg-white rounded-[28px] p-6 flex flex-col items-center justify-center text-[#9AA0B4]">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-[#2C14DD] rounded-full animate-spin mb-4" />
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[calc(100vh-24px)] bg-white rounded-[28px] p-6 flex flex-col items-center justify-center text-[#9AA0B4]">
        <h2 className="text-xl font-bold text-[#14143A]">Book not found</h2>
        <button onClick={() => nav("/dashboard/bookstore")} className="mt-4 text-[#2C14DD] font-semibold underline">Return to bookstore</button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-24px)] bg-white rounded-[28px] p-6 md:p-10">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="w-12 h-12 rounded-full bg-[#F3F4FF] text-[#14143A] flex items-center justify-center hover:bg-[#ECEEFF] transition shadow-sm"
          aria-label="Back"
        >
          <span className="text-2xl mt-[-4px]">‹</span>
        </button>

        <h1 className="text-[#14143A] text-[20px] font-bold">Bookstore</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-12">
        {/* left */}
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-[#F9FAFF] p-8 rounded-[34px] border border-gray-50 shadow-sm">
            <div className="w-[180px] h-[240px] rounded-[18px] bg-gray-200 overflow-hidden shadow-lg shrink-0">
               {(book.coverPhoto || book.imageUrl || book.photo) ? (
                 <img src={book.coverPhoto || book.imageUrl || book.photo} alt={book.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400">No Cover</div>
               )}
            </div>
            <div className="flex-1 min-w-0 text-center md:text-left pt-2">
              <p className="text-[#14143A] font-extrabold text-2xl truncate">{book.title || book.bookName || "Untitled Book"}</p>
              <p className="text-[#8A90A6] text-sm mt-2 font-medium">By {book.author || book.publisherName || book.authorName || "Unknown Author"}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-white border border-blue-50 text-[#2C14DD] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                {book.category || book.genre || "General"}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
                <p className="text-[#2C14DD] font-black text-[32px]">
                  ₦{Number(book.price || 0).toLocaleString()}
                </p>
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="h-14 px-10 rounded-full bg-[#2C14DD] text-white text-base font-bold shadow-xl shadow-blue-200 disabled:opacity-60 transition hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  {purchasing ? "Processing..." : "Buy Now"}
                  {!purchasing && <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">→</div>}
                </button>
              </div>
              {purchaseError && (
                <p className="mt-4 text-sm text-red-600 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  {purchaseError}
                </p>
              )}
            </div>
          </div>

          <h2 className="mt-12 text-[#14143A] font-extrabold text-[24px]">Description</h2>

          <div className="mt-6 space-y-4">
             <p className="text-[#8A90A6] text-base leading-relaxed max-w-[680px]">
               {book.description || `Explore "${book.title}" by ${book.author}. This educational material is designed to support your learning journey at your institution. Get your copy today to stay ahead in your courses.`}
             </p>
          </div>
        </div>

        {/* right */}
        <div className="bg-[#F6F7FF] rounded-[40px] p-8 h-fit border border-gray-100">
          <h3 className="text-[#14143A] font-extrabold text-[18px] mb-6 flex items-center justify-between">
            Books in same category
          </h3>

          <div className="grid grid-cols-2 gap-5">
            {loadingSimilar ? (
              <p className="col-span-2 text-center text-xs text-[#9AA0B4] py-10">Loading suggestions...</p>
            ) : related.length === 0 ? (
              <p className="col-span-2 text-center text-xs text-[#9AA0B4] py-10">No similar books found.</p>
            ) : (
              related.map((b) => (
                <div key={b.id || b.value} className="bg-white rounded-[24px] p-3 shadow-sm border border-gray-50 flex flex-col group transition hover:-translate-y-1">
                   <div className="w-full h-[100px] bg-gray-100 rounded-2xl overflow-hidden mb-3 relative">
                      {(b.coverPhoto || b.imageUrl || b.photo) ? (
                        <img src={b.coverPhoto || b.imageUrl || b.photo} alt={b.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                      )}
                   </div>
                   <p className="text-[12px] font-bold text-[#14143A] truncate">{b.title}</p>
                   <p className="text-[10px] text-[#8A90A6] mt-1 truncate">By {b.author}</p>
                   <div className="mt-3 flex items-center justify-between">
                      <p className="text-[#2C14DD] font-black text-[13px]">₦{(b.price || 0).toLocaleString()}</p>
                      <button 
                        onClick={() => {
                          setBook(b);
                          nav(`/dashboard/bookstore/${b.id || b.value}`, { state: { book: b } });
                        }}
                        className="w-7 h-7 rounded-full bg-[#F3F4FF] text-[#2C14DD] flex items-center justify-center hover:bg-[#2C14DD] hover:text-white transition cursor-pointer"
                      >
                         →
                      </button>
                   </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
