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
  title: "Our Services",
  description:
    "Free strategy consulting for Austin-area nonprofits: marketing, operations, funding, donor relations, software, and asset management. 8–10 week Agile engagements.",
};

export default function ServicesPage() {
  const { services } = CONTENT;

  return (
    <>
      <PageHero {...services.hero} />

      {/* ── WHY NONPROFITS ───────────────────────────────────────────────── */}
      <Section tone="light">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>{services.passion.eyebrow}</Eyebrow>
            <Display className="mt-5">{services.passion.heading}</Display>
          </Reveal>
          <Reveal delay={120} className="space-y-5">
            {services.passion.body.map((p, i) => (
              <Lead key={i}>{p}</Lead>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* ── OFFERINGS ────────────────────────────────────────────────────── */}
      <Section tone="fog">
        <Reveal>
          <Eyebrow>What We Do</Eyebrow>
          <Display className="mt-5 max-w-2xl">Where we can help.</Display>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {services.offerings.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 110}>
              <div className="border-t border-hairline pt-7">
                <h3 className="text-[20px] font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── PROJECT STRUCTURE ────────────────────────────────────────────── */}
      <Section tone="dark">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>{services.process.eyebrow}</Eyebrow>
            <Display className="mt-5 text-paper">
              {services.process.heading}
            </Display>
          </Reveal>
          <Reveal delay={120}>
            <Lead dark>{services.process.intro}</Lead>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-4">
          {services.process.steps.map((step, i) => (
            <Reveal key={step.step} delay={i * 110} as="li">
              <div className="border-t border-paper/20 pt-7">
                <span className="text-[13px] font-semibold tracking-[0.2em] text-leaf">
                  {step.step}
                </span>
                <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/60">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section tone="light">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Display>{services.cta.heading}</Display>
            <Lead className="mt-6">{services.cta.body}</Lead>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={services.cta.button.href}>
                {services.cta.button.label}
              </Button>
              <Button
                href="/projects"
                className="bg-ink text-paper hover:bg-slate"
              >
                Past projects
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <PhotoPlaceholder
              label="Texas 180 consultants at an end-of-semester showcase"
              ratio="wide"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
