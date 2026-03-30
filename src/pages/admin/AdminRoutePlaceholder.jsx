import Topbar from "../../components/dashboard/Topbar";

export default function AdminRoutePlaceholder({ title }) {
  return (
    <div className="min-w-0 space-y-6">
      <Topbar title={title} />

      <section className="rounded-[28px] border border-[#E8E8F3] bg-white px-8 py-10 shadow-[0_14px_40px_rgba(20,20,58,0.05)]">
        <h2 className="text-[28px] font-bold text-[#1B1C34]">{title}</h2>
        <p className="mt-3 text-[15px] text-[#7A7F92]">
          Route is wired. Next, I’ll build this page to match your uploaded design exactly.
        </p>
      </section>
    </div>
  );
}