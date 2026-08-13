"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SOCIAL } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // The bar gets a background once you scroll off the top.
  //
  // Detected by watching a 1px sentinel at the top of the document rather than
  // by listening to scroll. An IntersectionObserver is evaluated by the browser
  // off the main thread, so this costs nothing per frame; a scroll listener
  // would run on every single scroll event on every page.
  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  // While the menu is open: lock page scroll, allow Esc to close.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        // NOTE: deliberately no backdrop-blur here.
        // A `position: fixed` element with `backdrop-filter` is a documented
        // "main thread scrolling reason" in Chrome — it forces the ENTIRE page
        // off the compositor and onto the main thread, which makes every page
        // stutter while scrolling, not just the animated ones. A solid
        // background costs nothing and looks the same over a dark hero.
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !menuOpen
            ? "border-b border-paper/10 bg-ink"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-6 md:px-10"
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-baseline gap-2 text-paper"
            aria-label="Texas 180 Degrees Consulting — home"
          >
            <span className="text-[17px] font-semibold tracking-tight">180</span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-paper/60">
              Texas
            </span>
          </Link>

          {/* Desktop tabs */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative text-[13px] tracking-wide transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-paper"
                    : "text-paper/60 hover:text-paper"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-leaf" />
                )}
              </Link>
            ))}
          </div>

          {/* Social icons — desktop */}
          <div className="hidden items-center gap-3 md:flex">
            <SocialIcon href={SOCIAL.instagram} label="Instagram">
              <circle cx="12" cy="12" r="4" />
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </SocialIcon>
            <SocialIcon href={SOCIAL.linkedin} label="LinkedIn">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4" />
            </SocialIcon>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative z-50 text-[13px] text-paper md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-ink md:hidden"
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-24">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b border-paper/10 py-5 text-3xl font-semibold tracking-tight transition-colors ${
                isActive(link.href) ? "text-leaf" : "text-paper hover:text-leaf"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-auto flex gap-6 pt-10">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-paper/60 hover:text-leaf"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-paper/60 hover:text-leaf"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/** Circular outlined social icon button. */
function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper/70 transition-colors duration-200 hover:border-leaf hover:text-leaf"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}
