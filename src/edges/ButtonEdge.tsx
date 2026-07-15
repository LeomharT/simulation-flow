import { IconX } from '@tabler/icons-react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from '@xyflow/react';

export default function ButtonEdge(props: EdgeProps) {
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== props.id));
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={{ stroke: 'oklch(58.6% 0.253 17.585)' }}
      />
      <EdgeLabelRenderer>
        <div
          className='button-edge__label nodrag nopan'
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className='button-edge__button' onClick={onEdgeClick}>
            <IconX className='w-3! h-3! stroke-3' />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
