import React from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../tokens';

const Bone: React.FC<{ width?: string; height?: string; style?: React.CSSProperties }> = ({
  width = '100%', height = '16px', style,
}) => (
  <motion.div
    animate={{ opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      width,
      height,
      borderRadius: tokens.radius.sm,
      background: `color-mix(in srgb, ${tokens.colors.textMuted} 20%, ${tokens.colors.bgSecondary})`,
      ...style,
    }}
  />
);

export const LoadingSkeleton: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '220px' }}>
      {[180, 130, 90, 50].map((h, i) => (
        <Bone key={i} width="100%" height={`${h}px`} style={{ borderRadius: tokens.radius.md }} />
      ))}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[1,2,3,4].map(i => (
        <Bone key={i} height="48px" style={{ borderRadius: tokens.radius.sm }} />
      ))}
    </div>
  </div>
);
