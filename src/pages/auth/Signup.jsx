import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import SplitAuthLayout from "../../components/layout/SplitAuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import { authApi } from "../../api/auth";

import signupImg from "../../assets/auth/signup-image.jpg";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.6 6 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 35.4 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.4 39.7 16.1 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.3 5.2C40.6 35.8 44 30.4 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

const initialForm = {
  firstName: "",
  lastName: "",
  matricNo: "",
  institutionID: "",
  email: "",
  password: "",
  agree: false,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StudentSignup() {
  const nav = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [loading, setLoading] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [institutionsLoading, setInstitutionsLoading] = useState(true);
  const [institutionsError, setInstitutionsError] = useState("");

  const institutionOptions = useMemo(
    () => (Array.isArray(institutions) ? institutions : []),
    [institutions]
  );

  useEffect(() => {
    loadInstitutions();
  }, []);

  async function loadInstitutions() {
    try {
      setInstitutionsLoading(true);
      setInstitutionsError("");

      const response = await authApi.getInstitutionsForDropdown();
      const list = Array.isArray(response?.data) ? response.data : [];

      setInstitutions(list);
    } catch (error) {
      setInstitutions([]);
      setInstitutionsError(
        error?.message || "Failed to load institutions."
      );
    } finally {
      setInstitutionsLoading(false);
    }
  }

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

    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const matricNo = values.matricNo.trim();
    const email = values.email.trim();
    const password = values.password.trim();

    if (!firstName) {
      errors.firstName = "First name is required.";
    }

    if (!lastName) {
      errors.lastName = "Last name is required.";
    }

    if (!matricNo) {
      errors.matricNo = "Matriculation number is required.";
    }

    if (!values.institutionID) {
      errors.institutionID = "Please select your institution.";
    } else {
      const validInstitution = institutionOptions.some(
        (item) => item.value === values.institutionID
      );

      if (!validInstitution) {
        errors.institutionID = "Please select a valid institution.";
      }
    }

    if (!email) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    if (!values.agree) {
      errors.agree = "You must agree to the terms to continue.";
    }

    return errors;
  }

  const googleSignup = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        setSubmitError("");
        setLoading(true);

        const response = await authApi.googleLogin({ code });

        const token =
          response?.data?.token ||
          response?.token ||
          null;

        if (typeof token === "string" && token.split(".").length === 3) {
          localStorage.setItem("token", token);
        }

        localStorage.setItem("role", "student");
        nav("/dashboard", { replace: true });
      } catch (error) {
        setSubmitError(error?.message || "Google signup failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setSubmitError("Google signup failed."),
  });

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const errors = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      matricNo: form.matricNo.trim(),
      institutionID: form.institutionID,
    };

    try {
      setLoading(true);
      await authApi.studentSignup(payload);
      nav("/register-success?role=student", { replace: true });
    } catch (error) {
      setSubmitError(error?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  const isSubmitDisabled =
    loading || institutionsLoading || institutionOptions.length === 0;

  return (
    <SplitAuthLayout
      imageSrc={signupImg}
      onBack={() => nav(-1)}
      imageWrapperClassName="rounded-l-[80px]"
    >
      <div className="max-w-xl">
        <p className="mt-4 text-sm text-[#949494]">
          It only takes a minute to create your account
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Input
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {fieldErrors.firstName ? (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.firstName}
                </p>
              ) : null}
            </div>

            <div>
              <Input
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              {fieldErrors.lastName ? (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.lastName}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <Input
              placeholder="Matriculation No."
              value={form.matricNo}
              onChange={(e) => handleChange("matricNo", e.target.value)}
            />
            {fieldErrors.matricNo ? (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.matricNo}
              </p>
            ) : null}
          </div>

          <div>
            <div className="relative">
              <select
                value={form.institutionID}
                onChange={(e) => handleChange("institutionID", e.target.value)}
                disabled={institutionsLoading}
                className={`w-full h-[58px] rounded-[18px] border bg-white px-5 pr-12 text-sm md:text-base outline-none appearance-none transition ${
                  fieldErrors.institutionID
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#8E8E93] focus:border-[#3C22F2]"
                } ${institutionsLoading ? "text-[#A1A1AA]" : "text-[#1F1F1F]"}`}
              >
                <option value="">
                  {institutionsLoading
                    ? "Loading institutions..."
                    : "Select Institution"}
                </option>

                {institutionOptions.map((institution) => (
                  <option key={institution.value} value={institution.value}>
                    {institution.text}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#8E8E93]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {fieldErrors.institutionID ? (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.institutionID}
              </p>
            ) : null}

            {institutionsError ? (
              <div className="mt-2 flex items-center gap-3">
                <p className="text-sm text-red-600">{institutionsError}</p>
                <button
                  type="button"
                  onClick={loadInstitutions}
                  className="text-sm font-medium text-[#3C22F2] hover:underline"
                >
                  Retry
                </button>
              </div>
            ) : null}
          </div>

          <div>
            <Input
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {fieldErrors.email ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {fieldErrors.password ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            ) : null}
          </div>

          <div>
            <label className="flex items-start gap-3 text-[10px] text-[#8E8E93]">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => handleChange("agree", e.target.checked)}
                className="mt-0.5"
              />
              <span>
                I agree to EduPay’s Terms of Service and Privacy Policy in line
                with my institution.
              </span>
            </label>

            {fieldErrors.agree ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.agree}</p>
            ) : null}
          </div>

          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}

          <Button disabled={isSubmitDisabled}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          <Divider />

          <button
            type="button"
            onClick={() => googleSignup()}
            disabled={loading}
            className="w-full h-[58px] rounded-full flex items-center justify-center gap-3 font-semibold text-white hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
            style={{ backgroundColor: "rgba(14, 4, 34, 1)" }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-[#8E8EA8]">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => nav("/login/student")}
              className="font-semibold text-[#D359FF] hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </SplitAuthLayout>
  );
}