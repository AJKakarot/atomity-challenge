import React from 'react';
import { tokens } from '../tokens';
import { MetricRow } from './MetricRow';
import { ClusterMetric, TOTAL } from '../hooks/useClusterData';

const COLUMNS = ['Cluster', 'CPU', 'RAM', 'Storage', 'Network', 'GPU', 'Efficiency', 'Total'];

interface CostTableProps {
  clusters: ClusterMetric[];
  activeId: string | null;
  inView: boolean;
  onRowClick: (id: string) => void;
}

const thStyle: React.CSSProperties = {
  padding: '5px 12px',
  fontFamily: tokens.font.mono,
  fontSize: '0.68rem',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: tokens.colors.textMuted,
  whiteSpace: 'nowrap',
};

export const CostTable: React.FC<CostTableProps> = ({
  clusters, activeId, inView, onRowClick,
}) => (
  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginInline: '-0.5rem', paddingInline: '0.5rem' }}>
    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px', minWidth: '520px' }} aria-label="Cost breakdown by cluster">
      <thead>
        <tr>
          {COLUMNS.map(col => (
            <th key={col} scope="col" style={{ ...thStyle, textAlign: col === 'Cluster' ? 'left' : 'right' }}>
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
            onClick={() => onRowClick(cluster.id)}
          />
        ))}
      </tbody>
    </table>
  </div>
);
