import { useNavigate } from "react-router-dom";
import AccountShell from "../../../components/dashboard/AccountShell";

function Field({ label, value }) {
  return (
    <div className="bg-white rounded-[16px] px-6 py-5">
      <p className="text-[12px] text-[#9AA0B4] font-medium">{label}</p>
      <p className="mt-2 text-[16px] font-semibold text-[#14143A]">{value}</p>
    </div>
  );
}

export default function MyAccountInstitution() {
  const nav = useNavigate();

  return (
    <div className="min-h-[calc(100vh-24px)] bg-[#2C14DD] rounded-[28px] p-6 md:p-10">
      <AccountShell
        title="Account"
        activeKey="my"
        variant="blue"
        right={
          <div className="w-full">
            {/* Tabs */}
            <div className="flex items-center gap-8 text-[14px] font-medium">
              <button
                type="button"
                className="text-[#9AA0B4]"
                onClick={() => nav("/dashboard/account/my-account")}
              >
                Personal Information
              </button>

              <button type="button" className="text-[#14143A]">
                Institution
              </button>
            </div>

            {/* Form area */}
            <div className="mt-6 space-y-4 max-w-[620px]">
              <Field
                label="Institution in Attendance"
                value="University of Lagos, Nigeria (UNILAG)"
              />
              <Field label="Department/Level" value="Computer Science/300 Level" />
              <Field label="Matriculation No:" value="CSC/2021/001" />
            </div>

            {/* Save button */}
            <div className="mt-10 flex justify-end">
              <button
                type="button"
                className="h-14 px-16 rounded-full bg-[#EDEFFF] text-[#2C14DD] font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
