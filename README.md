# SIRGPrice.github.io

Personal site of **Antón Fernández Pérez** — a live, API-driven view of my GitHub work.

🌐 **Live site:** [sirgprice.github.io](https://sirgprice.github.io/)

## About

A single-page site with a LlamaIndex-inspired visual language: monochrome base, aurora gradient accent, monospace labels and generous whitespace. All content is rendered at runtime from the public GitHub REST API.

## Stack

- Pure HTML, CSS, and vanilla JavaScript — no build step, no dependencies.
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via Google Fonts.
- Public GitHub REST API for live data.
- Hosted on [GitHub Pages](https://pages.github.com/).

## Files

| File         | Purpose                                                              |
| ------------ | -------------------------------------------------------------------- |
| `index.html` | Page structure and metadata.                                         |
| `styles.css` | Visual system: light theme, gradient accent, grid, typography.       |
| `script.js`  | Fetches profile + repos from `api.github.com`, renders project grid. |

## Bidirectional linking

The repository's **Website** field on GitHub is set to [sirgprice.github.io](https://sirgprice.github.io/), and the site links back to the source repo and the [@SIRGPrice](https://github.com/SIRGPrice) profile.

## Local preview

No build needed. Open `index.html` in a browser, or serve the directory:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## License

MIT — see [LICENSE](./LICENSE).
