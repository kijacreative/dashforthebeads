import React from 'react';
import { DS, D, P, Layout, Section, Eyebrow, H2, H3, Lead, Body, Grid, Stack, Row, Card, Ph, InterestForm, F, Faq, tierCardProps, PaymentNote } from '../shared.jsx';
import { SPONSOR_FAQ } from '../content.js';

export default function Sponsor() {
  const { PageBanner, Button, Icon, SponsorTierCard } = DS;
  const [filter, setFilter] = React.useState('all');
  const tiers = D.tiers.filter((t) => filter === 'all' || (filter === 'open' ? t.status !== 'claimed' : t.status === 'claimed'));
  const chip = (k, l) => <button key={k} className="filter" onClick={() => setFilter(k)} aria-pressed={filter === k}>{l}</button>;
  const why = [
    { icon: 'sprint', t: 'Audience', d: 'About 1,000 runners and their families, mostly from Oak Cliff and greater Dallas. Neighbors who shop, eat, and bank close to home.' },
    { icon: 'party-flags', t: 'Reach', d: <>Thousands more line Davis Street for the Go Oak Cliff Mardi Gras Parade right after the race. Your logo also rides on bibs, shirts, cups, bags, our social posts, and emails to our {D.emailSubscribers} subscribers. <Ph>CONFIRM: social follower counts</Ph></> },
    { icon: 'heart-plus', t: 'Impact', d: <>Net proceeds fund grants for Oak Cliff schools and youth non-profits in fitness, healthy eating, and the arts. More than $450,000 awarded since 2010.</> }
  ];
  const perks = ['Will have your name or logo on the Dash tee shirt, with prominent placement for levels $7,500 and up', 'Will have social media and website recognition', 'May place one item in the packet pickup bag given to all runners'];
  const opts = D.tiers.filter((t) => t.status !== 'claimed').map((t) => ({ value: t.slug, label: t.name + ' (' + t.price + ')' }));
  return (
    <Layout active="involved">
      <PageBanner eyebrow="Get involved" title="Become a Sponsor">
        <span>Put your business in front of about 1,000 runners and thousands of Mardi Gras parade-goers in Oak Cliff. Levels from $750.</span>
      </PageBanner>

      <Section label="Intro">
        <Grid min={320} gap={40}>
          <Stack gap={16}>
            <H2 color="var(--text-heading-brand)">Increase your exposure in Oak Cliff</H2>
            <Lead>Join one of Oak Cliff's most cherished traditions. The {D.edition}th annual Good Space Dash for the Beads and the Go Oak Cliff Mardi Gras Parade come together for one big community celebration in support of children's health and creativity.</Lead>
            <Body>Since 2009, the Dash has raised more than $450,000 for local schools and non-profits that promote physical fitness, healthy eating, and the arts. All net proceeds go directly to Oak Cliff organizations helping kids thrive through movement, nutrition, and imagination. We hope you'll be part of the festivities.</Body>
            <div className="kv"><span>Race day</span><span>{D.raceDate}</span><span>Kick off</span><span>9:00 a.m.</span><span>Location</span><span>1230 W. Davis St at N. Clinton Ave</span></div>
            <Row><Button href="#deck">Request the sponsor deck</Button><Button variant="outline" icon="mail" href={P.contact + '?type=sponsor'}>Contact us</Button></Row>
          </Stack>
          <div className="deadline">
            <div className="deadline__h">Production deadlines</div>
            <div>We must have sponsor logos and names by these dates to make production deadlines.</div>
            <div className="kv"><span>Printed material</span><span>December 31, 2026</span><span>T-shirt printing</span><span>January 15, 2027</span></div>
            <Ph>CONFIRM: 2027 production deadlines</Ph>
            <div style={{ fontSize: 'var(--fs-body-s)' }}>Send vector logos (SVG, EPS, or PDF) to {D.email}.</div>
          </div>
        </Grid>
      </Section>

      <Section bg="var(--bg-surface)" label="Why sponsor">
        <div><Eyebrow>Why sponsor</Eyebrow><H2>Neighbors, a parade, and a good cause</H2></div>
        <Grid min={260}>{why.map((w) => <Card key={w.t} flat><Icon name={w.icon} size={40} color="var(--purple-500)" /><H3>{w.t}</H3><Body>{w.d}</Body></Card>)}</Grid>
      </Section>

      <Section bg="var(--bg-sunken)" id="levels" label="Sponsorship levels">
        <div className="levels-head">
          <H2>Sponsorship levels</H2>
          <Row gap={8}>{chip('all', 'All')}{chip('open', 'Available')}{chip('claimed', 'Claimed')}</Row>
        </div>
        <Card flat className="perks">
          <H3>Every sponsor</H3>
          <Body>On top of the benefits for your level. Friends of the Dash is a separate membership for individuals and families.</Body>
          <ul className="checks">{perks.map((b) => <li key={b}><Icon name="check" size={24} color="var(--green-600)" />{b}</li>)}</ul>
        </Card>
        <Grid min={270} gap={20}>{tiers.map((t) => <SponsorTierCard key={t.slug} {...tierCardProps(t)} />)}</Grid>
      </Section>

      <Section id="deck" narrow label="Request the deck">
        <div><Eyebrow>Sponsor deck</Eyebrow><H2>Request the sponsor deck</H2></div>
        <Lead>Tell us a little about your business and we'll send the full deck with placements, reach, and pricing. Prefer to talk? Email <a href={'mailto:' + D.email}>{D.email}</a>.</Lead>
        <InterestForm name="sponsor-deck" submitLabel="Send me the deck" success="Thanks. The sponsor deck is on its way to your inbox."
          fields={[F.first, F.last, F.company, F.email, F.phone, { name: 'tier', label: 'Level you are interested in', options: opts, placeholder: 'Not sure yet', fromQuery: 'tier' }, F.notes]} />
        <PaymentNote what="Sponsorships" />
        <Ph>CONFIRM: sponsor deck PDF to attach to the auto-reply</Ph>
      </Section>

      <Section bg="var(--bg-surface)" narrow label="Sponsor FAQ">
        <div><Eyebrow>Quick answers</Eyebrow><H2>Sponsor FAQ</H2></div>
        <Faq items={SPONSOR_FAQ} defaultOpen={-1} />
      </Section>
    </Layout>
  );
}
