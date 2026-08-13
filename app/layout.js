import "./globals.css";
import { CONTENT, SITE_URL, SOCIAL, CONTACT_EMAIL } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─────────────────────────────────────────────────────────────────────────────
// SEO / social sharing. Driven by lib/content.js — no need to edit here.
// ─────────────────────────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: CONTENT.meta.title,
    template: "%s | Texas 180 Degrees Consulting",
  },
  description: CONTENT.meta.description,
  keywords: CONTENT.meta.keywords,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Texas 180 Degrees Consulting",
    title: CONTENT.meta.title,
    description: CONTENT.meta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: CONTENT.meta.title,
    description: CONTENT.meta.description,
  },
};

export const viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
};

// Structured data — tells Google this is a real UT Austin student organization.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Texas 180 Degrees Consulting",
  alternateName: "180 Degrees Consulting at UT Austin",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description: CONTENT.meta.description,
  areaServed: { "@type": "City", name: "Austin, Texas" },
  parentOrganization: {
    "@type": "Organization",
    name: "180 Degrees Consulting",
    url: SOCIAL.global,
  },
  memberOf: {
    "@type": "CollegeOrUniversity",
    name: "The University of Texas at Austin",
    url: "https://www.utexas.edu",
  },
  sameAs: [SOCIAL.instagram, SOCIAL.linkedin],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-leaf focus:px-5 focus:py-2 focus:text-[13px] focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>

        {/*
          1px marker at the top of the document. Nav watches it with an
          IntersectionObserver to decide when to show its background, which
          avoids a scroll listener running on every page.
        */}
        <div
          id="nav-sentinel"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-6 w-px"
        />

        <Nav />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
