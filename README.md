# Dash for the Beads website

A static site built from the Claude Design export (`design-source/`). Every page is prerendered to HTML, so search engines and AI answer engines can read all of it, and then hydrated with React so forms, the mobile menu, and the sponsor filters work.

## Commands

```bash
npm install
npm run build          # production site -> dist/
npm run build:review   # committee review -> dist-review/ (CONFIRM notes visible, noindex)
npm run images         # re-run the image pipeline after adding photos to design-source/raw-assets
npm run preview        # serve dist/ at http://localhost:4321
```

Deploy: `vercel.json` builds `dist/` with trailing-slash URLs and the 301 redirects from the old WordPress site.

## Where to edit

- `src/data.js`: race date, registration toggle, sponsors, tiers, committee, photos, social links, GTM ID, form endpoint.
- `google-apps-script/Code.gs`: the Google Sheet receiver for all website forms.
- `src/content.js`: FAQ answers and the "at a glance" facts. These same strings feed the FAQPage schema and `llms.txt`.
- `src/routes.js`: page titles and meta descriptions.
- `src/pages/*.jsx`: page layouts. `src/shared.jsx`: header, footer, forms. `src/site.css`: site styles. Design tokens are in `src/ds/tokens/`.

## Turning things on

| When you have... | Set in `src/data.js` | Effect |
| --- | --- | --- |
| The 2027 date | `dateConfirmed: true`, `raceDateISO`, `raceDateLong` | Hero, schedule, quick facts, and SportsEvent schema (rich results) |
| Registration open | `registrationOpen: true` | Hero CTA switches from "Get race updates" to Register |
| The Google Sheet web app URL | `formEndpoint` | Newsletter, contact, and all interest forms save to the forms Google Sheet ([setup](google-apps-script/README.md)). Until then they open a prefilled email to info@ |
| GTM container | `gtmId` | GA4 and Meta load only after cookie consent |
| Social URLs | `social` | Footer icons and `sameAs` in Organization schema |
| EIN | `ein` | `taxID` in Organization schema |
| YouTube ID | `youtubeId` | Click-to-load video on Home |

## SEO and AEO

- Unique title, description, canonical, Open Graph, and Twitter card per page, with a branded 1200x630 share image for each.
- JSON-LD `@graph` on every page: NGO/SportsOrganization, WebSite, WebPage (with speakable), and BreadcrumbList. FAQPage on The Race, Grants, and Sponsor. OfferCatalog of sponsorship levels. SportsEvent once the date is confirmed.
- `sitemap.xml` (with images), `robots.txt` (explicitly allows the major AI crawlers), `llms.txt` and `llms-full.txt`.
- "At a glance" fact strips on Home and The Race, written as short, quotable answers.
- One H1 per page, static per-tier sponsor pages at `/sponsor/<slug>/`, WebP images with dimensions, and a preloaded hero.
