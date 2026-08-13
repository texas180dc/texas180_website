import Link from "next/link";
import { CONTENT, NAV_LINKS, SOCIAL, CONTACT_EMAIL } from "@/lib/content";

export default function Footer() {
  const { footer } = CONTENT;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink py-16 text-paper">
      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="text-[15px] font-semibold tracking-tight">
              {footer.brand}
            </p>
            <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-paper/50">
              {footer.tagline}
            </p>
          </div>

          {/* Pages */}
          <nav aria-label="Footer">
            <p className="text-[11px] uppercase tracking-[0.24em] text-paper/40">
              Pages
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-paper/70 transition-colors hover:text-leaf"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-paper/40">
              Connect
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="break-words text-[14px] text-paper/70 transition-colors hover:text-leaf"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              {[
                { label: "Instagram", href: SOCIAL.instagram },
                { label: "LinkedIn", href: SOCIAL.linkedin },
                { label: "180DC Global", href: SOCIAL.global },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-paper/70 transition-colors hover:text-leaf"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col gap-2 border-t border-paper/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-[12px] text-paper/35">
            © {year} Texas 180 Degrees Consulting · The University of Texas at Austin
          </p>
          <p className="text-[12px] text-paper/35">
            Member of 180 Degrees Consulting Global
          </p>
        </div>
      </div>
    </footer>
  );
}
