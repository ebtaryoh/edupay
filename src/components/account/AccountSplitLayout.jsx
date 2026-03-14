import AccountSplitLayout from "../../components/account/AccountSplitLayout";
import AccountMenu from "../../components/account/AccountMenu";

export default function AccountLanding() {
  return (
    <div className="bg-[#2C14DD] rounded-[28px] p-6 md:p-10 min-h-screen">
      <AccountSplitLayout
        left={<AccountMenu />}
        right={
          <div className="h-full flex items-center justify-center text-[#6B6B8F]">
            Select an option to continue
          </div>
        }
      />
    </div>
  );
}
