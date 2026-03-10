// App.tsx
// Root layout: nav, hero, feature section.
// QueryClientProvider wraps everything for TanStack Query caching.

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { tokens } from './tokens';
import { HeroSection } from './components/HeroSection';
import { FeatureSection } from './components/FeatureSection';
import { ThemeToggle } from './components/ThemeToggle';

// Single QueryClient instance — data is cached here between renders
const queryClient = new QueryClient();

const Nav: React.FC = () => (
  <nav
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px clamp(1rem, 5vw, 4rem)',
      background: `color-mix(in srgb, var(--color-bg-primary) 92%, transparent)`,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid var(--color-border-subtle)`,
      transition: 'background 0.3s ease',
    }}
    aria-label="Main navigation"
  >
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        fontFamily: tokens.font.display,
        fontSize: '1.1rem',
        fontWeight: 700,
        color: tokens.colors.textPrimary,
        letterSpacing: '-0.03em',
      }}
    >
      atom
      <span style={{ color: tokens.colors.accentGreen }}>ity</span>
    </motion.span>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <ThemeToggle />
    </motion.div>
  </nav>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ background: tokens.colors.bgPrimary, minHeight: '100vh' }}>
        <Nav />
        <main>
          <div style={{ paddingTop: '0' }}>
            <HeroSection />
            <div id="feature">
              <FeatureSection />
            </div>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}
