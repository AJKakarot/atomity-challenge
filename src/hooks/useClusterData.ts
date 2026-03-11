/** TanStack Query: loading, error, caching (staleTime 5min), background refetch. */
import { useQuery } from '@tanstack/react-query';

export interface ClusterMetric {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number; // 0–100
}

/** JSONPlaceholder → transform to cluster cost metrics (no public cloud API). */
const fetchClusterData = async (): Promise<ClusterMetric[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch cluster data');

  const users = await response.json();

  return users.slice(0, 4).map((user: Record<string, unknown>, i: number) => {
    const seed = (user.id as number) * 137;
    const scale = [1.0, 0.74, 0.50, 0.25][i];

    return {
      id: `cluster-${user.id}`,
      name: `Cluster ${['A', 'B', 'C', 'D'][i]}`,
      cpu:        Math.round(2450 * scale + (seed % 100)),
      ram:        Math.round(1360 * scale + (seed % 60)),
      storage:    Math.round(245  * scale + (seed % 20)),
      network:    Math.round(310  * scale + (seed % 30)),
      gpu:        i === 1 || i === 3 ? 0 : Math.round(820 * scale + (seed % 50)),
      efficiency: [10, 25, 11, 26][i],
    };
  });
};

export const useClusterData = () => {
  return useQuery({
    queryKey: ['cluster-costs'],
    queryFn: fetchClusterData,
    staleTime: 5 * 60 * 1000,   // Cache for 5 minutes — no re-fetch on revisit
    gcTime:    10 * 60 * 1000,  // Keep in memory for 10 minutes
    retry: 2,
  });
};

export const TOTAL = (c: ClusterMetric) =>
  c.cpu + c.ram + c.storage + c.network + c.gpu;

export const MAX_TOTAL = 8000; // visual scale ceiling
