import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpLeft, Menu, Play, X } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { useLang } from "./i18n";
import { OrbitLogo } from "./OrbitLogo";
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
    const id = setTimeout(() => setShow(false), 1800);
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
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <OrbitLogo className="h-40 w-auto drop-shadow-[0_0_30px_var(--primary)]" />
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
  const [menuOpen, setMenuOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSmall(v > 60));
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  const links: [string, string, string][] = [
    ["/#about", "من نحن", "About"],
    ["/#services", "خدماتنا", "Services"],
    ["/#work", "أعمالنا", "Work"],
    ["/#contact", "تواصل معنا", "Contact"],
  ];
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div className="relative w-full max-w-6xl">
        <nav
          aria-label={t("التنقل الرئيسي", "Main navigation")}
          className={`glass flex w-full items-center justify-between gap-4 rounded-full px-5 transition-all duration-500 ${small ? "py-2" : "py-3.5"}`}
        >
          <a href="/" aria-label={t("الصفحة الرئيسية", "Home")}><Logo /></a>
          <div className="hidden items-center gap-7 text-sm md:flex">
            {links.map(([h, a, e]) => (
              <a key={h} href={h} className="text-muted-foreground transition-colors hover:text-foreground">
                {t(a, e)}
              </a>
            ))}
            <Link to="/work" className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {t("الأرشيف", "Archive")}
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={toggle} aria-label={t("التبديل إلى الإنجليزية", "Switch to Arabic")} className="rounded-full border border-border px-3 py-1.5 font-display text-xs hover:border-primary">
              {lang === "ar" ? "EN" : "ع"}
            </button>
            <a href="/#contact" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-accent hover:text-accent-foreground sm:inline-block">
              {t("ابدأ مشروعك", "Start a project")}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t("إغلاق القائمة", "Close menu") : t("فتح القائمة", "Open menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-3xl border border-border bg-popover p-3 shadow-sheet md:hidden"
            >
              {links.map(([h, a, e]) => (
                <a
                  key={h}
                  href={h}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                >
                  {t(a, e)}
                </a>
              ))}
              <Link
                to="/work"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                activeProps={{ className: "bg-primary/10 text-foreground" }}
              >
                {t("الأرشيف", "Archive")}
              </Link>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-2xl bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                {t("ابدأ مشروعك", "Start a project")}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);
  useEffect(() => setVh(window.innerHeight), []);
  const reduce = useReducedMotion();
  const fade = useTransform(scrollY, [0, vh * 0.7], [1, 0]);
  const dark = useTransform(scrollY, [0, vh], reduce ? [0, 0] : [0, 0.6]);
  return (
    <motion.section id="top" ref={ref} className="sticky top-0 z-0 flex h-svh items-end overflow-hidden px-5 pb-20 pt-32 sm:px-10">
      <motion.img
        src={hero}
        alt=""
        width={1600}
        height={1008}
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
      <motion.div style={{ opacity: dark }} className="pointer-events-none absolute inset-0 z-20 bg-background" />
    </motion.section>
  );
}
