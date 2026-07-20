import ErrorEdge from './ErrorEdge';

export const EDGE_TYPES = {
  ERROR: 'errorEdge',
};

export const edgeTypes = {
  [EDGE_TYPES.ERROR]: ErrorEdge,
};
