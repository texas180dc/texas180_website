// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT — the only file you need to edit to update the website.
//
// No coding knowledge required. Change the text between the "quotes" and save.
// Anything marked  UPDATE  should be checked at the start of every semester.
//
// Most of the copy below was carried over from the live texas180dc.org so the
// wording your officers already approved is preserved.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.texas180dc.org";

// ─── SCROLL EFFECTS ──────────────────────────────────────────────────────────
// Master switches. Set any to false and that effect becomes a plain static
// section — no scroll maths, no animation, nothing to stutter.
export const SCROLL_EFFECTS = {
  // false = animations always play, even for visitors whose operating system
  // is set to "reduce motion". See the note at the bottom of app/globals.css
  // before changing this.
  respectReducedMotion: false,

  parallax: false, // background drift on page heroes (runs on EVERY page)
  zoom: true, // the panel that opens to fill the screen
  circle: true, // the circular wipe
  stack: true, // the stacking audience cards on Home
  words: true, // word-by-word text cascade
  reveal: true, // fade-and-rise on elements entering view
};
// The client marquee is a self-running CSS animation, not scroll-driven.
// Change its speed with the `seconds` prop in app/projects/page.js.

export const CONTACT_EMAIL = "texas@180dc.org"; // UPDATE if the inbox changes

export const SOCIAL = {
  instagram: "https://www.instagram.com/texas180dc/",
  linkedin: "https://www.linkedin.com/company/texas-180-degrees-consulting",
  global: "https://180dc.org",
};

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
// Each tab is a real page in the /app folder.
// To add a tab: add it here AND create app/<slug>/page.js.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Join Us", href: "/join" },
];

