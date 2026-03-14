import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ob1 from "../../assets/Rectangle.png";
import ob2 from "../../assets/book-3d-icon-png-download-8027322 1.png";
import ob3 from "../../assets/Illustrations.png";

const BG = "bg-gradient-to-b from-[#2C14DD] to-[#2A1FBF]";

export default function OnboardingFlow() {
  const nav = useNavigate();
  const [step, setStep] = useState(-1);

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

  useEffect(() => {
    if (step !== -1) return;
    const t = setTimeout(() => setStep(0), 4000);
    return () => clearTimeout(t);
  }, [step]);

  const isSplash = step === -1;
  const isLast = step === screens.length - 1;

  const completeOnboarding = () => {
    localStorage.setItem("hasOnboarded", "true");
    nav("/quickpay", { replace: true });
  };

  const handleSkip = () => completeOnboarding();

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <section className={`min-h-screen ${BG} relative overflow-hidden`}>
      {isSplash ? (
        <SplashScreenText />
      ) : (
        <OnboardingScreen
          screen={screens[step]}
          index={step}
          total={screens.length}
          onSkip={handleSkip}
          onNext={handleNext}
        />
      )}
    </section>
  );
}

function SplashScreenText() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[260px] h-[260px] bg-white/20 blur-3xl rounded-full" />
      <div className="absolute w-[180px] h-[180px] bg-white/25 blur-2xl rounded-full" />

      <div className="relative flex items-end justify-center select-none">
        <motion.span
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-white font-extrabold text-7xl md:text-8xl tracking-tight"
        >
          Edu
        </motion.span>

        <motion.span
          initial={{ x: 160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
          className="text-white/90 font-thin text-7xl md:text-8xl tracking-tight ml-1"
        >
          Pay
        </motion.span>
      </div>
    </div>
  );
}

function OnboardingScreen({ screen, index, total, onSkip, onNext }) {
  return (
    <div className="min-h-screen relative px-6 md:px-12">
      {index !== total - 1 && (
        <button
          onClick={onSkip}
          type="button"
          className="absolute top-6 right-6 md:top-7 md:right-12 z-50
               rounded-full bg-white/10 text-white
               px-10 py-3 text-sm font-medium
               backdrop-blur hover:bg-white/15 transition
               cursor-pointer"
        >
          Skip
        </button>
      )}

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl px-6">
          <div className="relative flex items-center justify-center">
            <div
              className="relative z-10 w-full min-h-[440px] max-w-[420px]
                         bg-white rounded-[42px] shadow-soft
                         pt-10 px-10 pb-0 md:pt-12 md:px-12
                         lg:translate-x-24"
            >
              <h1 className="text-[#12123A] font-bold text-3xl md:text-[26px] leading-tight whitespace-pre-line text-center">
                {screen.title}
              </h1>

              <p className="mt-5 text-[#3B3B57] text-[17px] leading-relaxed whitespace-pre-line text-center">
                {screen.description}
              </p>

              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: total }).map((_, i) => (
                  <span
                    key={i}
                    className={[
                      "h-2.5 rounded-full transition-all",
                      i === index ? "w-7 bg-[#2C14DD]" : "w-2.5 bg-[#BDBDD6]",
                    ].join(" ")}
                  />
                ))}
              </div>

              <button
                onClick={onNext}
                className="mt-20 w-full max-w-[280px] flex items-center justify-center mx-auto rounded-full py-4
                           bg-[#2C14DD] text-white font-semibold text-lg
                           shadow-[0_20px_50px_rgba(47,42,217,0.35)]
                           hover:brightness-110 active:scale-[0.99] transition"
              >
                Next
              </button>
            </div>

            <img
              src={screen.image}
              alt="Onboarding Illustration"
              className="hidden lg:block absolute z-20 w-[450px] max-w-none
                         drop-shadow-2xl left-1/2 -translate-x-[100%]"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-black/10 blur-3xl opacity-20" />
    </div>
  );
}
