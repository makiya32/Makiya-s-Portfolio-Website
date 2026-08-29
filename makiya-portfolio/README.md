# Makiya Laurenza — Portfolio

Personal portfolio website built with React. Single-page with smooth anchor navigation.

## Tech Stack
- React (Create React App)
- Google Fonts: Playfair Display + DM Sans
- CSS Custom Properties (no external CSS library)

## Color Palette
- Crimson: `#A94A4A`
- Gold: `#F4D793`
- Cream: `#FFF6DA`
- Sage: `#889E73`

## Local Development

```bash
npm install
npm start
```

Runs at `http://localhost:3000`

## Deploy to Vercel

### Option 1 — Via GitHub (recommended)

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/makiya32/<repo-name>.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Framework preset: **Create React App** (auto-detected)
5. **Important:** this repo keeps the app in the `makiya-portfolio` folder. Either:
   - Set **Root Directory** to `makiya-portfolio` in Vercel project settings, or
   - Use the root `vercel.json` in this repo (already configured)
6. Click **Deploy** — done!

Vercel auto-deploys on every push to `main`.

### Option 2 — Vercel CLI

```bash
npm install -g vercel
vercel
```

## Updating Content

All content lives in `src/App.js`:
- **NAV_LINKS** — navigation items
- **SKILLS** — skill categories and items
- **EXPERIENCE** — work history (add/remove entries)
- **PROJECTS** — project cards (add more here)

## SEO
Meta tags, OG tags, and page title are in `public/index.html`. Update `og:url` once your domain is live.

## Performance Tips
- Images: use WebP format, compress with [Squoosh](https://squoosh.app)
- If you add images later, import them and use React's `<img>` with `loading="lazy"`
