import React from 'react';
import { DS, D, P, Layout, Section, H2, H3, Lead, Body, Grid, Stack, Row, Card, Ph, PhotoSlot, InterestForm, F, tierCardProps, PaymentNote } from '../shared.jsx';

// One static page per sponsor level, at /sponsor/<slug>/.
export default function Tier({ slug }) {
  const { PageBanner, Button, Icon, SponsorTierCard } = DS;
  const t = D.tiers.find((x) => x.slug === slug);
  const claimed = t.status === 'claimed';
  const others = D.tiers.filter((x) => x.slug !== t.slug && x.status !== 'claimed').slice(0, 3);
  const opts = D.tiers.map((x) => ({ value: x.slug, label: x.name + ' (' + x.price + ')' }));
  return (
    <Layout active="involved">
      <nav aria-label="Breadcrumb" className="crumbs"><ol><li><a href={P.involved}>Get Involved</a></li><li><a href={P.sponsor}>Become a Sponsor</a></li><li aria-current="page">{t.name}</li></ol></nav>
      <PageBanner eyebrow={'Sponsorship · ' + (claimed ? 'Claimed' : t.price)} title={t.name}>
        <span>{claimed ? (t.claimedBy ? 'Thank you, ' + t.claimedBy + '. This level is claimed.' : 'This level is claimed. See the levels still open below.') : t.benefits[0] + '. Plus a spot in front of thousands of Oak Cliff neighbors on race and parade day.'}</span>
        <Row>{claimed ? <Button variant="on-dark" size="lg" href={P.sponsor + '#levels'}>See open levels</Button> : <><Button variant="register" size="lg" href="#claim">Claim this level</Button><Button variant="on-dark" size="lg" href={P.sponsor + '#levels'}>All levels</Button></>}</Row>
      </PageBanner>

      <Section label="Benefits">
        <Grid min={320} gap={48} style={{ alignItems: 'start' }}>
          <Stack gap={16}>
            <H2>What you get</H2>
            <ul className="checks">{t.benefits.map((b) => <li key={b}><Icon name="check" size={24} color="var(--green-600)" />{b}</li>)}</ul>
            <Ph>CONFIRM: tier copy from the marketing plan (placement details, reach numbers, exclusivity)</Ph>
          </Stack>
          <Stack gap={12}>
            <PhotoSlot desc={'where the ' + t.name + ' logo appears (bib, medal, cup, banner, or bag mockup)'} ratio="4/3" fallback={D.photos.beads} />
            <div className="deadline kv">
              <span>Price</span><span>{claimed ? 'Claimed' : t.price}</span><span>Logo due (print)</span><span>December 31, 2026</span><span>Logo due (T-shirt)</span><span>January 15, 2027</span>
            </div>
            <Ph>CONFIRM: 2027 deadlines</Ph>
          </Stack>
        </Grid>
      </Section>

      <Section bg="var(--bg-surface)" label="Reach">
        <H2>Who sees it</H2>
        <Grid min={220} gap={20}>
          <Card flat><H3>About 1,000 runners</H3><Body>5K and 1-mile runners and their families, mostly from Oak Cliff and greater Dallas.</Body></Card>
          <Card flat><H3>Thousands of parade-goers</H3><Body>The Go Oak Cliff Mardi Gras Parade follows the race on Davis Street.</Body></Card>
          <Card flat><H3>Oak Cliff kids</H3><Body>Net proceeds fund grants for local schools and youth non-profits.</Body></Card>
        </Grid>
      </Section>

      {!claimed && (
        <Section id="claim" narrow label="Claim">
          <H2>Claim the {t.name}</H2>
          <Lead>Levels are first come, first served. Send this form and we'll confirm availability and next steps within a few days, or email <a href={'mailto:' + D.email}>{D.email}</a>.</Lead>
          <InterestForm name={'sponsor-' + t.slug} submitLabel="Claim this level" success={"Thanks. We'll confirm the " + t.name + ' and send next steps.'}
            fields={[F.first, F.last, F.company, F.email, F.phone, { name: 'tier', label: 'Level', options: opts, value: t.slug }, F.notes]} />
          <PaymentNote what="Sponsorships" />
        </Section>
      )}

      <Section bg="var(--bg-sunken)" label="Other levels">
        <H2>Other open levels</H2>
        <Grid min={270} gap={20}>{others.map((x) => <SponsorTierCard key={x.slug} {...tierCardProps(x)} />)}</Grid>
      </Section>
    </Layout>
  );
}
