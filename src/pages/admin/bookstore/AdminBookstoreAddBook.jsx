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
import { parseJwt } from "../../../api/http";

export default function AdminBookstoreAddBook() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "", author: "", description: "", price: "",
    publishDate: "", status: "Live", category: "General",
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const CATEGORIES = ["General", "Science", "Arts", "Engineering", "Medicine", "Social Sciences", "Law", "Business"];

  function handleField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
    setError("");
  }

  // Helper to compress image before sending as Base64
  const compressImage = (base64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Max dimensions
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 800;
        
        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Resolve with a compressed JPEG
        resolve(canvas.toDataURL('image/jpeg', 0.7)); 
      };
    });
  };

  async function handlePublish() {
    setError("");

    // Frontend validation matching backend required fields
    if (!form.title.trim())       { setError("Book title is required."); return; }
    if (!form.author.trim())      { setError("Publisher/Author name is required."); return; }
    if (!form.description.trim()) { setError("Description is required."); return; }
    if (!form.price)              { setError("Pricing is required."); return; }

    try {
      setLoading(true);

      // Resolve institutionId: localStorage is most reliable (set at login)
      let institutionId = localStorage.getItem("institutionId") || "";

      if (!institutionId) {
        // Fallback 1: decode JWT
        const token = localStorage.getItem("token");
        const decoded = parseJwt(token);
        institutionId =
          decoded?.institutionId ||
          decoded?.instid ||
          decoded?.institutionID ||
          decoded?.InstitutionId ||
          "";
      }

      if (!institutionId) {
        // Fallback 2: fetch admin profile
        const adminId = localStorage.getItem("adminId") || "";
        if (adminId) {
          try {
            const { adminApi } = await import("../../../api/admin");
            const profileRes = await adminApi.getAdminById(adminId);
            const profile = profileRes?.data || profileRes;
            institutionId = profile?.institutionId || "";
            if (institutionId) localStorage.setItem("institutionId", institutionId);
          } catch (_) { /* silent */ }
        }
      }

      if (!institutionId) {
        setError("Could not determine your Institution ID. Please log out and log in again.");
        return;
      }

      let finalPhoto = form.photo;
      if (finalPhoto && finalPhoto.startsWith("data:")) {
        finalPhoto = await compressImage(form.photo);
      }

      const statusMap = { "Draft": 0, "Live": 1, "Archived": 2 };
      const categoryMap = {
        "General": 0, "Science": 1, "Arts": 2, "Engineering": 3,
        "Medicine": 4, "Social Sciences": 5, "Law": 6, "Business": 7
      };

      // CORRECT: Fields sent DIRECTLY at root — NO Request wrapper
      // Swagger RegisterNewBook schema: title, publisherName, description,
      // price, dateOfPublishing, status, category, imageUrl, institutionId
      const payload = {
        title: form.title.trim(),
        publisherName: form.author.trim(),
        description: form.description.trim(),
        price: Number(form.price.toString().replace(/[^0-9.]/g, "")),
        publishDate: form.publishDate || new Date().toISOString(),
        status: statusMap[form.status] ?? 1,
        category: categoryMap[form.category] ?? 0,
        imageUrl: finalPhoto || null,
        institutionId,
      };

      console.log("ADD BOOK PAYLOAD:", payload);
      await bookstoreApi.registerNewBook(payload);
      nav("/admin/dashboard/bookstore");
    } catch (err) {
      console.error("PUBLISH ERROR:", err);
      const errData = err.response?.data || err.data || err;
      if (errData?.errors) {
        const lines = Object.entries(errData.errors)
          .map(([f, msgs]) => `${f}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
          .join(" | ");
        setError(`Validation Failed: ${lines}`);
      } else {
        setError(errData?.message || errData?.title || err.message || "Failed to publish book.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-24px)] px-4 py-7 md:px-6 max-w-[1440px] mx-auto w-full">
      <AdminBookstoreHeader title="Add Book" backTo="/admin/dashboard/bookstore" />

      <div className="mt-10 grid grid-cols-1 gap-10 xl:grid-cols-[400px_minmax(0,1fr)] xl:gap-14">
        <aside className="space-y-10">
          <AdminWalletCard />
          <AdminBookstoreModuleList activeKey="bookstore" />
        </aside>

        <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[140px_minmax(0,1fr)]">
            <AdminBookstoreEditorUpload 
              previewImage={form.photo} 
              onImageChange={img => handleField("photo", img)} 
            />

            <div className="space-y-6">
              <AdminBookstoreField 
                label="Book Title*" 
                placeholder="e.g. Quantitative Reasoning Vol 1"
                value={form.title} 
                onChange={v => handleField("title", v)} 
              />
              <AdminBookstoreField 
                label="Author/Publisher Name" 
                placeholder="e.g. Dr. Kolawole"
                value={form.author} 
                onChange={v => handleField("author", v)} 
              />
            </div>
          </div>

          <div className="mt-10 space-y-8">
            <AdminBookstoreTextarea 
              label="Description" 
              placeholder="Provide a brief overview of the book's content..." 
              value={form.description} 
              onChange={v => handleField("description", v)} 
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <AdminBookstoreField 
                label="Pricing (₦)*" 
                placeholder="5,000"
                value={form.price} 
                onChange={v => handleField("price", v)} 
              />
              <AdminBookstoreField 
                label="Date of Publishing" 
                placeholder="YYYY-MM-DD"
                value={form.publishDate} 
                onChange={v => handleField("publishDate", v)} 
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <AdminBookstoreSelect 
                label="Status" 
                value={form.status} 
                options={["Live", "Draft", "Archived"]}
                onChange={v => handleField("status", v)} 
              />
              <AdminBookstoreSelect 
                label="Category*" 
                value={form.category} 
                options={CATEGORIES}
                onChange={v => handleField("category", v)} 
              />
            </div>
          </div>

          <div className="mt-16 flex flex-col items-end gap-4 border-t border-gray-50 pt-8">
            {error && (
              <div className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            <div className="flex items-center gap-4">
               <button onClick={() => nav(-1)} className="px-8 py-3 text-gray-400 font-bold hover:text-gray-600 transition">Discard</button>
               <AdminPrimaryAction
                 className="min-w-[180px]"
                 onClick={handlePublish}
                 disabled={loading}
               >
                 {loading ? "Publishing..." : "Publish Book"}
               </AdminPrimaryAction>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}