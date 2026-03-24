import { useState } from "react";
import AccountShell from "../../../components/dashboard/AccountShell";
import { authApi } from "../../../api/auth";

function GreyInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
}) {
  return (
    <div className="rounded-[16px] bg-[#F0F0F0] px-6 py-5">
      <p className="text-[12px] font-medium text-[#9AA0B4]">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 w-full bg-transparent text-[15px] text-[#14143A] outline-none placeholder:text-[#9AA0B4]"
        placeholder={placeholder}
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export default function SettingsPasswordReset() {
  const [form, setForm] = useState({
    matricNo: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setSubmitError("");
    setSuccessMessage("");
  }

  function validateForm(values) {
    const errors = {};

    if (!values.matricNo.trim()) {
      errors.matricNo = "Matric number is required.";
    }

    if (!values.oldPassword.trim()) {
      errors.oldPassword = "Old password is required.";
    }

    if (!values.newPassword.trim()) {
      errors.newPassword = "New password is required.";
    } else if (values.newPassword.trim().length < 6) {
      errors.newPassword = "New password must be at least 6 characters.";
    }

    if (!values.confirmPassword.trim()) {
      errors.confirmPassword = "Please retype the new password.";
    } else if (values.newPassword.trim() !== values.confirmPassword.trim()) {
      errors.confirmPassword = "New passwords do not match.";
    }

    return errors;
  }

  async function handleSubmit() {
    setSubmitError("");
    setSuccessMessage("");

    const errors = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);

      await authApi.changeStudentPassword({
        matricNo: form.matricNo.trim(),
        oldPassword: form.oldPassword.trim(),
        newPassword: form.newPassword.trim(),
      });

      setSuccessMessage("Password changed successfully.");
      setForm({
        matricNo: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setSubmitError(error?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AccountShell
      title="Password Reset"
      activeKey="settings"
      right={
        <div className="w-full max-w-[720px]">
          <div className="space-y-5">
            <GreyInput
              label="Matric Number"
              placeholder="Enter matric number"
              value={form.matricNo}
              onChange={(e) => handleChange("matricNo", e.target.value)}
              error={fieldErrors.matricNo}
            />

            <GreyInput
              label="Old Password"
              placeholder="Enter old password"
              type="password"
              value={form.oldPassword}
              onChange={(e) => handleChange("oldPassword", e.target.value)}
              error={fieldErrors.oldPassword}
            />

            <GreyInput
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              error={fieldErrors.newPassword}
            />

            <GreyInput
              label="Retype New Password"
              placeholder="Retype new password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={fieldErrors.confirmPassword}
            />
          </div>

          {submitError ? (
            <p className="mt-5 text-sm text-red-600">{submitError}</p>
          ) : null}

          {successMessage ? (
            <p className="mt-5 text-sm text-green-600">{successMessage}</p>
          ) : null}

          <div className="mt-14 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="h-14 cursor-pointer rounded-full bg-[#E7E6FF] px-20 font-semibold text-[#2C14DD] transition hover:brightness-95 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      }
    />
  );
}