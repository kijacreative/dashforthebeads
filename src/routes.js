// Every prerendered URL with its SEO metadata. Titles stay under ~60 chars, descriptions under ~160.
import D from './data.js';

const P = D.pages;
const crumbs = (...c) => [['Home', '/'], ...c];

export const ROUTES = [
  {
    path: P.home, page: 'home', og: 'home', type: 'WebPage',
    title: 'Dash for the Beads | Mardi Gras 5K and Fun Run in Oak Cliff, Dallas',
    description: `The ${D.edition}th annual Dash for the Beads: a Mardi Gras 5K, 1-mile fun run, and family festival on Davis Street in Oak Cliff, Dallas. Proceeds fund grants for Oak Cliff kids.`,
    event: true, preload: D.photos.start.src
  },
  {
    path: P.race, page: 'race', og: 'race', type: 'WebPage',
    title: 'The Race: Schedule, Routes, Packet Pickup and FAQ | Dash for the Beads',
    description: 'Race-day schedule, packet pickup, start and finish, 5K and 1-mile routes, King of the Hill, awards, and FAQ for the Dash for the Beads in Oak Cliff, Dallas.',
    crumbs: crumbs(['The Race', P.race]), event: true, faq: 'race'
  },
  {
    path: P.about, page: 'about', og: 'about', type: 'AboutPage',
    title: 'About Us | Dash for the Beads, an Oak Cliff 501(c)(3)',
    description: 'Dash for the Beads is an Oak Cliff 501(c)(3) founded in 2009 by Chad West and David Sassano. Our mission, impact, and the committee behind the race.',
    crumbs: crumbs(['About', P.about])
  },
  {
    path: P.involved, page: 'involved', og: 'involved', type: 'WebPage',
    title: 'Get Involved: Sponsor, Friends, Vendors, Volunteer | Dash for the Beads',
    description: 'Sponsor the Dash, become a Friend of the Dash for $250 a year, bring a booth or food truck, or volunteer on race weekend in Oak Cliff.',
    crumbs: crumbs(['Get Involved', P.involved])
  },
  {
    path: P.sponsor, page: 'sponsor', og: 'sponsor', type: 'WebPage',
    title: 'Become a Sponsor | Good Space Dash for the Beads',
    description: 'Sponsor the Good Space Dash for the Beads. Reach about 1,000 runners and thousands of Mardi Gras parade-goers in Oak Cliff. Levels from $750.',
    crumbs: crumbs(['Get Involved', P.involved], ['Become a Sponsor', P.sponsor]), faq: 'sponsor', offers: true
  },
  {
    path: P.sponsors, page: 'sponsors', og: 'sponsors', type: 'WebPage',
    title: 'Our Sponsors | Dash for the Beads',
    description: 'Thank you to the sponsors and Friends of the Dash who make the Dash for the Beads Mardi Gras 5K in Oak Cliff possible.',
    crumbs: crumbs(['Sponsors', P.sponsors])
  },
  {
    path: P.grants, page: 'grants', og: 'grants', type: 'WebPage',
    title: 'Grants for Oak Cliff Schools and Youth Non-profits | Dash for the Beads',
    description: 'How Dash for the Beads grants work: who can apply, what to submit, how proposals are scored, and past recipients. For Oak Cliff schools and youth non-profits.',
    crumbs: crumbs(['Grants', P.grants]), faq: 'grants'
  },
  {
    path: P.contact, page: 'contact', og: 'contact', type: 'ContactPage',
    title: 'Contact Us | Dash for the Beads',
    description: 'Questions about the race, sponsorships, vendors, volunteering, or grants? Contact the Dash for the Beads committee at info@dashforthebeads.org.',
    crumbs: crumbs(['Contact', P.contact])
  },
  ...D.tiers.map((t) => {
    const claimed = t.status === 'claimed';
    return {
      path: P.tier(t.slug), page: 'tier', props: { slug: t.slug }, og: 'tier', type: 'WebPage', tier: t,
      title: `${t.name.replace(/ Sponsor$/, '')} Sponsorship | Good Space Dash for the Beads`,
      description: claimed
        ? `The ${t.name} level of the Good Space Dash for the Beads is claimed${t.claimedBy ? ' by ' + t.claimedBy : ''}. See sponsorship levels still open.`
        : `${t.name}, ${t.price}: ${t.benefits[0]}. Sponsor the Dash for the Beads Mardi Gras 5K in Oak Cliff, Dallas.`,
      crumbs: crumbs(['Get Involved', P.involved], ['Become a Sponsor', P.sponsor], [t.name, P.tier(t.slug)])
    };
  })
];
