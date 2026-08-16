# ⏰ Squarespace site ends 20 August

## ✅ The domain is safe — checked 16 Aug 2026

The ICANN lookup came back clear. You do **not** need to rush a domain transfer.

| Field | Value | What it means |
|---|---|---|
| Registrar | Squarespace Domains II LLC | They still hold it |
| Registry Expiration | **26 Aug 2027** | Paid for another year |
| Updated | 13 Aug 2026 | Renewed three days ago |
| Domain Status | `renewPeriod` | Confirms the renewal went through |
| Nameservers | `ns-cloud-*.googledomains.com` | DNS is managed from the Squarespace domains panel |
| Created | 26 Aug 2018 | Confirms the Fall 2018 founding date |

**The domain renewal is separate from the site subscription.** Cancelling the
site plan doesn't touch it — it's paid until August 2027. Cancelling a
Squarespace *site* keeps your access to `domains.squarespace.com` for DNS.

So the plan is simple: **leave the domain where it is and just repoint the DNS
at Vercel.** No transfer, no deadline, no risk.

> **One thing to check:** the renewal on 13 Aug means you were probably charged
> for the domain (~$20) separately from the site plan. That's expected and
> correct — it's what keeps the domain alive.

> **`clientTransferProhibited`** is in the status list — that's the standard
> transfer lock, on by default. You'd only need to unlock it if you later move
> to Cloudflare Registrar to save ~$10/yr. Worth doing before Aug 2027, not now.

## Still time-sensitive — save the files off the old site

On **21 August these files are gone permanently.** The site is still up now.

- **Client logos** — go to <https://www.texas180dc.org/projects>, right-click
  each logo in the "Our Past Clients" wall → *Save image as…* → into
  `public/logos/`. See `public/logos/README.md` for the filename to use for each.
  Nine of them currently load live from Squarespace on the new site and will
  break on the 20th.
- **Officer headshots** — <https://www.texas180dc.org/our-team> has the old
  slate's photos, plus Amit Konda's if it's there.
- **Any other photos** you might want later.

> If you miss the window the site still works — missing logos show a clean text
> tile instead of a broken image. But you'd have to re-source them from each
> organisation.

## Then — get the new site live

Follow the steps below. Because the domain is safe, there's no hard deadline on
the DNS switch. But `texas180dc.org` will show a Squarespace "site not found"
page from the 20th until you repoint it, so sooner is better — Google can drop a
site that's down when it happens to crawl.

**Because the domain stays at Squarespace, Step 3 gets simpler.** You add the
Vercel DNS records at `domains.squarespace.com` instead of anywhere new. The
domain panel stays accessible after the site plan ends.

---

# Launching the site — step by step

First time doing this? This is the whole thing, in order. Nothing is skipped and
nothing assumes you've used GitHub before.

**Total hands-on time: about an hour.** Then a wait of a few days for Google.

Do the steps in order. Each one ends with a **✅ Check** — don't move on until
that check passes.

---

## What you're actually doing

Four separate things, which is why it feels confusing at first:

| Step | What it is | Think of it as |
|---|---|---|
| 1 | **GitHub** | Where the code is stored, like Google Drive for a website |
| 2 | **Vercel** | The computer that serves your site to visitors |
| 3 | **Domain** | Pointing `texas180dc.org` at Vercel instead of Squarespace |
| 4 | **Search Console** | Telling Google the site exists |

Your site is live and shareable after step 2. Steps 3 and 4 make it live at
your real address and findable on Google.

---

# STEP 0 — Make sure it builds

Before anything else. Open **PowerShell** (Windows key → type "powershell" → Enter):

```powershell
cd "$HOME\OneDrive\Desktop\Texas180DegreesConsulting_VP\texas180_website"
npm install
npm run build
```

The last command takes a minute or two.

**✅ Check:** the final lines say something like `✓ Compiled successfully` and
list your five pages. If you see red errors instead, **stop and send me the
message** — nothing below will work until this passes.

---

