# Workout Tracker

Personal 5-day workout & nutrition tracker. React + Vite + Tailwind, localStorage only, mobile-first PWA.

## Run locally
```bash
npm install --legacy-peer-deps
npm run dev
```

## Deploy to GitHub Pages
1. Create a public repo named `workout-tracker` under your GitHub account.
2. Push this directory to that repo's `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.
5. App lives at `https://hyrumparamore.github.io/workout-tracker/`.

## Install on your phone
Open the deployed URL in Safari (iOS) or Chrome (Android) → Share → **Add to Home Screen**. Runs fullscreen, works offline.

## What's here
- **Today** — today's workout with a progressive card-by-card follower, rep counter, weight input, rest timer, water tracker, and macro summary.
- **Schedule** — read-only view of the 5-day split.
- **Nutrition** — daily macro log, meal timing guide, **lunch and dinner recipe ideas** with ingredients + steps, staple food list, do's/don'ts.
- **Progress** — weight chart (Recharts), streak, phase timeline, settings.

## Replace placeholder PWA icons
`public/pwa-192.png` and `public/pwa-512.png` are 1×1 placeholders. Drop in real square PNGs at those sizes when ready.
