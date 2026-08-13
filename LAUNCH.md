# Texas 180° — Launch Runbook

From your laptop to live on `texas180dc.org`, indexed by Google, for about **$10/year**.

Written for the next VP as much as the current one. Work top to bottom.

---

## The short version

| Phase | What happens | Time |
|---|---|---|
| 0 | Fill the content gaps | a few days (needs other people) |
| 1 | Confirm it builds | 10 min |
| 2 | Push to GitHub | 15 min |
| 3 | Deploy to Vercel → get a live test URL | 5 min |
| 4 | Move the domain, point it at Vercel | 5–7 days (mostly waiting) |
| 5 | Cancel Squarespace | 5 min |
| 6 | Submit to Google | 15 min + 1–2 weeks to index |

Phases 0 and 4 are the long poles. **Start both now** — everything else is quick.

---

## Can the public edit the site?

**No. Not even a little.** This is worth understanding properly, because it's the difference between how this site works and how Squarespace or a Google Doc works.

### Why visitors physically cannot change anything

When someone visits `texas180dc.org`, their browser downloads a finished HTML page, a stylesheet, and some JavaScript. That's a **copy**. They can open developer tools and edit that copy on their own screen all day — change the headline, delete a photo, turn the background pink. It affects nothing. Refresh and it's back. Nobody else ever sees it.

That's true of every website. What makes some sites editable is that they have a **way to write back to the server** — a login page, an admin panel, a comment box, a contact form that saves to a database. Squarespace has all of that, which is why it needs accounts and passwords.

This site has **none of it**:

| Thing that would let someone write to your site | Present here? |
|---|---|
| Admin panel or CMS login | No |
| User accounts of any kind | No |
| Database | No |
| Comment or review section | No |
| File upload | No |
| Any form that submits to a server | No — the contact links open the visitor's own email app |

There is no door to lock, because there is no door. The site is a stack of pre-built files served to anyone who asks.

### What *can* be changed, and by whom

The site is read-only. The **things that produce** the site are not. There are exactly four, and securing these is the real task:

| What | Who can change it | If someone got in |
|---|---|---|
| **GitHub repo** | People you add as collaborators | They could alter the code, and it would auto-deploy |
| **Vercel account** | People you invite to the team | They could change settings or redeploy |
| **Domain registrar** | Whoever holds the login | They could point `texas180dc.org` anywhere — the worst case |
| **Google Search Console** | People you add as users | They could de-index the site from search |

So "the public can't edit it" is already true by default. The work is making sure the officer accounts are locked down — that's Phase 7 below.

---

## Phase 0 — Content gaps

Nothing here is code. It's the only part that needs other people, so it's the only part that can block you.

**Blocking — the site looks unfinished without these:**

- [ ] **Officer details.** Priyanka, Roberta, Amit, and Sahithi have blank year/major and no LinkedIn in `lib/content.js`. Their emails default to `texas@180dc.org`.
- [ ] **Officer headshots.** Six green placeholders on the About page. Save into `public/team/`.
- [ ] **Client logos.** See `public/logos/README.md`. Nine currently load from Squarespace as a stopgap — **those break the moment you cancel the subscription**, so download real copies before Phase 5.
- [ ] **Photos.** Every green hatched block is a labelled photo slot telling you what belongs there.

**Verify before publishing:**

- [ ] **Hero stats** — `30+ organizations`, `8 years`, `33+ countries`. Confirm or set `stats: []` in `lib/content.js` to hide the row. Don't publish numbers you can't defend to a prospective client.
- [ ] **Client list** — 38 organizations. Confirm each is real and none asked to stay unlisted.
- [ ] **Your own title** — the old site said you were Projects Director; you've since said Internal Director. Make sure the roster matches reality.
- [ ] **Sample decks** — four Google Slides links on the Projects page. Check each is still shared publicly and that you're happy for the world to read it.

---

## Phase 1 — Confirm it builds

```powershell
cd "$HOME\OneDrive\Desktop\Texas180DegreesConsulting_VP\texas180_website"
npm install
npm run build
```

**`npm run build` must finish without errors before you go further.** `npm run dev` is forgiving; the production build is not, and Vercel runs the production build. Catching a failure here takes seconds. Catching it after you've pointed the domain is a bad afternoon.

Then `npm run dev` and click through all five pages one last time.

---

## Phase 2 — Put the code on GitHub

Vercel deploys from a Git repository. This also means the site survives you graduating.

1. **Create a GitHub Organization** named something like `texas180dc`, and create the repo inside it — *not* under your personal account. Add the President and next VP as owners. This is the single most important handoff step: a repo on a personal account disappears when that person loses interest.

