// components/FeatureSection.tsx
// The main scroll-triggered section.
// Clusters: animated bar chart + detailed breakdown table.
// Clicking a bar highlights the cluster across both views.

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { tokens } from '../tokens';
import { useClusterData, TOTAL, MAX_TOTAL } from '../hooks/useClusterData';
import { ClusterBar } from './ClusterBar';
import { MetricRow } from './MetricRow';
import { Badge } from './Badge';
import { LoadingSkeleton } from './LoadingSkeleton';

const COLUMNS = ['Cluster', 'CPU', 'RAM', 'Storage', 'Network', 'GPU', 'Efficiency', 'Total'];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const FeatureSection: React.FC = () => {
  const { data: clusters, isLoading, isError } = useClusterData();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleBarClick = (id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  const totalSpend = clusters?.reduce((sum, c) => sum + TOTAL(c), 0) ?? 0;
  const activeCluster = clusters?.find(c => c.id === activeId);

  return (
    <section
      ref={sectionRef}
      aria-label="Cloud cluster cost intelligence"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: tokens.colors.bgPrimary,
        transition: 'background 0.3s ease',
      }}
    >
      <div className="section-wrapper" style={{ width: '100%' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: 'clamp(2rem, 5vh, 3.5rem)' }}
        >
          <p className="text-section-label" style={{ marginBottom: '12px' }}>
            ◆ Cost Intelligence
          </p>
          <h2
            className="text-display"
            style={{
              fontFamily: tokens.font.display,
              color: tokens.colors.textPrimary,
              marginBottom: '16px',
            }}
          >
            Cluster spend,{' '}
            <span style={{ color: tokens.colors.accentGreen }}>demystified.</span>
          </h2>
          <p
            style={{
              fontFamily: tokens.font.body,
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: tokens.colors.textSecondary,
              maxWidth: '520px',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            Drill into every dollar across CPU, RAM, storage, and GPU.
            Click any cluster to isolate its cost breakdown.
          </p>
        </motion.div>

        {/* ── Dashboard Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="card"
          style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', overflow: 'hidden' }}
        >

          {/* ── Card header ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Badge variant="mono">Last 30 Days</Badge>
              <Badge variant="default">Aggregated by: Cluster</Badge>
              {!isLoading && !isError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Badge variant="success">Live Data ✓</Badge>
                </motion.div>
              )}
            </div>

            {/* Total spend KPI */}
            {!isLoading && !isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
                style={{ textAlign: 'right' }}
              >
                <p
                  style={{
                    fontFamily: tokens.font.mono,
                    fontSize: '0.68rem',
                    color: tokens.colors.textMuted,
                    marginBottom: '2px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Total Spend
                </p>
                <p
                  style={{
                    fontFamily: tokens.font.display,
                    fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                    fontWeight: 700,
                    color: tokens.colors.textPrimary,
                    letterSpacing: '-0.03em',
                  }}
                >
                  ${totalSpend.toLocaleString()}
                </p>
              </motion.div>
            )}
          </div>

          {/* ── Loading / Error / Data ── */}
          {isLoading && <LoadingSkeleton />}

          {isError && (
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: tokens.colors.accentError,
                fontFamily: tokens.font.mono,
                fontSize: '0.85rem',
              }}
              role="alert"
            >
              ⚠ Failed to load cluster data. Please refresh.
            </div>
          )}

          {clusters && (
            <>
              {/* ── Active cluster info strip ── */}
              {activeCluster && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    background: tokens.colors.accentGreenDim,
                    border: `1px solid ${tokens.colors.borderAccent}`,
                    borderRadius: tokens.radius.md,
                    padding: '12px 16px',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                  role="status"
                  aria-live="polite"
                >
                  <span
                    style={{
                      fontFamily: tokens.font.body,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: tokens.colors.accentGreen,
                    }}
                  >
                    ◆ {activeCluster.name} selected
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge variant="default">
                      {activeCluster.efficiency}% efficiency
                    </Badge>
                    <Badge variant={activeCluster.gpu === 0 ? 'mono' : 'success'}>
                      {activeCluster.gpu === 0 ? 'No GPU' : `GPU: $${activeCluster.gpu.toLocaleString()}`}
                    </Badge>
                  </div>
                  <button
                    onClick={() => setActiveId(null)}
                    aria-label="Clear selection"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: tokens.colors.textMuted,
                      fontFamily: tokens.font.mono,
                      fontSize: '0.72rem',
                    }}
                  >
                    ✕ Clear
                  </button>
                </motion.div>
              )}

              {/* ── Bar Chart ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 'clamp(8px, 2vw, 20px)',
                  marginBottom: '2.5rem',
                  paddingInline: '8px',
                }}
                role="img"
                aria-label="Cluster cost bar chart"
              >
                {clusters.map((cluster, i) => (
                  <div
                    key={cluster.id}
                    className="cluster-card-container"
                    style={{ flex: 1 }}
                  >
                    <ClusterBar
                      name={cluster.name}
                      total={TOTAL(cluster)}
                      maxTotal={MAX_TOTAL}
                      isActive={activeId === cluster.id}
                      isReduced={prefersReduced()}
                      onClick={() => handleBarClick(cluster.id)}
                      animDelay={i * 0.1}
                      inView={inView}
                    />
                  </div>
                ))}
              </div>

              {/* ── Divider ── */}
              <motion.hr
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                style={{
                  border: 'none',
                  borderTop: `1px solid ${tokens.colors.borderSubtle}`,
                  marginBottom: '1.5rem',
                  transformOrigin: 'left',
                }}
              />

              {/* ── Cost Breakdown Table ── */}
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table
                  style={{ width: '100%', borderCollapse: 'collapse', minWidth: '580px' }}
                  aria-label="Cost breakdown by cluster"
                >
                  <thead>
                    <tr>
                      {COLUMNS.map(col => (
                        <th
                          key={col}
                          scope="col"
                          style={{
                            padding: '8px 16px',
                            fontFamily: tokens.font.mono,
                            fontSize: '0.68rem',
                            fontWeight: 500,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: tokens.colors.textMuted,
                            textAlign: col === 'Cluster' ? 'left' : 'right',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {clusters.map((cluster, i) => (
                      <MetricRow
                        key={cluster.id}
                        cluster={cluster}
                        total={TOTAL(cluster)}
                        isActive={activeId === cluster.id}
                        delay={0.5 + i * 0.09}
                        inView={inView}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: '1.25rem',
            fontFamily: tokens.font.mono,
            fontSize: '0.68rem',
            color: tokens.colors.textMuted,
            letterSpacing: '0.04em',
          }}
        >
          Data fetched from JSONPlaceholder API · Cached 5 min via TanStack Query · Click a cluster to filter
        </motion.p>
      </div>
    </section>
  );
};
