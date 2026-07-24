import type { PowerNodeData } from '@/nodes/power/type';
import { useNodeConnections, useNodesData } from '@xyflow/react';

export function usePowerSourceValidation(voltage: string, ampere: string) {
  const positiveConns = useNodeConnections({ handleType: 'target', handleId: 'positive' });
  const negativeConns = useNodeConnections({ handleType: 'target', handleId: 'negative' });

  const positiveSourceId = positiveConns[0]?.source;
  const negativeSourceId = negativeConns[0]?.source;

  const sourceData = useNodesData(positiveSourceId ?? null)?.data as PowerNodeData | undefined;

  if (positiveConns[0]?.sourceHandle !== positiveConns[0]?.targetHandle) return false;
  if (negativeConns[0]?.sourceHandle !== negativeConns[0]?.targetHandle) return false;

  if (!positiveSourceId || !negativeSourceId) return false;
  if (positiveSourceId !== negativeSourceId) return false;

  return sourceData?.voltage === voltage && sourceData?.ampere === ampere;
}
