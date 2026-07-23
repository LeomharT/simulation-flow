import { NODE_TYPES } from '@/nodes';
import type { SensorNodeData } from '@/nodes/device/type';
import type { GATEWAY_PROTOCOL, GatewayNodeData } from '@/nodes/gateway/type';
import type { Edge, Node } from '@xyflow/react';
import { toast } from 'sonner';

const positions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'top-center',
  'bottom-center',
] as const;

type GatewayResult = Record<
  string,
  {
    id: string;
    url: string;
    protocol: (typeof GATEWAY_PROTOCOL)[number];
    sourceNodes: Node[];
  }
>;

export function run(nodes: Node[], edges: Edge[]) {
  const gateways = nodes.find((value) => value.type === NODE_TYPES.GATEWAY);
  console.log(gateways, edges);
  if (!gateways) return;

  const result: GatewayResult = {};
  const dataInputs = (gateways.data as GatewayNodeData).dataInputs;

  for (const input of dataInputs) {
    const sourceIds = edges
      .filter((value) => value.targetHandle === input.id)
      .map((value) => value.source);

    const sourceNodes: Node[] = [];

    for (const id of sourceIds) {
      const node = nodes.find((value) => value.id === id);
      if (node) sourceNodes.push(node);
    }

    result[input.id] = {
      ...input,
      sourceNodes,
    };
  }

  const intervels: number[] = [];

  for (const key in result) {
    const payload: Record<string, string> = {};
    const toastId = result[key].id;
    const position = positions[Math.floor(Math.random() * positions.length)];

    for (let i = 0; i < result[key].sourceNodes.length; i++) {
      const data = result[key].sourceNodes[i].data as SensorNodeData;
      payload[data.fieldName] = data.payload;

      intervels.push(
        setInterval(() => {
          payload[data.fieldName] = Math.random().toString();

          toast(result[key].protocol + result[key].url, {
            id: toastId,
            description: JSON.stringify(payload),
            position,
            duration: 10000,
          });
        }, Number(data.intervalMs))
      );
    }
  }

  return intervels;
}
