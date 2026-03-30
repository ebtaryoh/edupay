import { useNavigate } from "react-router-dom";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { PurpleSaveButton } from "../../../components/admin/account/AdminAccountBlocks";

function LineField({ label, value, dropdown = false }) {
  return (
    <div>
      <p className="text-[13px] text-[#8E92A4]">{label}</p>
      <div className="mt-3 flex items-center justify-between gap-4 border-b border-transparent pb-3 text-[17px] font-medium text-[#171C34]">
        <span>{value}</span>
        {dropdown ? <span className="text-[28px] leading-none text-[#171C34]">⌄</span> : null}
      </div>
    </div>
  );
}

export default function AdminUserManagementAddUserInstitution() {
  const nav = useNavigate();

  return (
    <AdminAccountShell
      title="Add User"
      activeKey="user-management"
      right={
        <div className="max-w-[500px] space-y-10 pt-1">
          <div>
            <h2 className="text-[34px] font-semibold text-[#161B32]">Add User</h2>
            <p className="mt-6 text-[18px] font-semibold text-[#161B32]">Institutional Information</p>
          </div>

          <div className="space-y-8">
            <LineField label="Institution" value="Select Institution" dropdown />
            <LineField label="Department/Office" value="Enter Last Name" />
            <LineField label="Staff ID/Mat. No." value="Enter Staff ID/Mat. No." />
            <LineField label="Select User Role" value="Select Role" />
            <LineField label="Create Password" value="Create Password" />
            <LineField label="Re-enter Password" value="Re-enter Password" />
          </div>

          <div className="pt-4">
            <PurpleSaveButton
              children="Add User"
              className="w-full max-w-[380px]"
              onClick={() => nav("/admin/dashboard/account/user-management/add-user/success")}
            />
          </div>
        </div>
      }
    />
  );
}
