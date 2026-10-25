import React from 'react';
import { DS, D, P, REVIEW, Layout, Section, Eyebrow, H2, H3, Lead, Body, Grid, Stack, Row, Card, List, Ph, PhotoSlot, Img } from '../shared.jsx';

export default function About() {
  const { PageBanner, Button, StatCounter } = DS;
  const ph = D.photos;
  const initials = (n) => n.split(' ').filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(0, 2).join('');
  return (
    <Layout active="about">
      <PageBanner eyebrow={'Since ' + D.founded} title="About Dash for the Beads" />

      <Section label="Story">
        <Grid min={320} gap={48} style={{ alignItems: 'start' }}>
          <Stack gap={18}>
            <H2>A neighborhood party with a purpose</H2>
            <Lead>Dash for the Beads is a 501(c)(3) non-profit organization that donates its proceeds to local schools to help promote healthy eating and physical activity for our grade school children. Area schools are eligible to apply for grants that encourage kids to stay in motion and to learn about and practice habits that lead to a healthy lifestyle.</Lead>
            <Body>Dash for the Beads is an annual 5K and 1-mile walk that coincides with Mardi Gras, so come out and <em>laissez les bons temps rouler!</em> (To any Mardi Gras rookies, that is Cajun for "Let the good times roll.")</Body>
            <Body>Each year we award an enviable trophy to the winner of the chip-timed 5K. Come join an event that has become a neighborhood tradition, benefiting neighborhood schools.</Body>
            <Body>The Dash was founded in {D.founded} by "Cliff Dwellers" Chad West and David Sassano as a way to raise money for Oak Cliff organizations. <Ph>CONFIRM: founded 2009, first race 2010 (2027 is the 18th annual)</Ph> Monetary donations from those not able to participate are welcome{D.payment.zeffy ? <>: <a href={D.payment.zeffy} rel="noopener">donate online</a>.</> : <>. <a href={P.contact + '?type=other'}>Get in touch</a> and we'll send the details.</>} <Ph>CONFIRM: Zeffy donation link (set payment.zeffy in src/data.js)</Ph></Body>
            <Row><Button href={P.involved}>Get involved</Button><Button variant="outline" href={P.grants}>About our grants</Button></Row>
          </Stack>
          <Img p={ph.volunteers} ratio="3/2" />
        </Grid>
      </Section>

      <Section bg="var(--bg-surface)" narrow label="Mission">
        <Eyebrow>Mission statement</Eyebrow>
        <p className="mission">Dash for the Beads activities provide funds for Dallas-area schools and non-profits to promote physical fitness, healthy eating, and arts programming.</p>
        <H3>How we accomplish our mission</H3>
        <List ordered items={[
          <>Raising funds annually for Oak Cliff schools and non-profits that serve children through the Dash for the Beads 5K and fun run, as well as Last Bag Standing and Friends of the Dash.</>,
          'Requesting grant proposals annually from Oak Cliff schools and non-profits that offer physical fitness, healthy eating, and arts programming for children.',
          'Carefully reviewing and scoring grant applications to ensure Dash for the Beads is a good steward of the funds it raises.',
          'Awarding grant funds to Oak Cliff schools and non-profits based on the Grant Review Process.',
          'Diligently following up with awardees to ensure grant funds are spent as requested and all grant reporting is complete and in order.'
        ]} />
      </Section>

      <Section bg="var(--bg-brand)" label="Impact" className="sec--confetti">
        <div><Eyebrow color="var(--gold-400)">How your participation has helped</Eyebrow><H2 color="#fff">Our impact</H2></div>
        <Grid min={200} gap={32}>{D.impact.map((s) => <StatCounter key={s.label} tone="dark" {...s} />)}</Grid>
        <div><Ph>{D.impactConfirm}</Ph></div>
      </Section>

      <Section label="Committee">
        <div><Eyebrow>{D.committeeYear} committee</Eyebrow><H2>The people behind the Dash</H2></div>
        <Grid min={220} gap={16}>{D.committee.map((m) => (
          <Card key={m.name} className="person">
            <div aria-hidden="true" className="person__av">{initials(m.name)}</div>
            <div><div className="person__n">{m.name}</div><div className="person__r">{m.role}</div></div>
          </Card>))}</Grid>
        <Body>The Dash committee is always looking for sponsors, vendors, and volunteers who would like to be part of this worthwhile event. <a href={P.involved}>See how to get involved</a>.</Body>
      </Section>

      {REVIEW && (
        <Section bg="var(--bg-sunken)" label="Recognition">
          <div><Eyebrow>Recognition</Eyebrow><H2>Runners rate us</H2></div>
          <Grid min={240} gap={20} style={{ maxWidth: 560 }}>
            <PhotoSlot desc="Top Race in Texas badge (PNG or SVG)" ratio="1/1" />
            <PhotoSlot desc="RunRepeat Approved badge (PNG or SVG)" ratio="1/1" />
          </Grid>
        </Section>
      )}
    </Layout>
  );
}
