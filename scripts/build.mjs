// Static build: prerender every route to HTML, bundle the hydration script, write SEO/AEO files.
// REVIEW=1 shows CONFIRM placeholders (for the committee) and marks every page noindex.
import * as esbuild from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const REVIEW = process.env.REVIEW === '1';
const out = path.join(root, REVIEW ? 'dist-review' : 'dist');
const tmp = path.join(root, '.build');
globalThis.__DFTB_REVIEW__ = REVIEW;

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(path.join(out, 'assets'), { recursive: true });
await fs.cp(path.join(root, 'public'), out, { recursive: true });

const define = { 'process.env.NODE_ENV': '"production"' };
const hash = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);

// 1. Server bundle, imported here to render each page.
await esbuild.build({
  entryPoints: [path.join(root, 'src/server.jsx')], outfile: path.join(tmp, 'server.mjs'),
  bundle: true, platform: 'node', format: 'esm', jsx: 'automatic', packages: 'external', define, logLevel: 'warning'
});
const S = await import(path.join(tmp, 'server.mjs') + '?t=' + Date.now());
const { ROUTES, buildSchema, render, D, SITE_URL } = S;

// 2. Client bundle, code-split per page.
const client = await esbuild.build({
  entryPoints: { app: path.join(root, 'src/client.jsx') }, outdir: path.join(out, 'assets/js'),
  bundle: true, splitting: true, format: 'esm', jsx: 'automatic', minify: true, target: ['es2020'],
  entryNames: '[name]-[hash]', chunkNames: 'c-[hash]', define, metafile: true, logLevel: 'warning'
});
const appJs = '/' + path.relative(out, Object.keys(client.metafile.outputs).find((f) => /app-\w+\.js$/.test(f))).split(path.sep).join('/');

// 3. CSS: design tokens + site layer, minified into one file.
const cssParts = ['fonts', 'colors', 'typography', 'spacing', 'graphics', 'base'].map((t) => path.join(root, 'src/ds/tokens', t + '.css'));
cssParts.push(path.join(root, 'src/site.css'));
const cssSrc = (await Promise.all(cssParts.map((f) => fs.readFile(f, 'utf8')))).join('\n');
const css = (await esbuild.transform(cssSrc, { loader: 'css', minify: true })).code;
const cssFile = '/assets/site-' + hash(css) + '.css';
await fs.writeFile(path.join(out, cssFile), css);

// 4. HTML per route.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function page(route, body) {
  const url = SITE_URL + route.path;
  const og = SITE_URL + '/assets/og/' + route.og + '.jpg';
  const props = route.props ? ` data-props="${esc(JSON.stringify(route.props))}"` : '';
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${D.gaId && !REVIEW ? gtag(D.gaId) : ''}<title>${esc(route.title)}</title>
<meta name="description" content="${esc(route.description)}">
<meta name="robots" content="${REVIEW ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1'}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#8224E3">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dash for the Beads">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(route.title)}">
<meta property="og:description" content="${esc(route.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(route.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(route.title)}">
<meta name="twitter:description" content="${esc(route.description)}">
<meta name="twitter:image" content="${og}">
<meta name="geo.region" content="US-TX">
<meta name="geo.placename" content="Oak Cliff, Dallas">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${route.preload ? `<link rel="preload" as="image" href="${route.preload}" fetchpriority="high">\n` : ''}<link rel="stylesheet" href="${cssFile}">
<link rel="modulepreload" href="${appJs}">
<script type="application/ld+json">${json(buildSchema(route))}</script>
${REVIEW ? '<script>window.__DFTB_REVIEW__=true</script>\n' : ''}${D.gtmId ? gtm(D.gtmId) : ''}</head>
<body>
<div id="root" data-page="${route.page}"${props}>${body}</div>
<script type="module" src="${appJs}"></script>
</body>
</html>
`;
}

// Google tag (GA4) with Consent Mode v2: storage is denied by default and granted when the visitor
// clicks OK on the cookie notice (or already did on an earlier visit). Declining keeps it denied.
function gtag(id) {
  return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var c;try{c=localStorage.getItem('dftb-cookie')}catch(e){}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c==='accepted'?'granted':'denied',wait_for_update:500});
addEventListener('dftb-consent',function(e){gtag('consent','update',{analytics_storage:e.detail==='accepted'?'granted':'denied'})});
gtag('js',new Date());
gtag('config','${id}');
</script>
`;
}

// Google Tag Manager, loaded only after the visitor accepts the cookie notice.
function gtm(id) {
  return `<script>(function(){function go(){if(window.__gtm)return;window.__gtm=1;window.dataLayer=window.dataLayer||[];dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.async=1;s.src='https://www.googletagmanager.com/gtm.js?id=${id}';document.head.appendChild(s)}try{if(localStorage.getItem('dftb-cookie')==='accepted')go()}catch(e){}addEventListener('dftb-consent',function(e){if(e.detail==='accepted')go()})})()</script>\n`;
}

