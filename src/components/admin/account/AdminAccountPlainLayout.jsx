import { useNavigate } from "react-router-dom";
import AdminAccountMenu from "./AdminAccountMenu";

function BackArrow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="#171B31"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminAccountPlainLayout({
  title,
  activeKey,
  children,
}) {
  const nav = useNavigate();

  return (
    <div className="min-h-[calc(100vh-24px)] px-6 py-6 md:px-10 md:py-8">
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center"
        >
          <BackArrow />
        </button>

        <h1 className="text-[24px] font-medium text-[#171B31] md:text-[26px]">
          {title}
        </h1>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 xl:grid-cols-[420px_minmax(0,1fr)] xl:gap-14">
        <div className="max-w-[420px]">
          <AdminAccountMenu activeKey={activeKey} />
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}