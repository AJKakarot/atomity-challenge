import React from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../tokens';
import { useCountUp } from '../hooks/useCountUp';

interface ClusterBarProps {
  id: string;
  name: string;
  total: number;
  maxTotal: number;
  isActive: boolean;
  isReduced: boolean;
  onClick: () => void;
  animDelay: number;
  inView: boolean;
  deselectGeneration: number;
}

export const ClusterBar: React.FC<ClusterBarProps> = ({
  id,
  name,
  total,
  maxTotal,
  isActive,
  isReduced,
  onClick,
  animDelay,
  inView,
  deselectGeneration,
}) => {
  const heightPct = (total / maxTotal) * 100;
  const displayValue = useCountUp(total, 1800, inView);
  const shouldAnimate = inView && !isReduced;

  return (
    <motion.button
      className="cluster-bar-button"
      onClick={onClick}
      initial={isReduced ? {} : { opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={
        isReduced
          ? undefined
          : {
              duration: 0.5,
              delay: animDelay,
              ease: [0.23, 1, 0.32, 1],
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }
      }
      aria-pressed={isActive}
      aria-label={`${name}: $${total.toLocaleString()} total`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        flex: 1,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        outline: 'none',
      }}
    >
      <motion.span
        initial={isReduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          isReduced ? undefined : { delay: animDelay + 0.3 }
        }
        style={{
          fontFamily: tokens.font.mono,
          fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)',
          color: isActive ? tokens.colors.accentGreen : tokens.colors.textSecondary,
          fontWeight: 500,
          transition: 'color 0.25s ease',
        }}
      >
        ${displayValue.toLocaleString()}
      </motion.span>

      <div
        style={{
          width: '100%',
          height: 'clamp(80px, 14vh, 130px)',
          display: 'flex',
          alignItems: 'flex-end',
          background: tokens.colors.barTrack,
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          key={`fill-${id}-${isActive ? 'a' : deselectGeneration}`}
          initial={{ height: isActive || deselectGeneration === 0 ? '0%' : `${heightPct}%` }}
          animate={{ height: shouldAnimate || isActive ? `${heightPct}%` : '0%' }}
          transition={{
            duration: isReduced ? 0 : isActive ? 1.6 : 0.9,
            delay: isReduced ? 0 : isActive ? 0 : animDelay + 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="cluster-bar-fill"
          style={{
            width: '100%',
            background: isActive
              ? `linear-gradient(to top, ${tokens.colors.accentGreen} 0%, color-mix(in srgb, ${tokens.colors.accentGreen} 85%, white) 60%, color-mix(in srgb, ${tokens.colors.accentGreen} 95%, white) 100%)`
              : tokens.colors.barFill,
            borderRadius: '8px',
            opacity: isActive ? 1 : 0.85,
            transition: 'opacity 0.2s ease, background 0.25s ease, box-shadow 0.3s ease',
            boxShadow: isActive
              ? `inset 0 -4px 12px rgba(61,220,132,0.3), 0 2px 12px rgba(61,220,132,0.25)`
              : `inset 0 -2px 8px rgba(61,220,132,0.2), 0 2px 10px rgba(61,220,132,0.2)`,
            position: 'relative',
          }}
        />
        {isActive && (
          <motion.div
            layoutId="bar-indicator"
            style={{
              position: 'absolute',
              top: `${100 - heightPct}%`,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <span
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          padding: '4px 8px',
          fontFamily: tokens.font.body,
          fontSize: 'clamp(0.65rem, 1.2vw, 0.78rem)',
          fontWeight: isActive ? 600 : 500,
          color: isActive ? tokens.colors.textPrimary : tokens.colors.textSecondary,
          transition: 'all 0.25s ease',
          letterSpacing: '-0.01em',
          background: isActive
            ? tokens.colors.accentGreenDim
            : `color-mix(in srgb, ${tokens.colors.barTrack} 35%, transparent)`,
          borderRadius: '6px',
        }}
      >
        {name}
      </span>
    </motion.button>
  );
};
