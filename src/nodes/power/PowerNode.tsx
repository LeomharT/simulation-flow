import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import {
  IconBoltFilled,
  IconCircuitAmmeter,
  IconCircuitVoltmeter,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';
import BaseNode from '../BaseNode';
import type { PowerNodeProps } from './type';

const classNames = {
  handle: clsx('w-2.5! h-2.5! rounded-full flex items-center justify-center'),
  icon: clsx('w-1.5! h-1.5! stroke-white stroke-5'),
};

export default function PowerNode(props: PowerNodeProps) {
  return (
    <BaseNode {...props}>
      <Card className='w-50 [--card-spacing:--spacing(2)] ring-0'>
        <CardHeader>
          <CardTitle className='flex flex-row items-center gap-4'>
            <div className='w-5 h-5 rounded shadow-xs p-1 flex items-center justify-center bg-blue-600 text-white'>
              <IconBoltFilled className='w-3! h-3!' />
            </div>
            {props.data.name ?? 'Power Source'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Item variant='muted' size='xs' className='mb-1 p-1'>
            <ItemMedia variant='icon'>
              <IconCircuitVoltmeter />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                Voltage <ItemDescription>{props.data.voltage}</ItemDescription>
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant='muted' size='xs' className='p-1'>
            <ItemMedia variant='icon'>
              <IconCircuitAmmeter />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                Ampere <ItemDescription>{props.data.ampere}</ItemDescription>
              </ItemTitle>
            </ItemContent>
          </Item>
        </CardContent>
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
          className={clsx(classNames.handle, 'bg-sky-800! -translate-x-2')}
          position={Position.Bottom}
        >
          <IconMinus className={classNames.icon} />
        </Handle>
      </Card>
    </BaseNode>
  );
}
