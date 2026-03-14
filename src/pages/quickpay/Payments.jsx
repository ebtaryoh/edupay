import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { quickpayApi } from "../../api/quickpay";
import img from "../../assets/quickpay/quickpay-payment.jpg";

export default function Payments() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    email2: "",
    phone: "",
    institutionID: "",
    matRegNo: "",
    fee: "",
    gateway: "paystack",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (form.email !== form.email2) return setErr("Emails do not match.");

    setLoading(true);
    try {
      const data = await quickpayApi.initiate(form);
      // Expect backend returns something like: { reference, authorizationUrl }
      nav("/quickpay/checkout", { state: data });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 min-h-screen">
        <div className="px-8 lg:px-16 py-10">
        <div className=" flex items-center gap-6">  <button
            onClick={() => nav(-1)}
            className="w-12 h-12 rounded-full bg-[#F5F6FF] flex items-center justify-center"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className=" text-4xl font-extrabold text-[#13085E]">
            Payments
          </h1></div>

          <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-5">
            <Input
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
            />
            <Input
              placeholder="Re-enter Email address"
              value={form.email2}
              onChange={(e) =>
                setForm((s) => ({ ...s, email2: e.target.value }))
              }
            />
            <Input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm((s) => ({ ...s, phone: e.target.value }))
              }
            />
            <Input
              placeholder="Select Institution"
              value={form.institutionID}
              onChange={(e) =>
                setForm((s) => ({ ...s, institutionID: e.target.value }))
              }
            />
            <Input
              placeholder="Enter Mat. No/Reg. No"
              value={form.matRegNo}
              onChange={(e) =>
                setForm((s) => ({ ...s, matRegNo: e.target.value }))
              }
            />
            <Input
              placeholder="Select Fee"
              value={form.fee}
              onChange={(e) => setForm((s) => ({ ...s, fee: e.target.value }))}
            />
            <Input
              placeholder="Select Payment Gateway (paystack)"
              value={form.gateway}
              onChange={(e) =>
                setForm((s) => ({ ...s, gateway: e.target.value }))
              }
            />

            {err ? <p className="text-red-600 text-sm">{err}</p> : null}

            <Button disabled={loading}>
              {loading ? "Processing..." : "Proceed to Pay"}
            </Button>
          </form>
        </div>

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
