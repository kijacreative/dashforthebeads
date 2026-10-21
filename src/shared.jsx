import React from 'react';
import { DS } from './ds/index.js';
import D from './data.js';

export { DS, D };
export const P = D.pages;

/* Review builds (npm run build:review) show CONFIRM notes for the committee. Production hides them. */
export const REVIEW = !!globalThis.__DFTB_REVIEW__;

export const Section = ({ children, bg, narrow, id, style, label, className = '' }) => (
  <section id={id} aria-label={label} className={'sec ' + className} style={{ background: bg, ...style }}>
    <div className={narrow ? 'sec__in sec__in--narrow' : 'sec__in'}>{children}</div>
  </section>
);
export const Eyebrow = ({ children, color }) => <div className="eyebrow" style={{ color }}>{children}</div>;
export const H2 = ({ children, color, id }) => <h2 id={id} className="h2" style={{ color }}>{children}</h2>;
export const H3 = ({ children, color }) => <h3 className="h3" style={{ color }}>{children}</h3>;
export const Lead = ({ children, style }) => <p className="lead" style={style}>{children}</p>;
export const Body = ({ children, style }) => <p className="body" style={style}>{children}</p>;
export const Grid = ({ min = 280, gap = 20, children, style }) => <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(' + min + 'px,100%),1fr))', gap, ...style }}>{children}</div>;
export const Stack = ({ gap = 16, children, style }) => <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>{children}</div>;
export const Row = ({ gap = 12, children, style }) => <div style={{ display: 'flex', flexWrap: 'wrap', gap, alignItems: 'center', ...style }}>{children}</div>;
export const Card = ({ children, style, flat, className = '' }) => <article className={'card ' + (flat ? 'card--flat ' : '') + className} style={style}>{children}</article>;
export const List = ({ items, ordered }) => { const T = ordered ? 'ol' : 'ul'; return <T className="list">{items.map((i, k) => <li key={k}>{i}</li>)}</T>; };

/* Editorial placeholders: visible only in review builds so committee volunteers can find and replace them. */
export const Ph = ({ children }) => (REVIEW ? <mark className="dftb-ph">[{children}]</mark> : null);
/* Content that only makes sense once confirmed (dead links, empty slots). Hidden in production. */
export const Pending = ({ children }) => (REVIEW ? children : null);
export const PhotoSlot = ({ desc, ratio = '4/3', fallback }) => {
  if (!REVIEW) return fallback ? <Img p={fallback} ratio={ratio} /> : null;
  return <div role="img" aria-label={'Photo needed: ' + desc} className="photo-slot" style={{ aspectRatio: ratio }}><mark className="dftb-ph">[PHOTO NEEDED: {desc}]</mark></div>;
};
export const Img = ({ p, ratio = '4/3', style, eager }) => (
  <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading={eager ? 'eager' : 'lazy'} decoding="async" className="photo" style={{ aspectRatio: ratio, ...style }} />
);

export const wallTiers = () => D.wall.map((t) => ({ ...t, sponsors: t.sponsors.filter((s) => REVIEW || !s.placeholder) }));

export const tierCardProps = (t) => ({ ...t, price: t.status === 'claimed' ? 'Claimed' : t.price, ctaLabel: 'Details', ctaHref: P.tier(t.slug) });

/* Register button: always RunSignup, UTM tagged by location. */
export const RegisterButton = ({ loc, size = 'lg', children = 'Register' }) => <DS.Button variant="register" size={size} iconRight="arrow-right" href={D.reg(loc)}>{children}</DS.Button>;
/* Until registration opens, the primary CTA is email capture. */
export const PrimaryCTA = ({ loc, size = 'lg' }) => (D.registrationOpen ? <RegisterButton loc={loc} size={size} /> : <DS.Button variant="register" size={size} icon="mail" href="#updates">Get race updates</DS.Button>);

/* Analytics events: GA4 via gtag when the Google tag is on the page, plus dataLayer for GTM. */
export function track(event, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
  window.dataLayer = window.dataLayer || [];
  if (window.__gtm) window.dataLayer.push({ event, ...params });
}

