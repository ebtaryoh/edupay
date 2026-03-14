import AccountShell from "../../../components/dashboard/AccountShell";

export default function PrivacyPolicy() {
  return (
    <AccountShell
      title="Privacy Policy"
      activeKey="settings"
      variant="white"
      right={
        <div className="min-h-[420px]">
          {/* Right panel title inside the panel (as in the image) */}
          <h2 className="text-[18px] md:text-[20px] font-semibold text-[#14143A]">
            Privacy Policy
          </h2>

          {/* Paragraph blocks */}
          <div className="mt-6 space-y-10 max-w-[520px]">
            <p className="text-[14px] md:text-[15px] text-[#6B6F93] leading-[1.85]">
              Making payment on EDUPay is easy as a breeze.
              <br />
              Payments are completed in 3-steps in the app.
              <br />
              Go to “Payments” and select the fee to be paid
              <br />
              and make payment
            </p>

            <p className="text-[14px] md:text-[15px] text-[#6B6F93] leading-[1.85]">
              Making payment on EDUPay is easy as a breeze.
              <br />
              Payments are completed in 3-steps in the app.
              <br />
              Go to “Payments” and select the fee to be paid
              <br />
              and make payment
            </p>

            <p className="text-[14px] md:text-[15px] text-[#6B6F93] leading-[1.85]">
              Making payment on EDUPay is easy as a breeze.
              <br />
              Payments are completed in 3-steps in the app.
              <br />
              Go to “Payments” and select the fee to be paid
              <br />
              and make payment
            </p>
          </div>
        </div>
      }
    />
  );
}
