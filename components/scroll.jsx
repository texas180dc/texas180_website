"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL CHOREOGRAPHY
//
// Scroll position becomes a 0→1 number, written to the CSS variable --p on an
// element. CSS then does the animating in calc().
//
// PERFORMANCE RULES THIS FILE FOLLOWS — breaking any of them causes stutter:
//
//  1. ONE scroll listener and ONE requestAnimationFrame loop for the whole
//     page, not one per effect. See the scheduler below.
//  2. All getBoundingClientRect() calls happen together, then all style writes
//     happen together. Interleaving read-write-read-write forces the browser to
//     recalculate layout repeatedly within a single frame ("layout thrashing").
//  3. Animate transform and opacity only. Never width, height, top, or margin —
//     those trigger a full layout pass on every frame.
//  4. Never store scroll position in React state. That re-renders the component
//     tree 60 times a second. Write to a CSS variable instead.
//
// Every effect falls back to a static layout when "reduce motion" is on.
// ─────────────────────────────────────────────────────────────────────────────

import { Children, useEffect, useRef, useState } from "react";
import { SCROLL_EFFECTS } from "@/lib/content";

/* ── Shared scheduler ──────────────────────────────────────────────────────── */

const subscribers = new Set();
let frameQueued = false;
let listening = false;

function runFrame() {
  frameQueued = false;
  const vh = window.innerHeight;

  // READ PHASE — measure everything first, touching no styles.
  const measurements = [];
  for (const sub of subscribers) {
    const el = sub.ref.current;
    if (el) measurements.push([sub, el, el.getBoundingClientRect()]);
  }

  // WRITE PHASE — now apply, with no reads in between.
  for (const [sub, el, rect] of measurements) {
    let p;
    if (sub.mode === "pin") {
      // Measure the sticky stage rather than assuming it equals the viewport.
      // On mobile, `svh` and `innerHeight` differ, and that mismatch makes
      // progress finish early — which reads as a snap at the end of the pin.
      const stage = el.firstElementChild;
      const stageHeight = stage ? stage.offsetHeight : vh;
      const distance = rect.height - stageHeight;
      p = distance <= 0 ? 0 : -rect.top / distance;
    } else {
      p = (vh - rect.top) / (vh + rect.height);
    }
    p = p < 0 ? 0 : p > 1 ? 1 : p;

    // Skip writes the eye can't see — fewer style invalidations per frame.
    if (Math.abs(p - sub.last) < 0.0008) continue;
    sub.last = p;
    el.style.setProperty("--p", p.toFixed(4));
    // Eased companion. A linear inset/radius reaches "visually finished" long
    // before p hits 1, which reads as the animation freezing while you keep
    // scrolling. Squaring pushes the visible change later so it stays in step
    // with the scrollbar.
    el.style.setProperty("--e", (p * p).toFixed(4));
  }
}

function schedule() {
  if (!frameQueued) {
    frameQueued = true;
    requestAnimationFrame(runFrame);
  }
}

function subscribe(sub) {
  subscribers.add(sub);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  schedule();

  return () => {
    subscribers.delete(sub);
    if (subscribers.size === 0 && listening) {
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }
  };
}

/* ── Hooks ─────────────────────────────────────────────────────────────────── */

/**
 * Whether to fall back to static layouts.
 *
 * Controlled by SCROLL_EFFECTS.respectReducedMotion in lib/content.js.
 * Set to false (the current setting), animations always play, regardless of
 * the visitor's OS "reduce motion" preference.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!SCROLL_EFFECTS.respectReducedMotion) {
      setReduced(false);
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Writes scroll progress to --p on `ref`.
 * Returns true when the effect should render its static fallback.
 */
export function useScrollProgress(
  ref,
  { mode = "view", restingValue = 1, enabled = true } = {}
) {
  const reduced = usePrefersReducedMotion();
  const off = reduced || !enabled;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (off) {
      el.style.setProperty("--p", String(restingValue));
      el.style.setProperty("--e", String(restingValue * restingValue));
      return;
    }

    return subscribe({ ref, mode, last: -1 });
  }, [ref, mode, off, restingValue]);

  return off;
}

