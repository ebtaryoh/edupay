import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdminBookstoreEditorUpload,
  AdminBookstoreField,
  AdminBookstoreHeader,
  AdminBookstoreModuleList,
  AdminBookstoreSelect,
  AdminBookstoreTextarea,
  AdminPrimaryAction,
  AdminWalletCard,
} from "../../../components/admin/bookstore/AdminBookstoreShared";
import { bookstoreApi } from "../../../api/bookstore";

export default function AdminBookstoreAddBook() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "", author: "", description: "", price: "",
    publishDate: "", status: "Live", category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
    setError("");
  }

  async function handlePublish() {
    setError("");
    if (!form.title.trim()) { setError("Book title is required."); return; }
    if (!form.price.trim()) { setError("Pricing is required."); return; }
    try {
      setLoading(true);
      await bookstoreApi.registerNewBook({
        bookName: form.title,
        authorName: form.author,
        description: form.description,
        price: Number(form.price.replace(/[^0-9.]/g, "")),
        dateOfPublishing: form.publishDate,
        status: form.status,
        category: form.category,
      });
      nav("/admin/dashboard/bookstore");
    } catch (err) {
      setError(err?.message || "Failed to publish book. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-24px)] px-4 py-7 md:px-6">
      <AdminBookstoreHeader title="Add Book" backTo="/admin/dashboard/bookstore" />

      <div className="mt-10 grid grid-cols-1 gap-10 xl:grid-cols-[500px_minmax(0,1fr)] xl:gap-14">
        <div>
          <AdminWalletCard />

          <div className="mt-12">
            <AdminBookstoreModuleList activeKey="bookstore" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[126px_minmax(0,1fr)]">
            <AdminBookstoreEditorUpload />

            <div className="min-w-0 space-y-5">
              <AdminBookstoreField label="Book Title*" value={form.title} onChange={v => handleField("title", v)} />
              <AdminBookstoreField label="Author/Publisher Name" value={form.author} onChange={v => handleField("author", v)} />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <AdminBookstoreTextarea label="Description" placeholder="Enter Book Description" value={form.description} onChange={v => handleField("description", v)} />
            <AdminBookstoreField label="Pricing" value={form.price} onChange={v => handleField("price", v)} />
            <AdminBookstoreField label="Date of Publishing" value={form.publishDate} onChange={v => handleField("publishDate", v)} />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AdminBookstoreSelect label="Status" value={form.status} onChange={v => handleField("status", v)} />
              <AdminBookstoreSelect label="Category" value={form.category || "Select Category"} onChange={v => handleField("category", v)} />
            </div>
          </div>

          <div className="mt-20 flex flex-col items-end gap-2">
            {error && <p className="text-sm text-red-600">{error}</p>}
            <AdminPrimaryAction
              className="min-w-[128px]"
              onClick={handlePublish}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish"}
            </AdminPrimaryAction>
          </div>
        </div>
      </div>
    </div>
  );
}