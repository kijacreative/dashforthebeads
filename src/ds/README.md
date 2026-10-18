# Dash for the Beads Design System

Good Space Dash for the Beads is an annual Mardi Gras 5K, 1-mile fun run, and family festival in Oak Cliff, Dallas, TX. It is a 501(c)(3) founded in 2009 by "Cliff Dwellers" Chad West and David Sassano. Net proceeds fund grants for Oak Cliff schools and youth non-profits in physical fitness, healthy eating, and the arts. 2027 is the 18th annual race. The race runs back-to-back with the Go Oak Cliff Mardi Gras Parade on Davis Street.

**Audiences**
- Runners and families from Oak Cliff and greater Dallas. Registration happens on RunSignup. Most traffic arrives from Instagram and QR codes, so everything is mobile first.
- Local businesses and corporate sponsors (Good Space is presenting sponsor; Methodist Dallas & Methodist Health held Community Hero in 2026).
- Schools (through PTAs) and youth non-profits applying for grants.
- Vendors, food trucks, and volunteers.

**Products / surfaces**: the website (dashforthebeads.org), social graphics (Instagram feed, stories, link previews), and print (bibs, shirts, signage, medals, cups, bags).

## Sources
All provided as uploads in `uploads/` (no Figma, no codebase):
- `logo.jpeg`: primary square badge, circle-cropped avatar (447px raster). Copied to `assets/logo/`.
- `dash1`–`dash9`, two `.webp` photos: race-day photography. Copied to `assets/photos/`.
- Wayback Machine captures of dashforthebeads.org: home, about, race route, become a sponsor, join the party, vendor info, contact (2026), plus about and grants (2016, with the legacy round logo).
- Impact numbers come from the 2026 About page: $325,000 donated since 2014, 34 organizations, $27,000 in free entries to approx. 675 DISD kids over 3 years, approx. 1,000 runners.

---

## CONTENT FUNDAMENTALS

**Vibe.** Neighborhood party with a purpose. The existing copy is chatty and self-deprecating ("Several of our committee members only run if they are being chased"), proud of the neighborhood, and always circles back to the kids it funds.

**Person.** "We" for the organization, "you" for the reader. Contractions are fine. First names for committee members.

**Casing.** Headlines are uppercase via Oswald (author them in sentence case; CSS uppercases). Buttons are uppercase Oswald, 1 to 3 words, verb first: Register, Become a Sponsor, Sign Up, Apply. Body is sentence case.

**Mechanics.** Times as 9:30am. Dates as Sunday, February 15, 2026. Distances as 5K, 1 mile, Fun Run. "Dash for the Beads" on first mention, "the Dash" after; "Good Space Dash for the Beads" in sponsor and press copy. Numerals for money and stats.

**Punctuation.** No em-dashes anywhere. Use a period, comma, or colon. One exclamation point per screen.

**Tagline.** "Laissez les bons temps rouler!" (Let the good times roll.) Use once per page or post, usually as a sign-off. It is the only accent-face line allowed over 4 words.

**Emoji.** Never on the website. Social captions only, max 2, from 💜💚💛🎭⚜️🏃.

**By audience** (see `guidelines/voice-*.html`):
- *Runners and families*: loud, warm, practical. Lead with when, where, what to wear. End with Register. "Bring the kids. The 1-mile fun run starts at 10:30am, before the 5K, so you can do both."
- *Sponsors*: confident, specific, brief. Placement, reach, deadlines, price. "Race Bibs Sponsor, $5,000. Your logo on every 5K bib."
- *Grant applicants*: plain, respectful, precise. No party language. Eligibility, what to submit, how it's scored, who to contact.

**Do / don't**
1. Do: "Grab your beads and your best costume. The 5K starts at 11am on Davis Street." Don't: "Participants are encouraged to arrive in festive attire prior to the commencement of the race."
2. Do: "Your $5,000 puts your logo on every 5K bib." Don't: "Exciting exposure opportunities await!!!"
3. Do: "Grants go to Oak Cliff schools and youth non-profits for fitness, healthy eating, and the arts." Don't: joke about the mission.
4. Do: "Route change: Edgefield Ave is closed." Don't: bury logistics in hype or emoji.
5. Do: the tagline once, as a sign-off. Don't: the tagline in every headline and button.

---

## VISUAL FOUNDATIONS

