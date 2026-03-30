import { useNavigate } from "react-router-dom";
import useCountdownRedirect from "../../../hooks/useCountdownRedirect";
import SuccessCelebration from "../../../components/feedback/SuccessCelebration";

export default function AdminUserManagementAddUserSuccess() {
  const nav = useNavigate();
  const redirectPath = "/admin/dashboard/account/user-management";
  const count = useCountdownRedirect(3, redirectPath);

  return (
    <div className="min-h-[calc(100vh-24px)] px-6 py-8">
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-[980px] text-center">
          <SuccessCelebration
            title="User Added Successfully"
            subtitle="Redirecting to User Management now."
          />

          <p className="mt-6 text-[16px] text-[#8F93A6]">
            Returning in{" "}
            <span className="font-semibold text-[#3C22F2]">{count}s</span>...
          </p>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => nav(redirectPath)}
              className="inline-flex h-[54px] cursor-pointer items-center justify-center rounded-full bg-[#3A22E9] px-10 text-[16px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
            >
              Go to User Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}