import LightNode from './device/LightNode';
import PowerNode from './power/PowerNode';

export const NODE_TYPES = {
  POWER: 'powerNode',
  LIGHT: 'lightNode',
} as const;

export const nodeTypes = {
  [NODE_TYPES.POWER]: PowerNode,
  [NODE_TYPES.LIGHT]: LightNode,
} as const;