2. In the project folder:

```powershell
git init
git add .
git commit -m "New Texas 180 website"
git branch -M main
git remote add origin https://github.com/texas180dc/website.git
git push -u origin main
```

A `.gitignore` is already in place, so `node_modules` and `.next` stay out.

---

## Phase 3 — Deploy to Vercel (free)

1. **vercel.com** → sign up with GitHub.
2. **Add New → Project** → import the repo.
3. Vercel auto-detects Next.js. **Change nothing.** Click **Deploy**.
4. A minute later you have a live URL like `texas180-website.vercel.app`.

**Send that URL to your officers and get sign-off before touching the real domain.** It costs nothing to sit on it for a week.

From here, every `git push` to `main` redeploys automatically. That's the whole content workflow: edit `lib/content.js`, commit, push, live in about a minute.

> **On Vercel's free tier:** the Hobby plan is for non-commercial projects. A pro bono student org that charges nobody is comfortably inside that. If T180 ever sells merch or takes payments through the site, move to Cloudflare Pages (no such clause) or Vercel Pro.

---

## Phase 4 — The domain

> **⚠️ Do not cancel Squarespace yet.** If the domain is registered through Squarespace and bundled with the plan, cancelling first can drop `texas180dc.org` into a redemption period that costs $80–200 to recover — or lets someone else register it. Domain first, cancellation last.

### 4a. Find out who holds the domain

Look up `texas180dc.org` at **lookup.icann.org**. Check the **Registrar** field.

- **Squarespace** (or Google LLC / Google Domains, which Squarespace bought) → it came with the plan. Do 4b.
- **Anyone else** (GoDaddy, Namecheap…) → the org pays separately. Skip to 4c; you may only need to change DNS.

Note the **Registry Expiry Date** too — start well before it.

### 4b. Transfer to Cloudflare Registrar (~$10/yr, at cost)

Cloudflare sells domains at wholesale with no markup and no renewal hike, WHOIS privacy included. Registration price equals renewal price, every year.

1. Squarespace → **Settings → Domains → texas180dc.org**
2. **Unlock** the domain and request the **authorization code** (EPP code). It's emailed to the registrant address — make sure someone still has access to that inbox.
3. Create a free **Cloudflare** account → **Domain Registrar → Transfer Domains**.
4. Paste the EPP code, pay the ~$10 transfer fee. This **adds a year**; you lose nothing.
5. Approve the confirmation email. **Transfers take 5–7 days.**

**Blockers:** a domain can't be transferred within **60 days** of registration or a previous transfer, or while locked. If you hit that wall, skip the transfer — do 4c, keep paying Squarespace for the domain alone (~$20/yr), cancel the *site plan*, and transfer later.

### 4c. Point the domain at Vercel

1. Vercel → **Project → Settings → Domains → Add** → `texas180dc.org`, then also `www.texas180dc.org`.
2. Vercel shows the exact DNS records to create. Typically an `A` record on `@` and a `CNAME` on `www` → `cname.vercel-dns.com`. **Use the values Vercel actually displays** — they change.
3. Add those records at your registrar.
4. **In Cloudflare, set both records to "DNS only" (grey cloud), not "Proxied" (orange cloud).** Proxying in front of Vercel causes redirect loops and TLS errors. This trips up almost everyone.
5. Wait for DNS to propagate — usually minutes, up to 48 hours. Vercel issues the HTTPS certificate automatically.

---

## Phase 5 — Cancel Squarespace

Only once `https://www.texas180dc.org` loads the new site correctly on a laptop **and** on a phone off wifi:

1. **Download any remaining logos and photos from the old site first.** Once the subscription lapses, those files are gone — including the nine logos currently hotlinked from the Squarespace CDN.
2. Cancel the subscription.
3. **Check the refund window.** Squarespace refunds annual plans within 14 days of renewal. If your renewal date is close, waiting a few days could save a full year's fee.

---

## Phase 6 — Get on Google

Deploying doesn't put you in search results. This does.

The site already ships with `sitemap.xml`, `robots.txt`, per-page titles and descriptions, and Organization structured data identifying you as a UT Austin student organization affiliated with 180DC Global. You just need to tell Google it exists.

