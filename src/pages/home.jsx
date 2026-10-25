import React from 'react';
import { DS, D, P, Layout, Section, Eyebrow, H2, H3, Lead, Body, Grid, Stack, Row, Card, Ph, Img, PrimaryCTA, Updates, wallTiers } from '../shared.jsx';
import { QUICK_FACTS } from '../content.js';

function Hero() {
  const { Button } = DS;
  const ph = D.photos.start;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img className="hero__img" src={ph.src} alt="" width={ph.w} height={ph.h} fetchpriority="high" decoding="async" />
      <div className="hero__in">
        <div className="hero__copy">
          <div className="eyebrow" style={{ color: 'var(--gold-400)' }}>{D.edition}th annual · Oak Cliff, Dallas</div>
          <h1 id="hero-title" className="hero__title">Dash for the Beads <span>Mardi Gras 5K &amp; Fun Run</span></h1>
          <p className="hero__lead">A Mardi Gras 5K, 1-mile fun run, and family festival on Davis Street, right before the Go Oak Cliff Mardi Gras Parade. Every dollar left over goes to grants for Oak Cliff kids.</p>
          <Row><PrimaryCTA loc="home-hero" /><Button variant="on-dark" size="lg" href={P.sponsor}>Become a Sponsor</Button></Row>
        </div>
        <div className="datecard" aria-label="Race date">
          <div className="datecard__k">Race day {D.year + 1}</div>
          <div className="datecard__v">{D.dateConfirmed ? D.raceDateLong : 'Date announced soon'}</div>
          <div className="datecard__s">{D.dateConfirmed ? 'Fun Run 10:30am · 5K 11am' : 'Always the Sunday before Mardi Gras'}</div>
          <Ph>{D.raceDatePlaceholder}</Ph>
        </div>
      </div>
      <DS.BeadDivider size="lg" />
    </section>
  );
}

export default function Home() {
  const { Button, Icon, StatCounter, VideoEmbed, Testimonial, BeadDivider } = DS;
  const ph = D.photos;
  const ways = [
    { icon: 'sprint', t: '5K', d: 'Chip-timed. Starts on Davis Street near the festival and winds through Kessler Park, with a King of the Hill climb on Edgefield Ave. Medals for the top three male and female runners in nine age groups.', c: 'var(--purple-500)' },
    { icon: 'balloons', t: '1 mile fun run', d: 'Perfect for the little ones. It starts before the 5K so parents can do both.', c: 'var(--green-600)' },
    { icon: 'party-popper', t: 'Festival', d: 'Music, food trucks, a Kid Zone, fresh mimosas and craft beer, then the best view of the Go Oak Cliff Mardi Gras Parade.', c: 'var(--ink-900)' }
  ];
  return (
    <Layout active="home">
      <Hero />

      <section className="facts" aria-labelledby="facts-h">
        <div className="facts__in">
          <h2 id="facts-h" className="sr-only">Dash for the Beads at a glance</h2>
          <dl className="facts__list">
            {QUICK_FACTS.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
          </dl>
        </div>
      </section>

      <Section label="Do the Dash">
        <div><Eyebrow>Do the Dash</Eyebrow><H2>Run it, walk it, or just come for the parade</H2></div>
        <Grid min={260}>{ways.map((w) => (
          <Card key={w.t} className="card--lift"><Icon name={w.icon} size={44} color={w.c} /><H3 color={w.c}>{w.t}</H3><Body>{w.d}</Body></Card>))}</Grid>
        <div><Button variant="secondary" iconRight="arrow-right" href={P.race}>Race details and routes</Button></div>
      </Section>

      <Section bg="var(--bg-brand)" label="Impact" className="sec--confetti">
        <div><Eyebrow color="var(--gold-400)">How your participation has helped</Eyebrow><H2 color="#fff">Every registration funds Oak Cliff kids</H2></div>
        <Grid min={200} gap={32}>{D.impact.map((s) => <StatCounter key={s.label} tone="dark" {...s} />)}</Grid>
        <div><Ph>{D.impactConfirm}</Ph></div>
      </Section>

      <Section label="Sponsor">
        <Grid min={320} gap={48} style={{ alignItems: 'center' }}>
          <Img p={ph.crew} ratio="5/4" />
          <Stack gap={20}>
            <div><Eyebrow>Become a Sponsor</Eyebrow><H2>Put your business in front of thousands of neighbors</H2></div>
            <Lead>The Good Space Dash for the Beads runs back-to-back with the Go Oak Cliff Mardi Gras Parade. That means about 1,000 runners and thousands of parade-goers on Davis Street, and your logo on the bibs, medals, cups, and beads they take home.</Lead>
            <Body>Sponsorships start at $750. Logos are due for print by December 31.</Body>
            <Row><Button href={P.sponsor} iconRight="arrow-right">See sponsor levels</Button><Button variant="outline" href={P.sponsor + '#deck'}>Request the deck</Button></Row>
          </Stack>
        </Grid>
      </Section>

      <Section bg="var(--bg-sunken)" label="Friends of the Dash">
        <Grid min={320} gap={40} style={{ alignItems: 'center' }}>
          <Stack gap={16}>
            <Eyebrow>Friends of the Dash</Eyebrow>
            <H2>Not a business? Be a Friend.</H2>
            <Lead>For $250 a year, families and individuals get 2 race entries (5K or 1 mile) and their name on our website. It's the easiest way to back the Dash and the kids it funds.</Lead>
            <div><Button variant="secondary" href={P.involved + '#friends'}>Become a Friend</Button></div>
          </Stack>
          <Img p={ph.gold} ratio="4/3" />
        </Grid>
      </Section>

      <Section label="Runners say">
        <Grid min={320} gap={40} style={{ alignItems: 'center' }}>
          {D.youtubeId
            ? <VideoEmbed youtubeId={D.youtubeId} title="Dash for the Beads Fun Run" poster={ph.corral.src} />
            : <Stack gap={8}><Img p={ph.corral} ratio="16/9" /><Ph>CONFIRM: YouTube video ID for "Dash for the Beads Fun Run"</Ph></Stack>}
          <Testimonial quote="Mostly downhill with lots of cheering volunteers. Great atmosphere. Worth the few uphill battles. Will plan to come back." name="Lisa Maxwell" />
        </Grid>
      </Section>

      <BeadDivider />
      <Section bg="var(--bg-surface)" label="Sponsor wall">
        <div><Eyebrow>Thank you</Eyebrow><H2>Our sponsors</H2></div>
        <ul className="logos">
          {wallTiers().flatMap((t) => t.sponsors.map((s) => (
            <li key={s.name} className={'logos__i logos__i--' + t.size}>
              {s.logo ? <img src={s.logo} alt={s.name} loading="lazy" decoding="async" /> : <span className="logos__n">{s.name}</span>}
              <span className="logos__t">{t.name}</span>
            </li>)))}
        </ul>
        <Ph>LOGOS NEEDED: Good Space, Methodist Dallas, Methodist Health, plus the full 2027 sponsor list as it fills</Ph>
        <Row><Button variant="outline" href={P.sponsors}>All sponsors</Button><Button href={P.sponsor}>Become a Sponsor</Button></Row>
      </Section>

      <Section narrow label="Race updates"><Updates /></Section>
      <p className="credit">Race photography by Tayo Fasusi Media and In the Cliff Photography.</p>
    </Layout>
  );
}
