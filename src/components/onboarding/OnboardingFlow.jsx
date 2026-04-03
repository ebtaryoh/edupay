import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ob1 from "../../assets/Rectangle.png";
import ob2 from "../../assets/book-3d-icon-png-download-8027322 1.png";
import ob3 from "../../assets/Illustrations.png";

const BG = "bg-[#2C14DD]";

export default function OnboardingFlow() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);

  const screens = useMemo(
    () => [
      {
        title: "Pay your tuition\nfees securely",
        description: "Pay for your fees on-time\nand without stress.",
        image: ob1,
      },
      {
        title: "Pay dues and buy course\nmaterials with ease",
        description: "Get course materials on\ntime and with ease.",
        image: ob2,
      },
      {
        title: "Get proof of payment\nand receipts instantly",
        description:
          "Pay and get receipts instantly.\nTrack payments and stay ahead of dues.",
        image: ob3,
      },
    ],
    [],
  );

  const isLast = step === screens.length - 1;

  const completeOnboarding = () => {
    localStorage.setItem("hasOnboarded", "true");
    nav("/welcome", { replace: true });
  };

  const handleSkip = () => completeOnboarding();

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
      return;
    }
    setStep((prev) => prev + 1);
  };

  return (
    <section className={`relative min-h-screen overflow-hidden ${BG}`}>
      <motion.div
        key={`screen-${step}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <OnboardingScreen
          screen={screens[step]}
          index={step}
          total={screens.length}
          onSkip={handleSkip}
          onNext={handleNext}
          isLast={isLast}
        />
      </motion.div>
    </section>
  );
}

function OnboardingScreen({ screen, index, total, onSkip, onNext, isLast }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-4">
      {index !== total - 1 && (
        <button
          onClick={onSkip}
          type="button"
          className="absolute right-6 top-6 z-50 cursor-pointer rounded-full bg-white/20 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/30"
        >
          Skip
        </button>
      )}

      <div className="flex min-h-screen items-center justify-center py-10">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-8 lg:flex-row lg:gap-0 lg:-translate-x-12 xl:-translate-x-20">
          {/* Column 1: Image (Left on Desktop) */}
          <div className="relative z-0 flex items-center justify-center lg:z-20 lg:-mr-20 xl:-mr-24">
            <img
              src={screen.image}
              alt="Onboarding Illustration"
              className="h-auto w-full max-w-[280px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]"
            />
          </div>

          {/* Column 2: Card (Right on Desktop) */}
          <div className="relative z-10 w-full max-w-[440px] lg:max-w-[480px]">
            <div className="rounded-[40px] bg-white px-8 pb-10 pt-12 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:px-10 lg:px-12 lg:pb-12 lg:pt-14">
              <h1 className="text-center text-[26px] font-bold leading-tight text-[#12123A] whitespace-pre-line sm:text-[30px] md:text-[32px] xl:text-[36px]">
                {screen.title}
              </h1>

              <p className="mt-5 text-center text-[15px] leading-relaxed text-[#3B3B57] whitespace-pre-line sm:text-[16px]">
                {screen.description}
              </p>

              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: total }).map((_, i) => (
                  <span
                    key={i}
                    className={[
                      "h-3 rounded-full transition-all",
                      i === index ? "w-8 bg-[#2C14DD]" : "w-3 bg-[#E5E5EF]",
                    ].join(" ")}
                  />
                ))}
              </div>

              <button
                onClick={onNext}
                type="button"
                className="mx-auto mt-12 flex h-[58px] w-full max-w-[300px] cursor-pointer items-center justify-center rounded-3xl bg-[#2C14DD] px-8 text-base font-bold text-white shadow-[0_15px_35px_rgba(44,20,221,0.3)] transition hover:brightness-110 active:scale-[0.98]"
              >
                {isLast ? "Get Started" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}