**Color.** Three Mardi Gras colors on warm paper with purple-tinged ink.
- Mardi Gras Purple `#8224E3` (`--purple-500`): primary, page banners, headers, primary buttons. Matches the live site's banner purple. The badge's printed letter purple samples closer to `#7E3394` (`--purple-logo`), kept for print matching only.
- Parade Green `#2E9E1F` (`--green-500`) for fills and art; `#1B7A12` (`--green-600`) for any text or white-text button (white on 500 is only 3.5:1).
- Doubloon Gold `#F2E21B` (`--gold-400`): Register, badges, date blocks, highlights. Always ink text, never white (1.2:1).
- Neutrals: Ink `#1C1622`, Ink 700 `#453D4D`, Gray `#6E6875`, Line `#E2DCD0`, Paper `#FBF8F1`, Paper 100 `#F3EEE3`.
- Dark mode via `data-theme="dark"`: purple-black `#16101D` ground, purple 300 and green 300 for text accents, gold unchanged.
- All shipped text pairs pass AA; see `guidelines/colors-contrast.html` (computed live).

**Type.**
- Display: **Oswald** 500–700, always uppercase. Picked over Bebas Neue (one weight, no lowercase), Anton (too heavy for subheads), and League Gothic (narrowest match to the badge, but one weight and poor small-size rendering). The 2016 site already used Oswald.
- Body: **Source Sans 3** 400/600/700. Picked over Open Sans (current site body; wider, pairs less tightly with condensed display) and Nunito Sans (rounded terminals fight the badge).
- Accent: **Alfa Slab One**, slab callouts only, 4 words max. Chosen over a script for legibility on phones and in sunlight.
- Scale is fluid between 375px and 1280px: Display XL 56→96, Display L 44→72, H1 36→56, H2 28→40, H3 22→28, Body L 18→20, Body 16→18, Body S 14→15, Caption 13, Accent 24→32, Stat 48→72. Line height 0.95 display, 1.08 headings, 1.6 body.

