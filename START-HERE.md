# ⏰ DEADLINE: Squarespace ends 20 August

Squarespace has been cancelled and the old site goes dark on **20 August**.
Three things must happen before then, in this order.

## 1. TODAY — make sure you still own the domain

**This is the only step that can't be undone.** Everything else is recoverable;
losing `texas180dc.org` is not.

1. Go to **lookup.icann.org**, search `texas180dc.org`
2. Read two lines and write them down:
   - **Registrar** — who holds it
   - **Registry Expiry Date** — when it lapses

**If Registrar says Squarespace (or Google LLC):** the domain likely came bundled
with the plan you cancelled. Log into Squarespace right now and check
**Settings → Domains**. You need it to say the domain is registered until its
expiry date, *not* that it ends with the subscription. If it's ending, either
renew the domain on its own (~$20/yr, Squarespace sells this separately from the
site plan) or start a transfer to Cloudflare immediately — transfers take 5–7
days, so there is no slack.

**If Registrar is anyone else** (GoDaddy, Namecheap…) — you're fine. The domain
is paid for separately and cancelling Squarespace doesn't touch it.

## 2. TODAY — save everything off the old site

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

## 3. Before the 20th — get the new site live

Follow the steps below. If the domain switch isn't finished by the 20th,
`texas180dc.org` will show nothing for a few days. Not fatal, but avoidable —
and Google may drop you from results if it stays down.

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

Vercel runs the site. Free, and no card required.

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

> ⚠️ **Do not cancel Squarespace during this step.** If the domain came bundled
> with the plan, cancelling first can put `texas180dc.org` into a recovery
> state that costs $80–200 to get back.

### 3a. Find out who holds the domain

1. Go to **lookup.icann.org**
2. Type `texas180dc.org` → Lookup
3. Find the **Registrar** line and write it down

That name tells you where to log in for the next part. It'll be Squarespace,
Google, GoDaddy, Namecheap, or similar.

### 3b. Tell Vercel about the domain

1. In Vercel: your project → **Settings** → **Domains**
2. Type `texas180dc.org` → **Add**
3. Vercel shows you records to create — usually:
   - Type `A`, Name `@`, Value `76.76.21.21`
   - Type `CNAME`, Name `www`, Value `cname.vercel-dns.com`
4. **Leave this tab open.** Use the values Vercel shows you, not the ones above,
   in case they've changed.

### 3c. Add those records at your registrar

1. Log in wherever step 3a said
2. Find **DNS**, **DNS settings**, or **Manage domain**
3. Add the two records exactly as Vercel showed
4. Save

Now wait. Usually 10–30 minutes, occasionally up to 48 hours. Vercel's Domains
page shows a green tick when it's working and sets up HTTPS automatically.

**✅ Check:** `https://www.texas180dc.org` loads the new site, on your laptop
**and** on your phone with wifi off.

### 3d. Only now, deal with Squarespace

1. **Download anything you still want from the old site first** — nine client
   logos on the new site currently load from Squarespace and will break when
   the subscription ends. See `public/logos/README.md`.
2. Cancel the Squarespace subscription.
3. Check the renewal date first — Squarespace refunds annual plans within 14
   days of renewal, so timing this right can save a year's fee.

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
