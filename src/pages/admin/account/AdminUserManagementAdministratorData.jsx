import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";
import {
  AccountTabs,
  GhostSaveButton,
  ProfileHero,
  TinyVerifiedBadge,
} from "../../../components/admin/account/AdminAccountBlocks";

function DataRow({ label, value, trailing = null }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-[13px] text-[#9A9CAC]">{label}</p>
        <p className="mt-2 text-[17px] font-medium text-[#161B32]">{value}</p>
      </div>
      {trailing}
    </div>
  );
}

export default function AdminUserManagementAdministratorData() {
  const nav = useNavigate();
  const isInstitution = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("tab") === "institution";

  return (
    <AdminAccountShell
      title="Administrator Data"
      activeKey="user-management"
      right={
        <div className="max-w-[760px] space-y-10">
          <ProfileHero
            name="Cynthia Okonkwo"
            subline1="UNILAG - CSC/2021/001"
            subline2="Computer Science - 300 Level"
            actionLabel="Access User Transactions"
            onAction={() => nav("modules")}
          />

          <div className="max-w-[560px]">
            <AccountTabs
              tabs={[
                { key: "personal", label: "Personal Information", to: "/admin/dashboard/account/user-management/administrators/admin-1" },
                { key: "institution", label: "Institution", to: "/admin/dashboard/account/user-management/administrators/admin-1?tab=institution" },
                { key: "modules", label: "Modules", to: "/admin/dashboard/account/user-management/administrators/admin-1/modules" },
              ]}
              activeKey={isInstitution ? "institution" : "personal"}
            />

            <div className="mt-8 space-y-10">
              {isInstitution ? (
                <>
                  <DataRow label="Institution in Attendance" value="University of Lagos, Nigeria (UNILAG)" trailing={<span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F3F4FA] text-[#9BA0B4]"><ChevronDown size={20} strokeWidth={2.5} /></span>} />
                  <DataRow label="Department/Level" value="Computer Science/300 Level" />
                  <DataRow label="Matriculation No:" value="CSC/2021/001" />
                </>
              ) : (
                <>
                  <DataRow label="First Name" value="Ayotunde" />
                  <DataRow label="Last Name" value="K. Samuel" />
                  <DataRow label="Email Address" value="cynthiaokonkwo@gmail.com" trailing={<TinyVerifiedBadge />} />
                  <DataRow label="Phone Number" value="+234 80 1234 6789" />
                  <DataRow label="Gender" value="Male" />
                </>
              )}
            </div>

            <div className="mt-10 flex justify-center xl:justify-start">
              <GhostSaveButton />
            </div>
          </div>
        </div>
      }
    />
  );
}
