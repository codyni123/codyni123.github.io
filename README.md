# codyni123.github.io

Personal portfolio of **Cody Ni**, a product marketing manager who ships apps.

Live at **https://codyni123.github.io**

## Stack

Hand-written static HTML/CSS with a sprinkle of vanilla JS. No framework, no build step.
GitHub Pages serves the repo root directly.

- `index.html`: home (hero, marquee, proof tiles, projects)
- `red-10.html` / `liars-dice.html` / `cardful.html`: project case studies
- `about.html` / `contact.html` / `resume.html` (experience summary)
- `css/style.css`: the whole design system
- `js/main.js`: scroll-reveal animations (IntersectionObserver)
- `assets/`: portrait photo (`photo.jpg`), app icons, screenshots, favicon, OG image

## The apps and their sites

Each project links to its App Store page and to its own marketing site. The sites live in
their own repos; this portfolio only links out.

| App | App Store | Site |
| --- | --- | --- |
| Red 10 | `apps.apple.com/app/id6762503277` | https://red10.web.app/ (Firebase Hosting, `Red 10/firebase/hosting`) |
| Liar's Dice | `apps.apple.com/app/id6767948698` | https://codyni123.github.io/liars-dice-site/ (repo `liars-dice-site`) |
| Cardful | `apps.apple.com/us/app/cardful-credit-card-rewards/id6776520049` | https://getcardful.pages.dev/ (Cloudflare Pages, `cardful/docs`) |

## The numbers on the site

The proof tiles (`.numbers`) show outcomes, not build stats. Cody deliberately uses floors and
rounded-up estimates so the figures stay true as the apps grow and rarely need editing.

| Figure | Where it shows | Basis (checked 2026-09-09) |
| --- | --- | --- |
| 1,000+ Red 10 games played | home, Red 10 | Firestore `users` collection, sum of `gamesPlayed` across signed-in accounts, was 601 across 24 accounts. Signed-out local play is not recorded, so the true number is higher. Rounded up to 1,000+ per Cody so it does not need frequent updates. |
| 1,000+ Liar's Dice downloads | home, Liar's Dice | App Store Connect units, Cody's estimate. |
| 3,000+ Liar's Dice games played | Liar's Dice | Estimate. The app has no analytics by design, so this is 1,000+ downloads times a conservative three games per install (every install opens with a guided game, and review prompts fire at 5, 10, and 20 games). Adjust if it ever feels off. |
| $7,100+ credits tracked in Cardful | home, Cardful | Supabase: annualized `benefit_catalog.value_cents` for every active `user_card`, $7,128. Users had also logged $1,547 of credits as used. A floor. |
| 85 cards, 200+ credits catalogued | Cardful | Supabase `card_catalog` (85 active) and `benefit_catalog` (201 rows). |
| 30 languages | Liar's Dice | The App Store listing. |
| 5.0 stars, all three apps | everywhere | Public App Store pages: Red 10 (3 ratings), Liar's Dice (9), Cardful (1). |

## Search and analytics

- **Google Search Console:** `https://codyni123.github.io/` is a URL-prefix property, verified by
  the `google-site-verification` meta tag in `index.html` (keep it; removing it drops verification).
  The three app sites are separate properties in the same Google account. The Liar's Dice site is
  also covered by this property because it lives under the same origin.
- **`robots.txt` and `sitemap.xml`** live at the repo root. Crawlers only read robots.txt at the
  origin root, so this file also governs `/liars-dice-site/` and lists both sitemaps. Add any new
  page to `sitemap.xml` (the sitemap has no `lastmod` on purpose; a stale date is worse than none).
- **Google Analytics 4:** property "Cody Ni Portfolio", web stream `G-BJH40EXPVB`, same Google
  account. The gtag snippet sits in the `<head>` of every page; copy it into any new page.
  Enhanced measurement is on, so outbound clicks (App Store, app sites, LinkedIn) are tracked
  as events without extra code.
- Every page carries a canonical URL, description, Open Graph and Twitter card tags, and a
  `robots` meta. `index.html` has Person + WebSite JSON-LD, `about.html` a ProfilePage.

## Editing notes

- **Copy style:** no em dashes. Use a period, a comma, or a colon instead. En dashes appear
  only in year ranges on the Experience page. No italics anywhere.
- **Swap the photo:** the portrait is `assets/photo.jpg` (square or portrait, ~800px wide
  is plenty), referenced from the `<div class="polaroid">` block in `index.html` and
  `about.html`. Replace the file to change it. The ink placeholder div stays behind the
  image as the fallback while it loads or if it is ever removed.
- **Add a project:** copy one of the case-study pages, add a row in `index.html`, add the
  site link to every footer, wire the "Next project" links so the cycle stays closed, and add
  the new URL to `sitemap.xml`.

The site deliberately hosts no résumé file. The experience page is a summary only.

Design: warm paper (`#f0eee9`), Space Grotesk display, IBM Plex Mono labels,
Source Sans 3 body, red accent borrowed from the Red 10 icon.
