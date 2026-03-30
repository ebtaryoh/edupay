import { useNavigate } from "react-router-dom";
import AdminAccountShell from "../../../components/admin/account/AdminAccountShell";

const admins = [
  "Johnny\nSurname",
  "Angela\nSurname",
  "Angela\nSurname",
  "Adam\nSurname",
  "David\nSurname",
  "Abraham\nSurname",
  "Xerxus\nSurname",
  "Nomad\nSurname",
  "Naveen\nSurname",
  "David\nSurname",
  "Abraham\nSurname",
  "Xerxus\nSurname",
  "Nomad\nSurname",
  "Naveen\nSurname",
  "David\nSurname",
  "Abraham\nSurname",
  "Xerxus\nSurname",
  "Nomad\nSurname",
  "Naveen\nSurname",
];

function Avatar({ label, add = false, onClick }) {
  const [first, second] = label.split("\n");

  return (
    <button type="button" onClick={onClick} className="group text-center">
      <div className={[
        "relative mx-auto flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full text-sm font-bold",
        add ? "bg-[#A3A3A3] text-white" : "bg-[linear-gradient(135deg,#2F6BFF_0%,#F6D2DA_100%)] text-white",
      ].join(" ")}>
        {add ? null : <span className="rounded-full bg-white/20 px-3 py-2">{first?.[0]}{second?.[0]}</span>}
        {add ? <span className="absolute bottom-[-2px] right-[-2px] flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#3724E9] text-[20px] text-white">+</span> : null}
      </div>
      <p className="mt-3 whitespace-pre-line text-[14px] leading-[1.15] text-[#6D7387]">{label}</p>
    </button>
  );
}

export default function AdminUserManagementAdministrators() {
  const nav = useNavigate();

  return (
    <AdminAccountShell
      title="Administrators"
      activeKey="user-management"
      right={
        <div className="max-w-[760px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <input
                placeholder="Search Students"
                className="h-[44px] w-[150px] rounded-[8px] border border-[#E8EAF5] bg-white px-3 text-[14px] outline-none placeholder:text-[#7C8090]"
              />

              <div className="flex rounded-[8px] border border-[#E8EAF5] bg-white p-1">
                <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] text-[#C0C3D0]">☷</button>
                <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#4E68F0] text-white">▦</button>
              </div>
            </div>

            <button className="h-[44px] rounded-[8px] border border-[#E8EAF5] bg-white px-4 text-[14px] text-[#687089]">
              ⇅ Sort By A-Z ⌄
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            <Avatar
              label="Add User"
              add
              onClick={() => nav("/admin/dashboard/account/user-management/add-user/personal")}
            />
            {admins.map((person, index) => (
              <Avatar
                key={`${person}-${index}`}
                label={person}
                onClick={() => nav(`/admin/dashboard/account/user-management/administrators/admin-${index + 1}`)}
              />
            ))}
          </div>

          <div className="mt-16 flex items-center justify-center gap-5 text-[13px] text-[#B1B3C0]">
            <button>‹ Previous</button>
            <div className="flex items-center gap-3">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span className="font-semibold text-[#171C34]">5</span>
              <span>6</span>
              <span>7</span>
            </div>
            <button>Next ›</button>
          </div>
        </div>
      }
    />
  );
}
