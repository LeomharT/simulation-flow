import type { NodeProps } from '@xyflow/react';

export type LightNodeData = {
  color: string;
  name?: string;
};

export type LightNodeProps = NodeProps & {
  data: LightNodeData;
};
