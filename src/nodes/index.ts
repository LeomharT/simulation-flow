import LightNode from './device/LightNode';
import SensorNode from './device/SensorNode';
import GatewayNode from './gateway/GatewayNode';
import PowerNode from './power/PowerNode';

export const NODE_TYPES = {
  POWER: 'powerNode',
  LIGHT: 'lightNode',
  SENSOR: 'sensorNode',
  GATEWAY: 'gatewayNode',
} as const;

export const nodeTypes = {
  [NODE_TYPES.POWER]: PowerNode,
  [NODE_TYPES.LIGHT]: LightNode,
  [NODE_TYPES.SENSOR]: SensorNode,
  [NODE_TYPES.GATEWAY]: GatewayNode,
} as const;
