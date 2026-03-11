import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { tokens } from '../tokens';
import { Badge } from './Badge';
import { ClusterMetric } from '../hooks/useClusterData';

interface ActiveClusterStripProps {
  cluster: ClusterMetric;
  isReduced: boolean;
  onClear: () => void;
}

const anim = { opacity: 0, scaleX: 0, x: -16 };
const done = { opacity: 1, scaleX: 1, x: 0 };

export const ActiveClusterStrip: React.FC<ActiveClusterStripProps> = ({
  cluster, isReduced, onClear,
}) => (
  <motion.div
    key={cluster.id}
    initial={isReduced ? {} : anim}
    animate={done}
    exit={isReduced ? {} : anim}
    transition={{ duration: 1.25, ease: [0.23, 1, 0.32, 1] }}
    style={{
      transformOrigin: 'left center',
      background: `color-mix(in srgb, ${tokens.colors.bgCard} 90%, ${tokens.colors.accentGreenDim})`,
      border: `1px solid ${tokens.colors.borderAccent}`,
      borderRadius: tokens.radius.md,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '6px',
      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
      boxShadow: tokens.shadow.glow,
    }}
    role="status"
    aria-live="polite"
  >
    <span style={{ fontFamily: tokens.font.body, fontSize: '0.875rem', fontWeight: 600, color: tokens.colors.accentGreen }}>
      ◆ {cluster.name} selected
    </span>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">{cluster.efficiency}% efficiency</Badge>
      <Badge variant={cluster.gpu === 0 ? 'mono' : 'success'}>
        {cluster.gpu === 0 ? 'No GPU' : `GPU: $${cluster.gpu.toLocaleString()}`}
      </Badge>
    </div>
    <button onClick={onClear} aria-label="Clear selection" className="btn-clear">
      ✕ Clear
    </button>
  </motion.div>
);
