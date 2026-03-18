import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import SuccessCelebration from "../../components/feedback/SuccessCelebration";
import useCountdownRedirect from "../../hooks/useCountdownRedirect";

export default function LoginSuccess() {
  const nav = useNavigate();
  const [params] = useSearchParams();

  const role = params.get("role");
  const redirectPath = role === "admin" ? "/admin/dashboard" : "/dashboard";
  const count = useCountdownRedirect(3, redirectPath);

  return (
    <main className="min-h-screen bg-[#FCFCFF] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-[36px] border border-[#F1F1F5] bg-white px-6 py-10 text-center shadow-[0_24px_80px_rgba(20,20,58,0.06)] sm:px-10 sm:py-14">
          <SuccessCelebration
            title="Login Successful"
            subtitle="You’re in. We’re taking you to your dashboard now."
          />

          <div className="mx-auto mt-8 max-w-lg">
            <p className="text-sm text-[#8E8EA8]">
              Redirecting to dashboard in{" "}
              <span className="font-semibold text-[#3C22F2]">{count}s</span>...
            </p>

            <div className="mt-6">
              <Button onClick={() => nav(redirectPath)}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}