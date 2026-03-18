import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    const timer = setTimeout(() => setStep(0), 4000);
    return () => clearTimeout(timer);
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
    setStep((prev) => prev + 1);
  };

  return (
    <section className={`relative min-h-screen overflow-hidden ${BG}`}>
      <AnimatePresence mode="wait">
        {isSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <SplashScreenText />
          </motion.div>
        ) : (
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
        )}
      </AnimatePresence>
    </section>
  );
}

function SplashScreenText() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute h-[260px] w-[260px] rounded-full bg-white/20 blur-3xl" />
      <div className="absolute h-[180px] w-[180px] rounded-full bg-white/25 blur-2xl" />

      <div className="relative flex items-end justify-center select-none">
        <motion.span
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          Edu
        </motion.span>

        <motion.span
          initial={{ x: 160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
          className="ml-1 text-6xl font-thin tracking-tight text-white/90 sm:text-7xl md:text-8xl"
        >
          Pay
        </motion.span>
      </div>
    </div>
  );
}

function OnboardingScreen({ screen, index, total, onSkip, onNext, isLast }) {
  return (
    <div className="relative min-h-screen px-4 py-6 sm:px-6 sm:py-8 md:px-10 lg:px-12">
      {index !== total - 1 && (
        <button
          onClick={onSkip}
          type="button"
          className="absolute right-4 top-5 z-50 cursor-pointer rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15 sm:right-6 sm:top-6 sm:px-8 md:right-10 md:top-7"
        >
          Skip
        </button>
      )}

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-0">
          <div className="order-2 mx-auto w-full max-w-[430px] lg:order-1 lg:mx-0 lg:justify-self-end">
            <div className="rounded-[30px] bg-white px-6 pb-8 pt-8 shadow-[0_30px_80px_rgba(18,18,58,0.18)] sm:rounded-[36px] sm:px-8 sm:pb-10 sm:pt-10 md:px-10 md:pb-12 md:pt-11 lg:rounded-[42px] lg:px-10 lg:pt-10">
              <h1 className="text-center text-[28px] font-bold leading-tight text-[#12123A] whitespace-pre-line sm:text-[32px] md:text-[34px] lg:text-[30px] xl:text-[34px]">
                {screen.title}
              </h1>

              <p className="mt-4 text-center text-[15px] leading-7 text-[#3B3B57] whitespace-pre-line sm:mt-5 sm:text-[16px] md:text-[17px]">
                {screen.description}
              </p>

              <div className="mt-8 flex items-center justify-center gap-2 sm:mt-9">
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
                type="button"
                className="mx-auto mt-10 flex h-[52px] w-full max-w-[280px] cursor-pointer items-center justify-center rounded-full bg-[#2C14DD] px-6 text-base font-semibold text-white shadow-[0_20px_50px_rgba(47,42,217,0.35)] transition hover:brightness-110 active:scale-[0.99] sm:mt-12 sm:h-[56px] sm:text-lg"
              >
                {isLast ? "Get Started" : "Next"}
              </button>
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2 lg:min-h-[560px] lg:justify-start">
            <img
              src={screen.image}
              alt="Onboarding Illustration"
              className="h-auto w-full max-w-[250px] object-contain drop-shadow-2xl sm:max-w-[300px] md:max-w-[360px] lg:max-w-[500px] xl:max-w-[560px]"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-black/10 blur-3xl opacity-20 sm:h-64" />
    </div>
  );
}