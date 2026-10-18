import React from 'react';
import { DS, D, P, Layout, Section, Eyebrow, H2, H3, Lead, Body, Grid, Stack, Card, List, Ph, PhotoSlot, Img, InterestForm, F } from '../shared.jsx';

export default function Involved() {
  const { PageBanner, Button, Icon, BeadDivider } = DS;
  const ph = D.photos;
  const hub = [
    { icon: 'trophy-cup', t: 'Become a Sponsor', d: 'Our race needs you! View all sponsor opportunities for your organization or business.', href: P.sponsor, cta: 'Sponsor levels' },
    { icon: 'heart-plus', t: 'Friends of the Dash', d: 'For individuals and families. $250 a year gets you 2 race entries and a thank-you on our website.', href: '#friends', cta: 'Become a Friend' },
    { icon: 'party-flags', t: 'Vendors', d: 'Learn how your organization or business can set up a table or park a food truck at Party Central.', href: '#vendors', cta: 'Vendor info' },
    { icon: 'necklace', t: 'Volunteer', d: 'Hand out packets, cheer the course, and pass out beads. We thank everyone who has volunteered in the past.', href: '#volunteer', cta: 'Volunteer' }
  ];
  const roles = [
    { t: 'Packet pickup', d: 'Hand out bibs, shirts, and bags at early pickup and on race morning.' },
    { t: 'Course marshal', d: 'Keep runners on route and cheer them up the hills. Bring your loudest voice.' },
    { t: 'Water station', d: 'Pour, hand off, and clean up cups along the 5K.' },
    { t: 'Finish line', d: 'Hand out medals, water, and beads as runners come in.' },
    { t: 'Kid Zone and festival', d: 'Help with the Kid Zone, info tent, and vendor check-in.' },
    { t: 'Setup and teardown', d: 'Early birds and closers. Tents, tables, barricades, and signs.' }
  ];
  const shifts = ['Early packet pickup (Saturday)', 'Race morning setup', 'Race morning (packet pickup through 5K)', 'Festival and parade', 'Teardown'];
  return (
    <Layout active="involved">
      <PageBanner eyebrow="Join the party" title="Get Involved" />

      <Section label="Ways to help">
        <Lead>The Dash runs on neighbors. Sponsor it, back it as a Friend, bring your booth or food truck, or give us a few hours on race weekend.</Lead>
        <Grid min={240} gap={20}>{hub.map((h) => (
          <Card key={h.t} className="card--lift"><Icon name={h.icon} size={40} color="var(--purple-500)" /><H3>{h.t}</H3><Body style={{ flex: 1 }}>{h.d}</Body><div><Button size="sm" variant="outline" href={h.href} iconRight="arrow-right">{h.cta}</Button></div></Card>))}</Grid>
      </Section>

      <BeadDivider />
      <Section id="friends" bg="var(--bg-surface)" label="Friends of the Dash">
        <Grid min={320} gap={48}>
          <Stack gap={16}>
            <Eyebrow>$250 a year</Eyebrow><H2>Friends of the Dash</H2>
            <Lead>Thank you to all the individuals and families who contribute to the Dash. Friends keep the grants flowing to Oak Cliff kids year after year.</Lead>
            <List items={['2 race entries (5K or 1 mile)', 'Your name on our website']} />
            <Img p={ph.feather} ratio="4/3" />
          </Stack>
          <Stack gap={16}>
            <H3>Become a Friend</H3>
            <InterestForm name="friends" submitLabel="Become a Friend" success="Thank you! We'll email you next steps and your race entry codes."
              fields={[F.first, F.last, F.email, F.phone, { name: 'listing', label: 'How should we list you?', hint: 'For example: The Garcia Family', wide: true }]} />
            <Ph>CONFIRM: how Friends pay (RunSignup donation, online checkout, or check)</Ph>
          </Stack>
        </Grid>
      </Section>

      <Section id="vendors" label="Vendors">
        <div><Eyebrow>Party Central</Eyebrow><H2>Vendors and food trucks</H2></div>
        <Grid min={300} gap={40}>
          <Stack gap={14}>
            <H3>Booth and table setup</H3>
            <Body>We expect this year's Dash to be bigger and better than ever, with about 1,000 runners and even more spectators, and we definitely encourage you to go all out on race day.</Body>
            <List items={['All vendors provide their own table and chairs.', 'Pop-up tents are welcome. Electricity is not guaranteed.', 'Dash for the Beads will contact you about approval and payment.']} />
            <Ph>CONFIRM: 2027 booth fee and setup time</Ph>
          </Stack>
          <Stack gap={14}>
            <H3>Food trucks</H3>
            <Body>Park your truck at the Dash for the Beads festival, next to the Oak Cliff Mardi Gras Parade.</Body>
            <List items={['Food trucks must be 100% self-contained. If you need anything other than space from us, we need to talk.', "We'll be in touch about approval and payment.", 'Specific logistics are sorted out closer to event day.']} />
            <Ph>CONFIRM: 2027 food truck fee and permit requirements</Ph>
          </Stack>
        </Grid>
        <PhotoSlot desc="Race Central / Party Central festival map with vendor spots" ratio="16/9" />
        <Card flat>
          <H3>Vendor interest form</H3>
          <InterestForm name="vendor" submitLabel="Send" success="Thanks. We'll contact you about approval and payment."
            fields={[F.company, { ...F.first, label: 'Contact name', name: 'contact' }, F.email, F.phone, { name: 'type', label: 'I want a spot for', options: ['Booth or table', 'Food truck'], required: true }, { name: 'offer', label: 'What will you sell or offer?', required: true }, { name: 'needs', label: 'Anything you need from us?', multiline: true, hint: 'Space size, power, water. We cannot guarantee electricity.' }]} />
        </Card>
      </Section>

      <Section id="volunteer" bg="var(--bg-sunken)" label="Volunteer">
        <div><Eyebrow>Volunteers needed</Eyebrow><H2>Volunteer</H2></div>
        <Lead>Pick a role and a shift and we'll put you to work. We thank everyone who has volunteered in the past.</Lead>
        <Ph>CONFIRM: volunteer roles, perks, and minimum age</Ph>
        <Grid min={240} gap={16}>{roles.map((r) => <Card key={r.t} style={{ padding: 20, gap: 6 }}><div className="person__n">{r.t}</div><Body>{r.d}</Body></Card>)}</Grid>
        <Stack gap={8}>
          <H3>Shifts</H3>
          <ul className="chips">{shifts.map((s) => <li key={s}>{s}</li>)}</ul>
          <Ph>CONFIRM: shift times for 2027</Ph>
        </Stack>
        <Card>
          <H3>Volunteer interest form</H3>
          <InterestForm name="volunteer" submitLabel="Sign me up" success="Thanks for volunteering! We'll email shift details as race day gets closer."
            fields={[F.first, F.last, F.email, F.phone, { name: 'role', label: 'Preferred role', options: roles.map((r) => r.t), placeholder: 'Put me where you need me' }, { name: 'shift', label: 'Preferred shift', options: shifts, placeholder: 'Any shift' }, { name: 'group', label: 'Group size', type: 'number', hint: 'Bringing a team, school group, or company? Tell us how many.' }, F.notes]} />
        </Card>
      </Section>
    </Layout>
  );
}
