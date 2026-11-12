import work from "@/assets/work.jpg";
import a1 from "@/assets/art-1.jpg";
import a2 from "@/assets/art-2.jpg";
import a3 from "@/assets/art-3.jpg";
import a4 from "@/assets/art-4.jpg";
import photo from "@/assets/studio-photo.jpg";

export type Category = "2D" | "3D" | "Ads" | "Motion" | "Characters";
export type Artwork = { id: number; ar: string; en: string; clientAr: string; clientEn: string; cat: Category; year: number; img: string; featured?: boolean; tall?: boolean };

const imgs = [a1, a2, a3, a4, work, photo];
const cats: Category[] = ["3D", "2D", "Characters", "Motion", "Ads", "3D"];

// Placeholder artworks — replace with the agency's real pieces.
export const works: Artwork[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  ar: `اسم العمل ${i + 1}`,
  en: `Artwork ${i + 1}`,
  clientAr: "اسم العميل",
  clientEn: "Client name",
  cat: cats[i % 6]!,
  year: 2026 - (i % 4),
  img: imgs[i % 6]!,
  featured: i < 3,
  tall: i % 6 === 1,
}));

export const categories: [string, string][] = [["الكل", "All"], ["2D", "2D"], ["3D", "3D"], ["إعلانات", "Ads"], ["موشن", "Motion"], ["شخصيات", "Characters"]];