/* Form delivery. With D.formEndpoint set (the Google Apps Script web app in google-apps-script/), each submission
   becomes a row in the forms Google Sheet. Without it, the visitor's email app opens prefilled to the committee.
   `data` is keyed by the label people see, which becomes the column header. `trap` is the honeypot value. */
export async function deliver(form, data, trap = '') {
  if (D.formEndpoint) {
    // No custom headers: a text/plain POST skips the CORS preflight that Apps Script can't answer.
    const r = await fetch(D.formEndpoint, { method: 'POST', body: JSON.stringify({ form, page: window.location.pathname, website: trap, fields: data }) });
    const res = await r.json().catch(() => ({}));
    if (!r.ok || !res.ok) throw new Error(res.error || 'Form service returned ' + r.status);
    track('form_submit', { form_name: form, method: 'sheet' });
    return 'sent';
  }
  track('form_submit', { form_name: form, method: 'email' });
  const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => k + ': ' + v).join('\n');
  window.location.href = 'mailto:' + D.email + '?subject=' + encodeURIComponent('Website: ' + form) + '&body=' + encodeURIComponent(body);
  return 'mailto';
}

/* Honeypot: hidden from people and screen readers, filled in by naive spam bots. */
const Trap = () => (
  <div aria-hidden="true" className="trap"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
);

/* Newsletter sign-up in the design system's EmailSignup style, but it only says "you're on the list" once the sheet confirms. */
export function NewsletterSignup({ form, tone = 'gold', title, body, buttonLabel = 'Sign me up', successMessage = "Thanks! You're on the list. See you on Davis Street." }) {
  const [email, setEmail] = React.useState('');
  const [state, setState] = React.useState('idle');
  const [err, setErr] = React.useState('');
  const submit = async (e) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(v)) { setErr('Enter an email like name@example.com'); return; }
    setErr(''); setState('sending');
    try {
      const r = await deliver(form, { Email: v }, new FormData(e.target).get('website') || '');
      setState(r === 'mailto' ? 'mailto' : 'done');
    } catch { setState('idle'); setErr("That didn't go through. Please try again, or email " + D.email + '.'); }
  };
  return (
    <section className={'signup signup--' + tone}>
      <h3 className="signup__h">{title}</h3>
      {state === 'done' ? <p role="status" className="signup__done"><DS.Icon name="circle-check" size={24} />{successMessage}</p>
        : state === 'mailto' ? <p role="status" className="signup__done"><DS.Icon name="mail" size={24} />Your email app should open. Hit send and we'll add you to the list.</p>
        : <>
          <p className="signup__b">{body}</p>
          <form onSubmit={submit} noValidate className="signup__f">
            <label className="signup__l"><span className="sr-only">Email address</span>
              <input type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={!!err} aria-describedby={err ? form + '-err' : undefined} />
            </label>
            <Trap />
            <DS.Button type="submit" variant={tone === 'purple' ? 'register' : 'primary'}>{state === 'sending' ? 'Sending' : buttonLabel}</DS.Button>
          </form>
          {err && <span role="alert" id={form + '-err'} className="signup__err">{err}</span>}
        </>}
    </section>
  );
}

export const Updates = ({ tone = 'gold' }) => (
  <div id="updates" className="anchor">
    <NewsletterSignup form="race-updates" tone={tone} title="Get race updates" body="Be first to hear the 2027 date, when registration opens, and early pricing. A few emails a year." />
    <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-caption)' }}><Ph>{D.formEndpoint ? 'Sign-ups go to the Newsletter tab of the forms Google Sheet' : 'CONFIRM: set formEndpoint in src/data.js (Google Apps Script URL) so sign-ups reach the Google Sheet'}</Ph></p>
  </div>
);

