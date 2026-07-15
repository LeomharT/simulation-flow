import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBulbFilled, IconMinus, IconPlus } from '@tabler/icons-react';
import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';

const classNames = {
  handle: clsx('w-2.5! h-2.5! rounded-full flex items-center justify-center'),
  icon: clsx('w-1.5! h-1.5! stroke-white stroke-5'),
};

export default function LightNode() {
  return (
    <Card className='w-50 [--card-spacing:--spacing(2)] ring-0 hover:shadow-sm transition-shadow'>
      <CardHeader>
        <CardTitle className='flex flex-row items-center gap-4'>
          <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-blue-600 text-white'>
            <IconBulbFilled className='w-3! h-3!' />
          </div>
          Light
        </CardTitle>
      </CardHeader>
      <Handle
        id='positive'
        type='target'
        className={clsx(classNames.handle, 'bg-rose-500! translate-x-2')}
        position={Position.Top}
      >
        <IconPlus className={classNames.icon} />
      </Handle>
      <Handle
        id='negative'
        type='target'
        className={clsx(classNames.handle, 'bg-sky-800! -translate-x-2')}
        position={Position.Top}
      >
        <IconMinus className={classNames.icon} />
      </Handle>
    </Card>
  );
}
