# Atomity Frontend Challenge — Cluster Cost Intelligence

**Option A** · React + TypeScript · Framer Motion · TanStack Query · Tailwind CSS

🔗 [Live Demo](https://YOUR-VERCEL-URL.vercel.app) · [GitHub](https://github.com/YOUR-USERNAME/atomity-challenge)

---

## Feature Choice — Why Option A?

Option A (0:30–0:40) shows a cluster cost breakdown: a bar chart with Cluster A/B/C/D and a detailed cost table below it. I chose this because:

1. **More animation surface** — bars growing, table rows staggering in, number counting, hover/click states
2. **Natural data fetching story** — cost figures map cleanly to an API response
3. **More creative headroom** — I could make it significantly more interactive than the reference video by adding click-to-filter behaviour that links the chart and table

---

## Approach to Animation

All animations are **scroll-triggered** using Framer Motion's `useInView` hook — nothing plays on page load. The sequence is:

1. **Header fades + slides up** (delay 0ms)
2. **Dashboard card fades in** (delay 150ms)
3. **Bars grow upward** with staggered delay (100ms per bar), using a custom cubic ease `[0.23, 1, 0.32, 1]`
4. **Table rows slide in from left**, staggered at 90ms intervals
5. **Numbers count up** from 0 using a custom `useCountUp` hook with ease-out cubic easing

`prefers-reduced-motion` is fully respected — if the user has it set, all animations are skipped and final values are shown immediately.

---

## Token Architecture

All design values live in two places:

- **`src/tokens/index.ts`** — TypeScript constants that reference CSS variable names (e.g. `var(--color-accent-green)`)
- **`src/index.css`** — CSS custom properties defined on `:root` and `.dark`

No component ever contains a hardcoded hex value. Dark mode is implemented by toggling the `.dark` class on `<html>`, which swaps all token values automatically. `color-mix()` is used for derived colors (dimmed accents, hover tints) — no pre-computed values needed.

---

## Data Fetching & Caching

- API: **JSONPlaceholder `/users`** — fetched once, transformed into cluster cost metrics
- Library: **TanStack Query v5** with:
  - `staleTime: 5 minutes` — no re-fetch on component remount or navigation
  - `gcTime: 10 minutes` — keeps data in memory
  - 3 loading states handled: **loading** (skeleton), **error** (alert with message), **success** (full UI)
- Network tab will show a single request on first load, then instant display on revisit

---

## Modern CSS Features Used

| Feature | Where |
|---|---|
| `clamp()` | Fluid font sizes and padding everywhere |
| `color-mix()` | Dimmed accent colors, dark mode tints |
| CSS custom properties | Full token system, dark mode |
| `container-type` + `@container` | `ClusterBar` label adapts at small widths |
| Logical properties (`padding-inline`, `max-inline-size`) | Section wrapper |
| Native CSS nesting | Inside `.card` hover states |

---

## Component Structure

```
src/
  tokens/
    index.ts              ← all design tokens
  hooks/
    useClusterData.ts     ← TanStack Query + API transform
    useCountUp.ts         ← animated number hook
  components/
    Badge.tsx             ← pill label, 4 variants
    ThemeToggle.tsx       ← dark/light switcher
    ClusterBar.tsx        ← animated vertical bar
    MetricRow.tsx         ← table row with count-up cells
    LoadingSkeleton.tsx   ← pulsing placeholder
    HeroSection.tsx       ← above-the-fold
    FeatureSection.tsx    ← main scroll-triggered dashboard
  App.tsx                 ← QueryClientProvider + layout
  main.tsx               ← React root
  index.css              ← CSS variables + global styles
```

---

## Libraries & Why

| Library | Reason |
|---|---|
| **React 18** | Required by challenge |
| **TypeScript** | Type-safe props, API response shapes |
| **Framer Motion** | Preferred animation library per brief; `useInView`, `motion.div`, `layoutId` |
| **TanStack Query v5** | Preferred caching approach per brief; handles all async states cleanly |
| **Tailwind CSS** | Utility classes for layout, preferred by brief |
| **Vite** | Fast dev server, instant HMR |

Zero pre-built UI components. Every element (Badge, bar, table row) is custom-built.

---

## Tradeoffs & Decisions

- **JSONPlaceholder vs a real cloud API** — no public cloud cost API exists without auth keys. I transform user data deterministically so it looks realistic and behaves like real cluster data.
- **Single-page vs multi-section** — kept it focused: one hero, one feature section. The brief says "a polished single section beats a rough full page."
- **`layoutId` for bar indicator** — Framer Motion's `layoutId` makes the active-bar highlight slide smoothly between bars with zero extra code.
- **`useCountUp` custom hook vs library** — writing it myself shows understanding of `requestAnimationFrame` and easing math; it's 30 lines and does exactly what's needed.

---

## What I'd Improve With More Time

1. **Grouping toggle** — switch between "by Cluster" and "by Service" (CPU / RAM / GPU) views with animated bar transitions
2. **Time range filter** — Last 7 / 30 / 90 days with a real API that returns different data
3. **Efficiency sparklines** — tiny trend lines inside each table row
4. **Keyboard navigation** — arrow keys to move between active clusters
5. **React Query DevTools** — visible in development for easy demo of cache behaviour

---

## Running Locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm run build
# Push to GitHub, import repo on vercel.com
```
