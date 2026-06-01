# SIRGPrice.github.io

Personal portfolio of **Antón Fernández Pérez** — focused on GitHub projects, contributions and code.

🌐 **Live site:** [sirgprice.github.io](https://sirgprice.github.io/)

## About

A minimalist, glassmorphism-styled single-page site that pulls live data from the public GitHub API — profile, repository list, and contribution graph — and is deployed automatically through [GitHub Pages](https://pages.github.com/).

## Stack

- Pure HTML, CSS and vanilla JavaScript (no build step, no dependencies)
- Public GitHub REST API for live data
- [ghchart.rshah.org](https://ghchart.rshah.org/) for the contribution graph
- Glassmorphism UI over an animated aurora gradient

## Files

| File         | Purpose                                                      |
| ------------ | ------------------------------------------------------------ |
| `index.html` | Page structure and metadata.                                 |
| `styles.css` | Visual system: gradient, glass surfaces, typography, motion. |
| `script.js`  | Fetches `/users/SIRGPrice`, repos, and counts stars.         |

## Bidirectional linking

This repository is the source of truth for [sirgprice.github.io](https://sirgprice.github.io/). The repository's **Website** field on GitHub is set to that URL, and every page on the site links back to the source repository and to the [GitHub profile](https://github.com/SIRGPrice).

## Local preview

No build needed. Just open `index.html` in a browser, or:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## License

MIT — see [LICENSE](./LICENSE) if present, otherwise defaults to all-rights-reserved.
