import { useState } from "react";
import { ChevronDown as ChevronDownLucide } from "lucide-react";
import AdminAccountPlainLayout from "../../../components/admin/account/AdminAccountPlainLayout";

function ChevronDown() {
  return <ChevronDownLucide size={24} color="#9AA0B4" strokeWidth={2.5} />;
}

function InputCard({ label, children, tall = false }) {
  return (
    <div className={["rounded-[18px] bg-[#E9E8F6] px-6 py-5", tall ? "min-h-[190px]" : ""].join(" ")}>
      <p className="text-[14px] font-medium text-[#9AA0B4]">{label}</p>
      {children}
    </div>
  );
}

export default function AdminContactAdmin() {
  const [form, setForm] = useState({
    supportType: "Failed Transaction but debited",
    registeredEmail: "ayotundesamuel@gmail.com",
    message: "",
  });

  return (
    <AdminAccountPlainLayout title="Contact Support" activeKey="contact-admin">
      <div className="w-full">
        <p className="max-w-[460px] text-[18px] leading-[1.45] text-[#4D5B82]">
          Send in your complaints. We&apos;ll respond within 24 hours
          to your registered email address.
        </p>

        <div className="mt-10 space-y-4">
          <InputCard label="Support Type">
            <button
              type="button"
              className="mt-2 flex w-full cursor-pointer items-center justify-between text-left"
            >
              <span className="text-[18px] text-[#9AA0B4]">
                {form.supportType}
              </span>
              <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#F0EFF8]">
                <ChevronDown />
              </div>
            </button>
          </InputCard>

          <InputCard label="Registered Email">
            <input
              value={form.registeredEmail}
              readOnly
              className="mt-3 w-full bg-transparent text-[18px] text-[#9AA0B4] outline-none"
            />
          </InputCard>

          <InputCard label="Message" tall>
            <textarea
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Enter complaint"
              className="mt-3 h-[110px] w-full resize-none bg-transparent text-[18px] text-[#171B31] outline-none placeholder:text-[#9AA0B4]"
            />
          </InputCard>
        </div>

        <div className="mt-16">
          <button
            type="button"
            className="h-[60px] w-full max-w-[194px] cursor-pointer rounded-[20px] bg-[#3827ED] text-[18px] font-semibold text-white"
          >
            Send Message
          </button>
        </div>
      </div>
    </AdminAccountPlainLayout>
  );
}