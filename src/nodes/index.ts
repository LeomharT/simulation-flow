import LightNode from './device/LightNode';
import PowerNode from './power/PowerNode';

export const nodeTypes = {
  powerNode: PowerNode,
  lightNode: LightNode,
} as const;
