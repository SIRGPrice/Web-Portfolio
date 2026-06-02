# Anton Fernández Pérez — Portfolio

Personal portfolio of **Anton Fernández Pérez** — a live, API-driven view of the work published under the [SIRGPrice](https://github.com/SIRGPrice) GitHub account.

🌐 **Live site:** [anton-fernandez-perez.com](https://anton-fernandez-perez.com)

## About

A single-page portfolio with a LlamaIndex-inspired visual language: monochrome base, aurora gradient accent, monospace labels and generous whitespace. Project cards are rendered at runtime from the public GitHub REST API.

The site is hosted on **GitHub Pages** and served at the custom domain **`anton-fernandez-perez.com`** (configured via the `CNAME` file in this repo; DNS managed in Cloudflare).

## Stack

- Pure HTML, CSS and vanilla JavaScript — no build step, no dependencies.
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via Google Fonts.
- Public GitHub REST API for live profile + repository data.
- Hosted on [GitHub Pages](https://pages.github.com/) with a custom domain.
- DNS at [Cloudflare](https://www.cloudflare.com/) (4 `A` records + 1 `www` `CNAME`, all DNS-only).

## Files

| File                | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `index.html`        | Page structure, metadata, chips and links.                           |
| `styles.css`        | Visual system: light theme, aurora gradient, grid, typography.       |
| `script.js`         | Fetches profile + repos from `api.github.com`, renders project grid. |
| `CNAME`             | Custom domain: `anton-fernandez-perez.com`.                          |
| `cv.pdf`            | Downloadable CV.                                                     |
| `codeblue-logo.png` | Brand mark (favicon + header logo).                                  |

## Profiles

- GitHub: [@SIRGPrice](https://github.com/SIRGPrice)
- Hugging Face: [CptnPrice](https://huggingface.co/CptnPrice)
- LM Studio: [sirgprice](https://lmstudio.ai/sirgprice)

## Local preview

No build needed. Open `index.html` in a browser, or serve the directory:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## License

MIT — see [LICENSE](./LICENSE).
