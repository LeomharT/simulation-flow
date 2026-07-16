import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import {
  IconBulbFilled,
  IconCheck,
  IconCircuitSwitchClosed,
  IconCircuitSwitchOpen,
  IconMinus,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { Handle, Position, useNodeConnections, type NodeProps } from '@xyflow/react';
import clsx from 'clsx';

type LightNodeProps = NodeProps & {};

const classNames = {
  handle: clsx('w-2.5! h-2.5! rounded-full flex items-center justify-center'),
  icon: clsx('w-1.5! h-1.5! stroke-white stroke-5'),
};

export default function LightNode(props: LightNodeProps) {
  const connections = useNodeConnections();

  function isValidPowerSource() {
    if (connections.length < 2) return false;
    return connections.every((item) => item.sourceHandle === item.targetHandle);
  }

  return (
    <Card className='w-50 [--card-spacing:--spacing(2)] ring-0 hover:shadow-sm transition-shadow'>
      <CardHeader>
        <CardTitle className='flex flex-row items-center gap-4'>
          <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-violet-600 text-white'>
            <IconBulbFilled className='w-3! h-3!' />
          </div>
          Light
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Item
          variant='muted'
          size='xs'
          className={clsx('p-1', isValidPowerSource() ? 'bg-green-100' : 'bg-rose-100')}
        >
          <ItemMedia variant='icon'>
            {isValidPowerSource() ? <IconCircuitSwitchClosed /> : <IconCircuitSwitchOpen />}
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              Coneection
              <ItemDescription>
                {isValidPowerSource() ? (
                  <IconCheck className='w-3! h-3!' />
                ) : (
                  <IconX className='w-3! h-3!' />
                )}
              </ItemDescription>
            </ItemTitle>
          </ItemContent>
        </Item>
      </CardContent>
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
