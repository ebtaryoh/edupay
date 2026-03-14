import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import SuccessCelebration from "../../components/feedback/SuccessCelebration";

export default function RegisterSuccess() {
  const nav = useNavigate();
  const [params] = useSearchParams();

  const role = params.get("role");

  function handleGetStarted() {
    nav(role === "admin" ? "/login/admin" : "/login/student");
  }

  return (
    <main className="min-h-screen bg-[#FCFCFF] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center">
        <section className="w-full rounded-[36px] border border-[#F1F1F5] bg-white px-6 py-10 text-center shadow-[0_24px_80px_rgba(20,20,58,0.06)] sm:px-10 sm:py-14">
          <SuccessCelebration
            title="Registration Successful"
            subtitle="Your account has been created successfully. Sign in to continue and start using EduPay."
          />

          <div className="mx-auto mt-8 max-w-lg">
            <Button onClick={handleGetStarted}>Get Started</Button>

            <p className="mt-4 text-sm text-[#8E8EA8]">
              {role === "admin"
                ? "You’ll be taken to the admin login page."
                : "You’ll be taken to the student login page."}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}