# codyni123.github.io

Personal portfolio of **Cody Ni** — product marketing manager who ships apps.

Live at **https://codyni123.github.io**

## Stack

Hand-written static HTML/CSS with a sprinkle of vanilla JS — no framework, no build step.
GitHub Pages serves the repo root directly.

- `index.html` — home (hero, marquee, selected work)
- `red-10.html` / `liars-dice.html` / `cardful.html` — project case studies
- `about.html` / `contact.html` / `resume.html` (experience summary)
- `css/style.css` — the whole design system
- `js/main.js` — scroll-reveal animations (IntersectionObserver)
- `assets/` — app icons, screenshots, favicon, OG image

## Editing notes

- **Add a photo:** drop a portrait at `assets/photo.jpg` (portrait orientation, ~800px wide
  is plenty). The home and about pages pick it up automatically; until then a monogram
  placeholder shows.
- **Add a project:** copy one of the case-study pages, add a row in `index.html`, and wire
  the "Next project" links so the cycle stays closed.

The site deliberately hosts no résumé file — the experience page is a summary only.

Design: warm paper (`#f0eee9`), Space Grotesk display, IBM Plex Mono labels,
Source Sans 3 body, red accent borrowed from the Red 10 icon.
