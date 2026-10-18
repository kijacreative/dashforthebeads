# Dash for the Beads: WordPress build notes

## Theme and patterns
- Block theme (e.g. Ollie or a Twenty Twenty-Five child). Tokens from the design system go into `theme.json` (palette, Oswald / Source Sans 3 / Alfa Slab One, spacing scale, 4/10/20px radii).
- Synced patterns, one per component: Page Banner, Stat Band, Tier Card, Sponsor Wall, Schedule, FAQ, Email Signup, Testimonial, Register Button.
- Race date, registration-open toggle, and RunSignup URL live in one Options page (ACF or Meta Field Block) so the hero swaps "Get race updates" to "Register" in one place.
- Sponsor tiers = custom post type `sponsor_tier` (price, status, claimed-by, benefits, logo). Drives /sponsor/ cards, /sponsors/ wall, and /sponsor/<slug>/ template.
- Forms: one plugin (Gravity Forms, Fluent Forms, or WPForms). All route to info@dashforthebeads.org. Forms: Contact, Sponsor deck, Tier claim, Friends, Vendor, Volunteer.
- Email list: [CONFIRM provider]. Cookie notice: Complianz or similar, banner only.

## Register links
`https://runsignup.com/Race/TX/Dallas/DashfortheBeads?utm_source=website&utm_medium=button&utm_campaign=dfb2027&utm_content=<location>`
Locations used: header, home-hero, race-intro.

## Tracking
- GA4 + Meta pixel via Site Kit or GTM. Load only after cookie consent.
- Outbound clicks to runsignup.com fire `runsignup_click` (dataLayer). Mark as GA4 key event and Meta `Lead`.
- Form submits fire `form_submit` with `form` name.

## SEO
- Unique title/meta per page (see each HTML head). OG image per page at /assets/og/<page>.jpg, 1200x630 [PHOTO NEEDED].
- SportsEvent schema: Home and The Race. NGO/Organization (501(c)(3)) on Home, About, Grants, Contact. Fill EIN and startDate.

## 301 redirects (Redirection plugin)
- /about-us/ and /about-us-2/ → /about/
- /race-route/ → /the-race/
- /become-a-sponsor/ → /get-involved/sponsor/
- /vendor-information/ → /get-involved/#vendors (or /get-involved/vendors/)
- /jointheparty/ → /get-involved/
- /contact/ → /contact/ (unchanged)
- /grants/ → /grants/ (unchanged)

## Performance and accessibility
- Convert all photos to WebP (≤ 200 KB, 1600px max), `loading="lazy"` except the hero (`fetchpriority="high"`).
- Self-host fonts, `font-display: swap`. YouTube is click-to-load.
- WCAG 2.1 AA: palette pairs pre-checked; 48px tap targets; skip link; visible focus ring.
