import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import SplitAuthLayout from "../../components/layout/SplitAuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Divider from "../../components/ui/Divider";
import { authApi } from "../../api/auth";

import loginImg from "../../assets/auth/login-image.jpg";

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

export default function AdminLogin() {
  const nav = useNavigate();

  const [institutions, setInstitutions] = useState([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);

  const [form, setForm] = useState({
    emailAddress: "",
    password: "",
    institutionId: "",
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
      form.emailAddress.trim() &&
      form.password.trim() &&
      form.institutionId.trim()
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

    if (!values.emailAddress.trim()) {
      errors.emailAddress = "Email address is required.";
    } else if (!emailRegex.test(values.emailAddress.trim())) {
      errors.emailAddress = "Enter a valid email address.";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required.";
    }

    if (!values.institutionId.trim()) {
      errors.institutionId = "Please select an institution.";
    }

    return errors;
  }

  const googleLogin = useGoogleLogin({
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
        setErr(e?.message || "Google login failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setErr("Google login failed"),
  });

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const errors = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      const data = await authApi.adminLogin({
        emailAddress: form.emailAddress.trim(),
        password: form.password.trim(),
        institutionId: form.institutionId.trim(),
        systemIP: window.location.hostname || "127.0.0.1",
      });

      const token = extractToken(data);

      if (token) localStorage.setItem("token", token);
      localStorage.setItem("role", "admin");

      nav("/login-success?role=admin");
    } catch (e) {
      console.error("ADMIN LOGIN ERROR:", e);
      setErr(e?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SplitAuthLayout
      imageSrc={loginImg}
      onBack={() => nav(-1)}
      role="Admin"
      imageWrapperClassName="rounded-l-[80px]"
    >
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-[#14143A]">Welcome Back</h1>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <Input
              placeholder="Admin Email"
              type="email"
              value={form.emailAddress}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
            />
            {fieldErrors.emailAddress ? (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.emailAddress}</p>
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

          <div className="text-right text-sm text-[#33334E]">
            <button type="button" className="cursor-pointer hover:underline">
              Forgot Password?
            </button>
          </div>

          {err ? <p className="text-sm text-red-600">{err}</p> : null}

          <Button disabled={loading || loadingInstitutions || !isFormFilled}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Divider />

          <button
            type="button"
            onClick={() => googleLogin()}
            disabled={loading}
            className="flex h-[58px] w-full cursor-pointer items-center justify-center gap-3 rounded-full font-semibold text-white transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
            style={{ backgroundColor: "rgba(14, 4, 34, 1)" }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-[#8E8EA8]">
            Not yet registered?{" "}
            <button
              type="button"
              onClick={() => nav("/signup/admin")}
              className="cursor-pointer font-semibold text-[#D359FF] hover:underline"
            >
              Sign Up
            </button>
          </p>

          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={() => nav("/quickpay")}
              className="cursor-pointer font-semibold text-[#2F2AD9] hover:underline"
            >
              Try QuickPay (no account)
            </button>
          </div>
        </form>
      </div>
    </SplitAuthLayout>
  );
}