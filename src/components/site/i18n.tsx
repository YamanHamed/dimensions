import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
type Ctx = { lang: Lang; toggle: () => void; t: (ar: string, en: string) => string };
const LangCtx = createContext<Ctx>({ lang: "ar", toggle: () => {}, t: (a) => a });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return (
    <LangCtx.Provider
      value={{
        lang,
        toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
        t: (ar, en) => (lang === "ar" ? ar : en),
      }}
    >
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
