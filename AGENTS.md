# Monster Dojo — Agent Guide

## Stack
- **Next.js 15** (App Router) + **React 18** + TypeScript SPA (no SSR, no backend)
- **pnpm** is the package manager (run all commands with `pnpm`, never npm/yarn)
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin (no `tailwind.config.js` needed)
- **shadcn/ui** components in `src/app/components/ui/` (Radix primitives)
- Route pages use `"use client"` (all pages are client-rendered, the root layout is server-only)

## Commands
- `pnpm dev` — start Turbopack dev server
- `pnpm build` — production build
- `pnpm start` — run production server after build
- No test, lint, typecheck, or format scripts exist

## Key Architecture
- **Entry**: `src/app/layout.tsx` (root layout) → routes in `src/app/*/page.tsx`
- **10 routes**: `/`, `/games`, `/menu`, `/reservations`, `/staff/login`, `/staff/admin`, `/staff/kitchen`, `/staff/bar`, `/staff/waiter`, `/staff/games`
- **`@` path alias** → `src/` (configured in tsconfig.json)
- **Custom components**: `GlassCard`, `NeonButton`, `StatusBadge`, `ImageWithFallback` in `src/app/components/`
- **Staff sidebar layout**: `src/app/staff/layout.tsx` — shared layout for all `/staff/*` pages. Role (Admin, Cocina, etc.) is derived from `usePathname()` automatically
- **CSS entry**: `src/styles/index.css` imported in root layout

## Styling
- **Dark-only cyberpunk theme** — `:root` and `.dark` are identical; do not add light mode
- **Fonts**: Orbitron (headings), Rajdhani (body), Share Tech Mono (mono) — imported via Google Fonts in `src/styles/fonts.css`
- **Neon palette**: `--neon-purple: #a855f7`, `--neon-blue: #3b82f6`, `--neon-pink: #f472b6`, `--neon-cyan: #22d3ee`

## Route Structure
| Path | Component |
|------|-----------|
| `/` | LandingPage |
| `/games` | GamesCatalog |
| `/menu` | DigitalMenu |
| `/reservations` | Reservations |
| `/staff/login` | StaffLogin |
| `/staff/admin` | AdminDashboard |
| `/staff/kitchen` | KitchenModule |
| `/staff/bar` | BarModule |
| `/staff/waiter` | WaiterFloorMap |
| `/staff/games` | GamesControl |

## Conventions
- Route page components use **default exports** (Next.js convention). Other components use **named exports**.
- All route pages and any component using browser APIs/hooks must start with `"use client"`.
- Navigation uses `useRouter` from `next/navigation` / `router.push()` — not `<Link>` or `react-router`.
- `StaffLayout.tsx` was **deleted** — its sidebar logic lives in `src/app/staff/layout.tsx`.
- Public pages (`/`, `/games`, `/menu`, `/reservations`) are standalone with inline grid backgrounds.
- Staff pages no longer import `StaffLayout` — the parent layout wraps them automatically.
- No test infrastructure exists — do not add tests without explicit request.
- No lint/typecheck config — ESLint/Prettier are intentionally absent.
- `default_shadcn_theme.css` is a reference copy kept in sync with an external Figma resource — edit with caution.
- `@types/react` and `@types/react-dom` are installed as devDependencies.