/* Generic interest form. Validates in the browser, then hands off to deliver(). */
export function InterestForm({ name, fields, submitLabel = 'Send', success = "Thanks. We'll be in touch soon." }) {
  const { TextField, SelectField, Checkbox, Button, Icon } = DS;
  const [state, setState] = React.useState('idle');
  const [err, setErr] = React.useState({});
  const [q, setQ] = React.useState(null);
  React.useEffect(() => { setQ(new URLSearchParams(window.location.search)); }, []);
  const submit = async (e) => {
    e.preventDefault(); const f = new FormData(e.target); const x = {}; const data = {};
    fields.forEach((fd) => {
      const v = (f.get(fd.name) || '').toString().trim();
      const opt = fd.options && fd.options.find((o) => typeof o === 'object' && o.value === v);
      data[fd.label] = opt ? opt.label : v;
      if (fd.required && !v) x[fd.name] = 'Required';
      if (fd.type === 'email' && v && !/^\S+@\S+\.\S+$/.test(v)) x[fd.name] = 'Enter an email like name@example.com';
    });
    setErr(x); if (Object.keys(x).length) return;
    setState('sending');
    try { setState(await deliver(name, data, f.get('website') || '')); } catch { setState('error'); }
  };
  if (state === 'sent') return <div role="status" className="form-done"><Icon name="circle-check" size={26} />{success}</div>;
  if (state === 'mailto') return <div role="status" className="form-done"><Icon name="mail" size={26} /><span>Your email app should open with your details filled in. Hit send and it goes straight to the committee. If nothing opened, email us at <a href={'mailto:' + D.email}>{D.email}</a>.</span></div>;
  return (
    <form onSubmit={submit} noValidate data-form={name} className="iform" key={q ? 'q' : 'n'}>
      <Grid min={240} gap={18}>
        {fields.map((fd) => {
          const wide = fd.multiline || fd.wide ? { gridColumn: '1 / -1' } : null;
          const dv = (fd.fromQuery && q && q.get(fd.fromQuery)) || fd.value || undefined;
          const el = fd.options ? <SelectField name={fd.name} label={fd.label} options={fd.options} required={fd.required} hint={fd.hint} error={err[fd.name]} defaultValue={dv} placeholder={fd.placeholder} />
            : fd.check ? <Checkbox name={fd.name} label={fd.label} />
            : <TextField name={fd.name} label={fd.label} type={fd.type || 'text'} required={fd.required} hint={fd.hint} multiline={fd.multiline} error={err[fd.name]} autoComplete={fd.auto} />;
          return <div key={fd.name} style={wide}>{el}</div>;
        })}
      </Grid>
      <Trap />
      {state === 'error' && <p role="alert" className="form-err">Something went wrong sending that. Please email <a href={'mailto:' + D.email}>{D.email}</a>.</p>}
      <div><Button type="submit" variant="primary" size="lg" disabled={state === 'sending'}>{state === 'sending' ? 'Sending' : submitLabel}</Button></div>
      <p className="fine">Goes straight to the committee at {D.email}.</p>
    </form>
  );
}
export const F = {
  first: { name: 'first', label: 'First name', required: true, auto: 'given-name' },
  last: { name: 'last', label: 'Last name', required: true, auto: 'family-name' },
  email: { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' },
  phone: { name: 'phone', label: 'Phone', type: 'tel', auto: 'tel' },
  company: { name: 'company', label: 'Company or organization', required: true, auto: 'organization' },
  notes: { name: 'notes', label: 'Anything else we should know?', multiline: true }
};

/* FAQ rendered from plain-text content (same strings feed FAQPage schema). */
export const Faq = ({ items, defaultOpen = 0 }) => {
  const shown = items.filter((i) => REVIEW || !i.pending);
  return <DS.FAQAccordion defaultOpen={defaultOpen} items={shown.map((i) => ({ q: i.q, a: <>{i.a} {i.confirm && <Ph>{i.confirm}</Ph>}</> }))} />;
};

export const NAV = [
  { label: 'The Race', href: P.race, key: 'race' },
  { label: 'About', href: P.about, key: 'about' },
  { label: 'Get Involved', href: P.involved, key: 'involved' },
  { label: 'Sponsors', href: P.sponsors, key: 'sponsors' },
  { label: 'Grants', href: P.grants, key: 'grants' },
  { label: 'Contact', href: P.contact, key: 'contact' }
];
const FOOT_COLS = [
  { title: 'Race', links: [['Race details', P.race], ['Schedule', P.race + '#schedule'], ['Routes', P.race + '#routes'], ['FAQ', P.race + '#faq']] },
  { title: 'Get involved', links: [['Become a sponsor', P.sponsor], ['Friends of the Dash', P.involved + '#friends'], ['Vendors', P.involved + '#vendors'], ['Volunteer', P.involved + '#volunteer']] },
  { title: 'Organization', links: [['About us', P.about], ['Grants', P.grants], ['Our sponsors', P.sponsors], ['Contact', P.contact]] }
];

function SiteHeader({ active }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <header className="hdr">
      <div className="hdr__in">
        <a href={P.home} className="hdr__logo" aria-label="Dash for the Beads home">
          <img src="/assets/logo/badge.webp" alt="Good Space Dash for the Beads" width="64" height="64" />
          <span className="hdr__name">Dash for<br />the Beads</span>
        </a>
        <nav aria-label="Main" className="hdr__nav">
          {NAV.map((l) => <a key={l.key} href={l.href} aria-current={active === l.key ? 'page' : undefined}>{l.label}</a>)}
        </nav>
        <div className="hdr__cta">
          <DS.Button variant="register" size="md" href={D.reg('header')}>Register</DS.Button>
          <button className="hdr__menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
            <DS.Icon name={open ? 'x' : 'menu'} size={26} />
          </button>
        </div>
      </div>
      <nav id="mnav" aria-label="Mobile" className="hdr__drawer" hidden={!open}>
        {NAV.map((l) => <a key={l.key} href={l.href} aria-current={active === l.key ? 'page' : undefined}>{l.label}<DS.Icon name="chevron-right" size={22} /></a>)}
      </nav>
    </header>
  );
}

