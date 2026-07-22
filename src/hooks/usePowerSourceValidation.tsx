import type { PowerNodeData } from '@/nodes/power/type';
import { useNodeConnections, useNodesData } from '@xyflow/react';

export function usePowerSourceValidation(voltage: string, ampere: string) {
  const positiveConns = useNodeConnections({ handleType: 'target', handleId: 'positive' });
  const negativeConns = useNodeConnections({ handleType: 'target', handleId: 'negative' });

  const positiveSourceId = positiveConns[0]?.source;
  const negativeSourceId = negativeConns[0]?.source;

  const sourceData = useNodesData(positiveSourceId ?? null)?.data as PowerNodeData | undefined;

  if (!positiveSourceId || !negativeSourceId) return false;

  if (positiveSourceId !== negativeSourceId) return false;

  return sourceData?.voltage === voltage && sourceData?.ampere === ampere;
}
