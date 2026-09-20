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

The case-study prototype video is **not** committed to this repo and is **not**
included in the build output. Cloudflare Pages rejects single assets over
25 MiB, and the source video is well past that.

It is served from object storage instead — Cloudflare R2, or AWS S3 if
deploying on AWS. Point the host's build environment at it:

```
VITE_CSI_VIDEO_URL=https://<your-bucket-url>/csi-prototype.mp4
```

See `.env.example`. If the variable is unset, the app falls back to
`public/videos/csi-prototype.mov`, a gitignored local copy used for
development only.
