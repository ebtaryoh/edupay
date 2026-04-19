import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, BadgeCheck } from "lucide-react";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import Topbar from "../../components/dashboard/Topbar";
import { studentApi } from "../../api/student";
import { billingApi } from "../../api/fees";
import { dashboardApi } from "../../api/dashboard";
import quickPayImg from "../../assets/dashboard/Products 2.png";

function ProgressArrow() {
  return <ChevronRight size={16} color="#8D7CFF" strokeWidth={2.5} />;
}

function BadgeFeeIcon() {
  return <BadgeCheck size={28} color="white" strokeWidth={2} />;
}



function getInitials(firstName = "", lastName = "") {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "AS";
}

function getProfileCompletion(profile) {
  if (!profile) return 10;

  const fields = [
    profile?.firstName,
    profile?.lastName,
    profile?.emailAddress || profile?.email,
    profile?.phoneNo || profile?.phoneNumber,
    profile?.gender,
    profile?.dateOfBirth,
    profile?.matricNo,
    profile?.institutionName || profile?.institution || profile?.institutionText,
    profile?.departmentName || profile?.department,
    profile?.level,
    profile?.photo || profile?.photoUrl || profile?.imageUrl || profile?.profileImage,
  ];

  const completed = fields.filter(Boolean).length;
  return Math.max(10, Math.round((completed / fields.length) * 100));
}

