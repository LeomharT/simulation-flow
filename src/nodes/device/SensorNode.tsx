import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import LimitedHandle from '@/handle/LimitedHandle';
import { usePowerSourceValidation } from '@/hooks/usePowerSourceValidation';
import {
  IconCategory2,
  IconCheck,
  IconCircuitSwitchClosed,
  IconCircuitSwitchOpen,
  IconCpu,
  IconMinus,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';
import BaseNode from '../BaseNode';
import type { SensorNodeProps } from './type';

const classNames = {
  handle: clsx('w-2.5! h-2.5! rounded-full flex items-center justify-center'),
  icon: clsx('w-1.5! h-1.5! stroke-white stroke-5'),
};

export default function SensorNode(props: SensorNodeProps) {
  const isPowerSourceValid = usePowerSourceValidation(props.data.voltage, props.data.ampere);

  return (
    <BaseNode {...props}>
      <Card className='w-50 [--card-spacing:--spacing(2)] ring-0'>
        <CardHeader>
          <CardTitle className='flex flex-row items-center gap-4'>
            <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-violet-600 text-white'>
              <IconCpu className='w-3! h-3!' />
            </div>
            {props.data.name ?? 'Sensor'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Item
            variant='muted'
            size='xs'
            className={clsx('p-1 mb-1', isPowerSourceValid ? 'bg-green-100' : 'bg-rose-100')}
          >
            <ItemMedia variant='icon'>
              {isPowerSourceValid ? <IconCircuitSwitchClosed /> : <IconCircuitSwitchOpen />}
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                Connection
                <ItemDescription>
                  {isPowerSourceValid ? (
                    <IconCheck className='w-3! h-3!' />
                  ) : (
                    <IconX className='w-3! h-3!' />
                  )}
                </ItemDescription>
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant='muted' size='xs' className='p-1'>
            <ItemMedia variant='icon'>
              <IconCategory2 />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className='w-full justify-between'>
                Data <ItemDescription>Random</ItemDescription>
              </ItemTitle>
              <ItemDescription>{'{ data: "value" }'}</ItemDescription>
            </ItemContent>
          </Item>
        </CardContent>
      </Card>
      <Handle
        id='dataSource'
        type='source'
        className={clsx(classNames.handle, 'bg-violet-500!')}
        position={Position.Left}
      >
        <IconPlus className={classNames.icon} />
      </Handle>
      <LimitedHandle
        id='positive'
        type='target'
        className={clsx(classNames.handle, 'bg-rose-500! translate-x-2')}
        position={Position.Top}
        connectionCount={1}
      >
        <IconPlus className={classNames.icon} />
      </LimitedHandle>
      <LimitedHandle
        id='negative'
        type='target'
        className={clsx(classNames.handle, 'bg-sky-800! -translate-x-2')}
        position={Position.Top}
        connectionCount={1}
      >
        <IconMinus className={classNames.icon} />
      </LimitedHandle>
    </BaseNode>
  );
}
