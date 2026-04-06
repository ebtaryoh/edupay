import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { institutionApi, departmentApi, levelApi, feesApi, billingApi, paymentApi } from "../../api/fees";
import img from "../../assets/quickpay/quickpay-payment.jpg";

export default function Payments() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    email2: "",
    phone: "",
    institutionID: "",
    departmentID: "",
    levelID: "",
    feeTypeID: "",
    matRegNo: "",
    gateway: "paystack",
  });

  const [institutions, setInstitutions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  
  const [loadingDropdowns, setLoadingDropdowns] = useState({
    inst: true,
    dept: false,
    level: false,
    fees: true
  });

  const [loading, setLoading] = useState(false);
  const [fetchingBill, setFetchingBill] = useState(false);
  const [bill, setBill] = useState(null);
  const [err, setErr] = useState("");

  const [allDepts, setAllDepts] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const results = await Promise.allSettled([
          institutionApi.getInstitutions(), 
          feesApi.getFeeTypeDropdown(),
          departmentApi.getDepartments(),
          levelApi.getAllLevels()
        ]);
        
        const getArr = (res, nested = false) => {
          if (res.status !== "fulfilled") return [];
          const val = res.value;
          const data = nested ? (val?.data?.data || val?.data || val) : (val?.data || val);
          return Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
        };

        const instList = getArr(results[0], true);
        setInstitutions(instList);
        setFeeTypes(getArr(results[1], false));
        
        const deptList = getArr(results[2], true);
        setAllDepts(deptList);
        // Initially empty until institution is selected
        setDepartments([]); 

        setLevels(getArr(results[3], true));
      } catch (e) {
        console.error("INIT ERROR:", e);
      } finally {
        setLoadingDropdowns({ inst: false, dept: false, level: false, fees: false });
      }
    }
    init();
  }, []);

  const [manualAmount, setManualAmount] = useState("");

  const handleInstitutionChange = (targetId) => {
    // Find the institution object
    const selectedInst = institutions.find(i => (i.id || i.value) === targetId);
    const instId = selectedInst?.id || targetId;

    setForm(s => ({ ...s, institutionID: instId, departmentID: "", levelID: "" }));
    setBill(null);
    setManualAmount("");
    setErr("");

    if (!targetId) {
        setDepartments([]);
        return;
    }

    // Frontend filtering because the backend filtering with 'code' is empty
    const filteredDepts = allDepts.filter(d => d.institutionId === instId);
    setDepartments(filteredDepts);
  };

  // Fetch bill when relevant IDs are selected
  useEffect(() => {
    async function fetchBill() {
      if (!form.institutionID || !form.departmentID || !form.levelID) {
        setBill(null);
        return;
      }
      try {
        setFetchingBill(true);
        setErr("");
        setManualAmount("");
        
        // Ensure LevelId is an integer for .NET binding
        const levelInt = parseInt(form.levelID);
        const res = await billingApi.getUnregisteredBill(levelInt, form.departmentID, form.institutionID);
        const data = res?.data || res;
        
        console.log("QUICKPAY BILL RESPONSE:", data);

        let foundBill = null;
        if (Array.isArray(data) && data.length > 0) {
          foundBill = data.find(b => b.feeTypeId == form.feeTypeID) || data[0];
        } else if (data && (data.id || data.billId || data.amount)) {
          foundBill = data;
        }

        if (foundBill) {
          setBill(foundBill);
        } else {
          setBill(null);
          // Don't show error, just allow manual amount later
        }
      } catch (e) {
        console.error("BILL FETCH ERROR:", e);
        setBill(null);
      } finally {
        setFetchingBill(false);
      }
    }
    fetchBill();
  }, [form.institutionID, form.departmentID, form.levelID, form.feeTypeID]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    
    if (form.email !== form.email2) return setErr("Emails do not match.");
    if (!form.institutionID || !form.feeTypeID || !form.email) return setErr("Please fill all required fields.");
    
    // Final check: if bill is missing, we must have a manual amount
    const finalAmount = bill ? (bill.amount || 0) : Number(manualAmount);
    if (!bill && (!manualAmount || finalAmount <= 0)) {
        if (fetchingBill) return setErr("Please wait for the bill to be retrieved.");
        return setErr("Please enter the amount you wish to pay.");
    }

    setLoading(true);
    try {
        // Final Polished Checkout: CamelCase (Swagger) + Placeholder UUID
        const selectedFeeType = feeTypes.find(f => f.value == form.feeTypeID);
        const purpose = selectedFeeType?.text || "General Payment";

        const payload = {
            emailAddress: form.email,
            phoneNumber: form.phone,
            paymentPurpose: purpose,
            institutionId: form.institutionID,
            amountPaid: Number(finalAmount),
            matricNo: form.matRegNo || "GUEST",
            paymentChannelId: 0, // Web
            // Backend requires a valid UUID even if manually entered
            feeStructureId: bill?.feeStructureId || bill?.id || "00000000-0000-0000-0000-000000000000" 
        };

        console.log("QUICKPAY FINAL POLISH:", payload);
        const res = await paymentApi.initiatePayment(payload);
        const data = res?.data || res;
        
        // Handle both direct and nested data for Paystack URL
        const authUrl = data?.authorizationUrl || data?.data?.authorizationUrl;

        if (authUrl) {
          // Success! Redirect to checkout
          nav("/quickpay/checkout", { state: data?.data || data });
        } else {
          throw new Error("Failed to initiate payment. No checkout URL received.");
        }
      } catch (e) {
        console.error("PAYMENT POST ERROR:", e);
        
        // Master Diagnostic: Parse .NET Validation Errors from custom http.js
        let errorMsg = e.message || "Payment initiation failed.";
        
        // http.js attaches data to e.data or e.payload
        const d = e.data || e.payload || e.response?.data;
        
        if (d) {
           // Handle standard ASP.NET ValidationProblem errors
           if (d.errors) {
              errorMsg = "Validation Failed: " + Object.entries(d.errors)
                .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
                .join(" | ");
           } else if (d.message) {
              errorMsg = d.message;
           } else if (typeof d === 'string' && d.length < 200) {
              errorMsg = d;
           }
        }
        
        setErr(errorMsg);
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 min-h-screen">
        <div className="px-8 lg:px-16 py-10">
          <div className="flex items-center gap-6">
            <button
              onClick={() => nav(-1)}
              className="w-12 h-12 rounded-full bg-[#F5F6FF] flex items-center justify-center transition hover:bg-[#E8E9FF]"
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h1 className="text-4xl font-extrabold text-[#13085E]">
              Payments
            </h1>
          </div>

          <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-5">
            {/* Bill Summary Alert */}
            {fetchingBill && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 text-blue-700 animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">Fetching bill details...</span>
              </div>
            )}

            {bill && (
              <div className="bg-[#F6F7FF] border border-[#E7E9FF] rounded-2xl p-5 flex items-center justify-between shadow-sm animate-in zoom-in-95 duration-300">
                <div>
                  <p className="text-[14px] font-medium text-[#13085E]/60 uppercase tracking-wider">Amount to Pay</p>
                  <p className="text-[28px] font-extrabold text-[#2C14DD]">
                    ₦{(bill.amount || 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                   <p className="text-xs font-semibold text-[#13085E]">Bill #</p>
                   <p className="text-xs text-[#13085E]/70">{ (bill.id || bill.billId || "").slice(-8).toUpperCase()}</p>
                </div>
              </div>
            )}

            {!bill && !fetchingBill && form.levelID && (
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-amber-900/70 uppercase tracking-wider px-1">Amount to Pay (₦)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount e.g. 5000"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="border-amber-200 focus:border-amber-400 bg-white"
                  />
                </div>
                <p className="text-[11px] text-amber-700/80 font-medium leading-relaxed">
                  <span className="font-bold">Note:</span> No pre-generated bill was found for this selection. You can enter the amount manually to proceed with the payment.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                required
              />
              <Input
                placeholder="Re-enter Email address"
                value={form.email2}
                onChange={(e) => setForm((s) => ({ ...s, email2: e.target.value }))}
                required
              />
            </div>
            
            <Input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              required
            />

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#13085E] px-1">Institution</label>
              <select
                className="w-full h-14 rounded-[15px] border border-[#E7E9FF] bg-[#F6F7FF] px-5 focus:outline-none focus:border-[#2C14DD] transition disabled:opacity-50"
                value={form.institutionID}
                onChange={(e) => handleInstitutionChange(e.target.value)}
                disabled={loadingDropdowns.inst}
              >
                <option value="">Select Institution</option>
                {institutions?.map?.(i => (
                  <option key={i.value || i.id || i.code} value={i.value || i.id || i.code}>
                    {i.text || i.name || i.label || i.institutionName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#13085E] px-1">Department</label>
                <select
                  className="w-full h-14 rounded-[15px] border border-[#E7E9FF] bg-[#F6F7FF] px-5 focus:outline-none focus:border-[#2C14DD] transition disabled:opacity-50"
                  value={form.departmentID}
                  onChange={(e) => setForm(s => ({ ...s, departmentID: e.target.value }))}
                  disabled={!form.institutionID || loadingDropdowns.dept}
                >
                  <option value="">Select Department</option>
                  {departments?.map?.(d => (
                    <option key={d.value || d.id || d.code} value={d.value || d.id || d.code}>
                      {d.text || d.name || d.label || d.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#13085E] px-1">Level</label>
                <select
                  className="w-full h-14 rounded-[15px] border border-[#E7E9FF] bg-[#F6F7FF] px-5 focus:outline-none focus:border-[#2C14DD] transition disabled:opacity-50"
                  value={form.levelID}
                  onChange={(e) => setForm(s => ({ ...s, levelID: e.target.value }))}
                  disabled={!form.institutionID || loadingDropdowns.level}
                >
                  <option value="">Select Level</option>
                  {levels?.map?.(l => (
                    <option key={l.value || l.id || l.code} value={l.value || l.id || l.code}>
                      {l.text || l.name || l.label || l.levelName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              placeholder="Enter Mat. No/Reg. No"
              value={form.matRegNo}
              onChange={(e) => setForm((s) => ({ ...s, matRegNo: e.target.value }))}
            />

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#13085E] px-1">Select Fee Type</label>
              <select
                className="w-full h-14 rounded-[15px] border border-[#E7E9FF] bg-[#F6F7FF] px-5 focus:outline-none focus:border-[#2C14DD] transition disabled:opacity-50"
                value={form.feeTypeID}
                onChange={(e) => setForm((s) => ({ ...s, feeTypeID: e.target.value }))}
                disabled={loadingDropdowns.fees}
              >
                <option value="">Select Fee</option>
                {feeTypes?.map?.(f => (
                  <option key={f.value || f.id || f.code} value={f.value || f.id || f.code}>
                    {f.text || f.name || f.label || f.feeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 hidden">
               <Input
                placeholder="Payment Gateway"
                value={form.gateway}
                disabled
              />
            </div>

            {err ? <p className="text-red-600 text-sm font-medium">{err}</p> : null}

            <Button disabled={loading || loadingDropdowns.inst}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : "Proceed to Pay"}
            </Button>
          </form>
        </div>

        <div className="hidden lg:block">
          <div className="h-full w-full overflow-hidden rounded-l-[60px]">
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover grayscale brightness-90 saturate-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

