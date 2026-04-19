import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPaymentsShell from "../../components/admin/AdminPaymentsShell";
import { feesApi, departmentApi } from "../../api/fees";
import { parseJwt } from "../../api/http";

import { Calendar, ChevronDown } from "lucide-react";

function CalendarIcon() {
  return <Calendar size={28} color="#3827ED" strokeWidth={2} />;
}

function ChevronDownIcon() {
  return <ChevronDown size={22} color="#151515" strokeWidth={2.5} />;
}

function FieldLabel({ children }) {
  return <p className="text-[14px] text-[#6F7488]">{children}</p>;
}

export default function AdminCreateFee() {
  const nav = useNavigate();
  const [form, setForm] = useState({ feeName: "", startDate: "", departmentId: "" });
  const [departments, setDepartments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    departmentApi.getDepartmentsForDropdown()
      .then(res => {
        const raw = res?.data || res || [];
        setDepartments(Array.isArray(raw) ? raw : []);
      })
      .catch(() => {});
  }, []);

  function getInstitutionId() {
    let id = localStorage.getItem("institutionId") || "";
    if (!id) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = parseJwt(token);
          id =
            decoded?.institutionId ||
            decoded?.instid ||
            decoded?.institutionID ||
            decoded?.InstitutionId ||
            "";
          if (id) localStorage.setItem("institutionId", id);
        }
      } catch (_) {}
    }
    return id;
  }

  async function handleContinue() {
    setError("");
    if (!form.feeName.trim()) { setError("Fee name is required."); return; }
    if (!form.startDate) { setError("Please select a start date."); return; }

    const institutionId = getInstitutionId();

    const payload = {
      feeName: form.feeName.trim(),
      feeStructureName: form.feeName.trim(), // some APIs use this field name
      startDate: new Date(form.startDate).toISOString(),
      institutionId: institutionId || undefined,
      departmentId: form.departmentId ? form.departmentId : null,
    };

    console.log("[CreateFee] Submitting payload:", payload);

    try {
      setSubmitting(true);
      await feesApi.createFeeStructure(payload);
      nav("/admin/dashboard/payments/fees");
    } catch (err) {
      console.error("[CreateFee] Error:", err?.payload ?? err);
      // Show detailed validation errors if present
      const serverErrors = err?.payload?.errors;
      if (serverErrors && typeof serverErrors === "object") {
        const messages = Object.values(serverErrors).flat().join(" ");
        setError(messages || err?.message || "Failed to create fee.");
      } else {
        setError(err?.message || "Failed to create fee.");
      }
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <AdminPaymentsShell title="Payments" activeKey="manage-fees">
      <div className="w-full max-w-[560px] pt-2">
        <h2 className="text-[54px] font-extrabold leading-none tracking-[-0.03em] text-[#110F57]">
          Create Fee
        </h2>

        <p className="mt-6 text-[18px] text-[#2E2E36]">
          Set the fee amount, duration and assign user(s).
        </p>

        <div className="mt-20 space-y-14">
          <div>
            <FieldLabel>Fee Name</FieldLabel>
            <input
              value={form.feeName}
              onChange={e => setForm(f => ({...f, feeName: e.target.value}))}
              placeholder="e.g. SUG Dues (25/26 Academic Session)"
              className="mt-3 w-full border-b border-[#D0D0E0] bg-transparent pb-2 text-[18px] font-medium text-[#131525] outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <FieldLabel>Duration of Fee</FieldLabel>
              <input
                type="date"
                value={form.startDate}
                onChange={e => setForm(f => ({...f, startDate: e.target.value}))}
                className="mt-3 w-full border-b border-[#D0D0E0] bg-transparent pb-2 text-[18px] font-medium text-[#131525] outline-none"
              />
            </div>
            {/* <button type="button" className="cursor-pointer">
              <CalendarIcon />
            </button> */}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <FieldLabel>Assign Department/Faculty</FieldLabel>
              <select
                value={form.departmentId}
                onChange={e => setForm(f => ({...f, departmentId: e.target.value}))}
                className="mt-3 w-full border-b border-[#D0D0E0] bg-transparent pb-2 text-[18px] font-medium text-[#131525] outline-none"
              >
                <option value="">Select Department/Faculty</option>
                {departments.map(d => (
                  <option key={d.id || d.value} value={d.id || d.value}>
                    {d.text || d.name || d.label || d.departmentName}
                  </option>
                ))}
              </select>
            </div>
            {/* <button type="button" className="cursor-pointer">
              <ChevronDown />
            </button> */}
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="button"
          onClick={handleContinue}
          disabled={submitting}
          className="mt-20 inline-flex h-[72px] w-full cursor-pointer items-center justify-center rounded-full bg-[#3827ED] text-[18px] font-semibold text-white transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Continue"}
        </button>
      </div>
    </AdminPaymentsShell>
  );
}