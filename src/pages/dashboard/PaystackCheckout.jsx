import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function PaystackCheckout() {
  const nav = useNavigate();

  return (
    <div className="rounded-[28px] bg-[#2C14DD] text-white p-8 md:p-10 min-h-[520px]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 items-center">
        <div className="text-center lg:text-left">
          <div className="w-[160px] h-[120px] rounded-3xl bg-white/10 mb-10" />
          <h2 className="text-5xl font-extrabold">₦20,983.00</h2>
          <p className="mt-4 text-lg text-white/90">
            Payment for: SUG Dues (25/25
            <br />
            Academic Session) - 1st Semester
          </p>
        </div>

        <div className="bg-white rounded-[50px] p-6 md:p-8 text-[#14143A]">
          <div className="h-[320px] rounded-[30px] bg-[#F3F4FF] border border-[#E7E9FF] flex items-center justify-center text-[#9AA0B4]">
            Paystack Card UI (mock)
          </div>

          <Button
            className="mt-6 w-full h-14"
            onClick={() => nav("/dashboard/success")}
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
}
