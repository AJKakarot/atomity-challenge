# Atomity Frontend Challenge — Cluster Cost Intelligence

**Option A** (0:30–0:40) · React 18 · TypeScript · Framer Motion · TanStack Query · Tailwind · Vite

---

## Feature Choice

**Option A** — cluster cost bar chart + breakdown table. Chosen for: (1) rich animation surface (scroll-triggered bars, staggered rows, count-up numbers, hover springs, `layoutId` indicator), (2) data fetch → transform → render pipeline, (3) interactive bar click to highlight cluster across chart and table.

---

## Animation

Scroll-triggered via Framer Motion `useInView` (`once: true`). Sequence: heading → card → bars (100ms stagger) → table rows (90ms stagger) → divider → KPI. Easing: `[0.23, 1, 0.32, 1]`. Hover: bars scale 1.03/0.97 with spring; rows get background highlight. Count-up: custom `useCountUp` with RAF + cubic ease-out. **`prefers-reduced-motion`** respected (animations disabled, count-up jumps to target).

---

## Tokens & CSS

**Tokens:** `src/tokens/index.ts` → CSS vars in `:root` / `.dark`. No hardcoded hex. `color-mix()` for derived colors.

**Modern CSS:** `clamp()`, `color-mix()`, container queries, logical properties, scroll-snap, `tabular-nums`. Inter variable font.

---

## Architecture

```mermaid
graph TD
  App["App.tsx"]
  App --> Hero["HeroSection"]
  App --> Feature["FeatureSection"]
  Feature --> ClusterBar["ClusterBar ×4"]
  Feature --> MetricRow["MetricRow ×4"]
  Feature --> Badge["Badge"]
  Feature --> Skeleton["LoadingSkeleton"]
  ClusterBar --> useCountUp["useCountUp"]
  MetricRow --> useCountUp
  Feature --> useClusterData["useClusterData"]
  App --> ThemeToggle["ThemeToggle"]

  style App fill:#1a2030,color:#e8edf2,stroke:#3ddc84
  style Feature fill:#1a2030,color:#e8edf2,stroke:#3ddc84
  style useClusterData fill:#0d1117,color:#3ddc84,stroke:#2a3245
  style useCountUp fill:#0d1117,color:#3ddc84,stroke:#2a3245
```

All UI built from scratch — no MUI, Chakra, shadcn.

---

## Data Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant TQ as TanStack Query
    participant API as JSONPlaceholder

    B->>TQ: useClusterData()
    alt Cache fresh (< 5 min)
        TQ-->>B: Instant render from cache
    else Cache stale or empty
        TQ->>API: GET /users
        API-->>TQ: 10 user objects
        TQ->>TQ: .slice(0,4) → deterministic transform
        TQ-->>B: 4 ClusterMetric objects
        Note over TQ: staleTime 5min · gcTime 10min
    end
```

JSONPlaceholder `/users` → deterministic transform → `ClusterMetric`. States: Loading (skeleton), Error (alert), Success (dashboard).

---

## Libraries

| Library | Purpose |
|---------|---------|
| Framer Motion | `useInView`, `motion.div`, `layoutId`, `whileHover`/`whileTap` |
| TanStack Query | Async state, `staleTime`/`gcTime` caching |
| Tailwind | Layout scaffolding |
| Vite | Dev server, build |

---

## Responsive & A11y

**Breakpoints:** 1280px (full), 768px (tighter padding), 480px (compact). `clamp()` everywhere. Grid for KPI; horizontal scroll for table on mobile. **A11y:** semantic HTML, ARIA, `prefers-reduced-motion`, contrast, keyboard focus.

---

## Tradeoffs

- **JSONPlaceholder** — no public cloud API; deterministic transform from users → cost metrics
- **Custom `useCountUp`** — RAF + cubic easing, no extra dep
- **Inter only** — variable font, `tabular-nums` for numbers
- **CSS Grid for header** — KPI pinned right on mobile (flex wrapped)

---

## With More Time

Time range filter, sparklines in rows, keyboard nav between bars, E2E tests (Playwright).

---

## Run

```bash
npm install && npm run dev    # → localhost:5173
npm run build && npm run preview
```

Deploy: push to GitHub → Vercel auto-deploys.