for (const r of ROUTES) {
  const html = page(r, render(r));
  const file = path.join(out, r.path, 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}

// 404 page reuses the layout via a tiny static shell.
await fs.writeFile(path.join(out, '404.html'), page(
  { path: '/404/', page: 'home', og: 'home', type: 'WebPage', title: 'Page not found | Dash for the Beads', description: 'That page moved or never existed.' },
  `<main style="max-width:760px;margin:0 auto;padding:96px 20px;font-family:var(--font-body)"><p class="eyebrow" style="color:var(--text-accent)">404</p><h1 class="h2">This page took a wrong turn on Edgefield</h1><p class="lead">The page you are looking for moved or never existed.</p><p><a href="/">Go to the home page</a> · <a href="/the-race/">Race details</a> · <a href="/contact/">Contact us</a></p></main>`
).replace(/<link rel="canonical"[^>]+>\n/, '').replace('index,follow,max-image-preview:large,max-snippet:-1', 'noindex').replace(/<script type="module"[^>]+><\/script>\n/, '').replace(/<link rel="modulepreload"[^>]+>\n/, ''));

// 5. Crawl and answer-engine files.
const today = new Date().toISOString().slice(0, 10);
const prio = (p) => (p === '/' ? '1.0' : /^\/(the-race|get-involved\/sponsor)\/$/.test(p) ? '0.9' : p.startsWith('/sponsor/') ? '0.5' : '0.8');
await fs.writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod><priority>${prio(r.path)}</priority><image:image><image:loc>${SITE_URL}/assets/og/${r.og}.jpg</image:loc></image:image></url>`).join('\n')}
</urlset>
`);

const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];
await fs.writeFile(path.join(out, 'robots.txt'), REVIEW ? 'User-agent: *\nDisallow: /\n' : `# Dash for the Beads welcomes search engines and AI answer engines.
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE_URL}/sitemap.xml
`);

await fs.writeFile(path.join(out, 'llms.txt'), llms(S, false));
await fs.writeFile(path.join(out, 'llms-full.txt'), llms(S, true));

await fs.writeFile(path.join(out, 'site.webmanifest'), JSON.stringify({
  name: 'Dash for the Beads', short_name: 'Dash', start_url: '/', display: 'browser', background_color: '#FBF8F1', theme_color: '#8224E3',
  icons: [{ src: '/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }]
}, null, 2));

await fs.rm(tmp, { recursive: true, force: true });
console.log(`Built ${ROUTES.length} pages into ${path.relative(root, out)}/ (${REVIEW ? 'review: placeholders visible, noindex' : 'production'})`);

// llms.txt: a plain-language map of the site for LLM crawlers (https://llmstxt.org).
function llms({ ROUTES, D, SITE_URL, RACE_FAQ, GRANTS_FAQ, SPONSOR_FAQ, QUICK_FACTS }, full) {
  const link = (r) => `- [${r.title.split(' | ')[0]}](${SITE_URL}${r.path}): ${r.description}`;
  const main = ROUTES.filter((r) => r.page !== 'tier');
  const tiers = ROUTES.filter((r) => r.page === 'tier');
  const qa = (list) => list.filter((i) => !i.pending && i.a).map((i) => `### ${i.q}\n${i.a}`).join('\n\n');
  let s = `# Dash for the Beads

> Dash for the Beads (also "Good Space Dash for the Beads") is an annual Mardi Gras 5K, 1-mile fun run, and family festival on Davis Street in the Oak Cliff neighborhood of Dallas, Texas. It is a 501(c)(3) non-profit founded in ${D.founded} by Chad West and David Sassano. Net proceeds fund grants for Oak Cliff schools and youth non-profits in physical fitness, healthy eating, and the arts. ${D.year + 1} is the ${D.edition}th annual race.

Key facts:
${QUICK_FACTS.map((f) => `- ${f.k}: ${f.v}`).join('\n')}
- Impact: more than $450,000 in grants since 2010; about 1,000 runners a year
- Registration: ${D.runsignup}
- Contact: ${D.email}

## Pages
${main.map(link).join('\n')}

## Sponsorship levels
${tiers.map((r) => `- [${r.tier.name}](${SITE_URL}${r.path}): ${r.tier.status === 'claimed' ? 'Claimed' : r.tier.price}`).join('\n')}
`;
  if (full) {
    s += `\n## Race FAQ\n\n${qa(RACE_FAQ)}\n\n## Grants FAQ\n\n${qa(GRANTS_FAQ)}\n\n## Sponsor FAQ\n\n${qa(SPONSOR_FAQ)}\n\n## Race-day schedule (${D.dateConfirmed ? D.raceDateLong : 'times from the most recent race; ' + (D.year + 1) + ' date to be announced'})\n${D.schedule.map((i) => `- ${i.time}: ${i.title}${i.detail ? '. ' + i.detail : ''}`).join('\n')}\n`;
  } else {
    s += `\n## Optional\n- [Full FAQ and schedule](${SITE_URL}/llms-full.txt)\n`;
  }
  return s;
}
