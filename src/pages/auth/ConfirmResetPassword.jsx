import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SplitAuthLayout from "../../components/layout/SplitAuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import loginImg from "../../assets/auth/login-image.jpg";

export default function ConfirmResetPassword() {
  const nav = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState({
    matricNo: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormFilled = useMemo(() => {
    return (
      form.matricNo.trim() &&
      form.otp.trim() &&
      form.newPassword.trim() &&
      form.confirmPassword.trim()
    );
  }, [form]);

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

      const payload = {
        matricNo: form.matricNo.trim(),
        otp: form.otp.trim(),
        newPassword: form.newPassword.trim(),
      };

      console.log("CONFIRM RESET PASSWORD PAYLOAD:", payload);

      await authApi.confirmStudentPasswordReset(payload);

      setSuccessMessage("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        nav("/login/student", { replace: true });
      }, 1200);
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
    >
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-[#14143A]">Reset Password</h1>

        <p className="mt-3 text-sm text-[#6B6B85]">
          {state?.emailAddress
            ? `We sent an OTP to ${state.emailAddress}. Enter your matric number, OTP, and new password below.`
            : "Enter your matric number, OTP, and new password to complete the reset."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <Input
              placeholder="Matric Number"
              value={form.matricNo}
              onChange={(e) => handleChange("matricNo", e.target.value)}
            />
            {fieldErrors.matricNo ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.matricNo}</p>
            ) : null}
          </div>

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