# Hero "stays behind" scroll effect

When you scroll down, the opening screen stays pinned in place while the About section (and everything after it) slides up over it like a sheet.

## What you'll see
- The opening screen holds still as you scroll.
- The About section rises over it with rounded top corners and a soft shadow on its top edge, so it reads as a layer moving on top.
- While it's being covered, the opening screen slowly darkens, shrinks slightly and fades, which adds depth.
- On devices set to reduce motion, the pinning stays but the darken/shrink effect is turned off.

## Technical details
- Top.tsx Hero: make the section `sticky top-0 h-svh` (instead of relative/min-h-svh) with `z-0`; remove the image's `y` parallax translate (it'd fight the pin); keep a scroll-linked scale (1 → 0.92), content opacity fade, and add a dark overlay whose opacity rises 0 → 0.6 driven by `useScroll` on the hero's offset `["start start", "end start"]`.
- index.tsx: wrap everything after `<Hero />` in a `relative z-10 bg-background rounded-t-[2.5rem] shadow-[...]` container (shadow via a design token in styles.css) so it covers the pinned hero.
- Check the background blobs still show and that the nav stays above both layers (z-50 already).
- Verify with a Playwright scroll screenshot at the user's viewport.
