import { SITE_URL } from "@/lib/content";

// Generates /robots.txt automatically — tells search engines to index the site
// and where to find the sitemap.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
