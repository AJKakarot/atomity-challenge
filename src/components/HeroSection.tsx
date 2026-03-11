import React from 'react';
import { motion } from 'framer-motion';
import { tokens } from '../tokens';
import { Badge } from './Badge';

export const HeroSection: React.FC = () => (
  <section
    style={{
      height: '100vh',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      overflow: 'hidden',
      position: 'relative',
    }}
    aria-label="Hero"
  >
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, color-mix(in srgb, var(--color-accent-green) 6%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-accent-green) 6%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)',
        pointerEvents: 'none',
      }}
    />

    <div className="section-wrapper" style={{ width: '100%', position: 'relative', zIndex: 1, paddingBlockStart: 'clamp(4rem, 8vh, 6rem)' }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '24px' }}
        >
          <Badge variant="default">◆ Atomity Cloud Intelligence</Badge>
        </motion.div>

        <h1
          className="text-display"
          style={{
            fontFamily: tokens.font.display,
            color: tokens.colors.textPrimary,
            marginBottom: '20px',
            maxWidth: '720px',
          }}
        >
          Your cloud spend,{' '}
          <br />
          <span
            style={{
              color: tokens.colors.accentGreen,
              textShadow: `0 0 40px color-mix(in srgb, var(--color-accent-green) 40%, transparent)`,
            }}
          >
            under control.
          </span>
        </h1>

        <p
          style={{
            fontFamily: tokens.font.body,
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            color: tokens.colors.textSecondary,
            maxWidth: '500px',
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: '40px',
            fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'",
          }}
        >
          Sovereign AI workload optimization with real-time cluster cost visibility
          across every compute dimension.
        </p>

        <motion.a
          href="#feature"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: tokens.font.mono,
            fontSize: '0.78rem',
            color: tokens.colors.textMuted,
            textDecoration: 'none',
            letterSpacing: '0.06em',
          }}
          aria-label="Scroll to feature section"
        >
          ↓ scroll to see the dashboard
        </motion.a>
      </motion.div>
    </div>
  </section>
);