/* ── Shared placeholder texture ────────────────────────────────────────────── */

/**
 * Diagonal hatch marking a placeholder.
 *
 * Uses a small tiled background rather than `repeating-linear-gradient` across
 * the whole element: a repeating gradient over a full screen is rasterized as
 * one enormous tile, which is slow to redraw. A 16px tile is cached once and
 * repeated by the compositor.
 */
function Hatch({ opacity = 0.3, gap = 16 }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(45deg, rgba(141,198,63,0.6) 0 2px, transparent 2px)",
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. ZOOM REVEAL
   A panel opens from a small centred card to fill the screen.

   Implemented with clip-path, NOT scale. Scaling a full-screen layer that
   contains text and gradients forces the browser to re-rasterize all of it at
   a new resolution on every frame — that is expensive and shows up as stutter.
   Clipping leaves the content untouched at its final size and only changes
   which part of it is visible, so there is nothing to redraw.
   ═══════════════════════════════════════════════════════════════════════════ */

export function ZoomReveal({ label, kicker, title, subtitle, children, src }) {
  const outer = useRef(null);
  const off = useScrollProgress(outer, {
    mode: "pin",
    restingValue: 1,
    enabled: SCROLL_EFFECTS.zoom,
  });

  return (
    <section
      ref={outer}
      className={`relative bg-paper ${off ? "" : "h-[170svh]"}`}
      style={{ "--p": 0, "--e": 0 }}
    >
      <div
        className={`${
          off ? "relative min-h-[70svh]" : "sticky top-0"
        } flex h-svh items-center justify-center overflow-hidden`}
      >
        <div
          className="relative h-full w-full bg-ink"
          style={{
            // The card opens outward from the centre. Content never moves.
            clipPath:
              "inset(calc(21% * (1 - var(--e))) calc(21% * (1 - var(--e))) round calc(44px * (1 - var(--e))))",
            WebkitClipPath:
              "inset(calc(21% * (1 - var(--e))) calc(21% * (1 - var(--e))) round calc(44px * (1 - var(--e))))",
            transform: "translateZ(0)",
          }}
        >
          {src ? (
            <img
              src={src}
              alt={label}
              /*
               * eager, NOT lazy. A lazy image starts downloading and decoding
               * the moment it nears the viewport — which is exactly when this
               * animation starts. Decoding a multi-megapixel JPEG blocks the
               * main thread and the panel freezes part-way open.
               */
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              // Own compositor layer, so expanding the clip composites
              // rather than repainting the photo every frame
              style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            />
          ) : (
            <div
              className="absolute inset-0 bg-leaf/25"
              role="img"
              aria-label={`Placeholder: ${label}`}
            >
              <Hatch />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            {kicker && (
              <p
                className="text-[12px] font-semibold uppercase tracking-[0.28em] text-leaf"
                style={{ opacity: "calc(var(--e) * 4 - 0.1)", willChange: "opacity" }}
              >
                {kicker}
              </p>
            )}

            {/* Fades in as the card opens, so it is never clipped mid-word */}
            <h2
              className="mt-5 max-w-4xl font-semibold uppercase leading-[1.03] tracking-tightest text-paper"
              style={{
                fontSize: "clamp(1.8rem, 5.4vw, 4.6rem)",
                opacity: "calc(var(--e) * 2.6 - 0.35)",
                willChange: "opacity",
              }}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-paper/70 md:text-[19px]"
                style={{ opacity: "calc(var(--e) * 2.4 - 0.8)", willChange: "opacity" }}
              >
                {subtitle}
              </p>
            )}

            {children && (
              <div className="mt-9" style={{ opacity: "calc(var(--e) * 2.6 - 1.4)", willChange: "opacity" }}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. WORD CASCADE
   Each word lifts from faint to solid as the paragraph scrolls past.
   No CSS transition on the words — the scroll itself supplies the smoothness,
   and a transition would fight the per-frame updates.
   ═══════════════════════════════════════════════════════════════════════════ */

export function WordCascade({ text, dark = false, className = "" }) {
  const ref = useRef(null);
  const off = useScrollProgress(ref, {
    mode: "view",
    restingValue: 1,
    enabled: SCROLL_EFFECTS.words,
  });

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={`font-semibold leading-[1.25] tracking-tightest ${className}`}
      style={{ "--p": 0, fontSize: "clamp(1.6rem, 3.6vw, 3rem)" }}
    >
      {words.map((word, i) => {
        const start = ((i / words.length) * 0.7).toFixed(3);
        return (
          <span
            key={`${word}-${i}`}
            className={dark ? "text-paper" : "text-ink"}
            style={{ opacity: `calc((var(--p) - ${start}) * 6)` }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. CIRCLE WIPE
   A circle opens from the centre of the screen to reveal a full-bleed panel.
   ═══════════════════════════════════════════════════════════════════════════ */

export function CircleWipe({ label, quote, attribution, src }) {
  const outer = useRef(null);
  const off = useScrollProgress(outer, {
    mode: "pin",
    restingValue: 1,
    enabled: SCROLL_EFFECTS.circle,
  });

  return (
    <section
      ref={outer}
      className={`relative bg-paper ${off ? "" : "h-[150svh]"}`}
      style={{ "--p": 0, "--e": 0 }}
    >
      <div
        className={`${
          off ? "relative min-h-[70svh]" : "sticky top-0"
        } flex h-svh items-center justify-center overflow-hidden`}
      >
        <div
          className="absolute inset-0 bg-ink"
          style={{
            clipPath: "circle(calc(var(--p) * 72%) at 50% 50%)",
            WebkitClipPath: "circle(calc(var(--p) * 72%) at 50% 50%)",
            // Promote to its own layer. `will-change: clip-path` is avoided
            // deliberately — in some browsers it pushes clipping off the
            // compositor and onto the main thread, which is the opposite
            // of what we want.
            transform: "translateZ(0)",
          }}
        >
          {src ? (
            <img
              src={src}
              alt={label}
              /*
               * eager, NOT lazy. A lazy image starts downloading and decoding
               * the moment it nears the viewport — which is exactly when this
               * animation starts. Decoding a multi-megapixel JPEG blocks the
               * main thread and the panel freezes part-way open.
               */
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              // Own compositor layer, so expanding the clip composites
              // rather than repainting the photo every frame
              style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            />
          ) : (
            <div
              className="absolute inset-0 bg-leaf/20"
              role="img"
              aria-label={`Placeholder: ${label}`}
            >
              <Hatch opacity={0.35} gap={18} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink/90" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div
              className="max-w-4xl text-center"
              style={{
                opacity: "calc(var(--p) * 2.4 - 1.05)",
                transform: "translate3d(0, calc(28px * (1 - var(--p))), 0)",
                willChange: "opacity, transform",
              }}
            >
              <p
                className="font-semibold leading-[1.18] tracking-tightest text-paper"
                style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)" }}
              >
                {quote}
              </p>
              {attribution && (
                <p className="mt-8 text-[13px] uppercase tracking-[0.28em] text-leaf">
                  {attribution}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-40 w-40 rounded-full border border-ink/15"
          style={{
            opacity: "calc(0.9 - var(--p) * 4)",
            transform: "scale(calc(1 + var(--p) * 2))",
          }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. STICKY STACK
   Cards pin one after another and stack like a deck being dealt.
   Pure CSS sticky — no scroll maths, so nothing to stutter.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Pass the cards in as children — one element per card:
 *
 *   <StickyStack>
 *     {items.map((item) => <MyCard key={item.id} {...item} />)}
 *   </StickyStack>
 *
 * NOTE: this takes children rather than an `items` + `renderItem` pair on
 * purpose. This file is a client component, and React Server Components
 * cannot pass a function across the server/client boundary — a `renderItem`
 * prop throws "Functions cannot be passed directly to Client Components".
 * Already-rendered children serialise fine.
 */
export function StickyStack({ children }) {
  const reduced = usePrefersReducedMotion();
  const cards = Children.toArray(children);

  if (reduced || !SCROLL_EFFECTS.stack) {
    return <div className="grid gap-10 md:grid-cols-3">{cards}</div>;
  }

  return (
    <div className="relative">
      {cards.map((card, i) => (
        <div
          key={i}
          className="sticky"
          style={{
            top: `calc(7.5rem + ${i * 1.75}rem)`,
            marginBottom: i === cards.length - 1 ? 0 : "14vh",
            zIndex: i + 1,
          }}
        >
          <div className="rounded-3xl border border-hairline bg-paper p-8 md:p-12">
            {card}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. HORIZONTAL RAIL — continuous logo marquee
   A row that scrolls sideways on its own, forever, independent of the page
   scroll. Pure CSS animation: nothing runs on the main thread.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * One logo tile.
 *
 * Shows the image from /public/logos/. If that file doesn't exist yet (or
 * fails to load), it quietly falls back to a clean text tile instead of a
 * broken-image icon — so you can add logos one at a time without the row ever
 * looking unfinished.
 */
function LogoTile({ client, hidden }) {
  const name = typeof client === "string" ? client : client.name;
  const local = typeof client === "string" ? null : client.logo;
  const remote = typeof client === "string" ? null : client.remote;

  // Three tiers, in order of preference:
  //   0 = local file in public/logos/  (what you want long term)
  //   1 = temporary remote URL         (works until Squarespace is cancelled)
  //   2 = plain text tile              (always works)
  const sources = [local && `/logos/${local}`, remote].filter(Boolean);
  const [tier, setTier] = useState(0);
  const src = sources[tier];

  return (
    <li
      aria-hidden={hidden ? "true" : undefined}
      // margin-right, not flex `gap`: see the note in globals.css
      className="mr-4 flex h-32 w-60 flex-shrink-0 items-center justify-center rounded-2xl border border-hairline bg-paper px-7"
    >
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          // Fall through to the next source, then to the text tile
          onError={() => setTier((t) => t + 1)}
          // Greyscale at rest, full colour on hover — keeps a wall of clashing
          // brand colours from fighting the page palette.
          className="max-h-16 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="text-center text-[15px] font-medium leading-snug tracking-tight text-ink/75">
          {name}
        </span>
      )}
    </li>
  );
}

export function HorizontalRail({
  heading,
  eyebrow,
  items,
  seconds = 70,
  reverse = false,
}) {
  // Two identical copies. The animation slides the track exactly half its
  // width, so copy two lands where copy one started and the seam is invisible.
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden bg-fog py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10">
        {eyebrow && (
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-leaf">
            {eyebrow}
          </p>
        )}
        <h2
          className="mt-5 max-w-2xl font-semibold tracking-tightest"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
        >
          {heading}
        </h2>
      </div>

      <div className="marquee mt-14">
        <ul
          className={`marquee-track ${reverse ? "is-reverse" : ""}`}
          style={{ "--marquee-duration": `${seconds}s` }}
        >
          {loop.map((client, i) => (
            <LogoTile
              key={`${typeof client === "string" ? client : client.name}-${i}`}
              client={client}
              hidden={i >= items.length}
            />
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-10 w-full max-w-[1120px] px-6 text-[13px] text-graphite md:px-10">
        Hover to pause.
      </p>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. COUNT UP
   Numbers roll from zero the first time they're seen. Runs once, off the
   shared scroll loop entirely.
   ═══════════════════════════════════════════════════════════════════════════ */

export function CountUp({ value, duration = 1400 }) {
  const target = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const suffix = String(value).replace(/[0-9.]/g, "");

  const ref = useRef(null);

  // Starts at the FINAL value, not zero. That way the real number is what gets
  // server-rendered and what shows if JavaScript never runs — a visitor should
  // never be shown "0+". The count-down-then-up only happens once we know the
  // browser can actually animate it.
  const [display, setDisplay] = useState(target);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(target);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setDisplay(target);
      return;
    }

    setDisplay(0); // safe now — we know we can animate back up
    let raf = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const started = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - started) / duration);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
