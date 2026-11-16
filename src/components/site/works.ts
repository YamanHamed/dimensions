import alsokoon from "@/assets/artworks-thumbnails/alsokoon.webp";
import abrar from "@/assets/artworks-thumbnails/abrar.webp";
import sketch from "@/assets/artworks-thumbnails/sketch.webp";
import hassana from "@/assets/artworks-thumbnails/hassana.webp";
import daman from "@/assets/artworks-thumbnails/daman.webp";
import atalam15 from "@/assets/artworks-thumbnails/atalam15.webp";
import rawa from "@/assets/artworks-thumbnails/rawa.webp";
import maska from "@/assets/artworks-thumbnails/maska.webp";
import madinaAlthalgh from "@/assets/artworks-thumbnails/madinaAlthalgh-2.webp";
import theNine from "@/assets/artworks-thumbnails/theNine.webp";
import rawaah from "@/assets/artworks-thumbnails/rawaah.webp";
import sketch2 from "@/assets/artworks-thumbnails/sketch-2.webp";
import showreel from "@/assets/artworks-thumbnails/showreel.webp";

export type Category = "2D" | "3D" | "Ads" | "Motion" | "Characters" | "Showreel";
export type Artwork = {
  id: number;
  ar: string;
  en: string;
  clientAr: string;
  clientEn: string;
  cat: Category;
  year: number;
  img: string;
  video?: string;
  featured?: boolean;
  tall?: boolean;
};

const cats: Category[] = ["3D", "2D", "Characters", "Motion", "Ads", "3D"];

export const categories: [string, string][] = [
  ["الكل", "All"],
  ["2D", "2D"],
  ["3D", "3D"],
  ["إعلانات", "Ads"],
  ["موشن", "Motion"],
  ["شخصيات", "Characters"],
  ["عرض تعريفي", "Showreel"],
];
const drive = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
const thumb = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

export const works: Artwork[] = [
  {
    id: 1,
    ar: "انشودة السكون",
    en: "The Song of Sokoon",
    clientAr: "مؤسسة بيان ",
    clientEn: "Bayan Foundation",
    cat: "2D",
    year: 2026,
    img: alsokoon,
    video: drive("1IQ4Xsv4TZbc1cDl6LUlDK-zy-8JmiWgj"),
    featured: true,
  },
  {
    id: 2,
    ar: "العرض التعريفي",
    en: "showreel",
    clientAr: "",
    clientEn: "",
    cat: "Showreel",
    year: 2025,
    img: showreel,
    video: drive("10BkCNdp9GCwQrx4gtV9yOQCiwpRQozEd"),
    tall: true,
  },
  {
    id: 3,
    ar: "ابرار",
    en: "abrar",
    clientAr: "مؤسسة ابرار",
    clientEn: "abrar Foundation",
    cat: "3D",
    year: 2025,
    img: abrar,
    video: drive("1W331UYL-hbp_nt6Km3yWecOwAGXBRzLj"),
    featured: true,
  },
  {
    id: 4,
    ar: "the nine",
    en: "the nine",
    clientAr: "",
    clientEn: "",
    cat: "3D",
    year: 2023,
    img: theNine,
    video: drive("1DrCWvzjGYCrHE9y74UHNatoY0hfDEFHk"),
    featured: true,
  },
  {
    id: 5,
    ar: "خطة الاخلاء في الطوارئ",
    en: "Evacuation Plan in Emergencies",
    clientAr: "مؤسسة حصانة",
    clientEn: "hassana Foundation",
    cat: "Motion",
    year: 2025,
    img: hassana,
    video: drive("1ceKaahxBd93QyLiPze8yuxJgL7au0eTX"),
  },
  {
    id: 6,
    ar: "ضمان",
    en: "daman",
    clientAr: "",
    clientEn: "",
    cat: "Motion",
    year: 2025,
    img: daman,
    video: drive("1judY0-_5sBYJaNDnOx7tw9Dhvgr0hwx5"),
    featured: true,
  },
  {
    id: 7,
    ar: "روعة",
    en: "rawaah",
    clientAr: "",
    clientEn: "",
    cat: "3D",
    year: 2025,
    img: rawaah,
    video: drive("1_afa0uUZ5IS7PRbF-9v3tcj2LkD6eTx-"),
    featured: true,
  },
  {
    id: 8,
    ar: "أتعلم 15",
    en: "Ataalam 15",
    clientAr: "",
    clientEn: "",
    cat: "3D",
    year: 2025,
    img: atalam15,
    video: drive("1DywVHyYaaQ-7unS6j_Y0OpeGpgJBS2oG"),
    featured: true,
  },
  {
    id: 9,
    ar: "",
    en: "",
    clientAr: "",
    clientEn: "",
    cat: "2D",
    year: 2025,
    img: maska,
    video: drive("1qFaq8Ye9zPk_Hhp0AkV1A5CqWn_L2wpg"),
    featured: true,
  },
  {
    id: 10,
    ar: "",
    en: "",
    clientAr: "",
    clientEn: "",
    cat: "3D",
    year: 2025,
    img: sketch2,
    video: drive("1sQQL2DiFG_J1VdQIisc5UXvEbc7ofH_2"),
  },
  {
    id: 11,
    ar: "مدينة الثلج",
    en: "madina althalgh",
    clientAr: "",
    clientEn: "",
    cat: "3D",
    year: 2025,
    img: madinaAlthalgh,
    video: drive("1N0kNfF7YnaqH-3YriaxwnVlQMGdXyVU2"),
    featured: true,
  },
  {
    id: 12,
    ar: "",
    en: "",
    clientAr: "",
    clientEn: "",
    cat: "3D",
    year: 2025,
    img: sketch,
    video: drive("1zI7Zm8ZbH6WVKEwMaYiPNpmIw_8_94AC"),
    featured: true,
  },
  {
    id: 13,
    ar: "مدرستنا روعة",
    en: "Our School is Rawaah",
    clientAr: "",
    clientEn: "",
    cat: "3D",
    year: 2025,
    img: rawa,
    video: drive("1wGoVDT0mstMUOysFdSHvzbhGfI6chQ9i"),
    featured: true,
  },
  // ...one object per work
];
