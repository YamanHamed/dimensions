import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Play, Mail, Phone, Instagram, Twitter, Youtube, Linkedin, ArrowUpLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { works } from "./works";
import photo from "@/assets/studio-photo.jpg";
import audio from "@/assets/studio-audio.jpg";
import { useLang } from "./i18n";
import { Counter, Magnetic, Reveal, SectionTag, SplitWords, Tilt } from "./motion-kit";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-10";
const sec = "relative py-24 sm:py-36";

export function About() {
  const { t } = useLang();
  const stats: [number, string, string][] = [
    [15, "سنة خبرة", "Years of experience"],
    [100, "مشروع منجز", "Projects delivered"],
    [50, "عميل", "Clients"],
    [2, "استوديو إنتاج", "Production studios"],
  ];
  const values: [string, string][] = [["الوطنية", "Patriotism"], ["المصداقية", "Credibility"], ["الابتكار", "Innovation"], ["المرونة", "Flexibility"], ["التكامل", "Integration"]];
  return (
    <section id="about" className={sec}>
      <div className={wrap}>
        <SectionTag n="01" label={t("من نحن", "Who we are")} />
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight">
          <SplitWords text={t("نجمع حب العمل والشغف والإبداع لنترك بصمتنا الخاصة.", "Craft, passion and creativity — leaving a mark that is our own.")} />
        </h2>
        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {stats.map(([n, a, e], i) => (
            <Reveal key={e} delay={i * 0.08} className={`glass rounded-3xl p-7 ${i === 0 ? "md:col-span-2 md:row-span-2 flex flex-col justify-end bg-gradient-brand/10" : ""}`}>
              <div className={`font-display font-bold ${i === 0 ? "text-8xl text-gradient" : "text-5xl"} ${i % 2 ? "text-primary" : ""}`}>
                <Counter to={n} />
              </div>
              <div className="mt-2 text-muted-foreground">{t(a, e)}</div>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="glass rounded-3xl p-7 text-sm">
            <p className="text-muted-foreground">
              {t(
                "نعمل وفق أسس ومعايير فنية عالية، جمعنا حب العمل والشغف والإبداع لنقدم مثالاً يحتذى به للجودة والاحترافية.",
                "We work to high technical standards, bringing together love of the craft, passion and creativity to set an example of quality and professionalism.",
              )}
            </p>
          </Reveal>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {([
            ["رؤيتنا", "Our vision", "أن نكون الشركة السعودية الأفضل لصناعة الرسوم المتحركة والميديا على مستوى المنطقة.", "To be the best Saudi company for animation and media in the region."],
            ["رسالتنا", "Our message", "نصنع الفكرة وننفذها بأعلى المواصفات الفنية بتقنية عالمية وبروح هويتنا المحلية.", "We create the idea and deliver it to the highest technical specifications, with international technology and the spirit of our local identity."],
          ] as [string, string, string, string][]).map(([a, e, da, de], i) => (
            <Reveal key={e} delay={i * 0.1} className="group rounded-3xl border border-border p-8 transition hover:border-primary">
              <h3 className="mb-3 text-xl font-semibold text-primary">{t(a, e)}</h3>
              <p className="text-muted-foreground">{t(da, de)}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="rounded-3xl border border-border p-8">
            <h3 className="mb-4 text-xl font-semibold text-accent">{t("قيمنا", "Our values")}</h3>
            <div className="flex flex-wrap gap-2">
              {values.map(([a, e]) => (
                <span key={e} className="rounded-full bg-secondary px-3 py-1 text-sm">{t(a, e)}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Founder() {
  const { t } = useLang();
  const tags: [string, string][] = [["إخراج", "Directing"], ["تصميم شخصيات", "Character design"], ["دبلجة وأداء صوتي", "Voice acting"], ["رسوم 3D", "3D animation"]];
  return (
    <section className={sec}>
      <div className={`${wrap} grid items-center gap-14 md:grid-cols-[auto_1fr]`}>
        <Reveal>
          <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
            <motion.div className="absolute inset-0 rounded-full bg-gradient-brand opacity-80 blur-2xl" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/60" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
            <div className="absolute inset-4 grid place-items-center rounded-full bg-card font-display text-6xl font-bold text-gradient">AB</div>
          </div>
        </Reveal>
        <div>
          <SectionTag n="02" label={t("المؤسس", "Founder")} />
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight">
            <SplitWords text={t("علي بن سعيد البياهي", "Ali Al Byahi")} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {t(
                "المدير التنفيذي، المصمم السعودي ومخرج الرسوم المتحركة. أشرف على مشاريع لجهات حكومية وخاصة، وحصد مراكز أولى في عدة مسابقات.",
                "Executive Director, Saudi designer and animation director. He has led projects for government and private clients and won first place in several competitions.",
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map(([a, e]) => (
                <span key={e} className="rounded-full border border-accent/50 px-4 py-1.5 text-sm text-accent">{t(a, e)}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function How() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const steps: [string, string][] = [["نخلق الفكرة", "Create the idea"], ["نرسم الخطة", "Draw the plan"], ["نبدأ التنفيذ", "Start implementation"], ["نحقق الهدف", "Achieve the goal"]];
  return (
    <section className={sec}>
      <div className={wrap} ref={ref}>
        <SectionTag n="03" label={t("كيف نعمل؟", "How we work")} />
        <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold"><SplitWords text={t("أربع خطوات نحو الحركة.", "Four steps to motion.")} /></h2>
        <div className="relative mt-20">
          <div className="absolute inset-x-0 top-6 hidden h-px bg-border md:block" />
          <motion.div style={{ scaleX }} className="absolute inset-x-0 top-6 hidden h-px origin-right bg-gradient-brand md:block ltr:origin-left" />
          <div className="grid gap-10 md:grid-cols-4">
            {steps.map(([a, e], i) => (
              <Reveal key={e} delay={i * 0.12}>
                <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-primary bg-background font-display text-primary">
                  0{i + 1}
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{t(a, e)}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { t } = useLang();
  const items: { a: string; e: string; tags: [string, string][]; big?: boolean; c: string }[] = [
    { a: "الرسوم المتحركة", e: "Animation", tags: [["2D", "2D"], ["3D", "3D"], ["أفلام سينمائية", "Cinematic films"], ["إعلانات", "Commercials"]], big: true, c: "from-primary/40" },
    { a: "التصميم والموشن", e: "Design & motion", tags: [["موشن جرافيك", "Motion graphics"], ["إنفوجرافيك", "Infographics"], ["وايت بورد", "Whiteboard"], ["ستوري بورد", "Storyboards"]], c: "from-accent/40" },
    { a: "استوديوهات الإنتاج", e: "Production studios", tags: [["تصوير", "Photography"], ["صوت", "Audio"], ["دبلجة", "Dubbing"]], c: "from-secondary" },
    { a: "الشخصيات والمطبوعات", e: "Characters & print", tags: [["دمى كرتونية", "Mascot costumes"], ["مجلات أطفال", "Children’s magazines"]], c: "from-accent/30" },
    { a: "المحتوى والفعاليات", e: "Content & events", tags: [["تواصل اجتماعي", "Social media"], ["حملات", "Campaigns"], ["SEO", "SEO"], ["فعاليات", "Events"]], big: true, c: "from-primary/30" },
  ];
  return (
    <section id="services" className={sec}>
      <div className={wrap}>
        <SectionTag n="04" label={t("خدماتنا", "Our services")} />
        <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold"><SplitWords text={t("كل ما تحتاجه فكرتك لتتحرك.", "Everything your idea needs to move.")} /></h2>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.e} delay={(i % 3) * 0.08} className={s.big ? "md:col-span-2" : ""}>
              <Tilt className="group relative h-full min-h-72 overflow-hidden rounded-3xl border border-border bg-card p-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${s.c} to-transparent opacity-60 transition duration-700 group-hover:opacity-100`} />
                <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gradient-brand opacity-0 blur-3xl transition duration-700 group-hover:opacity-50" />
                <div className="relative flex h-full flex-col justify-between gap-10">
                  <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
                  <div>
                    <h3 className="text-3xl font-semibold">{t(s.a, s.e)}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map(([a, e]) => (
                        <span key={e} className="rounded-full glass px-3 py-1 text-xs">{t(a, e)}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const { t } = useLang();
  const projects = works.filter((w) => w.featured).slice(0, 3);
  return (
    <section id="work" className={sec}>
      <div className={wrap}>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionTag n="05" label={t("أعمالنا", "Our work")} />
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold"><SplitWords text={t("أعمال مختارة", "Selected work")} /></h2>
          </div>
          <Magnetic>
            <Link to="/work" className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium transition hover:border-primary">
              {t("الأرشيف الكامل", "View full archive")}
              <ArrowUpLeft className="h-4 w-4 transition group-hover:-translate-x-1 ltr:rotate-90" />
            </Link>
          </Magnetic>
        </div>
        <div className="mt-14 grid gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <Link to="/work" className="group relative block aspect-[16/8] overflow-hidden rounded-3xl border border-border">
                <img src={p.img} alt={t(p.ar, p.en)} loading="lazy" width={1600} height={912} className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-glow transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Play className="h-7 w-7 fill-current" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-10">
                  <div>
                    <span className="mb-2 inline-block rounded-full glass px-3 py-1 text-xs">{p.cat} · {p.year}</span>
                    <h3 className="text-2xl font-semibold sm:text-4xl">{t(p.ar, p.en)}</h3>
                    <p className="text-sm text-muted-foreground">{t(p.clientAr, p.clientEn)}</p>
                  </div>
                  <span className="font-display text-5xl text-foreground/20 sm:text-7xl">0{i + 1}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Studios() {
  const { t } = useLang();
  const list = [
    { img: photo, a: "استوديو التصوير", e: "Photography studio", da: "فريق مصورين محترفين سعوديين يعبر بك إلى أعين عملائك وقلوبهم.", de: "A team of professional Saudi photographers who carry your work to your customers’ eyes and hearts." },
    { img: audio, a: "استوديو الصوت", e: "Audio studio", da: "تسجيل وإنتاج الصوت للأفلام والمسلسلات والبودكاست والدوبلاج على يد مهندسي صوت محترفين.", de: "Professional sound engineers producing audio for films, series, podcasts and dubbing." },
  ];
  return (
    <section className={sec}>
      <div className={wrap}>
        <SectionTag n="06" label={t("استوديوهاتنا", "Our studios")} />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {list.map((s, i) => (
            <Reveal key={s.e} delay={i * 0.12} className={i === 1 ? "md:mt-24" : ""}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
                <img src={s.img} alt={t(s.a, s.e)} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="text-3xl font-semibold">{t(s.a, s.e)}</h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">{t(s.da, s.de)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Clients() {
  const { t } = useLang();
  const names = ["CLIENT", "STUDIO", "BRAND", "MEDIA", "VISION", "NOVA", "ORBIT", "PRISM"];
  const Row = ({ reverse }: { reverse?: boolean }) => (
    <div className="flex overflow-hidden" dir="ltr">
      <div className={`flex shrink-0 gap-4 pe-4 ${reverse ? "animate-marquee-r" : "animate-marquee"}`}>
        {[...names, ...names].map((n, i) => (
          <div key={i} className="grid h-24 w-52 shrink-0 place-items-center rounded-2xl border border-border font-display text-xl tracking-[0.3em] text-muted-foreground transition hover:border-primary hover:text-foreground">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section className={`${sec} overflow-hidden`}>
      <div className={wrap}>
        <SectionTag n="07" label={t("عملاء عملنا معهم", "Clients we’ve worked with")} />
      </div>
      <div className="mt-8 grid gap-4 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-2xl border border-input bg-transparent px-5 py-4 outline-none transition placeholder:text-muted-foreground focus:border-primary";
  return (
    <section id="contact" className={sec}>
      <div className={wrap}>
        <SectionTag n="08" label={t("تواصل معنا", "Contact")} />
        <h2 className="text-[clamp(3rem,9vw,7.5rem)] font-bold leading-none">
          <SplitWords text={t("لنبدأ", "Let’s start")} />
          <SplitWords text={t("فكرتك.", "your idea.")} className="text-gradient" delay={0.2} />
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-6">
            <p className="text-lg text-muted-foreground">{t("استوديو سعودي، متاح لمشاريع جديدة كاملة أو جزئية.", "A Saudi-based studio, available for new full or partial projects.")}</p>
            <a href="mailto:hello@example.com" className="flex items-center gap-4 text-xl hover:text-primary"><Mail className="h-5 w-5 text-primary" />hello@example.com</a>
            <a href="tel:+9665" className="flex items-center gap-4 text-xl hover:text-primary" dir="ltr"><Phone className="h-5 w-5 text-primary" />+966 5X XXX XXXX</a>
            <div>
              <p className="mb-3 text-sm text-muted-foreground">{t("تجدنا على", "Find us on")}</p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Youtube, Linkedin].map((I, i) => (
                  <Magnetic key={i}>
                    <a href="#" aria-label="social" className="grid h-12 w-12 place-items-center rounded-full border border-border transition hover:border-primary hover:bg-primary hover:text-primary-foreground"><I className="h-5 w-5" /></a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass space-y-4 rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required className={input} placeholder={t("الاسم", "Name")} />
                <input required type="email" className={input} placeholder={t("البريد الإلكتروني", "Email")} />
              </div>
              <textarea required rows={5} className={input} placeholder={t("الرسالة", "Message")} />
              <button className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 font-medium text-primary-foreground transition hover:shadow-glow-pink">
                {sent ? t("تم الإرسال، شكراً!", "Sent — thank you!") : t("إرسال الرسالة", "Send message")}
                <ArrowUpLeft className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-border pt-10">
      <div className={`${wrap} flex flex-wrap justify-between gap-4 text-sm text-muted-foreground`}>
        <span>© 2026 Dimensions Animation Studio</span>
        <span>{t("شركة سعودية", "A Saudi company")}</span>
      </div>
      <div dir="ltr" className="select-none text-center font-display text-[19vw] font-bold leading-[0.8] tracking-tighter text-foreground/5">DIMENSIONS</div>
    </footer>
  );
}
