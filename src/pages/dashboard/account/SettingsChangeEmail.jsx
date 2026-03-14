import AccountShell from "../../../components/dashboard/AccountShell";

function GreyInput({ label, placeholder, rightText }) {
  return (
    <div className="bg-[#F0F0F0] rounded-[16px] px-6 py-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] text-[#9AA0B4] font-medium">{label}</p>
        {rightText ? (
          <span className="text-[12px] font-semibold text-[#14143A]">
            {rightText}
          </span>
        ) : null}
      </div>

      <input
        className="mt-2 w-full bg-transparent outline-none text-[15px] text-[#14143A] placeholder:text-[#9AA0B4]"
        placeholder={placeholder}
      />
    </div>
  );
}

export default function SettingsChangeEmail() {
  return (
    <AccountShell
      title="Change Email Address"
      activeKey="settings"
      right={
        <div className="w-full max-w-[720px]">
          <div className="space-y-5">
            <GreyInput
              label="Current Email Address"
              placeholder="Enter current Email Address"
            />
            <GreyInput
              label="New Email Address"
              placeholder="Enter New Email Address"
            />
            <GreyInput
              label="Enter OTP"
              placeholder="Enter OTP"
              rightText="Send OTP for Verification"
            />
          </div>

          <div className="mt-14 flex justify-end">
            <button
              type="button"
              className="h-14 px-20 rounded-full bg-[#E7E6FF] text-[#2C14DD] font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      }
    />
  );
}
