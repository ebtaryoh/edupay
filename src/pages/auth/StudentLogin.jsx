import { useMemo, useState } from "react";
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

const initialForm = {
  emailAddress: "",
  password: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isJwt(token) {
  return typeof token === "string" && token.split(".").length === 3;
}

function extractToken(response) {
  return (
    response?.token ||
    response?.accessToken ||
    response?.data?.token ||
    response?.data?.accessToken ||
    null
  );
}

function extractStudentId(response) {
  return (
    response?.studentId ||
    response?.data?.studentId ||
    response?.id ||
    response?.data?.id ||
    response?.data?.student?.studentId ||
    response?.data?.student?.id ||
    ""
  );
}

function extractMatricNo(response) {
  return (
    response?.matricNo ||
    response?.data?.matricNo ||
    response?.data?.student?.matricNo ||
    ""
  );
}

export default function StudentLogin() {
  const nav = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormFilled = useMemo(() => {
    return form.emailAddress.trim() && form.password.trim();
  }, [form.emailAddress, form.password]);

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
    const emailAddress = values.emailAddress.trim();
    const password = values.password.trim();

    if (!emailAddress) {
      errors.emailAddress = "Email address is required.";
    } else if (!emailRegex.test(emailAddress)) {
      errors.emailAddress = "Enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    return errors;
  }

  async function persistAuth(response, role = "student") {
    const token = extractToken(response);

    if (!token) {
      console.error("Login response received without token:", response);
      throw new Error("Login succeeded but token is missing.");
    }

    if (!isJwt(token)) {
      console.error("Invalid token returned from API:", token);
      throw new Error("Server returned an invalid token.");
    }

    const studentId = extractStudentId(response);
    const matricNo = extractMatricNo(response);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    if (studentId) {
      localStorage.setItem("studentId", String(studentId));
    }

    if (matricNo) {
      localStorage.setItem("matricNo", String(matricNo));
    }
  }

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        setSubmitError("");
        setLoading(true);

        const response = await authApi.googleLogin({ code });
        await persistAuth(response, "student");

        nav("/login-success?role=student", { replace: true });
      } catch (error) {
        setSubmitError(error?.message || "Google login failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setSubmitError("Google login failed."),
  });

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    const errors = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        emailAddress: form.emailAddress.trim(),
        password: form.password.trim(),
        loginIP: "127.0.0.1",
      };

      const response = await authApi.studentLogin(payload);
      await persistAuth(response, "student");

      nav("/login-success?role=student", { replace: true });
    } catch (error) {
      console.error("STUDENT LOGIN ERROR:", error);
      setSubmitError(error?.message || "Login failed.");
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
        <h1 className="text-3xl font-bold text-[#14143A]">Welcome Back</h1>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <Input
              placeholder="Email/Matriculation No."
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

          <div>
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {fieldErrors.password ? (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            ) : null}
          </div>

          <div className="text-right text-sm text-[#33334E]">
            <button
              type="button"
              onClick={() => nav("/forgot-password")}
              className="cursor-pointer hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}

          <Button disabled={loading || !isFormFilled}>
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
              onClick={() => nav("/signup/student")}
              className="cursor-pointer font-semibold text-[#D359FF] hover:underline"
            >
              Sign Up
            </button>
          </p>

        </form>
      </div>
    </SplitAuthLayout>
  );
}