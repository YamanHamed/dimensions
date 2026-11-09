import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/components/site/i18n";
import { Hero, Intro, Nav } from "@/components/site/Top";
import { About, Clients, Contact, Footer, Founder, How, Services, Studios, Work } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أبعاد | Dimensions Animation Studio" },
      { name: "description", content: "استوديو سعودي للرسوم المتحركة 2D و3D والإعلان والتصميم — Saudi 2D & 3D animation studio." },
      { property: "og:title", content: "أبعاد | Dimensions Animation Studio" },
      { property: "og:description", content: "Saudi 2D & 3D animation, advertising and design studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <div className="grain relative">
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="animate-float-slow absolute -right-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-3xl" />
          <div className="animate-float-slow absolute -left-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-3xl [animation-delay:-7s]" />
        </div>
        <Intro />
        <Nav />
        <main className="relative">
          <Hero />
          <About />
          <Founder />
          <How />
          <Services />
          <Work />
          <Studios />
          <Clients />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
