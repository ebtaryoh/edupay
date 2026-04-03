import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SplitAuthLayout from "../../components/layout/SplitAuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import loginImg from "../../assets/auth/login-image.jpg";

export default function ConfirmResetPassword() {
  const nav = useNavigate();
  const { state } = useLocation();

  const emailAddress = state?.emailAddress || "";
  const isAdmin = state?.isAdmin || false;

  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
    institutionId: "",
  });

  const [institutions, setInstitutions] = useState([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;

    async function loadInst() {
      try {
        setLoadingInstitutions(true);
        const response = await authApi.getInstitutionsForDropdown();
        setInstitutions(response?.data || response || []);
      } catch (err) {
        console.error("Failed to load institutions", err);
      } finally {
        setLoadingInstitutions(false);
      }
    }
    loadInst();
  }, [isAdmin]);

  const isFormFilled = useMemo(() => {
    return (
      emailAddress.trim() &&
      form.otp.trim() &&
      form.newPassword.trim() &&
      form.confirmPassword.trim() &&
      (!isAdmin || form.institutionId)
    );
  }, [emailAddress, form, isAdmin]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
    setSuccessMessage("");
  }

  function validateForm(values) {
    const errors = {};

    if (!emailAddress.trim()) {
      errors.emailAddress = "Missing email address. Please restart the forgot password process.";
    }

    if (isAdmin && !values.institutionId) {
      errors.institutionId = "Institution is required for admin reset.";
    }

    if (!values.otp.trim()) {
      errors.otp = "OTP is required.";
    }

    if (!values.newPassword.trim()) {
      errors.newPassword = "New password is required.";
    } else if (values.newPassword.trim().length < 6) {
      errors.newPassword = "New password must be at least 6 characters.";
    }

    if (!values.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm the new password.";
    } else if (values.newPassword.trim() !== values.confirmPassword.trim()) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    const errors = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);

      if (isAdmin) {
        await authApi.confirmAdminPasswordReset({
          emailAddress: emailAddress.trim(),
          institutionId: form.institutionId,
          otp: form.otp.trim(),
          newPassword: form.newPassword.trim(),
        });
      } else {
        await authApi.confirmStudentPasswordReset({
          emailAddress: emailAddress.trim(),
          otp: form.otp.trim(),
          newPassword: form.newPassword.trim(),
        });
      }

      setSuccessMessage("Password reset successful. You can now log in with your new password.");

      setTimeout(() => {
        nav(isAdmin ? "/login/admin" : "/login/student", { replace: true });
      }, 1500);
    } catch (error) {
      console.error("CONFIRM RESET PASSWORD ERROR:", error);
      setSubmitError(error?.message || "Password confirmation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SplitAuthLayout
      imageSrc={loginImg}
      onBack={() => nav(-1)}
      imageWrapperClassName="rounded-l-[80px]"
      role={isAdmin ? "Admin" : "Student"}
    >
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-[#14143A]">Reset Password</h1>

        <p className="mt-3 text-sm text-[#6B6B85]">
          {emailAddress
            ? `We sent an OTP to ${emailAddress}. Enter the OTP and your new password below.`
            : "Enter the OTP and your new password below."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          {fieldErrors.emailAddress ? (
            <p className="text-sm text-red-600">{fieldErrors.emailAddress}</p>
          ) : null}

          {isAdmin ? (
            <div>
              <div className="relative">
                <select
                  value={form.institutionId}
                  onChange={(e) => handleChange("institutionId", e.target.value)}
                  disabled={loadingInstitutions}
                  className={`h-[58px] w-full cursor-pointer appearance-none rounded-[18px] border bg-white px-5 pr-12 text-sm outline-none transition md:text-base ${
                    fieldErrors.institutionId
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#8E8E93] focus:border-[#3C22F2]"
                  }`}
                >
                  <option value="">
                    {loadingInstitutions ? "Loading institutions..." : "Select Institution"}
                  </option>
                  {institutions.map((item) => (
                    <option key={item.value || item.id} value={item.value || item.id}>
                      {item.text || item.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#8E8E93]">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              {fieldErrors.institutionId ? (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.institutionId}</p>
              ) : null}
            </div>
          ) : null}

          <div>
            <Input
              placeholder="OTP"
              value={form.otp}
              onChange={(e) => handleChange("otp", e.target.value)}
            />
            {fieldErrors.otp ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.otp}</p>
            ) : null}
          </div>

          <div>
            <Input
              placeholder="New Password"
              type="password"
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
            {fieldErrors.newPassword ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.newPassword}</p>
            ) : null}
          </div>

          <div>
            <Input
              placeholder="Confirm New Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            {fieldErrors.confirmPassword ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
            ) : null}
          </div>

          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}

          {successMessage ? (
            <p className="text-sm text-green-600">{successMessage}</p>
          ) : null}

          <Button disabled={loading || !isFormFilled}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </SplitAuthLayout>
  );
}