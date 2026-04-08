import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AdminBookstoreEditorUpload,
  AdminBookstoreField,
  AdminBookstoreHeader,
  AdminBookstoreSelect,
  AdminBookstoreTextarea,
  AdminDangerAction,
  AdminPrimaryAction,
  BookCover,
} from "../../../components/admin/bookstore/AdminBookstoreShared";
import { bookstoreApi } from "../../../api/bookstore";

export default function AdminBookstoreEditBook() {
  const nav = useNavigate();
  const { bookId } = useParams();
  const { state } = useLocation();

  const [form, setForm] = useState({
    title: "", author: "", description: "", price: "",
    publishDate: "", status: "Live", category: "General",
    photo: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const CATEGORIES = ["General", "Science", "Arts", "Engineering", "Medicine", "Social Sciences", "Law", "Business"];

  useEffect(() => {
    async function loadBook() {
      try {
        let book = state?.book;
        if (!book) {
          const res = await bookstoreApi.getBookDetails(bookId);
          book = res?.data || res;
        }
        
        if (book) {
          setForm({
            title: book.title || book.bookName || "",
            author: book.publisherName || book.author || book.authorName || "",
            description: book.description || "",
            price: book.price || "",
            publishDate: book.dateOfPublishing || "",
            status: book.status === 0 ? "Draft" : book.status === 2 ? "Archived" : "Live",
            category: book.category ?? "General",
            photo: book.coverPhoto || book.imageUrl || book.photo || null
          });
        }
      } catch (err) {
        console.error("LOAD BOOK ERROR:", err);
        setError("Failed to load book data.");
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [bookId, state]);

  function handleField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleUpdate() {
    try {
      setSaving(true);
      
      const statusMap = { "Draft": 0, "Live": 1, "Archived": 2 };
      const statusEnum = statusMap[form.status] ?? 1;

      // Backend changeBookStatus expects direct bookId and status
      await bookstoreApi.changeBookStatus({
        bookId, 
        status: statusEnum 
      });

      // Navigate back
      nav(`/admin/dashboard/bookstore/${bookId}`);
    } catch (err) {
      setError(err?.message || "Failed to update book.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      setSaving(true);
      await bookstoreApi.deleteBook(bookId);
      nav("/admin/dashboard/bookstore");
    } catch (err) {
      setError("Delete failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-10 text-white/50 italic">Loading editor...</div>;

  return (
    <div className="min-h-[calc(100vh-24px)] px-4 py-7 md:px-6 max-w-[1440px] mx-auto w-full">
      <AdminBookstoreHeader title="Edit Book" backTo={`/admin/dashboard/bookstore/${bookId}`} />

      <div className="mt-12 grid grid-cols-1 gap-12 xl:grid-cols-[440px_minmax(0,1fr)]">
        {/* Left: Preview */}
        <div className="bg-white/5 rounded-[40px] p-8 border border-white/10 h-fit sticky top-10">
           <div className="mx-auto w-[200px] h-[280px] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-8">
              <BookCover fullSize value={form.photo} />
           </div>
           <div className="text-center space-y-2">
              <h2 className="text-white font-bold text-2xl truncate">{form.title || "Untitled Book"}</h2>
              <p className="text-white/50 text-sm">By {form.author || "Unknown Author"}</p>
              <p className="text-white font-black text-3xl mt-4">₦{Number(form.price || 0).toLocaleString()}</p>
           </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[140px_minmax(0,1fr)]">
            <AdminBookstoreEditorUpload 
              previewImage={form.photo} 
              onImageChange={img => handleField("photo", img)} 
            />

            <div className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl mb-4">
                <p className="text-amber-800 text-[10px] font-black uppercase tracking-widest mb-1">System Notice</p>
                <p className="text-amber-700 text-xs leading-relaxed">
                  The current API only supports updating the <strong>Publication Status</strong>. Changes to Title, Author, or Price will not be persisted.
                </p>
              </div>
              <AdminBookstoreField label="Book Title (Locked)" value={form.title} onChange={v => {}} disabled />
              <AdminBookstoreField label="Author Name (Locked)" value={form.author} onChange={v => {}} disabled />
            </div>
          </div>

          <div className="mt-10 space-y-8">
            <AdminBookstoreTextarea label="Description (Locked)" value={form.description} onChange={v => {}} disabled />
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <AdminBookstoreField label="Pricing (₦) - Locked" value={form.price} onChange={v => {}} disabled />
              <AdminBookstoreField label="Publish Date" value={form.publishDate} onChange={v => handleField("publishDate", v)} />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <AdminBookstoreSelect 
                label="Status" 
                value={form.status} 
                options={["Live", "Draft", "Archived"]} 
                onChange={v => handleField("status", v)} 
              />
              <AdminBookstoreSelect 
                label="Category" 
                value={form.category} 
                options={CATEGORIES} 
                onChange={v => handleField("category", v)} 
              />
            </div>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-gray-50 pt-10">
            <AdminDangerAction onClick={handleDelete} disabled={saving}>
              Delete Book permanently
            </AdminDangerAction>

            <div className="flex items-center gap-4">
               {error && <p className="text-red-500 text-sm font-medium mr-4">{error}</p>}
               <button onClick={() => nav(-1)} className="px-6 py-2 text-gray-400 font-bold hover:text-gray-600 transition">Cancel</button>
               <AdminPrimaryAction
                 className="min-w-[180px]"
                 onClick={handleUpdate}
                 disabled={saving}
               >
                 {saving ? "Saving..." : "Publish Changes"}
               </AdminPrimaryAction>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}