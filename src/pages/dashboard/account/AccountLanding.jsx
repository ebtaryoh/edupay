import AccountShell from "../../../components/dashboard/AccountShell";

export default function AccountLanding() {
  return (
    <AccountShell
        title="Account"
        activeKey="my"
        variant="blue"
        right={<div className="min-h-[420px]" />}
      />
  );
}
