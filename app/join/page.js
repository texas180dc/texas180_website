import { CONTENT, SOCIAL } from "@/lib/content";
import PageHero from "@/components/PageHero";
import {
  Button,
  ButtonGhost,
  Display,
  Eyebrow,
  Lead,
  PhotoPlaceholder,
  Reveal,
  Section,
} from "@/components/ui";

export const metadata = {
  title: "Join Us",
  description:
    "Recruitment for Texas 180 Degrees Consulting at UT Austin. Open to all majors and all years — no prior consulting experience required.",
};

// Maps recruit.status in lib/content.js to what the badge shows.
const STATUS = {
  open: { dot: "bg-leaf", pulse: true, text: (s) => `Now Open · ${s}` },
  soon: { dot: "bg-leaf", pulse: true, text: (s) => `Opening Soon · ${s}` },
  closed: { dot: "bg-paper/30", pulse: false, text: () => "Applications Closed" },
};

export default function JoinPage() {
  const { recruit } = CONTENT;
  const state = STATUS[recruit.status] ?? STATUS.closed;

  // Guard: never render a live Apply button without a real link behind it.
  const isOpen = recruit.status === "open" && Boolean(recruit.applyUrl);

  return (
    <>
      <PageHero {...recruit.hero} />

      {/* ── STATUS + ACTION ──────────────────────────────────────────────── */}
      <Section tone="light">
        <Reveal>
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              {state.pulse && (
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${state.dot}`}
                />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  recruit.status === "closed" ? "bg-graphite" : state.dot
                }`}
              />
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-graphite">
              {state.text(recruit.semester)}
            </span>
          </div>

          {isOpen ? (
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href={recruit.applyUrl} external>
                Apply now
              </Button>
              <span className="text-[14px] text-graphite">{recruit.deadline}</span>
            </div>
          ) : (
            <div className="mt-6 max-w-xl">
              <Lead>
                {recruit.status === "soon" ? recruit.teaser : recruit.closedNote}
              </Lead>
              <ButtonGhost href={SOCIAL.instagram} external className="mt-8">
                Follow us for updates
              </ButtonGhost>
            </div>
          )}
        </Reveal>
      </Section>

      {/* ── WHAT IS CONSULTING ───────────────────────────────────────────── */}
      <Section tone="fog">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>{recruit.whatIsConsulting.eyebrow}</Eyebrow>
            <Display className="mt-5">{recruit.whatIsConsulting.heading}</Display>
          </Reveal>
          <Reveal delay={120}>
            <Lead>{recruit.whatIsConsulting.body}</Lead>
          </Reveal>
        </div>
      </Section>

      {/* ── WHY 180? ─────────────────────────────────────────────────────── */}
      <Section tone="light">
        <Reveal>
          <Eyebrow>{recruit.why.eyebrow}</Eyebrow>
          <Display className="mt-5 max-w-2xl">{recruit.why.heading}</Display>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {recruit.why.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <PhotoPlaceholder
                label={card.photo}
                ratio="wide"
              />
              <h3 className="mt-7 text-[22px] font-semibold tracking-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-graphite">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      {recruit.timeline.length > 0 && (
        <Section tone="dark">
          <Reveal>
            <Eyebrow>Recruitment Timeline</Eyebrow>
            <Display className="mt-5 max-w-2xl text-paper">
              What the process looks like.
            </Display>
          </Reveal>

          <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {recruit.timeline.map((item, i) => (
              <Reveal key={item.step} delay={i * 110} as="li">
                <div className="border-t border-paper/20 pt-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-leaf">
                    {item.step}
                  </p>
                  <p className="mt-3 text-[19px] font-medium tracking-tight text-paper">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      {/* ── EXPECTATIONS ─────────────────────────────────────────────────── */}
      <Section tone="fog">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>The Commitment</Eyebrow>
            <Display className="mt-5">What we ask of you.</Display>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-5">
              {recruit.expectations.map((item) => (
                <li key={item} className="flex gap-4 border-b border-hairline pb-5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-leaf"
                  />
                  <span className="text-[16px] leading-relaxed text-ink/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section tone="light">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <Display className="mt-5 max-w-2xl">Before you apply.</Display>
        </Reveal>

        <div className="mt-14 border-t border-hairline">
          {recruit.faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="group border-b border-hairline py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-medium tracking-tight marker:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-[22px] font-light text-leaf transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-graphite">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
