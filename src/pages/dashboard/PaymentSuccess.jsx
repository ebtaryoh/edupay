import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function PaymentSuccess() {
  const nav = useNavigate();

  return (
    <div className="min-h-[720px] flex items-center justify-center">
      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-[#2C14DD] text-white flex items-center justify-center text-3xl font-bold">
            ✓
          </div>
          <h2 className="mt-10 text-5xl font-extrabold text-[#14143A]">
            Payment
            <br />
            Successful
          </h2>
          <p className="mt-4 text-[#9AA0B4]">
            A receipt has been sent to your email.
          </p>
        </div>

        <div className="space-y-5 max-w-[520px] mx-auto w-full">
          <Button className="w-full h-16">Share Receipt</Button>
          <Button className="w-full h-16">View Receipt</Button>
          <Button className="w-full h-16">Download Receipt</Button>

          <Button
            variant="dark"
            className="w-full h-16 mt-8"
            onClick={() => nav("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
