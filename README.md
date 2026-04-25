# MU Colloquium Final Public-Computer Bundle

This is the lean presentation bundle for the current colloquium deck.

It keeps only the files needed to serve the website:

- `colloquium-academic-final-modular-rebuilt/` — the live slide deck
- `figures/` — only the top-level figures referenced by the live deck
- `vendor/` — the KaTeX assets referenced by the slides
- `.nojekyll` — makes the bundle safe for direct GitHub Pages static serving
- `index.html` — redirects the site root to the deck overview

## Best presentation setup

The cleanest option is **GitHub Pages**.

Why:

- this deck is already a static HTML/CSS/JS site
- the site root in this bundle redirects directly to the deck overview
- all internal slide links are relative, so they work when published from a repo root or a `docs/` folder

## How to use this bundle

### Option A — GitHub Pages

1. Create a new repository for the talk, or use a clean branch/folder in an existing repo.
2. Upload the contents of this bundle as the published site source.
3. Enable GitHub Pages for that source.
4. Open the site root URL in the public-computer browser.

Because `.nojekyll` is included, GitHub Pages can serve these files directly without trying to run Jekyll over them.

### Option B — Local browser with a tiny server

From this folder:

```bash
./serve-local.sh
```

Then open:

```text
http://127.0.0.1:8000/
```

You can also choose a port:

```bash
./serve-local.sh 8010
```

## Important practical note

This bundle is lean, but the current deck still pulls **Google Fonts** and **Reveal.js CSS/JS from CDNs**.

So:

- **GitHub Pages + internet** is the best primary plan
- **local bundle + internet** also works
- **fully offline presentation** is not yet hardened

## Recommended next steps

1. Use **GitHub Pages** as the primary presentation URL.
2. Keep this bundle on a USB drive as the local fallback.
3. Bring a single exported PDF as the emergency backup.
4. If you want true offline robustness, the next packaging pass should vendor Reveal.js and fonts locally.
