import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import AdminAccountMenu from "./AdminAccountMenu";

function BackArrow() {
  return <ArrowLeft size={24} color="white" strokeWidth={2.5} />;
}

function CameraIcon() {
  return <Camera size={22} color="white" strokeWidth={2} />;
}

function getProfile() {
  return {
    fullName: "Ayotunde K. Samuel",
    institutionLine: "UNILAG - CSC/2021/001",
    courseLine: "Computer Science - 300 Level",
    photo:
      localStorage.getItem("adminPhoto") ||
      localStorage.getItem("studentPhoto") ||
      "",
  };
}

export default function AdminAccountProfileLayout({
  activeKey,
  children,
}) {
  const nav = useNavigate();
  const profile = getProfile();

  return (
    <div className="min-h-[calc(100vh-24px)] min-w-0 xl:min-w-[1440px] rounded-[32px] bg-[#2F1FD9] px-6 py-6 md:px-10 md:py-8 overflow-x-auto">
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center"
        >
          <BackArrow />
        </button>

        <h1 className="text-[24px] font-medium text-white md:text-[26px]">
          Account
        </h1>
      </div>

      <div className="mt-10 flex flex-col gap-8 xl:flex-row xl:items-start">
        <div className="relative h-[164px] w-[164px] shrink-0 rounded-full border-[6px] border-[#F2D9BC] bg-[radial-gradient(circle_at_50%_30%,#D6B18E_0%,#A96E46_62%,#8A5636_100%)] overflow-hidden">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[46px] font-bold text-white">
              AK
            </div>
          )}

          <button
            type="button"
            className="absolute bottom-1 right-1 flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full border-[4px] border-[#E6E0FF] bg-[#8F81F7]"
          >
            <CameraIcon />
          </button>
        </div>

        <div className="pt-3 text-white">
          <h2 className="text-[36px] font-medium leading-none md:text-[40px]">
            {profile.fullName}
          </h2>

          <p className="mt-5 text-[17px] leading-[1.35] text-white">
            {profile.institutionLine}
            <br />
            {profile.courseLine}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-[40px] bg-[#D8D5F2] px-8 py-10 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[420px_minmax(0,1fr)] xl:gap-16">
          <div className="max-w-[420px]">
            <AdminAccountMenu activeKey={activeKey} />
          </div>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}