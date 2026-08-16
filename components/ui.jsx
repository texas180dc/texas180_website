"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI KIT
// Building blocks used across every page. You shouldn't need to edit this file
// to change content — use lib/content.js for that.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/components/scroll";
import { SCROLL_EFFECTS } from "@/lib/content";

/* ── Layout ────────────────────────────────────────────────────────────────── */

/** Standard page gutter + max width. */
export function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/**
 * A full-width page section.
 *   tone="light" | "fog" | "dark"
 *   bleed="dark" | "light"  → fades this section's bottom edge into the next
 */
export function Section({
  id,
  tone = "light",
  bleed,
  className = "",
  children,
}) {
  const tones = {
    light: "bg-paper text-ink",
    fog: "bg-fog text-ink",
    dark: "bg-ink text-paper",
  };

  const bleedClass =
    bleed === "dark" ? "bleed-to-dark" : bleed === "light" ? "bleed-to-light" : "";

  return (
    <section
      id={id}
      className={`relative py-24 md:py-36 ${tones[tone]} ${bleedClass} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* ── Scroll reveal ─────────────────────────────────────────────────────────── */

/**
 * Fades and lifts its children into view on scroll.
 * `delay` staggers items in a row (in milliseconds).
 */
/*
 * ONE IntersectionObserver shared by every Reveal on the page.
 * Creating an observer per element meant ~40 observers on the home page, each
 * doing its own intersection bookkeeping. A single observer with many targets
 * is dramatically cheaper and is what the API is designed for.
 */
let sharedObserver = null;

function observeReveal(el) {
  if (typeof IntersectionObserver === "undefined") {
    el.classList.add("is-visible");
    return () => {};
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            sharedObserver.unobserve(entry.target); // animate once
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
  }

  sharedObserver.observe(el);
  return () => sharedObserver && sharedObserver.unobserve(el);
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!SCROLL_EFFECTS.reveal) {
      el.classList.add("is-visible");
      return;
    }

    return observeReveal(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ── Photo placeholders ────────────────────────────────────────────────────── */

/**
 * A green placeholder block marking where a real photo goes.
 *
 * Drop a real image in later by replacing the whole component with:
 *   pass a `src` prop naming a file inside public/photos/
 *
 * Props:
 *   label   — caption describing what photo belongs here
 *   ratio   — "wide" | "square" | "portrait" | "hero"
 *   subtle  — muted version, for backgrounds behind text
 */
export function PhotoPlaceholder({
  label = "Photo",
  ratio = "wide",
  subtle = false,
  className = "",
  src, // path to a file in public/photos — when set, the real image is shown
}) {
  const ratios = {
    hero: "aspect-[16/9] md:aspect-[21/9]",
    wide: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  // Real photo. `object-cover` fills the frame at any aspect ratio without
  // squashing; the alt text is the slot label, which is already descriptive.
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-fog ${ratios[ratio]} ${className}`}
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${ratios[ratio]} ${
        subtle ? "bg-leaf/15" : "bg-leaf/30"
      } ${className}`}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      {/* Diagonal hatch so it reads as an empty slot, not a design element */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          // Tiled 14px square rather than one huge repeating gradient
          backgroundImage:
            "linear-gradient(45deg, rgba(141,198,63,0.5) 0 2px, transparent 2px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <span className="text-center text-[11px] font-medium uppercase tracking-[0.28em] text-ink/55">
          {label}
        </span>
      </div>
    </div>
  );
}

/**
 * Full-bleed background photo slot with a parallax drift and a dark scrim,
 * so white text stays readable on top. Used for hero and break panels.
 */
export function ParallaxPanel({
  label = "Background photo",
  children,
  minHeight = "min-h-[92svh]",
  className = "",
  src, // when set, the real photo sits behind the scrim instead of the placeholder
}) {
  const ref = useRef(null);

  // Drives --p through the shared scroll loop, but ONLY when parallax is on.
  // This component sits at the top of every page, so anything it does on
  // scroll costs on every page.
  useScrollProgress(ref, {
    mode: "view",
    restingValue: 0.5,
    enabled: SCROLL_EFFECTS.parallax,
  });

  const drift = SCROLL_EFFECTS.parallax
    ? "translate3d(0, calc((var(--p) - 0.5) * -12vh), 0) scale(1.16)"
    : "scale(1.04)";

  return (
    <div
      ref={ref}
      className={`relative isolate overflow-hidden bg-ink ${minHeight} ${className}`}
      style={{ "--p": 0.5 }}
    >
      {/* Real photo, when one has been supplied */}
      {src && (
        <div className="absolute inset-0 -z-10" style={{ transform: drift }}>
          <img
            src={src}
            alt={label}
            // Heroes are the first thing on screen — load eagerly, not lazily.
            // Lowercase attribute name: React 18 doesn't recognise the
            // camelCase `fetchPriority` and warns on every render.
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Placeholder layer, only while there's no photo */}
      <div
        className={`absolute inset-0 -z-10 bg-leaf/25 ${src ? "hidden" : ""}`}
        style={{ transform: drift }}
        role="img"
        aria-label={`Placeholder: ${label}`}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            // Tiled 16px square — this layer is full-screen and moving, so a
            // single giant gradient tile would be costly to redraw.
            backgroundImage:
              "linear-gradient(45deg, rgba(141,198,63,0.6) 0 2px, transparent 2px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      {/* Scrim: keeps white text legible over whatever photo goes here */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/60 to-ink/90" />

      {children}
    </div>
  );
}

/* ── Typography ────────────────────────────────────────────────────────────── */

/** Large display heading. Use "\n" in the text for a manual line break. */
export function Display({
  as: Tag = "h2",
  size = "clamp(2.4rem, 5.5vw, 4.2rem)",
  className = "",
  children,
}) {
  return (
    <Tag
      className={`font-semibold tracking-tightest leading-[1.05] whitespace-pre-line ${className}`}
      style={{ fontSize: size }}
    >
      {children}
    </Tag>
  );
}

/** Small uppercase eyebrow label above a heading. */
export function Eyebrow({ className = "", children }) {
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[0.22em] text-leaf ${className}`}
    >
      {children}
    </p>
  );
}

