import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookstoreApi } from "../../../api/bookstore";
import { Search, ChevronDown, Heart, ChevronLeft, Library, Loader2 } from "lucide-react";

function BookCard({ book, onBuy }) {
  const imageUrl = book.coverPhoto || book.imageUrl || book.photo;
  return (
    <div className="group bg-white rounded-[32px] p-5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-transparent hover:border-blue-50">
      <div className="relative aspect-[3/4] bg-[#F3F4FF] rounded-[24px] overflow-hidden mb-5">
        {imageUrl ? (
          <img src={imageUrl} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-blue-200">
            <Library size={48} strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <button
          type="button"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm text-[#2C14DD] hover:bg-[#2C14DD] hover:text-white transition-all transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="space-y-1 px-1">
        <h3 className="text-[16px] font-bold text-[#14143A] line-clamp-1 group-hover:text-[#2C14DD] transition-colors">{book.title || book.bookName || "Untitled Book"}</h3>
        <p className="text-[13px] text-[#8A90A6] font-medium">By {book.author || book.publisherName || book.authorName || "Unknown Author"}</p>
        
        <div className="pt-4 flex items-center justify-between gap-4">
          <p className="text-[#2C14DD] font-black text-lg">₦{(book.price || 0).toLocaleString()}</p>
          <button
            type="button"
            onClick={onBuy}
            className="h-10 px-6 rounded-full bg-[#2C14DD] text-white text-sm font-bold shadow-lg shadow-blue-100 hover:brightness-110 active:scale-95 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

const MOCK_BOOKS = [
  {
    isMock: true,
    id: "mock-1",
    title: "Organic Chemistry: Structure and Function",
    author: "K. Peter C. Vollhardt",
    price: 12500,
    category: "Science",
    imageUrl: "https://images.unsplash.com/photo-1532187875605-2fe358a71e48?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "mock-2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 4500,
    category: "Literature",
    imageUrl: "https://images.unsplash.com/photo-1543004218-ee1411043329?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "mock-3",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    price: 8900,
    category: "Economics",
    imageUrl: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "mock-4",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    price: 15000,
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=400&q=80"
  }
];

export default function BookstoreLanding() {
  const nav = useNavigate();
  const [activeCat, setActiveCat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        let institutionId = localStorage.getItem("institutionId") || "";
        if (!institutionId) {
          try {
             const { parseJwt } = await import("../../../api/http");
             const decoded = parseJwt(localStorage.getItem("token"));
             institutionId = decoded?.institutionId || decoded?.instid || "";
          } catch(e){}
        }

        const res = await bookstoreApi.getAllBooks({ InstitutionId: institutionId || undefined });
        
        let data = [];
        const d = res?.data || res;
        if (Array.isArray(d)) {
           data = d;
        } else if (d && typeof d === "object") {
           if (Array.isArray(d.items)) data = d.items;
           else if (Array.isArray(d.data)) data = d.data;
           else if (Array.isArray(d.books)) data = d.books;
        }
        
        // Use mock fallback if backend is empty or returns error message
        if (!Array.isArray(data) || data.length === 0 || (res?.message === "BOOK(s) NOT FOUND")) {
           console.log("Using Mock Fallback for Bookstore");
           data = MOCK_BOOKS;
        }
        setBooks(data);
      } catch (err) {
        console.error("FAILED TO FETCH BOOKSTORE:", err);
        setBooks(MOCK_BOOKS); // Also fallback on error for UI testing
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const reverseCategoryMap = {
    0: "General", 1: "Science", 2: "Arts", 3: "Engineering",
    4: "Medicine", 5: "Social Sciences", 6: "Law", 7: "Business"
  };

  const categories = useMemo(() => {
    const cats = new Set(books.map(b => {
      const c = b.category ?? b.genre ?? "General";
      return typeof c === "number" ? reverseCategoryMap[c] : c;
    }).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [books]);

  const filtered = useMemo(() => {
    let list = books.filter(b => (Number(b.status) === 1 || b.status === "Live" || b.isMock));
    if (activeCat !== "All") {
      list = list.filter((b) => {
        const c = b.category ?? b.genre ?? "General";
        const catString = typeof c === "number" ? reverseCategoryMap[c] : c;
        return catString === activeCat;
      });
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(b => {
        const title = (b.title || b.bookName || "").toLowerCase();
        const author = (b.publisherName || b.author || b.authorName || "").toLowerCase();
        return title.includes(term) || author.includes(term);
      });
    }
    return list;
  }, [books, activeCat, searchTerm]);

  const handleBuy = (book) => {
    nav(`/dashboard/bookstore/${book.id || book.bookId || book.value}`, { state: { book } });
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-[calc(100vh-24px)] bg-[#2C14DD] rounded-[40px] p-6 lg:p-12 pb-32 flex flex-col relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => nav(-1)}
              className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <h1 className="text-white text-3xl font-black tracking-tight">EduPay Bookstore</h1>
            <button
              type="button"
              onClick={() => nav("/dashboard/bookstore/my-books")}
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-white/15 text-white text-sm font-semibold border border-white/10 hover:bg-white/25 transition-all"
            >
              <Library size={15} />
              My Books
            </button>
          </div>
          <p className="max-w-[480px] text-white/70 text-lg leading-relaxed font-medium">
            Access thousands of academic resources, textbooks, and research materials tailored for your studies.
          </p>
        </div>

        <div className="relative w-full lg:w-[420px]">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
             type="text" 
             placeholder="Search by title or author..."
             className="w-full h-16 pl-14 pr-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/5 text-white placeholder:text-white/30 outline-none focus:ring-2 ring-white/20 transition-all shadow-inner"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="relative z-10 mt-12 flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCat(c)}
            className={[
              "px-8 py-3.5 rounded-[20px] transition-all text-sm font-bold cursor-pointer whitespace-nowrap border",
              c === activeCat 
                ? "bg-white text-[#2C14DD] shadow-xl border-white scale-105" 
                : "bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mt-8 flex-1">
        {loading ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-white/30 gap-4">
             <Loader2 className="w-12 h-12 animate-spin opacity-50" />
             <p className="font-bold tracking-widest uppercase text-xs">Fetching Inventory</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-center bg-white/5 rounded-[40px] border border-white/10 p-12">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Search size={32} className="text-white/20" />
             </div>
             <h3 className="text-white font-bold text-xl">No books found</h3>
             <p className="text-white/40 mt-2 max-w-[300px]">Try adjusting your search or category filters.</p>
          </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-12">
              {filtered.map(book => (
                <BookCard key={book.id || book.value} book={book} onBuy={() => handleBuy(book)} />
              ))}
           </div>
        )}
      </div>

      {/* Featured Tray - Positioned at the bottom like Figma */}
      {books.length > 0 && (
        <div className="mt-12 relative z-10 bg-white rounded-[40px] p-8 lg:p-10 shadow-2xl shadow-blue-950/40 border border-gray-100">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-[#14143A]">Featured Highlights</h3>
                <p className="text-[#8A90A6] text-sm font-medium mt-1">Handpicked for your current semester</p>
              </div>
              <button className="text-[#2C14DD] font-bold text-sm hover:underline">View All Releases</button>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide px-2">
              {books.slice(0, 10).map((b) => (
                <div 
                  key={b.id || b.value} 
                  onClick={() => handleBuy(b)}
                  className="group bg-[#F9FAFF] rounded-[32px] p-5 w-[280px] shrink-0 border border-gray-100 hover:border-[#2C14DD]/30 hover:bg-white hover:shadow-xl transition-all cursor-pointer flex gap-5 items-center"
                >
                   <div className="w-[100px] h-[130px] bg-white rounded-2xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
                     {(b.coverPhoto || b.imageUrl || b.photo) ? (
                       <img src={b.coverPhoto || b.imageUrl || b.photo} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-200">
                          <Library size={24} />
                       </div>
                     )}
                   </div>
                   <div className="flex-1 min-w-0 pr-2">
                      <div className="text-[10px] font-black text-[#2C14DD] uppercase tracking-[0.2em] mb-2">New Release</div>
                      <p className="text-[15px] font-extrabold text-[#14143A] line-clamp-2 leading-snug">{b.title}</p>
                      <p className="text-[13px] text-[#8A90A6] mt-2 font-medium">₦{(b.price || 0).toLocaleString()}</p>
                   </div>
                </div>
              ))}
            </div>
        </div>
      )}
    </div>
  );
}
