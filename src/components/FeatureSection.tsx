import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { tokens } from '../tokens';
import { useClusterData, TOTAL, MAX_TOTAL } from '../hooks/useClusterData';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ClusterBar } from './ClusterBar';
import { MetricRow } from './MetricRow';
import { Badge } from './Badge';
import { LoadingSkeleton } from './LoadingSkeleton';

const COLUMNS = ['Cluster', 'CPU', 'RAM', 'Storage', 'Network', 'GPU', 'Efficiency', 'Total'];

export const FeatureSection: React.FC = () => {
  const { data: clusters, isLoading, isError } = useClusterData();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [deselectGeneration, setDeselectGeneration] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const isReduced = prefersReducedMotion();

  const handleBarClick = (id: string) => {
    if (activeId === id) {
      setDeselectGeneration(g => g + 1);
      setActiveId(null);
    } else {
      if (activeId !== null) setDeselectGeneration(g => g + 1);
      setActiveId(id);
    }
  };

  const handleClearSelection = () => {
    setDeselectGeneration(g => g + 1);
    setActiveId(null);
  };

  const totalSpend = clusters?.reduce((sum, c) => sum + TOTAL(c), 0) ?? 0;
  const activeCluster = clusters?.find(c => c.id === activeId);

  return (
    <section
      ref={sectionRef}
      aria-label="Cloud cluster cost intelligence"
      style={{
        height: '100vh',
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        background: tokens.colors.bgPrimary,
        transition: 'background 0.3s ease',
      }}
    >
      <div className="section-wrapper" style={{ width: '100%', paddingBlockStart: 'clamp(4.5rem, 10vh, 6rem)', paddingBlockEnd: 'clamp(1rem, 3vh, 2rem)', paddingInline: 'clamp(1rem, 4vw, 3rem)' }}>

        <div style={{ marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
          <p
            className="text-section-label"
            style={{
              marginBottom: '12px',
              fontFamily: tokens.font.inter,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ◆ Costs
          </p>
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 32 }}
            animate={inView && !isReduced ? { opacity: 1, y: 0 } : {}}
            transition={
              isReduced ? undefined : { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
            }
          >
            <h2
              className="text-display"
              style={{
                fontFamily: tokens.font.display,
                fontSize: 'clamp(1.3rem, 2.8vw, 2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: tokens.colors.textPrimary,
                marginBottom: '6px',
              }}
            >
              Where does the{' '}
              <span style={{ color: tokens.colors.accentGreen }}>money go?</span>
            </h2>
            <p
              style={{
                fontFamily: tokens.font.body,
                fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)',
                color: tokens.colors.textSecondary,
                maxWidth: '420px',
                lineHeight: 1.5,
                fontWeight: 300,
                fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'",
              }}
            >
              Click a bar or row to break down its spend.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={
            isReduced
              ? {}
              : {
                  opacity: 0,
                  y: 40,
                  boxShadow: '0 0 0 rgba(0,0,0,0), 0 0 0 rgba(61,220,132,0)',
                }
          }
          animate={
            inView && !isReduced
              ? {
                  opacity: 1,
                  y: 0,
                  boxShadow: activeCluster
                    ? tokens.shadow.glow
                    : '0 4px 20px rgba(0,0,0,0.08), 0 12px 40px rgba(61,220,132,0.12)',
                }
              : { opacity: 1, y: 0, boxShadow: tokens.shadow.card }
          }
          transition={
            isReduced
              ? undefined
              : {
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.23, 1, 0.32, 1],
                  boxShadow: { duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] },
                }
          }
          className="card"
          style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)', overflow: 'hidden' }}
        >

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'start',
              gap: '8px',
              marginBottom: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap', minWidth: 0 }}>
              <Badge variant="mono">Last 30 Days</Badge>
              <Badge variant="default">Aggregated by: Cluster</Badge>
              {!isLoading && !isError && (
                <motion.div
                  initial={isReduced ? {} : { opacity: 0, scale: 0.8 }}
                  animate={inView && !isReduced ? { opacity: 1, scale: 1 } : {}}
                  transition={isReduced ? undefined : { delay: 0.8 }}
                >
                  <Badge variant="success">Live Data ✓</Badge>
                </motion.div>
              )}
            </div>

            {!isLoading && !isError && (
              <motion.div
                initial={isReduced ? {} : { opacity: 0 }}
                animate={inView && !isReduced ? { opacity: 1 } : {}}
                transition={isReduced ? undefined : { delay: 1 }}
                style={{ textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                <p
                  style={{
                    fontFamily: tokens.font.inter,
                    fontSize: 'clamp(0.55rem, 1.2vw, 0.68rem)',
                    color: tokens.colors.textMuted,
                    marginBottom: '2px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Total Spend
                </p>
                <p
                  style={{
                    fontFamily: tokens.font.inter,
                    fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
                    fontWeight: 600,
                    color: tokens.colors.textPrimary,
                    letterSpacing: '-0.02em',
                    fontVariantNumeric: 'tabular-nums',
                    fontFeatureSettings: "'tnum', 'cv02', 'cv03', 'cv04', 'cv11'",
                  }}
                >
                  ${totalSpend.toLocaleString()}
                </p>
              </motion.div>
            )}
          </div>

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
              <div
                style={{
                  minHeight: '88px',
                  marginBottom: '1.5rem',
                }}
              >
                <AnimatePresence mode="wait">
                  {activeCluster && (
                    <motion.div
                      key={activeCluster.id}
                      initial={isReduced ? {} : { opacity: 0, scaleX: 0, x: -16 }}
                      animate={{ opacity: 1, scaleX: 1, x: 0 }}
                      exit={isReduced ? {} : { opacity: 0, scaleX: 0, x: -16 }}
                      transition={{
                        duration: 1.25,
                        ease: [0.23, 1, 0.32, 1],
                      }}
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
                    onClick={handleClearSelection}
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
                </AnimatePresence>
              </div>

              <div
                className="bar-chart-container"
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '12px',
                  marginBottom: '0.75rem',
                  paddingInline: '4px',
                }}
                role="img"
                aria-label="Cluster cost bar chart"
              >
                {clusters.map((cluster, i) => (
                  <div
                    key={cluster.id}
                    className="cluster-card-container"
                    style={{ flex: '1 1 0', minWidth: 0 }}
                  >
                    <ClusterBar
                      id={cluster.id}
                      name={cluster.name}
                      total={TOTAL(cluster)}
                      maxTotal={MAX_TOTAL}
                      isActive={activeId === cluster.id}
                      isReduced={isReduced}
                      onClick={() => handleBarClick(cluster.id)}
                      animDelay={i * 0.1}
                      inView={inView}
                      deselectGeneration={deselectGeneration}
                    />
                  </div>
                ))}
              </div>

              <motion.hr
                initial={isReduced ? {} : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={
                  isReduced ? undefined : { duration: 0.6, delay: 0.7 }
                }
                style={{
                  border: 'none',
                  borderTop: `1px solid ${tokens.colors.borderSubtle}`,
                  marginBottom: '0.5rem',
                  transformOrigin: 'left',
                }}
              />

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginInline: '-0.5rem', paddingInline: '0.5rem' }}>
                <table
                  style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px', minWidth: '520px' }}
                  aria-label="Cost breakdown by cluster"
                >
                  <thead>
                    <tr>
                      {COLUMNS.map(col => (
                        <th
                          key={col}
                          scope="col"
                          style={{
                            padding: '5px 12px',
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
                        onClick={() => handleBarClick(cluster.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </motion.div>

        <motion.p
          initial={isReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={isReduced ? undefined : { delay: 1.2 }}
          style={{
            marginTop: '0.4rem',
            fontFamily: tokens.font.mono,
            fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
            color: tokens.colors.textMuted,
            letterSpacing: '0.04em',
          }}
        >
          API data · Cached 5 min · Click bar or row to filter
        </motion.p>
      </div>
    </section>
  );
};
