import { useNavigate, useParams } from "react-router-dom";
import {
  AdminBookstoreEditorUpload,
  AdminBookstoreField,
  AdminBookstoreHeader,
  AdminBookstoreSelect,
  AdminBookstoreTextarea,
  AdminDangerAction,
  AdminPrimaryAction,
  BookCover,
  BookSearchBar,
  DescriptionText,
} from "../../../components/admin/bookstore/AdminBookstoreShared";

export default function AdminBookstoreEditBook() {
  const nav = useNavigate();
  const { bookId } = useParams();

  return (
    <div className="min-h-[calc(100vh-24px)] px-4 py-7 md:px-6">
      <AdminBookstoreHeader title="Bookstore" backTo={`/admin/dashboard/bookstore/${bookId}`} />

      <div className="mt-10 max-w-[860px]">
        <BookSearchBar className="w-[150px]" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 xl:grid-cols-[520px_minmax(0,1fr)] xl:gap-16">
        <div>
          <div className="flex items-start gap-5">
            <div className="w-[220px] shrink-0">
              <BookCover className="h-[180px]" />
            </div>

            <div className="pt-1">
              <h2 className="text-[28px] font-bold tracking-[-0.02em] text-[#263160]">
                Abstract Colors
              </h2>

              <p className="mt-2 text-[14px] text-[#A5ABC1]">By James Akande</p>

              <p className="mt-10 text-[30px] font-extrabold text-[#3525E8]">₦5,600</p>

              <div className="mt-3">
                <button
                  type="button"
                  className="inline-flex h-[36px] min-w-[52px] cursor-pointer items-center justify-center rounded-[12px] bg-[#3525E8] px-5 text-[14px] font-semibold text-white"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-[28px] font-bold text-[#263160]">Description</h3>
            <div className="mt-6 max-w-[650px]">
              <DescriptionText />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[126px_minmax(0,1fr)]">
            <AdminBookstoreEditorUpload />

            <div className="min-w-0 space-y-5">
              <AdminBookstoreField label="Book Title*" value="Abstract Colors" />
              <AdminBookstoreField label="Author/Publisher Name" value="James Akande" />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <AdminBookstoreTextarea
              label="Description"
              value="Enter Book Description"
            />

            <AdminBookstoreField label="Pricing" value="₦5,600" />
            <AdminBookstoreField label="Date of Publishing" value="dd/mm/yyyy" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <AdminBookstoreSelect label="Status" value="Live" />
              <AdminBookstoreSelect label="Category" value="Select Category" />
            </div>
          </div>

          <div className="mt-20 flex flex-wrap justify-end gap-6">
            <AdminPrimaryAction
              className="min-w-[200px]"
              onClick={() => nav(`/admin/dashboard/bookstore/${bookId}`)}
            >
              Publish Changes
            </AdminPrimaryAction>

            <AdminDangerAction
              className="min-w-[166px]"
              onClick={() => nav("/admin/dashboard/bookstore")}
            >
              Delete Book
            </AdminDangerAction>
          </div>
        </div>
      </div>
    </div>
  );
}