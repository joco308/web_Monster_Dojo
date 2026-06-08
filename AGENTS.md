# Monster Dojo — Agent Guide

## Environment
- **`node`/`npm` on Windows only** — source tree lives in WSL (`/mnt/c/...`), dev tooling runs on Windows. Cannot run `npm`/`node` from WSL.
- **Package manager: npm** (`"type": "module"`). No test/lint/typecheck/format scripts exist — only `dev`, `build`, `start`.
- **TypeScript 6.0.3** with `"ignoreDeprecations": "6.0"` — keep the flag; do not "fix" the warnings.
- **React 19 + @types/react 19** — keep in sync; do not downgrade (Figma-exported components need 19 APIs).
- `@/*` → `src/`.

## Commands
- `npm run dev` — `next dev --turbopack` (Turbopack).
- `npm run build` — production build.
- `npm start` — serve the production build (run after `build`).
- All three must run from Windows.

## Stack
- **Next.js 15 App Router + React 19 SPA.** Root layout (`src/app/layout.tsx`) is the only server component. No SSR, no API routes, no backend.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. No `tailwind.config.js`; theme tokens are in `src/styles/theme.css` under `:root`/`.dark`, exposed via `@theme inline`.
- **shadcn/ui** (Radix-based) in `src/app/components/ui/`. `cn()` at `src/app/components/ui/utils.ts`.
- **recharts** (charts), **motion** (animation). **lucide-react** (icons).
- `default_shadcn_theme.css` at root is a Figma-export ref copy synced from the design source — edit with caution; prefer re-exporting from Figma.

## Architecture
- **Every page/component using hooks or browser APIs needs `"use client"`** — all `src/app/*/page.tsx` and `src/app/staff/*/page.tsx` must have it. Keep it that way.
- **CSS entry**: `src/styles/index.css` imported once by `src/app/layout.tsx`. Aggregates `fonts.css` (Orbitron/Rajdhani/Share Tech Mono via Google Fonts), `tailwind.css` (`@import 'tailwindcss'` + tw-animate-css), `theme.css` (design tokens), `galaxy.css` (background). **`src/styles/globals.css` is intentionally empty** — leave it.
- **Routing** (file-based under `src/app/`):
  - Public: `/`, `/games`, `/menu`, `/reservations`.
  - Staff: `/staff/{login,admin,kitchen,bar,waiter,games}` — wrapped by `src/app/staff/layout.tsx` (client-side sidebar). Role label (Admin / Cocina / Coctelería / Mesero / Juegos / Staff) is derived from the last `usePathname()` segment.
  - Galaxy background (`<div class="galaxy-bg">` with stars + dust) rendered by root layout; public pages inherit it automatically. The landing page (`/`) renders its own animated canvas overlay on top.
- **Navigation**: `useRouter()` + `router.push()` from `next/navigation`. Do **not** use `<Link>` or `react-router`.

## Conventions
- **Exports**: route pages → default export; everything else → named exports.
- **Dark-only cyberpunk theme** — `:root` and `.dark` are identical; no light mode.
- **Neon palette** (CSS vars in `theme.css`): `--neon-purple #a855f7`, `--neon-blue #3b82f6`, `--neon-pink #f472b6`, `--neon-cyan #22d3ee`. Use tokens, not hardcoded hex values.
- **Custom components**: `GlassCard` (glassmorphism, optional `glowColor`), `NeonButton` (gradient + clip-path skew), `StatusBadge` (color-coded pill by `status`), `ImageWithFallback` (Figma artifact in `src/app/components/figma/`).
- **No persistence** — all data (menu items, orders, reservations) is in-memory mock data inside each page component.
