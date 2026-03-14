import { ArrowLeft } from "lucide-react";

export default function SplitAuthLayout({
  imageSrc,
  children,
  onBack,
  role, // ✅ "Admin" | "Student" | undefined
  imageWrapperClassName = "rounded-[60px]",
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Form */}
        <div className="px-8 lg:px-16 py-10 flex flex-col">
          {/* Top row: Back + Brand (same line) */}
          <div className="flex items-center gap-45">
            {/* Back button */}
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="w-11 h-11 rounded-full bg-[#F5F6FF] flex items-center justify-center
                           hover:brightness-95 active:scale-[0.98] transition"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-[#14143A]" />
              </button>
            ) : null}

            {/* EduPay + optional role */}
            <div className="flex items-end gap-1">
              <div className="text-4xl font-extrabold leading-none">
                <span className="font-extrabold text-[#2C14DD]">Edu</span>
                <span className="font-light text-[#2C14DD]">Pay</span>
              </div>

              {/* ✅ show Admin beside logo */}
              {role ? (
                <span className="text-sm font-semibold text-[#2C14DD] pb-[px]">
                  {role}
                </span>
              ) : null}
            </div>
          </div>

          {/* Page content */}
          <div className="mt-10">{children}</div>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:block min-h-screen">
          <div className={`h-full w-full overflow-hidden ${imageWrapperClassName}`}>
            <img
              src={imageSrc}
              alt=""
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
}