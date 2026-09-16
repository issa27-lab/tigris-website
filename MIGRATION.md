# Migration Guide — WP Engine → Cloudflare Pages

Full walkthrough for moving `tigrisautoglass.com` from WP Engine (WordPress) to Cloudflare Pages (this static site). Domain stays at GoDaddy.

**Estimated time:** 2–3 hours of hands-on work, spread over 7–10 days total (for DNS propagation and safety verification).

**Estimated savings:** $300–$1,200/year in WP Engine fees.

---

## What we're doing

```
BEFORE:
GoDaddy (domain) → WP Engine (hosting) → WordPress site

AFTER:
GoDaddy (domain) → Cloudflare Pages (hosting) → This static site
                        ↑
                 auto-deployed from GitHub
```

The domain stays the same. Visitors don't notice anything except a much faster site.

---

## Phase 1: Prep and back up (Day 1, 30 minutes)

### 1.1 Back up your WordPress site
1. Log into WP Engine dashboard
2. Go to your site → **Backup Points** → **Create Backup**
3. Wait for it to complete, then **Download** the backup file
4. Save it somewhere safe (Google Drive, Dropbox, external drive) — keep this file for at least 60 days after migration in case anything goes wrong

### 1.2 List all your WordPress URLs

You need this so we can set up proper redirects. Do one of the following:

**Option A — WordPress admin:**
1. Log into `tigrisautoglass.com/wp-admin`
2. Go to Pages → All Pages
3. Note each page's URL (slug)

**Option B — Google:**
1. Go to Google, search `site:tigrisautoglass.com`
2. Note every URL that shows up

**Option C — Google Search Console** (if you have it set up):
1. Log in → Coverage → Valid pages
2. Export the list

**What to look for:** every URL that isn't the homepage. Common ones:
- `/about/` or `/about-us/`
- `/services/` or specific like `/services/windshield-replacement/`
- `/contact/` or `/contact-us/`
- `/testimonials/` or `/reviews/`
- Any blog posts at `/blog/some-post-title/`

**Save this list — you'll need it for Phase 5.**

### 1.3 Copy any content you want to keep

If your WordPress site has content that isn't in the new site — testimonials, blog posts, extra service details — copy it into a document now. Once you cancel WP Engine, it's gone.

### 1.4 Note your GoDaddy login and 2FA method

You'll be logging into GoDaddy in Phase 4. Make sure you can access it — reset password now if needed.

---

## Phase 2: Push code to GitHub (Day 1, 30 minutes)

