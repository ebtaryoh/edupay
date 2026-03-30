import { useNavigate } from "react-router-dom";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import { PurpleSaveButton } from "../../../components/admin/account/AdminAccountBlocks";

function LineField({ label, value, dropdown = false, withAvatar = false }) {
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

export default function AdminUserManagementAddUserPersonal() {
  const nav = useNavigate();

  return (
    <AdminAccountShell
      title="Add User"
      activeKey="user-management"
      right={
        <div className="max-w-[500px] space-y-10 pt-1">
          <div>
            <h2 className="text-[34px] font-semibold text-[#161B32]">Add User</h2>
            <p className="mt-6 text-[18px] font-semibold text-[#161B32]">Personal Information</p>
          </div>

          <div className="flex justify-center pb-2">
            <div className="relative h-[96px] w-[96px] rounded-full bg-[#C9C9C9]">
              <button className="absolute bottom-[-2px] right-[-4px] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#8B84F5] text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 7l1-2h6l1 2h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2z" fill="white" />
                  <circle cx="12" cy="12.5" r="3" fill="#8B84F5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <LineField label="First Name" value="Enter First Name" />
            <LineField label="Last Name" value="Enter Last Name" />
            <LineField label="Email Address" value="Enter Email Address" />
            <LineField label="Phone Number" value="Enter Phone Number" />
            <LineField label="Gender" value="Select gender" dropdown />
          </div>

          <div className="pt-4">
            <PurpleSaveButton
              children="Continue"
              className="w-full max-w-[380px]"
              onClick={() => nav("/admin/dashboard/account/user-management/add-user/institution")}
            />
          </div>
        </div>
      }
    />
  );
}
