import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccess() {
  const nav = useNavigate();
  const [params] = useSearchParams();

  const role = params.get("role");
  const redirectPath = role === "admin" ? "/admin/dashboard" : "/dashboard";

  return (
    <div style={{ padding: 40 }}>
      <h1>Login Success Test</h1>
      <p>Redirect path: {redirectPath}</p>
      <button onClick={() => nav(redirectPath)}>Go</button>
    </div>
  );
}