import { SITE_URL, NAV_LINKS } from "@/lib/content";

// Generates /sitemap.xml from the nav automatically — add a page to
// NAV_LINKS in lib/content.js and it shows up here too.
export default function sitemap() {
  return NAV_LINKS.map((link) => ({
    url: `${SITE_URL}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
