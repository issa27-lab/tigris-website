# Setup Guide — Get the Site on GitHub

A walkthrough for getting this site onto GitHub and live online. Skip steps you've already done.

---

## Step 1: Create a GitHub account

If you don't have one: https://github.com/signup

Free tier is enough for everything in this guide.

---

## Step 2: Install Git on your computer

**Mac:** Open Terminal, run `git --version`. If it asks to install developer tools, accept. Done.

**Windows:** Download and install from https://git-scm.com/download/win

**Verify:**
```bash
git --version
# Should print something like: git version 2.39.x
```

---

## Step 3: Create a new repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `tigris-website` (or whatever you prefer)
3. **Description:** "Tigris Auto Glass marketing website" (optional)
4. **Public** (required for free GitHub Pages — set to Private if you have GitHub Pro)
5. **Do NOT** check "Add a README file" — we already have one
6. **Do NOT** add a .gitignore or license — we already have those
7. Click **Create repository**

You'll see a page with setup instructions. Keep this tab open — you'll need the repo URL.

---

## Step 4: Push the site files to GitHub

Open a terminal in the folder containing the `tigris-site` files (the folder with `index.html`, `styles.css`, etc.).

```bash
# Initialize git in this folder
git init

# Set the default branch name to main
git branch -M main

# Add all files
git add -A

# Make your first commit
git commit -m "Initial commit: Tigris Auto Glass website"

# Connect to your GitHub repo (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push everything to GitHub
git push -u origin main
```

GitHub may prompt you to log in. If it asks for a password, use a **Personal Access Token** instead of your GitHub password — create one at https://github.com/settings/tokens (classic) → Generate new token → check `repo` scope → copy and use as password.

When the push finishes, refresh your repo page on GitHub. You'll see all your files.

---

## Step 5: Enable GitHub Pages (free hosting)

1. On your repo page, click **Settings**
2. In the left sidebar, click **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait ~1 minute. The page will refresh with a green banner showing your site URL: `https://YOUR-USERNAME.github.io/REPO-NAME/`

That URL is now your live site.

---

## Step 6: (Optional) Use a custom domain

If you own a domain like `tigrisautoglass.com`:

1. In GitHub repo Settings → Pages → **Custom domain**, enter your domain (e.g. `tigrisautoglass.com`) and Save
2. At your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:

   For an apex domain (`tigrisautoglass.com`):
   ```
   Type: A     Name: @     Value: 185.199.108.153
   Type: A     Name: @     Value: 185.199.109.153
   Type: A     Name: @     Value: 185.199.110.153
   Type: A     Name: @     Value: 185.199.111.153
   ```

   For a subdomain (`www.tigrisautoglass.com`):
   ```
   Type: CNAME    Name: www    Value: YOUR-USERNAME.github.io
   ```

3. Wait up to 24 hours for DNS to propagate, then check GitHub Pages settings — once verified, check **Enforce HTTPS**.

---

## Step 7: Install Claude Code

https://docs.claude.com/en/docs/claude-code/quickstart

Once installed:

```bash
# Make sure you're in the repo folder
cd path/to/tigris-website

# Start a Claude Code session
claude
```

Claude reads `CLAUDE.md` automatically and gets full context on the project. See `CLAUDE_CODE_GUIDE.md` for example prompts.

---

## Step 8: Daily workflow

Once everything is set up, your editing loop looks like this:

```bash
# Pull latest (if you've edited from another device)
git pull

# Start a Claude Code session (or edit manually)
claude

# After making changes, commit and push
git add -A
git commit -m "Describe what you changed"
git push
```

Within ~1 minute of `git push`, your live site updates automatically.

---

## Quick reference

```bash
# See what files have changed
git status

# See exactly what changed
git diff

# Undo all uncommitted changes
git checkout .

# Undo the last commit (keep changes as uncommitted)
git reset HEAD~1

# View commit history
git log --oneline -20
```

---

## Troubleshooting

**"git push" asks for password and won't accept it**
You need a Personal Access Token. https://github.com/settings/tokens → Generate new token (classic) → check `repo` scope → use the generated token as your password.

**Site is live but images don't show**
The image paths must be relative (`images/hero.png`, not `/images/hero.png` or `https://...`). Open `index.html` in your browser locally — if images show there, they'll show on GitHub Pages.

**Changes pushed but site hasn't updated**
GitHub Pages takes 1–3 minutes. If 5+ minutes, check repo Actions tab for any deploy errors.

**404 on every page except homepage**
GitHub Pages serves files literally. The link `<a href="about.html">` works; `<a href="/about">` does not (unless you configure Jekyll, which we don't). All our internal links use the `.html` form so this should be fine.

---

## Need help?

Run `claude` in the repo folder, paste your question, and Claude Code will walk you through it.
