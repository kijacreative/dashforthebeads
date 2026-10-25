// Question-and-answer content. Plain strings so the same text renders on the page and in FAQPage schema.
// `confirm` notes show only in review builds. `pending: true` hides the whole item until the answer is confirmed.
import D from './data.js';

export const RACE_FAQ = [
  { q: 'When is the 2027 Dash for the Beads?', a: D.dateConfirmed ? `${D.raceDateLong}. The Dash is always the Sunday before Mardi Gras, right before the Go Oak Cliff Mardi Gras Parade.` : 'The Dash is held each year on the Sunday before Mardi Gras, right before the Go Oak Cliff Mardi Gras Parade. The 2027 date will be announced soon. Sign up for race updates to hear first.' },
  { q: 'Where is the event located?', a: 'The festival, start, and finish are at the intersection of W Davis St and N Clinton Ave, by the Kessler Theater, in the Oak Cliff neighborhood of Dallas, TX 75208.' },
  { q: 'What races are there?', a: 'Two: a chip-timed 5K that winds through Kessler Park, and a 1-mile Fun Run for kids and families. The Fun Run starts at 10:30am, before the 5K at 11am, so parents can do both.' },
  { q: 'Do I have to run a race to come out to the Dash for the Beads?', a: 'No, you do not. Several of our committee members only run if they are being chased. Cheer on your runners from a distance, then stay for the Go Oak Cliff Mardi Gras Parade and enjoy the great costumes.' },
  { q: 'Is the Dash for the Beads family friendly?', a: 'Yes, it is. We encourage parents to bring their kids into the 5K and to join the 1-mile Fun Run, which starts first so you can do both. The festival has a Kid Zone too.' },
  { q: 'Where do I park?', a: 'Davis Street closes for the race and parade, so plan to arrive early and walk a few blocks.', confirm: 'CONFIRM: recommended parking areas and any shuttle' },
  { q: 'Can I bring a stroller?', a: 'Strollers are welcome on the 1-mile Fun Run.', confirm: 'CONFIRM: stroller policy for the 5K (and whether joggers must start at the back)' },
  { q: 'Can I bring my dog?', a: '', pending: true, confirm: 'CONFIRM: dog policy for the course and the festival' },
  { q: 'Are costumes allowed?', a: 'Allowed? Encouraged. Beads, masks, tutus, and jester hats are standard race wear. Just make sure you can run in it and your bib stays visible on the front.', confirm: 'CONFIRM: costume contest in 2027 and prizes' },
  { q: 'Can I get a refund or transfer my entry?', a: '', pending: true, confirm: 'CONFIRM: refund, transfer, and deferral policy (matches RunSignup settings)' },
  { q: 'When and where is packet pickup?', a: 'Early packet pickup is the Saturday before the race, 11am to 3pm, at Oak Cliff Brewing Co, 1300 S Polk St, Dallas, TX 75224. You can also pick up on race day at the Dash registration area starting at 9:30am.', confirm: 'CONFIRM: 2027 early pickup date, time, and location' },
  { q: 'Are there awards?', a: 'Yes. Medals go to the top three male and female 5K finishers in each of nine age groups, announced at 12:45pm. The fastest climber up Edgefield Ave takes the King of the Hill award.' },
  { q: 'Where does the money go?', a: 'Dash for the Beads is a 501(c)(3) non-profit. Net proceeds fund grants for Oak Cliff schools and youth non-profits in physical fitness, healthy eating, and the arts. Since 2010 the Dash has awarded more than $450,000 to Oak Cliff schools and youth organizations.' }
];

export const GRANTS_FAQ = [
  { q: 'Who can apply for a Dash for the Beads grant?', a: 'Registered 501(c)(3) organizations whose programs serve youth in the Oak Cliff area of Dallas. Schools apply through a PTA or similar parent-led group that supports the school.' },
  { q: 'What kinds of programs are funded?', a: 'Youth athletics, health, and fitness; healthy eating; and youth arts and music.' },
  { q: 'What do I need to submit?', a: 'A completed grant proposal form, a 1 to 2 page narrative describing your program, and a program budget that itemizes the program expenses.' },
  { q: 'How are grant proposals scored?', a: 'On demonstration of need, overall impact, impact on Oak Cliff youth, clarity of purpose, alignment with the Dash mission, and participation or volunteer support at the Dash. Programs do not have to meet every criterion.' },
  { q: 'When can I apply for a grant?', a: 'Applications open April 1 and close July 31 each year.' },
  { q: 'How much is a grant?', a: 'The Dash board sets the number and size of grants each year based on race revenue.', confirm: 'CONFIRM: 2027 max award (2016 was $1,000)' }
];

export const SPONSOR_FAQ = [
  { q: 'How much does it cost to sponsor Dash for the Beads?', a: 'Business sponsorships start at $750 (Bronze) and go up to $7,500 for the Race Medal & Awards and Mimosa Bar & Cup levels. Families and individuals can become a Friend of the Dash for $250 a year.' },
  { q: 'How do I pay for a sponsorship?', a: `By ${D.payment.methods}. After you claim a level or request the deck, we email payment details.` },
  { q: 'How many people does a sponsorship reach?', a: `About 1,000 runners and their families, thousands of spectators at the Go Oak Cliff Mardi Gras Parade, which follows the race on Davis Street, and a mailing list of ${D.emailSubscribers} subscribers.` },
  { q: 'When are sponsor logos due?', a: 'Logos and names are due by December 31 for printed material and by January 15 for T-shirt printing. Send vector logos (SVG, EPS, or PDF) to info@dashforthebeads.org.', confirm: 'CONFIRM: 2027 production deadlines' },
  { q: 'Is my sponsorship tax deductible?', a: 'Dash for the Beads is a 501(c)(3) non-profit. Ask your tax advisor how the benefits you receive affect the deductible amount.' }
];

// Short, factual answers for the "at a glance" strip. Written so a search or answer engine can lift them verbatim.
export const QUICK_FACTS = [
  { k: 'What', v: 'A Mardi Gras 5K, 1-mile fun run, and family festival' },
  { k: 'When', v: D.dateConfirmed ? D.raceDateLong : 'Sunday before Mardi Gras. 2027 date coming soon' },
  { k: 'Where', v: 'W Davis St and N Clinton Ave, Oak Cliff, Dallas' },
  { k: 'Start times', v: 'Fun Run 10:30am, 5K 11am, parade 1pm' },
  { k: 'Benefits', v: 'Grants for Oak Cliff schools and youth non-profits' }
];