/** Body copy at a comfortable reading size. */
export function Lead({ dark = false, className = "", children }) {
  return (
    <p
      className={`text-[17px] md:text-[19px] leading-[1.65] ${
        dark ? "text-paper/70" : "text-graphite"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/* ── Buttons and links ─────────────────────────────────────────────────────── */

/**
 * Solid pill button.
 *
 *   tone="leaf" (default) — green pill, dark text
 *   tone="ink"            — near-black pill, white text
 *
 * Use the `tone` prop rather than pushing colours through `className`.
 * Tailwind resolves conflicting utilities by CSS source order, not by their
 * order in the class string, so `className="bg-ink"` layered over a base
 * `bg-leaf` wins unpredictably — which is how one pill ended up green with
 * white text while its neighbour was green with dark text.
 */
const BUTTON_TONES = {
  leaf: "bg-leaf text-ink hover:bg-leaf-dark",
  ink: "bg-ink text-paper hover:bg-slate",
};

export function Button({
  href,
  children,
  tone = "leaf",
  className = "",
  external,
  ...rest
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-[15px] font-medium transition-colors duration-300 ${BUTTON_TONES[tone]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Outlined pill. The secondary action next to a Button. */
export function ButtonGhost({
  href,
  children,
  dark = false,
  className = "",
  external,
  ...rest
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className={`inline-flex items-center justify-center rounded-full border px-7 py-3 text-[15px] font-medium transition-colors duration-300 ${
        dark
          ? "border-paper/35 text-paper hover:border-leaf hover:text-leaf"
          : "border-ink/25 text-ink hover:border-leaf hover:text-leaf"
      } ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Understated inline link with a trailing chevron, Apple-style. */
export function TextLink({ href, children, className = "", external, ...rest }) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      className={`group inline-flex items-center gap-1 text-[15px] font-medium text-leaf transition-colors hover:text-leaf-dark ${className}`}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        ›
      </span>
    </a>
  );
}
