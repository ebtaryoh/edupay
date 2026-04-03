import { ChevronDown } from "lucide-react";
import AccountShell from "../../../components/dashboard/AccountShell";

function SoftField({ label, placeholder, rightIcon, as = "input", rows = 6 }) {
  const base =
    "w-full bg-[#F2F4FF] rounded-[16px] px-6 py-5 outline-none placeholder:text-[#9AA0B4] text-[#14143A] text-[15px]";

  return (
    <div>
      <p className="text-[12px] text-[#9AA0B4] font-medium mb-2">{label}</p>

      <div className="relative">
        {as === "textarea" ? (
          <textarea className={base} placeholder={placeholder} rows={rows} />
        ) : (
          <input className={base} placeholder={placeholder} />
        )}

        {rightIcon ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#E7E6FF] flex items-center justify-center">
            {rightIcon}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function ContactAdmin() {
  return (
    <AccountShell
      title="Contact Support"
      activeKey="contact"
      right={
        <div className="w-full max-w-[560px]">
          <p className="text-[14px] text-[#6B6F93] leading-relaxed">
            Send in your complaints. We’ll respond within 24 hours to your registered email address.
          </p>

          <div className="mt-6 space-y-5">
            <SoftField
              label="Support Type"
              placeholder="Failed Transaction but debited"
              rightIcon={
                <ChevronDown size={18} color="#14143A" strokeWidth={2.5} />
              }
            />

            <SoftField label="Registered Email" placeholder="ayotundesamuel@gmail.com" />

            <SoftField
              label="Message"
              placeholder="Enter complaint"
              as="textarea"
              rows={7}
            />
          </div>

          <div className="mt-10">
            <button
              type="button"
              className="h-14 px-16 rounded-full bg-[#2C14DD] text-white font-semibold"
            >
              Send Message
            </button>
          </div>
        </div>
      }
    />
  );
}
