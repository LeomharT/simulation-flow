import type { PowerNodeData } from '@/nodes/power/type';
import type { Edge, Node } from '@xyflow/react';

export function validateNodePower(nodeId: string, nodes: Node[], edges: Edge[]): boolean {
  const positiveEdge = edges.find((e) => e.target === nodeId && e.targetHandle === 'positive');
  const negativeEdge = edges.find((e) => e.target === nodeId && e.targetHandle === 'negative');

  if (!positiveEdge || !negativeEdge) return false;

  if (positiveEdge.source !== negativeEdge.source) return false;

  const sourceNode = nodes.find((n) => n.id === positiveEdge.source);
  const targetNode = nodes.find((n) => n.id === nodeId);

  if (!sourceNode || !targetNode) return false;

  const sourceData = sourceNode.data as PowerNodeData;

  return (
    sourceData.voltage === targetNode.data.voltage && sourceData.ampere === targetNode.data.ampere
  );
}
