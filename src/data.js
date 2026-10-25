// Single source of truth for site content. Items marked CONFIRM are shown only in review builds (npm run build:review).
export const SITE_URL = 'https://dashforthebeads.org';

const D = {
  registrationOpen: false,
  // dateConfirmed drives the hero, schedule, quick facts, and SportsEvent schema. Confirmed by the committee Oct 2026.
  dateConfirmed: true,
  raceDate: 'Sunday, February 7, 2027',
  raceDateLong: 'Sunday, February 7, 2027', // Sunday before Mardi Gras, back to back with the Go Oak Cliff parade
  raceDateISO: '2027-02-07',
  raceDatePlaceholder: 'CONFIRM: 2027 start times (2026 schedule shown)',
  edition: 18,
  year: 2026, // footer copyright
  founded: 2009,
  email: 'info@dashforthebeads.org',
  emailSubscribers: '3,500+', // RunSignup mailing list size, used in sponsor reach copy
  // How sponsors and Friends of the Dash pay. Paste the Zeffy (or PayPal) payment page URL to show a "Pay online" button.
  payment: { methods: 'PayPal, Zelle, or check', zeffy: '', paypal: '' },
  runsignup: 'https://runsignup.com/Race/TX/Dallas/DashfortheBeads',
  // Google Apps Script web app URL (ends in /exec) that saves every form to the forms Google Sheet.
  // Setup: google-apps-script/README.md. When empty, forms open a prefilled email to the committee instead.
  formEndpoint: '',
  // Social profiles: '' hides the icon and drops it from schema sameAs.
  social: { instagram: '', facebook: '', youtube: '' },
  youtubeId: '',
  gaId: 'G-WRRWV4NPPZ', // Google Analytics 4 (gtag.js). Consent Mode: no analytics cookies until the visitor accepts.
  gtmId: '', // Optional Google Tag Manager container (e.g. for a Meta pixel). Loads only after cookie consent.
  ein: '',
  venue: {
    name: 'W Davis St and N Clinton Ave',
    street: 'W Davis St and N Clinton Ave',
    locality: 'Dallas', region: 'TX', postal: '75208', country: 'US',
    neighborhood: 'Oak Cliff',
    maps: 'https://maps.google.com/?q=W+Davis+St+and+N+Clinton+Ave,+Dallas,+TX+75208'
  },
  schedule: [
    { time: '9:30am', title: 'Registration, packet pickup, bar open' },
    { time: '10:00am', title: 'DJ starts' },
    { time: '10:30am', title: 'Fun Run / 1 mile', detail: 'Held before the 5K so parents can do both.' },
    { time: '11:00am', title: 'Dash for the Beads 5K', detail: 'Chip-timed. Starts on Davis Street.', highlight: true },
    { time: '12:45pm', title: 'Awards announced', detail: 'Top three male and female in each age group.' },
    { time: '1:00pm', title: 'Oak Cliff Mardi Gras Parade', detail: 'DJ ends.' }
  ],
  ageGroups: ['12 and under', '13 to 19', '20 to 29', '30 to 39', '40 to 49', '50 to 59', '60 to 69', '70 to 79', '80+'],
  photos: {
    start: { src: '/assets/photos/runners-start-line.webp', w: 690, h: 315, alt: 'Runners in purple Dash for the Beads shirts, tutus, and beads laughing as they cross the start line' },
    crew: { src: '/assets/photos/costume-crew.webp', w: 1424, h: 1282, alt: 'Five runners in jester hats, tutus, and feather boas' },
    feather: { src: '/assets/photos/feather-mask-runner.webp', w: 480, h: 640, alt: 'Runner in a purple feather mask holding a Dash cup' },
    dance: { src: '/assets/photos/dance-team.webp', w: 600, h: 400, alt: 'Dance team performing on the parade route' },
    laugh: { src: '/assets/photos/finish-laughing.webp', w: 600, h: 400, alt: 'Two runners laughing in feathered masks' },
    medal: { src: '/assets/photos/finishers-medal.webp', w: 600, h: 400, alt: 'Three friends with beads and a finisher medal' },
    masks: { src: '/assets/photos/parade-masks.webp', w: 640, h: 330, alt: 'Parade-goers in masks and jester hats pointing' },
    corral: { src: '/assets/photos/crowd-corral.webp', w: 678, h: 452, alt: 'Hundreds of runners in hats and race bibs packed into the start corral, a Dallas Fire Rescue ambulance behind them' },
    volunteers: { src: '/assets/photos/volunteers-tent.webp', w: 600, h: 400, alt: 'Four smiling volunteers in gray Dash for the Beads shirts outside the event tent' },
    beads: { src: '/assets/photos/bead-throw.webp', w: 1200, h: 849, alt: 'Masked reveler in a purple, green, and gold satin costume throwing strands of beads' },
    gold: { src: '/assets/photos/gold-shirts-legacy.webp', w: 1024, h: 725, alt: 'Friends in gold Dash shirts, paper crowns, and jester wands cheering along the course' }
  },
  impact: [
    { prefix: '$', value: 450000, suffix: '+', label: 'Donations awarded', note: 'Since 2010' },
    { value: 34, label: 'Organizations funded', note: 'Since 2014' },
    { prefix: '$', value: 27000, label: 'In free entries', note: 'To approx. 675 DISD kids over 3 years' },
    { value: 1000, suffix: '+', label: 'Runners', note: 'Approx. per year' }
  ],
  impactConfirm: 'CONFIRM: organizations funded since 2010 (34 is the 2014+ count)',
  tiers: [
    { slug: 'presenting', name: 'Presenting Sponsor', price: '$TBD', status: 'claimed', claimedBy: 'Good Space', benefits: ['Event naming rights', 'Your logo on all Dash promotions and signage', 'Prominent signage facing parade', 'Private party area for parade', 'Private party area in tent/venue', 'Premier vendor spot in tent/venue', '25 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'community-hero', name: 'Community Hero', price: '$TBD', status: 'claimed', claimedBy: 'Methodist Dallas & Methodist Health', benefits: ['Prominent signage facing parade', 'Premier vendor spot in tent/venue', 'Preferred bleacher seating for four', '15 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'race-medal-awards', name: 'Race Medal & Awards Sponsor', price: '$7,500', featured: true, benefits: ['Your logo on all distributed race medals', 'Your logo on all qualifying awards', 'Vendor spot in festival', 'Preferred bleacher seating for four', '10 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'mimosa-bar-cup', name: 'Mimosa Bar & Cup Sponsor', price: '$7,500', benefits: ['Your logo on the banner at the Mimosa Bar', 'Your logo on all distributed Dash Cups', 'Vendor spot in festival', 'Preferred bleacher seating for four', '10 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'race-bibs', name: 'Race Bibs Sponsor', price: '$5,000', benefits: ['Your logo on all Dash race bibs for the 5K', 'Vendor spot in festival', 'Preferred bleacher seating for two', '8 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'bag', name: 'Bag Sponsor', price: '$5,000', benefits: ['Your logo on all packet bags distributed to runners', 'Vendor spot in festival', 'Preferred bleacher seating for two', '8 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'beads', name: 'Beads Sponsor', price: '$5,000', benefits: ['Your logo on all Mardi Gras beads distributed', 'Vendor spot in festival', 'Preferred bleacher seating for two', '8 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'packet-pickup', name: 'Packet Pickup Sponsor', price: '$2,500', benefits: ['We send our runners to your business to pick up their Dash packets', 'Vendor spot in festival', 'Preferred bleacher seating for two', '4 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'king-of-the-hill', name: 'King of the Hill Sponsor', price: '$2,500', benefits: ['Your logo on special signage at the King of the Hill location and award', 'Vendor spot in festival', 'Preferred bleacher seating for two', '4 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'race-start', name: 'Race Start Sponsor', price: '$TBD', status: 'claimed', claimedBy: 'Jan Pruitt Family', benefits: ['Your logo on signage at the start and end of the race', 'Vendor spot in festival', 'Preferred bleacher seating for two', '4 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'gold', name: 'Gold Sponsor', price: '$1,500', benefits: ['Preferred bleacher seating for two', '4 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'silver', name: 'Silver Sponsor', price: '$1,000', benefits: ['Preferred bleacher seating for two', '2 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'bronze', name: 'Bronze Sponsor', price: '$750', benefits: ['4 race entries (5K or 1 mile)', 'Your name or logo on the Dash tee shirt', 'Social media and website recognition', 'One item in the packet pickup bag given to all runners'] },
    { slug: 'friends-of-the-dash', name: 'Friends of the Dash', price: '$250', benefits: ['2 race entries (5K or 1 mile)', 'Website recognition'] }
  ],
  wall: [
    { name: 'Presenting Sponsor', size: 'presenting', sponsors: [{ name: 'Good Space', logo: '/assets/sponsors/good-space.webp' }] },
    { name: 'Community Hero', size: 'hero', sponsors: [{ name: 'Methodist Health System', logo: '/assets/sponsors/methodist-health-system.webp' }] },
    { name: 'Cup Sponsor', size: 'gold', sponsors: [{ name: 'Dallas Youth Sports', logo: '/assets/sponsors/dallas-youth-sports.webp' }] },
    { name: 'Race Bib Sponsor', size: 'gold', sponsors: [{ name: 'Republic Title, Turtle Creek', logo: '/assets/sponsors/republic-title.webp' }] },
    { name: 'Packet Pickup Sponsor', size: 'gold', sponsors: [{ name: 'Oak Cliff Brewing Co.', logo: '/assets/sponsors/oak-cliff-brewing.webp' }] },
    { name: 'Race Start Sponsor', size: 'gold', sponsors: [{ name: 'Jan Pruitt Family', logo: '/assets/sponsors/jan-pruitt-family.webp' }] },
    { name: 'Gold Level', size: 'gold', sponsors: [{ name: 'The Kessler', logo: '/assets/sponsors/the-kessler.webp' }] },
    { name: 'Silver Level', size: 'silver', sponsors: [{ name: 'Schinkel Properties', logo: '/assets/sponsors/schinkel-properties.webp' }, { name: 'Blue Star Dumpsters', logo: '/assets/sponsors/blue-star-dumpsters.webp' }] },
    { name: 'Bronze Level', size: 'silver', sponsors: [{ name: 'TLM' }, { name: 'Rafael Anchía' }, { name: 'Gasper Law', logo: '/assets/sponsors/gasper-law.webp' }, { name: 'Bronze sponsor (s4)', placeholder: true }] },
    { name: 'Friend of the Dash', size: 'silver', sponsors: [{ name: 'QualiGraphics', logo: '/assets/sponsors/qualigraphics.webp' }] }
  ],
  committeeYear: 2027,
  committee: [
    { role: 'Dash Chair', name: 'Angelica Dennet' },
    { role: 'Event Chair', name: 'Krystal Huerta' },
    { role: 'Race Route / Festival Leader', name: 'Jacob Huerta' },
    { role: 'Community Liaison', name: 'Benny Guzman' },
    { role: 'Sponsorships', name: 'Claudia Huerta' },
    { role: 'Founder', name: 'Chad West' },
    { role: 'Legacy Member', name: 'Vicky Gouge' },
    { role: 'Legacy Members', name: 'Becky and Chris Moffet' }
  ]
};

D.reg = (loc) => D.runsignup + '?utm_source=website&utm_medium=button&utm_campaign=dfb2027&utm_content=' + encodeURIComponent(loc);
D.pages = {
  home: '/', race: '/the-race/', about: '/about/', involved: '/get-involved/', sponsor: '/get-involved/sponsor/',
  sponsors: '/sponsors/', grants: '/grants/', contact: '/contact/', tier: (slug) => '/sponsor/' + slug + '/'
};

export default D;
