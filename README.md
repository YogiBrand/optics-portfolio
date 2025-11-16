# Optical Design Portfolio — Eoin Dawson

A minimal, fast, and **interactive** portfolio for optical/photonics roles, built with **Next.js 14** and **Tailwind** and deployable on **Vercel**.

## Live Demos
- **AI‑accelerated SPR** — physics‑guided surrogate for λ_SPR with an overlaid planar model (Eq. 2.3.18), plus synthetic spectra.
- **AFM‑Vision** — upload AFM images; FFT‑based pitch estimation and simple defect overlay.
- **Polarization Explorer** — interactive intensity maps (sin²(ξ+θ), sin²ξ·sin²(ξ−θ)) from the thesis derivations.

## Quickstart (local)
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy on Vercel
1. Create a new GitHub repo and push this project.
2. In Vercel, **New Project → Import** your repo → Framework preset: Next.js.  
3. Build command: `next build` (default). Output: Next.js.  
4. Hit **Deploy**.
(See Vercel docs if new to deploying Next.js.)

## Folder map
```
app/                 # App Router pages
  case-studies/ai-spr
  case-studies/afm-vision
  demos/polarization
  thesis
  cv
components/
data/surrogate.json  # polynomial model weights for λ_SPR
public/resume.pdf
styles/
```

## Swapping in real solvers
- Replace the polynomial surrogate with RCWA (e.g., S4) generated data or a web‑worker backed solver. The predictor in `ai-spr/page.tsx` expects a function `predict(L, e, n)` returning λ_SPR.
- AFM‑Vision: replace the local‑contrast defect heuristic with a CNN or YOLO head; keep the pitch estimator if robust for your images.

## License
MIT
