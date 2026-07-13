import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBoltFilled, IconMinus, IconPlus } from '@tabler/icons-react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import clsx from 'clsx';

type PowerNodeProps = NodeProps & {
  data: {
    label: string;
  };
};

const classNames = {
  handle: clsx('w-2.5! h-2.5! rounded-full flex items-center justify-center'),
  icon: clsx('w-1.5! h-1.5! stroke-white stroke-5'),
};

export default function PowerNode(props: PowerNodeProps) {
  return (
    <Card className='w-50 [--card-spacing:--spacing(2)] ring-0 hover:shadow-sm transition-shadow'>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row items-center gap-4'>
            <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-blue-600 text-white'>
              <IconBoltFilled className='w-3! h-3!' />
            </div>
            Power Source
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <Handle
        id='positive'
        type='source'
        className={clsx(classNames.handle, 'bg-rose-500! translate-x-2')}
        position={Position.Bottom}
      >
        <IconPlus className={classNames.icon} />
      </Handle>
      <Handle
        id='negative'
        type='source'
        className={clsx(classNames.handle, 'bg-sky-900 -translate-x-2')}
        position={Position.Bottom}
      >
        <IconMinus className={classNames.icon} />
      </Handle>
    </Card>
  );
}