# STEP 1 — Put the code on GitHub

GitHub stores the code. It matters because it's how the next VP takes over
without you handing them a laptop.

You'll use **GitHub Desktop**, which is a normal app with buttons. No commands.

### 1a. Make a GitHub account

1. Go to **github.com** → **Sign up**
2. Use an email you'll keep after graduating (a personal one is fine)
3. Verify the email, pick any username

### 1b. Create an organization (2 minutes, worth it)

This is the part that protects the org. A repo owned by *you* disappears when
you lose interest; one owned by an *organization* can be handed over.

1. Click your avatar (top-right) → **Your organizations** → **New organization**
2. Choose the **Free** plan
3. Name it `texas180dc` (or similar), contact email = your officer email
4. Skip inviting people for now — you can add the next VP later

### 1c. Install GitHub Desktop

1. Go to **desktop.github.com** → **Download for Windows**
2. Install it, open it, **Sign in to GitHub.com**, authorize

### 1d. Publish the site

1. In GitHub Desktop: **File → Add local repository**
2. Click **Choose…** and pick the folder:
   `Desktop\Texas180DegreesConsulting_VP\texas180_website`
3. It should say it's already a repository (I set that up) — click **Add repository**
4. Click the blue **Publish repository** button at the top
   - **Name:** `website`
   - **Organization:** pick `texas180dc`, *not* your username
   - **Keep this code private:** ticked
5. Click **Publish repository**

**✅ Check:** go to `github.com/texas180dc/website` — you should see your files.

> **From now on**, whenever you change something: open GitHub Desktop, type a
> short note in the Summary box, click **Commit to main**, then **Push origin**.
> That's the whole workflow.

---

# STEP 2 — Put it online (Vercel)

Vercel runs the site.

> ## 💸 You do NOT need Vercel Pro
>
> The free tier is called **Hobby**. It includes custom domains, HTTPS,
> unlimited deploys, and 100 GB bandwidth a month. This whole site is ~3 MB —
> a thousand visitors a month would use about 3% of that allowance.
>
> **The signup flow pushes you toward a Team, and Teams are Pro ($20/user/mo).**
> While clicking through:
>
> - Plan or "what are you building?" → choose **Hobby** / **Personal**
> - Offered a **Pro free trial** → **skip it** (trials convert to paid)
> - Importing the project → deploy under your **personal account**, not a Team
>
> The wording shifts over time, but the rule holds: **"Team" = paid,
> "Hobby"/"Personal" = free.** Hobby needs no card — if you're ever asked for
> payment details, back out, you're on the wrong path.
>
> *The one real limit:* Hobby is for non-commercial projects. A pro bono student
> org is fine. If T180 ever sells merch or takes payments through the site, move
> to Cloudflare Pages — also free, no such clause.

1. Go to **vercel.com** → **Sign Up** → **Continue with GitHub** → authorize
2. On the dashboard click **Add New… → Project**
3. Find `texas180dc/website` → click **Import**
   - If it's not listed, click **Adjust GitHub App Permissions** and grant
     access to the organization
4. A settings screen appears. **Change nothing.** Framework should already say
   Next.js. Click **Deploy**
5. Wait ~2 minutes. You'll get confetti and a link like
   `website-abc123.vercel.app`

**✅ Check:** open that link on your phone. All five pages should work.

🎉 **Your site is live on the internet.** Send that link to your officers and
get sign-off before touching the real domain.

> **Every future change deploys itself.** Push from GitHub Desktop and Vercel
> rebuilds within a minute. Nothing else to do.

---

# STEP 3 — Point texas180dc.org at it

> The usual warning here is "don't cancel Squarespace first" — already moot, and
> it turned out fine because the domain renewed independently of the site plan.
> The domain is paid to Aug 2027 and stays yours regardless of what happens next.

### 3a. Already done ✅

The lookup confirmed: **Squarespace Domains II LLC**, paid until 26 Aug 2027.
You manage its DNS at **domains.squarespace.com** — that stays available after
the site plan ends.