**Spacing and layout.** 4px base (`--space-1`…`--space-10`: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Section padding fluid 48→112px. Grid: 4 col / 16 gutter / 20 margin on mobile, 8 col tablet, 12 col / 24 gutter / 48 margin desktop, 1200 max, 760 narrow for reading pages. Sticky header (64 mobile / 80 desktop) with Register always visible. Tap targets 48px; nothing under 44.

**Backgrounds.** Plain paper for anything people read. Solid purple for page banners and stat bands. Confetti pattern (CSS dots and dashes in gold, green, lilac) only on purple banners and social, fading in from the right so headlines sit on clean color. Purple duotone photos for heroes. No gradients except the protection gradient at the bottom of duotone photos.

**Graphic motifs.** Bead-string dividers (purple, green, gold beads with a highlight) mark section breaks and the bottom of every banner. Green keyline echoes the badge border. Gold "Claimed" stickers sit slightly rotated with a hard ink shadow. Fleur-de-lis, masks, jester hats as single-color fill icons.

**When decoration stops.** Forms, FAQ, grant pages, sponsor tier details, prices, dates, addresses, and QR codes are never decorated. No confetti or script behind body copy. One decorative element per mobile viewport.

**Imagery.** Real race-day photos: saturated costume color, natural daylight, eye-level, faces and laughter, all ages, Oak Cliff streets. Full color everywhere except heroes, where photos go purple duotone (`.dftb-duotone`, grayscale + luminosity blend over purple 700, with a bottom protection gradient for type). No stock, no heavy filters.

**Corners.** Buttons and inputs 4px (tight, poster-like), cards 10px, photos and video 20px, chips and stickers pill. Banners are square full-bleed.

**Cards.** White surface, 10px radius, soft `--shadow-1`, or a 1px Line border on paper. Featured cards get a 3px purple border. No colored left-border accents.

**Shadows.** Two families. Hard "pop" (`0 4px 0 ink`) for festive actions: the Register button, Claimed stickers, video play button. Soft elevation (`--shadow-1/2/3`) for structure.

**Borders.** 1px Line 200 dividers; 2px for inputs (gray 300, purple on focus); 2px ink border on Register and gold stickers.

**Hover / press.** Purple and green buttons darken one step on hover. Gold Register lightens to gold 300 on hover and presses down 4px into its shadow (shadow disappears). Links darken green 600 → 700 with an offset underline. Focus: 3px purple ring (gold in dark mode).

**Motion.** Quick and functional: 120–200ms `--ease-out` for UI. A small bounce (`--ease-bounce`) only on celebratory moments: Register press release, stat count-up. Countdown ticks without animation. Everything off under `prefers-reduced-motion`.

**Transparency and blur.** Only the lightbox scrim (purple 950 at 94%) and duotone protection gradients. No glassmorphism.

---

## ICONOGRAPHY

- **UI icons: Lucide** (stroke, 2px, 24 grid) for menu, close, chevrons, arrows, map pin, calendar, mail, social logos. Path data is vendored in `components/brand/iconData.js` (ISC license).
- **Festive icons: game-icons.net** (single-color fill, 512 grid, CC BY 3.0, attribution required) for fleur-de-lys, domino and carnival masks, jester hat, crown, tiara, beads necklace, party popper, flags, balloons, trumpet, saxophone, drum, running shoe, sprint, trophy, beer stein, heart, paintbrush, apple, sun, theater masks. SVGs in `assets/icons/`, also in `iconData.js`.
- Both render through the `Icon` component. **Substitution flag:** the original site used only stock social icons; there was no brand icon set, so these are the closest open-licensed matches to the badge's mask and jester hat.
- No icon font. No emoji on the website. Unicode ⚜ is not used (renders inconsistently).
- Festive icons are decoration: 24px min, purple, green 600, ink, or gold on purple, and always with a text label in UI.

---

## Index

- `styles.css`: entry point; imports everything in `tokens/`.
- `tokens/`: `fonts.css` (Google Fonts @font-face), `colors.css` (primitives, semantic light + dark), `typography.css`, `spacing.css` (space, radius, shadow, grid, motion), `graphics.css` (`.dftb-beads`, `.dftb-confetti`, `.dftb-duotone`, `.dftb-keyline`), `base.css`.
- `guidelines/`: foundation cards (Colors, Type, Spacing, Brand, Co-branding, Voice, Social).
- `components/`: React primitives, one `@dsCard` per folder.
- `ui_kits/website/`: click-through website (`index.html`, `mobile.html`).
- `templates/social-kit/`: editable social templates for all four sizes.
- `assets/logo/`: `dftb-badge-on-white.png` (primary, cleaned), `dftb-badge-avatar.jpg` (original upload), `legacy-round-logo-archive.png` (archive only).
- `assets/photos/`: race-day photography. `assets/icons/`: festive SVGs.
- `SKILL.md`: agent skill entry.

### Components
- brand: **Logo**, **BeadDivider**, **Icon**
- actions: **Button** (primary, secondary, register, outline, on-dark)
- navigation: **SiteHeader** (persistent Register), **SiteFooter**, **AnnouncementBar**
- content: **PageBanner**, **StatCounter**, **Testimonial**
- media: **PhotoGallery**, **VideoEmbed**
- event: **CountdownTimer**, **Schedule**
- sponsors: **SponsorTierCard** (claimed / available / featured), **SponsorWall** (tiered sizes)
- faq: **FAQAccordion**
- forms: **TextField**, **SelectField**, **Checkbox**, **EmailSignup**

### Intentional additions
- `Icon`: wrapper for the vendored Lucide + game-icons sets.
- `Logo`: embeds the raster badge so components can place it without path issues.
- `BeadDivider`: component form of the bead-string motif for use inside components.

## Co-branding rules (summary)
Our badge leads (left or top); sponsor logo matches its visual height, max 90% of its width; clear space X = height of the GOOD SPACE line (about 10% of badge) around each mark, 2X between with a 2px Line rule. Web: white tiles, full color, min 120px. Social: white strip at the bottom inside the safe zone, min 120px on a 1080 canvas. Signage: sponsor on white panel, min 6 in tall on banners. Bibs: top band only, one-color ink, min 0.5 in tall, number area clear. One-color versions (ink, white, ink on gold) must come from supplied vector art. See `guidelines/cobrand-*.html`.

## Social safe zones (summary)
108px margin on 1080-wide formats, 60px on 1200×630. Story: keep top 250px and bottom 340px clear. QR: 220px min white square, 24px quiet zone, bottom right. Date: gold block with ink text, bottom left.
