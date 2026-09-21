# Avinash Patel — Portfolio

Personal portfolio site for Avinash Patel, a product designer. Built with React, Vite, and Tailwind CSS v4.

## Pages

- **Home** — hero, about, brands worked with, and highlights
- **Work** — featured projects, including a password-gated case study
- **Resume** — experience, education, domains, and competencies
- **Contact** — contact form and details
- **Case Study** — Customer Signals Intelligence (password-protected)

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## Getting started

```bash
npm install
npm run dev
```

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint

## Media hosting

Production media is served from the `media.avinashpatel.in` Cloudflare R2
custom domain. Set `VITE_MEDIA_BASE_URL` to override that origin. When the
variable is unset during local development, the app uses the checked-in images
and `public/` files instead.

The case-study prototype video is not committed to the current tree and is not
included in the Pages output because it exceeds Pages' per-file asset limit.

## Continuous deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which installs,
lints, builds, and directly uploads `dist/` to the existing
`avinashpatel-portfolio` Cloudflare Pages project. The workflow uses direct
upload and does not require the Cloudflare GitHub app.

An administrator of this GitHub repository must add these Actions secrets:

- `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account that owns the Pages project
- `CLOUDFLARE_API_TOKEN` — a scoped token with Account / Cloudflare Pages / Edit

Never commit either value to the repository.
