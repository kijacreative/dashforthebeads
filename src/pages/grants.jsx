import React from 'react';
import { DS, D, P, Layout, Section, Eyebrow, H2, H3, Lead, Body, Grid, Stack, Row, List, Ph, Pending, Faq } from '../shared.jsx';
import { GRANTS_FAQ } from '../content.js';

export default function Grants() {
  const { PageBanner, Button } = DS;
  const Fact = ({ t, children }) => <div className="fact"><div className="fact__t">{t}</div><div className="fact__v">{children}</div></div>;
  const steps = [
    ['Check eligibility', 'Make sure your school group or non-profit meets the requirements below.'],
    ['Download the proposal form', 'Fill it out and write a short narrative and budget for your program.'],
    ['Submit by the deadline', 'Email your complete proposal to the grants committee.'],
    ['Review and award', 'The committee scores each proposal and the board sets the number and size of grants.'],
    ['Report back', 'Awardees confirm how the funds were spent and complete grant reporting.']
  ];
  return (
    <Layout active="grants">
      <PageBanner eyebrow="For Oak Cliff schools and youth non-profits" title="Grants" pattern="none" />

      <Section narrow label="Overview">
        <Lead>Each year, Dash for the Beads awards grants to Oak Cliff schools and youth non-profits for programs in physical fitness, healthy eating, and the arts. Grants are paid for by the net proceeds of the race.</Lead>
        <Grid min={200} gap={12}>
          <Fact t="Grant amount">Set yearly by the board <Ph>CONFIRM: 2027 max award (2016 was $1,000)</Ph></Fact>
          <Fact t="Deadline">Announced when the cycle opens <Ph>CONFIRM: 2027 application deadline</Ph></Fact>
          <Fact t="Submit to"><a href={'mailto:' + D.email + '?subject=Grant%20proposal'}>{D.email}</a> <Ph>CONFIRM: grants application email</Ph></Fact>
        </Grid>
        <Pending><Row><Button icon="arrow-right" href="#">Download the proposal form</Button><Ph>CONFIRM: proposal form file (PDF or DOCX)</Ph></Row></Pending>
      </Section>

      <Section bg="var(--bg-surface)" narrow label="How it works">
        <H2>How grants work</H2>
        <ol className="steps">{steps.map(([t, d], i) => (
          <li key={t}>
            <span aria-hidden="true" className="steps__n">{i + 1}</span>
            <div><div className="steps__t">{t}</div><Body>{d}</Body></div>
          </li>))}</ol>
      </Section>

      <Section narrow label="Eligibility and criteria">
        <Stack gap={12}>
          <H3>Who can apply</H3>
          <List items={['Programs must serve youth in the Oak Cliff area of Dallas.', 'Applicants must be a registered 501(c)(3) organization and provide a tax ID number.', 'Schools may apply through a PTA or similar parent-led group that supports the school.', 'Other non-profit organizations may also apply.', 'Programs must fall in one of these areas: youth athletics, health, and fitness; healthy eating; or youth arts and music.']} />
        </Stack>
        <Stack gap={12}>
          <H3>What to submit</H3>
          <List items={['A completed grant proposal form', 'A 1 to 2 page narrative describing your program', 'A program budget that itemizes the program expenses']} />
        </Stack>
        <Stack gap={12}>
          <H3>How proposals are scored</H3>
          <List ordered items={['Demonstration of need', 'Overall impact of the program or project', 'Impact on youth in the Oak Cliff area', 'Clarity of purpose, as presented in the narrative', 'Alignment with the Dash mission: youth programs supporting health and fitness or arts and music', 'Participation or volunteer support at the Dash']} />
          <Body>Programs don't have to meet every criterion. Proposals that most closely match all of them get stronger consideration. The Dash board sets the number and size of grants each year based on race revenue.</Body>
        </Stack>
        <Stack gap={8}>
          <H3>Questions</H3>
          <Body>Email the grants committee at <a href={'mailto:' + D.email + '?subject=Grants'}>{D.email}</a> <Ph>CONFIRM: grants contact name and email</Ph>, or use our <a href={P.contact + '?type=grant'}>contact form</a>.</Body>
        </Stack>
      </Section>

      <Section bg="var(--bg-surface)" narrow label="Grant FAQ">
        <div><Eyebrow>Quick answers</Eyebrow><H2>Grant FAQ</H2></div>
        <Faq items={GRANTS_FAQ} defaultOpen={-1} />
      </Section>

      <Section bg="var(--bg-sunken)" narrow label="Past recipients">
        <H2>Past recipients</H2>
        <Body>Since 2014, Dash for the Beads has funded 34 Oak Cliff schools and organizations.</Body>
        <Ph>CONFIRM: list of past grant recipients by year</Ph>
      </Section>
    </Layout>
  );
}
