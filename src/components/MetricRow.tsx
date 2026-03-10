// components/MetricRow.tsx
// One row in the cost breakdown table.
// Stagger-animates in from the left on scroll.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../tokens';
import { ClusterMetric } from '../hooks/useClusterData';
import { useCountUp } from '../hooks/useCountUp';

interface MetricRowProps {
  cluster: ClusterMetric;
  total: number;
  isActive: boolean;
  delay: number;
  inView: boolean;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Cell: React.FC<{ value: number; highlight: boolean; inView: boolean; delay: number }> = ({
  value, highlight, inView, delay,
}) => {
  const displayed = useCountUp(value, 900, inView);
  return (
    <td
      style={{
        padding: '14px 16px',
        fontFamily: tokens.font.mono,
        fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)',
        color: highlight ? tokens.colors.textPrimary : tokens.colors.textMuted,
        textAlign: 'right',
        whiteSpace: 'nowrap',
        transition: 'color 0.25s ease',
      }}
    >
      {value === 0 ? (
        <span style={{ opacity: 0.3 }}>—</span>
      ) : (
        `$${displayed.toLocaleString()}`
      )}
    </td>
  );
};

export const MetricRow: React.FC<MetricRowProps> = ({
  cluster, total, isActive, delay, inView,
}) => {
  const totalDisplayed = useCountUp(total, 1000, inView);
  const [hovered, setHovered] = useState(false);
  const isReduced = prefersReducedMotion();
  const shouldAnimate = inView && !isReduced;

  return (
    <motion.tr
      initial={isReduced ? {} : { opacity: 0, x: -16 }}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
      transition={
        isReduced ? undefined : { duration: 0.45, delay, ease: [0.23, 1, 0.32, 1] }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'var(--color-bg-card-hover)'
          : (isActive ? 'var(--color-accent-green-dim)' : 'transparent'),
        transition: 'background 0.25s ease',
        borderRadius: tokens.radius.sm,
      }}
    >
      <td
        style={{
          padding: '14px 16px',
          fontFamily: tokens.font.body,
          fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)',
          fontWeight: isActive ? 700 : 500,
          color: isActive ? tokens.colors.accentGreen : tokens.colors.textPrimary,
          whiteSpace: 'nowrap',
          transition: 'color 0.25s ease',
        }}
      >
        {cluster.name}
      </td>
      <Cell value={cluster.cpu}     highlight={isActive} inView={inView} delay={delay + 0.05} />
      <Cell value={cluster.ram}     highlight={isActive} inView={inView} delay={delay + 0.10} />
      <Cell value={cluster.storage} highlight={isActive} inView={inView} delay={delay + 0.15} />
      <Cell value={cluster.network} highlight={isActive} inView={inView} delay={delay + 0.20} />
      <Cell value={cluster.gpu}     highlight={isActive} inView={inView} delay={delay + 0.25} />
      <td
        style={{
          padding: '14px 16px',
          fontFamily: tokens.font.mono,
          fontSize: 'clamp(0.7rem, 1.5vw, 0.82rem)',
          color: cluster.efficiency >= 20
            ? tokens.colors.accentSuccess
            : tokens.colors.accentWarning,
          textAlign: 'right',
          whiteSpace: 'nowrap',
        }}
      >
        {cluster.efficiency}%
      </td>
      <td
        style={{
          padding: '14px 16px',
          fontFamily: tokens.font.mono,
          fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)',
          fontWeight: 700,
          color: isActive ? tokens.colors.accentGreen : tokens.colors.textPrimary,
          textAlign: 'right',
          whiteSpace: 'nowrap',
          transition: 'color 0.25s ease',
        }}
      >
        ${totalDisplayed.toLocaleString()}
      </td>
    </motion.tr>
  );
};

