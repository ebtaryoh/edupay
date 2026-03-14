import AccountShell from "../../../components/dashboard/AccountShell";

export default function AccountLanding() {
  return (
    <div className="min-h-[calc(100vh-24px)] bg-[#2C14DD] rounded-[28px] p-6 md:p-10">
      <AccountShell
        title="Account"
        activeKey="my"
        variant="blue"
        right={<div className="min-h-[420px]" />}
      />
    </div>
  );
}
