import AccountShell from "../../../components/dashboard/AccountShell";

function GreyInput({ label, placeholder }) {
  return (
    <div className="bg-[#F0F0F0] rounded-[16px] px-6 py-5">
      <p className="text-[12px] text-[#9AA0B4] font-medium">{label}</p>
      <input
        className="mt-2 w-full bg-transparent outline-none text-[15px] text-[#14143A] placeholder:text-[#9AA0B4]"
        placeholder={placeholder}
      />
    </div>
  );
}

export default function SettingsPasswordReset() {
  return (
    <AccountShell
      title="Password Reset"
      activeKey="settings"
      right={
        <div className="w-full max-w-[720px]">
          <div className="space-y-5">
            <GreyInput label="Old Password" placeholder="Enter old password" />
            <GreyInput label="New Password" placeholder="Enter new password" />
            <GreyInput
              label="Retype New Password"
              placeholder="Retype new password"
            />

            <div className="pt-2">
              <p className="text-[12px] text-[#9AA0B4] font-medium mb-2">
                Enter OTP sent to registered Email Address
              </p>
              <GreyInput label="Enter OTP" placeholder="Enter OTP" />
            </div>
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
