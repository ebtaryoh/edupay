import { useState } from "react";
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

export default function AdminSignup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const googleSignup = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        setErr("");
        setLoading(true);

        const data = await authApi.googleLogin({ code });

        if (data?.token) localStorage.setItem("token", data.token);
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

    if (!form.agree) {
      setErr("Please agree to the terms to continue.");
      return;
    }

    setLoading(true);

    try {
      await authApi.adminSignup({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      nav("/register-success?role=admin");
    } catch (e) {
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

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm((s) => ({ ...s, firstName: e.target.value }))
              }
            />
            <Input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm((s) => ({ ...s, lastName: e.target.value }))
              }
            />
          </div>

          <Input
            placeholder="Admin Email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />

          <Input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((s) => ({ ...s, password: e.target.value }))
            }
          />

          <label className="flex items-center gap-3 text-[10px] text-[#8E8E93]">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) =>
                setForm((s) => ({ ...s, agree: e.target.checked }))
              }
            />
            I agree to EduPay’s Terms of Services and Privacy Policy.
          </label>

          {err ? <p className="text-red-600 text-sm">{err}</p> : null}

          <Button disabled={loading}>
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

          <p className="text-center text-sm text-[#8E8EA8] mt-6">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => nav("/login/admin")}
              className="text-[#D359FF] font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </SplitAuthLayout>
  );
}