function SiteFooter() {
  const social = Object.entries(D.social).filter(([, v]) => v);
  return (
    <footer className="ftr">
      <DS.BeadDivider size="md" />
      <div className="ftr__in">
        <div className="ftr__brand">
          <img src="/assets/logo/badge.webp" alt="Good Space Dash for the Beads" width="96" height="96" loading="lazy" />
          <p className="ftr__tag">Laissez les bons temps rouler!</p>
          <p className="ftr__about">A Mardi Gras 5K, 1-mile fun run, and family festival on Davis Street in Oak Cliff, Dallas. Net proceeds fund grants for Oak Cliff kids.</p>
        </div>
        {FOOT_COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="ftr__h">{c.title}</h2>
            <ul>{c.links.map(([l, h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="ftr__base">
        <span>© {D.year} Dash for the Beads, Oak Cliff, Dallas, Texas. A 501(c)(3) non-profit. <a href={'mailto:' + D.email}>{D.email}</a></span>
        {social.length > 0 && <span className="ftr__social">{social.map(([k, href]) => <a key={k} href={href} aria-label={'Dash for the Beads on ' + k} rel="me noopener"><DS.Icon name={k} size={22} /></a>)}</span>}
      </div>
    </footer>
  );
}

function CookieNotice() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { try { setShow(!localStorage.getItem('dftb-cookie')); } catch { /* storage blocked */ } }, []);
  if (!show) return null;
  const done = (v) => { try { localStorage.setItem('dftb-cookie', v); } catch { /* ignore */ } window.dispatchEvent(new CustomEvent('dftb-consent', { detail: v })); setShow(false); };
  return (
    <div role="region" aria-label="Cookie notice" className="cookie">
      <span>We use cookies to count visits and measure registrations. That's it.</span>
      <Row gap={8}><DS.Button size="sm" variant="outline" onClick={() => done('declined')}>Decline</DS.Button><DS.Button size="sm" onClick={() => done('accepted')}>OK</DS.Button></Row>
    </div>
  );
}

export function Layout({ active, children }) {
  const onClick = (e) => {
    const a = e.target.closest && e.target.closest('a'); if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.includes('runsignup.com')) track('runsignup_click', { link_url: href, link_location: new URL(href).searchParams.get('utm_content') || '' });
  };
  return (
    <div onClickCapture={onClick}>
      <a href="#main" className="dftb-skip">Skip to content</a>
      <SiteHeader active={active} />
      <main id="main">{children}</main>
      <SiteFooter />
      <CookieNotice />
    </div>
  );
}
