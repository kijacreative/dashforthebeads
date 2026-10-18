import React from 'react';
import { DS, D, P, Layout, Section, H2, Lead, Body, Row, Ph, wallTiers } from '../shared.jsx';

export default function Sponsors() {
  const { PageBanner, Button, SponsorWall } = DS;
  return (
    <Layout active="sponsors">
      <PageBanner eyebrow="Thank you" title="Our sponsors" />
      <Section label="Current sponsors">
        <Lead>The Dash would not happen without these businesses and families. Please thank them with your business.</Lead>
        <SponsorWall tiers={wallTiers()} />
        <Ph>CONFIRM: TLM full name and logo, Rafael Anchía logo, name and logo for Bronze sponsor s4.jpg, spelling Schenkel vs Schinkel (logo reads Schinkel)</Ph>
      </Section>
      <Section bg="var(--bg-sunken)" id="friends" label="Friends">
        <H2>Friends of the Dash</H2>
        <Body>Thank you to the individuals and families who back the Dash every year.</Body>
        <Ph>CONFIRM: Friends of the Dash names and listing preferences</Ph>
        <div><Button variant="secondary" href={P.involved + '#friends'}>Become a Friend</Button></div>
      </Section>
      <Section narrow label="Past sponsors">
        <H2>Thank you to our past sponsors</H2>
        <Body>Seventeen years of races, parades, and grants for Oak Cliff kids were made possible by sponsors who said yes. Thank you.</Body>
        <Ph>CONFIRM: past sponsor names (2010 to 2026)</Ph>
      </Section>
      <Section bg="var(--bg-brand)" label="Sponsor the Dash" className="sec--confetti">
        <H2 color="#fff">Want your logo here?</H2>
        <Lead style={{ color: '#fff' }}>Sponsorships start at $750. Logos are due for print by December 31.</Lead>
        <Row><Button variant="secondary" size="lg" href={P.sponsor}>Become a Sponsor</Button><Button variant="on-dark" size="lg" href={P.sponsor + '#deck'}>Request the deck</Button></Row>
      </Section>
    </Layout>
  );
}