export default function DashboardHome() {
  const nav = useNavigate();
  const studentId = localStorage.getItem("studentId") || "";

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [debtCount, setDebtCount] = useState(0);
  const [debtTotal, setDebtTotal] = useState(0);
  const [recentTxs, setRecentTxs] = useState([]);
  const [loadingTxs, setLoadingTxs] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!studentId) {
        setLoadingProfile(false);
        return;
      }

      try {
        const [profileRes, debtRes, txRes] = await Promise.all([
          studentApi.getStudentProfile(studentId).catch(() => null),
          billingApi.getStudentDebt(studentId).catch(() => null),
          dashboardApi.recentTransactions().catch(() => null),
        ]);

        const student = profileRes?.data || profileRes || {};
        setProfile(student);

        // Map debt response. Check property structure safely.
        const debtData = debtRes?.data || debtRes || {};
        setDebtCount(debtData.count || debtData.totalBills || 0);
        setDebtTotal(debtData.totalAmount || debtData.amount || 0);

        // Map transactions response. Treat payload as array if possible
        const txData = txRes?.data || txRes || [];
        setRecentTxs(Array.isArray(txData) ? txData.slice(0, 8) : []);
      } catch (error) {
        console.error("FAILED TO LOAD DASHBOARD DATA:", error);
      } finally {
        setLoadingProfile(false);
        setLoadingTxs(false);
      }
    }

    loadDashboardData();
  }, [studentId]);

  const displayName = useMemo(() => {
    if (!profile) return "Ayotunde K. Samuel";

    return [profile.firstName, profile.middleName, profile.lastName]
      .filter(Boolean)
      .join(" ");
  }, [profile]);

  const matricNo = profile?.matricNo || localStorage.getItem("matricNo") || "CSC/2021/001";
  const institutionName =
    profile?.institutionName || profile?.institution || profile?.institutionText || "UNILAG";
  const departmentName =
    profile?.departmentName || profile?.department || "Computer Science";
  const levelText =
    profile?.level !== undefined && profile?.level !== null
      ? `${profile.level} Level`
      : "300 Level";

  let profileImage =
    profile?.photo ||
    profile?.photoUrl ||
    profile?.imageUrl ||
    profile?.profileImage ||
    "";

  // If it's a raw Base64 string, prepend the data URI prefix
  if (
    profileImage &&
    !profileImage.startsWith("http") &&
    !profileImage.startsWith("data:") &&
    profileImage.length > 100
  ) {
    profileImage = `data:image/jpeg;base64,${profileImage}`;
  }

  const completion = getProfileCompletion(profile);
  const initials = getInitials(profile?.firstName, profile?.lastName);

  const hasPersonalGap =
    !profile?.firstName ||
    !profile?.lastName ||
    !(profile?.emailAddress || profile?.email) ||
    !(profile?.phoneNo || profile?.phoneNumber) ||
    !profile?.gender ||
    !profile?.dateOfBirth;

  const hasInstitutionGap =
    !profile?.matricNo ||
    !(profile?.departmentName || profile?.department) ||
    profile?.level === undefined ||
    profile?.level === null;

  function handleCompleteProfile() {
    if (hasPersonalGap) {
      nav("/dashboard/account/my-account");
      return;
    }

    if (hasInstitutionGap) {
      nav("/dashboard/account/my-account/institution");
      return;
    }

    nav("/dashboard/account/my-account");
  }

  return (
    <div className="min-w-0 space-y-5 overflow-x-hidden sm:space-y-6 xl:space-y-7 pb-10">
      <Topbar />

      <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_430px] 2xl:grid-cols-[minmax(0,1fr)_470px] 2xl:gap-10">
        <div className="min-w-0 space-y-6 xl:space-y-7">
          <section className="overflow-hidden rounded-[24px] border border-[#DCD8FF] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(44,20,221,0.04)] sm:rounded-[26px] sm:px-5 sm:py-5 lg:rounded-[28px]">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="mx-auto h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-[4px] border-[#F3E4D7] bg-[radial-gradient(circle_at_50%_30%,#D5B08D_0%,#A86E45_62%,#8A5636_100%)] sm:mx-0 sm:h-[96px] sm:w-[96px] lg:h-[106px] lg:w-[106px]">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Student profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[30px] font-bold text-white/95 sm:text-[32px] lg:text-[34px]">
                    {loadingProfile ? "..." : initials}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 pt-0 text-center sm:pt-2 sm:text-left">
                <p className="text-[14px] font-semibold text-[#F4A13A] sm:text-[15px]">
                  Welcome Back,
                </p>

                <h2 className="mt-1 truncate text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-[#2F2AD9] sm:text-[28px] md:text-[30px] xl:text-[32px]">
                  {loadingProfile ? "Loading profile..." : displayName}
                </h2>

                <p className="mt-1 text-[13px] leading-[1.4] text-[#3E3E76] sm:text-[14px]">
                  {institutionName} - {matricNo}
                  <br />
                  {departmentName} - {levelText}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#E7EDF6]">
                <div
                  className="h-full rounded-full bg-[#22D04F] transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <button
                type="button"
                onClick={handleCompleteProfile}
                className="inline-flex cursor-pointer shrink-0 items-center gap-1 text-[11px] font-medium text-[#7E6EFF] transition hover:underline sm:text-[12px]"
              >
                {completion >= 100 ? "View Profile" : "Complete Profile"}
                <ProgressArrow />
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-5 rounded-[22px] bg-[#2E1FD9] px-4 py-4 text-white shadow-[0_20px_50px_rgba(44,20,221,0.18)] sm:px-5 sm:py-5 lg:rounded-[24px] lg:px-6 lg:py-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[17px] bg-[#6556F5] sm:h-[62px] sm:w-[62px] sm:rounded-[18px]">
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#FFB130]" />
                <BadgeFeeIcon />
              </div>

              <div className="min-w-0">
                <p className="text-[14px] text-white/90 sm:text-[15px]">
                  You have <span className="font-extrabold text-[#FF6A6A]">{debtCount}</span>{" "}
                  Outstanding Fees
                </p>
                <h3 className="mt-1 text-[30px] font-extrabold leading-none tracking-[-0.02em] sm:text-[34px] xl:text-[36px]">
                  ₦{debtTotal.toLocaleString()}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => nav("/dashboard/payments/overdue")}
              className="inline-flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[16px] bg-[#4735F5] px-6 text-[15px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition hover:brightness-110 active:scale-[0.99] sm:w-auto sm:rounded-[18px] sm:px-7 sm:text-[16px]"
            >
              Pay Now
              <ChevronRight size={20} color="white" strokeWidth={2.5} />
            </button>
          </section>

          <section className="rounded-[24px] border border-[#DCD8FF] bg-white px-4 py-5 shadow-[0_10px_30px_rgba(44,20,221,0.04)] sm:px-5 lg:rounded-[28px]">
            <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-[#2B2772] sm:text-[18px]">
              Quick Actions
            </h3>

            <div className="mt-5">
              <QuickActions
                onPayFees={() => nav("/dashboard/payments")}
                onHistory={() => nav("/dashboard/transactions")}
                onBookstore={() => nav("/dashboard/bookstore")}
                onBuyAirtime={() => nav("/dashboard/payments/airtime")}
                onBuyData={() => nav("/dashboard/payments/data")}
                onNotifications={() => nav("/dashboard/notifications")}
                onSupport={() => nav("/dashboard/account/contact-admin")}
                onSettings={() => nav("/dashboard/account/settings")}
              />
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[20px] bg-[#2E0FE0] px-6 py-8 text-white shadow-sm sm:px-10 sm:py-10">
            {/* Full Image Background (Hidden on small screens to prevent overlap) */}
            <div 
              className="absolute inset-0 hidden border border-transparent md:block"
              style={{
                backgroundImage: `url(${quickPayImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat"
              }}
            />
            
            <div className="relative z-10 max-w-[280px] sm:max-w-[340px]">
              <h3 className="text-[32px] font-bold leading-none tracking-[-0.02em] sm:text-[40px]">
                Quick Pay
              </h3>

              <p className="mt-4 text-[13px] leading-relaxed text-white/95">
                Make a quick payment. Pay for someone else
                <br />
                and do much more..
              </p>

              <button
                type="button"
                onClick={() => nav("/quickpay")}
                className="mt-6 inline-flex h-[42px] cursor-pointer items-center justify-center rounded-[12px] bg-white px-8 text-[13px] font-semibold text-[#111111] transition hover:bg-[#F8F9FA] active:scale-[0.99]"
              >
                Pay Now
              </button>
            </div>
          </section>
        </div>

        <div className="min-w-0 xl:sticky xl:top-7 xl:h-fit">
          <RecentTransactions
            transactions={recentTxs}
            loading={loadingTxs}
            onViewAll={() => nav("/dashboard/transactions")}
            onViewItem={(id) => nav(`/dashboard/transaction/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}