import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useLang } from "@/components/site/i18n";
import { Nav } from "@/components/site/Top";
import { Footer } from "@/components/site/Sections";
import { SectionTag, SplitWords } from "@/components/site/motion-kit";
import { categories, works } from "@/components/site/works";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "الأرشيف | Dimensions Animation Studio — Archive" },
      {
        name: "description",
        content:
          "كل أعمال استوديو أبعاد في الرسوم المتحركة 2D و3D والإعلان — Full archive of Dimensions' animation and design work.",
      },
      { property: "og:title", content: "Archive — Dimensions Animation Studio" },
      {
        property: "og:description",
        content: "The full archive of Dimensions' 2D, 3D, motion and advertising work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <Archive />
    </>
  ),
});

function Archive() {
  const { t } = useLang();
  const [f, setF] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = works.filter((w) => f === "All" || w.cat === f);
  const idx = list.findIndex((w) => w.id === open);
  const cur = idx >= 0 ? list[idx] : null;
  const step = (d: number) => cur && setOpen(list[(idx + d + list.length) % list.length]!.id);

  useEffect(() => {
    if (!cur) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  return (
    <div className="grain relative min-h-svh">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -right-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-float-slow absolute -left-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-3xl [animation-delay:-7s]" />
      </div>
      <Nav />
      <main className="relative mx-auto w-full max-w-6xl px-5 pb-32 pt-40 sm:px-10">
        <SectionTag n={String(works.length)} label={t("عمل", "pieces")} />
        <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.95]">
          <SplitWords text={t("الأرشيف", "The archive")} className="text-gradient" />
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          {t(
            "كل ما صنعناه وحرّكناه عبر السنين، في مكان واحد.",
            "Everything we have made and set in motion over the years, in one place.",
          )}
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map(([a, e]) => (
            <button
              key={e}
              onClick={() => setF(e)}
              className={`relative rounded-full px-4 py-2 text-sm transition ${f === e ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f === e && (
                <motion.span
                  layoutId="achip"
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <span className="relative">{t(a, e)}</span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-flow-dense auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {list.map((w) => (
              <motion.button
                layout
                key={w.id}
                layoutId={`art-${w.id}`}
                onClick={() => setOpen(w.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`group relative overflow-hidden rounded-3xl border border-border text-start ${w.tall ? "row-span-2" : ""}`}
              >
                <img
                  src={w.img}
                  alt={t(w.ar, w.en)}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-glow transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="mb-2 inline-block rounded-full glass px-3 py-1 text-xs">
                    {w.cat} · {w.year}
                  </span>
                  <h3 className="text-xl font-semibold">{t(w.ar, w.en)}</h3>
                  <p className="text-sm text-muted-foreground">{t(w.clientAr, w.clientEn)}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">{t("قريباً", "Coming soon")}</p>
        )}
      </main>
      <Footer />

      <AnimatePresence>
        {cur && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-background/90 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              layoutId={`art-${cur.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card"
            >
              {cur.video ? (
                <div className="mx-auto aspect-video max-h-[70svh] w-full bg-black">
                  <iframe
                    key={cur.id}
                    src={cur.video}
                    title={t(cur.ar, cur.en)}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              ) : (
                <img
                  src={cur.img}
                  alt={t(cur.ar, cur.en)}
                  className="max-h-[70svh] w-full object-contain bg-background"
                />
              )}
              <div className="flex flex-wrap items-end justify-between gap-4 p-6">
                <div>
                  <span className="text-xs text-primary">
                    {cur.cat} · {cur.year}
                  </span>
                  <h2 className="text-2xl font-semibold sm:text-3xl">{t(cur.ar, cur.en)}</h2>
                  <p className="text-muted-foreground">{t(cur.clientAr, cur.clientEn)}</p>
                </div>
                <div className="flex gap-2" dir="ltr">
                  <button
                    aria-label="Previous"
                    onClick={() => step(-1)}
                    className="grid h-11 w-11 place-items-center rounded-full glass hover:border-primary"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    aria-label="Next"
                    onClick={() => step(1)}
                    className="grid h-11 w-11 place-items-center rounded-full glass hover:border-primary"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full glass"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
