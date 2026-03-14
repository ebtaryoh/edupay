import { useNavigate } from "react-router-dom";
import AccountShell from "../../../components/dashboard/AccountShell";

function Field({ label, value, rightIcon }) {
  return (
    <div className="bg-white rounded-[16px] px-6 py-5">
      <p className="text-[12px] text-[#9AA0B4] font-medium">{label}</p>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-[16px] font-semibold text-[#14143A]">{value}</p>
        {rightIcon}
      </div>
    </div>
  );
}

export default function MyAccountPersonal() {
  const nav = useNavigate();

  return (
    <div className="min-h-[calc(100vh-24px)] bg-[#2C14DD] rounded-[28px] p-6 md:p-10">
      <AccountShell
        title="Account"
        activeKey="my"
        variant="blue"
        right={
          <div className="w-full">
            {/* Tabs */}
            <div className="flex items-center gap-8 text-[14px] font-medium">
              <button type="button" className="text-[#14143A]">
                Personal Information
              </button>

              <button
                type="button"
                className="text-[#9AA0B4]"
                onClick={() => nav("/dashboard/account/my-account/institution")}
              >
                Institution
              </button>
            </div>

            {/* Form area */}
            <div className="mt-6 space-y-4 max-w-[620px]">
              <Field label="First Name" value="Ayotunde" />
              <Field label="Last Name" value="K. Samuel" />

              <Field
                label="Email Address"
                value="ayotundesamuel@gmail.com"
                rightIcon={
                  <div className="w-9 h-9 rounded-full bg-[#2C14DD] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="white"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                }
              />

              <Field label="Phone Number" value="+234 80 1234 6789" />
              <Field label="Gender" value="Male" />
            </div>

            {/* Save button (pill, right aligned) */}
            <div className="mt-10 flex justify-end">
              <button
                type="button"
                className="h-14 px-16 rounded-full bg-[#EDEFFF] text-[#2C14DD] font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
