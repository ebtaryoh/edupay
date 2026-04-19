import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  ChevronRight, 
  Book, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Search, 
  Filter 
} from "lucide-react";
import Topbar from "../../components/dashboard/Topbar";

function WalletActionButton({ label, onClick, dark = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition active:scale-[0.99]",
        dark
          ? "bg-[#1F0EAE] text-white hover:brightness-110"
          : "bg-white text-[#2F1FC1] hover:brightness-95",
      ].join(" ")}
    >
      {label}
      <ChevronRight size={18} color={dark ? "white" : "#2F1FC1"} strokeWidth={2.5} />
    </button>
  );
}

function WalletCard({ onWithdraw, onTransactions }) {
  const [hidden, setHidden] = useState(false);

  return (
    <section className="overflow-hidden rounded-[30px] bg-[#2F1FC1] px-6 pb-7 pt-8 text-white shadow-[0_22px_50px_rgba(47,32,217,0.18)] sm:px-8">
      <div className="text-center">
        <p className="text-[15px] font-semibold text-white/90 sm:text-[16px]">
          Wallet Balance
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <h2 className="text-[42px] font-extrabold leading-none tracking-[-0.04em] sm:text-[50px]">
            {hidden ? "₦xx,xxx,xxx" : "₦17,345,000"}
          </h2>

          <button
            type="button"
            onClick={() => setHidden((prev) => !prev)}
            className="cursor-pointer"
            aria-label={hidden ? "Show balance" : "Hide balance"}
          >
            {hidden ? <EyeOff size={24} color="white" /> : <Eye size={24} color="white" />}
          </button>
        </div>

        <p className="mt-4 text-[15px] text-white/85 sm:text-[16px]">
          Today&apos;s Inflow:{" "}
          <span className="font-semibold">
            {hidden ? "₦x,xxx,xxx" : "₦7,345,000"}
          </span>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <WalletActionButton label="Withdraw" onClick={onWithdraw} />
        <WalletActionButton
          label="All Payments"
          onClick={onTransactions}
          dark
        />
      </div>
    </section>
  );
}

function MenuRow({ icon, label, active = false, onClick, hasBorder = true }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex w-full cursor-pointer items-center gap-5 text-left transition",
        active
          ? "rounded-[22px] bg-[#ECEBFA] px-3 py-4"
          : "px-0 py-4 hover:bg-white/40",
      ].join(" ")}
    >
      <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[20px] bg-[#E9E7FF]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[18px] font-medium text-[#17192F]">{label}</p>
      </div>

      <ChevronRight size={20} color="#D2D2DB" strokeWidth={2.5} />

      {hasBorder && !active ? (
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#D9D9E6]" />
      ) : null}
    </button>
  );
}

function StatusPill({ value }) {
  const cls = value === "Live" ? "text-[#0CBB37]" : "text-[#9DA3B3]";

  return <span className={`text-[15px] font-semibold ${cls}`}>{value}</span>;
}

