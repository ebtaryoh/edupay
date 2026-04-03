import { useNavigate, useParams } from "react-router-dom";
import {
  AdminBookstoreHeader,
  BookCover,
  BookSearchBar,
  DescriptionText,
  AdminPrimaryAction,
} from "../../../components/admin/bookstore/AdminBookstoreShared";

export default function AdminBookstoreBookDetails() {
  const nav = useNavigate();
  const { bookId } = useParams();

  return (
    <div className="min-h-[calc(100vh-24px)] px-4 py-7 md:px-6">
      <AdminBookstoreHeader title="Bookstore" backTo="/admin/dashboard/bookstore" />

      <div className="mt-10 max-w-[860px]">
        <BookSearchBar className="w-[150px]" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 xl:grid-cols-[460px_minmax(0,1fr)]">
        <div>
          <div className="flex items-start gap-5">
            <div className="relative w-[220px] shrink-0">
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
                  onClick={() => nav(`/admin/dashboard/bookstore/${bookId}/edit`)}
                  className="inline-flex h-[36px] min-w-[52px] cursor-pointer items-center justify-center rounded-[12px] bg-[#3525E8] px-5 text-[14px] font-semibold text-white"
                >
                  Edit
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

        <div />
      </div>
    </div>
  );
}