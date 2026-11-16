import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
type Ctx = { lang: Lang; toggle: () => void; t: (ar: string, en: string) => string };
const LangCtx = createContext<Ctx>({ lang: "ar", toggle: () => {}, t: (a) => a });
const KEY = "dimensions-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  // Saved choice wins; otherwise follow the browser language.
  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "ar" || saved === "en") setLang(saved);
    else setLang(navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en");
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return (
    <LangCtx.Provider
      value={{
        lang,
        toggle: () =>
          setLang((l) => {
            const next = l === "ar" ? "en" : "ar";
            localStorage.setItem(KEY, next);
            return next;
          }),
        t: (ar, en) => (lang === "ar" ? ar : en),
      }}
    >
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
