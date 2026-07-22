import type { NodeProps } from '@xyflow/react';

export type LightNodeData = {
  color: string;
  voltage: string;
  ampere: string;
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
  fieldName: string;
  payload: string | string[] | number[];
  intervalMs: string;
};

export type SensorNodeProps = NodeProps & {
  data: SensorNodeData;
};
