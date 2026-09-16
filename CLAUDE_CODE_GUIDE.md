# Claude Code Playbook — Tigris Auto Glass

A practical guide to using Claude Code with this repo. Copy these prompts directly when you need them.

## Setup (one-time)

1. **Install Claude Code:** Follow the install guide at https://docs.claude.com/en/docs/claude-code
2. **Open a terminal**, `cd` into this repo:
   ```bash
   cd path/to/tigris-site
   ```
3. **Start a session:**
   ```bash
   claude
   ```

Claude will read `CLAUDE.md` automatically and have full context.

---

## Common tasks (with copy-paste prompts)

### 📞 Update the phone number across the entire site

> "Update the phone number from (916) 476-3052 to NEW-NUMBER everywhere it appears — nav, footer, topbar, contact page, and any tel: links."

### 🕐 Change business hours

> "Update business hours from 'Mon–Sat 8:30 AM – 5:00 PM' to 'NEW HOURS' across all pages — topbar, contact page, footer, and FAQ."

### ✏️ Edit the homepage hero text

> "On the homepage, change the H1 hero text from 'Sacramento's trusted auto glass shop' to 'NEW HEADLINE'. Make sure the cyan accent span stays on the right word."

### 🖼️ Replace a service photo

> "I added a new image at images/new-windshield.png — swap it in for the windshield service photo on services.html and verify the alt text."

### ➕ Add a new FAQ question

> "Add a new FAQ to the 'Insurance & Pricing' category on faq.html: question 'WILL YOU MATCH SAFELITE'S PRICE?', answer 'YES, IN MOST CASES — CALL US WITH THEIR QUOTE...'. Use the same accordion structure as existing FAQs."

### 🌟 Add a new customer review

> "Add a new review to reviews.html. Customer: Jane D. from Folsom. Service: Windshield Replacement. Quote: 'BEST EXPERIENCE EVER...'. Use the same card structure as existing reviews."

### 🏙️ Add a new service area city

> "Add 'Rocklin' to our service areas. Update areas.html (coverage list, city cards, map) and the footer of all pages if it lists cities."

### 🎨 Change the brand cyan color

> "I want to make the cyan accent slightly darker. Change --cyan from #00A8E8 to #0090c8 in styles.css. Don't change the navy or amber."

### 📝 Wire up the contact form to send emails

> "I want the contact form on contact.html to actually send emails. Set it up using Netlify Forms — show me what HTML changes I need and what to do in the Netlify dashboard."

### 🚀 Add Google Analytics

> "Add Google Analytics tracking to all 7 pages. My measurement ID is G-XXXXXXXXXX. Put the snippet in the <head> right before </head>."

### 🔍 Add SEO improvements

> "Audit each page's <title> and meta description for SEO. Suggest improvements that target Sacramento auto glass keywords without keyword stuffing."

### 📱 Make a section more mobile-friendly

> "On services.html, the service detail blocks look cramped on phones. Improve the mobile layout for screens under 600px."

### 🆕 Add a brand new page (e.g., a blog)

> "I want to add a blog at blog.html. Use the same nav and footer as other inner pages. The blog should have a hero, a grid of 6 article cards, and a footer CTA. Don't worry about article content yet — use placeholder titles. Then add 'Blog' to the nav of all 7 existing pages."

### ⚡ Add a new section to the homepage

> "Add a new 'Insurance Partners' section between the stats band and testimonials on the homepage. Show logos for State Farm, GEICO, Progressive, Allstate, Farmers, USAA, AAA, Mercury. Use placeholder text or simple logo cards if I don't have logo images yet."

### 🐛 Fix a bug

> "On mobile, the FAQ accordion icon doesn't rotate properly when opened. Investigate and fix."

### 🧹 Clean up the code

> "Look through styles.css for any unused or duplicate CSS rules and clean them up. Don't change visual output."

---

## Tips for working with Claude Code

### Be specific about scope
- "Update the homepage" ❌ vague
- "Update the H1 on the homepage" ✅ specific

### Mention "all pages" when you mean it
Because nav/footer/topbar are duplicated in 7 files, when something needs to change everywhere, say so:
- "Update the phone number **across all pages**"
- "Add this to the footer **on every HTML file**"

### Ask for review before commit
- "Show me the diff before committing"
- "What did you change? Walk me through it"

### Ask Claude to test
- "After making the change, open the page locally and check that nothing broke"
- "Show me a curl/grep that proves the phone number is consistent across all files"

### Iterate, don't redo
If Claude's first attempt isn't right:
- "Closer, but make the headline a bit shorter and remove the second paragraph"
- "Keep what you did, but change the button color from cyan to navy"

### Use git as a safety net
Before any big change, commit your current state:
```bash
git add -A && git commit -m "Save before edits"
```
If Claude makes a mess, `git reset --hard HEAD` undoes everything.

---

## Things Claude Code is great at for this project

- ✅ Updating copy across multiple files at once
- ✅ Adding new sections that follow existing patterns
- ✅ Refactoring CSS without changing visuals
- ✅ Adding new pages with the same nav/footer
- ✅ Wiring up forms to email services
- ✅ SEO audits and meta tag improvements
- ✅ Adding tracking, analytics, schema.org markup
- ✅ Making responsive improvements
- ✅ Adding new images and updating their references

## Things Claude Code probably can't do

- ❌ Generate new photography (you'll need a photo or AI image generator)
- ❌ Set up GitHub Pages or Netlify (it can guide you, but UI clicks are on you)
- ❌ Approve marketing claims with legal/factual issues — only you can do that
- ❌ Buy a domain or set DNS records

---

## When something breaks

```bash
# See what changed
git status
git diff

# Undo all changes since last commit
git reset --hard HEAD

# Undo a specific file
git checkout filename.html
```

If you committed broken code:
```bash
# See recent commits
git log --oneline -10

# Roll back to a previous commit (replace HASH)
git reset --hard COMMIT_HASH
```

---

## When you're done editing

```bash
git add -A
git commit -m "Describe what you changed"
git push
```

If you have GitHub Pages or Netlify connected, your site auto-deploys in ~1 minute.
