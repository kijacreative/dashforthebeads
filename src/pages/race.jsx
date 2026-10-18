import React from 'react';
import { DS, D, P, Layout, Section, Eyebrow, H2, H3, Lead, Body, Grid, Stack, Row, Card, Ph, Pending, PhotoSlot, RegisterButton, PrimaryCTA, Updates, Faq } from '../shared.jsx';
import { RACE_FAQ, QUICK_FACTS } from '../content.js';

export default function Race() {
  const { PageBanner, Button, Icon, Schedule } = DS;
  const ph = D.photos;
  const Info = ({ icon, t, children }) => (<div className="info"><Icon name={icon} size={24} color="var(--purple-500)" /><div><div className="info__t">{t}</div><div className="info__d">{children}</div></div></div>);
  const Route = ({ t, d, slot, photo }) => (
    <Card>
      <PhotoSlot desc={slot} ratio="4/3" fallback={photo} />
      <H3>{t}</H3><Body>{d}</Body>
      <Pending><Row gap={8}><Button variant="outline" size="sm" icon="map-pin" href="#">Route link</Button><Ph>CONFIRM: RunSignup or Strava route URL</Ph></Row></Pending>
    </Card>
  );
  return (
    <Layout active="race">
      <PageBanner eyebrow={D.edition + 'th annual · ' + (D.dateConfirmed ? D.raceDateLong : D.raceDate)} title="The Race">
        <span>Schedule, packet pickup, routes, awards, and answers to every race-day question.</span>
        <Row><PrimaryCTA loc="race-banner" /></Row>
      </PageBanner>

      <section className="facts facts--light" aria-labelledby="facts-h">
        <div className="facts__in">
          <h2 id="facts-h" className="sr-only">Race at a glance</h2>
          <dl className="facts__list">{QUICK_FACTS.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}</dl>
        </div>
      </section>

      <Section label="Overview">
        <Grid min={320} gap={48}>
          <Stack gap={20}>
            <H2>A Mardi Gras 5K, fun run, and festival</H2>
            <Lead>Dash for the Beads is an annual chip-timed 5K run, 1-mile walk, and family festival that coincides with Mardi Gras. All net proceeds support Oak Cliff organizations that promote physical fitness, healthy eating, and arts programs.</Lead>
            <Body>Each year we join forces with the <strong>Go Oak Cliff Mardi Gras Parade</strong>, and both events are held back-to-back on Davis Street. After the run, join us for one of the best Mardi Gras parties in North Texas. Along with our fantastic Kid Zone, we have music, food trucks, and adult beverages, including fresh mimosas and craft beer. After a little partying, our prime location on Davis Street guarantees you the best view of the parade.</Body>
            <Body>Our 5K course is beautiful and challenging. The race begins on Davis near the festival and winds through Kessler Park before heading back to the festival grounds on Davis. Our 1-mile walk is perfect for the little ones to get in on the action. It's held before the 5K so parents can do both.</Body>
            <div>
              <p className="accent">Laissez les bons temps rouler!</p>
              <Body>Let the good times roll.</Body>
            </div>
            <div><RegisterButton loc="race-intro" /></div>
          </Stack>
          <div id="schedule" className="anchor">
            <Schedule title="Race day" date={D.dateConfirmed ? D.raceDateLong : D.raceDate} items={D.schedule} />
            <p style={{ margin: '12px 0 0' }}><Ph>CONFIRM: 2027 date and times (2026 schedule shown)</Ph></p>
          </div>
        </Grid>
      </Section>

      <Section bg="var(--bg-surface)" label="Packet pickup and start">
        <Grid min={300} gap={40}>
          <Stack gap={20}>
            <H2>Packet pickup</H2>
            <Info icon="calendar" t="Early packet pickup">Saturday before the race, 11am to 3pm. Oak Cliff Brewing Co, <a href="https://maps.google.com/?q=1300+S+Polk+St+Dallas+TX+75224" rel="noopener">1300 S Polk St, Dallas, TX 75224</a>. <Ph>CONFIRM: 2027 date, hours, and location</Ph></Info>
            <Info icon="clock" t="Race day">Pick up your packet at the Dash registration area when it opens at 9:30am. <Ph>CONFIRM: race-day pickup location</Ph></Info>
          </Stack>
          <Stack gap={20}>
            <H2>Start and finish</H2>
            <Info icon="map-pin" t="Race start">The Kessler Theater area on W Davis St, at the corner of Clinton Ave. <Ph>CONFIRM: exact start address (1230 W Davis St vs. 607 N. Clinton)</Ph></Info>
            <Info icon="party-flags" t="Finish">Back at the festival grounds on Davis Street, steps from the parade route.</Info>
          </Stack>
        </Grid>
      </Section>

      <Section id="routes" label="Routes">
        <div><Eyebrow>Course maps</Eyebrow><H2>Routes</H2></div>
        <Lead>Routes can change from year to year as we work to keep the race convenient for patrons, business owners, and Oak Cliff residents. Check here before race day.</Lead>
        <Grid min={300} gap={24}>
          <Route t="5K" d="Davis Street through Kessler Park and back, with the King of the Hill climb just past halfway." slot="5K route map image" photo={ph.corral} />
          <Route t="1 mile fun run" d="A short, flat loop near the festival. Starts at 10:30am, before the 5K." slot="1-mile Fun Run route map image" photo={ph.laugh} />
        </Grid>
      </Section>

      <Section bg="var(--bg-sunken)" label="King of the Hill and awards">
        <Grid min={320} gap={48}>
          <Stack gap={16}>
            <Eyebrow>Just past halfway</Eyebrow>
            <H2>King of the Hill</H2>
            <Lead>As the 5K turns back south on Edgefield Ave from Kessler Parkway, you hit a quarter-mile climb to Colorado Blvd. Make it to the top faster than anyone else and get crowned King of the Hill.</Lead>
            <Pending><Row gap={8}><Button variant="outline" size="sm" icon="map-pin" href="#">King of the Hill segment</Button><Ph>CONFIRM: segment route URL</Ph></Row></Pending>
            <PhotoSlot desc="runners climbing Edgefield Ave, or the King of the Hill award" ratio="16/9" fallback={ph.medal} />
          </Stack>
          <Stack gap={16}>
            <Eyebrow>Awards</Eyebrow>
            <H2>Medals and trophies</H2>
            <Body>The 5K is chip-timed. Medals go to the top three male and female finishers in each of nine age groups, announced at 12:45pm.</Body>
            <ul className="chips">{D.ageGroups.map((a) => <li key={a}>{a}</li>)}</ul>
            <Body>The fastest climber on Edgefield takes the King of the Hill award.</Body>
            <Ph>CONFIRM: 2027 age groups and award list</Ph>
          </Stack>
        </Grid>
      </Section>

      <Section id="faq" narrow label="FAQ">
        <div><Eyebrow>Race-day questions</Eyebrow><H2>FAQ</H2></div>
        <Faq items={RACE_FAQ} />
        <Body>Still have a question? <a href={P.contact + '?type=race'}>Ask the committee</a>.</Body>
      </Section>

      <Section narrow style={{ paddingTop: 0 }} label="Race updates"><Updates /></Section>
    </Layout>
  );
}
