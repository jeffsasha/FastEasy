# Fast Easy LLC — Mortgage & Insurance

[![Live site](https://img.shields.io/badge/Live-fasteasy.net-2563eb?style=flat-square)](https://fasteasy.net)

Bilingual (Chinese/English) marketing site for Fast Easy LLC, a mortgage and insurance brokerage.

🌐 **[Visit the live site →](https://fasteasy.net)**

![Fast Easy LLC homepage](assets/hero-mortgage-insurance.png)

Pure static site: hand-written HTML, CSS and vanilla JS — no frameworks, no build step, no backend. Served via GitHub Pages on a custom domain.

## What's inside

- Bilingual hero, services (mortgage & insurance), team, news, and application form
- `index.html` — entire site (hero, services, team, news, application form)
- `styles.css` — all styling
- `script.js` — small UI interactions
- `assets/` — team photos, hero image, logo
- `CNAME` — custom domain (`fasteasy.net`) for GitHub Pages

## Contact / application form

The application form has no server backend: submitting opens the visitor's email client with a pre-addressed message (`mailto:`). Do not treat form submissions as securely transmitted — anyone wiring a real backend should replace the `mailto:` flow with a form service first.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
