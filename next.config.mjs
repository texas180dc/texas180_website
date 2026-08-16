/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * REDIRECTS FROM THE OLD SQUARESPACE URLS
   *
   * The old site used different paths (/our-team, /join-us, …). Google indexed
   * those over seven years, so they still appear in search results and on other
   * sites that linked to us. Without these rules every one of them 404s.
   *
   * `permanent: true` sends a 308, which tells Google the page has *moved* —
   * it transfers the old URL's accumulated ranking to the new one and updates
   * the search listing. A temporary redirect would not.
   *
   * Keep these forever. They cost nothing and old links live a long time.
   */
  async redirects() {
    return [
      // About — the old site split this across three pages
      { source: "/our-mission", destination: "/about", permanent: true },
      { source: "/our-team", destination: "/about", permanent: true },
      { source: "/our-alumni", destination: "/about", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },

      // Services
      { source: "/our-services", destination: "/services", permanent: true },

      // Recruitment
      { source: "/join-us", destination: "/join", permanent: true },

      // Squarespace's default alternate home page
      { source: "/home-2", destination: "/", permanent: true },

      // Squarespace adds a cart route to every site; we have no shop
      { source: "/cart", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
