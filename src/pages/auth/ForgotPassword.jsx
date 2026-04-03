import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SplitAuthLayout from "../../components/layout/SplitAuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { authApi } from "../../api/auth";
import loginImg from "../../assets/auth/login-image.jpg";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("role") === "admin";

  const [form, setForm] = useState({
    emailAddress: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
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
  }

  function validateForm(values) {
    const errors = {};

    if (!values.emailAddress.trim()) {
      errors.emailAddress = "Email address is required.";
    } else if (!emailRegex.test(values.emailAddress.trim())) {
      errors.emailAddress = "Enter a valid email address.";
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const errors = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const emailAddress = form.emailAddress.trim();

    try {
      setLoading(true);

      if (isAdmin) {
        await authApi.adminForgotPasswordByEmail(emailAddress);
      } else {
        await authApi.forgotPasswordByEmail(emailAddress);
      }

      nav("/confirm-reset-password", {
        replace: true,
        state: { emailAddress, isAdmin },
      });
    } catch (error) {
      console.error("FORGOT PASSWORD ERROR:", error);

      const message =
        error?.message === "NOT FOUND"
          ? isAdmin 
            ? "No admin account was found for that email address."
            : "No student account was found for that email address."
          : error?.message || "Failed to send OTP.";

      setSubmitError(message);
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
        <h1 className="text-3xl font-bold text-[#14143A]">Forgot Password</h1>

        <p className="mt-3 text-sm text-[#6B6B85]">
          Enter your registered email address to receive your OTP.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <Input
              placeholder="Email Address"
              type="email"
              value={form.emailAddress}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
            />
            {fieldErrors.emailAddress ? (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.emailAddress}
              </p>
            ) : null}
          </div>

          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}

          <Button disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </div>
    </SplitAuthLayout>
  );
}