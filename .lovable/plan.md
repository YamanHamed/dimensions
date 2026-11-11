# Selected work on home + full Archive page

## What you'll see
- **Home "Our work" section:** shows only 3 featured pieces (no filters), plus a "View full archive" button that opens the new page.
- **New Archive page (/work):** every artwork the agency has, in a mixed-size masonry-style grid.
  - Big animated title "الأرشيف / Archive" and a count of pieces.
  - Filter chips (All, 2D, 3D, Ads, Motion, Characters) with the sliding highlight, and cards that rearrange smoothly when filtering.
  - Each card shows the image, category, year, title and client; hovering zooms the image and shows a play button.
  - Clicking a card opens a large full-screen viewer with details, closable with Esc or the X, with next/previous arrows.
  - Same top bar, AR/EN switch, background glow and footer as the home page. The top bar links go back to the home page sections.
- The page has its own title and description for sharing.

## Content
- One shared list of artworks; marking a piece as "featured" puts it on the home page (first 3 featured).
- I'll start with about 12 placeholder pieces using generated art (a few new images) with placeholder names, clients and years — you'll need to send the real artwork, titles and clients.

## Technical details
- `src/components/site/works.ts`: typed artwork data (id, titleAr/En, clientAr/En, category, year, image, featured, aspect).
- `Work()` in Sections.tsx: render `works.filter(featured).slice(0,3)` + `<Link to="/work">`.
- `src/routes/work.tsx` with own head(); wraps in LangProvider, reuses Nav/Footer; Nav links become `/#about` etc. so they work from both pages.
- Lightbox built with motion `AnimatePresence` + `layoutId`; reduced-motion respected.
- Generate ~4 extra artwork images into src/assets.
