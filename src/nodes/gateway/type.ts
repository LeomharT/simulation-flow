import type { NodeProps } from '@xyflow/react';

export const GATEWAY_PROTOCOL = ['http://', 'https://', 'ws://', 'wss://'] as const;

export type GatewayNodeData = {
  name?: string;
  voltage: string;
  ampere: string;
  dataInputs: {
    id: string;
    url: string;
    protocol: (typeof GATEWAY_PROTOCOL)[number];
  }[];
};

export type GatewayNodeProps = NodeProps & {
  data: GatewayNodeData;
};
