# MU Colloquium 2026

Static HTML slide deck for the University of Missouri colloquium talk:

**Data Geometry, Flow Dynamics, and Memorization in Diffusion Models**

View the published deck:

https://zhengchao-wan.com/mu-colloquium-2026-final/

## About

This repository contains the final web-published version of the talk. The slides are built as a modular HTML deck, with one HTML file per slide plus a deck overview page.

The talk introduces diffusion and flow-matching dynamics, then connects the geometry of denoisers to memorization behavior in trained diffusion models.

## Repository Layout

- `index.html` redirects the repository root to the deck overview.
- `colloquium-academic-final-modular-rebuilt/` contains the slide pages, deck overview, previews, and shared CSS/JS.
- `figures/` contains the images referenced by the published slides.
- `vendor/katex/` contains the local KaTeX runtime used for math rendering.
- `serve-local.sh` starts a small local web server for previewing the deck.

## Run Locally

```bash
git clone https://github.com/ZhengchaoW/mu-colloquium-2026-final.git
cd mu-colloquium-2026-final
./serve-local.sh
```

Then open:

```text
http://127.0.0.1:8000/
```

To choose a different port:

```bash
./serve-local.sh 8010
```

## Notes

The deck is published from the `main` branch with GitHub Pages.

Most presentation assets are committed in this repository. A few browser resources, such as Google Fonts and Reveal.js assets, are still loaded from public CDNs, so the HTML deck is intended for online viewing. For a fully offline presentation, use an exported PDF or vendor the remaining CDN dependencies.
