import { Container, Display, Eyebrow, ParallaxPanel, Reveal } from "@/components/ui";

/**
 * The dark hero at the top of every interior page.
 * Keeping the top of each page dark is what lets the fixed nav stay
 * white-on-transparent without a visibility problem.
 */
export default function PageHero({ eyebrow, heading, body, photo, photoSrc }) {
  return (
    <ParallaxPanel
      label={photo}
      minHeight="min-h-[58svh] md:min-h-[66svh]"
    >
      <Container className="flex min-h-[58svh] flex-col justify-end pb-20 pt-32 md:min-h-[66svh] md:pb-28">
        <Reveal>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Display as="h1" className="mt-5 max-w-3xl text-paper">
            {heading}
          </Display>
          {body && (
            <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-paper/70 md:text-[19px]">
              {body}
            </p>
          )}
        </Reveal>
      </Container>
    </ParallaxPanel>
  );
}
