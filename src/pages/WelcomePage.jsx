import { useNavigate } from "react-router-dom";
import img from "../assets/quickpay/quickpay-home.jpg";
import coinsImg from "../assets/welcome/coins.png";

export default function WelcomePage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left column */}
        <div className="flex flex-col items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-[#13085E]">Welcome!</h1>
            <p className="mt-2 text-base text-[#13085E]/70">
              What payment are you making today?
            </p>

            {/* Quick Pay Card */}
            <div className="mt-6 w-full rounded-[28px] bg-[#2C14DD] px-7 py-7 text-white">
              {/* Card art */}
              <div className="flex h-44 items-center justify-center">
                <img 
                  src={coinsImg} 
                  alt="Quick Pay" 
                  className="h-48 w-auto object-contain scale-110"
                />
              </div>

              <h2 className="mt-3 text-center text-3xl font-extrabold">Quick Pay</h2>
              <p className="mt-2 text-center text-sm leading-relaxed text-white/75 px-4">
                No account needed. Pay to any institution. Quick, fast and
                reliable.
              </p>

              <button
                type="button"
                onClick={() => nav("/quickpay/payments")}
                className="mt-6 h-[52px] w-full cursor-pointer rounded-full bg-white text-[#2C14DD] font-semibold text-[15px] hover:brightness-95 active:scale-[0.99] transition"
              >
                Pay Now
              </button>
            </div>

            {/* Login tab bar */}
            <div className="mt-5 w-full">
              <div className="h-[68px] rounded-[30px] bg-[#2412B8] px-2.5 flex items-center gap-2">
                {/* Static "Login" label */}
                <div className="flex h-[50px] items-center justify-center px-5">
                  <span className="text-white font-semibold text-[15px]">
                    Login
                  </span>
                </div>

                {/* Student */}
                <button
                  type="button"
                  id="welcome-student-login"
                  onClick={() => nav("/login/student")}
                  className="flex-1 h-[50px] rounded-[22px] bg-[#2C14DD] text-white font-semibold text-[14px] hover:brightness-110 transition active:scale-[0.98] cursor-pointer"
                >
                  Student
                </button>

                {/* Admin */}
                <button
                  type="button"
                  id="welcome-admin-login"
                  onClick={() => nav("/login/admin")}
                  className="flex-1 h-[50px] rounded-[22px] bg-[#2C14DD] text-white font-semibold text-[14px] hover:brightness-110 transition active:scale-[0.98] cursor-pointer"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: B&W photo */}
        <div className="hidden lg:block">
          <div className="h-full w-full overflow-hidden rounded-l-[60px]">
            <img
              src={img}
              alt="Student with phone"
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
