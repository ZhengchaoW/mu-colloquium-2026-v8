# Modular v5 Deck

This folder is the modular HTML version of the MU colloquium deck.

What it is:
- One standalone HTML file per slide.
- Shared styling in `shared/deck.css`.
- Shared navigation and math helpers in `shared/deck.js`.
- A click-through deck index at `index.html`.

Recommended workflow:
1. Edit the individual slide HTML files in this folder.
2. Open the slide you care about in the local server.
3. Use the nav bar or arrow keys to move between slides.

Bootstrap note:
- `build_colloquium_v5_modular.py` is a re-bootstrap tool from `colloquium-academic-v4.html`.
- Re-running it with `--force` will overwrite this modular deck directory.