1. **Google Search Console** → **Add Property** → **Domain** → `texas180dc.org`.
2. Verify with the **TXT record** it gives you (add it at your registrar's DNS).
3. **Sitemaps → Add new sitemap** → enter `sitemap.xml` → Submit.
4. **URL Inspection** → paste `https://www.texas180dc.org` → **Request Indexing**.

Indexing takes a few days to two weeks.

**You're inheriting the domain's existing history, which is an advantage** — the URL already ranks. Just don't change the domain name.

Two things that move the needle more than any technical SEO:

- **Get the URL onto pages that already rank.** Your `180dc.org/branches/UT-Austin` profile, HornsLink, the LinkedIn company page, your Instagram bio. Inbound links from established sites are the strongest signal you have.
- **Ask each client to link to you** from their partners or supporters page. Nonprofit `.org` domains carry real weight.

Check Search Console after two weeks to confirm all five pages are indexed.

---

## Running the site during the semester

Everything you'll normally change lives in **`lib/content.js`**. Edit, commit, push — live in about a minute.

### Opening recruitment

```js
status: "soon",              // → "open"
applyUrl: "",                // → paste the Google Form link
deadline: "Deadline TBD",    // → "Applications close September 12"
timeline: [ … ]              // → replace each "TBD" with the real date
```

| `status` | What visitors see |
|---|---|
| `"closed"` | Grey dot, "Applications Closed", no button |
| `"soon"` | Green pulsing dot, "Opening Soon", TBD timeline, no button |
| `"open"` | "Now Open", Apply button + deadline |

There's a safety guard: if `status` is `"open"` but `applyUrl` is empty, the button **won't render**. You can't ship a dead Apply button — a real failure on the old site, which advertised "Spring '26 Application Officially Live" through the summer.

### Adding a client

Append `{ name: "…", logo: "….png" }` to `projects.clients` and drop the file in `public/logos/`. Keep it alphabetical. Missing logo? It shows a clean text tile instead.

### Turning scroll effects off

`SCROLL_EFFECTS` at the top of `lib/content.js`. Any switch set to `false` becomes a plain static section.

Note `respectReducedMotion: false` — animations currently play even for visitors whose OS is set to reduce motion. Some people rely on that setting because movement causes dizziness. To restore it: set it to `true` and uncomment the block at the bottom of `app/globals.css`.

---

## Phase 7 — Lock down the four accounts

The site is read-only to the public by default. These four accounts are what actually need protecting. Fifteen minutes, once.

**1. GitHub**
- Set the repo to **Private** (Settings → General → Danger Zone → Change visibility). Public is not unsafe — strangers still can't push — but private avoids any confusion.
- **Turn on 2FA** for every collaborator. GitHub Settings → Password and authentication.
- Protect `main`: Settings → Branches → Add rule → `main` → tick **Require a pull request before merging**. Now nobody, including you, can overwrite the site by accident.
- Review Settings → Collaborators. Remove anyone who has graduated.

**2. Vercel**
- Invite officers with **Member**, not Owner. Only the President and VP need Owner.
- Turn on 2FA.
- Never share one login — use invites, so removing someone is one click.

**3. Domain registrar (the important one)**
- Turn on 2FA.
- Leave the **domain lock** on. It's on by default and blocks transfers.
- Make sure the registrant email is an address the org controls, and that two officers can read it. Domain renewal and transfer approvals go there — losing access to that inbox is how organisations lose their domain.

**4. Google Search Console**
- Add officers as **Full** or **Restricted** users. Only one person needs to be Owner.

### What to do if something looks wrong

Because everything is in git, you can undo anything:

```powershell
git log --oneline          # find the last good commit
git revert <commit-id>     # undo it, keeping history
git push
```

Vercel redeploys automatically, and the site is back to normal in about a minute. You can also click **Rollback** on any previous deployment in the Vercel dashboard, which is faster.

---

## Handoff checklist

Before you hand over the role, confirm your successor has:

- [ ] Owner access to the **GitHub organization** (not just the repo)
- [ ] Access to **Vercel** — use "Invite Member", don't share a password
- [ ] Access to the **Cloudflare** account holding the domain
- [ ] Access to the **registrant email inbox** — transfers and renewals go there
- [ ] Access to **Google Search Console**
- [ ] **A calendar reminder for the domain renewal**, set two months out

Register these under an officer address the org controls, not a personal one. The most common way a student org loses its website is a graduating senior taking the only login with them.

---

## Quick reference

| Task | Where |
|---|---|
| Change any text | `lib/content.js` |
| Open/close recruitment | `lib/content.js` → `recruit.status` |
| Add a logo | `public/logos/` + `projects.clients` |
| Deploy a change | `git add . && git commit -m "…" && git push` |
| Check the deploy | vercel.com dashboard |
| Check search ranking | Google Search Console |

| Recurring cost | |
|---|---|
| Domain (Cloudflare, at cost) | ~$10/yr |
| Hosting (Vercel Hobby) | $0 |
| **Total** | **~$10/yr** — down from ~$276 |
