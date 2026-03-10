// tokens/index.ts
// Single source of truth for all design values.
// Components reference these — never raw hex values.

export const tokens = {
  colors: {
    bgPrimary:      'var(--color-bg-primary)',
    bgSecondary:    'var(--color-bg-secondary)',
    bgCard:         'var(--color-bg-card)',
    bgCardHover:    'var(--color-bg-card-hover)',
    borderSubtle:   'var(--color-border-subtle)',
    borderAccent:   'var(--color-border-accent)',
    textPrimary:    'var(--color-text-primary)',
    textSecondary:  'var(--color-text-secondary)',
    textMuted:      'var(--color-text-muted)',
    accentGreen:    'var(--color-accent-green)',
    accentGreenDim: 'var(--color-accent-green-dim)',
    accentSuccess:  'var(--color-accent-success)',
    accentError:    'var(--color-accent-error)',
    accentWarning:  'var(--color-accent-warning)',
    barFill:        'var(--color-bar-fill)',
    barTrack:       'var(--color-bar-track)',
  },
  font: {
    display: "'Syne', sans-serif",
    body:    "'Inter', sans-serif",
    mono:    "'DM Mono', monospace",
    inter:   "'Inter', sans-serif",
  },
  radius: {
    sm:   '6px',
    md:   '12px',
    lg:   '20px',
    xl:   '28px',
    full: '9999px',
  },
  shadow: {
    card:   'var(--shadow-card)',
    glow:   'var(--shadow-glow)',
  },
} as const;