Follow the steps in `SETUP.md`:
1. Create GitHub account (if you don't have one)
2. Install Git
3. Create a new repo (public is fine — it's just a marketing site)
4. Push all the files from the `tigris-site` folder

At the end of Phase 2, you should be able to see all your files at `https://github.com/YOUR-USERNAME/YOUR-REPO`.

**Do NOT enable GitHub Pages** — we're using Cloudflare instead.

---

## Phase 3: Connect Cloudflare Pages (Day 1, 15 minutes)

### 3.1 Sign up for Cloudflare
1. Go to https://dash.cloudflare.com/sign-up
2. Create free account
3. Verify your email

### 3.2 Create the Pages project
1. In the Cloudflare dashboard sidebar, click **Workers & Pages**
2. Click **Create application** → **Pages** tab → **Connect to Git**
3. Click **Connect GitHub** → authorize Cloudflare to access your GitHub account
4. Select your `tigris-website` repo
5. Click **Begin setup**
6. Configure:
   - **Project name:** `tigris-auto-glass` (this becomes your temporary URL)
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** _leave blank_
   - **Build output directory:** `/`
7. Click **Save and Deploy**

Wait ~30–60 seconds. Cloudflare will show "Success! Your project is deployed."

### 3.3 Test the temporary URL

You'll get a URL like `https://tigris-auto-glass.pages.dev`. Open it and test:
- All 7 pages load (nav links work)
- All images show up
- Fonts look right
- Contact form submits (shows the alert)
- Mobile menu works on phone-width browser
- Google Map loads on Contact page

If anything's broken, fix it locally, push to GitHub, and Cloudflare will auto-redeploy. Don't move to Phase 4 until the pages.dev URL looks perfect.

---

## Phase 4: Point tigrisautoglass.com to Cloudflare (Day 2, 30 minutes + wait time)

This is the "cutover" — where users start seeing the new site.

### 4.1 Add your domain in Cloudflare Pages
1. In Cloudflare Pages → your project → **Custom domains** tab
2. Click **Set up a custom domain**
3. Enter `tigrisautoglass.com` (no www, no https)
4. Click **Continue**
5. Cloudflare will show you DNS records to add. **Copy them.** They'll look like:
   ```
   Type: CNAME    Name: tigrisautoglass.com    Value: tigris-auto-glass.pages.dev
   Type: CNAME    Name: www                    Value: tigris-auto-glass.pages.dev
   ```
   *(Actual values depend on your project name)*

### 4.2 Add DNS records in GoDaddy

**⚠️ Do this at a low-traffic time** (evening or weekend). During the DNS switch, some users will see the old site and some the new — this is normal and lasts up to 24 hours.

1. Log into GoDaddy → **My Products** → find `tigrisautoglass.com` → **DNS**
2. **Take screenshots of all existing DNS records first** (safety net)
3. **Find and delete** the existing A records and CNAME records pointing to WP Engine:
   - Any A record with `@` pointing to a WP Engine IP address (usually starts with `141.` or `35.`)
   - Any CNAME record with `www` pointing to something at `wpengine.com`
4. **Add the new records** from Cloudflare:
   - Click **Add**, select **CNAME**
   - Name: `@` (or leave blank — GoDaddy varies)
   - Value: (whatever Cloudflare gave you, like `tigris-auto-glass.pages.dev`)
   - TTL: 600 (10 minutes) or 1 hour
   - Save
   - Repeat for the `www` CNAME
5. **Leave alone** any other records like MX (email), TXT (verification), etc. — these are for email and other services, don't touch them.

### 4.3 Wait for DNS propagation
- Cloudflare Pages will detect the DNS change usually within 5–15 minutes
- Full worldwide propagation can take up to 24 hours
- Once Cloudflare shows a green "Active" badge next to your domain, SSL is auto-installed

### 4.4 Verify
1. Wait 15 minutes, then visit `https://tigrisautoglass.com` in an incognito/private browser window
2. If you see the new site with a padlock icon, you're live! 🎉
3. If you still see the old WP Engine site, DNS hasn't propagated to your ISP yet — wait longer, try again from your phone on cellular data
4. Check https://tigrisautoglass.com from https://dnschecker.org to see propagation worldwide

---

## Phase 5: Set up SEO redirects (Day 2, 30 minutes)

**Critical for keeping your Google rankings.** If you skip this, any old URLs Google has indexed will return 404 errors and drop from search results.

### 5.1 Create the `_redirects` file

Using the URL list you made in Phase 1.2, create a file called `_redirects` (no extension, exactly that name) in the root of your repo.

Format is: `old-url  new-url  301` (three columns, one redirect per line).

Example (adjust based on your actual old URLs):

```
# Redirects from WordPress URLs to new static URLs
/about-us/                            /about.html                   301
/about-us                             /about.html                   301
/services/                            /services.html                301
/services/windshield-replacement/     /services.html#windshield     301
/services/windshield-replacement      /services.html#windshield     301
/services/auto-glass-repair/          /services.html#chip           301
/services/chip-repair/                /services.html#chip           301
/services/adas-calibration/           /services.html#adas           301
/services/mobile-service/             /services.html#mobile         301
/contact-us/                          /contact.html                 301
/contact-us                           /contact.html                 301
/contact/                             /contact.html                 301
/testimonials/                        /reviews.html                 301
/reviews/                             /reviews.html                 301
/faq/                                 /faq.html                     301
/service-areas/                       /areas.html                   301

# Fallback: any /blog/anything redirects to homepage (or remove if you're keeping blog)
/blog/*                               /                             301
```

**301** = "moved permanently" — this tells Google to update its index.

### 5.2 Commit and push

```bash
git add _redirects
git commit -m "Add SEO redirects from old WordPress URLs"
git push
```

Cloudflare auto-deploys in ~30 seconds. Redirects are live.

### 5.3 Test redirects

Visit each old URL manually. Each should automatically redirect to the new equivalent. If any don't, check the `_redirects` file syntax — trailing slashes matter.

---

## Phase 6: Update external references (Day 2–3, 30 minutes)

Update anywhere you've linked to the old URLs:

- **Google Business Profile** — verify the website URL still points to `tigrisautoglass.com`. Update service pages if you had deep-linked them (like `/services/windshield-replacement/`) to new URLs (`/services.html#windshield`).
- **Google Ads** — check ad landing page URLs. If any point to specific WordPress pages, update to new URLs. **This is important — broken landing page URLs will pause your ads.**
- **Facebook / Instagram / Yelp / Nextdoor** — update the website URL on your business profiles
- **Google Search Console** — if you use it, submit the new sitemap: `https://tigrisautoglass.com/sitemap.xml`
- **Email signatures, business cards, invoices** — no rush, but update over time

---

## Phase 7: Wait and verify (Days 3–7)

Before canceling WP Engine, monitor for a week:

- ✅ Site loads consistently at `https://tigrisautoglass.com` from multiple devices
- ✅ Contact form submissions arriving (test yourself, and watch for real ones)
- ✅ Google Ads still running normally (no landing page errors)
- ✅ No "404 not found" reports from customers
- ✅ Google Search Console shows the new pages being indexed
- ✅ No drop in call volume — if there is, investigate immediately

**Common issue to watch for:** Any bookmarks, printed materials, or Google cached results pointing to old URLs that you missed in the `_redirects` file. Add redirects as needed.

---

## Phase 8: Cancel WP Engine (Day 8+, 15 minutes)

Once you're confident (7+ days of the new site running smoothly):

1. Log into WP Engine
2. **Download one final backup** and save it (60-day safety net)
3. Go to Account → Billing → Cancel plan
4. WP Engine may offer discounts to keep you — decline unless you actually want to stay
5. Confirm cancellation

Your credit card is no longer charged. Your $300–$1,200/year in savings starts now.

---

## Ongoing costs

| Service | Cost |
|---------|------|
| GoDaddy domain renewal | ~$20/year (once a year) |
| Cloudflare Pages | $0 |
| GitHub | $0 |
| Claude Code (usage) | Depends on plan you're on |

That's it. You went from $25–100/month to essentially free hosting.

---

## What to do if something goes wrong

### "Site isn't loading at all"
- Check Cloudflare Pages dashboard — is there a deploy error?
- Check DNS in GoDaddy — did you delete a critical record?
- Nuclear option: change GoDaddy DNS back to the WP Engine records you screenshotted in Phase 4.2. WordPress site comes back within an hour.

### "Site loads but images/styles are broken"
- Check your GitHub repo — did all files upload correctly?
- Check the Cloudflare deploy log for errors

### "Contact form isn't sending emails"
- The form currently only shows an alert. See `CLAUDE_CODE_GUIDE.md` under "Wire up the contact form" — Cloudflare Pages supports Cloudflare Turnstile + a form-forwarding service, or you can use Formspree ($0 for low volume).

### "My Google ranking dropped"
- Give it 2–4 weeks. Google needs time to re-crawl and re-index.
- Verify all redirects work by clicking through your old URLs manually.
- Submit the new sitemap in Google Search Console.
- If you missed URLs in `_redirects`, add them.

---

## Quick reference

- **Old site backup location:** _(fill in yourself — Google Drive folder, etc.)_
- **GitHub repo:** `https://github.com/YOUR-USERNAME/YOUR-REPO`
- **Cloudflare Pages project:** `https://dash.cloudflare.com/[account-id]/pages`
- **GoDaddy DNS management:** `https://dcc.godaddy.com/manage/tigrisautoglass.com/dns`
- **WP Engine dashboard:** `https://my.wpengine.com`

Print this or save it somewhere accessible before you start.
