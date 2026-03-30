import { useState } from "react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import {
  GhostSaveButton,
  ProfileHero,
  SimpleToggle,
} from "../../../components/admin/account/AdminAccountBlocks";

function ModuleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <p className="text-[18px] font-medium text-[#4D5679]">{label}</p>
      <SimpleToggle checked={checked} onChange={onChange} />
    </div>
  );
}

export default function AdminUserManagementAdministratorModules() {
  const [modules, setModules] = useState({
    bookstore: false,
    reports: true,
    users: true,
  });

  return (
    <AdminAccountShell
      title="Administrator Module"
      activeKey="user-management"
      right={
        <div className="max-w-[760px] space-y-12">
          <ProfileHero
            name={"Nomad\nSurname".replace("\n", " ")}
            subline1="UNILAG - 223WD12"
            subline2="Bursary - Finance & Accounts"
          />

          <div className="max-w-[500px] space-y-10">
            <h3 className="text-[18px] font-semibold text-[#161B32]">Select Module</h3>

            <ModuleRow
              label="Bookstore"
              checked={modules.bookstore}
              onChange={(value) => setModules((s) => ({ ...s, bookstore: value }))}
            />
            <ModuleRow
              label="Payment Reports"
              checked={modules.reports}
              onChange={(value) => setModules((s) => ({ ...s, reports: value }))}
            />
            <ModuleRow
              label="User Management"
              checked={modules.users}
              onChange={(value) => setModules((s) => ({ ...s, users: value }))}
            />
          </div>

          <div className="flex justify-center xl:justify-start">
            <GhostSaveButton />
          </div>
        </div>
      }
    />
  );
}
