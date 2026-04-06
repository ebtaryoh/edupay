import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminAccountProfileLayout from "../../../components/admin/account/AdminAccountProfileLayout";
import { adminApi } from "../../../api/admin";
import { parseJwt } from "../../../api/http";

function VerifiedIcon() {
  return (
    <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#3C2BE8]">
      <Check size={18} color="white" strokeWidth={3.5} />
    </div>
  );
}

function ReadField({ label, value, rightIcon }) {
  return (
    <div className="rounded-[18px] bg-white px-6 py-4">
      <p className="text-[14px] font-medium text-[#A1A6B8]">{label}</p>
      <div className="mt-1 flex items-center justify-between gap-4">
        <p className="text-[18px] font-medium text-[#171B31]">{value || "—"}</p>
        {rightIcon}
      </div>
    </div>
  );
}

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

export default function AdminMyAccountPersonal() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    gender: "",
    roleId: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");
        let currentUserId = null;

        if (token) {
          const decoded = parseJwt(token);
          currentUserId =
            decoded?.uid ||
            decoded?.id ||
            decoded?.userId ||
            decoded?.nameid ||
            decoded?.sub ||
            "";
        }

        if (!currentUserId) {
          console.error(">>> NO ADMIN ID FOUND IN TOKEN");
          setLoading(false);
          return;
        }

        setUserId(currentUserId);
        const res = await adminApi.getAdminById(currentUserId);
        const admin = res?.data || res || {};

        setForm({
          firstName: admin.firstName || "",
          lastName: admin.lastName || "",
          emailAddress: admin.email || admin.emailAddress || "",
          phoneNumber: admin.phoneNo || admin.phoneNumber || "",
          gender: admin.gender || "",
          roleId: admin.roleId || null,
        });

      } catch (error) {
        console.error("FAILED TO LOAD ADMIN PROFILE:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitError("");
    setSuccessMessage("");
  }

  async function handleSave() {
    if (!userId) return;

    try {
      setSaving(true);
      setSubmitError("");
      setSuccessMessage("");

      const payload = {
        userId: userId,
        roleId: form.roleId || 1, 
        phoneNo: form.phoneNumber.trim(),
      };

      await adminApi.editAdminUser(payload);
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      console.error("UPDATE ADMIN ERROR:", error);
      setSubmitError(error?.message || "Failed to update profile");
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
            className="cursor-pointer border-r border-[#C9C6DA] pr-8 font-semibold text-[#171B31]"
          >
            Personal Information
          </button>

          <button
            type="button"
            onClick={() => nav("/admin/dashboard/account/my-account/institution")}
            className="cursor-pointer text-[#7D7992]"
          >
            Institution
          </button>
        </div>

        <div className="space-y-4">
          <ReadField label="First Name" value={loading ? "Loading..." : form.firstName} />
          <ReadField label="Last Name" value={loading ? "Loading..." : form.lastName} />
          <ReadField
            label="Email Address"
            value={loading ? "Loading..." : form.emailAddress}
            rightIcon={<VerifiedIcon />}
          />
          <EditableField
            label="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            disabled={loading || saving}
            placeholder="Enter phone number"
          />
          <ReadField label="Gender" value={loading ? "Loading..." : form.gender} />
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