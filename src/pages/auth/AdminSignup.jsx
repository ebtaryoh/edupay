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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractToken(response) {
  return (
    response?.token ||
    response?.accessToken ||
    response?.data?.token ||
    response?.data?.accessToken ||
    null
  );
}

export default function AdminSignup() {
  const nav = useNavigate();

  const [institutions, setInstitutions] = useState([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    institutionId: "",
    agree: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadInstitutions() {
      try {
        const response = await authApi.getInstitutionsForDropdown();
        setInstitutions(response?.data || response || []);
      } catch (error) {
        console.error("FAILED TO LOAD INSTITUTIONS:", error);
      } finally {
        setLoadingInstitutions(false);
      }
    }

    loadInstitutions();
  }, []);

  const isFormFilled = useMemo(() => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.email.trim() &&
      form.password.trim() &&
      form.institutionId.trim() &&
      form.agree
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

    setErr("");
  }

  function validateForm(values) {
    const errors = {};

    if (!values.firstName.trim()) errors.firstName = "First name is required.";
    if (!values.lastName.trim()) errors.lastName = "Last name is required.";

    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required.";
    } else if (values.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!values.institutionId.trim()) {
      errors.institutionId = "Please select an institution.";
    }

    if (!values.agree) {
      errors.agree = "Please agree to the terms to continue.";
    }

    return errors;
  }

  const googleSignup = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        setErr("");
        setLoading(true);

        const data = await authApi.googleLogin({ code });
        const token = extractToken(data);

        if (token) localStorage.setItem("token", token);
        localStorage.setItem("role", "admin");

        nav("/admin/dashboard", { replace: true });
      } catch (e) {
        setErr(e?.message || "Google signup failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setErr("Google signup failed"),
  });

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const errors = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      await authApi.adminSignup({
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
        institutionId: form.institutionId.trim(),
      });

      nav("/register-success?role=admin");
    } catch (e) {
      console.error("ADMIN SIGNUP ERROR:", e);
      setErr(e?.message || "Admin signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SplitAuthLayout
      imageSrc={signupImg}
      onBack={() => nav(-1)}
      role="Admin"
      imageWrapperClassName="rounded-l-[80px]"
    >
      <div className="max-w-xl">
        <p className="mt-4 text-sm text-[#949494]">
          It only takes a minute to create your admin account
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Input
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {fieldErrors.firstName ? (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
              ) : null}
            </div>

            <div>
              <Input
                placeholder="Middle Name"
                value={form.middleName}
                onChange={(e) => handleChange("middleName", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            {fieldErrors.lastName ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
            ) : null}
          </div>

          <div>
            <Input
              placeholder="Admin Email"
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
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#8E8E93]">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

            {fieldErrors.institutionId ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.institutionId}</p>
            ) : null}
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-[10px] text-[#8E8E93]">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => handleChange("agree", e.target.checked)}
              className="mt-0.5 cursor-pointer"
            />
            <span>I agree to EduPay’s Terms of Services and Privacy Policy.</span>
          </label>

          {fieldErrors.agree ? (
            <p className="text-sm text-red-600">{fieldErrors.agree}</p>
          ) : null}

          {err ? <p className="text-sm text-red-600">{err}</p> : null}

          <Button disabled={loading || loadingInstitutions || !isFormFilled}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          <Divider />

          <button
            type="button"
            onClick={() => googleSignup()}
            disabled={loading}
            className="flex h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-full font-semibold text-white transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
            style={{ backgroundColor: "rgba(14, 4, 34, 1)" }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-[#8E8EA8]">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => nav("/login/admin")}
              className="cursor-pointer font-semibold text-[#D359FF] hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </SplitAuthLayout>
  );
}