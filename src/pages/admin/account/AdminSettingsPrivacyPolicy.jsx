import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";

export default function AdminSettingsPrivacyPolicy() {
  return (
    <AdminAccountShell
      title="Account"
      activeKey="settings"
      right={
        <div className="max-w-[760px] space-y-10 pt-3">
          <p className="max-w-[690px] text-[18px] leading-[1.5] text-[#7D8293]">
            Making payment on EDUPay is easy as a breeze. Payments are completed in
            3-steps in the app. Go to “Payments” and select the fee to be paid
            and make payment
          </p>

          <p className="max-w-[690px] text-[18px] leading-[1.5] text-[#7D8293]">
            Making payment on EDUPay is easy as a breeze. Payments are completed in
            3-steps in the app. Go to “Payments” and select the fee to be paid
            and make payment
          </p>

          <p className="max-w-[690px] text-[18px] leading-[1.5] text-[#7D8293]">
            Making payment on EDUPay is easy as a breeze. Payments are completed in
            3-steps in the app. Go to “Payments” and select the fee to be paid
            and make payment
          </p>
        </div>
      }
    />
  );
}