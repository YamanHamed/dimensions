import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, Play } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { useLang } from "./i18n";
import { Magnetic, SplitWords } from "./motion-kit";

function Logo() {
  return (
    <span className="flex items-center gap-2 font-display text-xl tracking-wide" dir="ltr">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">D</span>
      DIMENSIONS
    </span>
  );
}

export function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(id);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
            <motion.div
              className="h-24 w-24 rounded-full bg-gradient-brand shadow-glow"
              animate={{ rotate: 360, borderRadius: ["50%", "30%", "50%"] }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Nav() {
  const { t, toggle, lang } = useLang();
  const { scrollY } = useScroll();
  const [small, setSmall] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSmall(v > 60));
  const links: [string, string, string][] = [
    ["#about", "من نحن", "About"],
    ["#services", "خدماتنا", "Services"],
    ["#work", "أعمالنا", "Work"],
    ["#contact", "تواصل معنا", "Contact"],
  ];
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-5 transition-all duration-500 ${small ? "py-2" : "py-3.5"}`}
      >
        <a href="#top"><Logo /></a>
        <div className="hidden items-center gap-7 text-sm md:flex">
          {links.map(([h, a, e]) => (
            <a key={h} href={h} className="text-muted-foreground transition-colors hover:text-foreground">
              {t(a, e)}
            </a>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={toggle} className="rounded-full border border-border px-3 py-1.5 font-display text-xs hover:border-primary">
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <a href="#contact" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-accent hover:text-accent-foreground sm:inline-block">
            {t("ابدأ مشروعك", "Start a project")}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section id="top" ref={ref} className="relative flex min-h-svh items-end overflow-hidden px-5 pb-20 pt-32 sm:px-10">
      <motion.img
        src={hero}
        alt=""
        width={1600}
        height={1008}
        style={{ y, scale }}
        className={`absolute inset-0 h-full w-full object-cover ${lang === "ar" ? "-scale-x-100" : ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-6xl" key={lang}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {t("استوديو رسوم متحركة سعودي", "Saudi animation studio")}
        </motion.p>
        <h1 className="max-w-4xl text-[clamp(3rem,10vw,8.5rem)] font-bold leading-[0.95] tracking-tight">
          <SplitWords text={t("نصنع الفكرة", "We create the idea")} delay={1.6} />
          <br />
          <SplitWords text={t("ونحرّكها.", "& set it in motion.")} delay={1.85} className="text-gradient" />
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-lg text-muted-foreground">
            {t(
              "استوديو سعودي متخصص في الرسوم المتحركة 2D و3D والإعلان والتصميم منذ أكثر من خمسة عشر عاماً.",
              "A Saudi studio specialising in 2D and 3D animation, advertising and design for more than fifteen years.",
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground shadow-glow transition hover:bg-accent hover:text-accent-foreground">
                {t("ابدأ مشروعك", "Start your project")}
                <ArrowUpLeft className="h-4 w-4 transition group-hover:-translate-x-1 ltr:rotate-90" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-medium transition hover:border-primary">
                <Play className="h-4 w-4 fill-current" />
                {t("شاهد أعمالنا", "Watch showreel")}
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
