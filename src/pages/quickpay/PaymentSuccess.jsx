import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import img from "../../assets/quickpay/Quickpay - Payment Successful.png";

export default function PaymentSuccess() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left status */}
        <div className="px-8 lg:px-16 py-12 flex items-center justify-center">
          <div className="w-full max-w-xl text-center">
            <img src={img} alt="" className="w-full object-contain" />

            <div className="mt-10 space-y-4">
              <Button onClick={() => {}}>Share Receipt</Button>
              <Button onClick={() => {}}>View Receipt</Button>
              <Button onClick={() => {}}>Download Receipt</Button>
              <Button variant="dark" onClick={() => nav("/quickpay")}>
                Make Another Payment
              </Button>
            </div>

            <p className="mt-8 text-[#8E8EA8]">
              Want to do more?{" "}
              <button onClick={() => nav("/signup")} className="text-[#B23BFF] font-semibold hover:underline">
                Create An Account
              </button>
            </p>
          </div>
        </div>

        {/* Right empty / optional image area (your design is mostly white here) */}
        <div className="hidden lg:block" />
      </div>
    </div>
  );
}
