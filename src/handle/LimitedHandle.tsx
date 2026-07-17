import { Handle, useNodeConnections, type HandleProps } from '@xyflow/react';

type LimitedHandleProps = HandleProps & {
  connectionCount: number;
};

export default function LimitedHandle(props: LimitedHandleProps) {
  const connection = useNodeConnections({
    handleType: props.type,
  });

  return <Handle {...props} isConnectable={connection.length < props.connectionCount} />;
}
