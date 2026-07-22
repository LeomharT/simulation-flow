import type { NodeProps } from '@xyflow/react';

export type LightNodeData = {
  color: string;
  name?: string;
};

export type LightNodeProps = NodeProps & {
  data: LightNodeData;
};

export type SensorNodeData = {
  name?: string;
  voltage: string;
  ampere: string;
  mode: 'random' | 'fixed';
  payload: string | Record<string, string | number> | string[] | number[];
  intervalMs: number;
};

export type SensorNodeProps = NodeProps & {
  data: SensorNodeData;
};
