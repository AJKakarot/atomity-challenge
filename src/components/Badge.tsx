// components/Badge.tsx
// A small pill label. Built from scratch — no library.

import React from 'react';
import { tokens } from '../tokens';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'mono';
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    background: tokens.colors.accentGreenDim,
    color: tokens.colors.accentGreen,
    border: `1px solid ${tokens.colors.accentGreen}`,
  },
  success: {
    background: 'color-mix(in srgb, var(--color-accent-success) 12%, transparent)',
    color: tokens.colors.accentSuccess,
    border: `1px solid color-mix(in srgb, var(--color-accent-success) 30%, transparent)`,
  },
  warning: {
    background: 'color-mix(in srgb, var(--color-accent-warning) 12%, transparent)',
    color: tokens.colors.accentWarning,
    border: `1px solid color-mix(in srgb, var(--color-accent-warning) 30%, transparent)`,
  },
  error: {
    background: 'color-mix(in srgb, var(--color-accent-error) 12%, transparent)',
    color: tokens.colors.accentError,
    border: `1px solid color-mix(in srgb, var(--color-accent-error) 30%, transparent)`,
  },
  mono: {
    background: tokens.colors.bgSecondary,
    color: tokens.colors.textMuted,
    border: `1px solid ${tokens.colors.borderSubtle}`,
  },
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      paddingInline: '10px',
      paddingBlock: '3px',
      borderRadius: tokens.radius.full,
      fontFamily: tokens.font.mono,
      fontSize: '0.68rem',
      fontWeight: 500,
      letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
      ...variantStyles[variant],
    }}
  >
    {children}
  </span>
);