### 3b. Tell Vercel about the domain

1. In Vercel: your project → **Settings** → **Domains**
2. Type `texas180dc.org` → **Add**
3. Vercel shows you records to create — usually:
   - Type `A`, Name `@`, Value `76.76.21.21`
   - Type `CNAME`, Name `www`, Value `cname.vercel-dns.com`
4. **Leave this tab open.** Use the values Vercel shows you, not the ones above,
   in case they've changed.

### 3c. Add those records at Squarespace

1. Go to **domains.squarespace.com** and sign in
2. Click `texas180dc.org` → **DNS** (or **DNS Settings**)
3. **Delete or edit the existing `A` and `CNAME` records** that currently point
   at Squarespace's own servers — otherwise they fight the new ones
4. Add the two records exactly as Vercel showed you
5. Save

> Your nameservers are `ns-cloud-*.googledomains.com` — that's normal.
> Squarespace runs its domains on Google's DNS since acquiring Google Domains.
> You edit records through the Squarespace panel, not Google's.

Now wait. Usually 10–30 minutes, occasionally up to 48 hours. Vercel's Domains
page shows a green tick when it's working and sets up HTTPS automatically.

**✅ Check:** `https://www.texas180dc.org` loads the new site, on your laptop
**and** on your phone with wifi off.

### 3d. Keep paying for the domain only

Nothing more to cancel — the site plan is already ended. Just don't cancel the
**domain** renewal; that's what's keeping `texas180dc.org` yours until Aug 2027.

**Put a calendar reminder for July 2027.** Before that date you can either let
Squarespace renew it (~$20/yr) or transfer to Cloudflare Registrar (~$10/yr).
Either is fine; what matters is that someone is watching for it.

---

# STEP 4 — Get on Google

Putting a site online does **not** put it on Google. This does.

The site already includes everything Google needs (sitemap, descriptions,
structured data). You just have to tell it the site is there.

1. Go to **search.google.com/search-console**
2. Sign in with a Google account
3. Left panel → **Add property** → choose **Domain** (the left box)
4. Type `texas180dc.org` → Continue
5. It gives you a **TXT record**. Copy it.
6. Go back to your registrar's DNS page (same place as step 3c), add a record:
   - Type `TXT`, Name `@`, Value = what Google gave you
7. Save, wait ~15 minutes, click **Verify** in Search Console
8. Once verified: left panel → **Sitemaps** → type `sitemap.xml` → **Submit**
9. Left panel → **URL Inspection** → paste `https://www.texas180dc.org` →
   **Request Indexing**

**✅ Check:** Sitemaps page shows "Success".

**Then wait.** A few days to two weeks before you appear in search. You're
inheriting a domain that already ranks, which helps.

### Speeding it up

The single biggest factor is other sites linking to you. Free and effective:

- Update the link on your **180dc.org branch page**
- Update **HornsLink**
- Put it in your **Instagram bio** and on the **LinkedIn page**
- Ask a few clients to add you to their partners page

---

# Done. What now?

**To change any text:** open `lib/content.js`, edit between the quotes, save,
then commit + push in GitHub Desktop. Live in a minute.

**To open recruitment:** in `lib/content.js` find `recruit`, set
`status: "open"`, paste the form link into `applyUrl`, fill in the dates.

**Before you hand over the VP role**, make sure the next person has access to:
GitHub (org owner), Vercel (invite them as a member), the domain registrar
login, and Search Console. Put a calendar reminder on the domain renewal date.

---

# If something goes wrong

**The build fails** → send me the error text.

**Vercel deploy fails** → click the failed deployment, read the red lines at the
bottom of the log, send me those.

**Domain shows the old site** → DNS can take up to 48 hours. Check in an
incognito window; browsers cache aggressively.

**You broke something editing** → in GitHub Desktop, right-click the file under
Changes → **Discard changes**. That restores the last working version.

**Deeper reference** — `LAUNCH.md` in this folder covers the same ground with
more detail on costs, alternatives, and account security.
