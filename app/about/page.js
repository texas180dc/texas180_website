import { CONTENT } from "@/lib/content";
import PageHero from "@/components/PageHero";
import {
  Button,
  Display,
  Eyebrow,
  Lead,
  PhotoPlaceholder,
  Reveal,
  Section,
} from "@/components/ui";

export const metadata = {
  title: "About Us",
  description:
    "Texas 180 Degrees Consulting is the UT Austin branch of the world's largest university-based consultancy for nonprofits and social enterprises. A branch since Fall 2018.",
};

export default function AboutPage() {
  const { about } = CONTENT;

  return (
    <>
      <PageHero {...about.hero} />

      {/* ── MISSION ──────────────────────────────────────────────────────── */}
      <Section tone="light">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>{about.mission.eyebrow}</Eyebrow>
            <Display className="mt-5">{about.mission.heading}</Display>
          </Reveal>
          <Reveal delay={120} className="space-y-5">
            {about.mission.body.map((p, i) => (
              <Lead key={i}>{p}</Lead>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ── CORE VALUES ──────────────────────────────────────────────────── */}
      <Section tone="fog">
        <Reveal>
          <Eyebrow>Our Core Values</Eyebrow>
          <Display className="mt-5 max-w-2xl">What we run on.</Display>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {about.values.map((value, i) => (
            <Reveal key={value.title} delay={(i % 2) * 110}>
              <div className="h-full border-t border-hairline pt-7">
                <h3 className="text-[22px] font-semibold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── EXECUTIVE OFFICERS ───────────────────────────────────────────── */}
      <Section tone="light">
        <Reveal>
          <Eyebrow>{about.team.eyebrow}</Eyebrow>
          <Display className="mt-5">{about.team.heading}</Display>
          <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-graphite">
            {about.team.officersLabel}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {about.team.officers.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 110}>
              <PhotoPlaceholder
                label={m.photo ? `${m.name}, ${m.role}` : `Headshot — ${m.name}`}
                src={m.photo}
                ratio="square"
              />
              <p className="mt-5 text-[18px] font-semibold tracking-tight">
                {m.name}
              </p>
              <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.16em] text-leaf">
                {m.role}
              </p>
              {m.detail && (
                <p className="mt-2 text-[14px] text-graphite">{m.detail}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="text-graphite transition-colors hover:text-leaf"
                  >
                    {m.email}
                  </a>
                )}
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-graphite transition-colors hover:text-leaf"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── PROJECT LEADS ────────────────────────────────────────────────── */}
      {about.team.leads.length > 0 && (
        <Section tone="fog">
          <Reveal>
            <Eyebrow>{about.team.leadsLabel}</Eyebrow>
            <Display className="mt-5 max-w-2xl">
              {about.team.leadsHeading}
            </Display>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {about.team.leads.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 90}>
                <div className="h-full border-t border-hairline pt-6">
                  <p className="text-[17px] font-semibold tracking-tight">
                    {m.name}
                  </p>
                  <p className="mt-1 text-[14px] text-leaf">{m.client}</p>
                  <p className="mt-2 text-[13px] text-graphite">{m.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── GLOBAL AFFILIATION ───────────────────────────────────────────── */}
      <Section tone="dark">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Display className="text-paper">{about.global.heading}</Display>
            <Lead dark className="mt-6">
              {about.global.body}
            </Lead>
            <Button href={about.global.cta.href} external className="mt-9">
              {about.global.cta.label}
            </Button>
          </Reveal>
          <Reveal delay={120}>
            <PhotoPlaceholder
              label="The Texas 180 branch at our end-of-year celebration"
              src="/photos/banquet-group.jpg"
              ratio="wide"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
