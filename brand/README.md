# Studio logos / favicons

One icon family for the TABEE tools. Rules: colour = accord (maroon #7B1E2E = EAC/ENG, teal #0B5D6B = ETC),
cut top-right corner = ETC, white glyph = tool (T portal, magnifier PEV Studio, mortarboard PEV training,
bars Quiz & Poll, orange bulb Brainstorm).

- `logos/*.svg` – masters (64×64 viewBox), written by `make_svgs.py`
- `render.js` – renders 16/32/48 px PNGs and 180 px full-bleed apple-touch icons (Playwright)
- `install.py` – copies `favicon.svg/.ico` + `apple-touch-icon.png` (and `quiz-poll.*` for Quiz & Poll) into each app folder and adds the `<!-- favicon -->` block to every page

To change a logo: edit `make_svgs.py`, then

    python3 brand/make_svgs.py && node brand/render.js /tmp/png && python3 brand/install.py /tmp/png
