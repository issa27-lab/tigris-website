# Tigris Auto Glass — Website

Multi-page marketing website for [Tigris Auto Glass](https://tigrisautoglass.com), Sacramento's auto glass repair and replacement shop.

**Live site:** _(add your GitHub Pages or Netlify URL here once deployed)_

---

## Service & city pages

`services/<slug>.html` (7 pages) and `areas/<slug>.html` (8 pages) are dedicated SEO landing pages served at `/services/<slug>` and `/areas/<slug>`. They use absolute asset paths and are listed in `sitemap.xml`.

## Stack

Pure static HTML/CSS/JS. No build step, no framework, no dependencies.

- HTML5
- Vanilla CSS (CSS variables for theming)
- Vanilla JS (mobile menu, FAQ accordion, scroll reveal, form handling)
- Google Fonts: Plus Jakarta Sans (display) + DM Sans (body)

Why no framework? It's faster to load, dead simple to host (drop on any web server), trivial to edit, and Google indexes it instantly. For a local service business, this is the right choice.

---

## File structure

```
tigris-site/
├── index.html          Homepage — hero, why us, services preview, stats, testimonial, FAQ preview
├── about.html          About — story, values, certifications
├── services.html       Services — all 7 services in detail
├── areas.html          Service areas — coverage map + 8 cities
├── reviews.html        Reviews — 4.7★ / 1,000+ Google reviews summary + 9 testimonials
├── faq.html            FAQ — 13 questions across 3 categories
├── contact.html        Contact — info card, form, embedded Google map
├── styles.css          Shared design system (used by all pages)
├── script.js           Shared JS (mobile menu, FAQ, form, scroll reveal)
└── images/             Branded photography
    ├── hero.png        Homepage hero — technician with windshields
    ├── about.png       About page hero — technician with urethane gun
    ├── chip-repair.png Chip repair tool close-up
    ├── back-glass.png  Two technicians installing rear glass on Tesla
    ├── power-window.png Tech repairing window regulator
    ├── adas.png        ADAS calibration with Autel equipment
    └── mobile-service.png Branded mobile service van at customer's home
```

---

## Brand

**Colors** (defined in `styles.css` as CSS variables):

| Variable | Value | Use |
|----------|-------|-----|
| `--navy` | `#0A2342` | Primary brand color, headers, footer logo |
| `--cyan` | `#00A8E8` | Accent, CTAs, links, highlights |
| `--amber` | `#FFB400` | Review stars (sparingly used) |
| `--bg` | `#FFFFFF` | Page background |
| `--bg-2` | `#F6F8FB` | Alternating section background |
| `--text` | `#0A2342` | Body text |
| `--text-3` | `#6b7388` | Muted text, captions |
| `--line` | `#E5E9F0` | Borders, dividers |

**Typography:**
- Display: `Plus Jakarta Sans` (weights 500, 600, 700, 800)
- Body: `DM Sans` (weights 400, 500, 600, 700)

**Voice:** Honest, local, no hype. Shop-first messaging — Tigris is a real brick-and-mortar shop on El Camino, with mobile service available as a supplement.

---

## Business info (single source of truth)

These values appear across the site. Change them everywhere when they change.

- **Phone:** (916) 476-3052
- **Address:** 1054 El Camino Ave, Sacramento, CA 95815
- **Hours:** Monday – Saturday, 8:30 AM – 5:00 PM (closed Sunday)
- **Service areas:** Sacramento, Rancho Cordova, Elk Grove, Roseville, Folsom, Citrus Heights, Fair Oaks, Carmichael
- **Tagline:** Crystal Clear Excellence

### 7 Services
1. Windshield Replacement
2. Chip & Crack Repair
3. Side Window Replacement
4. Rear Window Replacement
5. Power Window Repair
6. ADAS Calibration
7. Mobile Service

### Certifications
- AAA Approved Auto Repair
- Autel ADAS Certified
- CA Safety Inspection Center

### Insurance accepted (direct billing)
State Farm, GEICO, Progressive, Allstate, Farmers, USAA, AAA, Mercury, and most others.

### ⚠️ Approved selling points (use these only)
- Same-day service
- Mobile technicians
- Insurance accepted, $0 deductible w/ insurance
- Lifetime warranty
- ADAS calibration in-house
- Free quotes
- 1,000+ Google reviews (4.7★ — match the live Google Business Profile number)
- 8+ years serving Sacramento

### ❌ DO NOT use these claims (legal/factual issues)
- "OEM-quality glass"
- "$99 windshield"
- "$49 chip repair"
- "5-star rated" (use "1,000+ Google reviews, 4.7★" instead)

---

## Local development

No setup required. Just open `index.html` in a browser.

For live-reload while editing, use any static server. Recommended:

```bash
# Option 1: Python (built into macOS)
python3 -m http.server 8000

# Option 2: Node
npx serve

# Option 3: VS Code "Live Server" extension (right-click index.html → Open with Live Server)
```

Then visit `http://localhost:8000`.

---

## Deployment

### Cloudflare Pages (recommended, free)
This site is designed to deploy to Cloudflare Pages via GitHub auto-deploy.
See `MIGRATION.md` for a full walkthrough (especially if migrating from WordPress/WP Engine).

### GitHub Pages (free, easiest)
1. Settings → Pages → Source: `main` branch, root folder
2. Site goes live at `https://YOUR-USERNAME.github.io/REPO-NAME/`
3. Updates auto-deploy on every push to `main`

### Netlify (free, custom domain easy)
1. Drag the `tigris-site` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), OR
2. Connect this GitHub repo to Netlify for auto-deploy

### Existing host (any provider)
Upload all files via FTP/cPanel. No special configuration needed.

---

## Working with Claude Code

This repo includes a `CLAUDE.md` file at the root with instructions for Claude Code. When you start a session, Claude Code reads it automatically and gets full context on:

- The project's stack and conventions
- Brand rules (what to say, what NOT to say)
- File structure and shared components
- Common edit patterns

To start: install [Claude Code](https://docs.claude.com/en/docs/claude-code), `cd` into this repo, and run `claude`.

---

## License

Proprietary — Tigris Auto Glass. All rights reserved.
