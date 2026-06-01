# Monster Dojo — Agent Guide

## Environment
- **WSL host, dev tooling on Windows** — source tree lives on the Linux side (`/mnt/c/...`) but `node`/`npm` are installed on **Windows only** (not inside WSL). The agent **cannot** run `npm`/`node` directly; they must be executed from Windows or via `cmd.exe` with the Windows path. There is no working dev loop from WSL.
- **Package manager: npm** (lockfile: `package-lock.json`). Project is `"private": true`, `"type": "module"`.
- **No test, lint, typecheck, or format scripts** are defined. `npm run dev` / `build` / `start` are the only runnable scripts.
- **TypeScript 6.0.3** with `"ignoreDeprecations": "6.0"` in `tsconfig.json` — keep the flag; do not "fix" the resulting warnings.
- **React 19 + @types/react 19** — keep them in sync. Do not downgrade to React 18 (some Figma-exported components rely on 19-era APIs).
- `@/*` path alias → `src/` (`tsconfig.json`).

## Commands
- `npm run dev` — Turbopack dev server (`next dev --turbopack`).
- `npm run build` — production build.
- `npm start` — serve the production build (run after `build`).
- All three must be run from Windows, not WSL.

## Stack
- **Next.js 15** App Router + **React 19** SPA. **No SSR, no API routes, no backend** — the root layout (`src/app/layout.tsx`) is the only server component.
- **Tailwind CSS v4** via `@tailwindcss/postcss` (in `postcss.config.mjs`). There is **no `tailwind.config.js`**; theme tokens live in `src/styles/theme.css` under `:root` / `.dark` and are exposed via `@theme inline`.
- **shadcn/ui** primitives in `src/app/components/ui/` (Radix-based). Helper `cn()` is at `src/app/components/ui/utils.ts`.
- **recharts** for charts (admin dashboard). `motion` (Framer Motion successor) is available for animation.
- **Figma export origin** — `default_shadcn_theme.css` at the repo root is a reference copy synced from the Figma design export (see the `KEEP_IN_SYNC(...)` comment at the top of that file). The current npm package name in `package.json` is `monster-dojo`; the `@figma/my-make-file` name is the export source, not this package. Edit `default_shadcn_theme.css` with caution — prefer updating the Figma source and re-exporting.

## Architecture
- **Root layout is server-only** (`src/app/layout.tsx`). **Every route page and every component that uses hooks / browser APIs must start with `"use client"`** — including all of `src/app/*/page.tsx` and `src/app/staff/*/page.tsx`. There are currently zero pages without the directive; keep it that way.
- **CSS entry**: `src/styles/index.css` is imported once by `src/app/layout.tsx`. It aggregates `fonts.css` (Google Fonts), `tailwind.css` (`@import 'tailwindcss'; tw-animate-css`), `theme.css` (design tokens), and `galaxy.css` (background). **`src/styles/globals.css` is intentionally empty** — do not add styles there.
- **Routing is file-based** under `src/app/`:
  - Public: `/`, `/games`, `/menu`, `/reservations`.
  - Staff: `/staff/{login,admin,kitchen,bar,waiter,games}` — all wrapped by the client-side sidebar at `src/app/staff/layout.tsx`. The role label (Admin / Cocina / Coctelería / Mesero / Juegos / Staff) is derived from the last `usePathname()` segment.
  - Galaxy background (`<div class="galaxy-bg">` with stars + dust) is rendered by the root layout, so public pages inherit it automatically.
- **Navigation**: use `useRouter()` from `next/navigation` + `router.push(...)`. Do **not** use `next/link` `<Link>` or `react-router` — the existing code is consistent with this.

## Custom Components
- `GlassCard` (`src/app/components/GlassCard.tsx`) — glassmorphism card, optional `glowColor` prop.
- `NeonButton` (`src/app/components/NeonButton.tsx`) — gradient button with neon shadow and clip-path skew.
- `StatusBadge` (`src/app/components/StatusBadge.tsx`) — color-coded status pill driven by the `status` prop.
- `ImageWithFallback` (`src/app/components/figma/ImageWithFallback.tsx`) — `<img>` with built-in error fallback (Figma export artifact; keep alongside `src/app/components/figma/`).

## Styling
- **Dark-only cyberpunk theme** — `:root` and `.dark` are intentionally identical; do not introduce a light mode.
- **Fonts** (loaded via Google Fonts in `src/styles/fonts.css`): Orbitron for headings, Rajdhani for body, Share Tech Mono for monospace.
- **Neon palette** (CSS vars in `theme.css`): `--neon-purple #a855f7`, `--neon-blue #3b82f6`, `--neon-pink #f472b6`, `--neon-cyan #22d3ee`. Use these tokens — do not hardcode hex values when a token exists.

## Conventions
- **Exports**: route page components use **default exports**; everything else (shared components, hooks, utils) uses **named exports**. `cn()` in `src/app/components/ui/utils.ts` follows the named-export rule.
- **Public pages render their own inline grid backgrounds**; staff pages rely on the parent layout and use the same Tailwind/utility classes without re-rendering the galaxy.
- **No backend, no persistence layer** — all "data" in routes (menu items, orders, reservations, etc.) is in-memory mock data inside each page component.
