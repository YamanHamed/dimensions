# Redesign: Dimensions Animation Studio (أبعاد)

Rebuild your uploaded site as a modern, art-directed single page. Same content and sections, Arabic-first (right-to-left) with the Arabic/English switch kept.

## Art direction
- **Colors:** your brand, made darker and more cinematic. Deep night-purple background (#1a0b2e), brand purple (#42185f) for surfaces, cyan (#20c5e7) as the main accent, pink (#e72a8e) for highlights. Soft glowing color blobs and a light film-grain texture.
- **Type:** Readex Pro stays for Arabic, with large display headings. Section labels are small numbered tags in cyan (01 / من نحن).
- **Layout:** an editorial grid with plenty of space, mixed-size tiles, thin borders and rounded glass-style cards.
- **Motion (medium-bold, level 6):** text that slides up word by word, sections that fade in as you scroll, a slight depth effect on the opening image, a magnetic hover on buttons, cards that tilt toward the cursor, counters that count up, a scrolling strip of client logos, and a short animated logo intro. All motion turns off when the device asks for reduced motion.

## Sections
1. **Top bar:** floating glass bar with the logo, links, AR/EN switch and a "start your project" button. Shrinks once you scroll.
2. **Opening screen:** huge headline "نصنع الفكرة ونحرّكها" with the last word in a cyan-to-pink gradient, a short intro line, two buttons, an animated 3D-style orb visual and a scroll cue.
3. **About:** a mixed-size grid with the 4 counting stats plus vision, message and values cards.
4. **Founder:** split layout for Ali Al Byahi with a glowing portrait ring and skill tags.
5. **How we work:** 4 steps on a horizontal timeline that draws itself as you scroll.
6. **Services:** mixed-size cards with gradient art, tags and a reveal on hover.
7. **Our work:** filter chips, then large project cards with a play button and a "watch" overlay on hover.
8. **Studios:** two large image cards (photography and audio).
9. **Clients:** two rows of logos scrolling in opposite directions.
10. **Contact:** a large heading, a glass-style form, contact details and social links.
11. **Footer:** a giant faded "DIMENSIONS" word.

## Technical details
- Rewrite the home page and split each section into its own file. Port the AR/EN text from the uploaded file into one translations file, and switch the page between right-to-left and left-to-right.
- Add the `motion` package for animations. Load Readex Pro and Space Grotesk through the page head.
- Set the colors in the main stylesheet. Give the page its own title and description in AR and EN.
- Use generated gradient art in place of real project and studio images, since the uploaded file has none.
