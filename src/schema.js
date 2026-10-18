// schema.org JSON-LD graph per page. One @graph, entities linked by @id.
import D, { SITE_URL } from './data.js';
import { RACE_FAQ, GRANTS_FAQ, SPONSOR_FAQ } from './content.js';

const abs = (p) => SITE_URL + p;
const ORG = SITE_URL + '/#org';
const SITE = SITE_URL + '/#website';
const FAQS = { race: RACE_FAQ, grants: GRANTS_FAQ, sponsor: SPONSOR_FAQ };

const address = { '@type': 'PostalAddress', addressLocality: 'Dallas', addressRegion: 'TX', postalCode: '75208', addressCountry: 'US' };

function org() {
  const sameAs = Object.values(D.social).filter(Boolean);
  return {
    '@type': ['NGO', 'SportsOrganization'],
    '@id': ORG,
    name: 'Dash for the Beads',
    alternateName: 'Good Space Dash for the Beads',
    url: SITE_URL + '/',
    logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
    image: abs('/assets/og/home.jpg'),
    description: 'Dash for the Beads is a 501(c)(3) non-profit in Oak Cliff, Dallas that hosts an annual Mardi Gras 5K, 1-mile fun run, and family festival. Net proceeds fund grants for Oak Cliff schools and youth non-profits in physical fitness, healthy eating, and the arts.',
    email: D.email,
    foundingDate: String(D.founded),
    founder: [{ '@type': 'Person', name: 'Chad West' }, { '@type': 'Person', name: 'David Sassano' }],
    nonprofitStatus: 'https://schema.org/Nonprofit501c3',
    ...(D.ein ? { taxID: D.ein } : {}),
    sport: 'Running',
    address,
    areaServed: { '@type': 'Place', name: 'Oak Cliff, Dallas, Texas' },
    knowsAbout: ['5K race', 'Fun run', 'Mardi Gras', 'Oak Cliff', 'Youth grants', 'Physical fitness', 'Healthy eating', 'Youth arts'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: D.email, areaServed: 'US', availableLanguage: 'English' },
    ...(sameAs.length ? { sameAs } : {})
  };
}

function event() {
  // Only emitted once the date is confirmed and visible on the page, per Google's event guidelines.
  if (!D.dateConfirmed) return null;
  const v = D.venue;
  return {
    '@type': 'SportsEvent',
    '@id': SITE_URL + '/#event-' + D.raceDateISO.slice(0, 4),
    name: `${D.edition}th Annual Good Space Dash for the Beads`,
    description: 'A chip-timed Mardi Gras 5K, 1-mile fun run, and family festival on Davis Street in Oak Cliff, held right before the Go Oak Cliff Mardi Gras Parade. Net proceeds fund grants for Oak Cliff kids.',
    sport: 'Running',
    startDate: D.raceDateISO + 'T10:30:00-06:00',
    endDate: D.raceDateISO + 'T13:00:00-06:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: v.name, address: { ...address, streetAddress: v.street } },
    image: [abs('/assets/og/home.jpg'), abs('/assets/og/race.jpg')],
    organizer: { '@id': ORG },
    offers: { '@type': 'Offer', url: D.runsignup, availability: D.registrationOpen ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder', validFrom: D.raceDateISO.slice(0, 4) - 1 + '-11-01' },
    subEvent: [
      { '@type': 'SportsEvent', name: 'Dash for the Beads 1-Mile Fun Run', startDate: D.raceDateISO + 'T10:30:00-06:00', location: v.name },
      { '@type': 'SportsEvent', name: 'Dash for the Beads 5K', startDate: D.raceDateISO + 'T11:00:00-06:00', location: v.name }
    ]
  };
}

function faqPage(key, url) {
  const items = FAQS[key].filter((i) => !i.pending && i.a);
  return {
    '@type': 'FAQPage',
    '@id': url + '#faq',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }))
  };
}

function offerCatalog() {
  return {
    '@type': 'OfferCatalog',
    '@id': SITE_URL + '/get-involved/sponsor/#levels',
    name: 'Dash for the Beads sponsorship levels',
    itemListElement: D.tiers.filter((t) => /^\$[\d,]+$/.test(t.price)).map((t) => ({
      '@type': 'Offer',
      name: t.name,
      url: abs(D.pages.tier(t.slug)),
      price: t.price.replace(/[$,]/g, ''),
      priceCurrency: 'USD',
      availability: t.status === 'claimed' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      description: t.benefits.join('; '),
      seller: { '@id': ORG }
    }))
  };
}

export function buildSchema(route) {
  const url = abs(route.path);
  const graph = [
    org(),
    { '@type': 'WebSite', '@id': SITE, url: SITE_URL + '/', name: 'Dash for the Beads', publisher: { '@id': ORG }, inLanguage: 'en-US' },
    {
      '@type': route.type,
      '@id': url + '#webpage',
      url,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': SITE },
      about: { '@id': ORG },
      inLanguage: 'en-US',
      primaryImageOfPage: { '@type': 'ImageObject', url: abs('/assets/og/' + route.og + '.jpg'), width: 1200, height: 630 },
      ...(route.crumbs ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}),
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.facts__list', '.lead'] }
    }
  ];
  if (route.crumbs) {
    graph.push({
      '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
      itemListElement: route.crumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) }))
    });
  }
  const ev = route.event && event();
  if (ev) graph.push(ev);
  if (route.faq && route.page !== 'home') graph.push(faqPage(route.faq, url));
  if (route.offers) graph.push(offerCatalog());
  return { '@context': 'https://schema.org', '@graph': graph };
}
