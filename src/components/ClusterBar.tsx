// components/ClusterBar.tsx
// A single animated vertical bar in the cluster chart.
// Height animates from 0 on scroll-trigger via Framer Motion.

import React from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../tokens';
import { useCountUp } from '../hooks/useCountUp';

interface ClusterBarProps {
  name: string;
  total: number;
  maxTotal: number;
  isActive: boolean;
  isReduced: boolean;
  onClick: () => void;
  animDelay: number;
  inView: boolean;
}

export const ClusterBar: React.FC<ClusterBarProps> = ({
  name,
  total,
  maxTotal,
  isActive,
  isReduced,
  onClick,
  animDelay,
  inView,
}) => {
  const heightPct = (total / maxTotal) * 100;
  const displayValue = useCountUp(total, 1000, inView);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: animDelay, ease: [0.23, 1, 0.32, 1] }}
      aria-pressed={isActive}
      aria-label={`${name}: $${total.toLocaleString()} total`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        flex: 1,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        outline: 'none',
      }}
    >
      {/* Cost label above bar */}
      <motion.span
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: animDelay + 0.3 }}
        style={{
          fontFamily: tokens.font.mono,
          fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)',
          color: isActive ? tokens.colors.accentGreen : tokens.colors.textMuted,
          fontWeight: 500,
          transition: 'color 0.25s ease',
        }}
      >
        ${displayValue.toLocaleString()}
      </motion.span>

      {/* Bar track */}
      <div
        style={{
          width: '100%',
          height: '180px',
          display: 'flex',
          alignItems: 'flex-end',
          background: tokens.colors.barTrack,
          borderRadius: tokens.radius.sm,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ height: '0%' }}
          animate={inView ? { height: `${heightPct}%` } : { height: '0%' }}
          transition={{
            duration: isReduced ? 0 : 0.9,
            delay: isReduced ? 0 : animDelay + 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            width: '100%',
            background: isActive
              ? `linear-gradient(to top, ${tokens.colors.accentGreen}, color-mix(in srgb, ${tokens.colors.accentGreen} 70%, white))`
              : tokens.colors.barFill,
            borderRadius: tokens.radius.sm,
            opacity: isActive ? 1 : 0.55,
            transition: 'opacity 0.25s ease, background 0.25s ease',
            boxShadow: isActive ? tokens.shadow.glow : 'none',
          }}
        />
        {/* Active indicator stripe at top */}
        {isActive && (
          <motion.div
            layoutId="bar-indicator"
            style={{
              position: 'absolute',
              top: `${100 - heightPct}%`,
              left: 0,
              right: 0,
              height: '3px',
              background: 'white',
              opacity: 0.7,
              borderRadius: '2px 2px 0 0',
            }}
          />
        )}
      </div>

      {/* Cluster name */}
      <span
        style={{
          fontFamily: tokens.font.body,
          fontSize: 'clamp(0.72rem, 1.5vw, 0.85rem)',
          fontWeight: isActive ? 600 : 400,
          color: isActive ? tokens.colors.textPrimary : tokens.colors.textSecondary,
          transition: 'all 0.25s ease',
          letterSpacing: '-0.01em',
        }}
      >
        {name}
      </span>
    </motion.button>
  );
};
