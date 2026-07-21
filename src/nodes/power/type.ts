import type { NodeProps } from '@xyflow/react';

export type PowerNodeData = {
  voltage: string;
  ampere: string;
  name?: string;
};

export type PowerNodeProps = NodeProps & {
  data: PowerNodeData;
};
