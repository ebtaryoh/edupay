import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAccountProfileLayout from "../../../components/admin/account/AdminAccountProfileLayout";
import { institutionApi } from "../../../api/fees";
import { parseJwt } from "../../../api/http";

function EditableField({ label, value, onChange, placeholder, type = "text", error, disabled }) {
  return (
    <div className="rounded-[18px] bg-white px-6 py-4">
      <p className="text-[14px] font-medium text-[#A1A6B8]">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1 w-full bg-transparent text-[18px] font-medium text-[#171B31] outline-none placeholder:text-[#B8BDD0] disabled:cursor-not-allowed disabled:opacity-70"
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export default function AdminMyAccountInstitution() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phoneNo: "",
    email: "",
    address: "",
    state: "",
    lga: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [institutionId, setInstitutionId] = useState(null);

  useEffect(() => {
    async function loadInstitution() {
      try {
        const token = localStorage.getItem("token");
        let instId = null;

        if (token) {
          const decoded = parseJwt(token);
          instId =
            decoded?.institutionId ||
            decoded?.instid ||
            decoded?.institutionID ||
            "";
        }

        if (!instId) {
          console.warn(">>> NO INSTITUTION ID FOUND IN ADMIN TOKEN");
          setLoading(false);
          return;
        }

        setInstitutionId(instId);
        const res = await institutionApi.getInstitutionById(instId);
        const inst = res?.data || res || {};

        setForm({
          name: inst.name || inst.institutionName || "",
          phoneNo: inst.phoneNo || inst.phoneNumber || "",
          email: inst.email || inst.emailAddress || "",
          address: inst.address || "",
          state: inst.state || "",
          lga: inst.lga || "",
        });
      } catch (error) {
        console.error("FAILED TO LOAD INSTITUTION DETAILS:", error);
      } finally {
        setLoading(false);
      }
    }

    loadInstitution();
  }, []);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitError("");
    setSuccessMessage("");
  }

  async function handleSave() {
    if (!institutionId) return;

    try {
      setSaving(true);
      setSubmitError("");
      setSuccessMessage("");

      const payload = {
        id: institutionId,
        name: form.name.trim(),
        phoneNo: form.phoneNo.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        state: form.state.trim(),
        lga: form.lga.trim(),
        logoUrl: "", // Keep existing logo structure if backend ignores blank, or map safely.
      };

      await institutionApi.updateInstitution(payload);
      setSuccessMessage("Institution details updated successfully");
    } catch (error) {
      console.error("UPDATE INSTITUTION ERROR:", error);
      setSubmitError(error?.message || "Failed to update institution information");
    } finally {
      setSaving(false);
    }
  }

  const saveDisabled = loading || saving;

  return (
    <AdminAccountProfileLayout activeKey="my-account">
      <div className="w-full">
        <div className="mb-8 flex items-center gap-8 text-[16px]">
          <button
            type="button"
            onClick={() => nav("/admin/dashboard/account/my-account")}
            className="cursor-pointer border-r border-[#C9C6DA] pr-8 text-[#7D7992]"
          >
            Personal Information
          </button>

          <button
            type="button"
            className="cursor-pointer font-semibold text-[#171B31]"
          >
            Institution
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <EditableField
              label="Institution Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={loading || saving}
              placeholder="e.g University of Lagos"
            />
          </div>
          <EditableField
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={loading || saving}
            placeholder="Official email address"
          />
          <EditableField
            label="Phone Number"
            value={form.phoneNo}
            onChange={(e) => handleChange("phoneNo", e.target.value)}
            disabled={loading || saving}
            placeholder="Contact phone"
          />
          <div className="md:col-span-2">
            <EditableField
              label="Address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={loading || saving}
              placeholder="Full physical address"
            />
          </div>
          <EditableField
            label="State"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
            disabled={loading || saving}
            placeholder="State"
          />
          <EditableField
            label="Local Govt Area"
            value={form.lga}
            onChange={(e) => handleChange("lga", e.target.value)}
            disabled={loading || saving}
            placeholder="LGA"
          />
        </div>

        {submitError ? (
          <p className="mt-4 text-sm font-medium text-red-600">{submitError}</p>
        ) : null}

        {successMessage ? (
          <p className="mt-4 text-sm font-medium text-green-600">{successMessage}</p>
        ) : null}

        <div className="mt-10 flex justify-center xl:justify-start">
          <button
            type="button"
            onClick={handleSave}
            disabled={saveDisabled}
            className="flex h-[56px] w-full max-w-[306px] items-center justify-center cursor-pointer rounded-full bg-[#EAE8FB] text-[16px] font-semibold text-[#4232EA] transition hover:brightness-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </AdminAccountProfileLayout>
  );
}