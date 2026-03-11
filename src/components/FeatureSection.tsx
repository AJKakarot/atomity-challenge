import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { tokens } from '../tokens';
import { useClusterData, TOTAL, MAX_TOTAL } from '../hooks/useClusterData';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ClusterBar } from './ClusterBar';
import { Badge } from './Badge';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ActiveClusterStrip } from './ActiveClusterStrip';
import { CostTable } from './CostTable';

const EASE = [0.23, 1, 0.32, 1] as const;

export const FeatureSection: React.FC = () => {
  const { data: clusters, isLoading, isError } = useClusterData();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [deselectGeneration, setDeselectGeneration] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-30px', amount: 0.1 });
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
  const anim = !isReduced && inView;

  return (
    <section
      ref={sectionRef}
      aria-label="Cloud cluster cost intelligence"
      className="feature-section"
    >
      <div className="section-wrapper" style={{ width: '100%', paddingBlockStart: 'clamp(4.5rem, 10vh, 6rem)', paddingBlockEnd: 'clamp(1rem, 3vh, 2rem)', paddingInline: 'clamp(1rem, 4vw, 3rem)' }}>
        <div style={{ marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
          <p className="text-section-label" style={{ marginBottom: '12px', fontFamily: tokens.font.inter, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            ◆ Costs
          </p>
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 32 }}
            animate={anim ? { opacity: 1, y: 0 } : {}}
            transition={isReduced ? undefined : { duration: 0.6, ease: EASE }}
          >
            <h2 className="text-display" style={{ fontFamily: tokens.font.display, fontSize: 'clamp(1.3rem, 2.8vw, 2rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: tokens.colors.textPrimary, marginBottom: '6px' }}>
              Where does the <span style={{ color: tokens.colors.accentGreen }}>money go?</span>
            </h2>
            <p style={{ fontFamily: tokens.font.body, fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)', color: tokens.colors.textSecondary, maxWidth: '420px', lineHeight: 1.5, fontWeight: 300, fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'" }}>
              Click a bar or row to break down its spend.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={isReduced ? {} : { opacity: 0, y: 40, boxShadow: '0 0 0 rgba(0,0,0,0), 0 0 0 rgba(61,220,132,0)' }}
          animate={anim ? { opacity: 1, y: 0, boxShadow: activeCluster ? tokens.shadow.glow : '0 4px 20px rgba(0,0,0,0.08), 0 12px 40px rgba(61,220,132,0.12)' } : { opacity: 1, y: 0, boxShadow: tokens.shadow.card }}
          transition={isReduced ? undefined : { duration: 0.7, delay: 0.15, ease: EASE, boxShadow: { duration: 0.6, delay: 0.15, ease: EASE } }}
          className="card"
          style={{ padding: 'clamp(0.75rem, 2vw, 1.25rem)', overflow: 'hidden' }}
        >
          <div className="card-header">
            <div className="card-badges">
              <Badge variant="mono">Last 30 Days</Badge>
              <Badge variant="default">Aggregated by: Cluster</Badge>
              {!isLoading && !isError && (
                <motion.div initial={isReduced ? {} : { opacity: 0, scale: 0.8 }} animate={anim ? { opacity: 1, scale: 1 } : {}} transition={isReduced ? undefined : { delay: 0.8 }}>
                  <Badge variant="success">Live Data ✓</Badge>
                </motion.div>
              )}
            </div>
            {!isLoading && !isError && (
              <motion.div initial={isReduced ? {} : { opacity: 0 }} animate={anim ? { opacity: 1 } : {}} transition={isReduced ? undefined : { delay: 1 }} className="card-kpi">
                <p className="kpi-label">Total Spend</p>
                <p className="kpi-value">${totalSpend.toLocaleString()}</p>
              </motion.div>
            )}
          </div>

          {isLoading && <LoadingSkeleton />}

          {isError && (
            <div className="error-state" role="alert">
              ⚠ Failed to load cluster data. Please refresh.
            </div>
          )}

          {clusters && (
            <>
              <div style={{ minHeight: '88px', marginBottom: '1.5rem' }}>
                <AnimatePresence mode="wait">
                  {activeCluster && (
                    <ActiveClusterStrip cluster={activeCluster} isReduced={isReduced} onClear={handleClearSelection} />
                  )}
                </AnimatePresence>
              </div>

              <div className="bar-chart-container" style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '0.75rem', paddingInline: '4px' }} role="img" aria-label="Cluster cost bar chart">
                {clusters.map((cluster, i) => (
                  <div key={cluster.id} className="cluster-card-container" style={{ flex: '1 1 0', minWidth: 0 }}>
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
                transition={isReduced ? undefined : { duration: 0.6, delay: 0.7 }}
                style={{ border: 'none', borderTop: `1px solid ${tokens.colors.borderSubtle}`, marginBottom: '0.5rem', transformOrigin: 'left' }}
              />

              <CostTable clusters={clusters} activeId={activeId} inView={inView} onRowClick={handleBarClick} />
            </>
          )}
        </motion.div>

        <motion.p
          initial={isReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={isReduced ? undefined : { delay: 1.2 }}
          className="footer-note"
        >
          API data · Cached 5 min · Click bar or row to filter
        </motion.p>
      </div>
    </section>
  );
};
