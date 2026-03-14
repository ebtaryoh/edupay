import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import img from "../../assets/quickpay/quickpay-home.jpg";
import paystack from "../../assets/quickpay/paystack-icon.png";

export default function QuickPayHome() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 min-h-screen">
        {/* Left */}
        <div className="px-8 lg:px-16 py-7 text-center">
          <h1 className="text-5xl font-bold text-[#13085E]">Welcome!</h1>
          <p className="mt-2 text-lg  text-[#13085E]">
            What payment are you making today?
          </p>

          {/* QuickPay Card */}
          <div className="mt-5 w-full max-w-md rounded-[28px] bg-[#2C14DD] p-13 text-white">
            <div className="h-40 flex items-center justify-center">
              <img src={paystack} alt="" className="w-50 h-47" />
            </div>

            <h2 className="mt-4 text-4xl font-extrabold">Quick Pay</h2>
            <p className="mt-3 text-[18px] text-white/80 leading-relaxed">
              No account needed. Pay to any institution. Quick, fast and
              reliable.
            </p>

            <div className="mt-8">
              <button
  type="button"
  onClick={() => nav("/quickpay/payments")}
  className="mt-10 h-[60px] w-full rounded-full bg-white text-[#2C14DD] font-semibold text-[16px] hover:brightness-95 active:scale-[0.99] transition"
>
  Pay Now
</button>
            </div>
          </div>

         <div className="mt-8 w-full max-w-md">
  <div className="h-[72px] rounded-[30px] bg-[#2412B8] px-3 flex items-center gap-3">
    
    {/* Static Login Label */}
    <div className="h-[52px] px-8 rounded-[22px]  flex items-center justify-center">
      <span className="text-white font-semibold text-[16px]">
        Login
      </span>
    </div>

    {/* Student Button */}
    <button
      type="button"
      onClick={() => nav("/login/student")}
      className="flex-1 h-[52px] rounded-[22px] bg-[#2C14DD] text-white font-semibold text-[15px] hover:brightness-110 transition active:scale-[0.98]"
    >
      Student
    </button>

    {/* Admin Button */}
    <button
      type="button"
      onClick={() => nav("/login/admin")}
      className="flex-1 h-[52px] rounded-[22px] bg-[#2C14DD] text-white font-semibold text-[15px] hover:brightness-110 transition active:scale-[0.98]"
    >
      Admin
    </button>
  </div>
</div>
        </div>

        {/* Right image */}
        <div className="hidden lg:block ">
          <div className="h-full w-full overflow-hidden rounded-l-[60px]">
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
