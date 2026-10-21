import React from 'react';
import { DS, D, Layout, Section, H2, Lead, Grid, Stack, Card, Ph, InterestForm, F, NewsletterSignup } from '../shared.jsx';

export default function Contact() {
  const { PageBanner, Icon } = DS;
  const types = [{ value: 'race', label: 'The race' }, { value: 'sponsor', label: 'Becoming a sponsor' }, { value: 'vendor', label: 'Being a vendor' }, { value: 'volunteer', label: 'Volunteering' }, { value: 'grant', label: 'Submitting a grant proposal' }, { value: 'other', label: 'Other' }];
  const Line = ({ icon, t, children }) => <div className="info"><Icon name={icon} size={24} color="var(--purple-500)" /><div><div className="info__t">{t}</div><div className="info__d">{children}</div></div></div>;
  const social = [['instagram', 'Instagram'], ['facebook', 'Facebook']].filter(([k]) => D.social[k]);
  return (
    <Layout active="contact">
      <PageBanner eyebrow="Contact" title="Let's talk" pattern="none" />
      <Section label="Contact">
        <Grid min={320} gap={48} style={{ alignItems: 'start' }}>
          <Stack gap={16}>
            <H2>Questions about the race?</H2>
            <Lead>Want to become a vendor or sponsor, volunteer, or submit a grant proposal? Send us a note and the right committee member will get back to you.</Lead>
            <InterestForm name="contact" submitLabel="Submit" success="Thanks. Your message is with the committee and we'll reply by email."
              fields={[F.first, F.last, { ...F.phone, required: true }, F.email, { name: 'type', label: "I'm inquiring about", options: types, required: true, fromQuery: 'type' }, { name: 'other', label: 'If other, please specify' }, { name: 'comments', label: 'Comments', multiline: true }]} />
          </Stack>
          <Stack gap={24}>
            <Card flat style={{ gap: 18 }}>
              <Line icon="mail" t="Email"><a href={'mailto:' + D.email}>{D.email}</a></Line>
              <Line icon="clock" t="Text or call">Our Dash phone line is active starting December 15 each season. <Ph>CONFIRM: phone number</Ph></Line>
              {social.length > 0
                ? <Line icon="instagram" t="Follow along">Race news and photos on {social.map(([k, l], i) => <React.Fragment key={k}>{i > 0 && ' and '}<a href={D.social[k]} rel="me noopener">{l}</a></React.Fragment>)}.</Line>
                : <Ph>CONFIRM: social URLs (Instagram, Facebook) to show a Follow along line</Ph>}
            </Card>
            <NewsletterSignup form="mailing-list" tone="light" title="Stay connected" body="Sign up for our mailing list for race announcements, registration, and early pricing." buttonLabel="Sign up" />
          </Stack>
        </Grid>
      </Section>
    </Layout>
  );
}
