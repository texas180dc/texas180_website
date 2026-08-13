import { CONTENT } from "@/lib/content";
import {
  Button,
  Container,
  Display,
  Eyebrow,
  Lead,
  ParallaxPanel,
  PhotoPlaceholder,
  Reveal,
  Section,
  TextLink,
} from "@/components/ui";
import {
  CircleWipe,
  CountUp,
  StickyStack,
  WordCascade,
  ZoomReveal,
} from "@/components/scroll";

export default function Home() {
  const { home } = CONTENT;

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <ParallaxPanel
        label={home.hero.photo}
        src={home.hero.photoSrc}
        minHeight="min-h-svh"
      >
        <Container className="flex min-h-svh flex-col items-center justify-center py-32 text-center">
          <Reveal>
            <h1
              className="font-semibold uppercase leading-[1.02] tracking-tightest text-paper"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}
            >
              {home.hero.title}
            </h1>
            <p
              className="mx-auto mt-5 max-w-2xl font-light text-paper/80"
              style={{ fontSize: "clamp(1.15rem, 2.6vw, 2rem)" }}
            >
              {home.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-12 w-full">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
              {home.hero.ctas.map((cta) => (
                <Button key={cta.label} href={cta.href} className="flex-1">
                  {cta.label}
                </Button>
              ))}
            </div>
          </Reveal>
        </Container>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-8 flex justify-center text-paper/40"
        >
          <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        </div>
      </ParallaxPanel>

      {/* ── 2. WORD CASCADE ──────────────────────────────────────────────── */}
      <Section tone="light" className="!py-32 md:!py-44">
        <Eyebrow>{home.intro.eyebrow}</Eyebrow>
        <WordCascade
          className="mt-8 max-w-4xl"
          text="We are UT Austin students who give nonprofits the strategy work they could never afford — free, every semester, for organizations doing real work in Austin."
        />
        <Reveal className="mt-12">
          <TextLink href={home.intro.cta.href}>{home.intro.cta.label}</TextLink>
        </Reveal>
      </Section>

      {/* ── 3. ZOOM REVEAL ───────────────────────────────────────────────── */}
      <ZoomReveal
        label={home.breakPanel.photo}
        src={home.breakPanel.photoSrc}
        kicker="Consulting for good"
        title={"Real clients.\nReal deliverables."}
        subtitle="Every semester, a new cohort takes on a scoped engagement and hands over work the organization actually owns."
      >
        <Button href="/projects">See our work</Button>
      </ZoomReveal>

      {/* ── 4. STATS ─────────────────────────────────────────────────────── */}
      {home.stats.length > 0 && (
        <Section tone="fog" className="!py-24">
          <dl className="grid gap-14 text-center sm:grid-cols-3">
            {home.stats.map((s) => (
              <Reveal key={s.label}>
                <dd
                  className="font-semibold tracking-tightest text-ink"
                  style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                >
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-3 text-[14px] text-graphite">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </Section>
      )}

      {/* ── 5. STICKY STACK ──────────────────────────────────────────────── */}
      <section className="bg-fog pb-32 pt-24">
        <Container>
          <Reveal className="mb-16">
            <Eyebrow>Who We Work With</Eyebrow>
            <Display className="mt-5 max-w-2xl">Three ways in.</Display>
          </Reveal>
        </Container>

        <Container>
          <StickyStack>
            {home.audiences.map((card) => (
              <div
                key={card.id}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-leaf">
                    {card.eyebrow}
                  </p>
                  <h3
                    className="mt-4 font-semibold tracking-tightest"
                    style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)" }}
                  >
                    {card.heading}
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-graphite">
                    {card.body}
                  </p>
                  <TextLink href={card.cta.href} className="mt-7">
                    {card.cta.label}
                  </TextLink>
                </div>
                <PhotoPlaceholder
                  label={card.photo}
                  src={card.photoSrc}
                  ratio="wide"
                />
              </div>
            ))}
          </StickyStack>
        </Container>
      </section>

      {/* ── 6. CIRCLE WIPE ───────────────────────────────────────────────── */}
      <CircleWipe
        label={home.circle.photo}
        src={home.circle.photoSrc}
        quote={home.breakPanel.quote}
        attribution="Texas 180 Degrees Consulting"
      />

      {/* ── 7. CLOSING ───────────────────────────────────────────────────── */}
      <Section tone="light">
        <Reveal className="text-center">
          <Display className="mx-auto max-w-2xl">Ready to get involved?</Display>
          <Lead className="mx-auto mt-6 max-w-lg">
            Applications open once a semester. Nonprofits can reach out any time.
          </Lead>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/join">Join the team</Button>
            <Button href="/services" className="bg-ink text-paper hover:bg-slate">
              Work with us
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
