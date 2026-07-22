import type { NodeProps } from '@xyflow/react';

export type GatewayNodeData = {
  name?: string;
  voltage: string;
  ampere: string;
};

export type GatewayNodeProps = NodeProps & {
  data: GatewayNodeData;
};
