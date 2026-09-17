# CLAUDE.md

This file gives Claude Code context about the Tigris Auto Glass website. Read this before making any changes.

## What this is

A static marketing website for **Tigris Auto Glass**, a brick-and-mortar auto glass repair shop in Sacramento, California. The site has 7 pages, each about 400-700 lines of HTML, sharing one CSS file and one JS file.

The audience is local Sacramento drivers who need a windshield repaired, replaced, or recalibrated. Most are coming from Google searches or ads. The job of the site is to build trust and get them to call (916) 476-3052 or fill out the contact form.

## Stack and constraints

- **Pure static HTML/CSS/JS.** No build step, no npm, no framework.
- **Don't introduce build tooling, React, Tailwind, or any framework** unless the user explicitly asks. If the user asks for "a fancier interaction" or similar, do it in vanilla JS first.
- **Don't add npm dependencies.** No `package.json` exists and shouldn't be added without explicit consent.
- **External resources allowed:** Google Fonts, Google Maps embed iframe, and the Google tag `GT-WB7MKQK` (gtag.js in every page's `<head>` — it powers Google Ads conversion tracking and Analytics; never remove it). Nothing else unless requested.

## Files

```
index.html          Homepage
about.html          About page
services.html       All 7 services in detail
areas.html          Service area coverage
reviews.html        Customer reviews
faq.html            FAQ accordion
contact.html        Contact form + map
styles.css          SHARED design system (used by every page)
script.js           SHARED interactions (used by every page)
images/             Branded product photos (PNG, do not delete)
README.md           Human-facing repo doc
CLAUDE.md           This file
```

Each HTML page is self-contained for its layout but loads `styles.css` and `script.js`. Page-specific CSS goes in a `<style>` tag in that page's `<head>` — keep it there, don't move it to `styles.css` unless it's truly reused across pages.

## Critical: shared header/footer/nav

Every page has the same `<nav>`, `<footer>`, top bar, and breadcrumb structure. **There's no template engine — these are duplicated across all 7 HTML files.**

If the user asks to change something in the nav (add a link, change phone number, change hours, etc.), you MUST update all 7 HTML files. Don't update one and forget the rest.

A safe pattern: use `grep` to find every occurrence, then `str_replace` on each file.

```bash
# Example: find all phone numbers
grep -l "916) 476-3052" *.html

# Example: change a nav link across all pages
grep -l "Reviews</a>" *.html
```

If you change something nav-related on one page, **always verify the same change applies to the other 6 pages.**

## Brand voice — what to say

- Honest, local, no hype. We're a real shop in Sacramento, not a chain.
- Lead with shop visits; treat mobile as a supplement for customers who can't come in.
- Trust signals: AAA Approved, Autel ADAS Certified, CA Safety Inspection Center, lifetime warranty, $0 deductible, 1,000+ Google reviews at 4.7★.
- Specific over vague: "60–90 minutes" not "fast."

## Brand voice — what NOT to say

These are explicitly forbidden. The user has had legal/factual issues with them:

- ❌ "OEM-quality glass" (not certifiable)
- ❌ "$99 windshield" or "$49 chip repair" (specific pricing not approved)
- ❌ "5-star rated" / "4.9 stars" / "500+ five-star" (use the real Google number: 4.7★ from 1,000+ reviews)
- ❌ Any pricing claim that isn't insurance-related

When the user asks you to write new marketing copy, stick to approved selling points only. If you're unsure, ask before writing.

## Business facts (verify these before changing anything)

- Phone: **(916) 476-3052** — appears in topbar, nav CTA, footer, contact page, multiple CTAs per page
- Address: **1054 El Camino Ave, Sacramento, CA 95815**
- Hours: **Mon–Sat 8:30 AM – 5:00 PM**, closed Sunday
- 7 services: Windshield Replacement, Chip & Crack Repair, Side Window, Rear Window, Power Window Repair, ADAS Calibration, Mobile Service
- 8 service-area cities: Sacramento, Rancho Cordova, Elk Grove, Roseville, Folsom, Citrus Heights, Fair Oaks, Carmichael
- Insurance: State Farm, GEICO, Progressive, Allstate, Farmers, USAA, AAA, Mercury (these names appear in the contact page tags)

If the user asks to update any of these, change them in **every** file where they appear. Especially the phone number — it's everywhere.

## Design system

All design tokens are CSS variables in `styles.css` under `:root`. Change them there to update the whole site.

```css
--navy:    #0A2342    /* primary brand */
--cyan:    #00A8E8    /* accent / CTAs */
--amber:   #FFB400    /* review stars */
--bg:      #FFFFFF    /* page background */
--bg-2:    #F6F8FB    /* alternating sections */
--display: 'Plus Jakarta Sans'
--body:    'DM Sans'
```

Don't introduce new colors without asking. If you need a tint or shade, use `rgba()` of an existing variable, or add a new variable named consistently (`--cyan-soft`, `--navy-3`, etc.).

## Common patterns

### Adding a new section to a page
1. Find a similar existing section in that page's HTML
2. Copy the structure
3. Use existing classes (`.section-head`, `.eyebrow-pill`, `.section-title`, `.btn-cyan`, `.btn-navy`, etc.)
4. Use CSS variables for any colors
5. Add `.reveal` class to elements that should fade in on scroll

### Adding a new page
1. Copy an existing inner page (e.g., `faq.html`) as a template
2. Update `<title>`, meta description, breadcrumb, h1
3. Update the nav `class="active"` to point to the new page
4. **Add the new page link to the nav and footer of all 7 existing pages**
5. Build the page content using existing component classes

### Editing copy
- Most copy is inline in the HTML files
- Hero text is in `<h1>` inside `.hero-inner` (homepage) or `.page-header-inner` (other pages)
- Section copy is in `.section-title` and `.section-sub`
- Be careful with HTML-encoded characters: `&amp;` for `&`, `&apos;` for apostrophe in HTML attributes

### Editing styles
- Page-specific styles live in each page's `<style>` block in `<head>`
- Shared/reused styles go in `styles.css`
- Always prefer adding to `styles.css` if the style would be reused

### Adding interactivity
- Vanilla JS only — go in `script.js`
- Don't introduce jQuery, React, or anything else
- Existing patterns: IntersectionObserver for scroll reveal, click toggle for FAQ

### Forms / calls to action
- **There are no forms on the site (by owner decision, Sept 2026).** The only call to action is the phone number: `tel:9164763052`. Every "quote" / "book" button is a call button.
- Do not add a contact form, quote form, newsletter signup, or chat widget unless the owner explicitly asks.

## Things to be careful about

- **Don't break the topbar `<a>` link styling.** It's `color: var(--cyan)` and bold inside the navy bar. If you accidentally remove the cyan color, the link disappears against the navy background.
- **Don't remove the `loading="lazy"` attribute on the Google Maps iframe** in contact.html — it improves page load speed.
- **Mobile menu** uses `id="navLinks"` and `id="menuBtn"` — don't change those without updating `script.js`.
- **The `.reveal` scroll-reveal animation** uses IntersectionObserver. If you add new content that should fade in, add the `.reveal` class. Don't add it to elements that should always be visible (like h1 in heroes — those are above the fold).

## Testing changes

There's no automated test suite. After making changes:

1. Open the affected page(s) in a browser
2. Click through the nav to make sure links still work
3. Resize the browser to mobile width — make sure layout still works
4. Test the mobile menu toggle (hamburger icon)
5. Test FAQ accordions if you touched FAQ
6. Confirm every CTA button is a `tel:9164763052` link (there are no forms)

## Deployment

- Site is deployed via **GitHub Pages** (or Netlify, depending on what the user set up).
- Pushing to `main` triggers auto-deploy.
- Changes go live within ~1 minute.

## When in doubt, ask

- Pricing claims → ASK before writing
- New marketing language → ASK if you're unsure if it matches brand voice
- Adding new dependencies/frameworks → ASK first
- Changing brand colors → ASK first
- Removing or restructuring sections → ASK first

For typos, copy edits, image swaps, layout tweaks, and adding new sections that follow existing patterns — go ahead.