export default function AdminManageBookstore() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  const books = useMemo(
    () => [
      { id: 1, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Live" },
      { id: 2, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Live" },
      { id: 3, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Live" },
      { id: 4, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Draft" },
      { id: 5, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Draft" },
      { id: 6, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Live" },
      { id: 7, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Live" },
      { id: 8, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Draft" },
      { id: 9, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Live" },
      { id: 10, sn: "01", publication: "Abstract Colors", author: "James Akande", price: "₦5,600", status: "Live" },
    ],
    []
  );

  const filteredBooks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return books;

    return books.filter((book) =>
      [book.publication, book.author, book.price, book.status].some((value) =>
        value.toLowerCase().includes(q)
      )
    );
  }, [books, search]);

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7">
      <Topbar title="Manage Bookstore" />

      <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[420px_minmax(0,1fr)] xl:gap-12 2xl:grid-cols-[430px_minmax(0,1fr)]">
        <div className="min-w-0">
          <WalletCard
            onWithdraw={() => nav("/admin/dashboard/payments/settlement")}
            onTransactions={() => nav("/admin/dashboard/payments/transactions")}
          />

          <div className="w-full max-w-[404px]">
            <MenuRow
              label="Bookstore"
              icon={<Book size={28} color="#7369EA" strokeWidth={2.5} />}
              active
              onClick={() => nav("/admin/dashboard/payments/bookstore")}
            />

            <MenuRow
              label="Manage Fees"
              icon={<Settings size={28} color="#7369EA" strokeWidth={2.5} />}
              onClick={() => nav("/admin/dashboard/payments/manage-fees")}
            />

            <MenuRow
              label="Reports"
              icon={<BarChart3 size={28} color="#7369EA" strokeWidth={2.5} />}
              onClick={() => nav("/admin/dashboard/payments/reports")}
            />

            <MenuRow
              label="Settlement"
              icon={<CreditCard size={28} color="#7369EA" strokeWidth={2.5} />}
              onClick={() => nav("/admin/dashboard/payments/settlement")}
              hasBorder={false}
            />
          </div>
        </div>

        <div className="min-w-0">
          <section className="overflow-hidden rounded-[36px] bg-[#3420F0] px-5 pb-5 pt-8 shadow-[0_22px_50px_rgba(47,32,217,0.18)] sm:px-8 sm:pb-6 sm:pt-10 lg:px-10 lg:pt-11">
            <div className="mx-auto max-w-[620px] text-center">
              <h2 className="text-[29px] font-medium leading-[1.18] tracking-[-0.02em] text-white sm:text-[34px] lg:text-[38px] xl:text-[40px]">
                Create and manage textbooks, course
                <br />
                materials and new publications.
              </h2>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <button
                  type="button"
                  onClick={() => nav("/admin/dashboard/bookstore/add")}
                  className="inline-flex h-[58px] w-full max-w-[220px] cursor-pointer items-center justify-center rounded-full bg-white px-8 text-[16px] font-semibold text-[#1D1D22] transition hover:brightness-95 active:scale-[0.99]"
                >
                  + Add Book(s)
                </button>

                <button
                  type="button"
                  onClick={() => nav("/admin/dashboard/bookstore/view")}
                  className="inline-flex h-[58px] w-full max-w-[220px] cursor-pointer items-center justify-center rounded-full bg-white px-8 text-[16px] font-semibold text-[#1D1D22] transition hover:brightness-95 active:scale-[0.99]"
                >
                  View Bookstore
                </button>
              </div>
            </div>

            <div className="mt-10 rounded-[36px] bg-white px-5 py-6 shadow-[0_16px_35px_rgba(20,20,58,0.05)] sm:mt-12 sm:rounded-[40px] sm:px-8 sm:py-8">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <h3 className="text-[24px] font-extrabold text-[#2D2B7B]">
                  Book Management
                </h3>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex h-[42px] min-w-[190px] items-center gap-3 rounded-full bg-[#F3F5FD] px-4">
                    <Search size={18} color="#42528F" strokeWidth={2.5} />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search Bookstore"
                      className="w-full bg-transparent text-[14px] text-[#2B3674] outline-none placeholder:text-[#99A1BD]"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-[42px] cursor-pointer items-center gap-2 self-start text-[14px] font-medium text-[#97A0BD] sm:self-auto"
                  >
                    Sorting
                    <Filter size={18} color="#2B3674" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[760px] border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-6 text-[14px] font-semibold text-[#202335]">S/N</th>
                      <th className="pb-6 text-[14px] font-semibold text-[#202335]">Name of Publication</th>
                      <th className="pb-6 text-[14px] font-semibold text-[#202335]">Author</th>
                      <th className="pb-6 text-[14px] font-semibold text-[#202335]">Price</th>
                      <th className="pb-6 text-[14px] font-semibold text-[#202335]">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="border-b border-[#E7E7F0] py-5 text-[15px] text-[#8E8E97]">
                          {book.sn}
                        </td>
                        <td className="border-b border-[#E7E7F0] py-5 text-[15px] text-[#8E8E97]">
                          {book.publication}
                        </td>
                        <td className="border-b border-[#E7E7F0] py-5 text-[15px] text-[#8E8E97]">
                          {book.author}
                        </td>
                        <td className="border-b border-[#E7E7F0] py-5 text-[15px] text-[#8E8E97]">
                          {book.price}
                        </td>
                        <td className="border-b border-[#E7E7F0] py-5">
                          <StatusPill value={book.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredBooks.length === 0 ? (
                <div className="mt-6 rounded-[18px] border border-dashed border-[#D8DCEC] px-6 py-10 text-center text-[#81879B]">
                  No books found.
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}