export const CONTENT = {
  meta: {
    title: "Texas 180 Degrees Consulting | UT Austin",
    description:
      "The UT Austin branch of 180 Degrees Consulting — students delivering pro bono strategy consulting for nonprofits and social impact organizations in Austin.",
    keywords: [
      "Texas 180 Degrees Consulting",
      "180 Degrees Consulting UT Austin",
      "UT Austin consulting club",
      "pro bono consulting Austin",
      "nonprofit consulting Austin",
    ],
  },

  // ─── HOME ──────────────────────────────────────────────────────────────────
  home: {
    hero: {
      title: "180 Degrees Consulting",
      subtitle: "The University of Texas at Austin",
      photo: "The Texas 180 chapter together on the UT Austin campus",
      photoSrc: "/photos/fun-group-photo.jpg",
    },

    intro: {
      eyebrow: "Who We Are",
      heading: "Consulting\nfor good.",
      cta: { label: "More about us", href: "/about" },
      // No image slot in this section — the intro is text-only.
      // /photos/vertical-group-photo.jpg is spare if you want one here.
      photo: "The Texas 180 chapter on the steps of the UT campus",
    },

    // UPDATE: confirm with an officer, or set to [] to hide the row.
    stats: [
      { value: "30+", label: "Organizations served" },
      { value: "8", label: "Years in Austin" },
      { value: "33+", label: "Countries in the 180DC network" },
    ],

    audiences: [
      {
        id: "students",
        eyebrow: "For Students",
        heading: "Build real experience.",
        body: "Learn to think and solve problems like a consultant, and acquire skills that translate to any industry you pursue. Our curriculum teaches you to problem solve and present findings to a real client.",
        cta: { label: "How to join", href: "/join" },
        photo: "Texas 180 consultants on campus",
        photoSrc: "/photos/consultants-outside.jpg",
      },
      {
        id: "nonprofits",
        eyebrow: "For Nonprofits",
        heading: "Strategy at no cost.",
        body: "Your organization receives pro bono consulting from a team of UT Austin students. We work closely with you across an 8–10 week engagement to deliver solutions you can act on.",
        cta: { label: "Our services", href: "/services" },
        photo: "Texas 180 project team",
        photoSrc: "/photos/client-team-trio.jpg",
      },
      {
        id: "sponsors",
        eyebrow: "For Sponsors & Alumni",
        heading: "Stay connected.",
        body: "Support the next generation of purpose-driven consultants. Mentor students, speak at events, or sponsor a semester of pro bono work in Austin.",
        cta: {
          label: "Get involved",
          href: `mailto:${CONTACT_EMAIL}?subject=Sponsorship%20Inquiry`,
        },
        photo: "Texas 180 members and guests at the end-of-year banquet",
        photoSrc: "/photos/sponsor-banquet.jpg",
      },
    ],

    // Full-bleed panel revealed by the circular wipe
    circle: {
      photo: "The Texas 180 chapter on the steps of Main Building",
      photoSrc: "/photos/vertical-group-photo.jpg",
    },

    breakPanel: {
      quote:
        "Every semester, a new cohort takes on real engagements for organizations doing real work in Austin.",
      photo: "Texas 180 Degrees Consulting members in front of the UT Tower",
      photoSrc: "/photos/fa24-class-photo.jpg",
    },
  },

  // ─── ABOUT ─────────────────────────────────────────────────────────────────
  about: {
    hero: {
      eyebrow: "About Us",
      heading: "Driven students.\nReal impact.",
      body: "We became a branch of 180 Degrees Consulting in Fall 2018. We're UT students who want to make a difference through consulting, and we welcome new members every semester.",
      photo: "Texas 180 Degrees Consulting members on the UT Austin campus",
      photoSrc: "/photos/group-photo-stairs.jpg",
    },
    mission: {
      eyebrow: "Our Mission",
      heading: "Why we do this.",
      body: [
        "Texas 180 Degrees Consulting is designed to help students gain access to real-world consulting experience as they provide support to local nonprofit organizations.",
        "These organizations typically lack the resources — time, money, professionals — to carry out their strategic visions. This is where we come in. As students at The University of Texas at Austin, we advise nonprofits on opportunities that provide strategic and operational efficiencies.",
        "At the same time, consultants get hands-on experience alongside preparation for a consulting career through workshops run during our general meetings.",
      ],
    },

    // Core values, carried over from the live site.
    values: [
      {
        title: "Collaboration",
        body: "We value collaboration in the work we do with our clients and one another. When we combine our strengths towards a common cause, we achieve measurable impact for our clients and for the organization as a whole.",
      },
      {
        title: "Drive",
        body: "Our consultants are driven to make positive change in our Austin community. We aim to be the driving force of change in nonprofits and on the UT Austin campus.",
      },
      {
        title: "Service",
        body: "We value leaders who are passionate about service and giving back to the community. We use the outlet of consulting to truly make a difference with our clients. It is a passion for service that differentiates 180 from any other organization.",
      },
      {
        title: "Impact",
        body: "At 180, we strive to make an impact. We aim to exceed deliverables with clients while fostering relationships with one another, all with the common mission of creating a lasting impact on the community around us.",
      },
    ],

    // ── OFFICERS ────────────────────────────────────────────────────────────
    // UPDATE each semester. Pulled from texas180dc.org — VERIFY titles and
    // majors before launch, and add `photo: "filename.jpg"` (in public/team/)
    // once you have headshots.
    team: {
      eyebrow: "Our Team",
      heading: "The people behind it.",
      officersLabel: "Executive Officers",
      // Current slate. Entries with a blank `detail`, `email`, or `linkedin`
      // simply omit that line — fill them in as you collect them.
      officers: [
        {
          name: "Govind Pattathil",
          role: "President",
          photo: "/team/govind-pattathil.jpg",
          detail: "Senior, Business Honors, Finance & Sustainability Studies",
          email: "texas@180dc.org",
          linkedin: "https://www.linkedin.com/in/govind-pattathil/",
        },
        {
          name: "Shiv Jarodiya",
          role: "Internal Director",
          photo: "/team/shiv-jarodiya.jpg",
          detail: "Senior, Finance & Informatics",
          email: "sjarodiya@180dc.org",
          linkedin: "https://www.linkedin.com/in/shiv-jarodiya/",
        },
        {
          name: "Priyanka Parkar",
          role: "Projects Director",
          photo: "/team/priyanka-parkar.jpg",
          detail: "", // UPDATE: year & major
          email: "texas@180dc.org", // UPDATE if they have a @180dc.org address
          linkedin: "", // UPDATE
        },
        {
          name: "Roberta Torres",
          role: "External Director",
          photo: "/team/roberta-torres.jpg",
          detail: "", // UPDATE: year & major
          email: "texas@180dc.org", // UPDATE
          linkedin: "", // UPDATE
        },
        {
          name: "Amit Konda",
          role: "Consulting Director",
          photo: "/team/amit-konda.jpg",
          detail: "", // UPDATE: year & major
          email: "texas@180dc.org", // UPDATE
          linkedin: "", // UPDATE
        },
        {
          name: "Sahithi Myana",
          role: "Marketing Director",
          photo: "/team/sahithi-myana.jpg",
          detail: "", // UPDATE: year & major
          email: "marketingdirector@180dc.org", // UPDATE if this has changed
          linkedin: "", // UPDATE
        },
      ],

      leadsLabel: "Project Leads",
      leadsHeading: "Led last semester's\nengagements.",
      leads: [
        { name: "Shaun Joseph", client: "More Than Welcome", detail: "Sophomore, Finance" },
        { name: "Aidan Tacinelli", client: "HomeAid Austin", detail: "Sophomore, Economics & International Relations" },
        { name: "Sua Lee", client: "Art from the Streets", detail: "Sophomore, Business Honors" },
        { name: "Kartik Mathur", client: "BookSpring", detail: "Sophomore, Business Honors" },
        { name: "Maya Murali", client: "The Charlie Center", detail: "Sophomore, Environmental Science" },
        { name: "Nora Nazrul", client: "Magdalene House", detail: "Sophomore, Business Honors & Plan II Honors" },
      ],
    },

    global: {
      heading: "Part of something bigger.",
      body: "180 Degrees Consulting is the world's largest university-based consultancy for nonprofits and social enterprises — a network spanning 33+ nations and 5,000+ consultants.",
      cta: { label: "Visit 180DC Global", href: SOCIAL.global },
    },
  },

  // ─── SERVICES ──────────────────────────────────────────────────────────────
  services: {
    hero: {
      eyebrow: "Our Services",
      heading: "What we provide.",
      body: "Your nonprofit receives pro bono consulting from a group of talented students at The University of Texas at Austin. We work closely with you and your organization to provide effective solutions.",
      photo: "Texas 180 consultants at UT Austin",
      photoSrc: "/photos/doorway-team.jpg",
    },

    passion: {
      eyebrow: "Why Nonprofits",
      heading: "Our passion for\nnonprofit organizations.",
      body: [
        "We realize nonprofit organizations often lack the resources to effectively handle complex business situations. These constraints may have to do with time, money, or even the availability of human capital.",
        "If this happened to a for-profit entity, it would normally turn to a professional consultancy for guidance. We realize that option is not available to most nonprofits due to budgetary constraints.",
        "So we work with nonprofits to solve complex business problems on a pro bono basis, while helping them make a social difference in the Austin community.",
      ],
    },

    // UPDATE: adjust if your service lines change.
    offerings: [
      { title: "Marketing Strategy", body: "Audience research, messaging, brand positioning, and community outreach plans." },
      { title: "Operations & Supply Chain", body: "Workflow mapping, volunteer pipelines, and internal systems that reduce manual work." },
      { title: "Funding & Donor Relations", body: "Donor segmentation, recurring giving frameworks, and grant strategy support." },
      { title: "Software & App Development", body: "Scoping digital tools, vendor selection, and product requirements." },
      { title: "Asset Management", body: "Inventory, facilities, and resource allocation planning." },
      { title: "Strategic & Operational Efficiency", body: "Landscape analysis, benchmarking against peer organizations, and process redesign." },
    ],

    process: {
      eyebrow: "Project Structure",
      heading: "How an engagement runs.",
      intro:
        "Our projects typically last 8–10 weeks. We follow the Agile methodology closely in order to meet deadlines and ensure a successful project — meeting with clients on a consistent basis to share progress and incorporate feedback into the end result.",
      steps: [
        { step: "01", title: "Scoping", body: "We meet with your team to define the problem and agree on a deliverable." },
        { step: "02", title: "Research", body: "Our consultants conduct interviews, benchmarking, and data analysis." },
        { step: "03", title: "Sprints", body: "We build recommendations in short cycles, checking in with you throughout." },
        { step: "04", title: "Handoff", body: "You receive a final presentation and a written deliverable you own outright." },
      ],
    },

    cta: {
      heading: "Interested in working with us?",
      body: "We would love to get started with your organization and help make a change in our Austin community. Reach out to us today.",
      photo: "A Texas 180 team presenting final recommendations to a client",
      photoSrc: "/photos/client-presentation.jpg",
      button: {
        label: "Get in touch",
        href: `mailto:${CONTACT_EMAIL}?subject=Nonprofit%20Partnership%20Inquiry`,
      },
    },
  },

  // ─── PROJECTS ──────────────────────────────────────────────────────────────
  projects: {
    hero: {
      eyebrow: "Projects",
      heading: "Work that leaves\nsomething behind.",
      body: "We have consulted a variety of local nonprofits, generating final recommendations spanning marketing strategy, operations and supply chain, software and app development, funding, donor relations, and asset management.",
      photo: "Texas 180 consultants on the UT Austin campus",
      photoSrc: "/photos/hook-em-group.jpg",
    },

    // ── CLIENT LOGOS ────────────────────────────────────────────────────────
    // `logo`   — filename inside public/logos/  (see public/logos/README.md)
    // `remote` — TEMPORARY fallback pulled from the current Squarespace site.
    //            Used only until the local file exists. Remove these once you
    //            have downloaded the logos, because they stop working when the
    //            Squarespace subscription is cancelled.
    // Missing both? The tile shows the organisation's name as text instead.
    clients: [
      { name: "American Heart Association", logo: "american-heart-association.png" },
      { name: "Art from the Streets", logo: "art-from-the-streets.png" },
      { name: "Austin Pets Alive!", logo: "austin-pets-alive.png" },
      { name: "Bananarch", logo: "bananarch.png" },
      { name: "BookSpring", logo: "bookspring.png" },
      { name: "Boys & Girls Clubs of the Austin Area", logo: "boys-and-girls-clubs.png" },
      {
        name: "CareBOX Program",
        logo: "carebox-program.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/2b6b4459-d8c7-4d92-b420-65257cb9f577/CareBOX_program_fb_logo_2.png?format=500w",
      },
      { name: "Caring for Cambodia", logo: "caring-for-cambodia.png" },
      { name: "Chestnut Neighborhood Revitalization Corporation", logo: "chestnut-nrc.png" },
      { name: "Community Powered Workshop", logo: "community-powered-workshop.png" },
      { name: "Dell Children's Ascension", logo: "dell-childrens.png" },
      { name: "Down Syndrome Association of Central Texas", logo: "dsact.png" },
      { name: "Dress for Success Austin", logo: "dress-for-success-austin.png" },
      { name: "EGBI", logo: "egbi.png" },
      { name: "Explore Austin", logo: "explore-austin.png" },
      {
        name: "GenerationServe",
        logo: "generationserve.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/9d3948b2-bd2e-4252-93c1-4f53e1e77732/gs-logo-horizontal-fullcolor-cmyk-transparent.png?format=500w",
      },
      {
        name: "Girlstart",
        logo: "girlstart.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/8930cc64-2d69-405c-a4e8-228a11848508/GS_PERFECTlogo_225P_267P.jpg?format=500w",
      },
      { name: "Goodwill", logo: "goodwill.png" },
      { name: "Healing with Horses Ranch", logo: "healing-with-horses.png" },
      { name: "HomeAid Austin", logo: "homeaid-austin.png" },
      {
        name: "Hope Austin",
        logo: "hope-austin.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/d24dfdcf-66c4-4a17-8b87-c3becbf25d51/HopeAustin.jpg?format=500w",
      },
      { name: "League of Women Voters", logo: "league-of-women-voters.png" },
      { name: "Magdalene House", logo: "magdalene-house.png" },
      { name: "Michael & Susan Dell Foundation", logo: "msdf.png" },
      { name: "More Than Welcome", logo: "more-than-welcome.png" },
      {
        name: "Power for Parkinson's",
        logo: "power-for-parkinsons.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/f4f29b0c-e310-4b0b-9cab-cfadc207a4c0/PFP+lofo.png?format=500w",
      },
      {
        name: "Prison Entrepreneurship Program",
        logo: "prison-entrepreneurship-program.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/23ffc378-cf47-4602-b3c9-1504f9bc38bb/PEP_Logo_RGB.png?format=500w",
      },
      {
        name: "Rainforest Partnership",
        logo: "rainforest-partnership.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/0540eacf-3449-44b6-85e0-7531a25717c6/644cd73b0de1fe2e4c39618f_RainforestPartnership-FullColorLogo-V.png?format=500w",
      },
      { name: "Re:wild", logo: "rewild.png" },
      {
        name: "Ronald McDonald House Charities of Central Texas",
        logo: "rmhc-central-texas.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/a04733d9-3578-4b52-a5ee-43d0f7afb944/RMHC_CTX_logo_hz-color_Hi-RES-DIGITAL-2.png?format=500w",
      },
      { name: "Roppolo's Pizzeria", logo: "roppolos.png" },
      { name: "Seedling", logo: "seedling.png" },
      {
        name: "The Arc of the Capital Area",
        logo: "the-arc-capital-area.png",
        remote:
          "https://images.squarespace-cdn.com/content/v1/64d3c115dcec9c5fef63363f/df5304cf-0470-40f4-9a57-ba3882d2a05b/arc-capitalarea-color.png?format=500w",
      },
      { name: "The Charlie Center", logo: "charlie-center.png" },
      { name: "The Salvation Army", logo: "salvation-army.png" },
      { name: "The University of Texas Foundation", logo: "ut-foundation.png" },
      { name: "Wonders & Worries", logo: "wonders-and-worries.png" },
      { name: "YMCA of Austin", logo: "ymca-austin.png" },
    ],

    // Sample decks published on the current site.
    samples: {
      eyebrow: "Sample Work",
      heading: "Some of our final recommendations.",
      body: "We have consulted a variety of local nonprofits and generated final recommendations spanning marketing strategy, operations, software development, funding, donor relations, and asset management.",
      // UPDATE: swap in newer decks each year. Set to [] to hide the section.
      decks: [
        { label: "Client deliverable — sample one", href: "https://docs.google.com/presentation/d/12jsmTKYHrjMbIcT87mCD09r4wrGAKncM/edit?usp=sharing" },
        { label: "Client deliverable — sample two", href: "https://docs.google.com/presentation/d/1Q01rIWCaOy_7hPwJRciwVxrpgBO1r06M/edit?usp=sharing" },
        { label: "Client deliverable — sample three", href: "https://docs.google.com/presentation/d/1E5gICpi0AWmNQsERjKeNVEmnUdzDYe5T/edit?usp=sharing" },
        { label: "Client deliverable — sample four", href: "https://docs.google.com/presentation/d/1tv9jXDz2VXpd0CngvBL4TIeNCDd1JN_y/edit?usp=sharing" },
      ],
    },

    featured: [],

    cta: {
      heading: "Want your organization here?",
      button: {
        label: "Partner with us",
        href: `mailto:${CONTACT_EMAIL}?subject=Nonprofit%20Partnership%20Inquiry`,
      },
    },
  },

  // ─── JOIN / RECRUITMENT ────────────────────────────────────────────────────
  // THREE STATES for `status`:
  //   "closed" → grey dot, "Applications Closed", no button
  //   "soon"   → green pulsing dot, "Opening Soon", TBD timeline, no button
  //   "open"   → "Now Open", Apply button + deadline (requires applyUrl)
  recruit: {
    status: "soon", // UPDATE
    semester: "Fall 2026", // UPDATE

    hero: {
      eyebrow: "Join Us",
      heading: "Join us this fall.",
      body: "We recruit new consultants at the beginning of each semester. We are looking for hardworking and talented individuals with a passion for service.",
      photo: "The Texas 180 chapter gathered on campus",
      photoSrc: "/photos/campus-team-photo.jpg",
    },

    whatIsConsulting: {
      eyebrow: "What Is Consulting?",
      heading: "Solving real problems\nfor real organizations.",
      body: "Consultants offer advice and expertise to client organizations to help them improve their performance. Consulting is a collaborative effort — working closely with clients to devise practical, data-driven solutions that drive growth, enhance efficiency, and foster innovation.",
    },

    // "Why 180?" — carried over from the live site.
    why: {
      eyebrow: "Why 180?",
      heading: "What you get out of it.",
      cards: [
        {
          title: "Social Impact",
          body: "You'll engage with local nonprofits to solve some of the greater Austin area's most pressing problems — sitting at the table with impactful organizations in our school's backyard.",
          photo: "A Texas 180 project team on campus",
          photoSrc: "/photos/trio-photo.jpg",
        },
        {
          title: "Personal Development",
          body: "You'll learn to think and solve problems like a consultant, and acquire skills that translate to any field. Through hands-on experience you'll learn concrete skills for the professional and personal sphere.",
          photo: "Consultants after a general meeting",
          photoSrc: "/photos/group-photo-tall.jpg",
        },
        {
          title: "Community",
          body: "You'll receive continual mentorship from club leadership as you navigate client engagements and recruiting — and join the global 180 network spanning 33+ nations and 5,000+ consultants.",
          photo: "Texas 180 members hanging out after a chapter event",
          photoSrc: "/photos/smaller-group-photo.jpg",
        },
      ],
    },

    teaser:
      "Recruitment dates and the Fall 2026 application will be posted here and on our Instagram before the semester starts.",
    closedNote:
      "Check back next semester — or follow us on Instagram for the announcement.",

    applyUrl: "", // UPDATE: paste the form link, then set status to "open"
    deadline: "Deadline TBD", // UPDATE

    timeline: [
      { step: "Info Session", detail: "TBD" },
      { step: "Coffee Chats", detail: "TBD" },
      { step: "Application Due", detail: "TBD" },
      { step: "Interviews", detail: "TBD" },
    ],

    // Real commitment details from the live site.
    expectations: [
      "1-hour general meetings every other week — Mondays, 6–7pm",
      "1-hour client project meetings every week",
      "Roughly 3–5 hours per week, depending on your tasks",
      "Join as a Junior Consultant; become a Project Leader after one semester",
      "Open to all majors and all years — no experience required",
    ],

    // The eight FAQs from the live site.
    faq: [
      {
        q: "What is Texas 180 Degrees Consulting and how did it start at UT?",
        a: "Texas 180 Degrees Consulting, based at The University of Texas at Austin, helps students gain access to real-world consulting experience. Students work in teams to support local nonprofits with the goal of expanding and improving their services. We became a branch in Fall 2018.",
      },
      {
        q: "What is the structure of the organization?",
        a: "As an incoming new member you join as a Junior Consultant. After one semester you have the opportunity to become a Project Leader. We focus on only a few clients per semester, and each project is completed over the course of one semester.",
      },
      {
        q: "What work has Texas 180DC done so far?",
        a: "Last school year we worked with five nonprofit organizations in the Austin area. Our work has focused on technical, strategic, and operational consulting, though we do not specialize in any one discipline.",
      },
      {
        q: "What do consultants do, and how do you choose projects?",
        a: "Projects vary in tasks and goals, but we select ones that are both valuable learning experiences and impactful. Consultants meet with clients, brainstorm solutions, and compile reports to present findings and ideas.",
      },
      {
        q: "When are you open for recruitment?",
        a: "We recruit new consultants at the beginning of each semester. We are looking for hardworking and talented individuals with a passion for service.",
      },
      {
        q: "What kind of members are you looking for?",
        a: "People who are passionate about our mission — excited to work on projects, readily available to meet with clients and project teams, and supportive of our objective of making an impact. Our consultants tend to be innovative, passionate, genuine team players.",
      },
      {
        q: "What kind of time commitment is it?",
        a: "A minimum of 1-hour general meetings every other week (Mondays 6–7pm) and 1-hour client project meetings every week. We estimate 3–5 hours per week, varying with your assigned tasks.",
      },
      {
        q: "Do I need experience in consulting?",
        a: "No. Although experience is welcome, we aim to teach you the skills to be a great consultant while giving back to nonprofits in the community.",
      },
    ],
  },

  footer: {
    brand: "Texas 180 Degrees Consulting",
    tagline: "UT Austin's pro bono consulting organization for social impact.",
  },
};
