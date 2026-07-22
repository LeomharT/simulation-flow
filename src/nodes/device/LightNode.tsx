import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import LimitedHandle from '@/handle/LimitedHandle';
import { usePowerSourceValidation } from '@/hooks/usePowerSourceValidation';
import {
  IconBulbFilled,
  IconCheck,
  IconCircuitSwitchClosed,
  IconCircuitSwitchOpen,
  IconMinus,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { Position } from '@xyflow/react';
import clsx from 'clsx';
import BaseNode from '../BaseNode';
import type { LightNodeProps } from './type';

const classNames = {
  handle: clsx('w-2.5! h-2.5! rounded-full flex items-center justify-center'),
  icon: clsx('w-1.5! h-1.5! stroke-white stroke-5'),
};

export default function LightNode(props: LightNodeProps) {
  const isPowerSourceValid = usePowerSourceValidation(props.data.voltage, props.data.ampere);

  return (
    <BaseNode {...props}>
      <Card className='w-50 [--card-spacing:--spacing(2)] ring-0'>
        <CardHeader>
          <CardTitle className='flex flex-row items-center gap-4'>
            <div
              className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-violet-600 text-white'
              style={{
                background: props.data.color,
                boxShadow: isPowerSourceValid ? `0 0 8px ${props.data.color}` : undefined,
              }}
            >
              <IconBulbFilled className='w-3! h-3!' />
            </div>
            {props.data.name ?? 'Light'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Item
            variant='muted'
            size='xs'
            className={clsx('p-1', isPowerSourceValid ? 'bg-green-100' : 'bg-rose-100')}
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
        </CardContent>
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
      </Card>
    </BaseNode>
  );
}
