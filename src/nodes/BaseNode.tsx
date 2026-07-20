import { useSimulationStore } from '@/store';
import type { NodeProps } from '@xyflow/react';
import clsx from 'clsx';
import type { ReactNode } from 'react';

type BaseNodeProps = NodeProps & {
  children: ReactNode;
};

export default function BaseNode({ children, ...props }: BaseNodeProps) {
  const isSelected = useSimulationStore((store) => store.selectedNode?.id === props.id);

  const classNames = clsx(
    'border border-transparent rounded-xl hover:shadow-md transition-shadow duration-300',
    {
      'border-violet-500': isSelected,
    }
  );

  return <div className={classNames}>{children}</div>;
}
