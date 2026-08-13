import { CONTENT } from "@/lib/content";
import PageHero from "@/components/PageHero";
import {
  Button,
  Display,
  Eyebrow,
  PhotoPlaceholder,
  Reveal,
  Section,
} from "@/components/ui";
import { HorizontalRail, WordCascade } from "@/components/scroll";

export const metadata = {
  title: "Projects",
  description:
    "Austin-area nonprofits and social enterprises Texas 180 Degrees Consulting has partnered with.",
};

export default function ProjectsPage() {
  const { projects } = CONTENT;

  return (
    <>
      <PageHero {...projects.hero} />

      {/* ── STATEMENT ────────────────────────────────────────────────────── */}
      <Section tone="light" className="!py-32">
        <WordCascade
          className="max-w-4xl"
          text="Thirty-plus organizations across Austin have taken our recommendations and put them to work."
        />
      </Section>

      {/* ── CLIENT MARQUEE (scrolls sideways on its own, loops forever) ──── */}
      {/* `seconds` sets one full loop — raise it to slow the marquee down */}
      <HorizontalRail
        eyebrow="Our Partners"
        heading="Organizations we've worked alongside."
        items={projects.clients}
        seconds={55}
      />

      {/* ── FEATURED CASE STUDIES (hidden until you add entries) ─────────── */}
      {projects.featured.length > 0 && (
        <Section tone="light">
          <Reveal>
            <Eyebrow>Case Studies</Eyebrow>
            <Display className="mt-5 max-w-2xl">A closer look.</Display>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {projects.featured.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 120}>
                <article>
                  <PhotoPlaceholder
                    label={project.photo || `${project.client} project photo`}
                    ratio="wide"
                  />
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-leaf">
                      {project.type}
                    </span>
                    <span className="text-[13px] text-graphite">{project.year}</span>
                  </div>
                  <h3 className="mt-3 text-[24px] font-semibold tracking-tight">
                    {project.client}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                    {project.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── SAMPLE DELIVERABLES ──────────────────────────────────────────── */}
      {projects.samples.decks.length > 0 && (
        <Section tone="light">
          <div className="grid gap-14 md:grid-cols-2 md:gap-20">
            <Reveal>
              <Eyebrow>{projects.samples.eyebrow}</Eyebrow>
              <Display className="mt-5">{projects.samples.heading}</Display>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[17px] leading-[1.65] text-graphite">
                {projects.samples.body}
              </p>
              <ul className="mt-10 border-t border-hairline">
                {projects.samples.decks.map((deck) => (
                  <li key={deck.href} className="border-b border-hairline">
                    <a
                      href={deck.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 py-5 text-[16px] transition-colors hover:text-leaf"
                    >
                      {deck.label}
                      <span
                        aria-hidden="true"
                        className="text-leaf transition-transform duration-300 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section tone="dark">
        <Reveal className="text-center">
          <Display className="mx-auto max-w-2xl text-paper">
            {projects.cta.heading}
          </Display>
          <Button href={projects.cta.button.href} className="mt-10">
            {projects.cta.button.label}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
